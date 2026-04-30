export const metadata = {
  title: "Privacy Policy | HandwritingTool",
  description:
    "Read how HandwritingTool respects user privacy, handles limited usage information, cookies, analytics, and third-party services.",
};

const collectedInfo = ["Browser type and version", "Device information", "Pages visited and usage behavior"];

const uses = [
  "Improve website performance and speed",
  "Understand user behavior",
  "Enhance overall user experience",
  "Optimize features and functionality",
];

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Privacy Policy</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Privacy Policy</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          At HandwritingTool, we respect your privacy and are committed to protecting your information.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-950">Information We Collect</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">We may collect limited non-personal information such as:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-slate-600">
            {collectedInfo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            We do not collect sensitive personal data unless you voluntarily provide it.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-950">How We Use Information</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">The collected information is used to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-slate-600">
            {uses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-4 text-lg leading-8 text-slate-600">
          <h2 className="text-2xl font-semibold text-slate-950">Cookies</h2>
          <p>
            We may use cookies to store basic user preferences and improve functionality. Cookies help us provide a
            smoother and more personalized experience.
          </p>
          <p>You can disable cookies through your browser settings if you prefer.</p>
        </section>

        <section className="mt-10 space-y-4 text-lg leading-8 text-slate-600">
          <h2 className="text-2xl font-semibold text-slate-950">Third-Party Services</h2>
          <p>We may use trusted third-party services such as Google Analytics for traffic analysis and Google AdSense for displaying ads.</p>
          <p>
            These services may use cookies or similar technologies to collect data in accordance with their own privacy
            policies.
          </p>
        </section>

        <section className="mt-10 space-y-4 text-lg leading-8 text-slate-600">
          <h2 className="text-2xl font-semibold text-slate-950">Data Protection</h2>
          <p>We take reasonable measures to protect your data and ensure it is handled securely.</p>
          <h2 className="text-2xl font-semibold text-slate-950">User Consent</h2>
          <p>By using HandwritingTool, you agree to this Privacy Policy.</p>
          <h2 className="text-2xl font-semibold text-slate-950">Updates to This Policy</h2>
          <p>We may update this policy from time to time. Any changes will be reflected on this page.</p>
        </section>
      </article>
    </main>
  );
}
