import type { Metadata } from "next";
import PdfCompressClient from "../pdf-compress/PdfCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Compress PDF Online Free - Reduce PDF File Size | FreeAIKit",
  description: "Compress PDF files online for free. Reduce PDF file size by up to 80% without losing quality. No upload to server, 100% browser-based. No signup needed.",
  keywords: [
    "compress pdf",
    "compress pdf online",
    "compress pdf free",
    "reduce pdf file size",
    "pdf size reducer",
    "compress pdf without losing quality",
    "make pdf smaller",
    "shrink pdf file",
  ],
  openGraph: {
    title: "Compress PDF Online Free - Reduce PDF File Size",
    description: "Compress PDF files online for free. Reduce PDF file size by up to 80% without losing quality. No upload to server, 100% browser-based. No signup needed.",
    url: "https://freeaikit.app/compress-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/compress-pdf",
  },
};

export default function CompressPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Compress PDF Online"
        description="Compress PDF files online for free. Reduce PDF file size by up to 80% without losing quality. No upload to server, 100% browser-based. No signup needed."
        slug="compress-pdf"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Compress PDF Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Reduce your PDF file size by up to 80% instantly. Free, private, no upload required — everything runs in your browser.
        </p>
      </div>

      <PdfCompressClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I compress a PDF file?", a: "Upload your PDF, choose a quality preset (Screen, eBook, or Printer), and click Compress. Your compressed PDF downloads automatically. No account needed." },
          { q: "Is it safe to compress PDF online?", a: "Yes. FreeAIKit processes everything in your browser. Your PDF files never leave your device — no server upload, no data collection." },
          { q: "How much can I compress a PDF?", a: "Image-heavy PDFs (presentations, scans) typically shrink 50-80%. Text-heavy PDFs see 10-30% reduction. Results depend on content type." },
          { q: "Will compressing a PDF reduce quality?", a: "Screen mode prioritizes small size, eBook balances size and quality, Printer keeps high fidelity. Choose based on your needs." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="pdf-compress" />
    </div>
  );
}
