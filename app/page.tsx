import type { Metadata } from "next";
import Link from "next/link";
import { HandwritingToolLoader } from "@/components/HandwritingToolLoader";
import { StartConvertingButton } from "@/components/StartConvertingButton";

const siteUrl = "https://www.handwritingtool.com";
const homepageTitle = "Text to Handwriting Converter & Free Worksheets";
const homepageDescription = "Convert text to handwriting and create free printable worksheets, word puzzles, and practice sheets for teachers, parents, and homeschoolers.";

export const metadata: Metadata = {
  title: homepageTitle,
  description: homepageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
  },
};

const faqs = [
  ["Is the converter free?", "Yes. The converter and browser-based tools are free to use without creating an account."],
  ["Can I use these worksheets in my classroom?", "Yes. Teachers, parents, and homeschoolers can create and print worksheets using content they are permitted to use."],
  ["Can I choose A4 instead of US Letter?", "Yes. Select A4 or US Letter in the page-size controls before exporting or printing."],
  ["Does my text stay private?", "The handwriting renderer processes your text in this browser. No account is needed."],
] as const;
const softwareSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "HandwritingTool Text to Handwriting Converter", url: siteUrl, applicationCategory: "DesignApplication", operatingSystem: "Web", isAccessibleForFree: true, description: "Free browser-based text to handwriting converter with live preview and PDF, PNG, and JPG export.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
const classroomTools = [
  { title: "Handwriting Worksheet Generator", text: "Create tracing sheets and writing practice with your words.", href: "/tools/handwriting-worksheet-generator", art: "trace" },
  { title: "Cursive Text Generator", text: "Turn your text into beautiful cursive handwriting.", href: "/cursive-text-generator", art: "cursive" },
  { title: "Word Search Maker", text: "Create custom word searches with your own word lists.", href: "/word-search-maker", art: "search" },
  { title: "Word Scramble Generator", text: "Make word scrambles for vocabulary practice.", href: "/word-scramble-generator", art: "scramble" },
  { title: "Sentence Scramble Generator", text: "Create sentence scrambles to build writing skills.", href: "/sentence-scramble-generator", art: "sentence" },
] as const;
const writingTools = [
  ["Handwritten Notes Generator", "Create full handwritten notes from your text.", "/tools/handwritten-notes", "✎"],
  ["Word to Handwriting", "Convert a Word document to handwritten pages.", "/blog/word-to-handwriting-converter-online-free", "▤"],
  ["PDF to Handwriting", "Turn selectable PDF text into handwriting-style pages.", "/tools/text-to-handwriting-pdf", "PDF"],
  ["Handwritten Signature Generator", "Create a personal handwritten signature image.", "/signature-generator", "𝓢"],
] as const;
const paperTemplates = [["Primary writing paper", "primary"], ["Wide-ruled paper", "wide"], ["College-ruled paper", "college"], ["Graph paper", "graph"], ["Cornell notes", "cornell"]] as const;

export default function HomePage() {
  return <main className="home-reference bg-white text-[#07184d]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareSchema, faqSchema]) }} />
    <section className="relative overflow-hidden"><div className="mx-auto grid max-w-6xl gap-6 px-4 pb-7 pt-7 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:pb-4 lg:pt-8"><div className="relative z-10"><div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Free · No sign-up · Browser-based</div><h1 className="mt-3 max-w-2xl text-[2.65rem] font-extrabold leading-[.97] tracking-[-.045em] text-[#07184d] sm:text-5xl lg:text-[3.35rem]">Free <span className="bg-gradient-to-r from-[#1684ef] to-[#02a8a8] bg-clip-text text-transparent">Text to Handwriting Converter</span></h1><p className="mt-4 max-w-2xl text-base leading-6 text-slate-600">Turn typed text into handwritten-style pages for notes, classroom examples, and creative projects. Customize your paper and ink, then download a PDF or image.</p><div className="mt-4 lg:hidden"><StartConvertingButton /></div></div><div className="relative hidden h-44 lg:block" aria-hidden="true"><div className="hero-paper absolute left-12 top-0 rotate-[-5deg]"><p>Our week of learning</p><p>We read new books,</p><p>practiced our writing,</p><p>and learned about the</p><p>world around us.</p></div><div className="hero-paper hero-trace absolute right-6 top-5 rotate-[7deg]"><strong>A a</strong><span>🍎</span><p>A A A A A</p><p>a a a a a</p></div></div></div></section>
    <section className="mx-auto max-w-[1160px] px-3 sm:px-5 lg:px-7"><div className="studio-shell overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,45,90,.10)]"><div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3"><div className="flex items-center gap-3"><h2 className="text-xl font-extrabold">Handwriting Studio</h2><span className="h-2 w-2 rounded-full bg-emerald-500"/><span className="text-xs text-slate-600">Live preview</span></div><a href="#handwriting-text" className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">↻ Reset</a></div><HandwritingToolLoader /></div></section>
    <section className="mx-auto grid max-w-6xl gap-5 px-5 py-5 sm:grid-cols-3 lg:px-8"><Benefit icon="✎" title="10 handwriting styles" text="From neat and clear to casual and creative."/><Benefit icon="▤" title="US Letter & A4 paper" text="Lined, wide-ruled, graph and more."/><Benefit icon="▧" title="PDF, PNG & JPG downloads" text="Print or use digitally, at home or in the classroom."/></section>
    <section className="bg-gradient-to-br from-[#edf6ff] to-[#effff5] py-6"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-extrabold tracking-tight">Classroom &amp; Handwriting Tools</h2><p className="mt-1 text-sm text-slate-600">Create writing practice and printable activities with your own words.</p><div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{classroomTools.map(tool => <Link key={tool.title} href={tool.href} className="group grid min-h-32 grid-cols-[108px,1fr] gap-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"><ToolArt type={tool.art}/><div><h3 className="text-sm font-extrabold leading-5">{tool.title}</h3><p className="mt-1 text-sm leading-5 text-slate-600">{tool.text}</p><span className="mt-3 inline-block text-sm font-bold text-blue-600">Open tool&nbsp; →</span></div></Link>)}<div className="flex min-h-32 items-center gap-4 rounded-lg bg-gradient-to-r from-[#d9fff3] to-[#d7ffd9] p-5"><span className="text-4xl text-blue-600">♟</span><div><h3 className="text-lg font-extrabold leading-5">Made for teachers, parents &amp; homeschoolers</h3><p className="mt-2 text-sm leading-5 text-slate-700">Flexible tools to create personalized worksheets and activities for any subject or grade level.</p></div></div></div></div></section>
    <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8"><div className="flex items-end justify-between"><div><h2 className="text-2xl font-extrabold tracking-tight">Printable Paper Templates</h2><p className="text-sm text-slate-600">Download ready-to-use paper templates for printing or digital use.</p></div><Link href="/templates" className="hidden text-sm font-bold text-blue-600 sm:block">View all templates&nbsp; →</Link></div><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{paperTemplates.map(([name,type])=><Link href="/templates" key={name} className="text-center"><div className={`paper-thumb paper-${type}`}/><h3 className="mt-2 text-xs font-bold">{name}</h3></Link>)}</div></section>
    <section className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8"><h2 className="text-2xl font-extrabold tracking-tight">More Writing Tools</h2><p className="text-sm text-slate-600">Explore more ways to work with handwritten text and documents.</p><div className="mt-3 grid gap-3 md:grid-cols-2">{writingTools.map(([title,text,href,icon])=><Link key={title} href={href} className="flex min-h-16 items-center gap-4 rounded-lg border border-slate-200 bg-white px-5 py-3 shadow-sm hover:border-blue-300"><span className="flex w-10 shrink-0 justify-center text-xl font-bold text-blue-600">{icon}</span><span className="min-w-0 flex-1"><strong className="block text-sm">{title}</strong><span className="text-sm text-slate-600">{text}</span></span><span className="text-xl text-blue-600">→</span></Link>)}</div></section>
    <section id="seo-guide" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-3 sm:px-6 lg:px-8"><h2 id="seo-guide-heading" tabIndex={-1} className="sr-only">Convert Your Text in Three Steps</h2><div className="grid overflow-hidden rounded-xl bg-[#edf6ff] sm:grid-cols-3">{[["1","Paste your text","Type or paste anything you want to convert."],["2","Choose your style","Pick a handwriting style and paper settings."],["3","Preview & download","Get your handwritten page as a PDF or image."]].map(([n,t,d],i)=><div key={n} className={`flex gap-4 px-6 py-4 ${i?"border-t border-blue-100 sm:border-l sm:border-t-0":""}`}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{n}</span><div><h3 className="text-sm font-extrabold">{t}</h3><p className="mt-0.5 text-xs leading-5 text-slate-600">{d}</p></div></div>)}</div></section>
    <section id="features" className="mx-auto grid max-w-6xl scroll-mt-24 gap-8 px-4 pb-8 pt-2 sm:px-6 md:grid-cols-2 lg:px-8"><div><h2 id="features-heading" tabIndex={-1} className="text-lg font-extrabold">Helpful writing guides</h2><div className="mt-2 divide-y divide-slate-100">{[["How to set up a handwriting worksheet","/blog/how-to-make-handwriting-practice-sheets"],["Tips for handwriting practice at home","/blog/kids-handwriting-practice-schedule"],["Printing tips for US Letter paper","/blog/text-to-handwriting-a4-size"]].map(([title,href])=><Link key={title} href={href} className="flex items-center justify-between py-2 text-sm text-blue-700"><span>▧ &nbsp;{title}</span><span>→</span></Link>)}</div></div><div><h2 className="text-lg font-extrabold">Frequently asked questions</h2><div className="mt-2 divide-y divide-slate-200 border-y border-slate-200">{faqs.map(([q,a])=><details key={q} className="group py-2"><summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium"><span>{q}</span><span>⌄</span></summary><p className="pt-2 text-sm leading-6 text-slate-600">{a}</p></details>)}</div></div></section>
  </main>;
}

function Benefit({icon,title,text}:{icon:string;title:string;text:string}) { return <div className="flex items-center gap-4"><span className="text-3xl text-blue-600">{icon}</span><div><h3 className="text-sm font-extrabold">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-600">{text}</p></div></div> }
function ToolArt({type}:{type:string}) { if(type==="cursive")return <div className="tool-art font-hand text-4xl italic">Hello</div>; if(type==="search")return <div className="tool-art grid grid-cols-5 p-3 font-mono text-xs font-bold leading-4">CATDOGREADWOLERANSBOOKHTPENCIL</div>; if(type==="scramble")return <div className="tool-art flex flex-col justify-center gap-2 p-2 text-center text-[10px]"><span>Unscramble the word:</span><strong className="tracking-[.35em]">LEARN</strong></div>; if(type==="sentence")return <div className="tool-art flex flex-col justify-center gap-2 p-3"><div className="flex gap-1 text-xs"><b>the</b><b>cat</b><b>sat</b></div><i/><i/></div>; return <div className="tool-art flex items-center justify-center font-hand text-6xl text-slate-500">Aa</div> }
