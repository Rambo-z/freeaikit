import type { Metadata } from "next";
import CssMinifierClient from "./CssMinifierClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "CSS Minifier & Beautifier - Free Online | FreeAIKit",
  description:
    "Minify CSS to reduce file size or beautify minified CSS to make it readable. Shows size reduction stats. Free, instant, runs in your browser — no upload.",
  keywords: ["css minifier", "css compressor", "minify css online", "css beautifier", "css formatter", "css optimizer", "compress css"],
  openGraph: {
    title: "CSS Minifier & Beautifier - Free Online",
    description: "Minify or beautify CSS instantly. See size savings. Free and private.",
    url: "https://freeaikit.app/css-minifier",
  },
};

export default function CssMinifierPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="CSS Minifier & Beautifier" description="Minify CSS to reduce file size or beautify minified CSS to make it readable. Shows size reduction stats. Free, instant, runs in your browser — no upload." slug="css-minifier" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          CSS Minifier & Beautifier
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Minify CSS to shrink file size for production, or beautify minified
          CSS to make it human-readable. Runs entirely in your browser.
        </p>
      </div>
      <CssMinifierClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What does CSS minification do?",
            a: "CSS minification removes comments, whitespace, newlines, and redundant semicolons — anything that's not needed for the browser to parse the stylesheet. This reduces file size and improves page load speed.",
          },
          {
            q: "How much can CSS be minified?",
            a: "Typically 20–40% for well-written stylesheets. CSS with lots of comments, blank lines, or developer-friendly formatting can achieve 50%+ reduction.",
          },
          {
            q: "What is CSS beautification?",
            a: "Beautification (or pretty-printing) takes minified CSS and adds proper indentation, newlines, and spacing to make it easy to read and edit.",
          },
          {
            q: "Does minification change how CSS works?",
            a: "No. Minification only removes whitespace and comments that are invisible to the browser's CSS parser. The computed styles remain identical.",
          },
          {
            q: "Is my CSS data safe?",
            a: "Yes. All processing runs in your browser using JavaScript. Your CSS never leaves your device and is never sent to any server.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="css-minifier" />
    </div>
  );
}
