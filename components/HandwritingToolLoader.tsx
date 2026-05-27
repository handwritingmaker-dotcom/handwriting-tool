"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ToolComponent = typeof import("./HandwritingTool").HandwritingTool;

export function HandwritingToolLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const [Tool, setTool] = useState<ToolComponent | null>(null);

  const loadTool = useCallback(() => {
    if (Tool || isLoadingRef.current) return;

    isLoadingRef.current = true;
    void import("./HandwritingTool").then((module) => {
      setTool(() => module.HandwritingTool);
    });
  }, [Tool]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || Tool) return;

    if (!("IntersectionObserver" in window)) {
      loadTool();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadTool();
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [Tool, loadTool]);

  return (
    <div id="tool" ref={containerRef}>
      {Tool ? (
        <Tool />
      ) : (
        <div className="grid scroll-mt-36 gap-6 md:scroll-mt-28 lg:grid-cols-[1.08fr,0.92fr]">
          <div className="control-card min-h-[560px]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Handwriting Studio</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Converter loading</h2>
            <div className="mt-6 space-y-4">
              <div className="h-12 rounded-2xl bg-slate-100" />
              <div className="h-72 rounded-2xl bg-slate-100" />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="h-12 rounded-full bg-blue-100" />
                <div className="h-12 rounded-full bg-emerald-100" />
                <div className="h-12 rounded-full bg-slate-100" />
              </div>
            </div>
          </div>
          <div className="control-card min-h-[560px]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Preview</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">Preparing preview</h3>
            <div className="mt-6 aspect-[1/1.35] rounded-[28px] border border-dashed border-slate-200 bg-slate-50" />
          </div>
        </div>
      )}
    </div>
  );
}
