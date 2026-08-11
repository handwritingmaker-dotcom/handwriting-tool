"use client";

import { useRef, useState } from "react";
import { extractTextFromPdf, PdfExtractionError } from "@/lib/pdf-extraction";

const maxPdfSize = 15 * 1024 * 1024;

type ImportedFile = { name: string; size: number };

export function PdfTextImporter({ onTextExtracted }: { onTextExtracted: (text: string) => void }) {
  const [file, setFile] = useState<ImportedFile | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const importPdf = async (selectedFile: File | undefined) => {
    setError("");
    if (!selectedFile) return;
    const hasPdfExtension = selectedFile.name.toLowerCase().endsWith(".pdf");
    const hasPdfMime = selectedFile.type === "application/pdf";
    if (!hasPdfExtension || (selectedFile.type !== "" && !hasPdfMime)) {
      setError("Please upload a valid PDF file.");
      return;
    }
    if (selectedFile.size > maxPdfSize) {
      setError("PDF must be 15 MB or smaller.");
      return;
    }

    setFile({ name: selectedFile.name, size: selectedFile.size });
    setIsExtracting(true);
    setStatus("Reading PDF…");
    try {
      const text = await extractTextFromPdf(selectedFile, ({ currentPage, totalPages }) => {
        setStatus(`Extracting page ${currentPage} of ${totalPages}…`);
      });
      onTextExtracted(text);
      setStatus("Text extracted. You can edit it below.");
    } catch (caughtError) {
      setStatus("");
      if (caughtError instanceof PdfExtractionError && caughtError.code === "password") {
        setError("This PDF is password-protected and cannot be read yet.");
      } else if (caughtError instanceof PdfExtractionError && caughtError.code === "empty") {
        setError("No selectable text was found in this PDF. It may be a scanned document. OCR support will be added separately.");
      } else {
        setError("We couldn't read this PDF. Try another text-based PDF.");
      }
    } finally {
      setIsExtracting(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 p-4" aria-labelledby="pdf-upload-heading">
      <h3 id="pdf-upload-heading" className="text-lg font-semibold text-slate-950">Upload PDF</h3>
      <p className="mt-1 text-sm leading-6 text-slate-700">
        Upload a text-based PDF to extract its text and convert it into handwriting.
      </p>
      <div
        className={`mt-4 rounded-xl border-2 border-dashed p-5 text-center transition ${isDragging ? "border-brand-blue bg-white" : "border-blue-200 bg-white/70"}`}
        onDragEnter={(event) => { event.preventDefault(); if (!isExtracting) setIsDragging(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (!isExtracting) void importPdf(event.dataTransfer.files[0]);
        }}
      >
        <input
          ref={inputRef}
          id="pdfImport"
          type="file"
          accept="application/pdf"
          disabled={isExtracting}
          className="sr-only"
          onChange={(event) => {
            void importPdf(event.target.files?.[0]);
            event.currentTarget.value = "";
          }}
        />
        <label
          htmlFor="pdfImport"
          className={`inline-flex min-h-11 items-center rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white ${isExtracting ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-blue-700"}`}
        >
          {isExtracting ? "Reading PDF…" : file ? "Replace PDF" : "Choose PDF"}
        </label>
        <p className="mt-2 text-xs text-slate-500">or drag and drop one PDF here · maximum 15 MB</p>
      </div>

      {file && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm">
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-950">{file.name}</p>
            <p className="mt-1 text-xs text-slate-500">{formatFileSize(file.size)}</p>
          </div>
          <button type="button" disabled={isExtracting} onClick={removeFile} className="font-semibold text-slate-600 hover:text-slate-950 disabled:opacity-50">
            Remove
          </button>
        </div>
      )}
      {status && <p className="mt-3 text-sm font-semibold text-brand-blue" role="status" aria-live="polite">{status}</p>}
      {error && <p className="mt-3 text-sm font-semibold leading-6 text-rose-700" role="alert">{error}</p>}
      <p className="mt-3 text-xs leading-5 text-slate-600">Your PDF is processed in your browser and is not uploaded to our server.</p>
    </section>
  );
}

function formatFileSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
