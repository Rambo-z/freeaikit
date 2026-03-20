import type { Metadata } from "next";
import TextToBinaryClient from "./TextToBinaryClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Text to Binary Converter - Free Online | FreeAIKit",
  description: "Convert text to binary, hexadecimal, octal, or decimal online for free. Also decode binary back to text. No signup required.",
  keywords: ["text to binary", "binary translator", "text to binary converter", "binary to text", "text to hex", "binary code translator", "ascii to binary"],
  openGraph: {
    title: "Text to Binary Converter - Free Online",
    description: "Convert text to binary, hex, octal, or decimal. Decode back to text instantly.",
    url: "https://freeaikit.app/text-to-binary",
  },
  alternates: { canonical: "https://freeaikit.app/text-to-binary" },
};

export default function TextToBinaryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Text to Binary Converter" description="Convert text to binary, hexadecimal, octal, or decimal. Decode back to text." slug="text-to-binary" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Text to Binary Converter</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Convert text to binary code and back. Supports binary, hexadecimal, octal, and decimal encoding.</p>
      </div>
      <TextToBinaryClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "How does text to binary conversion work?", a: "Each character is converted to its ASCII/UTF-8 byte value, then represented in your chosen format (binary, hex, octal, or decimal)." },
          { q: "Can I convert binary back to text?", a: "Yes. Switch to 'Code → Text' mode, paste binary values separated by spaces, and get the original text instantly." },
          { q: "What encoding formats are supported?", a: "Binary (base 2), Hexadecimal (base 16), Octal (base 8), and Decimal (base 10)." },
          { q: "Does it support Unicode?", a: "Yes. The tool uses UTF-8 encoding, supporting all Unicode characters including emoji and international scripts." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="text-to-binary" />
    </div>
  );
}
