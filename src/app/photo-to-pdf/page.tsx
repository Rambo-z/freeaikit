import type { Metadata } from "next";
import ImageToPdfClient from "../image-to-pdf/ImageToPdfClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Photo to PDF Converter - Convert Photos to PDF Free Online | FreeAIKit",
  description: "Convert photos to PDF online for free. Combine multiple photos into one PDF. Choose page size and orientation. Browser-based.",
  keywords: [
    "photo to pdf",
    "convert photo to pdf",
    "photo to pdf converter",
    "picture to pdf",
    "photos to pdf",
    "image to pdf",
    "photo to pdf free",
  ],
  openGraph: {
    title: "Photo to PDF Converter - Convert Photos to PDF Free Online",
    description: "Convert photos to PDF online for free. Combine multiple photos into one PDF. Choose page size and orientation. Browser-based.",
    url: "https://freeaikit.app/photo-to-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/photo-to-pdf",
  },
};

export default function PhotoToPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Photo to PDF Converter"
        description="Convert photos to PDF online for free. Combine multiple photos into one PDF. Choose page size and orientation. Browser-based."
        slug="photo-to-pdf"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Photo to PDF Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert your photos to PDF instantly. Combine multiple photos into one document. Free, private, browser-based.
        </p>
      </div>

      <ImageToPdfClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert photos to PDF?", a: "Upload your photos, arrange them in order, choose page settings, and click Convert. Your PDF downloads instantly." },
          { q: "Can I combine multiple photos?", a: "Yes. Upload as many photos as you want, drag to reorder, and combine them all into one PDF." },
          { q: "What photo formats are supported?", a: "JPG, PNG, WebP, GIF, BMP — all common photo formats are supported." },
          { q: "Will photo quality be preserved?", a: "Yes. Photos are embedded at high quality (95%) — visually identical to the originals." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="image-to-pdf" />
    </div>
  );
}
