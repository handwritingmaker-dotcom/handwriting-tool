"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLink = { href: string; label: string; focusTarget?: string };

const toolGroups = [
  { label: "Handwriting Tools", links: [
    { href: "/#tool", label: "Text to Handwriting" }, { href: "/cursive-text-generator", label: "Cursive Text Generator" },
    { href: "/signature-generator", label: "Signature Generator" },
  ]},
  { label: "Educational Tools", links: [
    { href: "/tools/handwriting-worksheet-generator", label: "Worksheet Generator" }, { href: "/sentence-scramble-generator", label: "Sentence Scramble" },
    { href: "/word-search-maker", label: "Word Search Maker" }, { href: "/word-scramble-generator", label: "Word Scramble" }, { href: "/assignment-maker", label: "Assignment Maker" },
  ]},
  { label: "Creative Tools", links: [{ href: "/invitation-maker", label: "Invitation Maker" }] },
];

const navigationLinks: NavigationLink[] = [
  { href: "/#tool", label: "Converter", focusTarget: "#handwriting-text" },
  { href: "/tools", label: "Classroom Tools" },
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Guides" },
];

function isUnmodifiedPrimaryClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const toolsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openTools = () => {
    if (toolsCloseTimer.current) clearTimeout(toolsCloseTimer.current);
    setToolsOpen(true);
  };
  const scheduleToolsClose = () => {
    if (toolsCloseTimer.current) clearTimeout(toolsCloseTimer.current);
    toolsCloseTimer.current = setTimeout(() => setToolsOpen(false), 150);
  };

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
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[74px]">
          <Link href="/" className="flex shrink-0 items-center" aria-label="HandwritingTool home" onClick={() => setIsOpen(false)}>
            <Image src="/handwriting-tool-logo.png" alt="HandwritingTool" width={180} height={70} priority className="h-12 w-auto lg:h-[58px]" />
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
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 text-sm font-semibold text-[#07184d] lg:flex">
            {navigationLinks.map((link) => {
              if (link.href === "/tools") {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openTools}
                    onMouseLeave={scheduleToolsClose}
                  >
                    <button
                      type="button"
                      aria-expanded={toolsOpen}
                      aria-haspopup="true"
                      onClick={() => setToolsOpen((open) => !open)}
                      onFocus={openTools}
                      onBlur={scheduleToolsClose}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setToolsOpen(false);
                      }}
                      className="inline-flex items-center gap-1 whitespace-nowrap transition hover:text-brand-blue"
                    >
                      {link.label}
                      <span aria-hidden="true" className={`text-[10px] transition-transform ${toolsOpen ? "rotate-180" : ""}`}>▼</span>
                    </button>
                    {toolsOpen && (
                      <div className="absolute left-1/2 top-full z-40 w-[680px] max-w-[90vw] -translate-x-1/2 pt-2">
                        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-lg md:grid-cols-3">
                          {toolGroups.map((group) => <div key={group.label} className="p-2"><p className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">{group.label}</p>{group.links.map((tool) => (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              onClick={() => setToolsOpen(false)}
                              aria-current={pathname === tool.href ? "page" : undefined}
                              className={`block rounded-lg px-2 py-2 text-sm font-medium transition hover:bg-blue-50 hover:text-brand-blue ${pathname === tool.href ? "bg-blue-50 text-brand-blue" : "text-slate-700"}`}
                            >
                              {tool.label}
                            </Link>
                          ))}</div>)}
                          <Link
                            href="/tools"
                            onClick={() => setToolsOpen(false)}
                            className="col-span-full block border-t border-slate-100 px-4 py-2.5 text-sm font-semibold text-brand-blue transition hover:bg-blue-50"
                          >
                            View all tools →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return <Link key={link.href} href={link.href} className="whitespace-nowrap transition hover:text-brand-blue">{link.label}</Link>;
            })}
          </nav>
          <Link href="/#tool" className="hidden rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 lg:inline-flex">Open converter ↗</Link>
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
          <details className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
            <summary className="min-h-11 cursor-pointer px-2 py-2 text-sm font-bold text-slate-800">All tools</summary>
            <div className="grid gap-3 px-2 pb-2 sm:grid-cols-3">{toolGroups.map(group=><div key={group.label}><p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">{group.label}</p>{group.links.map(tool=><Link key={tool.href} href={tool.href} onClick={()=>setIsOpen(false)} className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-blue-100">{tool.label}</Link>)}</div>)}</div>
          </details>
        </nav>
      </div>
    </header>
  );
}
