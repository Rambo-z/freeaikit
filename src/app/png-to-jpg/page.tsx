import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Convert PNG to JPG Free Online | FreeAIKit",
  description: "Convert PNG to JPG online for free. Fast, high-quality conversion. Batch support. No upload to server, runs entirely in your browser.",
  keywords: [
    "png to jpg",
    "convert png to jpg",
    "png to jpg converter",
    "png to jpeg",
    "png to jpg free",
    "png to jpg online",
    "convert png to jpeg",
  ],
  openGraph: {
    title: "PNG to JPG Converter - Convert PNG to JPG Free Online",
    description: "Convert PNG to JPG online for free. Fast, high-quality conversion. Batch support. No upload to server, runs entirely in your browser.",
    url: "https://freeaikit.app/png-to-jpg",
  },
  alternates: {
    canonical: "https://freeaikit.app/png-to-jpg",
  },
};

export default function PngToJpgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="PNG to JPG Converter"
        description="Convert PNG to JPG online for free. Fast, high-quality conversion. Batch support. No upload to server, runs entirely in your browser."
        slug="png-to-jpg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PNG to JPG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert PNG images to JPG format instantly. Reduce file size while keeping quality. Free, private, batch support.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert PNG to JPG?", a: "Upload your PNG file(s), select JPG as the output format, adjust quality if needed, and click Convert. Download your JPG files instantly." },
          { q: "Why convert PNG to JPG?", a: "JPG files are typically much smaller than PNG, making them ideal for photos, web uploads, and email attachments." },
          { q: "Will I lose quality?", a: "JPG uses lossy compression, but at high quality settings (90%+) the difference is imperceptible for photos." },
          { q: "What happens to transparency?", a: "JPG doesn't support transparency. Transparent areas in your PNG will become white in the JPG output." },
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
