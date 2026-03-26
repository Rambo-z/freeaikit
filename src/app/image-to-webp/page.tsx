import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Convert Image to WebP Online Free | FreeAIKit",
  description:
    "Convert images to WebP online for free. Transform JPG, PNG, AVIF, and other formats to WebP for smaller file sizes and faster web loading. Batch conversion, no upload to server.",
  keywords: [
    "image to webp",
    "image to webp converter",
    "convert image to webp",
    "convert to webp",
    "jpg to webp",
    "png to webp",
    "webp converter online",
    "convert images to webp free",
  ],
  openGraph: {
    title: "Convert Image to WebP Online Free",
    description:
      "Convert images to WebP online for free. Transform JPG, PNG, and other formats to WebP for smaller files and faster loading. No upload, browser-based.",
    url: "https://freeaikit.app/image-to-webp",
  },
  alternates: {
    canonical: "https://freeaikit.app/image-to-webp",
  },
};

export default function ImageToWebpPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Image to WebP Converter"
        description="Convert images to WebP online for free. Transform JPG, PNG, AVIF, and other formats to WebP for smaller file sizes and faster web loading. Batch conversion, no upload to server."
        slug="image-to-webp"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Convert Image to WebP Online Free
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert JPG, PNG, and other image formats to WebP — Google&apos;s modern image format that delivers 25-35% smaller files than JPEG at equivalent quality. Ideal for speeding up your website. Free, private, runs in your browser.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "What is WebP?", a: "WebP is a modern image format developed by Google that provides superior compression. WebP images are 25-35% smaller than JPEG and PNG at equivalent visual quality, making websites load faster." },
            { q: "Why should I convert images to WebP?", a: "WebP files are significantly smaller, which means faster page loads, lower bandwidth costs, and better Core Web Vitals scores. All modern browsers support WebP." },
            { q: "Which image formats can I convert to WebP?", a: "You can convert JPG, JPEG, PNG, BMP, GIF, AVIF, HEIC, and other common image formats to WebP using this tool." },
            { q: "Can I batch convert images to WebP?", a: "Yes! Upload multiple images at once and convert them all to WebP in a single batch. All processing happens locally in your browser." },
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
