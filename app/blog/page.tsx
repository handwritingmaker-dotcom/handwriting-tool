import Link from "next/link";
import { getAllPosts, type BlogCategory } from "@/lib/blog";
import { editorSocialImage } from "@/lib/seo";

export const metadata = {
  title: "Blog | HandwritingTool",
  description: "Browse practical handwriting guides organized by conversion basics, paper layout, PDF export, study notes, realistic settings, and research comparisons.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | HandwritingTool",
    description: "Browse practical handwriting guides organized by conversion basics, paper layout, PDF export, study notes, realistic settings, and research comparisons.",
    url: "/blog",
    type: "website",
    images: [editorSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | HandwritingTool",
    description: "Browse practical handwriting guides organized by conversion basics, paper layout, PDF export, study notes, realistic settings, and research comparisons.",
    images: [editorSocialImage.url],
  },
};

const popularGuides = [
  {
    href: "/blog/how-to-convert-text-to-handwriting",
    title: "How to Convert Text to Handwriting",
    text: "Start here for the complete step-by-step workflow.",
  },
  {
    href: "/blog/create-handwritten-pages-online-free",
    title: "Create Handwritten Pages Online Free",
    text: "Make complete handwritten-style pages from typed text.",
  },
  {
    href: "/blog/best-text-to-handwriting-tools-2026-comparison",
    title: "Best Tools Compared 2026",
    text: "Free and paid options reviewed side by side.",
  },
  {
    href: "/blog/how-to-make-handwriting-look-realistic-online",
    title: "Realistic Handwriting Guide",
    text: "Tune spacing, ink, and variation for natural-looking pages.",
  },
];

const categoryOrder: BlogCategory[] = [
  "Getting Started",
  "Handwriting Generators",
  "Paper & Layout",
  "PDF & Export",
  "Notes & Study",
  "Guides",
  "Research & Comparisons",
];

const categoryDescriptions: Record<BlogCategory, string> = {
  "Getting Started": "Understand the converter and build a reliable first-page workflow.",
  "Handwriting Generators": "Focused explanations of browser-based handwriting generation.",
  "Paper & Layout": "Choose page dimensions, ruled paper, graph paper, margins, and spacing.",
  "PDF & Export": "Prepare document text and produce readable, stable PDF or image output.",
  "Notes & Study": "Structure classroom, revision, and study notes before rendering them.",
  Guides: "Improve realism and handle common source-document workflows honestly.",
  "Research & Comparisons": "Compare available approaches and understand handwriting in digital work.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Guides for better notes, readable pages, and productive work
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Find the right guide for your task: start with conversion basics, choose a paper and page layout, prepare
          notes or document text, then export a readable PDF or image. Each article has a distinct purpose and links to
          the next relevant step.
        </p>
      </div>

      <section className="mb-10 rounded-[32px] border border-slate-200 bg-slate-950 p-6 text-white shadow-card lg:p-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Popular Guides</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Start with the most useful handwriting guides</h2>
          </div>
          <Link href="/#tool" className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950">
            Try Converter
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {popularGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/30 hover:bg-white/10"
            >
              <h3 className="text-base font-semibold text-white">{guide.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{guide.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-12">
        {categoryOrder.map((category) => {
          const categoryPosts = posts.filter((post) => post.category === category);
          if (categoryPosts.length === 0) return null;

          return (
            <section key={category} aria-labelledby={`category-${categoryId(category)}`}>
              <div className="mb-5 max-w-3xl">
                <h2
                  id={`category-${categoryId(category)}`}
                  className="text-3xl font-semibold tracking-tight text-slate-950"
                >
                  {category}
                </h2>
                <p className="mt-2 text-base leading-7 text-slate-600">{categoryDescriptions[category]}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {categoryPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-paper"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-blue">
                      <span>{category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 transition group-hover:text-brand-blue">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">{post.description}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                      Read article
                      <span aria-hidden="true">-&gt;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
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

function categoryId(category: BlogCategory) {
  return category.toLowerCase().replace("&", "and").replaceAll(" ", "-");
}
