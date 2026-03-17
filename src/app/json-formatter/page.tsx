import type { Metadata } from "next";
import JsonFormatterClient from "./JsonFormatterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Free Online | FreeAIKit",
  description:
    "Format, beautify, minify and validate JSON online. Syntax highlighting, error detection with line hints. Free, instant, no data uploaded.",
  keywords: ["json formatter", "json beautifier", "json minifier", "json validator", "format json online", "pretty print json", "json lint"],
  openGraph: {
    title: "JSON Formatter & Validator - Free Online",
    description: "Format, minify and validate JSON with syntax highlighting. Free and instant.",
    url: "https://freeaikit.app/json-formatter",
  },
};

export default function JsonFormatterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="JSON Formatter & Validator" description="Format, beautify, minify and validate JSON online. Syntax highlighting, error detection with line hints. Free, instant, no data uploaded." slug="json-formatter" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          JSON Formatter & Validator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Paste your JSON to format, beautify, minify or validate it instantly.
          Syntax highlighted output. Runs entirely in your browser.
        </p>
      </div>
      <JsonFormatterClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What does JSON formatting do?",
            a: "JSON formatting (or pretty-printing) adds proper indentation and newlines to make compact or minified JSON human-readable. It doesn't change the data structure.",
          },
          {
            q: "What is JSON minification?",
            a: "Minification removes all unnecessary whitespace and comments from JSON, reducing file size. Minified JSON is ideal for API responses and production configs where bandwidth matters.",
          },
          {
            q: "How does JSON validation work?",
            a: "This tool uses the browser's built-in JSON.parse() to validate your input. If parsing fails, it shows the exact error message including the position of the syntax error.",
          },
          {
            q: "Is my JSON data safe?",
            a: "Yes. All processing happens entirely in your browser using JavaScript. Your JSON never leaves your device and is not sent to any server.",
          },
          {
            q: "What's the maximum JSON size this tool can handle?",
            a: "There's no hard limit — it's bounded only by your browser's memory. In practice, JSON files up to 50 MB format instantly.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="json-formatter" />
    </div>
  );
}
