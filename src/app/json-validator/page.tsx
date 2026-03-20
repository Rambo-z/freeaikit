import type { Metadata } from "next";
import JsonFormatterClient from "../json-formatter/JsonFormatterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "JSON Validator - Validate JSON Online Free | FreeAIKit",
  description: "Validate JSON online for free. Check if your JSON is valid with detailed error messages. Syntax highlighting. Browser-based.",
  keywords: [
    "json validator",
    "validate json",
    "json checker",
    "json lint",
    "json validator online",
    "check json",
    "is json valid",
  ],
  openGraph: {
    title: "JSON Validator - Validate JSON Online Free",
    description: "Validate JSON online for free. Check if your JSON is valid with detailed error messages. Syntax highlighting. Browser-based.",
    url: "https://freeaikit.app/json-validator",
  },
  alternates: {
    canonical: "https://freeaikit.app/json-validator",
  },
};

export default function JsonValidatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="JSON Validator"
        description="Validate JSON online for free. Check if your JSON is valid with detailed error messages. Syntax highlighting. Browser-based."
        slug="json-validator"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          JSON Validator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Validate your JSON instantly. Get clear error messages for invalid JSON. Free, browser-based.
        </p>
      </div>

      <JsonFormatterClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I validate JSON?", a: "Paste your JSON and the tool instantly checks if it's valid. Errors are highlighted with line numbers and descriptions." },
          { q: "What errors does it detect?", a: "Missing commas, unmatched brackets, invalid strings, trailing commas, and all other JSON syntax errors." },
          { q: "Can it fix invalid JSON?", a: "The tool identifies errors and shows their location so you can fix them quickly." },
          { q: "Does it format valid JSON?", a: "Yes. Valid JSON is automatically formatted with proper indentation and syntax highlighting." },
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
