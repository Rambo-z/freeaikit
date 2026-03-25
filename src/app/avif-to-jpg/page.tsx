import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "AVIF to JPG Converter Online Free | FreeAIKit",
  description:
    "Convert AVIF to JPG online for free. Transform AVIF files to widely compatible JPEG format instantly. Batch conversion, no upload to server — runs in your browser.",
  keywords: [
    "avif to jpg",
    "avif to jpg converter",
    "convert avif to jpg",
    "avif to jpeg",
    "avif to jpg online",
    "avif to jpg free",
    "avif converter",
  ],
  openGraph: {
    title: "AVIF to JPG Converter Online Free",
    description:
      "Convert AVIF to JPG online for free. Transform AVIF files to widely compatible JPEG format instantly. No upload, browser-based.",
    url: "https://freeaikit.app/avif-to-jpg",
  },
  alternates: {
    canonical: "https://freeaikit.app/avif-to-jpg",
  },
};

export default function AvifToJpgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="AVIF to JPG Converter"
        description="Convert AVIF to JPG online for free. Transform AVIF files to widely compatible JPEG format instantly. Batch conversion, no upload to server."
        slug="avif-to-jpg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Convert AVIF to JPG Online Free
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert AVIF images to JPG format for universal compatibility. AVIF is a modern format that not all software supports — convert to JPG so you can open, share, and use your images anywhere. Free, private, runs in your browser.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "What is AVIF format?", a: "AVIF (AV1 Image File Format) is a modern image format based on the AV1 video codec. It offers excellent compression but is not yet supported by all software and devices." },
            { q: "Why convert AVIF to JPG?", a: "JPG is universally supported across all devices, browsers, and applications. Converting AVIF to JPG ensures your images can be opened and shared anywhere." },
            { q: "Will I lose quality converting AVIF to JPG?", a: "There may be minimal quality loss since JPG uses lossy compression. However, at high quality settings the difference is imperceptible." },
            { q: "Can I convert multiple AVIF files at once?", a: "Yes! Upload multiple AVIF files and convert them all to JPG in one batch. All processing happens in your browser." },
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
