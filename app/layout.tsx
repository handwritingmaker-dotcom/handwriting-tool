import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, Kalam } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-hand",
});

export const metadata: Metadata = {
  title: "Free Text to Handwriting Converter Online | Handwriting Generator PDF Tool",
  description:
    "Convert text to handwriting online for free. Generate realistic handwritten pages and download as PDF, PNG, or JPG. No signup required.",
  metadataBase: new URL("https://handwritingtool.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Text to Handwriting Converter Online | Handwriting Generator PDF Tool",
    description:
      "Convert text to handwriting online for free. Generate realistic handwritten pages and download as PDF, PNG, or JPG. No signup required.",
    url: "/",
    siteName: "Handwriting Tool",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Free Text to Handwriting Converter Online | Handwriting Generator PDF Tool",
    description:
      "Convert text to handwriting online for free. Generate realistic handwritten pages and download as PDF, PNG, or JPG. No signup required.",
  },
};

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${kalam.variable} bg-brand-paper text-brand-ink antialiased`}>
        <div className="min-h-screen">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-950">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue text-xl text-white shadow-paper">
                  <PenIcon className="h-5 w-5" />
                </span>
                <span>
                  Handwriting
                  <span className="font-hand ml-1 text-brand-blue">Lab</span>
                </span>
              </Link>
              <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
                <Link href="/#tool" className="transition hover:text-brand-blue">
                  Converter
                </Link>
                <Link href="/#features" className="transition hover:text-brand-blue">
                  Features
                </Link>
                <Link href="/#seo-guide" className="transition hover:text-brand-blue">
                  Guide
                </Link>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition hover:text-brand-blue">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          {children}
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
              <p>Built for students who want handwritten assignments that feel natural, fast, and export-ready.</p>
              <div className="flex flex-wrap items-center gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition hover:text-brand-blue">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

function PenIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
    >
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L7 21l-4 1 1-4Z" />
    </svg>
  );
}
