import type { Metadata } from "next";
import PdfExtractClient from "../pdf-extract/PdfExtractClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF Text Extractor - Extract Text from PDF Free | FreeAIKit",
  description:
    "Extract text from PDF files online for free. Copy text from scanned or digital PDFs. Select specific pages. No upload, runs in your browser.",
  keywords: [
    "pdf text extractor",
    "extract text from pdf",
    "pdf to text",
    "copy text from pdf",
    "pdf text extractor online",
    "extract text from pdf free",
  ],
  openGraph: {
    title: "PDF Text Extractor - Extract Text from PDF Free",
    description:
      "Extract text from PDF files online for free. Select specific pages. No upload, browser-based.",
    url: "https://freeaikit.app/pdf-text-extractor",
  },
  alternates: {
    canonical: "https://freeaikit.app/pdf-text-extractor",
  },
};

export default function PdfTextExtractorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="PDF Text Extractor"
        description="Extract text from PDF files online for free. Copy text from scanned or digital PDFs. Select specific pages."
        slug="pdf-text-extractor"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PDF Text Extractor
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Extract and copy text from any PDF file. Select specific pages or extract all.
          Free, private, runs entirely in your browser.
        </p>
      </div>
      <PdfExtractClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "Can I extract text from scanned PDFs?", a: "This tool works with digital PDFs that contain selectable text. For scanned documents (image-based PDFs), use our Image to Text (OCR) tool." },
            { q: "Can I select specific pages?", a: "Yes. You can specify page ranges (e.g., 1-5, 8, 10-15) to extract text from only the pages you need." },
            { q: "Is my PDF uploaded to a server?", a: "No. All processing happens locally in your browser using pdf-lib. Your file never leaves your device." },
            { q: "What is the maximum file size?", a: "There is no server-side limit. Processing depends on your browser and device capabilities." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-extract" />
    </div>
  );
}
