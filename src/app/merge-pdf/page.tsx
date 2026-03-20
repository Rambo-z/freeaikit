import type { Metadata } from "next";
import PdfMergeClient from "../pdf-merge/PdfMergeClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Merge PDF Files Online Free - Combine PDFs | FreeAIKit",
  description: "Merge PDF files online for free. Combine multiple PDF documents into one. Drag to reorder pages. No upload to server, runs in your browser.",
  keywords: [
    "merge pdf",
    "combine pdf",
    "merge pdf files",
    "pdf merger",
    "combine pdf files",
    "merge pdf online",
    "join pdf",
    "pdf combiner",
  ],
  openGraph: {
    title: "Merge PDF Files Online Free - Combine PDFs",
    description: "Merge PDF files online for free. Combine multiple PDF documents into one. Drag to reorder pages. No upload to server, runs in your browser.",
    url: "https://freeaikit.app/merge-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/merge-pdf",
  },
};

export default function MergePdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Merge PDF Files Online"
        description="Merge PDF files online for free. Combine multiple PDF documents into one. Drag to reorder pages. No upload to server, runs in your browser."
        slug="merge-pdf"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Merge PDF Files Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Combine multiple PDF files into one document. Drag to reorder, then download. Free, private, browser-based.
        </p>
      </div>

      <PdfMergeClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I merge PDF files?", a: "Upload your PDF files, drag to arrange them in your preferred order, then click Merge. Your combined PDF downloads automatically." },
          { q: "How many PDFs can I merge?", a: "There's no limit. Merge as many PDFs as your browser can handle. Very large merges (50+ files) may take a few seconds." },
          { q: "Can I reorder pages before merging?", a: "Yes. Drag and drop to rearrange the order of your PDF files before combining them into one document." },
          { q: "Is my data safe?", a: "Absolutely. Everything runs in your browser. Your PDF files are never uploaded to any server." },
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
