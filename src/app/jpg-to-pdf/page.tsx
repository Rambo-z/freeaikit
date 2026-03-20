import type { Metadata } from "next";
import ImageToPdfClient from "../image-to-pdf/ImageToPdfClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "JPG to PDF Converter - Convert JPG to PDF Free Online | FreeAIKit",
  description: "Convert JPG to PDF online for free. Combine multiple JPG images into one PDF document. Choose page size and orientation. No upload to server, runs in browser.",
  keywords: [
    "jpg to pdf",
    "convert jpg to pdf",
    "jpg to pdf converter",
    "jpeg to pdf",
    "jpg to pdf free",
    "convert jpeg to pdf",
    "jpg to pdf online",
    "photo to pdf",
  ],
  openGraph: {
    title: "JPG to PDF Converter - Convert JPG to PDF Free Online",
    description: "Convert JPG to PDF online for free. Combine multiple JPG images into one PDF document. Choose page size and orientation. No upload to server, runs in browser.",
    url: "https://freeaikit.app/jpg-to-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/jpg-to-pdf",
  },
};

export default function JpgToPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="JPG to PDF Converter"
        description="Convert JPG to PDF online for free. Combine multiple JPG images into one PDF document. Choose page size and orientation. No upload to server, runs in browser."
        slug="jpg-to-pdf"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          JPG to PDF Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert your JPG images to PDF instantly. Combine multiple JPGs into one document. Free, private, runs entirely in your browser.
        </p>
      </div>

      <ImageToPdfClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert JPG to PDF?", a: "Upload your JPG images, arrange them in order, choose page size and orientation, then click Convert. Your PDF downloads instantly." },
          { q: "Can I combine multiple JPGs into one PDF?", a: "Yes. Upload as many JPG images as you need, drag to reorder, and convert them all into a single PDF document." },
          { q: "Is the JPG quality preserved?", a: "Yes. JPG images are embedded at 95% quality — visually identical to the original. No noticeable quality loss." },
          { q: "Does this work with JPEG files too?", a: "Yes. JPG and JPEG are the same format. This tool also supports PNG, WebP, GIF, and BMP images." },
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
