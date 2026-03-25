import type { Metadata } from "next";
import ImageToTextClient from "../image-to-text/ImageToTextClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF to Text Online Free - Extract Text from PDF | FreeAIKit",
  description: "Extract text from PDF files online for free using OCR. Convert scanned PDFs to editable text. No upload, everything runs in your browser.",
  keywords: ["pdf to text", "extract text from pdf", "pdf to text converter", "pdf to text online free", "copy text from pdf", "pdf text extractor"],
  openGraph: { title: "PDF to Text Online Free", description: "Extract text from PDF files for free using OCR. No upload.", url: "https://freeaikit.app/pdf-to-text" },
  alternates: { canonical: "https://freeaikit.app/pdf-to-text" },
};

export default function PdfToTextPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="PDF to Text Online" description="Extract text from PDF files online for free using OCR. No upload, runs in your browser." slug="pdf-to-text" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">PDF to Text Online Free</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Extract text from PDF files and scanned documents using OCR. 100% free, processed in your browser.</p>
      </div>
      <ImageToTextClient />
      <RelatedTools currentSlug="image-to-text" />
    </div>
  );
}
