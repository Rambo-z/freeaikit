import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PNG to WebP Converter - Convert PNG to WebP Free Online | FreeAIKit",
  description: "Convert PNG to WebP online for free. Dramatically reduce file size. Batch support. No upload, browser-based.",
  keywords: [
    "png to webp",
    "convert png to webp",
    "png to webp converter",
    "png to webp free",
    "png to webp online",
  ],
  openGraph: {
    title: "PNG to WebP Converter - Convert PNG to WebP Free Online",
    description: "Convert PNG to WebP online for free. Dramatically reduce file size. Batch support. No upload, browser-based.",
    url: "https://freeaikit.app/png-to-webp",
  },
  alternates: {
    canonical: "https://freeaikit.app/png-to-webp",
  },
};

export default function PngToWebpPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="PNG to WebP Converter"
        description="Convert PNG to WebP online for free. Dramatically reduce file size. Batch support. No upload, browser-based."
        slug="png-to-webp"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PNG to WebP Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert PNG images to WebP for dramatically smaller files. Free, private, batch processing.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How much smaller is WebP than PNG?", a: "WebP lossless is typically 26% smaller than PNG. WebP lossy can be 60-80% smaller with minimal quality difference." },
          { q: "Does WebP support transparency?", a: "Yes. WebP supports both lossy and lossless transparency, just like PNG." },
          { q: "Will quality be preserved?", a: "The quality slider lets you choose your ideal balance. At high settings, the difference is imperceptible." },
          { q: "Can I convert multiple files?", a: "Yes. Upload multiple PNG files and convert them all to WebP in one batch." },
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
