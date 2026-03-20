import type { Metadata } from "next";
import PdfToImagesClient from "../pdf-to-images/PdfToImagesClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF to PNG Converter - Convert PDF to PNG Free Online | FreeAIKit",
  description: "Convert PDF to PNG images online for free. Export each PDF page as a high-quality PNG with transparency support. Up to 300 DPI. Browser-based, no upload.",
  keywords: [
    "pdf to png",
    "convert pdf to png",
    "pdf to png converter",
    "pdf to png free",
    "pdf to png online",
    "pdf to image",
    "export pdf as png",
  ],
  openGraph: {
    title: "PDF to PNG Converter - Convert PDF to PNG Free Online",
    description: "Convert PDF to PNG images online for free. Export each PDF page as a high-quality PNG with transparency support. Up to 300 DPI. Browser-based, no upload.",
    url: "https://freeaikit.app/pdf-to-png",
  },
  alternates: {
    canonical: "https://freeaikit.app/pdf-to-png",
  },
};

export default function PdfToPngPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="PDF to PNG Converter"
        description="Convert PDF to PNG images online for free. Export each PDF page as a high-quality PNG with transparency support. Up to 300 DPI. Browser-based, no upload."
        slug="pdf-to-png"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PDF to PNG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert PDF pages to high-quality PNG images with transparency. Up to 300 DPI. Free, private, browser-based.
        </p>
      </div>

      <PdfToImagesClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert PDF to PNG?", a: "Upload your PDF, select PNG as the output format, choose your DPI, and click Convert. Each page is saved as a separate PNG file." },
          { q: "Why choose PNG over JPG?", a: "PNG supports transparency and lossless compression — ideal for graphics, diagrams, and text-heavy pages. JPG is better for photos." },
          { q: "What DPI should I use?", a: "72 DPI for web use, 150 DPI for presentations, 300 DPI for print. Higher DPI = larger files but sharper images." },
          { q: "Can I convert all pages at once?", a: "Yes. All pages are converted automatically. Download them individually or as a batch." },
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
