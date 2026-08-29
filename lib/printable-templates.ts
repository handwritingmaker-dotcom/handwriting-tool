import { physicalPageDimensions } from "./handwriting-export.ts";
import type { PageSize } from "./handwriting.ts";

export type PrintableOrientation = "portrait" | "landscape";
export type PrintablePattern = "lined" | "graph" | "dots" | "blank" | "guided";
export type PracticeMode = "blank" | "trace" | "copy";

export interface PrintableTemplatePreset {
  id: string;
  name: string;
  category: "Printable Paper" | "Graph & Dot Grid" | "Handwriting Practice";
  description: string;
  pattern: PrintablePattern;
  spacingMm: number;
  lineThicknessMm: number;
  leftGuide: boolean;
  practice: boolean;
}

export interface PrintableTemplateConfig {
  presetId: string;
  pageSize: PageSize;
  orientation: PrintableOrientation;
  spacingMm: number;
  lineThicknessMm: number;
  margins: { top: number; right: number; bottom: number; left: number };
  pageCount: number;
  leftGuide: boolean;
  headerEnabled: boolean;
  header: { name: string; date: string; subject: string };
  practiceMode: PracticeMode;
  practiceText: string;
}

export type PrintablePrimitive =
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number; color: string; width: number; dash?: number[] }
  | { kind: "circle"; x: number; y: number; radius: number; color: string }
  | { kind: "text"; x: number; y: number; text: string; color: string; size: number; weight?: "normal" | "bold"; opacity?: number };

export interface PrintablePageModel {
  widthMm: number;
  heightMm: number;
  primitives: PrintablePrimitive[];
  background: string;
}

export const printableTemplatePresets: PrintableTemplatePreset[] = [
  { id: "college-ruled", name: "College Ruled Paper", category: "Printable Paper", description: "Balanced ruling for everyday notes and longer writing.", pattern: "lined", spacingMm: 7.1, lineThicknessMm: 0.22, leftGuide: true, practice: false },
  { id: "wide-ruled", name: "Wide Ruled Paper", category: "Printable Paper", description: "More vertical room for larger handwriting and early practice.", pattern: "lined", spacingMm: 8.7, lineThicknessMm: 0.24, leftGuide: true, practice: false },
  { id: "narrow-ruled", name: "Narrow Ruled Paper", category: "Printable Paper", description: "Compact lines for smaller writing and dense notes.", pattern: "lined", spacingMm: 6, lineThicknessMm: 0.2, leftGuide: true, practice: false },
  { id: "standard-lined", name: "Standard Lined Paper", category: "Printable Paper", description: "A neutral notebook layout with manually adjustable spacing.", pattern: "lined", spacingMm: 8, lineThicknessMm: 0.22, leftGuide: false, practice: false },
  { id: "graph-paper", name: "Graph Paper", category: "Graph & Dot Grid", description: "A crisp square grid for calculations, diagrams, and layouts.", pattern: "graph", spacingMm: 5, lineThicknessMm: 0.14, leftGuide: false, practice: false },
  { id: "dot-grid", name: "Dot Grid Paper", category: "Graph & Dot Grid", description: "Subtle dots for flexible writing, planning, and sketching.", pattern: "dots", spacingMm: 5, lineThicknessMm: 0.32, leftGuide: false, practice: false },
  { id: "blank-writing", name: "Blank Writing Paper", category: "Printable Paper", description: "Clean printable paper with optional margins and header.", pattern: "blank", spacingMm: 8, lineThicknessMm: 0.2, leftGuide: false, practice: false },
  { id: "primary-handwriting", name: "Primary Handwriting Practice", category: "Handwriting Practice", description: "Solid upper and baseline guides with a dashed middle guide.", pattern: "guided", spacingMm: 18, lineThicknessMm: 0.24, leftGuide: false, practice: true },
];

const presetMap = new Map(printableTemplatePresets.map((preset) => [preset.id, preset]));
const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : minimum));

export function getPrintablePreset(id: string) {
  return presetMap.get(id) ?? printableTemplatePresets[0];
}

export function createPrintableConfig(presetId = printableTemplatePresets[0].id, overrides: Partial<PrintableTemplateConfig> = {}): PrintableTemplateConfig {
  const preset = getPrintablePreset(presetId);
  return {
    presetId: preset.id,
    pageSize: "a4",
    orientation: "portrait",
    spacingMm: preset.spacingMm,
    lineThicknessMm: preset.lineThicknessMm,
    margins: { top: 15, right: 14, bottom: 15, left: 18 },
    pageCount: 1,
    leftGuide: preset.leftGuide,
    headerEnabled: false,
    header: { name: "", date: "", subject: "" },
    practiceMode: "blank",
    practiceText: "Practice makes progress",
    ...overrides,
  };
}

export function normalizePrintableConfig(config: PrintableTemplateConfig): PrintableTemplateConfig {
  const dimensions = getPrintablePageDimensions(config.pageSize, config.orientation);
  return {
    ...config,
    presetId: getPrintablePreset(config.presetId).id,
    spacingMm: clamp(config.spacingMm, 3, 30),
    lineThicknessMm: clamp(config.lineThicknessMm, 0.1, 1),
    pageCount: Math.round(clamp(config.pageCount, 1, 20)),
    margins: {
      top: clamp(config.margins.top, 5, Math.min(50, dimensions.height / 3)),
      right: clamp(config.margins.right, 5, Math.min(50, dimensions.width / 3)),
      bottom: clamp(config.margins.bottom, 5, Math.min(50, dimensions.height / 3)),
      left: clamp(config.margins.left, 5, Math.min(50, dimensions.width / 3)),
    },
    header: {
      name: config.header.name.slice(0, 60),
      date: config.header.date.slice(0, 40),
      subject: config.header.subject.slice(0, 80),
    },
    practiceText: config.practiceText.slice(0, 120),
  };
}

export function getPrintablePageDimensions(pageSize: PageSize, orientation: PrintableOrientation) {
  const physical = physicalPageDimensions[pageSize];
  return orientation === "landscape" ? { width: physical.height, height: physical.width } : { ...physical };
}

export function getPrintablePngDimensions(config: PrintableTemplateConfig, dpi = 150) {
  const dimensions = getPrintablePageDimensions(config.pageSize, config.orientation);
  return { width: Math.round((dimensions.width / 25.4) * dpi), height: Math.round((dimensions.height / 25.4) * dpi) };
}

export function getPrintableFilename(config: PrintableTemplateConfig, extension: "pdf" | "png") {
  const preset = getPrintablePreset(config.presetId);
  const base = preset.practice ? "handwriting-practice" : preset.id;
  return `${base}-${config.pageSize}${config.orientation === "landscape" ? "-landscape" : ""}.${extension}`;
}

export function buildPrintablePageModel(input: PrintableTemplateConfig): PrintablePageModel {
  const config = normalizePrintableConfig(input);
  const preset = getPrintablePreset(config.presetId);
  const { width, height } = getPrintablePageDimensions(config.pageSize, config.orientation);
  const primitives: PrintablePrimitive[] = [];
  const ink = "#0f172a";
  const rule = "#b8d0ee";
  const guide = "#dc6b73";
  let contentTop = config.margins.top;
  const contentBottom = height - config.margins.bottom;
  const contentLeft = config.margins.left;
  const contentRight = width - config.margins.right;

  if (config.headerEnabled) {
    const headerY = contentTop + 4;
    primitives.push({ kind: "text", x: contentLeft, y: headerY, text: `Name: ${config.header.name}`, color: ink, size: 3.5 });
    primitives.push({ kind: "text", x: width / 2, y: headerY, text: `Subject: ${config.header.subject}`, color: ink, size: 3.5 });
    primitives.push({ kind: "text", x: contentRight - 35, y: headerY, text: `Date: ${config.header.date}`, color: ink, size: 3.5 });
    primitives.push({ kind: "line", x1: contentLeft, y1: headerY + 4, x2: contentRight, y2: headerY + 4, color: "#cbd5e1", width: 0.2 });
    contentTop += 16;
  }

  if (config.leftGuide) {
    const x = Math.min(contentRight - 5, contentLeft + 12);
    primitives.push({ kind: "line", x1: x, y1: contentTop, x2: x, y2: contentBottom, color: guide, width: Math.max(0.22, config.lineThicknessMm) });
  }

  if (preset.pattern === "lined") {
    for (let y = contentTop; y <= contentBottom + 0.01; y += config.spacingMm) {
      primitives.push({ kind: "line", x1: contentLeft, y1: y, x2: contentRight, y2: y, color: rule, width: config.lineThicknessMm });
    }
  } else if (preset.pattern === "graph") {
    for (let y = contentTop; y <= contentBottom + 0.01; y += config.spacingMm) primitives.push({ kind: "line", x1: contentLeft, y1: y, x2: contentRight, y2: y, color: rule, width: config.lineThicknessMm });
    for (let x = contentLeft; x <= contentRight + 0.01; x += config.spacingMm) primitives.push({ kind: "line", x1: x, y1: contentTop, x2: x, y2: contentBottom, color: rule, width: config.lineThicknessMm });
  } else if (preset.pattern === "dots") {
    for (let y = contentTop; y <= contentBottom + 0.01; y += config.spacingMm) {
      for (let x = contentLeft; x <= contentRight + 0.01; x += config.spacingMm) primitives.push({ kind: "circle", x, y, radius: config.lineThicknessMm, color: "#8faed2" });
    }
  } else if (preset.pattern === "guided") {
    let rowIndex = 0;
    for (let y = contentTop; y + config.spacingMm <= contentBottom + 0.01; y += config.spacingMm, rowIndex += 1) {
      const middle = y + config.spacingMm / 2;
      const baseline = y + config.spacingMm;
      primitives.push({ kind: "line", x1: contentLeft, y1: y, x2: contentRight, y2: y, color: rule, width: config.lineThicknessMm });
      primitives.push({ kind: "line", x1: contentLeft, y1: middle, x2: contentRight, y2: middle, color: "#a8bfdc", width: config.lineThicknessMm, dash: [1.3, 1.3] });
      primitives.push({ kind: "line", x1: contentLeft, y1: baseline, x2: contentRight, y2: baseline, color: "#6f9bd0", width: Math.max(config.lineThicknessMm, 0.28) });
      const showTrace = config.practiceMode === "trace" && rowIndex % 2 === 0;
      const showCopy = config.practiceMode === "copy" && rowIndex === 0;
      if ((showTrace || showCopy) && config.practiceText.trim()) {
        primitives.push({ kind: "text", x: contentLeft + 2, y: baseline - 1.4, text: config.practiceText.trim(), color: ink, size: Math.min(7, config.spacingMm * 0.42), opacity: showTrace ? 0.24 : 0.9 });
      }
    }
  }

  return { widthMm: width, heightMm: height, primitives, background: "#ffffff" };
}
