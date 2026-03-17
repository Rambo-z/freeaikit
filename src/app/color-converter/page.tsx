import type { Metadata } from "next";
import ColorConverterClient from "./ColorConverterClient";

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
  return <ColorConverterClient />;
}
