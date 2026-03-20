import type { Metadata } from "next";
import LoremIpsumClient from "./LoremIpsumClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Free Dummy Text Generator | FreeAIKit",
  description: "Generate lorem ipsum placeholder text for free. Choose paragraphs, sentences, or words. Copy with one click. No signup required.",
  keywords: ["lorem ipsum generator", "lorem ipsum", "dummy text generator", "placeholder text", "filler text", "lipsum generator", "lorem ipsum copy paste"],
  openGraph: {
    title: "Lorem Ipsum Generator - Free Dummy Text",
    description: "Generate lorem ipsum placeholder text instantly. Choose paragraphs, sentences, or words.",
    url: "https://freeaikit.app/lorem-ipsum",
  },
  alternates: { canonical: "https://freeaikit.app/lorem-ipsum" },
};

export default function LoremIpsumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Lorem Ipsum Generator" description="Generate lorem ipsum placeholder text for free. Choose paragraphs, sentences, or words." slug="lorem-ipsum" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Lorem Ipsum Generator</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Generate placeholder text instantly. Choose paragraphs, sentences, or word count. Copy with one click.</p>
      </div>
      <LoremIpsumClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is standard placeholder text used in design and publishing since the 1500s. It provides a natural-looking text distribution without distracting from the layout." },
          { q: "How do I use generated text?", a: "Click Generate, then Copy. Paste the text into your design mockup, website template, or document wherever placeholder content is needed." },
          { q: "Can I customize the amount of text?", a: "Yes. Choose between paragraphs, sentences, or words, and set the exact count you need (1 to 100)." },
          { q: "Is this really free?", a: "Yes, completely free with no limits. No signup, no ads. Generate as much lorem ipsum text as you need." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="lorem-ipsum" />
    </div>
  );
}
