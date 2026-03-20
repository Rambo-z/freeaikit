import type { Metadata } from "next";
import TextToBinaryClient from "../text-to-binary/TextToBinaryClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Binary Translator - Translate Binary to Text & Back Free | FreeAIKit",
  description: "Translate binary to text and text to binary online for free. Also supports hex, octal, decimal encoding. Browser-based.",
  keywords: [
    "binary translator",
    "binary to text",
    "text to binary",
    "binary code translator",
    "binary decoder",
    "binary encoder",
    "translate binary",
  ],
  openGraph: {
    title: "Binary Translator - Translate Binary to Text & Back Free",
    description: "Translate binary to text and text to binary online for free. Also supports hex, octal, decimal encoding. Browser-based.",
    url: "https://freeaikit.app/binary-translator",
  },
  alternates: {
    canonical: "https://freeaikit.app/binary-translator",
  },
};

export default function BinaryTranslatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Binary Translator"
        description="Translate binary to text and text to binary online for free. Also supports hex, octal, decimal encoding. Browser-based."
        slug="binary-translator"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Binary Translator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Translate between text and binary code. Also supports hexadecimal, octal, and decimal encoding.
        </p>
      </div>

      <TextToBinaryClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I read binary code?", a: "Paste binary numbers (like 01001000 01101001) and the tool instantly translates them to readable text." },
          { q: "How do I convert text to binary?", a: "Type or paste any text and see the binary representation of each character instantly." },
          { q: "What other formats are supported?", a: "Besides binary (base 2), you can encode/decode in hexadecimal (base 16), octal (base 8), and decimal." },
          { q: "Does it handle emojis?", a: "Yes. The tool uses UTF-8 encoding, supporting all Unicode characters including emoji." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="text-to-binary" />
    </div>
  );
}
