import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const siteUrl = "https://www.handwritingtool.com";

export const metadata: Metadata = {
  title: "Free Handwriting Templates and Printable Paper | HandwritingTool",
  description:
    "Download free printable lined paper, graph paper, handwriting practice sheets, and a best settings guide for creating cleaner handwritten-style pages.",
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: "Free Handwriting Templates and Printable Paper | HandwritingTool",
    description:
      "Download free printable lined paper, graph paper, handwriting practice sheets, and a best settings guide for handwritten-style pages.",
    url: "/templates",
    type: "website",
    images: [
      {
        url: "/templates/best-handwriting-settings-guide.svg",
        width: 1200,
        height: 760,
        alt: "Best handwriting settings guide",
      },
    ],
  },
};

const downloads = [
  {
    title: "Printable Lined Paper PDF",
    description: "A clean A4 notebook-style lined paper template with a margin line for notes, drafts, and practice.",
    href: "/templates/printable-lined-paper-a4.pdf",
    type: "PDF",
  },
  {
    title: "Printable Graph Paper PDF",
    description: "A simple A4 graph paper template for math notes, lab records, formulas, and structured pages.",
    href: "/templates/printable-graph-paper-a4.pdf",
    type: "PDF",
  },
  {
    title: "Handwriting Practice Sheet",
    description: "A printable practice sheet with guide lines for handwriting exercises, examples, and drafts.",
    href: "/templates/handwriting-practice-sheet-a4.pdf",
    type: "PDF",
  },
  {
    title: "Best Settings Visual Guide",
    description: "A quick visual guide for choosing paper, ink, font size, spacing, and export format.",
    href: "/templates/best-handwriting-settings-guide.svg",
    type: "SVG",
  },
];

const settingsRows = [
  ["Study notes", "Lined", "Blue or black", "Medium", "Slightly open", "PDF"],
  ["Personal letters", "Blank", "Black", "Medium", "Open", "PDF or PNG"],
  ["Math or lab notes", "Graph", "Blue or black", "Small-medium", "Normal", "PDF"],
  ["Worksheets", "Blank or lined", "Black", "Medium", "Normal", "PDF"],
  ["Quick previews", "Any", "Blue", "Medium", "Normal", "PNG or JPG"],
];

const galleryItems = [
  {
    title: "Homepage Tool Preview",
    text: "A quick look at the browser-based converter experience.",
    src: "/blog/text-to-handwriting-tool-home.png",
    alt: "HandwritingTool homepage preview",
  },
  {
    title: "Editor and Page Controls",
    text: "Text input, paper controls, handwriting styles, and export options.",
    src: "/blog/text-to-handwriting-tool-editor.png",
    alt: "HandwritingTool editor controls",
  },
  {
    title: "Handwritten Output Preview",
    text: "Typed text and handwritten page output shown side by side.",
    src: "/blog/text-to-handwriting-output-preview.png",
    alt: "HandwritingTool handwritten output preview",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Handwriting Templates and Printable Paper",
  url: `${siteUrl}/templates`,
  description:
    "Free printable lined paper, graph paper, handwriting practice sheets, and settings resources for handwritten-style pages.",
  hasPart: downloads.map((item) => ({
    "@type": "DigitalDocument",
    name: item.title,
    url: `${siteUrl}${item.href}`,
    encodingFormat: item.type === "PDF" ? "application/pdf" : "image/svg+xml",
  })),
};

export default function TemplatesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section className="border-b border-slate-200 bg-hero-grid bg-grid">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Free Resources</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Handwriting templates, printable paper, and settings guides
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Download simple paper templates, choose better handwriting settings, and preview example outputs before
              creating your own handwritten-style pages.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#tool"
                className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Open Converter
              </Link>
              <a
                href="/templates/printable-lined-paper-a4.pdf"
                download
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Download Lined Paper
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Downloads</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Free printable handwriting resources
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {downloads.map((item) => (
            <article key={item.href} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-brand-blue">
                {item.type}
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
              <a
                href={item.href}
                download
                className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Download
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Best Settings</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Choose settings based on the page you want
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              These settings are starting points. After choosing them, preview the full page and adjust spacing or
              paragraph length before downloading.
            </p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-card">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-6 bg-slate-950 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
                <span>Use</span>
                <span>Paper</span>
                <span>Ink</span>
                <span>Size</span>
                <span>Spacing</span>
                <span>Export</span>
              </div>
              {settingsRows.map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-6 gap-2 border-t border-slate-200 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {row.map((cell, index) => (
                    <span key={`${row[0]}-${cell}`} className={index === 0 ? "font-semibold text-slate-950" : ""}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Sample Gallery</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            See the tool and output before you start
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <figure key={item.src} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
              <Image
                src={item.src}
                alt={item.alt}
                width={1350}
                height={638}
                className="aspect-[16/10] w-full rounded-2xl object-cover object-left-top"
              />
              <figcaption className="px-2 py-4">
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-emerald-100 bg-emerald-50 p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Next Step</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr,auto] lg:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Use a template or create a custom handwritten page
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                Download a blank template if you want to print and write manually, or open the converter to create a
                handwritten-style PDF, PNG, or JPG from typed text.
              </p>
            </div>
            <Link
              href="/#tool"
              className="w-fit rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Create Handwriting
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
