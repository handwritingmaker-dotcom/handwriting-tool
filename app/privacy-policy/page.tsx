export const metadata = {
  title: "Privacy Policy | Handwriting Lab",
  description: "Read how Handwriting Lab handles text, privacy, and browser-based handwriting generation.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Privacy Policy</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Privacy policy</h1>
        <div className="mt-6 space-y-4 text-lg leading-8 text-slate-600">
          <p>
            This frontend-only version of Handwriting Lab processes text directly in your browser. No account is required
            and no handwritten page content is stored on a server by default.
          </p>
          <p>
            If analytics, contact forms, or backend features are added later, this page should be updated to explain what
            data is collected, how it is used, and how users can request deletion.
          </p>
          <p>
            For launch, review any third-party scripts, analytics providers, or hosting tools added in Vercel and update
            this policy before publishing.
          </p>
        </div>
      </div>
    </main>
  );
}
