export const metadata = {
  title: "Contact Us | HandwritingTool",
  description:
    "Contact HandwritingTool for technical issues, feature suggestions, business inquiries, collaboration requests, and general feedback.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | HandwritingTool",
    description:
      "Contact HandwritingTool for technical issues, feature suggestions, business inquiries, collaboration requests, and general feedback.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | HandwritingTool",
    description:
      "Contact HandwritingTool for technical issues, feature suggestions, business inquiries, collaboration requests, and general feedback.",
  },
};

const contactTopics = [
  "Technical issues or bugs",
  "Questions about how the tool works",
  "Suggestions for new features",
  "Business or collaboration inquiries",
  "General feedback",
];

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const formAction = contactEmail ? `https://formsubmit.co/${contactEmail}` : undefined;

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Contact Us</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">We are here to help</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            If you have any questions, suggestions, or need assistance, feel free to reach out to us. We value your
            feedback and aim to respond as quickly as possible.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-950">What You Can Contact Us About</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-slate-600">
              {contactTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 space-y-4 text-lg leading-8 text-slate-600">
            <h2 className="text-2xl font-semibold text-slate-950">Response Time</h2>
            <p>
              We usually respond within 24-48 hours. In some cases, it may take a little longer depending on the volume
              of requests.
            </p>
          </section>

          <section className="mt-10 space-y-4 text-lg leading-8 text-slate-600">
            <h2 className="text-2xl font-semibold text-slate-950">Our Approach</h2>
            <p>
              We take every message seriously and try to improve our platform based on user feedback. Your input helps us
              make HandwritingTool better for everyone.
            </p>
            <p>Thank you for reaching out to us.</p>
          </section>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">How to Contact Us</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Send us a message</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Use the form below and your message will be sent to the HandwritingTool support inbox.
          </p>

          <form action={formAction} method="POST" className="mt-8 grid gap-4">
            <input type="hidden" name="_subject" value="New message from HandwritingTool contact page" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://www.handwritingtool.com/contact" />

            <div>
              <label className="input-label" htmlFor="name">
                Your Name
              </label>
              <input id="name" name="name" className="input-field" placeholder="Enter your name" required />
            </div>

            <div>
              <label className="input-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                className="input-field"
                placeholder="Enter your email address"
                type="email"
                required
              />
            </div>

            <div>
              <label className="input-label" htmlFor="topic">
                Topic
              </label>
              <select id="topic" name="topic" className="input-field" defaultValue="General feedback">
                {contactTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="input-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="input-field min-h-44"
                placeholder="Write your message here"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!formAction}
              className="w-fit rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send Message
            </button>

            {!formAction && (
              <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                Contact email is not configured yet. Add NEXT_PUBLIC_CONTACT_EMAIL in Vercel to enable this form.
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
