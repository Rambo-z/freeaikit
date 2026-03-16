import type { Metadata } from "next";
import ColorPaletteClient from "./ColorPaletteClient";

export const metadata: Metadata = {
  title: "Color Palette Extractor - Extract Colors from Image Free | FreeAIKit",
  description:
    "Extract dominant color palettes from any image instantly. Get hex codes and RGB values. Copy as CSS variables. Free, no upload to server.",
  keywords: ["color palette extractor", "extract colors from image", "color picker from image", "dominant color", "image color palette", "hex color extractor", "free color palette"],
  openGraph: {
    title: "Color Palette Extractor - Free Online",
    description: "Extract dominant colors from any image. Get hex codes, copy as CSS variables.",
    url: "https://freeaikit.app/color-palette",
  },
};

export default function ColorPalettePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Color Palette Extractor</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Upload any image and instantly extract its dominant color palette.
          Get hex codes, RGB values, and export as CSS variables. Free, runs in your browser.
        </p>
      </div>
      <ColorPaletteClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "How does color extraction work?", a: "The image is analyzed pixel-by-pixel in your browser. Colors are grouped into buckets and the most dominant ones are selected, with diversity filtering to avoid returning near-identical shades." },
          { q: "Can I copy the colors?", a: "Yes — click any color swatch to copy its hex code. Use the 'Copy CSS Variables' button to copy the entire palette as ready-to-use CSS custom properties." },
          { q: "What image formats are supported?", a: "PNG, JPG, WebP, GIF, and any other format your browser supports." },
          { q: "Is the image uploaded to a server?", a: "No. Everything runs locally in your browser. Your image never leaves your device." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
