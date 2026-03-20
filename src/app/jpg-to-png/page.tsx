import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "JPG to PNG Converter - Convert JPG to PNG Free Online | FreeAIKit",
  description: "Convert JPG to PNG online for free. Lossless conversion with transparency support. Batch processing. No upload, browser-based.",
  keywords: [
    "jpg to png",
    "convert jpg to png",
    "jpg to png converter",
    "jpeg to png",
    "jpg to png free",
    "jpg to png online",
  ],
  openGraph: {
    title: "JPG to PNG Converter - Convert JPG to PNG Free Online",
    description: "Convert JPG to PNG online for free. Lossless conversion with transparency support. Batch processing. No upload, browser-based.",
    url: "https://freeaikit.app/jpg-to-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/jpg-to-png",
  },
};

export default function JpgToPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="JPG to PNG Converter"
        description="Convert JPG to PNG online for free. Lossless conversion with transparency support. Batch processing. No upload, browser-based."
        slug="jpg-to-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          JPG to PNG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert JPG images to PNG format with lossless quality. Free, private, supports batch conversion.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert JPG to PNG?", a: "Upload your JPG file(s), select PNG as the output format, and click Convert. Your PNG files download automatically." },
          { q: "Why convert JPG to PNG?", a: "PNG supports transparency, lossless quality, and is better for graphics, logos, and screenshots." },
          { q: "Will the file size increase?", a: "Usually yes, since PNG is lossless. But PNG is the better choice when you need transparency or pixel-perfect quality." },
          { q: "Can I convert multiple files at once?", a: "Yes. Upload multiple JPG files and convert them all to PNG in one batch." },
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
