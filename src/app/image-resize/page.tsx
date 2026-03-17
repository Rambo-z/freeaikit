import type { Metadata } from "next";
import ImageResizeClient from "./ImageResizeClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Image Resizer - Resize Images Online Free | FreeAIKit",
  description:
    "Resize images online for free. Set exact pixel dimensions or scale by percentage. Supports JPG, PNG, WebP. Batch processing, no upload to server.",
  keywords: [
    "image resizer", "resize image online", "resize photo", "crop image",
    "change image size", "scale image", "resize jpg", "resize png", "free image resizer",
  ],
  openGraph: {
    title: "Image Resizer - Free Online",
    description: "Resize images by pixels or percentage. Batch support. No upload.",
    url: "https://freeaikit.app/image-resize",
  },
};

export default function ImageResizePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Image Resizer" description="Resize images online for free. Set exact pixel dimensions or scale by percentage. Supports JPG, PNG, WebP. Batch processing, no upload to server." slug="image-resize" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Image Resizer
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Resize JPG, PNG, and WebP images by exact pixel dimensions or
          percentage. Batch support. 100% free, runs in your browser.
        </p>
      </div>

      <ImageResizeClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          How to Resize Images Online
        </h2>
        <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
          <p>
            Upload one or more images, set your target dimensions (pixels or
            percentage), choose output format and quality, then click
            <strong> Resize All</strong>. Each image is processed instantly in
            your browser — nothing is uploaded to a server.
          </p>
          <p>
            The <strong>lock ratio</strong> button keeps the aspect ratio when
            you change the width. Toggle it off to set width and height
            independently.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <h2 className="text-xl font-bold">FAQ</h2>
          {[
            { q: "What image formats are supported?", a: "JPG, PNG, WebP, GIF, BMP as input. Output can be JPEG, PNG, or WebP." },
            { q: "Is there a file size or resolution limit?", a: "No server-side limit. Very large images (8000×8000px+) may be slow on older devices." },
            { q: "Does resizing reduce quality?", a: "JPEG and WebP use lossy compression — you can set the quality level (10–100%). PNG is lossless." },
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
