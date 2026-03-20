import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "WebP to PNG Converter - Convert WebP to PNG Free Online | FreeAIKit",
  description: "Convert WebP to PNG online for free. Lossless conversion. Batch support. No upload, browser-based processing.",
  keywords: [
    "webp to png",
    "convert webp to png",
    "webp to png converter",
    "webp to png free",
    "webp to png online",
  ],
  openGraph: {
    title: "WebP to PNG Converter - Convert WebP to PNG Free Online",
    description: "Convert WebP to PNG online for free. Lossless conversion. Batch support. No upload, browser-based processing.",
    url: "https://freeaikit.app/webp-to-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/webp-to-png",
  },
};

export default function WebpToPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="WebP to PNG Converter"
        description="Convert WebP to PNG online for free. Lossless conversion. Batch support. No upload, browser-based processing."
        slug="webp-to-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          WebP to PNG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert WebP images to PNG format with lossless quality. Free, private, supports batch processing.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert WebP to PNG?", a: "Upload your WebP file(s), select PNG as output, and click Convert. Download your PNG files immediately." },
          { q: "Why choose PNG over JPG?", a: "PNG supports transparency and lossless quality — ideal for graphics, logos, and images that need editing." },
          { q: "Will quality be preserved?", a: "Yes. PNG is lossless, so the conversion preserves every pixel of your original WebP image." },
          { q: "Does this support animated WebP?", a: "This tool converts static WebP images. For animated WebP, use the GIF Maker tool instead." },
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
