import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter Online Free | FreeAIKit",
  description:
    "Convert HEIC to JPG online for free. Transform iPhone HEIC photos to universally compatible JPEG format. Batch conversion, no upload to server — runs in your browser.",
  keywords: [
    "heic to jpg",
    "heic to jpg converter",
    "convert heic to jpg",
    "heic to jpeg",
    "heic to jpg online",
    "heic to jpg free",
    "iphone heic to jpg",
    "heic converter",
  ],
  openGraph: {
    title: "HEIC to JPG Converter Online Free",
    description:
      "Convert HEIC to JPG online for free. Transform iPhone HEIC photos to universally compatible JPEG format. No upload, browser-based.",
    url: "https://freeaikit.app/heic-to-jpg",
  },
  alternates: {
    canonical: "https://freeaikit.app/heic-to-jpg",
  },
};

export default function HeicToJpgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="HEIC to JPG Converter"
        description="Convert HEIC to JPG online for free. Transform iPhone HEIC photos to universally compatible JPEG format. Batch conversion, no upload to server."
        slug="heic-to-jpg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Convert HEIC to JPG Online Free
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert iPhone HEIC photos to JPG format so you can open, edit, and share them on any device. HEIC is the default photo format on iPhones, but many Windows apps and websites don&apos;t support it. Free, private, runs in your browser.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "What is HEIC format?", a: "HEIC (High Efficiency Image Container) is the default photo format on iPhones and iPads since iOS 11. It produces smaller files than JPG but is not widely supported on Windows and other platforms." },
            { q: "Why convert HEIC to JPG?", a: "JPG is universally supported by all devices, browsers, and applications. Converting HEIC to JPG makes your iPhone photos accessible everywhere — especially on Windows PCs and older software." },
            { q: "Will I lose quality?", a: "There may be minimal quality loss since both HEIC and JPG use lossy compression. At high quality settings, the difference is virtually unnoticeable." },
            { q: "Can I batch convert HEIC photos?", a: "Yes! Upload multiple HEIC files at once and convert them all to JPG in a single batch. Everything runs in your browser — no files are uploaded to any server." },
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
