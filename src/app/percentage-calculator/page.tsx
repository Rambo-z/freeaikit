import type { Metadata } from "next";
import PercentageCalculatorClient from "./PercentageCalculatorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Percentage Calculator - Free Online | FreeAIKit",
  description: "Calculate percentages instantly. What is X% of Y? Percentage change, increase, decrease. Free online percentage calculator with multiple modes.",
  keywords: ["percentage calculator", "percent calculator", "calculate percentage", "percentage change", "percentage increase", "percentage decrease", "what is percent of"],
  openGraph: {
    title: "Percentage Calculator - Free Online",
    description: "Calculate percentages instantly. Multiple modes: X% of Y, percentage change, increase/decrease.",
    url: "https://freeaikit.app/percentage-calculator",
  },
  alternates: { canonical: "https://freeaikit.app/percentage-calculator" },
};

export default function PercentageCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Percentage Calculator" description="Calculate percentages instantly. What is X% of Y? Percentage change, increase, decrease." slug="percentage-calculator" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Percentage Calculator</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Calculate percentages instantly. Four calculation modes for every percentage question.</p>
      </div>
      <PercentageCalculatorClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "How do I calculate a percentage?", a: "Use the first calculator: enter the percentage and the number. For example, 15% of 200 = 30." },
          { q: "How do I find percentage change?", a: "Use the Percentage Change calculator. Enter the original and new values. The tool calculates the % increase or decrease." },
          { q: "What is the percentage formula?", a: "Percentage = (Part / Whole) × 100. For example, 25 is 12.5% of 200 because (25/200) × 100 = 12.5%." },
          { q: "Is this calculator accurate?", a: "Yes. All calculations use standard floating-point math with up to 6 decimal places of precision." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="percentage-calculator" />
    </div>
  );
}
