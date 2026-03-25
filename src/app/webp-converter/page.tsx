import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "WebP Converter Online Free - Convert WebP to JPG PNG | FreeAIKit",
  description:
    "WebP converter online free. Convert WebP to JPG, PNG, or convert images to WebP. Batch conversion, no upload to server — runs entirely in your browser.",
  keywords: [
    "webp converter",
    "webp converter online",
    "webp to jpg",
    "webp to png",
    "convert webp",
    "webp to jpg converter",
    "webp to png converter",
    "webp converter free",
  ],
  openGraph: {
    title: "WebP Converter Online Free - Convert WebP to JPG PNG",
    description:
      "WebP converter online free. Convert WebP to JPG, PNG, or convert images to WebP. Batch conversion. No upload, browser-based.",
    url: "https://freeaikit.app/webp-converter",
  },
  alternates: {
    canonical: "https://freeaikit.app/webp-converter",
  },
};

export default function WebpConverterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="WebP Converter"
        description="WebP converter online free. Convert WebP to JPG, PNG, or convert images to WebP. Batch conversion, no upload to server."
        slug="webp-converter"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          WebP Converter Online Free
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert WebP images to JPG or PNG, or convert any image to WebP format. WebP files are smaller but not always compatible — use this tool to convert in either direction. Free, private, runs in your browser.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "How do I convert WebP to JPG?", a: "Upload your WebP file(s), select JPG as the output format, and click Convert. Your JPG files will download automatically." },
            { q: "Can I convert WebP to PNG?", a: "Yes! Upload your WebP files and select PNG as the output format. PNG preserves lossless quality and supports transparency." },
            { q: "Why can't I open WebP files?", a: "Some older software and image editors don't support WebP. Converting to JPG or PNG makes your images compatible with virtually all applications." },
            { q: "Can I also convert images to WebP?", a: "Yes! This tool works both ways. Upload JPG, PNG, or other formats and convert them to WebP for smaller file sizes on the web." },
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
