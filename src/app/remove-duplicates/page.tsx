import type { Metadata } from "next";
import RemoveDuplicatesClient from "./RemoveDuplicatesClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines - Free Online Text Tool | FreeAIKit",
  description: "Remove duplicate lines from text online for free. Case-sensitive or insensitive, trim whitespace, remove empty lines. No signup required.",
  keywords: ["remove duplicate lines", "remove duplicates", "deduplicate text", "unique lines", "remove duplicate lines online", "delete duplicate lines", "text deduplication"],
  openGraph: {
    title: "Remove Duplicate Lines - Free Online",
    description: "Remove duplicate lines from text instantly. Case-sensitive, trim, and empty line options.",
    url: "https://freeaikit.app/remove-duplicates",
  },
  alternates: { canonical: "https://freeaikit.app/remove-duplicates" },
};

export default function RemoveDuplicatesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Remove Duplicate Lines" description="Remove duplicate lines from text online for free. Case-sensitive or insensitive." slug="remove-duplicates" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Remove Duplicate Lines</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Paste your text and instantly remove duplicate lines. Options for case sensitivity, trimming, and empty line removal.</p>
      </div>
      <RemoveDuplicatesClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "How does duplicate detection work?", a: "Each line is compared against all previous lines. The first occurrence is kept; subsequent duplicates are removed." },
          { q: "Is the comparison case-sensitive?", a: "By default yes. Uncheck 'Case sensitive' to treat 'Hello' and 'hello' as the same line." },
          { q: "Can I also remove empty lines?", a: "Yes. Check 'Remove empty lines' to strip all blank lines from the output." },
          { q: "Is there a line limit?", a: "No hard limit. The tool runs in your browser, so performance depends on your device. Thousands of lines process instantly." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="remove-duplicates" />
    </div>
  );
}
