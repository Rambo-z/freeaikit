import type { Metadata } from "next";
import CsvToJsonClient from "./CsvToJsonClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "CSV to JSON Converter - Free Online | FreeAIKit",
  description:
    "Convert CSV to JSON and JSON to CSV online. Supports custom delimiters, headers, and nested data. Free, instant, runs in your browser.",
  keywords: ["csv to json", "json to csv", "csv converter", "csv parser online", "convert csv", "csv to json online", "json converter"],
  openGraph: {
    title: "CSV to JSON Converter - Free Online",
    description: "Convert between CSV and JSON instantly. Free and private — runs in your browser.",
    url: "https://freeaikit.app/csv-to-json",
  },
};

export default function CsvToJsonPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="CSV to JSON Converter" description="Convert CSV to JSON and JSON to CSV online. Supports custom delimiters, headers, and nested data. Free, instant, runs in your browser." slug="csv-to-json" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          CSV to JSON Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert CSV to JSON arrays or objects, and JSON back to CSV.
          Custom delimiters supported. Free, instant, in-browser.
        </p>
      </div>
      <CsvToJsonClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "How does CSV to JSON conversion work?",
            a: "The first row is treated as column headers. Each subsequent row becomes a JSON object where keys are the header names and values are the cell contents.",
          },
          {
            q: "What delimiters are supported?",
            a: "Comma (,), semicolon (;), tab, and pipe (|). The tool auto-detects the delimiter or you can choose one manually.",
          },
          {
            q: "Does it handle quoted fields?",
            a: "Yes. Fields wrapped in double quotes can contain commas, newlines, and escaped quotes (\"\"). This follows the RFC 4180 CSV standard.",
          },
          {
            q: "Can I convert JSON back to CSV?",
            a: "Yes! Switch to the JSON → CSV tab, paste a JSON array of objects, and get a properly formatted CSV with headers derived from object keys.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="csv-to-json" />
    </div>
  );
}
