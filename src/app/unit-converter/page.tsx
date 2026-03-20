import type { Metadata } from "next";
import UnitConverterClient from "./UnitConverterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Unit Converter - Free Online Unit Conversion Calculator | FreeAIKit",
  description: "Convert units online for free. Length, weight, temperature, volume, area, speed, data. Instant conversion between metric and imperial. No signup.",
  keywords: ["unit converter", "unit conversion", "convert units", "metric converter", "imperial converter", "length converter", "weight converter", "temperature converter", "online unit converter"],
  openGraph: {
    title: "Unit Converter - Free Online Unit Conversion",
    description: "Convert between metric and imperial units. Length, weight, temperature, volume, area, speed, data.",
    url: "https://freeaikit.app/unit-converter",
  },
  alternates: { canonical: "https://freeaikit.app/unit-converter" },
};

export default function UnitConverterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Unit Converter" description="Convert units online for free. Length, weight, temperature, volume, area, speed, data." slug="unit-converter" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Unit Converter</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Convert between units instantly. Length, weight, temperature, volume, area, speed, and data storage.</p>
      </div>
      <UnitConverterClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "What types of units can I convert?", a: "Length (meters, feet, miles), weight (kg, lbs, oz), temperature (°C, °F, K), volume (liters, gallons), area, speed, and data storage." },
          { q: "How accurate are the conversions?", a: "Conversions use precise conversion factors with up to 10 significant digits of precision." },
          { q: "Does it show all units at once?", a: "Yes. Enter a value and see the equivalent in every unit of that category simultaneously." },
          { q: "Is this free?", a: "Yes, completely free. No signup, no ads, no limits. Runs entirely in your browser." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="unit-converter" />
    </div>
  );
}
