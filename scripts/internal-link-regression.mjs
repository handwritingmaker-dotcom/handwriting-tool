import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const contentRoot = path.join(root, "content", "blogs");
const appRoot = path.join(root, "app");
const sourceFiles = [];

function collect(directory) {
  for (const name of readdirSync(directory)) {
    const fullPath = path.join(directory, name);
    if (statSync(fullPath).isDirectory()) collect(fullPath);
    else if (/\.(?:mdx|tsx)$/.test(name)) sourceFiles.push(fullPath);
  }
}

collect(contentRoot);
collect(appRoot);

const routes = new Set(["/"]);
for (const file of sourceFiles) {
  if (file.startsWith(contentRoot) && file.endsWith(".mdx")) {
    routes.add(`/blog/${path.basename(file, ".mdx")}`);
  }
  if (file.startsWith(appRoot) && path.basename(file) === "page.tsx" && !file.includes("[")) {
    const relative = path.relative(appRoot, path.dirname(file)).replaceAll("\\", "/");
    routes.add(relative ? `/${relative}` : "/");
  }
}

const checked = new Set();
for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  const links = [
    ...[...source.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1]),
    ...[...source.matchAll(/href=["'](\/[^"']+)["']/g)].map((match) => match[1]),
  ];
  for (const href of links) {
    const pathname = href.split("#")[0].split("?")[0] || "/";
    if (/\.[a-z0-9]{2,5}$/i.test(pathname)) {
      assert.ok(existsSync(path.join(root, "public", pathname)), `Missing linked asset ${href} in ${path.relative(root, file)}`);
      continue;
    }
    checked.add(pathname);
    assert.ok(routes.has(pathname), `Missing internal route ${href} in ${path.relative(root, file)}`);
  }
}

for (const strategicPath of [
  "/blog/word-to-handwriting-converter-online-free",
  "/tools/text-to-handwriting-pdf",
  "/blog/text-to-handwriting-a4-size",
  "/tools/handwritten-notes",
  "/tools/lined-paper-handwriting",
  "/tools/graph-paper-handwriting",
  "/templates",
  "/blog/how-to-convert-text-to-handwriting",
]) assert.ok(checked.has(strategicPath), `Strategic URL has no discovered internal link: ${strategicPath}`);

console.log(`Internal-link regression checks passed for ${checked.size} route destinations.`);
