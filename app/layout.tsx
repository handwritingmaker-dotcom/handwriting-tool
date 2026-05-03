import type { Metadata } from "next";
import Image from "next/image";
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
  title: "Text to Handwriting Converter Free Online",
  description:
    "Convert text to handwriting online for free. Create realistic handwritten pages and download as PDF, PNG, or JPG. No signup required.",
  metadataBase: new URL("https://www.handwritingtool.com"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Text to Handwriting Converter Free Online",
    description:
      "Convert text to handwriting online for free. Create realistic handwritten pages and download as PDF, PNG, or JPG. No signup required.",
    url: "/",
    siteName: "Handwriting Tool",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Text to Handwriting Converter Free Online",
    description:
      "Convert text to handwriting online for free. Create realistic handwritten pages and download as PDF, PNG, or JPG. No signup required.",
  },
};

const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HandwritingTool",
    url: "https://www.handwritingtool.com",
    logo: "https://www.handwritingtool.com/handwriting-tool-logo.png",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HandwritingTool",
    url: "https://www.handwritingtool.com",
  },
];

const headerLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const footerLinks = [
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <div className="min-h-screen">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center" aria-label="HandwritingTool home">
                <Image
                  src="/handwriting-tool-logo.png"
                  alt="HandwritingTool"
                  width={180}
                  height={70}
                  priority
                  className="h-16 w-auto"
                />
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
                {headerLinks.map((link) => (
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
              <p>HandwritingTool helps users convert text into realistic handwritten pages quickly and easily.</p>
              <div className="flex flex-wrap items-center gap-4">
                {footerLinks.map((link) => (
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
