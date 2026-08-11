export type PdfExtractionProgress = {
  currentPage: number;
  totalPages: number;
};

export class PdfExtractionError extends Error {
  constructor(public readonly code: "password" | "empty" | "parse") {
    super(code);
    this.name = "PdfExtractionError";
  }
}

type PdfTextItem = {
  str: string;
  hasEOL?: boolean;
  transform: number[];
};

function isPdfTextItem(item: unknown): item is PdfTextItem {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Partial<PdfTextItem>;
  return typeof candidate.str === "string" && Array.isArray(candidate.transform);
}

function extractReadablePageText(items: unknown[]) {
  const lines: string[] = [];
  let lineParts: string[] = [];
  let lineY: number | null = null;

  const flushLine = () => {
    const line = lineParts.join(" ").replace(/[\t ]+/g, " ").trim();
    if (line) lines.push(line);
    lineParts = [];
  };

  for (const item of items) {
    if (!isPdfTextItem(item) || !item.str.trim()) continue;
    const itemY = item.transform[5];
    if (lineY !== null && Number.isFinite(itemY) && Math.abs(itemY - lineY) > 2) flushLine();
    lineY = Number.isFinite(itemY) ? itemY : lineY;
    lineParts.push(item.str.trim());
    if (item.hasEOL) {
      flushLine();
      lineY = null;
    }
  }
  flushLine();
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export async function extractTextFromPdf(
  file: File,
  onProgress?: (progress: PdfExtractionProgress) => void,
) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({ data });
  let pdfDocument: Awaited<typeof loadingTask.promise> | null = null;

  try {
    pdfDocument = await loadingTask.promise;
    const pages: string[] = [];

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      onProgress?.({ currentPage: pageNumber, totalPages: pdfDocument.numPages });
      const page = await pdfDocument.getPage(pageNumber);
      try {
        const content = await page.getTextContent();
        pages.push(extractReadablePageText(content.items));
      } finally {
        page.cleanup();
      }
    }

    const text = pages.filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
    if (text.replace(/\s/g, "").length < 3) throw new PdfExtractionError("empty");
    return text;
  } catch (error) {
    if (error instanceof PdfExtractionError) throw error;
    const errorName = error instanceof Error ? error.name : "";
    const errorMessage = error instanceof Error ? error.message.toLowerCase() : "";
    if (errorName === "PasswordException" || errorMessage.includes("password")) {
      throw new PdfExtractionError("password");
    }
    throw new PdfExtractionError("parse");
  } finally {
    await loadingTask.destroy();
  }
}
