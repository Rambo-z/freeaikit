import type { Metadata } from "next";
import TextCaseClient from "../text-case/TextCaseClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Case Converter Online - Change Text Case Free | FreeAIKit",
  description:
    "Convert text case online for free. UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more. Instant, no signup.",
  keywords: [
    "case converter",
    "case converter online",
    "convert case",
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "change text case online",
  ],
  openGraph: {
    title: "Case Converter Online - Change Text Case Free",
    description:
      "Convert text case online for free. UPPERCASE, lowercase, Title Case, and more.",
    url: "https://freeaikit.app/case-converter",
  },
  alternates: {
    canonical: "https://freeaikit.app/case-converter",
  },
};

export default function CaseConverterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Case Converter Online"
        description="Convert text case online for free. UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more."
        slug="case-converter"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Case Converter Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Instantly convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.
          Free, no signup required.
        </p>
      </div>
      <TextCaseClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "What case formats are supported?", a: "UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and more." },
            { q: "Can I paste formatted text?", a: "Yes. Paste any text and instantly see it converted to your chosen case format." },
            { q: "Is there a character limit?", a: "No practical limit. The tool processes text instantly in your browser." },
            { q: "Can I use this for code variable naming?", a: "Absolutely! Use camelCase, snake_case, PascalCase, or kebab-case conversions for code variable naming conventions." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="text-case" />
    </div>
  );
}
