import type { ToolProfile } from "@/lib/tool-profiles";

export type FunctionalToolProfile = Exclude<ToolProfile, "default" | "word">;

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
  sampleImage: string;
  sampleAlt: string;
  sampleCaption: string;
  benefits: string[];
  howTo: string[];
  settings: Array<{ label: string; value: string }>;
  practicalHeading: string;
  practicalText: string;
  limitations: string;
  privacy: string;
  guideHref: string;
  guideLabel: string;
  homeLinkLabel: string;
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
    sampleImage: "/blog/blog-lined-paper-output.png",
    sampleAlt: "Lined paper handwriting output with blue ink and notebook margin",
    sampleCaption: "Current lined-paper output with blue ink, ruled baselines, and a visible left margin.",
    benefits: ["Notebook-ready ruled layout", "A4 and Letter page sizes", "Current page or complete PDF export"],
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
    privacy: "Handwriting text is rendered in your browser and is not sent to a HandwritingTool application server for conversion or storage. Website analytics, hosting, and security services may still process technical usage data.",
    guideHref: "/blog/text-to-handwriting-on-lined-paper",
    guideLabel: "Read the lined-paper layout guide",
    homeLinkLabel: "Free text to handwriting tool",
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
    sampleImage: "/blog/blog-graph-paper-preview.png",
    sampleAlt: "Graph paper handwriting output with structured black-ink notes",
    sampleCaption: "Current graph-paper preset showing readable text over a printable grid.",
    benefits: ["Structured grid-paper preset", "Spacing controls for readable labels", "PDF, PNG, and JPG export"],
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
    privacy: "The text-to-page rendering happens in your browser. HandwritingTool does not receive the note text for conversion, although normal analytics, hosting, and security telemetry may still apply to the website.",
    guideHref: "/blog/graph-paper-handwriting-generator",
    guideLabel: "Read the graph-paper workflow guide",
    homeLinkLabel: "Convert text to handwriting",
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
    sampleImage: "/blog/blog-notes-generator-preview.png",
    sampleAlt: "Handwritten revision notes on lined notebook paper",
    sampleCaption: "A readable notes preset with a simple header, lined paper, and open spacing.",
    benefits: ["Optional title, subject, and date", "Class and revision-note presets", "Multi-page study-note PDF export"],
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
    limitations: "The notes workspace does not summarize, generate, fact-check, or automatically structure notes, and it does not upload DOCX files. Text-based PDFs can be imported through the separate PDF to handwriting converter.",
    privacy: "The note text is rendered locally in your browser and is not stored by a HandwritingTool application server. Third-party website services may still process technical and usage information as described in the privacy policy.",
    guideHref: "/blog/handwritten-notes-generator",
    guideLabel: "Read the study-notes formatting guide",
    homeLinkLabel: "Text to handwriting converter",
    faqs: [
      { question: "Does this tool summarize notes with AI?", answer: "No. It converts the notes you write or paste; it does not summarize or generate study content." },
      { question: "Can I add a title, subject, and date?", answer: "Yes. The optional note-detail fields insert a simple plain-text header while leaving the main editor available." },
      { question: "Can I upload a Word file or PDF?", answer: "This notes workspace does not accept document uploads. Copy text from Word, or use the separate PDF to handwriting converter for a text-based PDF." },
    ],
  },
  pdf: {
    profile: "pdf",
    path: "/tools/text-to-handwriting-pdf",
    name: "PDF to Handwriting Converter",
    title: "PDF to Handwriting Converter Online Free | HandwritingTool",
    description: "Upload a text-based PDF, extract its text, convert it into realistic handwriting, customize the page and ink, and download the result as a handwritten PDF.",
    eyebrow: "PDF to Handwriting Converter",
    h1: "PDF to Handwriting Converter",
    intro: "Upload a text-based PDF or paste text manually, turn the extracted content into handwritten-style pages, customize the paper and ink, then download PDF, PNG, or JPG output.",
    sampleImage: "/gallery/multi-page-pdf-output.png",
    sampleAlt: "Live text to handwriting PDF generator showing 684 words and seven generated pages",
    sampleCaption: "A real long-document test in the current tool: 684 detected words produced seven preview pages before the PDF was downloaded.",
    benefits: ["Browser-based PDF text extraction", "Free multi-page handwritten PDF download", "A4 and Letter print layouts"],
    howTo: [
      "Upload a text-based PDF, or type and paste text directly into the editor.",
      "Review and edit the extracted text before conversion.",
      "Choose A4 or Letter, paper style, handwriting, ink, spacing, and margins.",
      "Select low, medium, or high PDF quality and set a safe filename.",
      "Review every page and download either the current page or all pages as one PDF.",
    ],
    settings: [
      { label: "Everyday PDF", value: "A4, lined paper, medium quality, all pages" },
      { label: "Print test", value: "Current page, matching paper size, medium quality" },
      { label: "Memory-limited phone", value: "Low quality or shorter text sections" },
    ],
    practicalHeading: "From PDF text to handwritten pages",
    practicalText: "The importer reads selectable text from each PDF page in order, then places the combined plain text in the editor. You can correct line breaks or formatting before creating handwritten pages.",
    limitations: "This batch supports text-based PDFs only. It does not include OCR for scanned pages, password entry, original-layout preservation, DOCX upload, page-number generation, headers and footers, or landscape output.",
    privacy: "The source PDF and extracted text are processed in your browser and are not uploaded to a HandwritingTool application server. The source file is not saved in browser storage; normal website analytics remain separate.",
    guideHref: "/blog/text-to-handwriting-pdf-generator",
    guideLabel: "Read the PDF export and printing guide",
    homeLinkLabel: "Main text to handwriting tool",
    faqs: [
      { question: "Can I convert text to a handwritten PDF?", answer: "Yes. Enter text, preview the rendered pages, choose current or all pages, and select Download PDF." },
      { question: "Can I upload an existing PDF?", answer: "Yes. Upload a text-based PDF to extract its selectable text, edit it, and convert it into handwritten-style pages." },
      { question: "Can it read a scanned PDF?", answer: "Not yet. Scanned or image-only PDFs require OCR, which is not included in this batch." },
      { question: "Which PDF quality should I use?", answer: "Medium is a sensible default. Use low on memory-limited devices and high only when the browser can handle larger canvases." },
      { question: "Can I download all handwritten pages in one PDF?", answer: "Yes. Choose All pages in the export controls to combine every generated handwriting page into one PDF file." },
      { question: "Does the PDF generator support A4 and Letter paper?", answer: "Yes. Select A4 or Letter before export so the generated page matches your intended print size." },
      { question: "Is the PDF to handwriting converter online free?", answer: "Yes. PDF text extraction, handwriting conversion, preview, and export are free to use without an account." },
    ],
  },
};
