import type { Metadata } from "next";
import ColorConverterClient from "./ColorConverterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Color Converter - HEX RGB HSL CMYK Color Code Converter",
  description:
    "Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Free online color converter with color picker. No signup required.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hsl converter",
    "cmyk converter",
    "color code converter",
  ],
  openGraph: {
    title: "Color Converter - HEX RGB HSL CMYK Color Code Converter",
    description:
      "Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Free online color converter with color picker.",
    url: "https://freeaikit.app/color-converter",
  },
};

export default function ColorConverterPage() {
  return (
    <>
      <ToolJsonLd name="Color Converter" description="Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Free online color converter with color picker. No signup required." slug="color-converter" />
      <ColorConverterClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="color-converter" />
      </div>
    </>
  );
}
