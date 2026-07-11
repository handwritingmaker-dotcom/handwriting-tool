"use client";

import { useEffect, useRef, useState } from "react";
import {
  defaultSettings,
  ExportFormat,
  HandwritingStyle,
  handwritingStyles,
  renderHandwriting,
  RenderSettings,
} from "@/lib/handwriting";

const starterText = `Title: Weekly Planning Notes
Topic: Printable page draft

This page is a simple example for planning, teaching, journaling, or creative layout work. Use the editor to test paper styles, spacing, margins, and ink color before exporting a clean printable page.

Teachers can prepare worksheet examples or classroom notes. Writers can draft journal pages, outline ideas, or preview handwritten-style layouts for personal projects.

When the page looks right, export it as a PDF, PNG, or JPG for your own notes, printables, or design previews.`;

const pageTypes = [
  { value: "lined", label: "Lined Paper" },
  { value: "blank", label: "Blank Paper" },
  { value: "graph", label: "Graph Paper" },
] as const;

const inkColors = [
  { value: "blue", label: "Blue Ink" },
  { value: "black", label: "Black Ink" },
  { value: "darkGray", label: "Dark Gray Ink" },
] as const;

const pageSizes = [
  { value: "a4", label: "A4" },
  { value: "letter", label: "Letter" },
] as const;

const pdfQualities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;

const settingPresets: Array<{
  label: string;
  icon: string;
  className: string;
  settings: Partial<RenderSettings>;
}> = [
  {
    label: "Worksheet",
    icon: "doc",
    className: "bg-brand-blue text-white shadow-paper hover:bg-blue-700",
    settings: {
      styleId: "classic-student",
      pageType: "lined",
      inkColor: "blue",
      fontSize: 34,
      lineSpacing: 1.55,
      wordSpacing: 1,
      randomness: 0.38,
      leftMargin: 165,
      topMargin: 120,
      assignmentMode: true,
    },
  },
  {
    label: "Class Notes",
    icon: "note",
    className: "bg-emerald-600 text-white shadow-paper hover:bg-emerald-700",
    settings: {
      styleId: "clean-notes",
      pageType: "lined",
      inkColor: "blue",
      fontSize: 32,
      lineSpacing: 1.45,
      wordSpacing: 0.95,
      randomness: 0.32,
      leftMargin: 150,
      topMargin: 105,
      assignmentMode: false,
    },
  },
  {
    label: "Lab Record",
    icon: "grid",
    className: "bg-slate-950 text-white shadow-paper hover:bg-slate-800",
    settings: {
      styleId: "lab-record",
      pageType: "graph",
      inkColor: "black",
      fontSize: 30,
      lineSpacing: 1.5,
      wordSpacing: 0.95,
      randomness: 0.28,
      leftMargin: 155,
      topMargin: 110,
      assignmentMode: true,
    },
  },
  {
    label: "Practice Sheet",
    icon: "check",
    className: "bg-indigo-600 text-white shadow-paper hover:bg-indigo-700",
    settings: {
      styleId: "exam-sheet",
      pageType: "blank",
      inkColor: "black",
      fontSize: 31,
      lineSpacing: 1.6,
      wordSpacing: 1,
      randomness: 0.26,
      leftMargin: 140,
      topMargin: 95,
      assignmentMode: true,
    },
  },
  {
    label: "Neat Notebook",
    icon: "book",
    className: "bg-cyan-700 text-white shadow-paper hover:bg-cyan-800",
    settings: {
      styleId: "neat-margin",
      pageType: "lined",
      inkColor: "blue",
      fontSize: 30,
      lineSpacing: 1.5,
      wordSpacing: 1.05,
      randomness: 0.22,
      leftMargin: 170,
      topMargin: 115,
      assignmentMode: false,
    },
  },
];

type RenderedPage = {
  pngUrl: string;
  width: number;
  height: number;
};

export function HandwritingTool() {
  const [text, setText] = useState(starterText);
  const [settings, setSettings] = useState<RenderSettings>(defaultSettings);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [fileName, setFileName] = useState("handwriting-pages");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [scope, setScope] = useState<"current" | "all">("current");
  const [isRendering, setIsRendering] = useState(true);
  const renderRequestId = useRef(0);
  const stylePreviewCache = useRef(new Map<string, HTMLCanvasElement>());
  const hasUserText = text.trim().length > 0;

  useEffect(() => {
    if (!hasUserText) {
      renderRequestId.current += 1;
      const timeoutId = window.setTimeout(() => {
        setPages([]);
        setIsRendering(false);
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }

    const requestId = renderRequestId.current + 1;
    renderRequestId.current = requestId;

    const timeoutId = window.setTimeout(() => {
      setIsRendering(true);
      void renderHandwriting(text, settings)
        .then((result) => {
          if (renderRequestId.current !== requestId) {
            return;
          }

          setPages(
            result.pages.map((page) => ({
              pngUrl: page.toDataURL("image/png"),
              width: result.pageWidth,
              height: result.pageHeight,
            })),
          );
        })
        .catch((error) => {
          console.error("Failed to render handwriting preview", error);
        })
        .finally(() => {
          if (renderRequestId.current === requestId) {
            setIsRendering(false);
          }
        });
    }, hasUserText ? 120 : 0);

    return () => window.clearTimeout(timeoutId);
  }, [hasUserText, settings, text]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const shownPageCount = hasUserText ? Math.max(pages.length, 1) : 0;
  const canDownload = hasUserText && pages.length > 0 && !isRendering;
  const safeBaseName = sanitizeFileName(fileName) || "handwriting-pages";
  const selectedPageIndex = Math.min(currentPageIndex, Math.max(pages.length - 1, 0));

  const updateSetting = <Key extends keyof RenderSettings>(key: Key, value: RenderSettings[Key]) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const downloadImage = async (page: RenderedPage, pageIndex: number, format: Extract<ExportFormat, "png" | "jpg">) => {
    const link = document.createElement("a");
    link.download = `${safeBaseName}-page-${pageIndex + 1}.${format}`;
    link.href = format === "png" ? page.pngUrl : await convertPngToJpg(page);
    link.click();
  };

  const downloadImages = async (format: Extract<ExportFormat, "png" | "jpg">) => {
    if (!canDownload) return;

    for (let index = 0; index < pages.length; index += 1) {
      await downloadImage(pages[index], index, format);
    }
  };

  const downloadCurrentImage = async (format: Extract<ExportFormat, "png" | "jpg">) => {
    if (!canDownload) return;

    const page = pages[selectedPageIndex];
    if (!page) return;

    await downloadImage(page, selectedPageIndex, format);
  };

  const downloadPdf = async (scope: "all" | "current") => {
    if (!canDownload) return;

    const targetPages = scope === "all" ? pages : pages.slice(selectedPageIndex, selectedPageIndex + 1);
    const firstPage = targetPages[0];

    if (!firstPage) return;

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [firstPage.width, firstPage.height],
      compress: true,
    });

    targetPages.forEach((page, index) => {
      if (index > 0) {
        pdf.addPage([page.width, page.height], "portrait");
      }
      pdf.addImage(
        page.pngUrl,
        "PNG",
        0,
        0,
        page.width,
        page.height,
        undefined,
        settings.pdfQuality === "high" ? "NONE" : "FAST",
      );
    });

    pdf.save(`${safeBaseName}${scope === "current" ? `-page-${selectedPageIndex + 1}` : ""}.pdf`);
  };

  const clearText = () => {
    setText("");
  };

  const resetText = () => {
    setText(starterText);
  };

  return (
    <section className="handwriting-workspace grid scroll-mt-36 items-start gap-0 border-y border-slate-200 bg-white md:scroll-mt-28 lg:grid-cols-[minmax(0,0.82fr)_minmax(440px,1.18fr)]">
      <div className="editor-panel min-w-0 bg-white px-5 py-6 sm:px-6 lg:border-r lg:border-slate-200 lg:px-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Handwriting Studio</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Create readable handwritten-style pages</h2>
          </div>
          <div className="shrink-0 border-l border-slate-200 pl-4 text-xs font-semibold text-brand-blue">
            {wordCount} words / {shownPageCount} page{shownPageCount === 1 ? "" : "s"}
          </div>
        </div>

        <label className="input-label" htmlFor="handwriting-text">
          Paste notes, worksheet text, drafts, or article copy
        </label>
        <div className="mb-4">
          <p className="input-label">Quick presets</p>
          <div className="flex flex-wrap gap-2">
            {settingPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  setSettings((current) => ({
                    ...current,
                    ...preset.settings,
                  }))
                }
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${preset.className}`}
              >
                <PresetIcon name={preset.icon} className="h-4 w-4" />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        <textarea
          id="handwriting-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="input-field min-h-[210px] resize-y rounded-xl leading-6"
          placeholder="Paste personal notes, worksheet text, journal drafts, or article copy here..."
        />
        {text.length === 0 && (
          <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={resetText}
                className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-brand-blue transition hover:bg-blue-100"
              >
                Try sample text →
              </button>
              <p className="text-sm text-slate-500">or paste your own content above</p>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <p>
            {wordCount} words detected. Preview updates after you pause typing.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearText}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Clear Text
            </button>
            {text.length > 0 && (
              <button
                type="button"
                onClick={resetText}
                className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 font-semibold text-brand-blue transition hover:bg-blue-100"
              >
                Try sample text →
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="border-t border-slate-200 pt-5 md:col-span-2 xl:col-span-3">
            <p className="input-label" id="styleId">
              Handwriting Style
            </p>
            <div className="flex flex-wrap gap-2" aria-labelledby="styleId">
              {handwritingStyles.map((style) => (
                <StylePreviewCard
                  key={style.id}
                  style={style}
                  selected={settings.styleId === style.id}
                  previewCache={stylePreviewCache}
                  onClick={() => updateSetting("styleId", style.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="input-label" htmlFor="pageType">
              Page Type
            </label>
            <select
              id="pageType"
              className="input-field"
              value={settings.pageType}
              onChange={(event) => updateSetting("pageType", event.target.value as RenderSettings["pageType"])}
            >
              {pageTypes.map((pageType) => (
                <option key={pageType.value} value={pageType.value}>
                  {pageType.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label" htmlFor="pageSize">
              Page Size
            </label>
            <select
              id="pageSize"
              className="input-field"
              value={settings.pageSize}
              onChange={(event) => updateSetting("pageSize", event.target.value as RenderSettings["pageSize"])}
            >
              {pageSizes.map((pageSize) => (
                <option key={pageSize.value} value={pageSize.value}>
                  {pageSize.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label" htmlFor="inkColor">
              Ink Color
            </label>
            <select
              id="inkColor"
              className="input-field"
              value={settings.inkColor}
              onChange={(event) => updateSetting("inkColor", event.target.value as RenderSettings["inkColor"])}
            >
              {inkColors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label" htmlFor="pdfQuality">
              PDF Quality
            </label>
            <select
              id="pdfQuality"
              className="input-field"
              value={settings.pdfQuality}
              onChange={(event) => updateSetting("pdfQuality", event.target.value as RenderSettings["pdfQuality"])}
            >
              {pdfQualities.map((quality) => (
                <option key={quality.value} value={quality.value}>
                  {quality.label}
                </option>
              ))}
            </select>
          </div>

          <RangeControl
            id="fontSize"
            label="Font Size"
            min={24}
            max={44}
            step={1}
            value={settings.fontSize}
            onChange={(value) => updateSetting("fontSize", value)}
          />
          <RangeControl
            id="lineSpacing"
            label="Line Spacing"
            min={1.2}
            max={2.2}
            step={0.05}
            value={settings.lineSpacing}
            onChange={(value) => updateSetting("lineSpacing", value)}
          />
          <RangeControl
            id="wordSpacing"
            label="Word Spacing"
            min={0.8}
            max={1.6}
            step={0.05}
            value={settings.wordSpacing}
            onChange={(value) => updateSetting("wordSpacing", value)}
          />
        </div>

        <details className="mt-6 border-y border-slate-200 py-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-950">
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-600">
              &gt;
            </span>
            Advanced Settings
            <span className="ml-2 text-sm font-normal text-slate-500">
              Fine-tune margins, paper brightness, tilt, and handwriting variation.
            </span>
          </summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <RangeControl
              id="randomness"
              label="Natural Variation"
              min={0.05}
              max={0.9}
              step={0.05}
              value={settings.randomness}
              onChange={(value) => updateSetting("randomness", value)}
            />
            <RangeControl
              id="leftMargin"
              label="Left Margin"
              min={120}
              max={240}
              step={2}
              value={settings.leftMargin}
              onChange={(value) => updateSetting("leftMargin", value)}
            />
            <RangeControl
              id="topMargin"
              label="Top Margin"
              min={70}
              max={180}
              step={2}
              value={settings.topMargin}
              onChange={(value) => updateSetting("topMargin", value)}
            />
            <RangeControl
              id="paperBrightness"
              label="Paper Brightness"
              min={90}
              max={104}
              step={1}
              value={settings.paperBrightness}
              onChange={(value) => updateSetting("paperBrightness", value)}
            />
            <RangeControl
              id="pageTilt"
              label="Optional Page Tilt"
              min={0}
              max={0.6}
              step={0.1}
              value={settings.pageTilt}
              onChange={(value) => updateSetting("pageTilt", value)}
            />
          </div>
        </details>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={settings.assignmentMode}
              onChange={(event) => updateSetting("assignmentMode", event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            Page Layout Mode
          </label>
          <label className="inline-flex items-center gap-3 border-l border-slate-200 pl-4 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={settings.showMarginLine}
              onChange={(event) => updateSetting("showMarginLine", event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            Margin Line
          </label>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 lg:grid-cols-[1fr,auto] lg:items-end">
          <div>
            <label className="input-label" htmlFor="fileName">
              Export File Name
            </label>
            <input
              id="fileName"
              className="input-field"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              placeholder="handwriting-pages"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="currentPage">
              Current Page
            </label>
            <select
              id="currentPage"
              className="input-field min-w-40"
              value={selectedPageIndex}
              onChange={(event) => setCurrentPageIndex(Number(event.target.value))}
              disabled={!hasUserText || !pages.length}
            >
              {pages.map((_, index) => (
                <option key={index} value={index}>
                  Page {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="flex flex-wrap gap-2">
            {(["current", "all"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setScope(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  scope === item
                    ? "bg-blue-50 text-brand-blue ring-1 ring-blue-100"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item === "current" ? "Current page" : "All pages"}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => {
                void downloadPdf(scope);
              }}
              disabled={!canDownload}
              className="w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Download PDF
            </button>
          </div>

          <details className="mt-4 border-t border-slate-200 pt-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-950">More formats</summary>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  void (scope === "current" ? downloadCurrentImage("png") : downloadImages("png"));
                }}
                disabled={!canDownload}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={() => {
                  void (scope === "current" ? downloadCurrentImage("jpg") : downloadImages("jpg"));
                }}
                disabled={!canDownload}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download JPG
              </button>
            </div>
          </details>
        </div>
      </div>

      <div className="preview-panel page-preview relative self-start bg-[#f3f5f8] px-5 py-6 sm:px-7 lg:sticky lg:top-24 lg:min-h-[760px]">
        {isRendering && <div className="absolute left-0 top-0 h-[3px] w-full animate-pulse bg-brand-blue" />}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Preview</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">Real-time handwritten pages</h3>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-brand-green">
            {hasUserText ? "Live preview" : "Waiting for text"}
          </div>
        </div>

        <div className="studio-preview-scroll max-h-[800px] space-y-6 overflow-auto px-1 pb-5" aria-live="polite">
          {!pages.length && (hasUserText ? <StaticPreviewPaper /> : <BlankPreviewPaper />)}
          {pages.map((page, index) => (
            <div
              key={`${page.pngUrl}-${index}`}
              className="paper-frame relative mx-auto max-w-[570px] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.16)] ring-1 ring-slate-300/70"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.pngUrl}
                alt={`Handwriting preview page ${index + 1}`}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StylePreviewCard({
  style,
  selected,
  previewCache,
  onClick,
}: {
  style: HandwritingStyle;
  selected: boolean;
  previewCache: { current: Map<string, HTMLCanvasElement> };
  onClick: () => void;
}) {
  void previewCache;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[66px] flex-1 basis-[120px] rounded-lg p-1.5 text-left transition ${
        selected
          ? "border-2 border-brand-blue bg-blue-50"
          : "border border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <span className="block truncate text-xs font-semibold text-slate-950">{style.label}</span>
      <span
        className="mt-1 block h-8 w-full truncate bg-white/70 px-1 py-1 text-lg leading-6 text-brand-blue"
        style={{ fontFamily: style.primary }}
      >
        Hello sample
      </span>
    </button>
  );
}

function BlankPreviewPaper() {
  return (
    <div className="paper-frame mx-auto max-w-[570px] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.16)] ring-1 ring-slate-300/70">
      <div className="relative aspect-[1240/1754] overflow-hidden bg-[#fffdf4]">
        <div className="absolute bottom-0 left-0 top-0 w-[11%] border-r-2 border-red-200/80" />
        <div className="absolute inset-x-0 top-[11%] space-y-[4.7%]">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="h-px bg-blue-200/70" />
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticPreviewPaper() {
  return (
    <div className="paper-frame mx-auto max-w-[570px] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.16)] ring-1 ring-slate-300/70">
      <div className="relative aspect-[1240/1754] overflow-hidden bg-[#fffdf4]">
        <div className="absolute bottom-0 left-0 top-0 w-[11%] border-r-2 border-red-200/80" />
        <div className="absolute inset-x-0 top-[11%] space-y-[4.7%]">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="h-px bg-blue-200/70" />
          ))}
        </div>
        <div className="absolute left-[16%] right-[8%] top-[10%] text-brand-blue">
          <p className="font-hand text-[clamp(1.2rem,3vw,2.4rem)] leading-snug">Title: Weekly Planning Notes</p>
          <p className="font-hand mt-[5%] text-[clamp(1.05rem,2.5vw,2rem)] leading-snug">
            This preview shows how your typed notes can become a readable handwritten-style page.
          </p>
          <p className="font-hand mt-[5%] text-[clamp(1.05rem,2.5vw,2rem)] leading-snug">
            Adjust paper, spacing, margins, ink color, and style before exporting.
          </p>
          <p className="font-hand mt-[5%] text-[clamp(1.05rem,2.5vw,2rem)] leading-snug">
            Use it for notes, worksheets, journal drafts, printables, and design previews.
          </p>
        </div>
      </div>
    </div>
  );
}

function PresetIcon({ name, className }: { name: string; className?: string }) {
  if (name === "note") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        viewBox="0 0 24 24"
      >
        <path d="M5 4h14v16H5Z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    );
  }

  if (name === "grid") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        viewBox="0 0 24 24"
      >
        <path d="M4 4h16v16H4Z" />
        <path d="M4 10h16" />
        <path d="M4 16h16" />
        <path d="M10 4v16" />
        <path d="M16 4v16" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        viewBox="0 0 24 24"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        viewBox="0 0 24 24"
      >
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5Z" />
        <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.3"
      viewBox="0 0 24 24"
    >
      <path d="M6 3h9l3 3v15H6Z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

function RangeControl({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="border-b border-slate-100 pb-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-xs font-semibold text-slate-700" htmlFor={id}>{label}</label>
        <span className="text-xs font-semibold tabular-nums text-brand-blue">{value.toFixed(step < 1 ? 2 : 0)}</span>
      </div>
      <div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="range-field"
        />
        <div className="mt-1 flex justify-between text-[10px] text-slate-400"><span>{min}</span><span>{max}</span></div>
      </div>
    </div>
  );
}

function sanitizeFileName(value: string) {
  return value
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function convertPngToJpg(page: RenderedPage) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = page.width;
      canvas.height = page.height;

      if (!ctx) {
        reject(new Error("Canvas context could not be created."));
        return;
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.95));
    };
    image.onerror = () => reject(new Error("Could not prepare JPG download."));
    image.src = page.pngUrl;
  });
}
