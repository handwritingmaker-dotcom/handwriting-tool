export const metadata = {
  title: "Contact | Handwriting Lab",
  description: "Contact Handwriting Lab for support, feature requests, partnerships, and rendering feedback.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Get in touch</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Want to suggest new handwriting styles, report a rendering issue, or discuss partnerships? Use your preferred
          business email address here later, such as <span className="font-medium text-slate-900">contact@yourdomain.com</span>.
        </p>
        <form className="mt-8 grid gap-4">
          <input className="input-field" placeholder="Your name" />
          <input className="input-field" placeholder="Email address" type="email" />
          <textarea className="input-field min-h-44" placeholder="Message" />
          <button
            type="button"
            className="w-fit rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact details placeholder
          </button>
        </form>
      </div>
    </main>
  );
}
