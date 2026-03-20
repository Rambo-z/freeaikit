import type { Metadata } from "next";
import PdfToImagesClient from "../pdf-to-images/PdfToImagesClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF to JPG Converter - Convert PDF to JPG Free Online | FreeAIKit",
  description: "Convert PDF to JPG images online for free. Extract each PDF page as a high-quality JPG image. Up to 300 DPI. No upload, runs in your browser.",
  keywords: [
    "pdf to jpg",
    "convert pdf to jpg",
    "pdf to jpg converter",
    "pdf to jpeg",
    "pdf to jpg free",
    "convert pdf to image",
    "pdf to jpg online",
    "extract images from pdf",
  ],
  openGraph: {
    title: "PDF to JPG Converter - Convert PDF to JPG Free Online",
    description: "Convert PDF to JPG images online for free. Extract each PDF page as a high-quality JPG image. Up to 300 DPI. No upload, runs in your browser.",
    url: "https://freeaikit.app/pdf-to-jpg",
  },
  alternates: {
    canonical: "https://freeaikit.app/pdf-to-jpg",
  },
};

export default function PdfToJpgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="PDF to JPG Converter"
        description="Convert PDF to JPG images online for free. Extract each PDF page as a high-quality JPG image. Up to 300 DPI. No upload, runs in your browser."
        slug="pdf-to-jpg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PDF to JPG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert PDF pages to high-quality JPG images. Choose resolution up to 300 DPI. Free, private, no upload needed.
        </p>
      </div>

      <PdfToImagesClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert PDF to JPG?", a: "Upload your PDF, select JPG as output format and your preferred DPI (72, 150, or 300), then click Convert. Each page becomes a separate JPG image." },
          { q: "What resolution can I export?", a: "Choose from 72 DPI (web/email), 150 DPI (general use), or 300 DPI (print quality). Higher DPI means larger file sizes but sharper images." },
          { q: "Can I convert a multi-page PDF?", a: "Yes. Every page is converted to a separate JPG image. You can download them individually or all at once." },
          { q: "Is this really free?", a: "Yes, completely free with no limits. No signup, no watermarks, no ads. Your files never leave your browser." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="pdf-to-images" />
    </div>
  );
}
