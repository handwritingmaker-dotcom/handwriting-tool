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
              Text to Handwriting Converter Online
              <span className="font-hand ml-3 text-brand-blue">Free and Easy</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Convert your text into realistic handwriting instantly. Create handwritten assignments, notes, and
              documents in seconds without writing manually.
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
            <h2 className="text-3xl font-semibold text-slate-950">Text to Handwriting Converter Online</h2>
            <p className="text-lg leading-8">
              Convert your text into realistic handwriting instantly with HandwritingTool. Create handwritten
              assignments, notes, and documents in seconds without writing manually.
            </p>
            <p className="text-lg leading-8">
              HandwritingTool is a fast, simple, and powerful text to handwriting converter designed for students,
              teachers, and anyone who needs handwritten content quickly.
            </p>
            <p className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-base font-semibold text-brand-blue">
              No signup. No hassle. Just type, convert, and download.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">What is a Text to Handwriting Converter?</h2>
            <p className="text-lg leading-8">
              A text to handwriting converter is an online tool that transforms digital text into handwritten content.
              Instead of writing everything by hand, you can simply type or paste your text and generate natural-looking
              handwriting automatically.
            </p>
            <p className="text-lg leading-8">
              HandwritingTool works as a handwriting generator that allows you to create handwritten notes, assignments,
              and documents with ease.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Students creating handwritten assignments</li>
              <li>Users converting digital text into handwritten notes</li>
              <li>Anyone looking for a quick handwriting solution</li>
            </ul>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Convert Text to Handwriting in Seconds</h2>
            <p className="text-lg leading-8">
              With HandwritingTool, you can easily convert text into handwriting without any complicated steps. Just enter
              your text, choose your preferred handwriting style, and download your handwritten output.
            </p>
            <p className="text-lg leading-8">
              This handwriting tool online is designed to be fast, reliable, and user-friendly, making it perfect for
              everyday use.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Key Features of HandwritingTool</h2>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">Realistic Handwriting Generator</h3>
            <p className="text-lg leading-8">Generate natural and clean handwritten text that looks like real human writing.</p>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">Instant Text to Handwriting Conversion</h3>
            <p className="text-lg leading-8">Convert your text into handwritten format instantly without delays.</p>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">Download as PDF or Image</h3>
            <p className="text-lg leading-8">Save your handwritten content as a PDF or image for easy use and sharing.</p>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">Multiple Handwriting Styles</h3>
            <p className="text-lg leading-8">Choose from different handwriting styles to customize your output.</p>
            <h3 className="pt-2 text-xl font-semibold text-slate-950">Simple and Clean Interface</h3>
            <p className="text-lg leading-8">No learning curve, just type, convert, and download.</p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">How to Convert Text into Handwriting</h2>
            <p className="text-lg leading-8">Using this text to handwriting converter free tool is very simple:</p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Enter or paste your text</li>
              <li>Select a handwriting style</li>
              <li>Adjust settings if needed</li>
              <li>Download your handwritten output</li>
            </ul>
            <p className="text-lg leading-8">
              Within seconds, your digital text becomes handwritten content.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Use Cases: Who is This Tool For?</h2>
            <p className="text-lg leading-8">
              HandwritingTool is designed for real-world use cases:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Creating handwritten assignments online</li>
              <li>Generating handwritten notes for study</li>
              <li>Converting typed text into handwritten format</li>
              <li>Preparing documents in handwriting style</li>
            </ul>
            <p className="text-lg leading-8">
              Whether you need a handwriting generator for assignments or a simple note-making tool, this platform is
              built to save your time.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Why Choose HandwritingTool?</h2>
            <p className="text-lg leading-8">
              There are many tools available online, but most are either slow, complicated, or limited. HandwritingTool
              focuses on what matters:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-8">
              <li>Fast performance</li>
              <li>Realistic handwriting output</li>
              <li>Easy-to-use interface</li>
              <li>No unnecessary complexity</li>
            </ul>
            <p className="text-lg leading-8">
              This makes it one of the most reliable online handwriting generators available today.
            </p>

            <h2 className="pt-3 text-2xl font-semibold text-slate-950">Start Using the Handwriting Tool Now</h2>
            <p className="text-lg leading-8">
              Turn your text into handwriting in just a few clicks. Try the best text to handwriting converter online and
              create handwritten content instantly.
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
