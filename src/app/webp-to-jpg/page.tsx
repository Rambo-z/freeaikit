import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "WebP to JPG Converter - Convert WebP to JPG Free Online | FreeAIKit",
  description: "Convert WebP to JPG online for free. Fast conversion with high quality. Batch support. No upload needed, runs in your browser.",
  keywords: [
    "webp to jpg",
    "convert webp to jpg",
    "webp to jpg converter",
    "webp to jpeg",
    "webp to jpg free",
    "webp to jpg online",
  ],
  openGraph: {
    title: "WebP to JPG Converter - Convert WebP to JPG Free Online",
    description: "Convert WebP to JPG online for free. Fast conversion with high quality. Batch support. No upload needed, runs in your browser.",
    url: "https://freeaikit.app/webp-to-jpg",
  },
  alternates: {
    canonical: "https://freeaikit.app/webp-to-jpg",
  },
};

export default function WebpToJpgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="WebP to JPG Converter"
        description="Convert WebP to JPG online for free. Fast conversion with high quality. Batch support. No upload needed, runs in your browser."
        slug="webp-to-jpg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          WebP to JPG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert WebP images to universally compatible JPG format. Free, private, batch processing supported.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert WebP to JPG?", a: "Upload your WebP file(s), select JPG as output, and click Convert. Your JPG images download instantly." },
          { q: "Why convert WebP to JPG?", a: "While WebP offers smaller file sizes, JPG is universally supported by all devices, apps, and social media platforms." },
          { q: "Is there quality loss?", a: "Minimal. At 95% quality setting, the conversion is virtually lossless and visually identical." },
          { q: "Can I batch convert?", a: "Yes. Upload multiple WebP files and convert them all to JPG at once." },
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
