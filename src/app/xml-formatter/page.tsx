import type { Metadata } from "next";
import XmlFormatterClient from "./XmlFormatterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "XML Formatter & Beautifier - Free Online | FreeAIKit",
  description:
    "Format, beautify, and minify XML online. Validate XML syntax and fix indentation. Free, instant, runs in your browser.",
  keywords: ["xml formatter", "xml beautifier", "xml minifier", "format xml", "xml validator", "xml pretty print", "xml online", "xml indent"],
  openGraph: {
    title: "XML Formatter & Beautifier - Free Online",
    description: "Format, beautify, and minify XML instantly. Free and private — runs in your browser.",
    url: "https://freeaikit.app/xml-formatter",
  },
};

export default function XmlFormatterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="XML Formatter & Beautifier" description="Format, beautify, and minify XML online. Validate XML syntax and fix indentation. Free, instant, runs in your browser." slug="xml-formatter" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          XML Formatter & Beautifier
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Format, beautify, or minify XML. Validate syntax and fix indentation.
          Free, instant, runs entirely in your browser.
        </p>
      </div>
      <XmlFormatterClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is XML formatting?",
            a: "XML formatting (pretty-printing) adds proper indentation and line breaks to XML documents, making them easier to read and debug. Each nested element is indented one level deeper than its parent.",
          },
          {
            q: "What does XML minification do?",
            a: "Minification removes all unnecessary whitespace, line breaks, and indentation from XML. This reduces file size for faster transmission over networks while keeping the data identical.",
          },
          {
            q: "Does this tool validate XML?",
            a: "Yes. The tool uses the browser's built-in DOMParser to parse XML. If the XML is malformed (unclosed tags, invalid characters, etc.), it will show the parsing error with details.",
          },
          {
            q: "What about XML declarations and CDATA?",
            a: "The tool preserves XML declarations (<?xml ...?>), CDATA sections, comments, and processing instructions during formatting.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="xml-formatter" />
    </div>
  );
}
