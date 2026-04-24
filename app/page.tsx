import Link from "next/link";
import { HandwritingTool } from "@/components/HandwritingTool";

const features = [
  {
    title: "Human Letter Flow",
    text: "Every character gets tiny movement, size, and angle changes so the writing avoids a robotic pattern.",
    icon: "pen",
  },
  {
    title: "Style Packs",
    text: "Pick from student, notes, exam, lab, and clean notebook styles built for real assignment pages.",
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
    title: "Assignment Mode",
    text: "Turn paragraphs into neat school-style pages with automatic indentation and balanced margins.",
    icon: "check",
  },
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
    question: "Can I use this for handwritten assignments?",
    answer: "Yes, this tool is commonly used for assignments, notes, and academic work.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="bg-hero-grid bg-grid">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr,0.95fr] lg:px-8 lg:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm">
              No login required - Works instantly in your browser
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Text to Handwriting Converter
              <span className="font-hand ml-3 text-brand-blue">for clean assignment pages</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Paste your text, pick a neat handwriting style, and download polished handwritten PDF pages in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#tool"
                className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Start Converting
              </Link>
              <Link
                href="/#features"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore Features
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard value="10" label="Handwriting styles" icon="spark" />
              <StatCard value="3" label="Paper types" icon="paper" />
              <StatCard value="1-click" label="PDF & image export" icon="download" />
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
            <div className="rounded-[28px] bg-slate-950 p-1 shadow-paper">
              <div className="rounded-[24px] bg-white p-6">
                <div className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-blue">
                    Why it looks real
                  </p>
                  <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                    <li>Every letter looks slightly different, just like real human handwriting.</li>
                    <li>Natural spacing and alignment make pages feel written by hand, not generated.</li>
                    <li>Notebook lines, margins, and paper styles create a true assignment look.</li>
                    <li>No repeating patterns - your pages look natural and unique every time.</li>
                  </ul>
                  <div className="mt-6 rounded-3xl bg-slate-950 px-5 py-4 text-sm text-white">
                    Perfect for assignments, homework, notes, and printable study pages.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <HandwritingTool />
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

      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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

      <section id="seo-guide" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Text to Handwriting Guide</p>
          <article className="mt-6 space-y-5 text-slate-600">
            <h2 className="text-3xl font-semibold text-slate-950">Introduction</h2>
            <p className="text-lg leading-8">
              This online handwriting generator is designed for users who want clean, realistic handwritten content
              without writing everything manually. Simply paste your text, choose a handwriting style, and generate pages
              that look like real human writing.
            </p>
            <p className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-base font-semibold text-brand-blue">
              Paste text. Pick style. Download handwritten PDF.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">What is a Text to Handwriting Converter?</h2>
            <p className="text-lg leading-8">
              A text to handwriting converter is an online tool that transforms digital text into handwritten format.
              Instead of writing by hand, users can input their text and generate pages that look like natural handwriting.
            </p>
            <p className="text-lg leading-8">
              This tool is widely used for handwritten assignments, study notes, and document formatting. It helps save
              time while maintaining a handwritten appearance.
            </p>
            <p className="text-lg leading-8">
              Our handwriting generator uses controlled randomness, spacing variation, and font behavior to create realistic
              handwritten text instead of static or robotic output.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">How to Convert Text to Handwriting Online</h2>
            <p className="text-lg leading-8">Follow these simple steps to convert text into handwriting:</p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Enter or paste your text into the input field</li>
              <li>Select your preferred handwriting style</li>
              <li>Adjust page settings such as spacing, margins, and layout</li>
              <li>Preview the generated handwritten pages</li>
              <li>Download the output as PDF, PNG, or JPG</li>
            </ul>
            <p className="text-lg leading-8">
              The entire process works directly in your browser and does not require any installation.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Why Use This Handwriting Generator?</h2>
            <p className="text-lg leading-8">This text to handwriting converter is built for speed, realism, and ease of use.</p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Generates realistic handwritten text with natural variation</li>
              <li>Supports multiple handwriting styles and page types</li>
              <li>Instant preview with multi-page support</li>
              <li>Export options include PDF, PNG, and JPG</li>
              <li>No login required</li>
              <li>Fully browser-based processing for privacy</li>
            </ul>
            <p className="text-lg leading-8">
              Unlike basic handwriting tools, this system focuses on producing output that closely resembles real handwriting.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Use Cases of Text to Handwriting Converter</h2>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">For Students</h3>
            <p className="text-lg leading-8">
              Students can create handwritten assignments quickly and generate neat, readable notes without writing everything manually.
            </p>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">For Teachers</h3>
            <p className="text-lg leading-8">
              Teachers can prepare sample handwritten content, worksheets, and practice materials.
            </p>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">For Content Creators</h3>
            <p className="text-lg leading-8">
              Creators can use handwritten style text for visual content, blog graphics, or social media posts.
            </p>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">For General Use</h3>
            <p className="text-lg leading-8">
              Users can convert typed documents into handwritten format for personal or professional use.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Is This Tool Safe and Private?</h2>
            <p className="text-lg leading-8">Yes. This tool is designed with privacy in mind.</p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>All text is processed locally in your browser</li>
              <li>No data is uploaded or stored</li>
              <li>No account or login is required</li>
              <li>Your content remains private</li>
            </ul>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Start Converting Text to Handwriting</h2>
            <p className="text-lg leading-8">
              Use this free text to handwriting converter to generate realistic handwritten pages instantly. Paste your text,
              customize your settings, and download your handwritten document in seconds.
            </p>
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
              <h2 className="text-3xl font-semibold">Guides for handwritten assignments, notes, and faster study workflows</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Read practical articles about text to handwriting conversion, assignment formatting, productivity tools,
                and exporting clean PDF pages for school or personal study.
              </p>
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

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-brand-blue">
        <FeatureIcon name={icon} className="h-5 w-5" />
      </div>
      <p className="text-2xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
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
