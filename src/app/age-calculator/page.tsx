import type { Metadata } from "next";
import AgeCalculatorClient from "./AgeCalculatorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age Free Online | FreeAIKit",
  description: "Calculate your exact age in years, months, days, hours. Find days until next birthday. Free online age calculator. No signup required.",
  keywords: ["age calculator", "calculate age", "how old am i", "age in days", "birthday calculator", "date of birth calculator", "exact age calculator"],
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age",
    description: "Calculate your exact age in years, months, days, and hours. Find days until your next birthday.",
    url: "https://freeaikit.app/age-calculator",
  },
  alternates: { canonical: "https://freeaikit.app/age-calculator" },
};

export default function AgeCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Age Calculator" description="Calculate your exact age in years, months, days, hours. Find days until next birthday." slug="age-calculator" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Age Calculator</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Calculate your exact age in years, months, and days. See total weeks, hours, and days until your next birthday.</p>
      </div>
      <AgeCalculatorClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "How accurate is this age calculator?", a: "It calculates exact age down to the day, accounting for varying month lengths and leap years." },
          { q: "Can I calculate age at a specific date?", a: "Yes. Change the 'Age at Date' field to any date to see how old you were (or will be) on that day." },
          { q: "How are months with different lengths handled?", a: "The calculator uses calendar-accurate logic. If you were born on Jan 31 and it's Feb 28, it correctly counts one full month." },
          { q: "Is my date of birth stored?", a: "No. Everything runs in your browser. No data is sent to any server." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="age-calculator" />
    </div>
  );
}
