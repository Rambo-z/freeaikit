import type { Metadata } from "next";
import PdfMergeClient from "./PdfMergeClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF Merge & Split - Free Online PDF Tool | FreeAIKit",
  description:
    "Merge multiple PDF files into one, or split a PDF into separate files by page range. 100% free, no upload to server, runs in your browser.",
  keywords: [
    "merge pdf", "combine pdf", "split pdf", "pdf splitter", "pdf merger",
    "merge pdf files online", "split pdf pages", "free pdf tool",
  ],
  openGraph: {
    title: "PDF Merge & Split - Free Online",
    description: "Merge or split PDF files instantly. No upload, runs in your browser.",
    url: "https://freeaikit.app/pdf-merge",
  },
};

export default function PdfMergePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="PDF Merge & Split" description="Merge multiple PDF files into one, or split a PDF into separate files by page range. 100% free, no upload to server, runs in your browser." slug="pdf-merge" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PDF Merge & Split
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Combine multiple PDFs into one, or split a PDF into separate files by
          page range. Free, instant, runs entirely in your browser.
        </p>
      </div>

      <PdfMergeClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>
            <strong>Merge:</strong> Upload two or more PDF files, drag to reorder
            them, then click Merge. All pages are combined into a single
            downloadable PDF in the order you choose.
          </p>
          <p>
            <strong>Split:</strong> Upload one PDF and enter the page ranges you
            want to extract (e.g. <code>1-3, 4-6, 7</code>). Each range is saved
            as a separate PDF file.
          </p>
          <p>
            Everything runs locally using pdf-lib — your files never leave your
            device.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <h2 className="text-xl font-bold">FAQ</h2>
          {[
            { q: "Is there a file size limit?", a: "No server-side limit. Processing happens in your browser. Very large files (500MB+) may be slow." },
            { q: "Will the PDF quality change?", a: "No. Merge and split operations preserve the original content exactly — no re-rendering or quality loss." },
            { q: "Can I merge password-protected PDFs?", a: "Not currently. Remove the password protection first using your PDF viewer." },
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
