import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | HandwritingTool",
  description: "Helpful articles about handwriting converters, assignments, handwritten notes, PDFs, and study workflows.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | HandwritingTool",
    description: "Helpful articles about handwriting converters, assignments, handwritten notes, PDFs, and study workflows.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog | HandwritingTool",
    description: "Helpful articles about handwriting converters, assignments, handwritten notes, PDFs, and study workflows.",
  },
};

const popularGuides = [
  {
    href: "/blog/how-to-convert-text-to-handwriting",
    title: "How to Convert Text to Handwriting",
    text: "Start here for the complete beginner workflow.",
  },
  {
    href: "/blog/text-to-handwriting-pdf-generator",
    title: "Text to Handwriting PDF Generator",
    text: "Best guide for printable PDF downloads.",
  },
  {
    href: "/blog/handwriting-generator-for-assignments",
    title: "Handwriting Generator for Assignments",
    text: "A practical guide for student assignment pages.",
  },
  {
    href: "/blog/how-to-make-handwriting-look-realistic-online",
    title: "Make Handwriting Look Realistic",
    text: "Improve fonts, spacing, margins, and paper settings.",
  },
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Guides for better notes, assignments, and productive work
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Practical articles for students, creators, and developers who want cleaner workflows and faster results.
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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-paper"
          >
            <p className="text-sm font-semibold text-brand-blue">{formatDate(post.date)}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 transition group-hover:text-brand-blue">
              {post.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{post.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
              Read article
              <span aria-hidden="true">-&gt;</span>
            </div>
          </Link>
        ))}
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
