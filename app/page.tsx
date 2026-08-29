import Link from "next/link";
import Image from "next/image";
import { HandwritingToolLoader } from "@/components/HandwritingToolLoader";
import { StartConvertingButton } from "@/components/StartConvertingButton";
import { TrackedLink } from "@/components/TrackedLink";

const siteUrl = "https://www.handwritingtool.com";

const features = [
  {
    title: "10 Handwriting Styles",
    text: "Choose from 10 readable styles, with natural variation in character size, position, and angle.",
    icon: "pen",
  },
  {
    title: "Live Preview and Autosave",
    text: "Preview each page as you edit, while your text and settings are saved locally for this browser and tool profile.",
    icon: "spark",
  },
  {
    title: "Flexible Paper",
    text: "Use lined, blank, or graph paper, or upload a custom paper image that stays in your browser.",
    icon: "paper",
  },
  {
    title: "Ink and Page Controls",
    text: "Adjust ink color, font size, line and word spacing, margins, brightness, and natural variation.",
    icon: "check",
  },
  {
    title: "A4, Letter, and Multiple Pages",
    text: "Choose A4 or Letter sizing and let longer text flow across multiple preview and export pages.",
    icon: "phone",
  },
  {
    title: "PDF, PNG, and JPG Export",
    text: "Download the current page or complete document as a handwritten PDF, PNG, or JPG output.",
    icon: "download",
  },
];

const relatedTools = [
  {
    title: "PDF to Handwriting Converter",
    text: "Import selectable text from a text-based PDF, edit it, and create handwritten pages.",
    href: "/tools/text-to-handwriting-pdf",
  },
  {
    title: "Lined Paper Handwriting Tool",
    text: "Create readable notebook-style output with ruled baselines and a visible margin.",
    href: "/tools/lined-paper-handwriting",
  },
  {
    title: "Graph Paper Handwriting Tool",
    text: "Use a structured grid for lab observations, labels, and plain-text calculations.",
    href: "/tools/graph-paper-handwriting",
  },
  {
    title: "Handwritten Notes Tool",
    text: "Format class notes and revision points with optional title, subject, and date details.",
    href: "/tools/handwritten-notes",
  },
];

const handwritingUses = [
  ["Handwritten notes", "Turn your own typed notes into readable pages for review or printing."],
  ["Printable study pages", "Arrange summaries and revision prompts on lined, blank, or graph paper."],
  ["Classroom examples", "Prepare teacher-created examples, prompts, and demonstration pages."],
  ["Journal pages", "Format personal reflections and creative drafts with adjustable paper and ink."],
  ["Letters", "Create a handwritten-style layout for personal correspondence you are permitted to use."],
  ["Design previews", "Test handwritten-style copy in mockups without claiming it was written by hand."],
];

const outputGallery = [
  {
    title: "Lined notebook page",
    text: "The live lined-paper workspace with notebook spacing, a visible margin, and the generated A4 page beside the editor.",
    image: "/gallery/lined-paper-output.png",
    href: "/tools/lined-paper-handwriting",
    analyticsTarget: "gallery-lined" as const,
    tag: "LINED A4",
  },
  {
    title: "Blank paper letter",
    text: "A real blank-paper conversion created from a short personal-letter sample inside the running converter.",
    image: "/gallery/blank-paper-output.png",
    href: "/#tool",
    analyticsTarget: "gallery-blank" as const,
    tag: "BLANK PAPER",
  },
  {
    title: "Graph paper lab record",
    text: "The graph-paper preset rendering a pendulum observation with structured spacing and black handwritten text.",
    image: "/gallery/graph-paper-output.png",
    href: "/tools/graph-paper-handwriting",
    analyticsTarget: "gallery-graph" as const,
    tag: "GRAPH GRID",
  },
  {
    title: "Handwritten revision notes",
    text: "The notes workspace with optional note details, revision text, and its generated notebook page shown together.",
    image: "/gallery/notes-output.png",
    href: "/tools/handwritten-notes",
    analyticsTarget: "gallery-notes" as const,
    tag: "STUDY NOTES",
  },
  {
    title: "Worksheet workspace",
    text: "The actual main converter with worksheet presets, editable source text, and a complete live page preview.",
    image: "/gallery/worksheet-output.png",
    href: "/#tool",
    analyticsTarget: "gallery-worksheet" as const,
    tag: "WORKSHEET",
  },
  {
    title: "Multi-page PDF workflow",
    text: "A genuine long-document test showing 684 detected words, seven generated pages, and the first PDF page preview.",
    image: "/gallery/multi-page-pdf-output.png",
    href: "/tools/text-to-handwriting-pdf",
    analyticsTarget: "gallery-pdf" as const,
    tag: "7 PAGE PDF",
  },
];

const faqs = [
  {
    question: "What is a text to handwriting converter?",
    answer: "It turns typed or pasted text into handwriting-style pages with controls for writing style, paper, ink, spacing, margins, and downloadable output.",
  },
  {
    question: "Is the text to handwriting converter free?",
    answer: "Yes. The converter is free to use without creating an account.",
  },
  {
    question: "Can I convert typed text to handwriting online?",
    answer: "Yes. Type directly or paste text into the main editor, or use the Word converter guide to upload a modern DOCX file and customize the handwritten page.",
  },
  {
    question: "Can I download handwriting as a PDF?",
    answer: "Yes. You can download the current page or all generated pages as a PDF, and PNG or JPG image export is also available.",
  },
  {
    question: "Can I use custom paper?",
    answer: "Yes. Select Custom Paper and upload a PNG, JPG, or WebP image up to 8 MB. The image is processed locally and must be selected again after a refresh.",
  },
  {
    question: "Does HandwritingTool save my text?",
    answer: "The converter autosaves your text and editable settings in this browser using profile-specific local storage. Preview images, uploaded paper files, and source PDFs are not saved there.",
  },
  {
    question: "Can I convert a PDF to handwriting?",
    answer: "Yes. The dedicated tool can import selectable text from a text-based PDF and place it in the handwriting editor. Scanned PDFs still require OCR, which is not supported yet.",
    href: "/tools/text-to-handwriting-pdf",
    linkLabel: "Open the PDF to handwriting converter",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: [faq.answer, faq.linkLabel].filter(Boolean).join(" "),
    },
  })),
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${siteUrl}/#webapplication`,
  name: "HandwritingTool",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: siteUrl,
  image: `${siteUrl}/blog/current-tool-home-preview.png`,
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "10 handwriting styles",
    "Lined, blank, graph, and custom paper",
    "A4 and Letter page sizes",
    "Multi-page PDF export",
    "PNG and JPG export",
    "Browser-based text rendering",
    "Browser-local autosave",
  ],
  description:
    "Free text to handwriting converter for creating realistic handwritten-style pages online and exporting them as multi-page PDF, PNG, or JPG.",
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareSchema, faqSchema]) }}
      />
      <section className="hero-surface border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 pb-5 pt-6 text-center sm:px-6 sm:pb-7 sm:pt-8 lg:px-8 lg:pb-8 lg:pt-10">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue shadow-sm">
            <FeatureIcon name="spark" className="h-4 w-4" />
            Free &bull; Private &bull; No sign up
          </div>
          <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
            Free <span className="hero-ink">Text to Handwriting Converter</span> Online
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Type or paste text to convert text to handwriting-style pages with 10 writing styles, lined, blank, graph,
            or custom paper, adjustable ink and spacing, instant preview, and PDF, PNG, or JPG export.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <StartConvertingButton />
            <p className="text-sm text-slate-600">Free, no sign-up, browser-local processing, with PDF and image export.</p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm font-medium text-slate-600">
            {[
              ["10 handwriting styles", "spark"],
              ["Lined, blank, graph & custom paper", "paper"],
              ["Multi-page PDF & image export", "check"],
            ].map(([label, icon]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <FeatureIcon name={icon} className="h-4 w-4 text-brand-blue" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1500px] px-2 py-3 sm:px-5 sm:py-5 lg:px-7 lg:py-6">
        <HandwritingToolLoader />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 text-sm font-medium text-slate-600 shadow-sm md:grid-cols-3">
          <div className="flex items-center gap-2">
            <FeatureIcon name="check" className="h-4 w-4 text-brand-green" />
            Handwriting text is rendered in your browser
          </div>
          <div className="flex items-center gap-2">
            <FeatureIcon name="check" className="h-4 w-4 text-brand-green" />
            No login required
          </div>
          <div className="flex items-center gap-2">
            <FeatureIcon name="check" className="h-4 w-4 text-brand-green" />
            No account or server-side text storage
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="output-gallery-heading">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Real Output Examples</p>
          <h2 id="output-gallery-heading" className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            See six pages created with HandwritingTool
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            These examples show output from the current handwriting styles and page controls. Open the matching tool
            to create your own version and check every page before downloading.
          </p>
        </div>
        <div className="grid gap-7 lg:grid-cols-2">
          {outputGallery.map((sample) => (
            <TrackedLink
              key={sample.title}
              href={sample.href}
              eventName="related_tool_clicked"
              eventTarget={sample.analyticsTarget}
              className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-paper"
            >
              <Image
                src={sample.image}
                alt={`${sample.title} created with the HandwritingTool converter`}
                width={1200}
                height={760}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[1.54/1] w-full border-b border-slate-200 object-cover object-top transition duration-500 group-hover:scale-[1.015]"
              />
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-brand-blue">{sample.tag}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 transition group-hover:text-brand-blue">{sample.title}</h3>
                  </div>
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl text-brand-blue">&#8599;</span>
                </div>
                <p className="mt-3 leading-7 text-slate-600">{sample.text}</p>
                <p className="mt-5 text-sm font-semibold text-brand-blue">Open this live workspace -&gt;</p>
              </div>
            </TrackedLink>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-card lg:grid-cols-[0.95fr,1.05fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Free Templates</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Printable paper and settings guides for cleaner handwriting pages
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Download lined paper, graph paper, a handwriting practice sheet, and a best settings guide. Use them for
              manual writing, examples, drafts, or alongside the converter.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View Templates
              </Link>
              <a
                href="/templates/printable-lined-paper-a4.pdf"
                download
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Download Lined Paper
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Lined Paper PDF", "Notebook-style printable page"],
              ["Graph Paper PDF", "Math and lab note template"],
              ["Practice Sheet", "Guide lines for handwriting practice"],
              ["Settings Guide", "Best paper, ink, size, and export choices"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl scroll-mt-36 px-4 py-16 sm:px-6 md:scroll-mt-28 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Quality & Page Controls</p>
          <h2 id="features-heading" tabIndex={-1} className="mt-3 text-4xl font-semibold text-slate-950">
            Text to Handwriting Features
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Select the writing style and paper, then fine-tune spacing, margins, ink, variation, and export without
            leaving the live preview.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-brand-blue">
                <FeatureIcon name={feature.icon} className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="what-is-converter">
        <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-card lg:p-10">
          <h2 id="what-is-converter" className="text-3xl font-semibold tracking-tight text-slate-950">
            What Is a Text to Handwriting Converter?
          </h2>
          <div className="mt-4 max-w-4xl space-y-4 text-base leading-7 text-slate-600">
            <p>
              A text to handwriting converter turns typed words into complete handwriting-style pages. It does more than
              swap a regular font: HandwritingTool lays out the text on lined, blank, graph, or custom paper and lets you
              control ink, spacing, margins, page size, and natural character variation.
            </p>
            <p>
              Longer text is paginated automatically for A4 or Letter output, while the live preview shows each generated
              page before you download it as PDF, PNG, or JPG. You can type directly or copy text from Word or Google Docs;
              the main converter does not require a DOCX upload.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="handwriting-use-cases">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Practical Uses</p>
          <h2 id="handwriting-use-cases" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Ways to Use the Handwriting Converter
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {handwritingUses.map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Focused Tools</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Related Handwriting Tools
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Each focused workspace opens the same converter with suitable starter text and page settings already selected.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {relatedTools.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-paper"
            >
              <h3 className="text-xl font-semibold tracking-tight text-slate-950 transition group-hover:text-brand-blue">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{item.text}</p>
              <p className="mt-5 text-sm font-semibold text-brand-blue">Open tool -&gt;</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="seo-guide" className="mx-auto max-w-7xl scroll-mt-36 px-4 pb-20 sm:px-6 md:scroll-mt-28 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Text to Handwriting Guide</p>
          <article className="mt-6 grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
            <div>
              <h2 id="seo-guide-heading" tabIndex={-1} className="text-3xl font-semibold text-slate-950">Convert Your Text in Three Steps</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Paste your text, choose the handwriting and page settings, then check every generated page before
                downloading a PDF, PNG, or JPG.
              </p>
              <ol className="mt-6 space-y-4 text-slate-700">
                {[
                  ["1", "Type or paste text", "Write directly or paste text copied from Word, Google Docs, or another editor."],
                  ["2", "Customize handwriting and paper", "Choose a handwriting style, paper, ink, spacing, margins, and page size."],
                  ["3", "Preview and download", "Review every page, then download PDF, PNG, or JPG output."],
                ].map(([number, title, text]) => (
                  <li key={number} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-brand-blue">{number}</span>
                    <div>
                      <h3 className="font-semibold text-slate-950">{title}</h3>
                      <p className="mt-1 leading-7 text-slate-600">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Helpful details before you start</h2>
              <ul className="mt-5 space-y-3 leading-7 text-slate-700">
                <li>Choose A4 or Letter to match your intended print size.</li>
                <li>Use PDF for multi-page documents and PNG for a sharp single page.</li>
                <li>Your handwriting text is rendered in the browser without an account.</li>
                <li>Review names, symbols, and page breaks before printing or sharing.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedLink href="/blog/how-to-convert-text-to-handwriting" eventName="guide_clicked" eventTarget="beginner-guide" className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Read full guide
                </TrackedLink>
                <Link href="/responsible-use" className="rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-100">
                  Responsible use
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Frequently Asked Questions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {faq.answer}{faq.href && faq.linkLabel ? <> <Link href={faq.href} className="font-semibold text-brand-blue hover:underline">{faq.linkLabel}</Link></> : null}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-card lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Learning Center</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold">Guides for notes, worksheets, and printable page workflows</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Read practical articles about text to handwriting conversion, responsible formatting, productivity
                tools, and exporting clean PDF pages for personal, teaching, and creative use.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                <Link
                  href="/blog/how-to-convert-text-to-handwriting"
                  className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-white/40"
                >
                  How to Convert Text to Handwriting
                </Link>
                <Link
                  href="/blog/best-text-to-handwriting-settings-realistic-output"
                  className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-white/40"
                >
                  Best Settings for Realistic Output
                </Link>
                <Link
                  href="/blog/best-text-to-handwriting-tools-2026-comparison"
                  className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-white/40"
                >
                  Best Text to Handwriting Tools 2026
                </Link>
                <Link
                  href="/blog/best-text-to-handwriting-settings-realistic-output"
                  className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-white/40"
                >
                  Make Pages Look Natural
                </Link>
              </div>
            </div>
            <Link
              href="/blog"
              className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Read Blog Guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureIcon({ name, className }: { name: string; className?: string }) {
  if (name === "spark") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
        viewBox="0 0 24 24"
      >
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
        <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />
      </svg>
    );
  }

  if (name === "paper") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
        viewBox="0 0 24 24"
      >
        <path d="M6 3h9l3 3v15H6Z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    );
  }

  if (name === "download") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
        viewBox="0 0 24 24"
      >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
        viewBox="0 0 24 24"
      >
        <rect height="18" rx="2" width="11" x="6.5" y="3" />
        <path d="M10 17.5h4" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
        viewBox="0 0 24 24"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
    >
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L7 21l-4 1 1-4Z" />
    </svg>
  );
}
