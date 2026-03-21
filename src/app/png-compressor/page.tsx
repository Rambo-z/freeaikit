import type { Metadata } from "next";
import ImageCompressClient from "../image-compress/ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PNG Compressor Free Online - Reduce PNG File Size | FreeAIKit",
  description:
    "Compress PNG files online for free. Reduce PNG size by 60-80% using libimagequant (pngquant-level compression). TinyPNG alternative. No upload.",
  keywords: [
    "png compressor",
    "png compressor online",
    "compress png free",
    "reduce png size",
    "png compressor free",
    "tinypng alternative",
    "png file size reducer",
    "png optimizer",
  ],
  openGraph: {
    title: "PNG Compressor Free Online - Reduce PNG File Size",
    description:
      "Compress PNG files online for free. TinyPNG-level compression using libimagequant.",
    url: "https://freeaikit.app/png-compressor",
  },
  alternates: {
    canonical: "https://freeaikit.app/png-compressor",
  },
};

export default function PngCompressorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="PNG Compressor"
        description="Compress PNG files online for free. Reduce PNG size by 60-80% using libimagequant. TinyPNG alternative."
        slug="png-compressor"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PNG Compressor Free Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Compress PNG files by 60-80% using libimagequant — the same engine behind pngquant and TinyPNG.
          Free, private, browser-based.
        </p>
      </div>
      <ImageCompressClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "How does PNG compression work?", a: "Our tool uses libimagequant to reduce 24-bit PNG images to 8-bit palette (256 colors). This lossy color quantization achieves 60-80% compression while maintaining near-identical visual quality." },
            { q: "Is this the same as TinyPNG?", a: "Yes, we use the same underlying technology (libimagequant/pngquant) as TinyPNG. The compression results are comparable." },
            { q: "Will PNG compression affect transparency?", a: "No. Alpha channel transparency is preserved during compression." },
            { q: "How is this different from PNG optimization?", a: "PNG optimization (like OxiPNG) only achieves 10-30% savings. Our lossy compression via color quantization achieves 60-80% — much more effective." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-compress" />
    </div>
  );
}
