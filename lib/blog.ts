import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "content", "blogs");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
};

type Frontmatter = {
  title?: string;
  date?: string;
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
    ...frontmatter,
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => Boolean(post))
    .sort((first, second) => second.date.localeCompare(first.date));
}
