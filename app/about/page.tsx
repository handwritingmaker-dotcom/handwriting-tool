import Link from "next/link";
import { defaultSocialImage } from "@/lib/seo";

export const metadata = {
  title: "About HandwritingTool",
  description:
    "Learn who runs HandwritingTool, why it was built, what the tool does, and how it handles typed text in the browser.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About HandwritingTool",
    description:
      "Learn who runs HandwritingTool, why it was built, what the tool does, and how it handles typed text in the browser.",
    url: "/about",
    type: "website",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About HandwritingTool",
    description:
      "Learn who runs HandwritingTool, why it was built, what the tool does, and how it handles typed text in the browser.",
    images: [defaultSocialImage.url],
  },
};

const capabilities = [
  "Creates handwritten-style pages from pasted or typed text using 10 handwriting styles",
  "Lets you choose lined, blank, or graph paper before exporting",
  "Includes controls for spacing, margins, page layout, ink color, and preview quality",
  "Exports finished pages as PDF, PNG, or JPG",
  "Runs in your browser, so typed text is not uploaded or stored on a server",
];

const useCases = [
  "Notes and drafts",
  "Worksheet samples",
  "Journal pages",
  "Printable practice sheets",
  "Quote cards",
  "Creative and design mockups",
];

export default function AboutPage() {
  return (
    <main className="bg-brand-paper">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">About HandwritingTool</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A small tool for making typed notes feel like real handwritten pages
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            HandwritingTool started from a small, specific frustration: typing notes is fast, but a lot of everyday
            situations still call for something that looks handwritten, such as a worksheet sample, journal page,
            printable practice sheet, or quote card.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Why This Site Exists</h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-slate-600">
              <p>
                Writing pages out by hand every time can be slow. Basic font-swap tools can also feel limited because
                they often ignore the parts that make a page readable: paper style, margins, spacing, line height, and
                ink.
              </p>
              <p>
                This site does one thing: it turns typed text into a full handwritten-style page. You can preview the
                page, adjust the layout, and download the result when it looks right.
              </p>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Who's Behind This</h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-slate-600">
              <p>
                HandwritingTool is built and maintained by Anwar as a small, independently run project. It is not a
                large company, and the product is shaped around practical improvements to the editor, export options,
                page controls, and responsible-use guidance.
              </p>
              <p>
                Most updates come from real use: making pages easier to preview, improving handwritten-style output, and
                keeping the workflow simple enough that people can create a page without signing up.
              </p>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">What the Tool Actually Does</h2>
            <div className="mt-6 grid gap-3">
              {capabilities.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">What It's For</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              This tool is built for notes, drafts, worksheets, journal pages, printable templates, and creative or
              design work where a handwritten look is genuinely useful and appropriate.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {useCases.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-brand-blue"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              For full guidance on appropriate use, see the{" "}
              <Link href="/responsible-use" className="font-semibold text-brand-blue">
                Responsible Use page
              </Link>
              .
            </p>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">How the Site Is Run</h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-slate-600">
              <p>
                There is no account system, and the site does not track what you type. Text is processed locally in
                your browser for preview and export.
              </p>
              <p>
                The site is supported by ads, which helps keep the tool free with no subscription or paywall.
              </p>
              <p>
                If something is broken, unclear, or missing a feature you need, the fastest way to reach Anwar is the{" "}
                <Link href="/contact" className="font-semibold text-brand-blue">
                  Contact page
                </Link>
                . Real feedback has shaped most of what is on the site so far, and that will continue.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
