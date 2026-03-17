import type { Metadata } from "next";
import ImageToPdfClient from "./ImageToPdfClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Image to PDF Converter - Free Online | FreeAIKit",
  description:
    "Convert JPG, PNG, WebP images to PDF online for free. Combine multiple images into one PDF. Choose page size, orientation, and margin. No upload to server.",
  keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert image to pdf", "combine images to pdf", "photos to pdf", "free image to pdf"],
  openGraph: {
    title: "Image to PDF Converter - Free Online",
    description: "Convert or combine images into a PDF. No upload, runs in your browser.",
    url: "https://freeaikit.app/image-to-pdf",
  },
};

export default function ImageToPdfPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Image to PDF Converter" description="Convert JPG, PNG, WebP images to PDF online for free. Combine multiple images into one PDF. Choose page size, orientation, and margin. No upload to server." slug="image-to-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Image to PDF</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert JPG, PNG, or WebP images to a PDF file. Combine multiple
          images into one document. Free, instant, runs in your browser.
        </p>
      </div>
      <ImageToPdfClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "Can I combine multiple images into one PDF?", a: "Yes. Upload as many images as you like, drag to reorder, and click Convert to PDF." },
          { q: "Which image formats are supported?", a: "JPG, PNG, WebP, GIF, BMP. All are converted to an embedded image on each PDF page." },
          { q: "Will the image quality change?", a: "PNG images are embedded losslessly. JPG/WebP are re-encoded at 95% quality — visually identical to the original." },
          { q: "Is there a file size limit?", a: "No server-side limit. Everything runs in your browser." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="image-to-pdf" />
    </div>
  );
}
