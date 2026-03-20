import type { Metadata } from "next";
import AgeCalculatorClient from "../age-calculator/AgeCalculatorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "How Old Am I? - Exact Age Calculator Free Online | FreeAIKit",
  description: "Find out exactly how old you are in years, months, days, and hours. Calculate your exact age from your date of birth. Free online tool.",
  keywords: [
    "how old am i",
    "how old am i today",
    "what is my age",
    "exact age",
    "age from birthday",
    "my age in days",
    "calculate my age",
  ],
  openGraph: {
    title: "How Old Am I? - Exact Age Calculator Free Online",
    description: "Find out exactly how old you are in years, months, days, and hours. Calculate your exact age from your date of birth. Free online tool.",
    url: "https://freeaikit.app/how-old-am-i",
  },
  alternates: {
    canonical: "https://freeaikit.app/how-old-am-i",
  },
};

export default function HowOldAmIPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="How Old Am I?"
        description="Find out exactly how old you are in years, months, days, and hours. Calculate your exact age from your date of birth. Free online tool."
        slug="how-old-am-i"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          How Old Am I?
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Enter your date of birth and find out your exact age in years, months, days, hours, and more.
        </p>
      </div>

      <AgeCalculatorClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I find out my exact age?", a: "Enter your date of birth and the tool instantly calculates your exact age in years, months, and days." },
          { q: "Can I see my age in days?", a: "Yes. The tool shows your age in total years, months, weeks, days, and hours." },
          { q: "When is my next birthday?", a: "The tool shows exactly how many days until your next birthday." },
          { q: "What day of the week was I born?", a: "The tool tells you the day of the week you were born on." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="age-calculator" />
    </div>
  );
}
