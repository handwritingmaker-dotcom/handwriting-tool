import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";
import { jsPDF } from "jspdf";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

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
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
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
  sourcePdf.text("Run one selectable PDF import verification", 20, 20);
  writeFileSync(sourcePdfPath, Buffer.from(sourcePdf.output("arraybuffer")));
  const { root } = await send("DOM.getDocument", { depth: -1 });
  const { nodeId } = await send("DOM.querySelector", { nodeId: root.nodeId, selector: "#pdfImport" });
  await send("DOM.setFileInputFiles", { nodeId, files: [sourcePdfPath] });
  await waitFor('document.querySelector("#handwriting-text")?.value.includes("Run one selectable PDF import verification")', "PDF text extraction");
  assert.ok(await evaluate('document.body.innerText.includes("Text extracted. You can edit it below.")'));
  await send("Page.navigate", { url: `${baseUrl}/tools/handwritten-notes` });
  await waitFor('document.readyState === "complete" && !!document.querySelector("#noteTitle")', "notes route");
  assert.equal(await evaluate('document.querySelector("[data-nextjs-dialog]") ? "overlay" : "ok"'), "ok");

  console.log("Browser export regression checks passed for mobile/tablet/desktop, transparent PNG alpha, high-resolution JPG, A4 PDF, Letter rendering, PDF importer, and notes tool.");
} finally {
  socket.close();
  browser.kill();
  rmSync(downloadDir, { recursive: true, force: true });
}
