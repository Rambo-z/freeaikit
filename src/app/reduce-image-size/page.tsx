import type { Metadata } from "next";
import ImageCompressClient from "../image-compress/ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Reduce Image Size Online Free | FreeAIKit",
  description:
    "Reduce image size online for free. Compress JPG, PNG, and WebP images by up to 80% without visible quality loss. Batch processing, quality slider, no upload to server.",
  keywords: [
    "reduce image size",
    "reduce image size online",
    "reduce image file size",
    "reduce photo size",
    "make image smaller",
    "shrink image size",
    "reduce image size online free",
    "image size reducer",
  ],
  openGraph: {
    title: "Reduce Image Size Online Free",
    description:
      "Reduce image size online for free. Compress JPG, PNG, and WebP images by up to 80% without visible quality loss. No upload, browser-based.",
    url: "https://freeaikit.app/reduce-image-size",
  },
  alternates: {
    canonical: "https://freeaikit.app/reduce-image-size",
  },
};

export default function ReduceImageSizePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Reduce Image Size"
        description="Reduce image size online for free. Compress JPG, PNG, and WebP images by up to 80% without visible quality loss. Batch processing, quality slider, no upload to server."
        slug="reduce-image-size"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Reduce Image Size Online Free
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Make your images smaller without losing visible quality. Powered by industry-standard encoders — MozJPEG for JPG, libwebp for WebP, and libimagequant for PNG. Reduce file sizes by up to 80%. Free, private, runs in your browser.
        </p>
      </div>

      <ImageCompressClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "How much can I reduce image size?", a: "Typically 50-80% depending on the image type and quality setting. JPG files compressed with MozJPEG can shrink by up to 80% with minimal visual difference." },
            { q: "Will reducing image size affect quality?", a: "At the default quality setting (80), the difference is virtually imperceptible. Use the quality slider to find the perfect balance between file size and visual quality." },
            { q: "What image formats are supported?", a: "JPG/JPEG (compressed with MozJPEG), PNG (compressed with libimagequant for pngquant-level results), and WebP (compressed with libwebp)." },
            { q: "How do I reduce image size for email?", a: "Upload your images, adjust the quality slider if needed, and compress. The reduced files will be small enough for email attachments while maintaining good visual quality." },
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
