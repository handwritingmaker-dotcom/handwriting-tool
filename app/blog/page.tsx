import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { editorSocialImage } from "@/lib/seo";

export const metadata = {
  title: "Blog | HandwritingTool",
  description:
    "Read the latest HandwritingTool guides about text-to-handwriting conversion, realistic settings, paper layouts, notes, and PDF export.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | HandwritingTool",
    description:
      "Read the latest HandwritingTool guides about text-to-handwriting conversion, realistic settings, paper layouts, notes, and PDF export.",
    url: "/blog",
    type: "website",
    images: [editorSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | HandwritingTool",
    description:
      "Read the latest HandwritingTool guides about text-to-handwriting conversion, realistic settings, paper layouts, notes, and PDF export.",
    images: [editorSocialImage.url],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="border-b border-slate-200 pb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">HandwritingTool Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Latest articles</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Practical guides for creating readable handwritten pages, choosing better settings, and exporting your work.
        </p>
      </header>

      <section className="divide-y divide-slate-200" aria-label="Blog articles">
        {posts.map((post) => (
          <article key={post.slug} className="py-9 sm:py-11">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">•</span>
              <span>{post.category}</span>
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              <Link href={`/blog/${post.slug}`} className="transition hover:text-brand-blue">
                {post.title}
              </Link>
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{post.description}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition hover:text-blue-800"
            >
              Read article <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
