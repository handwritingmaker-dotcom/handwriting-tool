import type { Metadata } from "next";
import Link from "next/link";
import { HandwritingToolLoader } from "@/components/HandwritingToolLoader";
import { editorSocialImage } from "@/lib/seo";
import { toolPageConfigs, type FunctionalToolProfile } from "@/lib/tool-pages";

const siteUrl = "https://www.handwritingtool.com";

export function createToolMetadata(profile: FunctionalToolProfile): Metadata {
  const tool = toolPageConfigs[profile];
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: tool.path },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: tool.path,
      type: "website",
      images: [editorSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [editorSocialImage.url],
    },
  };
}

export function ToolExperiencePage({ profile }: { profile: FunctionalToolProfile }) {
  const tool = toolPageConfigs[profile];
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": ["WebApplication", "SoftwareApplication"],
      name: tool.name,
      url: `${siteUrl}${tool.path}`,
      description: tool.description,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires a modern browser with HTML canvas support",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
        { "@type": "ListItem", position: 3, name: tool.name, item: `${siteUrl}${tool.path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <section className="mx-auto max-w-5xl px-4 pb-8 pt-12 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">{tool.eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{tool.h1}</h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">{tool.intro}</p>
      </section>

      <section className="relative z-10 mx-auto max-w-[1500px] px-3 pb-12 sm:px-5 lg:px-7">
        <HandwritingToolLoader profile={profile} />
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-card">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">How to use this tool</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-6 text-base leading-7 text-slate-600">
            {tool.howTo.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-card">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Recommended settings</h2>
          <dl className="mt-5 space-y-4">
            {tool.settings.map((setting) => (
              <div key={setting.label}>
                <dt className="font-semibold text-slate-950">{setting.label}</dt>
                <dd className="mt-1 leading-7 text-slate-600">{setting.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-[32px] border border-blue-100 bg-blue-50 p-7">
          <h2 className="text-2xl font-semibold text-slate-950">{tool.practicalHeading}</h2>
          <p className="mt-3 leading-7 text-slate-700">{tool.practicalText}</p>
        </div>
        <div className="rounded-[32px] border border-amber-100 bg-amber-50 p-7">
          <h2 className="text-2xl font-semibold text-slate-950">Current limitations</h2>
          <p className="mt-3 leading-7 text-slate-700">{tool.limitations}</p>
        </div>
        <div className="rounded-[32px] border border-emerald-100 bg-emerald-50 p-7 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-slate-950">Privacy and next steps</h2>
          <p className="mt-3 leading-7 text-slate-700">{tool.privacy}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={tool.guideHref} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">{tool.guideLabel}</Link>
            <Link href="/tools" className="rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-100">Browse all tools</Link>
            <Link href="/privacy-policy" className="rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-100">Privacy policy</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Frequently asked questions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tool.faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">{faq.question}</h3>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
