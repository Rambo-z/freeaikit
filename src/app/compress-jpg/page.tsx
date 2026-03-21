import type { Metadata } from "next";
import ImageCompressClient from "../image-compress/ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Compress JPG File Online Free - Reduce JPEG Size | FreeAIKit",
  description:
    "Compress JPG files online for free. Reduce JPEG file size by up to 80% using MozJPEG. Batch compression, quality slider, no upload to server.",
  keywords: [
    "compress jpg",
    "compress jpg file",
    "compress jpeg",
    "reduce jpg size",
    "jpg compressor",
    "jpeg compressor online",
    "compress jpg online free",
    "reduce jpeg file size",
  ],
  openGraph: {
    title: "Compress JPG File Online Free - Reduce JPEG Size",
    description:
      "Compress JPG files online for free. Reduce JPEG file size by up to 80% using MozJPEG.",
    url: "https://freeaikit.app/compress-jpg",
  },
  alternates: {
    canonical: "https://freeaikit.app/compress-jpg",
  },
};

export default function CompressJpgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Compress JPG File"
        description="Compress JPG files online for free. Reduce JPEG file size by up to 80% using MozJPEG. Batch compression, quality slider, no upload to server."
        slug="compress-jpg"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Compress JPG File Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Reduce JPG/JPEG file sizes by up to 80% with MozJPEG — the industry-standard encoder.
          Free, private, runs in your browser.
        </p>
      </div>
      <ImageCompressClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "How does JPG compression work?", a: "Our tool uses MozJPEG, the same encoder used by major web services. It re-encodes your JPEG with optimized Huffman tables and quantization, achieving much smaller files with minimal quality loss." },
            { q: "What is MozJPEG?", a: "MozJPEG is an improved JPEG encoder by Mozilla. It produces smaller files than standard JPEG encoders while maintaining the same visual quality." },
            { q: "Will I lose image quality?", a: "At the default quality setting (80), the difference is imperceptible. You can adjust the quality slider to balance between file size and quality." },
            { q: "Can I compress multiple JPG files at once?", a: "Yes! Drag and drop multiple files or select them all at once. All files are processed in your browser simultaneously." },
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
