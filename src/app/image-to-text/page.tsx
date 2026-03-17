import type { Metadata } from "next";
import ImageToTextClient from "./ImageToTextClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Image to Text (OCR) - Free Online | FreeAIKit",
  description:
    "Extract text from images using OCR. Supports 100+ languages, screenshots, photos, scanned documents. Free, instant, runs in your browser.",
  keywords: ["image to text", "ocr online", "extract text from image", "photo to text", "image ocr", "text recognition", "ocr free", "screenshot to text"],
  openGraph: {
    title: "Image to Text (OCR) - Free Online",
    description: "Extract text from images with OCR. 100+ languages. Free and private.",
    url: "https://freeaikit.app/image-to-text",
  },
};

export default function ImageToTextPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Image to Text (OCR)" description="Extract text from images using OCR. Supports 100+ languages, screenshots, photos, scanned documents. Free, instant, runs in your browser." slug="image-to-text" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Image to Text (OCR)
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Extract text from images using OCR. Supports 100+ languages,
          screenshots, photos, and scanned documents. Free, in-browser.
        </p>
      </div>
      <ImageToTextClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is OCR?",
            a: "OCR (Optical Character Recognition) is a technology that recognizes text within images. It can extract printed or handwritten text from photos, screenshots, scanned documents, and PDFs.",
          },
          {
            q: "Which languages are supported?",
            a: "Over 100 languages are supported including English, Chinese, Japanese, Korean, Spanish, French, German, Arabic, Hindi, and more. Select your language before processing for best results.",
          },
          {
            q: "Is my image uploaded to a server?",
            a: "No. All OCR processing runs entirely in your browser using Tesseract.js (WebAssembly). Your image never leaves your device. The OCR engine data is downloaded once and cached.",
          },
          {
            q: "How accurate is the OCR?",
            a: "Accuracy depends on image quality. Clear, high-resolution images with good contrast produce the best results. Handwritten text, unusual fonts, or low-quality images may have lower accuracy.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="image-to-text" />
    </div>
  );
}
