import type { Metadata } from "next";
import PdfCompressClient from "./PdfCompressClient";

export const metadata: Metadata = {
  title: "PDF Compressor - Compress PDF Free Online | FreeAIKit",
  description:
    "Compress PDF files online for free. Reduce PDF size by up to 80% while maintaining quality. No upload, runs in your browser with Ghostscript WASM. No signup required.",
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
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PDF Compressor
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Compress PDF files up to 80% smaller. Powered by Ghostscript — the
          same engine used by professional PDF tools. 100% free, runs in your
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
            Our PDF compressor uses Ghostscript compiled to WebAssembly (WASM)
            — the same engine that powers professional PDF processing tools and
            has been the industry standard since the 1980s. It runs entirely in
            your browser, so your files never leave your device.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Ghostscript compresses PDFs by resampling embedded images to a lower
            resolution, subsetting fonts (keeping only the characters actually
            used), and optimizing internal PDF streams. The result is a
            significantly smaller file with minimal visible quality loss.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Quality Presets</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-16 flex-shrink-0">Screen</span>
              <span>72 dpi image resolution. Smallest possible file — ideal for email attachments and web sharing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-16 flex-shrink-0">eBook</span>
              <span>150 dpi image resolution. Balanced quality and size — good for on-screen reading.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-16 flex-shrink-0">Printer</span>
              <span>300 dpi image resolution. High quality for printing — still smaller than the original.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Ghostscript Engine</strong> — Industry-standard PDF processing, compiled to WASM</span>
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
              Yes. Ghostscript preserves vector text, fonts, and document structure.
              Only image resolution is reduced — text remains sharp and selectable.
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
    </div>
  );
}
