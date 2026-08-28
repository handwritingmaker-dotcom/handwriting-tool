import type { PageSize } from "./handwriting";

export type ExportablePage = {
  pngUrl: string;
  width: number;
  height: number;
};

export const physicalPageDimensions: Record<PageSize, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
};

export function getPhysicalPageDimensions(pageSize: PageSize) {
  return physicalPageDimensions[pageSize] ?? physicalPageDimensions.a4;
}

export function selectExportPages<Page>(pages: Page[], currentPageIndex: number, scope: "all" | "current") {
  return scope === "all" ? pages : pages.slice(currentPageIndex, currentPageIndex + 1);
}

export function getSourceImageDimensions(image: Pick<HTMLImageElement, "naturalWidth" | "naturalHeight">) {
  if (!image.naturalWidth || !image.naturalHeight) {
    throw new Error("The source image has no readable dimensions.");
  }

  return { width: image.naturalWidth, height: image.naturalHeight };
}
