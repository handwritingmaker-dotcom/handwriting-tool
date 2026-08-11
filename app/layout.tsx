import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { DM_Sans, Kalam } from "next/font/google";
import { defaultSocialImage } from "@/lib/seo";
import { siteAuthor } from "@/lib/author";
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

const googleAnalyticsId = "G-024MVPR0W4";

export const metadata: Metadata = {
  title: "Text to Handwriting Converter Free Online | HandwritingTool",
  description:
    "Convert text to realistic handwriting online for free. Choose handwriting styles, lined or blank paper, adjust spacing and ink, then download as PDF, PNG or JPG.",
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
    title: "Text to Handwriting Converter Free Online | HandwritingTool",
    description:
      "Convert text to realistic handwriting online for free. Choose handwriting styles, lined or blank paper, adjust spacing and ink, then download as PDF, PNG or JPG.",
    url: "/",
    siteName: "Handwriting Tool",
    type: "website",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to Handwriting Converter Free Online | HandwritingTool",
    description:
      "Convert text to realistic handwriting online for free. Choose handwriting styles, lined or blank paper, adjust spacing and ink, then download as PDF, PNG or JPG.",
    images: [defaultSocialImage.url],
  },
};

const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.handwritingtool.com/#organization",
    name: "HandwritingTool",
    url: "https://www.handwritingtool.com",
    logo: "https://www.handwritingtool.com/handwriting-tool-logo.png",
    founder: {
      "@type": "Person",
      "@id": `https://www.handwritingtool.com${siteAuthor.profilePath}#person`,
      name: siteAuthor.name,
      url: `https://www.handwritingtool.com${siteAuthor.profilePath}`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.handwritingtool.com/#website",
    name: "HandwritingTool",
    url: "https://www.handwritingtool.com",
    publisher: {
      "@id": "https://www.handwritingtool.com/#organization",
    },
  },
];

const headerLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const footerLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/responsible-use", label: "Responsible Use" },
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
      <body className={`${dmSans.variable} ${kalam.variable} overflow-x-hidden bg-brand-paper text-brand-ink antialiased`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <div className="min-h-screen">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl min-w-0 flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:py-4 lg:px-8">
              <Link href="/" className="flex w-fit items-center" aria-label="HandwritingTool home">
                <Image
                  src="/handwriting-tool-logo.png"
                  alt="HandwritingTool"
                  width={180}
                  height={70}
                  priority
                  className="h-14 w-auto md:h-16"
                />
              </Link>
              <nav aria-label="Primary navigation" className="flex w-full min-w-0 max-w-full flex-wrap items-center justify-center gap-1 text-sm font-semibold text-slate-600 md:w-auto md:flex-nowrap md:justify-start md:gap-6 md:font-medium">
                <Link href="/#tool" className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-blue-50 hover:text-brand-blue md:min-h-0 md:px-0 md:py-0 md:hover:bg-transparent">
                  Converter
                </Link>
                <Link href="/#features" className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-blue-50 hover:text-brand-blue md:min-h-0 md:px-0 md:py-0 md:hover:bg-transparent">
                  Features
                </Link>
                <Link href="/#seo-guide" className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-blue-50 hover:text-brand-blue md:min-h-0 md:px-0 md:py-0 md:hover:bg-transparent">
                  Guide
                </Link>
                {headerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-blue-50 hover:text-brand-blue md:min-h-0 md:px-0 md:py-0 md:hover:bg-transparent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          {children}
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
              <p>HandwritingTool helps users create readable handwritten-style notes, drafts, and printable pages.</p>
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
