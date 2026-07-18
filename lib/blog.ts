import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "content", "blogs");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  updated: string;
  description: string;
  content: string;
  category: BlogCategory;
};

export type BlogCategory =
  | "Getting Started"
  | "Handwriting Generators"
  | "Paper & Layout"
  | "PDF & Export"
  | "Notes & Study"
  | "Guides"
  | "Research & Comparisons";

const categoryBySlug: Record<string, BlogCategory> = {
  "how-to-convert-text-to-handwriting": "Getting Started",
  "create-handwritten-pages-online-free": "Handwriting Generators",
  "graph-paper-handwriting-generator": "Paper & Layout",
  "text-to-handwriting-a4-size": "Paper & Layout",
  "text-to-handwriting-on-lined-paper": "Paper & Layout",
  "text-to-handwriting-pdf-generator": "PDF & Export",
  "pdf-to-handwriting-converter": "PDF & Export",
  "handwritten-notes-generator": "Notes & Study",
  "word-to-handwriting-converter-online-free": "Guides",
  "how-to-make-handwriting-look-realistic-online": "Guides",
  "best-text-to-handwriting-tools-2026-comparison": "Research & Comparisons",
  "why-handwriting-still-matters-digital-age": "Research & Comparisons",
};

type Frontmatter = {
  title?: string;
  date?: string;
  updated?: string;
  description?: string;
};

function getPostSlugs() {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith(".mdx"));
}

function normalizeFrontmatter(data: Frontmatter, slug: string) {
  return {
    title: data.title ?? slug,
    date: data.date ?? "",
    updated: data.updated ?? data.date ?? "",
    description: data.description ?? "",
  };
}

export function getPostBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(blogsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = normalizeFrontmatter(data as Frontmatter, realSlug);

  return {
    slug: realSlug,
    content,
    category: categoryBySlug[realSlug] ?? "Handwriting Generators",
    ...frontmatter,
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => Boolean(post))
    .sort((first, second) => second.date.localeCompare(first.date));
}
