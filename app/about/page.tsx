export const metadata = {
  title: "About | Handwriting Lab",
  description: "Learn why Handwriting Lab helps students create realistic handwritten pages from typed text.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">About</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Why Handwriting Lab exists</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Handwriting Lab is designed for students who want fast, realistic handwritten pages without complicated tools.
          The goal is simple: make typed content feel like it was written naturally on notebook paper while staying fast,
          responsive, and easy to export.
        </p>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          The app is built with Next.js, TypeScript, Tailwind CSS, and the HTML5 Canvas API so it can run entirely on
          the frontend and deploy cleanly to Vercel. That also keeps the architecture ready for future features such as
          cloud saves, premium handwriting packs, or AI-assisted formatting.
        </p>
      </div>
    </main>
  );
}
