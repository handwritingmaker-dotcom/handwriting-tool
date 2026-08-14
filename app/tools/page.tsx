import type { Metadata } from "next";
import Link from "next/link";
import { editorSocialImage } from "@/lib/seo";
import { toolPageConfigs } from "@/lib/tool-pages";

export const metadata: Metadata = {
  title: "Free Handwriting Tools for Notes, Paper and PDF",
  description: "Use free browser-based handwriting tools for lined paper, graph paper, notes, and handwritten-style PDF exports.",
  alternates: { canonical: "/tools" },
  openGraph: { title: "Free Handwriting Tools for Notes, Paper and PDF", description: "Choose a focused handwriting workspace for lined paper, graph paper, study notes, or PDF creation.", url: "/tools", type: "website", images: [editorSocialImage] },
  twitter: { card: "summary_large_image", title: "Free Handwriting Tools for Notes, Paper and PDF", description: "Choose a focused handwriting workspace for lined paper, graph paper, study notes, or PDF creation.", images: [editorSocialImage.url] },
};

const tools = Object.values(toolPageConfigs);
const siteUrl = "https://www.handwritingtool.com";

export default function ToolsPage() {
  const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "HandwritingTool tools", itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.name, url: `${siteUrl}${tool.path}` })) };
  const cardClass = "rounded-[32px] border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue";

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">HandwritingTool workspace</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Choose a handwriting tool for your task</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">Each workspace uses the same private browser-based renderer with defaults tailored to paper, notes, or PDF output.</p>
      </section>
      <section aria-labelledby="tool-list-heading" className="mt-12">
        <h2 id="tool-list-heading" className="sr-only">Available handwriting tools</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/#tool" className={`${cardClass} border-blue-200 bg-blue-50`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">Main converter</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Text to Handwriting Converter</h2>
            <p className="mt-3 leading-7 text-slate-600">Start with the complete general-purpose editor and choose every supported paper, spacing, and export option.</p>
          </Link>
          {tools.map((tool) => (
            <Link key={tool.path} href={tool.path} className={cardClass}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">Focused workspace</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">{tool.name}</h2>
              <p className="mt-3 leading-7 text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
