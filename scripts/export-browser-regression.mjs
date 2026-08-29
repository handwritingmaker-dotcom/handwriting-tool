import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";
import { jsPDF } from "jspdf";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createDocxFixture } from "./document-fixtures.mjs";

const baseUrl = process.env.HANDWRITING_TEST_BASE_URL || "http://127.0.0.1:3105";
const chromeCandidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];
const chrome = chromeCandidates.find(existsSync);
assert.ok(chrome, "Chrome is required for browser export regression checks");

const downloadDir = mkdtempSync(path.join(tmpdir(), "handwriting-run1-"));
const port = 9444;
const browser = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(downloadDir, "chrome-profile")}`,
  "--no-first-run",
  "--disable-popup-blocking",
  "about:blank",
], { stdio: "ignore" });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function openBrowserTarget() {
  const url = `http://127.0.0.1:${port}/json/new?${encodeURIComponent(`${baseUrl}/`)}`;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      return await fetch(url, { method: "PUT" }).then((response) => response.json());
    } catch {
      await pause(125);
    }
  }
  throw new Error("Timed out waiting for the headless Chrome debugging endpoint");
}

async function waitForFile(extension, previousCount = 0) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const files = readdirSync(downloadDir).filter((file) => file.endsWith(extension) && !file.endsWith(".crdownload"));
    if (files.length > previousCount) return path.join(downloadDir, files.at(-1));
    await pause(100);
  }
  throw new Error(`Timed out waiting for ${extension} download`);
}

const target = await openBrowserTarget();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
let id = 0;
const pending = new Map();
const documentRequests = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Network.requestWillBeSent") documentRequests.push(message.params.request);
  if (!message.id) return;
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message)); else request.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const requestId = ++id;
  pending.set(requestId, { resolve, reject });
  socket.send(JSON.stringify({ id: requestId, method, params }));
});
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Browser evaluation failed");
  return result.result.value;
};
const waitFor = async (expression, label) => {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await evaluate(expression)) return;
    await pause(100);
  }
  throw new Error(`Timed out waiting for ${label}`);
};

try {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Browser.setDownloadBehavior", { behavior: "allow", downloadPath: downloadDir, eventsEnabled: true });
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: `${baseUrl}/` });
  await waitFor('document.readyState === "complete"', "homepage load");
  await waitFor('document.querySelectorAll(".paper-frame img").length > 0', "rendered preview");
  await waitFor('document.fonts.check(\'34px "Caveat"\') && document.fonts.check(\'34px "Patrick Hand"\')', "handwriting fonts");
  assert.equal(await evaluate('document.querySelector("[data-nextjs-dialog]") ? "overlay" : "ok"'), "ok");
  assert.equal(await evaluate('document.querySelectorAll("button span[style*=font-family]").length'), 10);

  await evaluate(`(() => { const select = document.querySelector('#pdfQuality'); select.value = 'high'; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  await waitFor('document.querySelector(".paper-frame img")?.naturalWidth === 2480', "high-quality A4 preview");

  await evaluate(`(() => { const label = [...document.querySelectorAll('label')].find((node) => node.textContent.includes('Transparent PNG background')); label.querySelector('input').click(); const button = [...document.querySelectorAll('button')].find((node) => node.textContent.trim() === 'Download PNG'); button.click(); })()`);
  const pngPath = await waitForFile(".png");
  const pngMetadata = await sharp(pngPath).metadata();
  assert.deepEqual([pngMetadata.width, pngMetadata.height], [2480, 3508]);
  const pngStats = await sharp(pngPath).ensureAlpha().stats();
  assert.equal(pngStats.channels[3].min, 0, "Transparent PNG must contain fully transparent pixels");
  assert.ok(pngStats.channels[3].max > 0, "Transparent PNG must retain visible handwriting pixels");

  await evaluate(`([...document.querySelectorAll('button')].find((node) => node.textContent.trim() === 'Download JPG')).click()`);
  const jpgPath = await waitForFile(".jpg");
  const jpgMetadata = await sharp(jpgPath).metadata();
  assert.deepEqual([jpgMetadata.width, jpgMetadata.height], [2480, 3508]);
  assert.equal(jpgMetadata.hasAlpha, false, "JPG must remain opaque");

  await evaluate(`([...document.querySelectorAll('button')].find((node) => node.textContent.trim() === 'Download PDF')).click()`);
  const pdfPath = await waitForFile(".pdf");
  const pdfTask = getDocument({ data: new Uint8Array(readFileSync(pdfPath)), disableWorker: true });
  const pdf = await pdfTask.promise;
  const pdfPage = await pdf.getPage(1);
  const viewport = pdfPage.getViewport({ scale: 1 });
  assert.ok(Math.abs(viewport.width * 25.4 / 72 - 210) < 0.15);
  assert.ok(Math.abs(viewport.height * 25.4 / 72 - 297) < 0.15);
  await pdfTask.destroy();

  await evaluate(`(() => { const select = document.querySelector('#pageSize'); select.value = 'letter'; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  await waitFor('document.querySelector(".paper-frame img")?.naturalWidth === 2550', "high-quality Letter preview");

  for (const [width, height] of [[768, 1024], [1440, 1000]]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
    assert.equal(await evaluate('document.body.scrollWidth <= window.innerWidth'), true, `${width}px viewport overflow`);
  }

  await send("Page.navigate", { url: `${baseUrl}/tools/text-to-handwriting-pdf` });
  await waitFor('document.readyState === "complete" && !!document.querySelector("#pdfImport")', "PDF importer route");
  assert.equal(await evaluate('document.querySelector("[data-nextjs-dialog]") ? "overlay" : "ok"'), "ok");
  const sourcePdfPath = path.join(downloadDir, "selectable-import-source.pdf");
  const sourcePdf = new jsPDF();
  sourcePdf.text("PDF PAGE ONE OMITTED", 20, 20);
  sourcePdf.addPage();
  sourcePdf.text("Run one selectable PDF import verification", 20, 20);
  sourcePdf.addPage();
  sourcePdf.text("PDF PAGE THREE INCLUDED", 20, 20);
  writeFileSync(sourcePdfPath, Buffer.from(sourcePdf.output("arraybuffer")));
  const { root } = await send("DOM.getDocument", { depth: -1 });
  const { nodeId } = await send("DOM.querySelector", { nodeId: root.nodeId, selector: "#pdfImport" });
  await send("DOM.setFileInputFiles", { nodeId, files: [sourcePdfPath] });
  await waitFor('document.body.innerText.includes("PDF ready: 3 pages")', "PDF page count");
  await evaluate(`(() => { const input = document.querySelector('#pdfPageSelection'); const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; setter.call(input, '2-3'); input.dispatchEvent(new Event('input', { bubbles: true })); input.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  await waitFor('document.querySelector("#pdfPageSelection")?.value === "2-3"', "PDF range input");
  await evaluate(`([...document.querySelectorAll('button')].find((node) => node.textContent.trim() === 'Extract pages')).click()`);
  await waitFor('document.querySelector("#handwriting-text")?.value.includes("Run one selectable PDF import verification")', "PDF text extraction");
  assert.equal(await evaluate('document.querySelector("#handwriting-text").value.includes("PDF PAGE ONE OMITTED")'), false);
  assert.equal(await evaluate('document.querySelector("#handwriting-text").value.includes("PDF PAGE THREE INCLUDED")'), true);
  assert.ok(await evaluate('document.body.innerText.includes("Text extracted. You can edit it below.")'));

  await send("Page.navigate", { url: `${baseUrl}/blog/word-to-handwriting-converter-online-free` });
  await waitFor('document.readyState === "complete" && !!document.querySelector("#docxImport")', "Word DOCX experience");
  const docxPath = path.join(downloadDir, "word-import-fixture.docx");
  writeFileSync(docxPath, Buffer.from(await createDocxFixture({ long: true })));
  const documentRoot = (await send("DOM.getDocument", { depth: -1 })).root;
  const docxInput = await send("DOM.querySelector", { nodeId: documentRoot.nodeId, selector: "#docxImport" });
  const requestsBeforeDocx = documentRequests.length;
  await send("DOM.setFileInputFiles", { nodeId: docxInput.nodeId, files: [docxPath] });
  await waitFor('document.querySelector("#handwriting-text")?.value.includes("Project Heading")', "DOCX text extraction");
  await waitFor('document.querySelectorAll(".paper-frame img").length > 1', "DOCX multipage handwriting preview");
  assert.ok(await evaluate('document.querySelector("#handwriting-text").value.includes("First list item")'));
  assert.ok(await evaluate('document.querySelector("#handwriting-text").value.includes("Alpha")'));
  assert.ok(await evaluate('document.body.innerText.includes("Text extracted. Review and edit it below.")'));
  await evaluate(`(() => { const editor = document.querySelector('#handwriting-text'); const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; setter.call(editor, editor.value + '\\n\\nBrowser edited DOCX text'); editor.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await waitFor('document.querySelector("#handwriting-text")?.value.includes("Browser edited DOCX text")', "editable DOCX text");
  const importRequests = documentRequests.slice(requestsBeforeDocx);
  const sameOriginWrites = importRequests.filter((request) => request.url.startsWith(baseUrl) && ["POST", "PUT", "PATCH"].includes(request.method));
  assert.equal(sameOriginWrites.length, 0, "DOCX extraction must not upload data to the application");
  const requestPayloads = importRequests.map((request) => request.postData || "").join("\n");
  assert.doesNotMatch(requestPayloads, /Project Heading|First list item|word-import-fixture\.docx/, "Document text and filename must not enter network payloads");

  for (const [label, extension] of [["Download PDF", ".pdf"], ["Download PNG", ".png"], ["Download JPG", ".jpg"]]) {
    const previousCount = readdirSync(downloadDir).filter((name) => name.endsWith(extension)).length;
    await evaluate(`([...document.querySelectorAll('button')].find((node) => node.textContent.trim() === '${label}')).click()`);
    await waitForFile(extension, previousCount);
  }
  for (const [width, height] of [[390, 844], [768, 1024], [1440, 1000]]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
    assert.equal(await evaluate('document.body.scrollWidth <= window.innerWidth'), true, `Word article overflow at ${width}px`);
  }
  await send("Page.navigate", { url: `${baseUrl}/tools/handwritten-notes` });
  await waitFor('document.readyState === "complete" && !!document.querySelector("#noteTitle")', "notes route");
  assert.equal(await evaluate('document.querySelector("[data-nextjs-dialog]") ? "overlay" : "ok"'), "ok");

  console.log("Browser export regression checks passed for DOCX import/multipage/exports/privacy, PDF range import, mobile/tablet/desktop, transparent PNG alpha, high-resolution JPG, A4 PDF, Letter rendering, and notes tool.");
} finally {
  socket.close();
  browser.kill();
  if (browser.exitCode === null) await new Promise((resolve) => browser.once("exit", resolve));
  rmSync(downloadDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
