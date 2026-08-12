import Link from "next/link";
import { AdsterraNative, ResponsiveAdsterraBanner } from "@/components/ads/AdsterraAds";
import { getAllPosts } from "@/lib/blog";
import { editorSocialImage } from "@/lib/seo";

export const metadata = {
  title: "HandwritingTool Blog | Text to Handwriting Guides",
  description:
    "Read the latest HandwritingTool guides about text-to-handwriting conversion, realistic settings, paper layouts, notes, and PDF export.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "HandwritingTool Blog | Text to Handwriting Guides",
    description:
      "Read the latest HandwritingTool guides about text-to-handwriting conversion, realistic settings, paper layouts, notes, and PDF export.",
    url: "/blog",
    type: "website",
    images: [editorSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "HandwritingTool Blog | Text to Handwriting Guides",
    description:
      "Read the latest HandwritingTool guides about text-to-handwriting conversion, realistic settings, paper layouts, notes, and PDF export.",
    images: [editorSocialImage.url],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [latestPost, ...olderPosts] = posts;

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="mb-10 max-w-3xl sm:mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">HandwritingTool Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Text to handwriting blog and practical guides</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Clear advice for better handwritten pages, realistic settings, printable layouts, and reliable exports.
        </p>
      </header>

      {latestPost && (
        <article className="relative mb-14 overflow-hidden rounded-[32px] bg-slate-950 text-white shadow-card">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:p-12">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="rounded-full bg-blue-500 px-3 py-1 font-semibold text-white">Latest article</span>
                <time dateTime={latestPost.date}>{formatDate(latestPost.date)}</time>
                <span aria-hidden="true">/</span>
                <span>{latestPost.category}</span>
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                <Link href={`/blog/${latestPost.slug}`} className="transition hover:text-blue-200">
                  {latestPost.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{latestPost.description}</p>
              <Link
                href={`/blog/${latestPost.slug}`}
                className="mt-7 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
              >
                Read latest article <span className="ml-2" aria-hidden="true">-&gt;</span>
              </Link>
            </div>

            <div className="hidden justify-self-end lg:block" aria-hidden="true">
              <div className="w-64 rotate-2 rounded-2xl bg-[#fffdf7] p-7 shadow-2xl">
                <div className="mb-5 h-2 w-20 rounded-full bg-blue-500" />
                <div className="space-y-4">
                  <div className="h-px bg-blue-200" />
                  <div className="h-px bg-blue-200" />
                  <div className="h-px bg-blue-200" />
                  <div className="h-px bg-blue-200" />
                  <div className="h-px bg-blue-200" />
                  <div className="h-px bg-blue-200" />
                </div>
                <p className="mt-6 text-2xl font-semibold italic leading-snug text-blue-600">Better settings.<br />Better pages.</p>
              </div>
            </div>
          </div>
        </article>
      )}

      <ResponsiveAdsterraBanner />

      <section aria-labelledby="all-articles-heading">
        <div className="mb-7 flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">Browse</p>
            <h2 id="all-articles-heading" className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">All articles</h2>
          </div>
          <p className="hidden text-sm text-slate-500 sm:block">Newest first</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {olderPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-brand-blue">{post.category}</span>
                <time className="text-slate-500" dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-slate-950 sm:text-2xl">
                <Link href={`/blog/${post.slug}`} className="transition group-hover:text-brand-blue">
                  {post.title}
                </Link>
              </h3>

              <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-600">{post.description}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-auto pt-6 text-sm font-semibold text-brand-blue transition group-hover:text-blue-800"
              >
                Read article <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <AdsterraNative />
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
