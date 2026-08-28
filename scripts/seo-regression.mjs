import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const layout = read("app/layout.tsx");
const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");
const blogPage = read("app/blog/[slug]/page.tsx");
const toolPages = read("lib/tool-pages.ts");
const templates = read("app/templates/page.tsx");
const redirects = read("next.config.ts");

const protectedPaths = [
  "/blog/text-to-handwriting-a4-size",
  "/blog/word-to-handwriting-converter-online-free",
  "/blog/handwritten-notes-generator",
  "/blog/pdf-to-handwriting-converter",
  "/blog/text-to-handwriting-pdf-generator",
  "/tools/text-to-handwriting-pdf",
  "/tools/handwritten-notes",
  "/templates",
];

assert.match(layout, /metadataBase: new URL\("https:\/\/www\.handwritingtool\.com"\)/);
assert.match(layout, /"@type": "Organization"/);
assert.match(layout, /"@type": "WebSite"/);
assert.match(blogPage, /canonical: `\/blog\/\$\{post\.slug\}`/);
assert.match(blogPage, /"@type": "BlogPosting"/);
assert.match(blogPage, /"@type": "BreadcrumbList"/);
assert.match(toolPages, /path: "\/tools\/text-to-handwriting-pdf"/);
assert.match(toolPages, /path: "\/tools\/handwritten-notes"/);
assert.match(templates, /canonical: "\/templates"/);
assert.match(templates, /"@type": "CollectionPage"/);
assert.match(robots, /sitemap: `\$\{siteUrl\}\/sitemap\.xml`/);
assert.match(sitemap, /const siteUrl = "https:\/\/www\.handwritingtool\.com"/);

for (const protectedPath of protectedPaths) {
  const slug = protectedPath.startsWith("/blog/") ? protectedPath.slice("/blog/".length) : protectedPath;
  assert.ok(
    sitemap.includes(protectedPath) || sitemap.includes("getAllPosts") || toolPages.includes(protectedPath) || templates.includes(`canonical: "${protectedPath}"`) || read(`content/blogs/${slug}.mdx`).length > 0,
    `Protected URL is missing: ${protectedPath}`,
  );
  assert.ok(!protectedPath.endsWith("/"), `Protected canonical must be slashless: ${protectedPath}`);
}

const redirectBlocks = [...redirects.matchAll(/\{[\s\S]*?source:\s*"([^"]+)"[\s\S]*?destination:\s*"([^"]+)"[\s\S]*?(?:permanent:\s*true|statusCode:\s*301)[\s\S]*?\}/g)];
assert.ok(redirectBlocks.length >= 14, "All permanent legacy redirects should remain present");
for (const [, source, destination] of redirectBlocks) {
  assert.notEqual(source, destination, `Redirect must not loop: ${source}`);
  assert.ok(!redirectBlocks.some(([, nextSource]) => nextSource === destination), `Redirect chain detected from ${source} through ${destination}`);
}

console.log("SEO regression checks passed for protected URLs, canonicals, schema, sitemap, robots, and legacy redirects.");
