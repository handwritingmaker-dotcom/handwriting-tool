import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const siteUrl = "https://www.handwritingtool.com";
const fallbackLastModified = new Date("2026-05-01");

const staticRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1, lastModified: "2026-05-05" },
  { path: "/about", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-04-30" },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-05-04" },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-05-04" },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-05-04" },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-05-04" },
] satisfies Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  lastModified: string;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
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

  return [...staticPages, ...blogPages];
}
