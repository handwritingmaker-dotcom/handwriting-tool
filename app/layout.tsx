import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { DM_Sans, Kalam } from "next/font/google";
import { defaultSocialImage } from "@/lib/seo";
import { siteAuthor } from "@/lib/author";
import { SiteHeader } from "@/components/SiteHeader";
import { CookieConsent } from "@/components/CookieConsent";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
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
    "Turn text into handwriting online free — realistic handwriting styles, A4 or Letter pages, live preview, and multi-page PDF, PNG, or JPG export.",
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
      "Turn text into handwriting online free — realistic handwriting styles, A4 or Letter pages, live preview, and multi-page PDF, PNG, or JPG export.",
    url: "/",
    siteName: "Handwriting Tool",
    type: "website",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to Handwriting Converter Free Online | HandwritingTool",
    description:
      "Turn text into handwriting online free — realistic handwriting styles, A4 or Letter pages, live preview, and multi-page PDF, PNG, or JPG export.",
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

const footerLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/tools/handwriting-worksheet-generator", label: "Worksheet Generator" },
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Blog" },
  { href: "/write-for-us", label: "Write for Us" },
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
      <head>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
            try {
              if (window.localStorage.getItem('hw-cookie-consent') === 'accepted') {
                gtag('consent', 'update', {
                  'ad_storage': 'granted',
                  'analytics_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted'
                });
              }
            } catch (e) {}
          `}
        </Script>
      </head>
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
          <SiteHeader />
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
                <CookieSettingsButton />
              </div>
            </div>
          </footer>
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
