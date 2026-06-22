"use client";

import { useEffect } from "react";
import Script from "next/script";

const nativeBannerSrc =
  "https://pl29851315.effectivecpmnetwork.com/79562d6f738d22f8658980ea69e56c0a/invoke.js";
const nativeBannerContainerId = "container-79562d6f738d22f8658980ea69e56c0a";
const socialBarSrc =
  "https://pl29851314.effectivecpmnetwork.com/1c/f6/35/1cf63512494f9503dbf2caea40d24105.js";

export function AdsterraSocialBar() {
  return <Script id="adsterra-social-bar" src={socialBarSrc} strategy="afterInteractive" />;
}

export function AdsterraNativeBanner({
  className = "",
  placement,
}: {
  className?: string;
  placement: string;
}) {
  useEffect(() => {
    const container = document.getElementById(nativeBannerContainerId);

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = nativeBannerSrc;
    script.dataset.adsterraPlacement = placement;
    container.insertAdjacentElement("afterend", script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, [placement]);

  return (
    <aside
      aria-label="Advertisement"
      className={`overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Advertisement
      </p>
      <div id={nativeBannerContainerId} className="min-h-[120px] w-full" />
    </aside>
  );
}
