import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "SVG to PNG Converter - Convert SVG to PNG Free Online | FreeAIKit",
  description: "Convert SVG to PNG online for free. Rasterize vector graphics to high-quality PNG images. No upload, runs in your browser.",
  keywords: [
    "svg to png",
    "convert svg to png",
    "svg to png converter",
    "svg to png free",
    "svg to png online",
    "rasterize svg",
  ],
  openGraph: {
    title: "SVG to PNG Converter - Convert SVG to PNG Free Online",
    description: "Convert SVG to PNG online for free. Rasterize vector graphics to high-quality PNG images. No upload, runs in your browser.",
    url: "https://freeaikit.app/svg-to-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/svg-to-png",
  },
};

export default function SvgToPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="SVG to PNG Converter"
        description="Convert SVG to PNG online for free. Rasterize vector graphics to high-quality PNG images. No upload, runs in your browser."
        slug="svg-to-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          SVG to PNG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert SVG vector files to PNG raster images. Free, private, browser-based.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert SVG to PNG?", a: "Upload your SVG file, select PNG as output, and click Convert. Your PNG image downloads instantly." },
          { q: "Why convert SVG to PNG?", a: "PNG is a universal format supported everywhere. Some platforms and apps don't accept SVG files." },
          { q: "Can I set the output resolution?", a: "The PNG is rendered at the SVG's native resolution. For higher resolution, resize the SVG first." },
          { q: "Is transparency preserved?", a: "Yes. SVG transparency is preserved in the PNG output." },
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
