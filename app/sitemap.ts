import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { publicContentList } from "@/lib/cms/public";

const siteUrl = "https://www.handwritingtool.com";
const fallbackLastModified = new Date("2026-05-01");

const staticRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1, lastModified: "2026-08-01" },
  { path: "/tools", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-07-18" },
  { path: "/tools/lined-paper-handwriting", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-08-01" },
  { path: "/tools/graph-paper-handwriting", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-08-01" },
  { path: "/tools/handwritten-notes", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-08-01" },
  { path: "/tools/text-to-handwriting-pdf", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-08-01" },
  { path: "/tools/handwriting-worksheet-generator", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-09-28" },
  { path: "/cursive-text-generator", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-17" },
  { path: "/sentence-scramble-generator", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-17" },
  { path: "/word-search-maker", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-17" },
  { path: "/signature-generator", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-17" },
  { path: "/word-scramble-generator", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-17" },
  { path: "/assignment-maker", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-17" },
  { path: "/invitation-maker", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-17" },
  { path: "/about", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-07-31" },
  { path: "/author/anwar-fakhri", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-07-31" },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-07-18" },
  { path: "/templates", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-05-27" },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-07-31" },
  { path: "/write-for-us", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-09-11" },
  { path: "/responsible-use", changeFrequency: "yearly", priority: 0.5, lastModified: "2026-07-31" },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-07-31" },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-07-31" },
] satisfies Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  lastModified: string;
}>;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = staticRoutes.map((route) => ({
    url: route.path === "/write-for-us" ? "https://handwritingtool.com/write-for-us" : `${siteUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogPages = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated ? new Date(post.updated) : fallbackLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cmsContent = [...await publicContentList("POST"), ...await publicContentList("PAGE")]
    .filter((entry) => entry.include_in_sitemap && !entry.robots_noindex)
    .map((entry) => ({
      url: entry.kind === "POST" ? `${siteUrl}/blog/${entry.slug}` : `${siteUrl}/${entry.slug}`,
      lastModified: entry.updated_at,
      changeFrequency: "monthly" as const,
      priority: entry.kind === "POST" ? 0.7 : 0.6,
    }));
  const seen = new Set(cmsContent.map((entry) => entry.url));
  return [...staticPages, ...blogPages.filter((entry) => !seen.has(entry.url)), ...cmsContent];
}
