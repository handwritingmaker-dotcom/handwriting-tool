export const newTools = [
  { slug: "cursive-text-generator", name: "Cursive Text Generator", category: "Handwriting Tools", description: "Create, style, and export cursive text as PNG, JPG, or PDF." },
  { slug: "signature-generator", name: "Signature Generator", category: "Handwriting Tools", description: "Type or draw a high-resolution signature and export it privately." },
  { slug: "sentence-scramble-generator", name: "Sentence Scramble Generator", category: "Educational Tools", description: "Make randomized sentence-order worksheets with answer keys." },
  { slug: "word-search-maker", name: "Free Word Search Maker", category: "Educational Tools", description: "Generate validated word-search puzzles and highlighted answer keys." },
  { slug: "word-scramble-generator", name: "Word Scramble Generator", category: "Educational Tools", description: "Create letter-scramble worksheets with hints and answers." },
  { slug: "assignment-maker", name: "Assignment Maker", category: "Educational Tools", description: "Build formatted assignments with live A4 or Letter previews." },
  { slug: "invitation-maker", name: "Invitation Maker", category: "Creative Tools", description: "Design printable invitations for birthdays, weddings, and more." },
] as const;

export type NewToolSlug = (typeof newTools)[number]["slug"];

export function newTool(slug: NewToolSlug) {
  return newTools.find((tool) => tool.slug === slug)!;
}
