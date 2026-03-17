import type { Metadata } from "next";
import HtmlEncoderClient from "./HtmlEncoderClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "HTML Entity Encoder / Decoder - Free Online | FreeAIKit",
  description:
    "Encode special characters to HTML entities and decode HTML entities back to text. Supports named and numeric entities. Free, instant, in-browser.",
  keywords: ["html entity encoder", "html entity decoder", "html entities", "encode html", "decode html entities", "html special characters", "html escape"],
  openGraph: {
    title: "HTML Entity Encoder / Decoder - Free Online",
    description: "Encode and decode HTML entities instantly. Free and private — runs in your browser.",
    url: "https://freeaikit.app/html-encoder",
  },
};

export default function HtmlEncoderPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="HTML Entity Encoder / Decoder" description="Encode special characters to HTML entities and decode HTML entities back to text. Supports named and numeric entities. Free, instant, in-browser." slug="html-encoder" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          HTML Entity Encoder / Decoder
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Encode special characters to HTML entities or decode HTML entities
          back to readable text. Free, instant, in-browser.
        </p>
      </div>
      <HtmlEncoderClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What are HTML entities?",
            a: 'HTML entities are special codes that represent characters which have meaning in HTML. For example, < becomes &lt;, > becomes &gt;, and & becomes &amp;. This prevents browsers from interpreting them as HTML tags.',
          },
          {
            q: "When should I encode HTML entities?",
            a: "Encode when displaying user-generated content in HTML to prevent XSS attacks, when including special characters in HTML attributes, or when you need to show HTML code as text on a web page.",
          },
          {
            q: "What is the difference between named and numeric entities?",
            a: 'Named entities use a human-readable name (e.g., &amp; for &). Numeric entities use the Unicode code point (e.g., &#38; for &). Named entities are easier to read but not all characters have named versions.',
          },
          {
            q: "Does this tool support all Unicode characters?",
            a: "Yes. Any character outside the basic ASCII range can be encoded as a numeric HTML entity (&#xxxx;). Common characters like <, >, &, \", and \' use their named entity equivalents.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="html-encoder" />
    </div>
  );
}
