import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

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
    },
    twitter: {
      card: "summary",
      title,
      description: post.description,
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
    dateModified: post.date,
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
        </div>
        <div className="prose prose-slate mt-6 max-w-none prose-headings:tracking-tight prose-headings:text-slate-950 prose-a:text-brand-blue prose-strong:text-slate-950 prose-li:marker:text-brand-blue">
          <MDXRemote source={post.content} />
        </div>
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
