import type { Metadata } from "next";
import PdfCompressClient from "./PdfCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF Compressor - Compress PDF Free Online | FreeAIKit",
  description:
    "Compress PDF files online for free. Reduce PDF size by up to 80% while maintaining quality. No upload, runs entirely in your browser. No signup required.",
  keywords: [
    "pdf compressor",
    "compress pdf",
    "reduce pdf size",
    "pdf file size reducer",
    "compress pdf online",
    "free pdf compressor",
    "pdf optimizer",
    "shrink pdf",
  ],
  openGraph: {
    title: "PDF Compressor - Compress PDF Free Online",
    description:
      "Compress PDF files online for free. No upload to server, runs in your browser.",
    url: "https://freeaikit.app/pdf-compress",
  },
};

export default function PdfCompressPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="PDF Compressor" description="Compress PDF files online for free. Reduce PDF size by up to 80% while maintaining quality. No upload, runs entirely in your browser. No signup required." slug="pdf-compress" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PDF Compressor
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Compress PDF files up to 80% smaller. Powered by PDF.js — renders
          each page at your chosen quality level. 100% free, runs in your
          browser.
        </p>
      </div>

      <PdfCompressClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          How Does PDF Compression Work?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            Our PDF compressor uses PDF.js to render each page at your chosen
            resolution, then recompresses it as a high-quality JPEG image inside
            a new PDF. It runs entirely in your browser — your files never leave
            your device.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            This approach is especially effective for image-heavy PDFs such as
            presentations, brochures, and scanned documents. Choose Screen for
            maximum compression, eBook for a balanced result, or Printer for
            high-fidelity output.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Quality Presets</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-16 flex-shrink-0">Screen</span>
              <span>72 dpi image resolution. Smallest possible file — ideal for email attachments and web sharing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-16 flex-shrink-0">eBook</span>
              <span>120 dpi image resolution. Balanced quality and size — good for on-screen reading.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-16 flex-shrink-0">Printer</span>
              <span>200 dpi image resolution. High quality for printing — still smaller than the original.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>PDF.js Rendering</strong> — Mozilla&apos;s battle-tested PDF engine, runs locally</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>3 Quality Presets</strong> — Screen, eBook, and Printer modes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Batch Processing</strong> — Compress multiple PDFs at once</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Privacy First</strong> — Files never leave your device</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">How much can PDF files be compressed?</h3>
            <p className="text-gray-600 text-sm">
              It depends on the content. PDFs with many images can be reduced by
              50–80%. PDFs with mostly text may see 10–30% reduction. If a PDF is
              already optimized, the tool will keep the original file.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Will the text still be selectable after compression?</h3>
            <p className="text-gray-600 text-sm">
              Pages are rendered as images, so the output is visually identical
              but text is no longer selectable. This trade-off enables
              significantly smaller files.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Which preset should I use?</h3>
            <p className="text-gray-600 text-sm">
              For email and web: Screen. For reading on tablets/computers: eBook.
              For printing: Printer. eBook is recommended for most use cases.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Is there a file size limit?</h3>
            <p className="text-gray-600 text-sm">
              No server-side limit. Everything runs in your browser. Large files
              (100MB+) may take 10–30 seconds depending on your device.
            </p>
          </div>
        </div>
      </section>
      <RelatedTools currentSlug="pdf-compress" />
    </div>
  );
}
