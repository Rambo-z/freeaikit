import type { Metadata } from "next";
import BaseConverterClient from "./BaseConverterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Number Base Converter - Free Online | FreeAIKit",
  description:
    "Convert numbers between binary, octal, decimal, and hexadecimal. Supports large numbers and real-time conversion. Free, instant, runs in your browser.",
  keywords: ["number base converter", "binary converter", "hex converter", "decimal to binary", "binary to decimal", "octal converter", "hex to decimal", "base converter"],
  openGraph: {
    title: "Number Base Converter - Free Online",
    description: "Convert between binary, octal, decimal, and hex instantly. Free and private.",
    url: "https://freeaikit.app/base-converter",
  },
};

export default function BaseConverterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Number Base Converter" description="Convert numbers between binary, octal, decimal, and hexadecimal. Supports large numbers and real-time conversion. Free, instant, runs in your browser." slug="base-converter" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Number Base Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert numbers between binary (base 2), octal (base 8),
          decimal (base 10), and hexadecimal (base 16). Real-time, free.
        </p>
      </div>
      <BaseConverterClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What are number bases?",
            a: "A number base (or radix) defines how many unique digits are used. Decimal uses 0-9 (base 10), binary uses 0-1 (base 2), octal uses 0-7 (base 8), and hexadecimal uses 0-9 and A-F (base 16).",
          },
          {
            q: "Why do programmers use hexadecimal?",
            a: "Hexadecimal is compact: one hex digit represents exactly 4 binary digits. This makes it easy to read memory addresses, color codes (#FF0000), and byte values. It's far more readable than long binary strings.",
          },
          {
            q: "What is the 0x prefix?",
            a: "0x is a common prefix to indicate a hexadecimal number (e.g., 0xFF = 255). Similarly, 0b indicates binary (0b1010 = 10) and 0o indicates octal (0o17 = 15). This tool accepts numbers with or without prefixes.",
          },
          {
            q: "Does this support large numbers?",
            a: "Yes. This tool uses BigInt for arbitrary-precision arithmetic, so you can convert numbers of any size without losing precision.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="base-converter" />
    </div>
  );
}
