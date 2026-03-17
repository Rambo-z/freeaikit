import type { Metadata } from "next";
import PdfToPptClient from "./PdfToPptClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF to Editable PowerPoint (PPT) - Free Online | FreeAIKit",
  description:
    "Convert PDF slides to editable PowerPoint presentations. OCR extracts text with positions, creates real text boxes in PPT. Perfect for NotebookLM slides. Free, in-browser.",
  keywords: ["pdf to ppt", "pdf to powerpoint", "convert pdf to ppt", "notebooklm to ppt", "pdf to editable ppt", "pdf to pptx online", "notebooklm slides to powerpoint"],
  openGraph: {
    title: "PDF to Editable PowerPoint - Free Online",
    description: "Convert image-based PDF slides to editable PPT with OCR. Free, private, runs in your browser.",
    url: "https://freeaikit.app/pdf-to-ppt",
  },
};

export default function PdfToPptPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="PDF to Editable PowerPoint" description="Convert PDF slides to editable PowerPoint presentations using OCR. Perfect for NotebookLM slides. Free, in-browser." slug="pdf-to-ppt" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PDF to Editable PowerPoint
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert image-based PDF slides into editable PowerPoint presentations.
          OCR extracts text and recreates it as real text boxes. Perfect for
          NotebookLM exports. Free, in-browser.
        </p>
      </div>
      <PdfToPptClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "Why can't I edit NotebookLM slides?",
            a: "NotebookLM exports slides as image-based PDFs where text is baked into images. This tool uses OCR to extract the text and recreate it as real, editable text boxes in a PowerPoint file.",
          },
          {
            q: "How accurate is the text extraction?",
            a: "For clean, well-formatted slides (like NotebookLM output), accuracy is typically 90-95%. The tool preserves text positions, so text boxes appear in roughly the same locations as the original. Handwritten or heavily stylized text may have lower accuracy.",
          },
          {
            q: "Is my PDF uploaded to a server?",
            a: "No. All processing runs entirely in your browser using WebAssembly OCR (Tesseract.js). Your PDF never leaves your device. This is a key advantage over online converters that require uploading.",
          },
          {
            q: "What about images and charts in the PDF?",
            a: "Each PDF page is included as a background image in the PPT slide. Text detected by OCR is placed on top as editable text boxes. Charts and images remain as part of the background but the text is fully editable.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="pdf-to-ppt" />
    </div>
  );
}
