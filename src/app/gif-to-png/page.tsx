import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "GIF to PNG Converter - Convert GIF to PNG Free Online | FreeAIKit",
  description: "Convert GIF to PNG online for free. Lossless conversion of the first frame. No upload, browser-based.",
  keywords: [
    "gif to png",
    "convert gif to png",
    "gif to png converter",
    "gif to png free",
    "gif to png online",
  ],
  openGraph: {
    title: "GIF to PNG Converter - Convert GIF to PNG Free Online",
    description: "Convert GIF to PNG online for free. Lossless conversion of the first frame. No upload, browser-based.",
    url: "https://freeaikit.app/gif-to-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/gif-to-png",
  },
};

export default function GifToPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="GIF to PNG Converter"
        description="Convert GIF to PNG online for free. Lossless conversion of the first frame. No upload, browser-based."
        slug="gif-to-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          GIF to PNG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert GIF images to lossless PNG format. Free, private, browser-based.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert GIF to PNG?", a: "Upload your GIF file, select PNG as output, and click Convert. The first frame is saved as PNG." },
          { q: "Is the conversion lossless?", a: "Yes. PNG is lossless, so the frame is preserved at perfect quality." },
          { q: "Is GIF transparency preserved?", a: "Yes. GIF transparency is maintained in the PNG output." },
          { q: "Can I convert animated GIFs?", a: "The tool extracts the first frame. Use a GIF editor for frame-by-frame extraction." },
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
