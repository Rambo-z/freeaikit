import type { Metadata } from "next";
import TextDiffClient from "./TextDiffClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Text Diff Checker - Compare Text Online Free | FreeAIKit",
  description: "Compare two texts and find differences online for free. Line-by-line diff with color highlighting. No upload, runs in your browser.",
  keywords: ["text diff", "diff checker", "compare text", "text compare", "find differences", "text diff online", "diff tool", "compare two texts"],
  openGraph: {
    title: "Text Diff Checker - Compare Text Online Free",
    description: "Compare two texts and find differences with color highlighting. Free, browser-based.",
    url: "https://freeaikit.app/text-diff",
  },
  alternates: { canonical: "https://freeaikit.app/text-diff" },
};

export default function TextDiffPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Text Diff Checker" description="Compare two texts and find differences online for free. Line-by-line diff with color highlighting." slug="text-diff" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Text Diff Checker</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Compare two texts side by side. See additions, removals, and unchanged lines with color highlighting.</p>
      </div>
      <TextDiffClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "How does the diff work?", a: "It compares texts line by line using the Longest Common Subsequence algorithm, the same approach used by git diff." },
          { q: "What do the colors mean?", a: "Green (+) = lines added in the modified text. Red (−) = lines removed from the original. White = unchanged lines." },
          { q: "Can I compare code?", a: "Yes. The diff checker works with any text including source code, configuration files, essays, and more." },
          { q: "Is my text stored anywhere?", a: "No. Everything runs in your browser. No data is sent to any server." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="text-diff" />
    </div>
  );
}
