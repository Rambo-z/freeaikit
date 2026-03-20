import type { Metadata } from "next";
import ImageToPdfClient from "../image-to-pdf/ImageToPdfClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PNG to PDF Converter - Convert PNG to PDF Free Online | FreeAIKit",
  description: "Convert PNG to PDF online for free. Combine multiple PNG images into one PDF. Lossless quality. No upload to server, runs in your browser.",
  keywords: [
    "png to pdf",
    "convert png to pdf",
    "png to pdf converter",
    "png to pdf free",
    "png to pdf online",
    "combine png to pdf",
  ],
  openGraph: {
    title: "PNG to PDF Converter - Convert PNG to PDF Free Online",
    description: "Convert PNG to PDF online for free. Combine multiple PNG images into one PDF. Lossless quality. No upload to server, runs in your browser.",
    url: "https://freeaikit.app/png-to-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/png-to-pdf",
  },
};

export default function PngToPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="PNG to PDF Converter"
        description="Convert PNG to PDF online for free. Combine multiple PNG images into one PDF. Lossless quality. No upload to server, runs in your browser."
        slug="png-to-pdf"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PNG to PDF Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert PNG images to PDF with lossless quality. Combine multiple PNGs into one document. Free, private, browser-based.
        </p>
      </div>

      <ImageToPdfClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert PNG to PDF?", a: "Upload your PNG images, arrange them in order, choose page settings, and click Convert. Your PDF downloads instantly." },
          { q: "Is the PNG quality preserved?", a: "Yes. PNG images are embedded losslessly in the PDF — pixel-perfect quality, no compression artifacts." },
          { q: "Can I combine multiple PNGs?", a: "Yes. Upload multiple PNG files, drag to reorder, and combine them all into a single PDF document." },
          { q: "Does it support transparent PNGs?", a: "PNG transparency is preserved in the PDF. The transparent areas will appear as white in the PDF." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="image-to-pdf" />
    </div>
  );
}
