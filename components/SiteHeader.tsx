"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

type NavigationLink = { href: string; label: string; focusTarget?: string };

const navigationLinks: NavigationLink[] = [
  { href: "/#tool", label: "Converter", focusTarget: "#handwriting-text" },
  { href: "/#features", label: "Features", focusTarget: "#features-heading" },
  { href: "/#seo-guide", label: "Guide", focusTarget: "#seo-guide-heading" },
  { href: "/tools", label: "Tools" },
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isUnmodifiedPrimaryClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setIsOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const handleMobileNavigation = (event: MouseEvent<HTMLAnchorElement>, link: NavigationLink) => {
    if (!isUnmodifiedPrimaryClick(event)) return;
    const isSameHomepage = window.location.pathname === "/" && link.href.startsWith("/#");
    if (!isSameHomepage || !link.focusTarget) {
      menuButtonRef.current?.focus({ preventScroll: true });
      setIsOpen(false);
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(link.focusTarget ?? "");
        target?.focus({ preventScroll: true });
        setIsOpen(false);
      });
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="flex shrink-0 items-center" aria-label="HandwritingTool home" onClick={() => setIsOpen(false)}>
            <Image src="/handwriting-tool-logo.png" alt="HandwritingTool" width={180} height={70} priority className="h-12 w-auto lg:h-16" />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span aria-hidden="true" className="text-2xl leading-none">{isOpen ? "×" : "☰"}</span>
          </button>
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex xl:gap-7">
            {navigationLinks.map((link) => <Link key={link.href} href={link.href} className="whitespace-nowrap transition hover:text-brand-blue">{link.label}</Link>)}
          </nav>
        </div>
        <nav id={menuId} aria-label="Mobile navigation" hidden={!isOpen} className="border-t border-slate-200 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-brand-blue"
                onClick={(event) => handleMobileNavigation(event, link)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
