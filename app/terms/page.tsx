export const metadata = {
  title: "Terms | Handwriting Lab",
  description: "Read the terms for using Handwriting Lab's browser-based text to handwriting converter.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Terms</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Terms of use</h1>
        <div className="mt-6 space-y-4 text-lg leading-8 text-slate-600">
          <p>
            Handwriting Lab is provided as a browser-based conversion tool. Users are responsible for ensuring their use
            of generated pages complies with school, university, workplace, or local policy requirements.
          </p>
          <p>
            The app is offered on an as-is basis during this frontend release. You may customize the exported pages for
            your own notes, drafts, and study materials, but published site terms should later be reviewed with legal
            counsel if you plan to commercialize the platform.
          </p>
        </div>
      </div>
    </main>
  );
}
