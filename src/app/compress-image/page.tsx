import type { Metadata } from "next";
import ImageCompressClient from "../image-compress/ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Compress Images Online Free - Reduce Image File Size | FreeAIKit",
  description: "Compress images online for free. Reduce JPG, PNG, WebP file sizes while maintaining quality. Batch compression supported. No upload, browser-based.",
  keywords: [
    "compress image",
    "compress image online",
    "image compressor",
    "reduce image size",
    "compress photo",
    "compress jpeg",
    "compress png",
    "image size reducer",
  ],
  openGraph: {
    title: "Compress Images Online Free - Reduce Image File Size",
    description: "Compress images online for free. Reduce JPG, PNG, WebP file sizes while maintaining quality. Batch compression supported. No upload, browser-based.",
    url: "https://freeaikit.app/compress-image",
  },
  alternates: {
    canonical: "https://freeaikit.app/compress-image",
  },
};

export default function CompressImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Compress Images Online"
        description="Compress images online for free. Reduce JPG, PNG, WebP file sizes while maintaining quality. Batch compression supported. No upload, browser-based."
        slug="compress-image"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Compress Images Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Reduce image file sizes by up to 90% without visible quality loss. Supports JPG, PNG, WebP. Free, private, batch processing.
        </p>
      </div>

      <ImageCompressClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I compress an image?", a: "Upload your image(s), adjust the quality slider, and click Compress. Download your smaller files instantly. Supports batch processing." },
          { q: "Which image formats are supported?", a: "JPG/JPEG, PNG, and WebP. All common image formats used on the web." },
          { q: "Will compression reduce image quality?", a: "At recommended settings, the quality difference is imperceptible. You can adjust the quality slider to find your ideal balance." },
          { q: "Is there a file size limit?", a: "No server-side limit since everything runs in your browser. Your images never leave your device." },
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
