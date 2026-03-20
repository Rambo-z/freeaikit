import type { Metadata } from "next";
import JsonFormatterClient from "../json-formatter/JsonFormatterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "JSON Beautifier - Format & Prettify JSON Free Online | FreeAIKit",
  description: "Beautify and format JSON online for free. Prettify minified JSON with proper indentation and syntax highlighting. Browser-based.",
  keywords: [
    "json beautifier",
    "json beautify",
    "prettify json",
    "json pretty print",
    "format json",
    "json beautifier online",
    "pretty json",
  ],
  openGraph: {
    title: "JSON Beautifier - Format & Prettify JSON Free Online",
    description: "Beautify and format JSON online for free. Prettify minified JSON with proper indentation and syntax highlighting. Browser-based.",
    url: "https://freeaikit.app/json-beautifier",
  },
  alternates: {
    canonical: "https://freeaikit.app/json-beautifier",
  },
};

export default function JsonBeautifierPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="JSON Beautifier"
        description="Beautify and format JSON online for free. Prettify minified JSON with proper indentation and syntax highlighting. Browser-based."
        slug="json-beautifier"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          JSON Beautifier
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Beautify and prettify JSON with proper indentation and syntax highlighting. Free, instant, browser-based.
        </p>
      </div>

      <JsonFormatterClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I beautify JSON?", a: "Paste your minified or messy JSON and it's instantly formatted with proper indentation and syntax highlighting." },
          { q: "Does it validate JSON?", a: "Yes. Invalid JSON is flagged with clear error messages showing exactly where the problem is." },
          { q: "Can I choose indentation?", a: "Yes. Choose between 2-space, 4-space, or tab indentation for the formatted output." },
          { q: "Is my JSON data safe?", a: "Yes. Everything runs in your browser. Your JSON data is never sent to any server." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="json-formatter" />
    </div>
  );
}
