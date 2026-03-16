import type { Metadata } from "next";
import PdfToImagesClient from "./PdfToImagesClient";

export const metadata: Metadata = {
  title: "PDF to Image Converter - PDF to JPG/PNG Free | FreeAIKit",
  description:
    "Convert PDF pages to JPG or PNG images online for free. Choose resolution (72–300 DPI) and quality. No upload to server, runs in your browser.",
  keywords: ["pdf to image", "pdf to jpg", "pdf to png", "convert pdf to image", "pdf page to image", "extract images from pdf", "free pdf to jpg"],
  openGraph: {
    title: "PDF to Image Converter - Free Online",
    description: "Convert PDF pages to JPG or PNG. No upload, runs in your browser.",
    url: "https://freeaikit.app/pdf-to-images",
  },
};

export default function PdfToImagesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">PDF to Images</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert every page of a PDF into a JPG or PNG image. Choose your
          resolution and quality. Free, instant, runs in your browser.
        </p>
      </div>
      <PdfToImagesClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "What resolution should I choose?", a: "72 DPI for web preview, 150 DPI for general use, 300 DPI for print-quality images." },
          { q: "Is there a page limit?", a: "No server-side limit. Large PDFs (100+ pages) will take longer but will complete." },
          { q: "Can I download all pages at once?", a: "Yes — click Download All to download every page as a separate image file." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
