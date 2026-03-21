import type { Metadata } from "next";
import ImageCompressClient from "../image-compress/ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Free Image Compressor Online - Reduce File Size | FreeAIKit",
  description:
    "Free online image compressor. Reduce JPG, PNG, WebP file sizes by up to 80%. Batch processing, quality control. No upload, browser-based.",
  keywords: [
    "image compressor",
    "image compressor online",
    "free image compressor",
    "compress images online free",
    "photo compressor",
    "free compressor online",
    "online image compressor",
    "bulk image compressor",
  ],
  openGraph: {
    title: "Free Image Compressor Online - Reduce File Size",
    description:
      "Free online image compressor. Reduce JPG, PNG, WebP file sizes by up to 80%.",
    url: "https://freeaikit.app/image-compressor",
  },
  alternates: {
    canonical: "https://freeaikit.app/image-compressor",
  },
};

export default function ImageCompressorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Free Image Compressor"
        description="Free online image compressor. Reduce JPG, PNG, WebP file sizes by up to 80%. Batch processing, quality control."
        slug="image-compressor"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Free Image Compressor Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Compress images up to 80% smaller with industry-standard WASM engines.
          MozJPEG, libwebp, libimagequant — all running in your browser.
        </p>
      </div>
      <ImageCompressClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "How much can I compress my images?", a: "Typically 60-80% for PNG files and 40-70% for JPG files, depending on the image content and quality settings." },
            { q: "What compression engines do you use?", a: "MozJPEG for JPEG, libwebp for WebP, and libimagequant + UPNG for PNG — the same engines used by TinyPNG and other professional tools." },
            { q: "Can I compress multiple images at once?", a: "Yes! Drag and drop as many images as you want. They will all be compressed simultaneously." },
            { q: "Are my images uploaded to a server?", a: "No. All compression happens locally in your browser using WebAssembly. Your images never leave your device." },
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
