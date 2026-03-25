import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "HEIC to PNG Converter Online Free | FreeAIKit",
  description:
    "Convert HEIC to PNG online for free. Transform iPhone HEIC photos to lossless PNG format with transparency support. Batch conversion, no upload to server.",
  keywords: [
    "heic to png",
    "heic to png converter",
    "convert heic to png",
    "heic to png online",
    "heic to png free",
    "iphone heic to png",
  ],
  openGraph: {
    title: "HEIC to PNG Converter Online Free",
    description:
      "Convert HEIC to PNG online for free. Transform iPhone HEIC photos to lossless PNG format with transparency support. No upload, browser-based.",
    url: "https://freeaikit.app/heic-to-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/heic-to-png",
  },
};

export default function HeicToPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="HEIC to PNG Converter"
        description="Convert HEIC to PNG online for free. Transform iPhone HEIC photos to lossless PNG format with transparency support. Batch conversion, no upload to server."
        slug="heic-to-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Convert HEIC to PNG Online Free
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert iPhone HEIC photos to lossless PNG format. PNG preserves every pixel perfectly and supports transparency — ideal for graphics, screenshots, and professional editing. Free, private, runs in your browser.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "Why convert HEIC to PNG instead of JPG?", a: "PNG is lossless — it preserves every pixel perfectly with no compression artifacts. Choose PNG when you need transparency, pixel-perfect quality, or plan to edit the image further." },
            { q: "Will the file size increase?", a: "Yes, PNG files are typically larger than HEIC because PNG uses lossless compression. The trade-off is perfect quality preservation and transparency support." },
            { q: "Does PNG support transparency?", a: "Yes! PNG supports full alpha transparency, making it ideal for logos, graphics, and images that need transparent backgrounds." },
            { q: "Can I convert multiple HEIC files to PNG?", a: "Yes! Upload multiple HEIC files and convert them all to PNG in one batch. All processing happens locally in your browser." },
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
