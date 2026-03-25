import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "JPEG to PNG Converter Online Free | FreeAIKit",
  description:
    "Convert JPEG to PNG online for free. Lossless conversion with transparency support. Batch processing, no upload to server — runs entirely in your browser.",
  keywords: [
    "jpeg to png",
    "jpeg to png converter",
    "convert jpeg to png",
    "jpeg to png online",
    "jpeg to png free",
    "jpeg to png converter online",
  ],
  openGraph: {
    title: "JPEG to PNG Converter Online Free",
    description:
      "Convert JPEG to PNG online for free. Lossless conversion with transparency support. Batch processing. No upload, browser-based.",
    url: "https://freeaikit.app/jpeg-to-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/jpeg-to-png",
  },
};

export default function JpegToPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="JPEG to PNG Converter"
        description="Convert JPEG to PNG online for free. Lossless conversion with transparency support. Batch processing, no upload to server."
        slug="jpeg-to-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Convert JPEG to PNG Online Free
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert JPEG images to lossless PNG format. PNG supports transparency and preserves pixel-perfect quality — perfect for graphics, logos, and screenshots. Free, private, runs in your browser.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "How do I convert JPEG to PNG?", a: "Upload your JPEG file(s), select PNG as the output format, and click Convert. Your PNG files download automatically." },
            { q: "What is the difference between JPEG and JPG?", a: "JPEG and JPG are the same format. The only difference is the file extension — older Windows systems used 3-letter extensions (.jpg), while the full name is .jpeg. Both work identically." },
            { q: "Why convert JPEG to PNG?", a: "PNG supports transparency, lossless quality, and is better suited for graphics, logos, screenshots, and images requiring pixel-perfect accuracy." },
            { q: "Can I convert multiple JPEG files at once?", a: "Yes! Upload multiple JPEG files and convert them all to PNG in one batch. All processing happens locally in your browser." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="image-convert" />
    </div>
  );
}
