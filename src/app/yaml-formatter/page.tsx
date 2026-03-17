import type { Metadata } from "next";
import YamlFormatterClient from "./YamlFormatterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "YAML Formatter & Validator - Free Online | FreeAIKit",
  description:
    "Format, beautify, validate, and convert YAML online. Convert between YAML and JSON instantly. Free, runs in your browser.",
  keywords: ["yaml formatter", "yaml validator", "yaml to json", "json to yaml", "yaml beautifier", "yaml online", "yaml parser", "format yaml"],
  openGraph: {
    title: "YAML Formatter & Validator - Free Online",
    description: "Format, validate, and convert YAML instantly. Free and private — runs in your browser.",
    url: "https://freeaikit.app/yaml-formatter",
  },
};

export default function YamlFormatterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="YAML Formatter & Validator" description="Format, beautify, validate, and convert YAML online. Convert between YAML and JSON instantly. Free, runs in your browser." slug="yaml-formatter" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          YAML Formatter & Validator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Format, beautify, validate YAML and convert between YAML and JSON.
          Free, instant, runs entirely in your browser.
        </p>
      </div>
      <YamlFormatterClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is YAML?",
            a: "YAML (YAML Ain't Markup Language) is a human-readable data serialization format commonly used for configuration files (Docker Compose, Kubernetes, CI/CD pipelines). It uses indentation to represent structure.",
          },
          {
            q: "How does YAML differ from JSON?",
            a: "YAML uses indentation instead of braces, supports comments with #, and is generally more human-readable. JSON is stricter and more widely supported by APIs. Both can represent the same data structures.",
          },
          {
            q: "What does this tool validate?",
            a: "It checks that your YAML is syntactically correct — proper indentation, valid data types, correct use of colons, dashes, and quotes. Any parsing errors are shown with line numbers.",
          },
          {
            q: "Can I convert YAML to JSON and back?",
            a: "Yes! Use the YAML → JSON tab to convert YAML to JSON, or the JSON → YAML tab to convert JSON to YAML. Both conversions preserve data types and nested structures.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="yaml-formatter" />
    </div>
  );
}
