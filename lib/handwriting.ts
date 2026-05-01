export type PageType = "lined" | "blank" | "graph";
export type InkColor = "blue" | "black" | "darkGray";
export type ExportFormat = "png" | "jpg" | "pdf";
export type PageSize = "a4" | "letter";
export type PdfQuality = "low" | "medium" | "high";

export interface HandwritingStyle {
  id: string;
  label: string;
  primary: string;
  alternates: string[];
  slant: number;
  weight: number;
  sizeJitter: number;
  xJitter: number;
  yJitter: number;
  rotateJitter: number;
  pressure: number;
}

export interface RenderSettings {
  styleId: string;
  pageType: PageType;
  fontSize: number;
  lineSpacing: number;
  wordSpacing: number;
  inkColor: InkColor;
  randomness: number;
  leftMargin: number;
  rightMargin: number;
  topMargin: number;
  bottomMargin: number;
  assignmentMode: boolean;
  pageSize: PageSize;
  pdfQuality: PdfQuality;
  paperBrightness: number;
  showMarginLine: boolean;
  pageTilt: number;
}

export interface RenderResult {
  pages: HTMLCanvasElement[];
  pageWidth: number;
  pageHeight: number;
}

const fontReadyTimeoutMs = 2000;

const pageDimensions: Record<PageSize, { width: number; height: number }> = {
  a4: { width: 1240, height: 1754 },
  letter: { width: 1275, height: 1650 },
};

const qualityScale: Record<PdfQuality, number> = {
  low: 1,
  medium: 1.5,
  high: 2,
};

export const handwritingStyles: HandwritingStyle[] = [
  {
    id: "classic-student",
    label: "Classic Student",
    primary: '"Kalam", "Comic Sans MS", cursive',
    alternates: ['"Caveat", cursive', '"Patrick Hand", cursive'],
    slant: -0.01,
    weight: 400,
    sizeJitter: 0.65,
    xJitter: 0.9,
    yJitter: 1.15,
    rotateJitter: 0.014,
    pressure: 0.92,
  },
  {
    id: "clean-notes",
    label: "Clean Notes",
    primary: '"Patrick Hand", "Comic Sans MS", cursive',
    alternates: ['"Kalam", cursive', '"Architects Daughter", cursive'],
    slant: 0.005,
    weight: 400,
    sizeJitter: 0.45,
    xJitter: 0.7,
    yJitter: 0.9,
    rotateJitter: 0.012,
    pressure: 0.95,
  },
  {
    id: "soft-cursive",
    label: "Soft Cursive",
    primary: '"Caveat", cursive',
    alternates: ['"Shadows Into Light", cursive', '"Kalam", cursive'],
    slant: -0.03,
    weight: 600,
    sizeJitter: 0.8,
    xJitter: 1.0,
    yJitter: 1.3,
    rotateJitter: 0.018,
    pressure: 0.86,
  },
  {
    id: "exam-sheet",
    label: "Exam Sheet",
    primary: '"Architects Daughter", "Comic Sans MS", cursive',
    alternates: ['"Patrick Hand", cursive', '"Indie Flower", cursive'],
    slant: 0.012,
    weight: 400,
    sizeJitter: 0.55,
    xJitter: 0.85,
    yJitter: 0.95,
    rotateJitter: 0.012,
    pressure: 0.94,
  },
  {
    id: "rounded-ink",
    label: "Rounded Ink",
    primary: '"Indie Flower", cursive',
    alternates: ['"Schoolbell", cursive', '"Kalam", cursive'],
    slant: -0.008,
    weight: 400,
    sizeJitter: 0.7,
    xJitter: 1.05,
    yJitter: 1.15,
    rotateJitter: 0.016,
    pressure: 0.88,
  },
  {
    id: "neat-margin",
    label: "Neat Margin",
    primary: '"Shadows Into Light", cursive',
    alternates: ['"Patrick Hand", cursive', '"Caveat", cursive'],
    slant: 0.003,
    weight: 400,
    sizeJitter: 0.48,
    xJitter: 0.72,
    yJitter: 0.85,
    rotateJitter: 0.011,
    pressure: 0.93,
  },
  {
    id: "lecture-fast",
    label: "Lecture Fast",
    primary: '"Schoolbell", cursive',
    alternates: ['"Kalam", cursive', '"Architects Daughter", cursive'],
    slant: -0.014,
    weight: 400,
    sizeJitter: 0.9,
    xJitter: 1.18,
    yJitter: 1.25,
    rotateJitter: 0.02,
    pressure: 0.84,
  },
  {
    id: "ink-flow",
    label: "Ink Flow",
    primary: '"Caveat Brush", "Caveat", cursive',
    alternates: ['"Kalam", cursive', '"Indie Flower", cursive'],
    slant: -0.022,
    weight: 600,
    sizeJitter: 0.78,
    xJitter: 1.0,
    yJitter: 1.1,
    rotateJitter: 0.017,
    pressure: 0.87,
  },
  {
    id: "lab-record",
    label: "Lab Record",
    primary: '"Patrick Hand", cursive',
    alternates: ['"Schoolbell", cursive', '"Shadows Into Light", cursive'],
    slant: 0.01,
    weight: 400,
    sizeJitter: 0.52,
    xJitter: 0.76,
    yJitter: 0.92,
    rotateJitter: 0.012,
    pressure: 0.91,
  },
  {
    id: "daily-notebook",
    label: "Daily Notebook",
    primary: '"Kalam", cursive',
    alternates: ['"Architects Daughter", cursive', '"Indie Flower", cursive'],
    slant: -0.012,
    weight: 400,
    sizeJitter: 0.68,
    xJitter: 0.9,
    yJitter: 1.0,
    rotateJitter: 0.015,
    pressure: 0.9,
  },
];

export const defaultSettings: RenderSettings = {
  styleId: handwritingStyles[0].id,
  pageType: "lined",
  fontSize: 34,
  lineSpacing: 1.55,
  wordSpacing: 1,
  inkColor: "blue",
  randomness: 0.38,
  leftMargin: 165,
  rightMargin: 110,
  topMargin: 120,
  bottomMargin: 120,
  assignmentMode: true,
  pageSize: "a4",
  pdfQuality: "medium",
  paperBrightness: 98,
  showMarginLine: true,
  pageTilt: 0,
};

const colorMap: Record<InkColor, string> = {
  blue: "#1d4ed8",
  black: "#111827",
  darkGray: "#374151",
};

function hashString(input: string) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function chooseStyle(styleId: string) {
  return handwritingStyles.find((style) => style.id === styleId) ?? handwritingStyles[0];
}

function getPageDimensions(settings: RenderSettings) {
  return pageDimensions[settings.pageSize] ?? pageDimensions.a4;
}

function getPixelRatio(settings: RenderSettings) {
  return qualityScale[settings.pdfQuality] ?? qualityScale.medium;
}

function makeCanvas(settings: RenderSettings) {
  const dimensions = getPageDimensions(settings);
  const pixelRatio = getPixelRatio(settings);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(dimensions.width * pixelRatio);
  canvas.height = Math.round(dimensions.height * pixelRatio);
  return canvas;
}

function setupContext(ctx: CanvasRenderingContext2D, settings: RenderSettings) {
  const pixelRatio = getPixelRatio(settings);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.textBaseline = "alphabetic";
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
}

function drawPaper(ctx: CanvasRenderingContext2D, settings: RenderSettings, rng: () => number) {
  const { width, height } = getPageDimensions(settings);
  const brightness = Math.max(90, Math.min(settings.paperBrightness, 104));
  const startLightness = Math.min(100, brightness);
  const endLightness = Math.max(88, brightness - 2);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, `hsl(42 55% ${startLightness}%)`);
  gradient.addColorStop(1, `hsl(44 45% ${endLightness}%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  if (settings.pageType === "lined" || settings.pageType === "graph") {
    ctx.strokeStyle = "rgba(37, 99, 235, 0.22)";
    ctx.lineWidth = 1.5;
    const baseLineGap = settings.fontSize * settings.lineSpacing;
    const gap = settings.pageType === "graph" ? baseLineGap * 0.58 : baseLineGap;
    for (let y = settings.topMargin - 12; y < height - settings.bottomMargin + gap; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    if (settings.pageType === "graph") {
      for (let x = settings.leftMargin - 70; x < width - settings.rightMargin + gap; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    }
  }

  if (settings.showMarginLine) {
    ctx.strokeStyle = "rgba(220, 38, 38, 0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(settings.leftMargin - 42, 0);
    ctx.lineTo(settings.leftMargin - 42, height);
    ctx.stroke();
  }

  for (let i = 0; i < 280; i += 1) {
    ctx.fillStyle = `rgba(15, 23, 42, ${0.012 + rng() * 0.01})`;
    const x = rng() * width;
    const y = rng() * height;
    const size = rng() * 1.4;
    ctx.fillRect(x, y, size, size);
  }

  ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
  ctx.fillRect(width - 22, 0, 22, height);
}

function fontForChar(style: HandwritingStyle, ctx: CanvasRenderingContext2D, size: number, charSeed: number) {
  const familyPool = [style.primary, ...style.alternates];
  const family = charSeed % 9 === 0 ? familyPool[charSeed % familyPool.length] : style.primary;
  ctx.font = `${style.weight} ${size}px ${family}`;
}

function measureText(
  ctx: CanvasRenderingContext2D,
  text: string,
  style: HandwritingStyle,
  settings: RenderSettings,
) {
  let width = 0;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    fontForChar(style, ctx, settings.fontSize, index);
    if (char === " ") {
      width += settings.fontSize * 0.38 * settings.wordSpacing;
    } else {
      width += ctx.measureText(char).width;
    }
  }
  return width;
}

function splitIntoLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  style: HandwritingStyle,
  settings: RenderSettings,
  maxWidth: number,
) {
  const paragraphs = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];

  paragraphs.forEach((paragraph) => {
    if (!paragraph.trim()) {
      blocks.push("");
      return;
    }

    const words = paragraph.trim().split(/\s+/);
    let currentLine = "";

    words.forEach((word) => {
      const nextLine = currentLine ? `${currentLine} ${word}` : word;
      const nextWidth = measureText(ctx, nextLine, style, settings);
      if (nextWidth > maxWidth && currentLine) {
        blocks.push(currentLine);
        currentLine = word;
      } else {
        currentLine = nextLine;
      }
    });

    if (currentLine) {
      blocks.push(currentLine);
    }
    blocks.push("");
  });

  if (blocks.at(-1) === "") {
    blocks.pop();
  }

  return blocks;
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  line: string,
  originX: number,
  baselineY: number,
  style: HandwritingStyle,
  settings: RenderSettings,
  rng: () => number,
) {
  let x = originX;
  const ink = colorMap[settings.inkColor];
  const intensity = style.pressure - settings.randomness * 0.06;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === " ") {
      x += settings.fontSize * 0.38 * settings.wordSpacing + rng() * settings.randomness * 1.8;
      continue;
    }

    const size =
      settings.fontSize + (rng() - 0.5) * style.sizeJitter * settings.randomness * settings.fontSize * 0.1;
    fontForChar(style, ctx, size, index);
    ctx.fillStyle = ink;
    ctx.globalAlpha = intensity + rng() * 0.05;

    const jitterX = (rng() - 0.5) * style.xJitter * settings.randomness * 2.2;
    const jitterY = (rng() - 0.5) * style.yJitter * settings.randomness * 1.6;
    const angle = style.slant * 0.5 + (rng() - 0.5) * style.rotateJitter * settings.randomness * 2.2;

    ctx.save();
    ctx.translate(x + jitterX, baselineY + jitterY);
    ctx.rotate(angle);
    ctx.fillText(char, 0, 0);
    ctx.restore();

    x += ctx.measureText(char).width + rng() * settings.randomness * 0.7;
  }

  ctx.globalAlpha = 1;
}

export async function renderHandwriting(text: string, settings: RenderSettings): Promise<RenderResult> {
  if ("fonts" in document) {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => {
        window.setTimeout(resolve, fontReadyTimeoutMs);
      }),
    ]);
  }

  const sanitized = text.trim() || "Write your notes here...";
  const style = chooseStyle(settings.styleId);
  const seed = hashString(`${sanitized}::${JSON.stringify(settings)}`);
  const rng = mulberry32(seed);
  const pages: HTMLCanvasElement[] = [];
  const { width: pageWidth, height: pageHeight } = getPageDimensions(settings);

  const scratch = makeCanvas(settings);
  const scratchCtx = scratch.getContext("2d");
  if (!scratchCtx) {
    throw new Error("Canvas is not supported in this browser.");
  }
  setupContext(scratchCtx, settings);

  const usableWidth = pageWidth - settings.leftMargin - settings.rightMargin;
  const lineHeight = settings.fontSize * settings.lineSpacing;
  const lines = splitIntoLines(scratchCtx, sanitized, style, settings, usableWidth);

  let page = makeCanvas(settings);
  let ctx = page.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context could not be created.");
  }

  setupContext(ctx, settings);
  drawPaper(ctx, settings, rng);
  let y = settings.topMargin + settings.fontSize;

  const pushPage = () => {
    applyPageTilt(page, settings, rng);
    pages.push(page);
    page = makeCanvas(settings);
    const nextCtx = page.getContext("2d");
    if (!nextCtx) {
      throw new Error("Canvas context could not be created.");
    }
    ctx = nextCtx;
    setupContext(ctx, settings);
    drawPaper(ctx, settings, rng);
    y = settings.topMargin + settings.fontSize;
  };

  lines.forEach((line, index) => {
    const isBlank = line === "";
    const indent = settings.assignmentMode && !isBlank && (index === 0 || lines[index - 1] === "") ? 48 : 0;
    const baseline = y + (isBlank ? lineHeight * 0.35 : 0);

    if (baseline > pageHeight - settings.bottomMargin) {
      pushPage();
    }

    if (!isBlank) {
      drawLine(ctx!, line, settings.leftMargin + indent, y, style, settings, rng);
    }

    y += isBlank ? lineHeight * 0.78 : lineHeight;
  });

  applyPageTilt(page, settings, rng);
  pages.push(page);

  return {
    pages,
    pageWidth,
    pageHeight,
  };
}

function applyPageTilt(page: HTMLCanvasElement, settings: RenderSettings, rng: () => number) {
  if (settings.pageTilt <= 0) {
    return;
  }

  const pixelRatio = getPixelRatio(settings);
  const angle = ((rng() - 0.5) * settings.pageTilt * Math.PI) / 180;
  const copy = document.createElement("canvas");
  copy.width = page.width;
  copy.height = page.height;
  const copyCtx = copy.getContext("2d");
  const ctx = page.getContext("2d");

  if (!copyCtx || !ctx) {
    return;
  }

  copyCtx.drawImage(page, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, page.width, page.height);
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, page.width, page.height);
  ctx.translate(page.width / 2, page.height / 2);
  ctx.rotate(angle);
  ctx.drawImage(copy, -page.width / 2, -page.height / 2);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}
