import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "SVG to JPG Converter - Convert SVG to JPG Free Online | FreeAIKit",
  description: "Convert SVG to JPG online for free. Rasterize vector graphics to JPG images. No upload, runs in your browser.",
  keywords: [
    "svg to jpg",
    "convert svg to jpg",
    "svg to jpg converter",
    "svg to jpeg",
    "svg to jpg free",
    "svg to jpg online",
  ],
  openGraph: {
    title: "SVG to JPG Converter - Convert SVG to JPG Free Online",
    description: "Convert SVG to JPG online for free. Rasterize vector graphics to JPG images. No upload, runs in your browser.",
    url: "https://freeaikit.app/svg-to-jpg",
  },
  alternates: {
    canonical: "https://freeaikit.app/svg-to-jpg",
  },
};

export default function SvgToJpgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="SVG to JPG Converter"
        description="Convert SVG to JPG online for free. Rasterize vector graphics to JPG images. No upload, runs in your browser."
        slug="svg-to-jpg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          SVG to JPG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert SVG vector files to JPG images. Free, private, browser-based conversion.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How does SVG to JPG conversion work?", a: "The SVG is rendered in your browser, then saved as a JPG image. Quality is adjustable." },
          { q: "What happens to SVG transparency?", a: "JPG doesn't support transparency. Transparent areas become white in the JPG output." },
          { q: "Can I adjust JPG quality?", a: "Yes. Use the quality slider to balance between file size and image quality." },
          { q: "Is this free?", a: "Yes, completely free. No signup, no limits, no watermarks." },
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
