import type { Metadata } from "next";
import ImageCompressClient from "../image-compress/ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Compress JPEG Online Free - Reduce JPEG File Size | FreeAIKit",
  description: "Compress JPEG images online for free. Reduce JPEG file size while maintaining quality. Batch compression. No upload to server, runs in browser.",
  keywords: [
    "compress jpeg",
    "compress jpeg online",
    "jpeg compressor",
    "reduce jpeg size",
    "compress jpg",
    "jpeg file size reducer",
    "compress jpeg free",
  ],
  openGraph: {
    title: "Compress JPEG Online Free - Reduce JPEG File Size",
    description: "Compress JPEG images online for free. Reduce JPEG file size while maintaining quality. Batch compression. No upload to server, runs in browser.",
    url: "https://freeaikit.app/compress-jpeg",
  },
  alternates: {
    canonical: "https://freeaikit.app/compress-jpeg",
  },
};

export default function CompressJpegPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Compress JPEG Online"
        description="Compress JPEG images online for free. Reduce JPEG file size while maintaining quality. Batch compression. No upload to server, runs in browser."
        slug="compress-jpeg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Compress JPEG Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Reduce JPEG file sizes instantly while keeping visual quality. Free, private, supports batch processing.
        </p>
      </div>

      <ImageCompressClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I compress a JPEG file?", a: "Upload your JPEG file(s), set the quality level, and click Compress. Your smaller JPEG downloads automatically." },
          { q: "What's the difference between JPG and JPEG?", a: "They're the same format. JPG and JPEG are interchangeable — both are fully supported by this tool." },
          { q: "How much can JPEG files be compressed?", a: "Typically 40-80% reduction depending on the original quality and your chosen compression level." },
          { q: "Does this tool upload my photos?", a: "No. Everything runs in your browser. Your JPEG files are processed locally and never sent to any server." },
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
