import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { outputSocialImage } from "@/lib/seo";

const siteUrl = "https://www.handwritingtool.com";

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

  const title = `${post.title} | HandwritingTool`;

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    image: `${siteUrl}${outputSocialImage.url}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Anwar",
      url: siteUrl,
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
          {formatDate(post.date)}
        </p>
        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 px-5 py-4">
          <p className="text-sm font-semibold text-slate-950">Written by Anwar, Founder of HandwritingTool</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Practical guidance from the team behind HandwritingTool, focused on helping students and everyday users
            create clear handwritten-style pages faster.
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Updated {formatDate(post.updated || post.date)}. Use the tool only for notes, drafts, worksheets, examples,
            and formats allowed by your instructions.
          </p>
        </div>
        <div className="prose prose-slate mt-6 max-w-none prose-headings:tracking-tight prose-headings:text-slate-950 prose-a:text-brand-blue prose-strong:text-slate-950 prose-li:marker:text-brand-blue">
          <MDXRemote source={post.content} />
        </div>
        <section className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Use the Converter Responsibly</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            HandwritingTool is best for readable notes, drafts, worksheets, examples, printable study material, and
            permitted handwritten-style page formats. If original handwriting is required, follow that rule.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/#tool"
              className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Converter
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
