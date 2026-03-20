import type { Metadata } from "next";
import TextDiffClient from "../text-diff/TextDiffClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Text Compare - Compare Two Texts Online Free | FreeAIKit",
  description: "Compare two texts online for free. Find differences instantly with color-coded highlighting. No upload, browser-based.",
  keywords: [
    "text compare",
    "compare text",
    "compare two texts",
    "text comparison",
    "compare text online",
    "text compare tool",
    "find text differences",
  ],
  openGraph: {
    title: "Text Compare - Compare Two Texts Online Free",
    description: "Compare two texts online for free. Find differences instantly with color-coded highlighting. No upload, browser-based.",
    url: "https://freeaikit.app/text-compare",
  },
  alternates: {
    canonical: "https://freeaikit.app/text-compare",
  },
};

export default function TextComparePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Compare Text Online"
        description="Compare two texts online for free. Find differences instantly with color-coded highlighting. No upload, browser-based."
        slug="text-compare"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Compare Text Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Compare two texts side by side and find every difference. Color-coded additions and removals.
        </p>
      </div>

      <TextDiffClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I compare two texts?", a: "Paste the original text on the left and the modified text on the right. Differences are highlighted instantly." },
          { q: "What do the colors mean?", a: "Green highlights show added lines. Red highlights show removed lines. White lines are unchanged." },
          { q: "Can I compare code?", a: "Yes. The compare tool works with any text including source code, HTML, CSS, JSON, and more." },
          { q: "Is there a character limit?", a: "No hard limit. The tool runs in your browser, handling thousands of lines instantly." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="text-diff" />
    </div>
  );
}
