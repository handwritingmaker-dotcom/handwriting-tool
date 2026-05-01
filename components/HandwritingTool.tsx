"use client";

import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import {
  defaultSettings,
  ExportFormat,
  HandwritingStyle,
  handwritingStyles,
  renderHandwriting,
  RenderSettings,
} from "@/lib/handwriting";

const starterText = `Name: Alex Carter
Class: History 101
Topic: Causes of the Industrial Revolution

The Industrial Revolution began in Britain during the late eighteenth century and completely changed the way goods were produced. Earlier, most items were made by hand in small workshops or at home. After new machines were invented, factories began to grow and production became faster.

One major cause was the availability of natural resources such as coal and iron. These resources were necessary for powering machines and building tools, engines, and railways. Britain also had strong trade networks and many colonies, which created demand for goods and access to raw materials.

Another important reason was innovation. New inventions such as the spinning jenny, steam engine, and power loom improved efficiency. Transportation also improved through better roads, canals, and railways, helping factories move products quickly.

In conclusion, the Industrial Revolution was caused by a combination of resources, invention, capital, and expanding trade. It had a lasting effect on society, industry, and daily life.`;

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
    label: "Assignment",
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
    label: "Exam Sheet",
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
  jpgUrl: string;
  width: number;
  height: number;
};

export function HandwritingTool() {
  const [text, setText] = useState("");
  const [settings, setSettings] = useState<RenderSettings>(defaultSettings);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [fileName, setFileName] = useState("handwriting-pages");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [scope, setScope] = useState<"current" | "all">("current");
  const [isRendering, setIsRendering] = useState(true);
  const renderRequestId = useRef(0);
  const stylePreviewCache = useRef(new Map<string, HTMLCanvasElement>());

  useEffect(() => {
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
            jpgUrl: page.toDataURL("image/jpeg", 0.95),
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
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [settings, text]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const canDownload = pages.length > 0 && !isRendering;
  const safeBaseName = sanitizeFileName(fileName) || "handwriting-pages";
  const selectedPageIndex = Math.min(currentPageIndex, Math.max(pages.length - 1, 0));

  const updateSetting = <Key extends keyof RenderSettings>(key: Key, value: RenderSettings[Key]) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const downloadImage = (page: RenderedPage, pageIndex: number, format: Extract<ExportFormat, "png" | "jpg">) => {
    const link = document.createElement("a");
    link.download = `${safeBaseName}-page-${pageIndex + 1}.${format}`;
    link.href = format === "png" ? page.pngUrl : page.jpgUrl;
    link.click();
  };

  const downloadImages = (format: Extract<ExportFormat, "png" | "jpg">) => {
    if (!canDownload) return;

    pages.forEach((page, index) => {
      downloadImage(page, index, format);
    });
  };

  const downloadCurrentImage = (format: Extract<ExportFormat, "png" | "jpg">) => {
    if (!canDownload) return;

    const page = pages[selectedPageIndex];
    if (!page) return;

    downloadImage(page, selectedPageIndex, format);
  };

  const downloadPdf = (scope: "all" | "current") => {
    if (!canDownload) return;

    const targetPages = scope === "all" ? pages : pages.slice(selectedPageIndex, selectedPageIndex + 1);
    const firstPage = targetPages[0];

    if (!firstPage) return;

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
    <section id="tool" className="grid gap-6 lg:grid-cols-[1.08fr,0.92fr]">
      <div className="control-card">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Handwriting Studio</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Convert typed text into believable handwriting</h2>
          </div>
          <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-brand-blue">
            {wordCount} words / {pages.length} page{pages.length === 1 ? "" : "s"}
          </div>
        </div>

        <label className="input-label" htmlFor="handwriting-text">
          Paste your assignment, notes, or article
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
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${preset.className}`}
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
          className="input-field min-h-[320px] resize-y leading-7"
          placeholder="Paste your essay, notes, or assignment here..."
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
          <div className="md:col-span-2 xl:col-span-3">
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

        <details className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
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
          <label className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={settings.assignmentMode}
              onChange={(event) => updateSetting("assignmentMode", event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            Assignment Mode
          </label>
          <label className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={settings.showMarginLine}
              onChange={(event) => updateSetting("showMarginLine", event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            Margin Line
          </label>
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[1fr,auto] lg:items-end">
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
              disabled={!pages.length}
            >
              {pages.map((_, index) => (
                <option key={index} value={index}>
                  Page {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4">
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
              onClick={() => downloadPdf(scope)}
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
                onClick={() => (scope === "current" ? downloadCurrentImage("png") : downloadImages("png"))}
                disabled={!canDownload}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={() => (scope === "current" ? downloadCurrentImage("jpg") : downloadImages("jpg"))}
                disabled={!canDownload}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download JPG
              </button>
            </div>
          </details>
        </div>
      </div>

      <div className="control-card page-preview relative overflow-hidden">
        {isRendering && <div className="absolute left-0 top-0 h-[3px] w-full animate-pulse bg-brand-blue" />}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Preview</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">Real-time handwritten pages</h3>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-brand-green">
            Mobile-ready
          </div>
        </div>

        <div className="max-h-[980px] space-y-6 overflow-auto pr-1">
          {pages.map((page, index) => (
            <div
              key={`${page.pngUrl}-${index}`}
              className="paper-frame rounded-[28px] border border-slate-200 bg-white p-3 shadow-paper"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.pngUrl}
                alt={`Handwriting preview page ${index + 1}`}
                className="h-auto w-full rounded-[22px]"
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isMounted = true;

    const drawPreview = (preview: HTMLCanvasElement) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(preview, 0, 0);
    };

    const cachedPreview = previewCache.current.get(style.id);
    if (cachedPreview) {
      drawPreview(cachedPreview);
      return;
    }

    void renderHandwriting("Hello World Sample", {
      ...defaultSettings,
      styleId: style.id,
      pageType: "blank",
      fontSize: 38,
      leftMargin: 90,
      rightMargin: 90,
      topMargin: 80,
      bottomMargin: 80,
      assignmentMode: false,
      pdfQuality: "low",
      showMarginLine: false,
      pageTilt: 0,
    })
      .then((result) => {
        if (!isMounted) return;

        const source = result.pages[0];
        const preview = document.createElement("canvas");
        const ctx = preview.getContext("2d");

        preview.width = 130;
        preview.height = 32;

        if (!source || !ctx) return;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, preview.width, preview.height);
        ctx.drawImage(source, 58, 54, 620, 150, 0, 0, preview.width, preview.height);
        previewCache.current.set(style.id, preview);
        drawPreview(preview);
      })
      .catch((error) => {
        console.error("Failed to render handwriting style preview", error);
      });

    return () => {
      isMounted = false;
    };
  }, [previewCache, style.id]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[72px] w-[140px] rounded-lg p-1.5 text-left transition ${
        selected
          ? "border-2 border-brand-blue bg-blue-50"
          : "border border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <span className="block truncate text-xs font-semibold text-slate-950">{style.label}</span>
      <canvas ref={canvasRef} width={130} height={32} className="mt-1 h-8 w-[130px] rounded-lg bg-white" />
    </button>
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
    <div>
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
        <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
          <span>{min}</span>
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-950 shadow-sm">
            {value.toFixed(step < 1 ? 2 : 0)}
          </span>
          <span>{max}</span>
        </div>
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
