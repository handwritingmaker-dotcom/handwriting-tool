import assert from "node:assert/strict";

const baseUrl = process.env.HANDWRITING_TEST_BASE_URL || "http://127.0.0.1:3105";

const protectedPages = [
  ["/", "Text to Handwriting Converter Free Online | HandwritingTool"],
  ["/blog/text-to-handwriting-a4-size", "Text to Handwriting A4 Size | HandwritingTool"],
  ["/blog/word-to-handwriting-converter-online-free", "Word to Handwriting Converter Online Free | HandwritingTool"],
  ["/blog/handwritten-notes-generator", "Handwritten Notes Generator Guide | HandwritingTool"],
  ["/blog/pdf-to-handwriting-converter", "Extract PDF Text for Handwritten Pages | HandwritingTool"],
  ["/blog/text-to-handwriting-pdf-generator", "How to Export Handwritten Pages as a PDF | HandwritingTool"],
  ["/tools/text-to-handwriting-pdf", "PDF to Handwriting Converter Online Free | HandwritingTool"],
  ["/tools/handwritten-notes", "Handwritten Notes Generator for Study | HandwritingTool"],
  ["/templates", "Free Handwriting Templates and Printable Paper | HandwritingTool"],
  ["/blog/best-text-to-handwriting-tools-2026-comparison", "7 Best Text to Handwriting Tools (2026) | HandwritingTool"],
  ["/blog/how-to-convert-text-to-handwriting", "How to Convert Text to Handwriting | HandwritingTool"],
  ["/blog/text-to-handwriting-on-lined-paper", "Text to Handwriting on Lined Paper | HandwritingTool"],
  ["/blog/graph-paper-handwriting-generator", "Graph Paper Handwriting Guide | HandwritingTool"],
  ["/tools/lined-paper-handwriting", "Lined Paper Handwriting Generator | HandwritingTool"],
  ["/tools/graph-paper-handwriting", "Graph Paper Handwriting Generator | HandwritingTool"],
];

for (const [path, expectedTitle] of protectedPages) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, `${path} status`);
  const html = await response.text();
  assert.ok(html.includes(`<title>${expectedTitle}</title>`), `${path} title`);
  assert.match(html, /<meta name="description" content="[^"]+"/i, `${path} description`);
  assert.ok(
    html.includes(`<link rel="canonical" href="https://www.handwritingtool.com${path === "/" ? "" : path}"`),
    `${path} canonical host/path`,
  );
}

const homepage = await fetch(`${baseUrl}/`).then((response) => response.text());
for (const schemaType of ["Organization", "WebSite", "SoftwareApplication", "FAQPage"]) {
  assert.ok(homepage.includes(schemaType), `Homepage ${schemaType} schema`);
}
const blog = await fetch(`${baseUrl}/blog/text-to-handwriting-a4-size`).then((response) => response.text());
for (const schemaType of ["BlogPosting", "BreadcrumbList"]) {
  assert.ok(blog.includes(schemaType), `Blog ${schemaType} schema`);
}
const tool = await fetch(`${baseUrl}/tools/text-to-handwriting-pdf`).then((response) => response.text());
for (const schemaType of ["WebApplication", "HowTo", "FAQPage", "BreadcrumbList"]) {
  assert.ok(tool.includes(schemaType), `Tool ${schemaType} schema`);
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
for (const [path] of protectedPages) {
  assert.ok(sitemap.includes(`https://www.handwritingtool.com${path === "/" ? "" : path}`), `Sitemap includes ${path}`);
}
assert.ok(!sitemap.includes("http://www.handwritingtool.com"));
assert.ok(!sitemap.match(/<loc>[^<]+\/$/m), "Sitemap canonicals should be slashless except the root URL representation");

const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
assert.match(robots, /Allow: \/\s/);
assert.match(robots, /Sitemap: https:\/\/www\.handwritingtool\.com\/sitemap\.xml/);

const legacyRedirects = [
  ["/blog/can-teachers-detect-handwriting-generator", "/responsible-use"],
  ["/privacy", "/privacy-policy"],
  ["/terms-and-conditions", "/terms"],
  ["/blog/text-to-handwriting-converter-for-notes", "/blog/handwritten-notes-generator"],
  ["/blog/handwriting-generator-for-assignments", "/blog/handwritten-notes-generator"],
  ["/blog/handwriting-text", "/blog/how-to-convert-text-to-handwriting"],
  ["/blog/handwritten-text-generator", "/blog/how-to-convert-text-to-handwriting"],
  ["/blog/handwriting-tool-vs-handwriting-generator", "/blog/how-to-convert-text-to-handwriting"],
  ["/blog/how-to-make-typed-notes-look-handwritten-online", "/blog/handwritten-notes-generator"],
  ["/blog/free-handwriting-generator-online-without-sign-up", "/"],
  ["/blog/make-handwritten-assignment-online", "/blog/handwritten-notes-generator"],
  ["/blog/best-handwriting-generator-for-students-2026", "/blog/best-text-to-handwriting-tools-2026-comparison"],
  ["/blog/how-to-make-handwritten-assignment-pdf-on-mobile", "/blog/text-to-handwriting-pdf-generator"],
  ["/blog/how-to-write-assignments-faster-without-handwriting", "/"],
  ["/blog/best-handwriting-fonts-for-assignments", "/blog/best-text-to-handwriting-settings-realistic-output"],
  ["/blog/how-to-make-handwriting-look-realistic-online", "/blog/best-text-to-handwriting-settings-realistic-output"],
];

for (const [source, destination] of legacyRedirects) {
  const response = await fetch(`${baseUrl}${source}`, { redirect: "manual" });
  assert.ok([301, 308].includes(response.status), `${source} should remain permanent`);
  const location = response.headers.get("location");
  assert.equal(new URL(location, baseUrl).pathname, destination, `${source} destination`);
  const destinationResponse = await fetch(`${baseUrl}${destination}`, { redirect: "manual" });
  assert.equal(destinationResponse.status, 200, `${source} destination must not loop`);
}

const trailingSlash = await fetch(`${baseUrl}/blog/text-to-handwriting-a4-size/`, { redirect: "manual" });
assert.equal(trailingSlash.status, 308);
assert.equal(new URL(trailingSlash.headers.get("location"), baseUrl).pathname, "/blog/text-to-handwriting-a4-size");

console.log("Production HTTP regression checks passed for protected pages, metadata, schemas, sitemap, robots, slash policy, and redirects.");
