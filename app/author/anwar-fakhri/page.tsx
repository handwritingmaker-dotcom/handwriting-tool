import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteAuthor } from "@/lib/author";
import { getAllPosts } from "@/lib/blog";
import { defaultSocialImage } from "@/lib/seo";

const siteUrl = "https://www.handwritingtool.com";

export const metadata: Metadata = {
  title: "Anwar Fakhri | Founder and Editor of HandwritingTool",
  description:
    "Learn about Anwar Fakhri, founder and editor of HandwritingTool, and browse his guides about handwriting conversion, page layout, and printable documents.",
  alternates: { canonical: siteAuthor.profilePath },
  openGraph: {
    title: "Anwar Fakhri | HandwritingTool",
    description: siteAuthor.shortBio,
    url: siteAuthor.profilePath,
    type: "profile",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anwar Fakhri | HandwritingTool",
    description: siteAuthor.shortBio,
    images: [defaultSocialImage.url],
  },
};

export default function AnwarFakhriProfilePage() {
  const posts = getAllPosts();
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}${siteAuthor.profilePath}#person`,
      name: siteAuthor.name,
      url: `${siteUrl}${siteAuthor.profilePath}`,
      image: `${siteUrl}${siteAuthor.imagePath}`,
      jobTitle: siteAuthor.role,
      sameAs: [siteAuthor.pinterestUrl],
      worksFor: { "@type": "Organization", name: "HandwritingTool", url: siteUrl },
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <article className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:p-12">
        <div className="grid gap-8 md:grid-cols-[220px,1fr] md:items-center">
          <Image
            src={siteAuthor.imagePath}
            alt="Anwar Fakhri, founder and editor of HandwritingTool"
            width={640}
            height={960}
            priority
            sizes="(max-width: 768px) 176px, 220px"
            className="h-60 w-44 rounded-3xl object-cover object-top shadow-card md:h-[330px] md:w-[220px]"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Author profile</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{siteAuthor.name}</h1>
            <p className="mt-3 text-base font-semibold text-brand-green">{siteAuthor.role}</p>
            <p className="mt-6 text-lg leading-8 text-slate-600">{siteAuthor.shortBio}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={siteAuthor.pinterestUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Pinterest profile</a>
              <a href={`mailto:${siteAuthor.email}`} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Email Anwar</a>
            </div>
          </div>
        </div>

        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-semibold text-slate-950">Work at HandwritingTool</h2>
          <div className="mt-4 space-y-4 text-lg leading-8 text-slate-600">
            <p>Anwar builds and maintains the browser-based handwriting converter and reviews the site&apos;s guidance for clarity, practical usefulness, accurate descriptions of current features, and responsible use.</p>
            <p>His articles focus on using the tool effectively, choosing readable page settings, preparing printable output, and understanding what the converter can and cannot do.</p>
          </div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-semibold text-slate-950">Articles by Anwar Fakhri</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">{post.category}</p>
                <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-950">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{post.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
