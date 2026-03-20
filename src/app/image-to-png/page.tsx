import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Image to PNG Converter - Convert Any Image to PNG Free | FreeAIKit",
  description: "Convert any image to PNG format online for free. Supports JPG, WebP, BMP, GIF. Lossless quality. No upload, runs in your browser.",
  keywords: [
    "image to png",
    "convert to png",
    "convert image to png",
    "jpg to png",
    "bmp to png",
    "gif to png",
    "image to png converter",
  ],
  openGraph: {
    title: "Image to PNG Converter - Convert Any Image to PNG Free",
    description: "Convert any image to PNG format online for free. Supports JPG, WebP, BMP, GIF. Lossless quality. No upload, runs in your browser.",
    url: "https://freeaikit.app/image-to-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/image-to-png",
  },
};

export default function ImageToPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Convert Image to PNG"
        description="Convert any image to PNG format online for free. Supports JPG, WebP, BMP, GIF. Lossless quality. No upload, runs in your browser."
        slug="image-to-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Convert Image to PNG
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert any image format to PNG. Lossless quality with transparency support. Free, private, batch processing.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "Which image formats can I convert to PNG?", a: "JPG, WebP, BMP, GIF, and most common image formats. Upload any image and get a PNG output." },
          { q: "Why convert to PNG?", a: "PNG offers lossless quality, transparency support, and wide compatibility — ideal for graphics, logos, and editing." },
          { q: "Is the conversion lossless?", a: "Yes. PNG preserves every pixel of your original image without any quality loss." },
          { q: "Can I convert multiple images?", a: "Yes. Upload multiple images and convert them all to PNG format in one batch." },
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
