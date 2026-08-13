"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const socialBarSrc = "https://pl29851314.effectivecpmnetwork.com/1c/f6/35/1cf63512494f9503dbf2caea40d24105.js";
const popunderSrc = "https://pl29851312.effectivecpmnetwork.com/88/5f/32/885f32961efb6c5e389aa24d723f02fe.js";
const smartlinkHref = "https://www.effectivecpmnetwork.com/hxj6p8q4ty?key=242376f2e3f5b143cfc8918247b76d08";
const nativeSrc = "https://pl29851315.effectivecpmnetwork.com/79562d6f738d22f8658980ea69e56c0a/invoke.js";
const nativeContainerId = "container-79562d6f738d22f8658980ea69e56c0a";
const bannerBaseUrl = "https://www.highperformanceformat.com";
const wideScreenQuery = "(min-width: 768px)";
const mediumAdQuery = "(min-width: 520px)";
const largeAdQuery = "(min-width: 1024px)";
const monetizedStandaloneRoutes = new Set(["/", "/about", "/author/anwar-fakhri", "/blog", "/responsible-use", "/templates", "/tools"]);

type BannerProps = {
  adKey: string;
  width: number;
  height: number;
  label: string;
};

function createBannerDocument(adKey: string, width: number, height: number) {
  const options = JSON.stringify({ key: adKey, format: "iframe", height, width, params: {} });
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:transparent}body{display:flex;align-items:center;justify-content:center}</style>
</head><body>
<script>window.atOptions=${options};</script>
<script src="${bannerBaseUrl}/${adKey}/invoke.js"></script>
</body></html>`;
}

function createNativeDocument() {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;width:100%;min-height:100%;overflow:hidden;background:transparent}#${nativeContainerId}{width:100%;max-width:100%;overflow:hidden}</style>
</head><body>
<script async data-cfasync="false" src="${nativeSrc}"></script>
<div id="${nativeContainerId}"></div>
</body></html>`;
}

function AdsterraBanner({ adKey, width, height, label }: BannerProps) {
  return (
    <div
      className="mx-auto flex max-w-full items-center justify-center overflow-hidden"
      style={{ width: `min(${width}px, 100%)`, minHeight: height }}
      aria-label={label}
    >
      <iframe
        key={adKey}
        title={label}
        srcDoc={createBannerDocument(adKey, width, height)}
        width={width}
        height={height}
        scrolling="no"
        className="block shrink-0 border-0"
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      />
    </div>
  );
}

export function Adsterra728x90() {
  return <AdsterraBanner adKey="6d7422230477535bf69b1c6fa95eba47" width={728} height={90} label="Sponsored 728 by 90 banner" />;
}

export function Adsterra320x50() {
  return <AdsterraBanner adKey="8bef5838f607972fa04402bc69433a53" width={320} height={50} label="Sponsored 320 by 50 banner" />;
}

export function Adsterra300x250() {
  return <AdsterraBanner adKey="74be660e4d736f54458010412a71524f" width={300} height={250} label="Sponsored 300 by 250 banner" />;
}

export function Adsterra468x60() {
  return <AdsterraBanner adKey="4aa1a22cefabffa54c032a19828a7d99" width={468} height={60} label="Sponsored 468 by 60 banner" />;
}

export function Adsterra160x300() {
  return <AdsterraBanner adKey="a7f0aa695d51946431da4b1f6608f101" width={160} height={300} label="Sponsored 160 by 300 banner" />;
}

export function Adsterra160x600() {
  return <AdsterraBanner adKey="2ce6c0266bd431c8832187ca0fec45a4" width={160} height={600} label="Sponsored 160 by 600 banner" />;
}

function subscribeToWideScreen(callback: () => void) {
  const mediaQuery = window.matchMedia(wideScreenQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getWideScreenSnapshot() {
  return window.matchMedia(wideScreenQuery).matches;
}

function getServerWideScreenSnapshot() {
  return null;
}

function useMediaQuery(query: string) {
  return useSyncExternalStore<boolean | null>(
    (callback) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    getServerWideScreenSnapshot,
  );
}

function isMonetizedPath(pathname: string) {
  return monetizedStandaloneRoutes.has(pathname) || pathname.startsWith("/blog/") || pathname.startsWith("/tools/");
}

export function ResponsiveAdsterraBanner() {
  const isWideScreen = useSyncExternalStore<boolean | null>(
    subscribeToWideScreen,
    getWideScreenSnapshot,
    getServerWideScreenSnapshot,
  );

  return (
    <AdsterraAdBreak className="min-h-[50px] md:min-h-[90px]">
      {isWideScreen === null ? null : isWideScreen ? <Adsterra728x90 /> : <Adsterra320x50 />}
    </AdsterraAdBreak>
  );
}

export function AdsterraRectangle() {
  return (
    <AdsterraAdBreak className="min-h-[250px]">
      <Adsterra300x250 />
    </AdsterraAdBreak>
  );
}

export function AdsterraNative() {
  return (
    <AdsterraAdBreak className="min-h-[300px]">
      <iframe
        title="Sponsored native content"
        srcDoc={createNativeDocument()}
        width="100%"
        height="300"
        scrolling="no"
        loading="lazy"
        className="block w-full max-w-full border-0"
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      />
    </AdsterraAdBreak>
  );
}

export function AdsterraSupplementalAds() {
  const pathname = usePathname();
  const showMediumBanner = useMediaQuery(mediumAdQuery);
  const showVerticalBanners = useMediaQuery(largeAdQuery);

  if (!isMonetizedPath(pathname)) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6 lg:px-8" aria-label="Additional sponsored content">
      {showMediumBanner ? (
        <AdsterraAdBreak className="min-h-[60px]">
          <Adsterra468x60 />
        </AdsterraAdBreak>
      ) : null}

      {showVerticalBanners ? (
        <AdsterraAdBreak className="min-h-[600px] items-start gap-8">
          <Adsterra160x300 />
          <Adsterra160x600 />
        </AdsterraAdBreak>
      ) : null}

      <div className="my-10 text-center sm:my-12">
        <a
          href={smartlinkHref}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-brand-blue"
        >
          Visit sponsored link
        </a>
      </div>
    </section>
  );
}

export function AdsterraAdBreak({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <aside
      className={`mx-auto my-10 flex w-full max-w-6xl items-center justify-center overflow-hidden px-2 sm:my-12 ${className}`}
      aria-label="Sponsored content"
    >
      {children}
    </aside>
  );
}

export function AdsterraSocialBar() {
  const pathname = usePathname();
  if (!isMonetizedPath(pathname)) return null;

  return <Script id="adsterra-social-bar" src={socialBarSrc} strategy="afterInteractive" />;
}

export function AdsterraPopunder() {
  const pathname = usePathname();
  if (!isMonetizedPath(pathname)) return null;

  return <Script id="adsterra-popunder" src={popunderSrc} strategy="afterInteractive" />;
}
