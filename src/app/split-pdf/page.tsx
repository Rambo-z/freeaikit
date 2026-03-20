import type { Metadata } from "next";
import PdfMergeClient from "../pdf-merge/PdfMergeClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Split PDF Online Free - Extract Pages from PDF | FreeAIKit",
  description: "Split PDF files online for free. Extract specific pages or split into multiple documents. No upload to server, runs entirely in your browser.",
  keywords: [
    "split pdf",
    "split pdf online",
    "split pdf free",
    "pdf splitter",
    "extract pages from pdf",
    "separate pdf pages",
    "divide pdf",
    "cut pdf",
  ],
  openGraph: {
    title: "Split PDF Online Free - Extract Pages from PDF",
    description: "Split PDF files online for free. Extract specific pages or split into multiple documents. No upload to server, runs entirely in your browser.",
    url: "https://freeaikit.app/split-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/split-pdf",
  },
};

export default function SplitPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Split PDF Online"
        description="Split PDF files online for free. Extract specific pages or split into multiple documents. No upload to server, runs entirely in your browser."
        slug="split-pdf"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Split PDF Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Split PDF files by page range or extract specific pages. Free, private, runs in your browser.
        </p>
      </div>

      <PdfMergeClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I split a PDF?", a: "Upload your PDF, specify the page range you want to extract (e.g., 1-5, 8, 10-12), and click Split. Your new PDF downloads instantly." },
          { q: "Can I extract specific pages?", a: "Yes. Enter individual page numbers or ranges separated by commas. For example: 1, 3, 5-10." },
          { q: "Will splitting affect quality?", a: "No. Pages are extracted without re-encoding, so quality is identical to the original PDF." },
          { q: "Is there a page limit?", a: "No. Split PDFs of any size. Processing happens in your browser, so very large files may take a moment." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="pdf-merge" />
    </div>
  );
}
