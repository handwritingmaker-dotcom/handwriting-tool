export const metadata = {
  title: "About Us | HandwritingTool",
  description:
    "Learn about HandwritingTool, a simple and reliable platform for converting text into realistic handwritten assignments, notes, and documents.",
};

const reasons = [
  "Easy to use",
  "Fast and reliable",
  "Clean and distraction-free",
  "Focused on real user needs",
];

const capabilities = [
  "Convert plain text into natural-looking handwriting",
  "Generate handwritten assignments quickly",
  "Save your output as image or PDF",
  "Use different writing styles for better customization",
];

const commitments = [
  "Keeping the tool simple and accessible",
  "Providing a smooth user experience",
  "Improving features over time",
  "Maintaining user trust and transparency",
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">About Us</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Welcome to HandwritingTool
        </h1>

        <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
          <p>
            HandwritingTool is built with a clear purpose: to make writing easier, faster, and smarter for students,
            professionals, and everyday users who still need handwritten content in a digital world.
          </p>
          <p>
            In many situations, handwritten assignments, notes, and documents are still required. But writing everything
            manually can be time-consuming, tiring, and sometimes impractical. That is where HandwritingTool comes in.
          </p>
          <p>
            We provide a simple and efficient way to convert your text into realistic handwritten content within seconds,
            without compromising on quality or readability.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-950">Why We Created HandwritingTool</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            We noticed that many students struggle with writing long assignments by hand, especially when deadlines are
            tight. At the same time, many existing tools online were complicated, low-quality, or filled with unnecessary
            limitations.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 font-semibold text-brand-blue">
                {reason}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-950">What You Can Do With This Tool</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-950">Our Goal</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Our goal is not just to provide a tool, but to build a reliable platform that people can trust for everyday
            academic and writing needs. We continuously improve the tool based on user feedback and real-world usage.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-950">Our Commitment</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {commitments.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            If you have suggestions or ideas, we would love to hear from you. HandwritingTool is built for users, and it
            will continue to grow with you.
          </p>
        </section>
      </article>
    </main>
  );
}
