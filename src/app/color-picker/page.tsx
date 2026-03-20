import type { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Color Picker - Free Online Color Picker Tool | FreeAIKit",
  description: "Pick colors and get HEX, RGB, HSL, CMYK values. Visual color picker with sliders and preset palette. Copy any format instantly. Free online tool.",
  keywords: ["color picker", "color picker online", "hex color picker", "rgb color picker", "color picker tool", "pick color", "color selector", "html color picker"],
  openGraph: {
    title: "Color Picker - Free Online Color Picker Tool",
    description: "Pick any color and get HEX, RGB, HSL, CMYK values. Copy with one click.",
    url: "https://freeaikit.app/color-picker",
  },
  alternates: { canonical: "https://freeaikit.app/color-picker" },
};

export default function ColorPickerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Color Picker" description="Pick colors and get HEX, RGB, HSL, CMYK values. Visual color picker with sliders." slug="color-picker" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Color Picker</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Pick any color and get its value in HEX, RGB, HSL, and CMYK. Copy any format with one click.</p>
      </div>
      <ColorPickerClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "What color formats are supported?", a: "HEX (#3b82f6), RGB (rgb(59, 130, 246)), HSL (hsl(217, 91%, 60%)), and CMYK. Also generates CSS variable syntax." },
          { q: "Can I enter a HEX code directly?", a: "Yes. Type or paste a HEX color code in the input field and the picker updates to match." },
          { q: "How do I copy a color value?", a: "Click the Copy button next to any format. The value is copied to your clipboard instantly." },
          { q: "Is this tool free?", a: "Yes, completely free. No signup, no ads. Everything runs in your browser." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="color-picker" />
    </div>
  );
}
