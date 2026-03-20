import type { Metadata } from "next";
import RandomNumberClient from "./RandomNumberClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Random Number Generator - Free Online | FreeAIKit",
  description: "Generate random numbers online for free. Set min/max range, generate multiple numbers, allow or prevent duplicates. No signup required.",
  keywords: ["random number generator", "random number", "rng", "random number picker", "number generator", "random integer generator", "random number between"],
  openGraph: {
    title: "Random Number Generator - Free Online",
    description: "Generate random numbers with custom range. Multiple numbers, unique or with duplicates.",
    url: "https://freeaikit.app/random-number",
  },
  alternates: { canonical: "https://freeaikit.app/random-number" },
};

export default function RandomNumberPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Random Number Generator" description="Generate random numbers online for free. Set min/max range, generate multiple numbers." slug="random-number" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Random Number Generator</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Generate random numbers in any range. Get single or multiple numbers. Allow or prevent duplicates.</p>
      </div>
      <RandomNumberClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "Are the numbers truly random?", a: "They use Math.random() which provides pseudorandom numbers suitable for most purposes. Not recommended for cryptographic use." },
          { q: "Can I generate numbers without duplicates?", a: "Yes. Uncheck 'Allow duplicates' to get unique numbers only. The quantity cannot exceed the range size." },
          { q: "What is the maximum range?", a: "You can set any integer range. For very large ranges, generation is still instant since it runs in your browser." },
          { q: "Can I generate multiple numbers at once?", a: "Yes. Set the quantity to generate up to 1,000 numbers in a single batch." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="random-number" />
    </div>
  );
}
