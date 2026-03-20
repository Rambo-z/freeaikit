import type { Metadata } from "next";
import ImageResizeClient from "../image-resize/ImageResizeClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Resize Image Online Free - Change Image Dimensions | FreeAIKit",
  description: "Resize images online for free. Change dimensions by pixels or percentage. Maintain aspect ratio. Batch resize supported. No upload, browser-based.",
  keywords: [
    "resize image",
    "resize image online",
    "image resizer",
    "resize photo",
    "change image size",
    "resize image free",
    "resize picture",
    "resize image pixels",
  ],
  openGraph: {
    title: "Resize Image Online Free - Change Image Dimensions",
    description: "Resize images online for free. Change dimensions by pixels or percentage. Maintain aspect ratio. Batch resize supported. No upload, browser-based.",
    url: "https://freeaikit.app/resize-image",
  },
  alternates: {
    canonical: "https://freeaikit.app/resize-image",
  },
};

export default function ResizeImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Resize Image Online"
        description="Resize images online for free. Change dimensions by pixels or percentage. Maintain aspect ratio. Batch resize supported. No upload, browser-based."
        slug="resize-image"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Resize Image Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Change image dimensions instantly. Resize by pixels or percentage with aspect ratio lock. Free, private, batch support.
        </p>
      </div>

      <ImageResizeClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I resize an image?", a: "Upload your image, enter the desired width and height (or percentage), and click Resize. Download your resized image instantly." },
          { q: "Can I maintain the aspect ratio?", a: "Yes. Lock the aspect ratio to prevent distortion. Change one dimension and the other adjusts automatically." },
          { q: "What formats are supported?", a: "JPG, PNG, WebP, GIF, and BMP. Output in your preferred format." },
          { q: "Can I resize multiple images at once?", a: "Yes. Upload multiple images and resize them all to the same dimensions in one batch." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="image-resize" />
    </div>
  );
}
