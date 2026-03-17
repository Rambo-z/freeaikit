import type { Metadata } from "next";
import ImageWatermarkClient from "./ImageWatermarkClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Image Watermark Tool - Add Text Watermark to Photos Free | FreeAIKit",
  description:
    "Add text watermarks to images for free. Customize font size, color, opacity, position, and rotation. Single or tiled repeat mode. Download as PNG. No upload to server.",
  keywords: ["add watermark to image", "image watermark online", "watermark photo free", "text watermark", "watermark tool", "add text to image", "photo watermark maker"],
  openGraph: {
    title: "Image Watermark Tool - Free Online",
    description: "Add customizable text watermarks to any image. Single or tiled. No upload needed.",
    url: "https://freeaikit.app/image-watermark",
  },
};

export default function ImageWatermarkPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Image Watermark Tool" description="Add text watermarks to images for free. Customize font size, color, opacity, position, and rotation. Single or tiled repeat mode. Download as PNG. No upload to server." slug="image-watermark" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Image Watermark</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Add text watermarks to your photos. Customize position, size, color,
          opacity, and rotation. Choose single placement or full-tile repeat mode.
          Free, instant, runs in your browser.
        </p>
      </div>
      <ImageWatermarkClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "Will the watermark reduce image quality?", a: "The watermark is applied to a full-resolution canvas. The download is a lossless PNG, so there is no quality loss from compression." },
          { q: "Can I use a logo or image as a watermark?", a: "Currently only text watermarks are supported. Image watermark support is planned." },
          { q: "What does 'Repeat (Tiled)' mode do?", a: "It tiles the watermark text across the entire image in a repeating diagonal pattern — commonly used for copyright protection." },
          { q: "Is my image uploaded anywhere?", a: "No. Everything runs in your browser. Your image never leaves your device." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="image-watermark" />
    </div>
  );
}
