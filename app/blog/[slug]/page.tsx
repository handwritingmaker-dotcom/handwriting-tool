import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteAuthor } from "@/lib/author";
import { outputSocialImage } from "@/lib/seo";
import { HandwritingToolLoader } from "@/components/HandwritingToolLoader";

const siteUrl = "https://www.handwritingtool.com";

const relatedToolBySlug: Record<string, { href: string; label: string }> = {
  "text-to-handwriting-pdf-generator": { href: "/tools/text-to-handwriting-pdf", label: "Open PDF generator" },
  "pdf-to-handwriting-converter": { href: "/tools/text-to-handwriting-pdf", label: "Create a handwriting PDF" },
  "text-to-handwriting-on-lined-paper": { href: "/tools/lined-paper-handwriting", label: "Open lined-paper tool" },
  "graph-paper-handwriting-generator": { href: "/tools/graph-paper-handwriting", label: "Open graph-paper tool" },
  "handwritten-notes-generator": { href: "/tools/handwritten-notes", label: "Open notes generator" },
};

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | HandwritingTool",
      description: "The requested blog post could not be found.",
    };
  }

  const title = `${post.seoTitle} | HandwritingTool`;

  return {
    title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [outputSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [outputSocialImage.url],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedTool = relatedToolBySlug[post.slug] ?? { href: "/#tool", label: "Try the main converter" };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    articleSection: post.category,
    image: `${siteUrl}${outputSocialImage.url}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      "@id": `${siteUrl}${siteAuthor.profilePath}#person`,
      name: siteAuthor.name,
      url: `${siteUrl}${siteAuthor.profilePath}`,
      image: `${siteUrl}${siteAuthor.imagePath}`,
      jobTitle: siteAuthor.role,
      sameAs: [siteAuthor.pinterestUrl],
    },
    publisher: {
      "@type": "Organization",
      name: "HandwritingTool",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/handwriting-tool-logo.png`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <article className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">
          {post.category} &bull; {formatDate(post.date)}
        </p>
        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 px-5 py-4">
          <p className="text-sm font-semibold text-slate-950">
            Written and edited by{" "}
            <Link href={siteAuthor.profilePath} rel="author" className="text-brand-blue hover:underline">
              {siteAuthor.name}
            </Link>
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {siteAuthor.shortBio}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Updated {formatDate(post.updated || post.date)}. Each guide is reviewed for clarity, practical usefulness,
            and responsible page-creation workflows.
          </p>
        </div>
        <div className="prose prose-slate mt-6 max-w-none prose-headings:tracking-tight prose-headings:text-slate-950 prose-a:text-brand-blue prose-strong:text-slate-950 prose-li:marker:text-brand-blue">
          <MDXRemote source={post.content} components={{ img: BlogImage, DocxHandwritingExperience }} />
        </div>
        <section className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Use the Converter Responsibly</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            HandwritingTool is best for readable notes, drafts, worksheets, examples, journal pages, printable
            resources, and document previews. Review your output carefully before printing or sharing it.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={relatedTool.href}
              className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {relatedTool.label}
            </Link>
            <Link
              href="/responsible-use"
              className="rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-100"
            >
              Responsible Use
            </Link>
            <Link
              href="/blog/how-to-convert-text-to-handwriting"
              className="rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-100"
            >
              Beginner Guide
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

function DocxHandwritingExperience() {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-3xl border border-slate-200 shadow-card">
      <HandwritingToolLoader profile="word" />
    </div>
  );
}

function BlogImage({ src = "", alt = "" }: React.ComponentPropsWithoutRef<"img">) {
  const imageSrc = typeof src === "string" ? src : "";
  const isGalleryImage = imageSrc.startsWith("/gallery/");

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={isGalleryImage ? 1384 : 1200}
      height={isGalleryImage ? 900 : 760}
      sizes="(max-width: 896px) calc(100vw - 48px), 768px"
      className="h-auto w-full rounded-2xl"
    />
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
