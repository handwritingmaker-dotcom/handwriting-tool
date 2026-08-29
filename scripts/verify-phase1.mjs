import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const analytics = read("lib/analytics.ts");
const layout = read("app/layout.tsx");
const sitemap = read("app/sitemap.ts");
const homepage = read("app/page.tsx");
const header = read("components/SiteHeader.tsx");
const cta = read("components/StartConvertingButton.tsx");
const importer = read("components/PdfTextImporter.tsx");
const docxImporter = read("components/DocxTextImporter.tsx");
const tool = read("components/HandwritingTool.tsx");
const beginner = read("content/blogs/how-to-convert-text-to-handwriting.mdx");
const pdfImport = read("content/blogs/pdf-to-handwriting-converter.mdx");
const pdfExport = read("content/blogs/text-to-handwriting-pdf-generator.mdx");

for (const event of ["tool_view", "editor_focus", "preview_rendered", "preview_error", "pdf_import_started", "pdf_import_completed", "pdf_import_error", "docx_upload_started", "docx_extraction_success", "docx_extraction_failed", "export_started", "export_completed", "export_error", "related_tool_clicked", "guide_clicked", "template_downloaded"]) {
  assert.match(analytics, new RegExp(`"${event}"`), `Missing analytics event ${event}`);
}

for (const forbidden of ["text", "file_name", "filename", "pdf_contents", "document_text", "paper_name", "raw_error", "email"]) {
  assert.doesNotMatch(analytics, new RegExp(`"${forbidden}"\\s*,?`), `Forbidden analytics parameter ${forbidden}`);
}

const eventCalls = [...`${tool}\n${importer}\n${docxImporter}`.matchAll(/trackEvent\([\s\S]{0,220}?\);/g)].map((match) => match[0]).join("\n");
assert.doesNotMatch(eventCalls, /\b(text|fileName|selectedFile\.name|customPaperName|caughtError|error\.message)\b/, "Sensitive or raw values appear in an analytics call");

assert.match(header, /aria-expanded=\{isOpen\}/);
assert.match(header, /aria-controls=\{menuId\}/);
assert.match(header, /event\.key !== "Escape"/);
assert.match(header, /menuButtonRef\.current\?\.focus/);
assert.doesNotMatch(header, /usePathname/);
assert.match(cta, /prefers-reduced-motion: reduce/);
assert.match(cta, /handwriting-text/);
assert.match(cta, /href="#tool"/);
assert.match(cta, /scrollend/);
assert.match(homepage, /Convert Your Text in Three Steps/);
assert.doesNotMatch(homepage, />How to Convert Text to Handwriting Online<\/h2>/);

assert.match(layout, /metadataBase: new URL\("https:\/\/www\.handwritingtool\.com"\)/);
assert.match(sitemap, /const siteUrl = "https:\/\/www\.handwritingtool\.com"/);
assert.match(importer, /selectable text/);
assert.match(importer, /OCR is not currently available/);
assert.match(docxImporter, /not uploaded to our server/);
assert.match(beginner, /PDF upload tool/);
assert.match(pdfImport, /existing source PDF/);
assert.match(pdfImport, /does not run optical character recognition \(OCR\) or preserve/);
assert.match(pdfExport, /output workflow is different from importing an existing source PDF/);
assert.match(pdfImport, /Scanned PDFs (?:require OCR first|still require OCR)/);

console.log("Phase 1 source checks passed.");
