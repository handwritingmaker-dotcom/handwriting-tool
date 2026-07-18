import type { ToolProfile } from "@/lib/tool-profiles";

export type FunctionalToolProfile = Exclude<ToolProfile, "default">;

type ToolFaq = { question: string; answer: string };

export type ToolPageConfig = {
  profile: FunctionalToolProfile;
  path: string;
  name: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  howTo: string[];
  settings: Array<{ label: string; value: string }>;
  practicalHeading: string;
  practicalText: string;
  limitations: string;
  privacy: string;
  guideHref: string;
  guideLabel: string;
  faqs: ToolFaq[];
};

export const toolPageConfigs: Record<FunctionalToolProfile, ToolPageConfig> = {
  lined: {
    profile: "lined",
    path: "/tools/lined-paper-handwriting",
    name: "Lined Paper Handwriting Generator",
    title: "Lined Paper Handwriting Generator | HandwritingTool",
    description: "Create handwriting on lined A4 or Letter paper, adjust notebook spacing and margins, preview every page, and export PDF, PNG, or JPG.",
    eyebrow: "Lined Paper Handwriting Generator",
    h1: "Create handwriting on lined paper",
    intro: "Type or paste your text into a notebook-focused editor with lined A4 paper, readable spacing, and a visible left margin selected by default.",
    howTo: [
      "Enter your notes, letter, worksheet text, or paragraph in the editor.",
      "Choose a readable handwriting style and keep lined paper selected.",
      "Adjust font size, line spacing, word spacing, margins, variation, and ink.",
      "Review every page, then download the current page or all pages as PDF, PNG, or JPG.",
    ],
    settings: [
      { label: "Notebook notes", value: "A4, lined paper, blue ink, medium size, slightly open spacing" },
      { label: "Clean printing", value: "A4 or Letter to match the printer, black ink, medium PDF quality" },
      { label: "Room for annotations", value: "Keep the margin line and use a wider left margin" },
    ],
    practicalHeading: "Printing and export",
    practicalText: "Choose the same page size as your printer and test one page at actual size. PDF keeps multi-page layouts together; PNG is best for a sharp single page, while JPG creates a smaller image.",
    limitations: "The tool renders typed text with preset handwriting styles. It does not copy your own handwriting, understand document formatting, or guarantee perfect alignment for every style. Preview the ruled baseline before export.",
    privacy: "Handwriting text is rendered in your browser and is not sent to a HandwritingTool application server for conversion or storage. Website analytics, advertising, hosting, and security services may still process technical usage data.",
    guideHref: "/blog/text-to-handwriting-on-lined-paper",
    guideLabel: "Read the lined-paper layout guide",
    faqs: [
      { question: "Can I create handwriting on lined paper for free?", answer: "Yes. Enter text, adjust the lined-paper settings, preview the pages, and export without creating an account." },
      { question: "Can I use A4 and Letter paper?", answer: "Yes. Select A4 or Letter in the page-size control before rendering and printing." },
      { question: "Which export is best for printing?", answer: "PDF is usually best for printing and multi-page output. Test one page at actual size first." },
    ],
  },
  graph: {
    profile: "graph",
    path: "/tools/graph-paper-handwriting",
    name: "Graph Paper Handwriting Generator",
    title: "Graph Paper Handwriting Generator | HandwritingTool",
    description: "Create handwritten-style text on printable graph paper for lab records and structured notes, with live preview and PDF, PNG, or JPG export.",
    eyebrow: "Graph Paper Handwriting Generator",
    h1: "Create handwritten-style pages on graph paper",
    intro: "Use a grid-focused editor with graph paper, A4 sizing, black ink, and structured spacing selected by default for lab records and text-based math or science notes.",
    howTo: [
      "Enter plain-text observations, steps, labels, or structured notes.",
      "Keep graph paper selected or adjust the page size and handwriting style.",
      "Tune spacing and margins so the writing remains clear against the grid.",
      "Preview the complete layout and export it as PDF, PNG, or JPG.",
    ],
    settings: [
      { label: "Lab record", value: "Graph paper, black ink, medium text, low variation" },
      { label: "Structured revision", value: "Graph paper, blue or black ink, short sections" },
      { label: "Printing", value: "A4 or Letter to match the printer, medium PDF quality" },
    ],
    practicalHeading: "Math and science note use",
    practicalText: "The grid provides visual structure for labels, observations, short calculations, and lab notes. Add complex equations, charts, and diagrams separately when the page requires them.",
    limitations: "This tool does not solve equations, parse LaTeX, understand mathematical meaning, or draw diagrams. It renders the plain text you provide over a graph-paper background, so verify every symbol in the preview.",
    privacy: "The text-to-page rendering happens in your browser. HandwritingTool does not receive the note text for conversion, although normal analytics, advertising, hosting, and security telemetry may still apply to the website.",
    guideHref: "/blog/graph-paper-handwriting-generator",
    guideLabel: "Read the graph-paper workflow guide",
    faqs: [
      { question: "Can I make printable graph-paper handwriting pages?", answer: "Yes. Select the matching paper size, preview the grid and text, then export a PDF for printing." },
      { question: "Does the tool solve math or render LaTeX?", answer: "No. It renders plain text on a grid and does not provide mathematical intelligence or LaTeX typesetting." },
      { question: "Can I download graph-paper pages as images?", answer: "Yes. PNG and JPG are available alongside PDF export." },
    ],
  },
  notes: {
    profile: "notes",
    path: "/tools/handwritten-notes",
    name: "Handwritten Notes Generator",
    title: "Handwritten Notes Generator for Study | HandwritingTool",
    description: "Turn typed class, revision, or simple notes into readable handwritten-style pages with optional note details, presets, live preview, and PDF export.",
    eyebrow: "Handwritten Notes Generator",
    h1: "Turn typed notes into handwritten-style pages",
    intro: "Prepare class notes, revision points, or simple notes with optional title, subject, and date fields, then render them with the same reliable browser-based handwriting engine.",
    howTo: [
      "Clean and verify the notes before styling them.",
      "Optionally add a title, subject, and date, then apply those details to the editor.",
      "Choose Class Notes, Revision Notes, Simple Notes, or another shared preset.",
      "Preserve paragraph breaks, review each page, and export a PDF or image.",
    ],
    settings: [
      { label: "Class Notes", value: "Lined A4, blue ink, readable style, open spacing" },
      { label: "Revision Notes", value: "Lined A4, black ink, concise sections, low variation" },
      { label: "Simple Notes", value: "Blank A4, blue ink, natural spacing, no margin line" },
    ],
    practicalHeading: "Readable study-note workflow",
    practicalText: "Use short headings, key points, one example, and a recap question. PDF is the practical export for multi-page revision sets; print one test page before producing a large set.",
    limitations: "The tool does not summarize, generate, fact-check, or automatically structure notes. It does not upload PDF or DOCX files. You provide and verify the plain text before conversion.",
    privacy: "The note text is rendered locally in your browser and is not stored by a HandwritingTool application server. Third-party website services may still process technical and usage information as described in the privacy policy.",
    guideHref: "/blog/handwritten-notes-generator",
    guideLabel: "Read the study-notes formatting guide",
    faqs: [
      { question: "Does this tool summarize notes with AI?", answer: "No. It converts the notes you write or paste; it does not summarize or generate study content." },
      { question: "Can I add a title, subject, and date?", answer: "Yes. The optional note-detail fields insert a simple plain-text header while leaving the main editor available." },
      { question: "Can I upload a Word file or PDF?", answer: "No. Copy and clean the relevant text first, then paste it into the editor." },
    ],
  },
  pdf: {
    profile: "pdf",
    path: "/tools/text-to-handwriting-pdf",
    name: "Text to Handwriting PDF Generator",
    title: "Text to Handwriting PDF Generator | HandwritingTool",
    description: "Convert typed text into handwritten-style A4 or Letter pages and download the current page or complete document as a PDF.",
    eyebrow: "Text to Handwriting PDF Generator",
    h1: "Convert typed text into handwritten pages and download a PDF",
    intro: "Paste plain text, choose the page and handwriting settings, preview every generated page, set a filename and PDF quality, then export the current page or the complete document.",
    howTo: [
      "Paste clean plain text into the PDF-focused editor.",
      "Choose A4 or Letter, paper style, handwriting, ink, spacing, and margins.",
      "Select low, medium, or high PDF quality and set a safe filename.",
      "Review every page and download either the current page or all pages as one PDF.",
    ],
    settings: [
      { label: "Everyday PDF", value: "A4, lined paper, medium quality, all pages" },
      { label: "Print test", value: "Current page, matching paper size, medium quality" },
      { label: "Memory-limited phone", value: "Low quality or shorter text sections" },
    ],
    practicalHeading: "PDF versus PDF-to-handwriting",
    practicalText: "This page creates a new handwritten-style PDF from text. It is not a PDF-upload converter. If the source already exists in a PDF, copy or extract its text first and clean the line breaks before pasting.",
    limitations: "There is no PDF or DOCX upload, OCR, original-layout preservation, page-number generator, header/footer system, or landscape orientation. Large high-quality canvas exports can exceed browser memory; split long documents when necessary.",
    privacy: "The typed content is rendered into pages in your browser. It is not uploaded to a HandwritingTool application server for PDF generation or storage, while normal website analytics and advertising telemetry remain separate.",
    guideHref: "/blog/text-to-handwriting-pdf-generator",
    guideLabel: "Read the PDF export and printing guide",
    faqs: [
      { question: "Can I convert text to a handwritten PDF?", answer: "Yes. Enter text, preview the rendered pages, choose current or all pages, and select Download PDF." },
      { question: "Can I upload an existing PDF?", answer: "No. This route creates a PDF from typed or pasted text; it does not ingest an existing PDF." },
      { question: "Which PDF quality should I use?", answer: "Medium is a sensible default. Use low on memory-limited devices and high only when the browser can handle larger canvases." },
    ],
  },
};
