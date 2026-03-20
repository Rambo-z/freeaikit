import type { Metadata } from "next";
import SortLinesClient from "./SortLinesClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Sort Text Lines Online Free - Alphabetical, Numeric, Length | FreeAIKit",
  description: "Sort text lines online for free. Alphabetical, reverse, numeric, by length, or random shuffle. Remove duplicates and empty lines. Browser-based.",
  keywords: ["sort lines", "sort text", "sort lines online", "alphabetical sort", "sort text lines", "line sorter", "text sorter", "sort lines alphabetically"],
  openGraph: {
    title: "Sort Text Lines Online Free",
    description: "Sort text lines alphabetically, numerically, by length, or randomly. Remove duplicates.",
    url: "https://freeaikit.app/sort-lines",
  },
  alternates: { canonical: "https://freeaikit.app/sort-lines" },
};

export default function SortLinesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Sort Text Lines" description="Sort text lines alphabetically, numerically, by length, or randomly. Free online tool." slug="sort-lines" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Sort Text Lines Online</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Sort lines alphabetically, numerically, by length, or shuffle randomly. Optionally remove duplicates and empty lines.</p>
      </div>
      <SortLinesClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "What sort orders are available?", a: "Alphabetical (A-Z and Z-A), numeric (ascending and descending), by line length (shortest/longest first), and random shuffle." },
          { q: "Can I remove duplicates while sorting?", a: "Yes. Check 'Remove duplicates' to keep only unique lines in the sorted output." },
          { q: "Is the sort case-sensitive?", a: "By default no. Check 'Case sensitive' to make uppercase letters sort before lowercase." },
          { q: "How does numeric sort work?", a: "Lines are sorted by the first number found in each line. Lines without numbers are treated as zero." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="sort-lines" />
    </div>
  );
}
