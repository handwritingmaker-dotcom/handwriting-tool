import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, extractFaqs } from "@/lib/blog";
import { siteAuthor } from "@/lib/author";
import { outputSocialImage } from "@/lib/seo";
import { HandwritingToolLoader } from "@/components/HandwritingToolLoader";
import { publicContent } from "@/lib/cms/public";

const siteUrl = "https://www.handwritingtool.com";

const relatedToolBySlug: Record<string, { href: string; label: string }> = {
  "text-to-handwriting-pdf-generator": { href: "/tools/text-to-handwriting-pdf", label: "Open PDF generator" },
  "text-to-handwriting-on-lined-paper": { href: "/tools/lined-paper-handwriting", label: "Open lined-paper tool" },
  "graph-paper-handwriting-generator": { href: "/tools/graph-paper-handwriting", label: "Open graph-paper tool" },
  "handwritten-notes-generator": { href: "/tools/handwritten-notes", label: "Open notes generator" },
  "how-to-make-handwriting-practice-sheets": { href: "/templates", label: "Create a practice sheet" },
  "how-to-teach-cursive-writing-to-kids": { href: "/tools/handwriting-worksheet-generator", label: "Make tracing worksheets" },
  "kids-handwriting-practice-schedule": { href: "/tools/handwriting-worksheet-generator", label: "Build a practice worksheet" },
  "tracing-vs-freehand-handwriting-practice": { href: "/tools/handwriting-worksheet-generator", label: "Try the worksheet generator" },
  "daily-handwriting-drills-exercises": { href: "/tools/handwriting-worksheet-generator", label: "Create drill worksheets" },
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
  const cmsPost = await publicContent("POST", slug);
  if (cmsPost) {
    const title = `${cmsPost.seo_title || cmsPost.title} | HandwritingTool`;
    return {title,description:cmsPost.meta_description||cmsPost.excerpt,alternates:{canonical:cmsPost.canonical_url||`/blog/${slug}`},robots:cmsPost.robots_noindex?{index:false,follow:false}:undefined,openGraph:{title,description:cmsPost.meta_description||cmsPost.excerpt,url:`/blog/${slug}`,type:"article",publishedTime:(cmsPost.published_at??cmsPost.updated_at).toISOString(),modifiedTime:cmsPost.updated_at.toISOString(),images:[outputSocialImage]},twitter:{card:"summary_large_image",title,description:cmsPost.meta_description||cmsPost.excerpt,images:[outputSocialImage.url]}};
  }
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
  const cmsPost = await publicContent("POST",slug);
  if(cmsPost){const published=cmsPost.published_at??cmsPost.updated_at;const schema={"@context":"https://schema.org","@type":"BlogPosting",headline:cmsPost.title,description:cmsPost.excerpt,datePublished:published.toISOString(),dateModified:cmsPost.updated_at.toISOString(),mainEntityOfPage:`${siteUrl}/blog/${cmsPost.slug}`,image:cmsPost.featured_image_url?`${siteUrl}${cmsPost.featured_image_url}`:undefined,author:{"@type":"Person",name:cmsPost.author_name},publisher:{"@type":"Organization",name:"HandwritingTool"}};return <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><article className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:p-12">{cmsPost.featured_image_url&&<Image src={cmsPost.featured_image_url} alt={cmsPost.featured_image_alt||cmsPost.title} width={1200} height={630} className="mb-8 h-auto w-full rounded-2xl"/>}<p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">{cmsPost.category_name||"Guides"} &bull; {formatDate(published.toISOString())}</p><h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{cmsPost.title}</h1><p className="mt-4 text-lg leading-8 text-slate-600">{cmsPost.excerpt}</p><p className="mt-4 text-sm text-slate-500">Written by {cmsPost.author_name} · Updated {formatDate(cmsPost.updated_at.toISOString())}</p><div className="prose prose-slate mt-8 max-w-none" dangerouslySetInnerHTML={{__html:cmsPost.content_html}}/></article></main>}
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedTool = relatedToolBySlug[post.slug] ?? { href: "/#tool", label: "Try the main converter" };
  const authorName = post.authorName ?? siteAuthor.name;
  const authorBio = post.authorBio ?? siteAuthor.shortBio;
  const authorUrl = post.authorUrl ?? siteAuthor.profilePath;

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
      name: authorName,
      url: authorUrl.startsWith("http") ? authorUrl : `${siteUrl}${authorUrl}`,
      ...(post.authorName
        ? { sameAs: post.authorUrl ? [post.authorUrl] : undefined }
        : {
            "@id": `${siteUrl}${siteAuthor.profilePath}#person`,
            image: `${siteUrl}${siteAuthor.imagePath}`,
            jobTitle: siteAuthor.role,
            sameAs: [siteAuthor.pinterestUrl],
          }),
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

  const faqs = extractFaqs(post.content);
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]) }}
      />
      <article className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">
          {post.category} &bull; {formatDate(post.date)}
        </p>
        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 px-5 py-4">
          <p className="text-sm font-semibold text-slate-950">
            Written by{" "}
            <Link href={authorUrl} rel="author" className="text-brand-blue hover:underline">
              {authorName}
            </Link>
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {authorBio}
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
