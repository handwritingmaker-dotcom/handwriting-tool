import Link from "next/link";
import Image from "next/image";
import { HandwritingToolLoader } from "@/components/HandwritingToolLoader";

const siteUrl = "https://www.handwritingtool.com";

const features = [
  {
    title: "Human Letter Flow",
    text: "Every character gets tiny movement, size, and angle changes so the writing avoids a robotic pattern.",
    icon: "pen",
  },
  {
    title: "Style Packs",
    text: "Pick from notes, worksheet, lab, and clean notebook styles built for readable handwritten-style pages.",
    icon: "spark",
  },
  {
    title: "Real Paper Feel",
    text: "Lined, blank, and graph paper layouts include margins, soft texture, and classroom-ready spacing.",
    icon: "paper",
  },
  {
    title: "Fast Export",
    text: "Download handwritten pages as PNG, JPG, or PDF in one click without sending your text anywhere.",
    icon: "download",
  },
  {
    title: "Mobile Ready",
    text: "Generate and preview pages from phone, tablet, or desktop with a layout made for quick use.",
    icon: "phone",
  },
  {
    title: "Page Layout Mode",
    text: "Turn paragraphs into neat notebook-style pages with automatic indentation and balanced margins.",
    icon: "check",
  },
];

const useCases = [
  {
    title: "Free Printable Templates",
    text: "Download lined paper, graph paper, practice sheets, and settings guides.",
    href: "/templates",
  },
  {
    title: "How to Convert Text to Handwriting",
    text: "Start with the complete text-to-handwriting workflow.",
    href: "/blog/how-to-convert-text-to-handwriting",
  },
  {
    title: "Create Handwritten Pages Online Free",
    text: "Build printable page layouts from your own notes and drafts.",
    href: "/blog/create-handwritten-pages-online-free",
  },
  {
    title: "Best Text to Handwriting Tools 2026",
    text: "Compare free and paid handwriting converter options.",
    href: "/blog/best-text-to-handwriting-tools-2026-comparison",
  },
  {
    title: "Journal Writing",
    text: "Draft private reflections, prompts, and planning pages for personal use.",
    href: "/blog/handwritten-notes-generator",
  },
  {
    title: "Teacher Worksheets",
    text: "Prepare printable worksheet examples, class notes, and teaching resources.",
    href: "/templates",
  },
  {
    title: "Creative Projects",
    text: "Plan quote pages, recipe cards, greeting cards, and layout drafts.",
    href: "/blog/how-to-make-typed-notes-look-handwritten-online",
  },
  {
    title: "Design Mockups",
    text: "Preview labels, stationery concepts, and note-style visuals before publishing.",
    href: "/blog/how-to-make-handwriting-look-realistic-online",
  },
];

const popularGuides = [
  {
    title: "How to Convert Text to Handwriting",
    href: "/blog/how-to-convert-text-to-handwriting",
  },
  {
    title: "Best Text to Handwriting Tools 2026",
    href: "/blog/best-text-to-handwriting-tools-2026-comparison",
  },
  {
    title: "Text to Handwriting PDF Generator",
    href: "/blog/text-to-handwriting-pdf-generator",
  },
  {
    title: "Handwritten Notes Generator",
    href: "/blog/handwritten-notes-generator",
  },
];

const comparisonRows = [
  ["No signup", "Start in the browser without creating an account.", "Many tools add login or account friction."],
  ["PDF, PNG, JPG", "Export complete pages as PDF or image formats.", "Some converters only download PNG images."],
  ["Real page controls", "Adjust paper, spacing, margins, ink, and handwriting variation.", "Basic tools often only change the font."],
  ["Privacy friendly", "Text is processed in your browser and is not stored by HandwritingTool.", "Upload-based workflows may require sending files."],
];

const faqs = [
  {
    question: "Is this text to handwriting converter free?",
    answer: "Yes, the tool is completely free to use.",
  },
  {
    question: "Can I download handwritten pages as PDF?",
    answer: "Yes, you can download your handwritten output as PDF, PNG, or JPG.",
  },
  {
    question: "Does the tool store my data?",
    answer: "No, all processing happens in your browser and nothing is stored.",
  },
  {
    question: "What can I create with this handwriting tool?",
    answer:
      "You can create personal notes, teacher worksheets, creative drafts, journal pages, printables, and design mockups.",
  },
  {
    question: "Can I use this as a word to handwriting converter online free?",
    answer:
      "Yes. You can copy text from Word or another document, paste it into HandwritingTool, and download handwritten pages.",
  },
  {
    question: "What makes the page output readable?",
    answer:
      "Readable handwriting styles, natural spacing, paper backgrounds, margins, ink color, and small variation settings help the output look more natural.",
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
      text: faq.answer,
    },
  })),
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "HandwritingTool",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  url: siteUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online tool for creating printable notes, teacher worksheets, journal pages, creative drafts, and design mockups as PDF, PNG, or JPG.",
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareSchema, faqSchema]) }}
      />
      <section className="hero-surface border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pb-10 sm:pt-14 lg:px-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue shadow-sm">
            <FeatureIcon name="spark" className="h-4 w-4" />
            Free · Private · No sign up
          </div>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
            Transform your text into <span className="hero-ink">natural handwriting</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Type or paste your text, shape every detail, and export polished handwritten pages as PDF, PNG, or JPG.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
            {[
              ["10 handwriting styles", "spark"],
              ["Lined, blank & graph paper", "paper"],
              ["Instant browser preview", "check"],
            ].map(([label, icon]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <FeatureIcon name={icon} className="h-4 w-4 text-brand-blue" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1500px] px-3 py-6 sm:px-5 lg:px-7 lg:py-8">
        <HandwritingToolLoader />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 text-sm font-medium text-slate-600 shadow-sm md:grid-cols-3">
          <div className="flex items-center gap-2">
            <FeatureIcon name="check" className="h-4 w-4 text-brand-green" />
            Your text is processed in your browser
          </div>
          <div className="flex items-center gap-2">
            <FeatureIcon name="check" className="h-4 w-4 text-brand-green" />
            No login required
          </div>
          <div className="flex items-center gap-2">
            <FeatureIcon name="check" className="h-4 w-4 text-brand-green" />
            Nothing is stored
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr,1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Output Preview</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              See how the text to handwriting converter looks before you export
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              HandwritingTool is built around real page output, not only font styling. You can preview notebook-style
              handwriting, tune spacing, and download the final page as PDF, PNG, or JPG.
            </p>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">Typed text and handwritten preview side by side</div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">Real-time page preview before download</div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">PDF, PNG, and JPG export after checking layout</div>
            </div>
          </div>
          <figure className="rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
            <Image
              src="/blog/current-tool-output-preview.png"
              alt="HandwritingTool text input and real-time handwritten page preview"
              width={1200}
              height={760}
              className="h-auto w-full rounded-2xl"
            />
            <figcaption className="mt-4 px-2 text-sm leading-6 text-slate-600">
              Paste typed content on one side and review the handwritten page output on the other before exporting.
            </figcaption>
          </figure>
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
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Handwriting Quality</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-950">
            Clean handwriting output with controls that keep every page readable
          </h2>
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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Use Cases</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Practical pages for teachers, writers, and creators
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Choose a page type, adjust the layout, preview the result, and export a clean file for your own notes,
            teaching materials, creative projects, or design previews.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-paper"
            >
              <h3 className="text-xl font-semibold tracking-tight text-slate-950 transition group-hover:text-brand-blue">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{item.text}</p>
              <p className="mt-5 text-sm font-semibold text-brand-blue">Read guide -&gt;</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="popular-guides" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Popular Guides</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Popular Guides</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Start with the most useful handwriting guides
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {popularGuides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-paper"
            >
              <h3 className="text-xl font-semibold tracking-tight text-slate-950 transition group-hover:text-brand-blue">
                {guide.title}
              </h3>
              <p className="mt-5 text-sm font-semibold text-brand-blue">Read guide -&gt;</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Why Choose Us</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Why HandwritingTool is different from a basic handwriting font generator
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            A basic handwriting generator changes text style. HandwritingTool focuses on the complete page: paper,
            margins, spacing, handwriting variation, and export formats.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
          <div className="grid bg-slate-950 px-5 py-4 text-sm font-semibold text-white md:grid-cols-[0.8fr,1fr,1fr]">
            <div>Feature</div>
            <div>HandwritingTool</div>
            <div>Basic converters</div>
          </div>
          {comparisonRows.map(([feature, ours, basic]) => (
            <div
              key={feature}
              className="grid gap-3 border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600 md:grid-cols-[0.8fr,1fr,1fr]"
            >
              <div className="font-semibold text-slate-950">{feature}</div>
              <div>{ours}</div>
              <div>{basic}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="seo-guide" className="mx-auto max-w-7xl scroll-mt-36 px-4 pb-20 sm:px-6 md:scroll-mt-28 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Text to Handwriting Guide</p>
          <article className="mt-6 space-y-5 text-slate-600">
            <h2 className="text-3xl font-semibold text-slate-950">Create Handwritten-Style Pages Online</h2>
            <p className="text-lg leading-8">
              HandwritingTool helps you create readable handwritten-style pages for notes, printables, classroom
              examples, journal pages, and design previews.
            </p>
            <p className="text-lg leading-8">
              The editor keeps the workflow simple: paste your own text, choose a paper style, adjust spacing and ink,
              preview the page, then export a PDF, PNG, or JPG.
            </p>
            <p className="text-lg leading-8">
              Start with our{" "}
              <Link href="/blog/how-to-convert-text-to-handwriting" className="font-semibold text-brand-blue">
                step-by-step guide on how to convert text to handwriting
              </Link>{" "}
              to learn the complete workflow.
            </p>
            <p className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-base font-semibold text-brand-blue">
              No signup. No upload. Preview the page in your browser before downloading.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">What Can You Make?</h2>
            <p className="text-lg leading-8">
              It is a browser tool for creating handwritten-style notes from typed text. The output is useful for
              printable drafts, teaching examples, journal layouts, and visual concepts without opening a design app.
            </p>
            <p className="text-lg leading-8">
              All preview work happens on your device. You can test paper, margins, line height, color, and export
              format before saving the final file.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Teachers preparing printable worksheet examples and classroom notes</li>
              <li>Writers drafting journal pages, planning notes, and creative layouts</li>
              <li>Creators previewing stationery, labels, quote pages, and mockups</li>
            </ul>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Create a Page in a Few Steps</h2>
            <p className="text-lg leading-8">
              Copy text from Word, Google Docs, Notepad, or any editor and paste it into the tool. Pick a style, check
              the live preview, and download only when the page is clear and readable.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Enter or paste your text</li>
              <li>Select lined, blank, or graph paper</li>
              <li>Adjust margins, spacing, ink, and style</li>
              <li>Export a PDF or image after reviewing the page</li>
            </ul>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Responsible Use Cases</h2>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Teachers creating printable worksheets and example notes</li>
              <li>Writers drafting handwritten-style journal and planning pages</li>
              <li>Creators making recipe cards, quote layouts, stationery previews, and mockups</li>
              <li>Anyone preparing personal notes, drafts, or printable resources</li>
            </ul>
            <p className="text-lg leading-8">
              It should not be used to misrepresent authorship, submit work dishonestly, or bypass rules set by a
              school, employer, or platform.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Why Choose HandwritingTool?</h2>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Fast performance</li>
              <li>Readable page output</li>
              <li>Easy-to-use interface</li>
              <li>Browser-only preview with no upload requirement</li>
            </ul>
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
              <p className="mt-3 text-base leading-7 text-slate-600">{faq.answer}</p>
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
                  href="/blog/create-handwritten-pages-online-free"
                  className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-white/40"
                >
                  Create Handwritten Pages Online Free
                </Link>
                <Link
                  href="/blog/best-text-to-handwriting-tools-2026-comparison"
                  className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-white/40"
                >
                  Best Text to Handwriting Tools 2026
                </Link>
                <Link
                  href="/blog/how-to-make-handwriting-look-realistic-online"
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

function ResponsibleUseBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="rounded-[28px] border border-emerald-100 bg-emerald-50 p-6 shadow-sm lg:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Responsible Use</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr,auto] lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Made for notes, teaching resources, creative drafts, and printable pages
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              HandwritingTool is for personal notes, teacher worksheets, creative drafts, design previews, and printable
              pages only. Use it to plan ideas, present information clearly, and prepare original work responsibly.
            </p>
          </div>
          <Link
            href="/responsible-use"
            className="w-fit rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Responsible Use
          </Link>
        </div>
      </div>
    </section>
  );
}

function HeroWorkspacePreview() {
  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-300" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Live workspace</div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.88fr,1.12fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase text-brand-blue">Typed text</p>
            <p className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">42 words</p>
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600 shadow-sm">
            <p>Topic: Clean handwritten pages</p>
            <p className="mt-3">
              Paste your notes here and the page preview updates as you write.
            </p>
            <p className="mt-3">
              Adjust paper, ink, spacing, and margins before export.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Worksheet", "Class Notes", "PDF"].map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="paper-frame rounded-2xl border border-slate-200 bg-white p-3 shadow-paper">
          <div className="relative aspect-[0.72] overflow-hidden rounded-xl bg-[#fffdf4]">
            <div className="absolute inset-y-0 left-[15%] border-l-2 border-red-200" />
            <div className="absolute inset-x-0 top-[14%] space-y-[7%]">
              {Array.from({ length: 11 }).map((_, index) => (
                <div key={index} className="h-px bg-blue-200/80" />
              ))}
            </div>
            <div className="absolute left-[21%] right-[8%] top-[18%]">
              <p className="text-xs font-semibold text-slate-600 sm:text-sm">Name: HandwritingTool</p>
              <p className="mt-2 text-xs font-semibold text-slate-600 sm:text-sm">Topic: Live preview</p>
              <div className="font-hand mt-5 space-y-3 text-[1.35rem] leading-7 text-brand-blue sm:text-[1.7rem] sm:leading-8">
                <p>The notebook page fills only after you type.</p>
                <p>Spacing, paper, and ink stay easy to check.</p>
                <p>Export when the page looks right.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-xs font-semibold text-slate-600 sm:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">Real-time preview</div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">Browser private</div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">PDF export ready</div>
      </div>
    </div>
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
