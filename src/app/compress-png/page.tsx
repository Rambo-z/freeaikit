import type { Metadata } from "next";
import ImageCompressClient from "../image-compress/ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Compress PNG Online Free - Reduce PNG File Size | FreeAIKit",
  description: "Compress PNG images online for free. Reduce PNG file size with minimal quality loss. Batch support. No upload, browser-based processing.",
  keywords: [
    "compress png",
    "compress png online",
    "png compressor",
    "reduce png size",
    "png file size reducer",
    "compress png free",
    "png optimizer",
  ],
  openGraph: {
    title: "Compress PNG Online Free - Reduce PNG File Size",
    description: "Compress PNG images online for free. Reduce PNG file size with minimal quality loss. Batch support. No upload, browser-based processing.",
    url: "https://freeaikit.app/compress-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/compress-png",
  },
};

export default function CompressPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Compress PNG Online"
        description="Compress PNG images online for free. Reduce PNG file size with minimal quality loss. Batch support. No upload, browser-based processing."
        slug="compress-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Compress PNG Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Reduce PNG file sizes significantly while preserving transparency and quality. Free, private, batch processing.
        </p>
      </div>

      <ImageCompressClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I compress a PNG file?", a: "Upload your PNG file(s), adjust the compression level, and click Compress. Download your optimized PNG files instantly." },
          { q: "Will PNG transparency be preserved?", a: "Yes. The compression process maintains transparency in your PNG images." },
          { q: "How much smaller will my PNG be?", a: "PNG compression typically achieves 30-70% reduction depending on image complexity and color count." },
          { q: "Is this lossless compression?", a: "The tool offers both lossy and lossless options. Lossy achieves smaller sizes with imperceptible quality changes." },
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
