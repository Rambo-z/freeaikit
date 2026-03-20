import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "JPG to WebP Converter - Convert JPG to WebP Free Online | FreeAIKit",
  description: "Convert JPG to WebP online for free. WebP files are up to 30% smaller than JPG with same quality. Batch support. Browser-based.",
  keywords: [
    "jpg to webp",
    "convert jpg to webp",
    "jpg to webp converter",
    "jpeg to webp",
    "jpg to webp free",
    "jpg to webp online",
  ],
  openGraph: {
    title: "JPG to WebP Converter - Convert JPG to WebP Free Online",
    description: "Convert JPG to WebP online for free. WebP files are up to 30% smaller than JPG with same quality. Batch support. Browser-based.",
    url: "https://freeaikit.app/jpg-to-webp",
  },
  alternates: {
    canonical: "https://freeaikit.app/jpg-to-webp",
  },
};

export default function JpgToWebpPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="JPG to WebP Converter"
        description="Convert JPG to WebP online for free. WebP files are up to 30% smaller than JPG with same quality. Batch support. Browser-based."
        slug="jpg-to-webp"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          JPG to WebP Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert JPG images to WebP format for smaller file sizes. Free, private, batch support.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "Why convert JPG to WebP?", a: "WebP files are typically 25-35% smaller than JPG at the same quality, making your website load faster and saving bandwidth." },
          { q: "Do all browsers support WebP?", a: "Yes. All modern browsers (Chrome, Firefox, Safari, Edge) support WebP. It's the recommended format for web images." },
          { q: "Is there quality loss?", a: "At the same quality setting, WebP and JPG are visually identical. WebP just achieves smaller file sizes." },
          { q: "Can I batch convert?", a: "Yes. Upload multiple JPG files and convert them all to WebP at once." },
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
