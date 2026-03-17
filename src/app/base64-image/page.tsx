import type { Metadata } from "next";
import Base64ImageClient from "./Base64ImageClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Base64 Image Encoder/Decoder - Free Online | FreeAIKit",
  description:
    "Convert images to Base64 strings and decode Base64 back to images. Supports PNG, JPG, WebP, SVG. Copy data URLs for use in HTML/CSS/JS. Free, no upload to server.",
  keywords: ["base64 image encoder", "image to base64", "base64 to image", "base64 decoder", "convert image base64", "data url generator", "base64 png"],
  openGraph: {
    title: "Base64 Image Encoder/Decoder - Free Online",
    description: "Convert images to Base64 or decode Base64 back to images instantly.",
    url: "https://freeaikit.app/base64-image",
  },
};

export default function Base64ImagePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Base64 Image Encoder/Decoder" description="Convert images to Base64 strings and decode Base64 back to images. Supports PNG, JPG, WebP, SVG. Copy data URLs for use in HTML/CSS/JS. Free, no upload to server." slug="base64-image" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Base64 Image Encoder / Decoder</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert images to Base64 data URLs for embedding in HTML, CSS, or
          JavaScript. Decode Base64 strings back to images. Free, instant, runs
          in your browser.
        </p>
      </div>
      <Base64ImageClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "What is Base64 encoding?", a: "Base64 encodes binary data (like an image file) as a plain text string. This lets you embed images directly in HTML/CSS/JS without a separate file request." },
          { q: "How do I use a Base64 image in HTML?", a: 'Use it as an img src: <img src="data:image/png;base64,..." />. Or as a CSS background: background-image: url(\'data:image/png;base64,...\').' },
          { q: "Will Base64 images load slower?", a: "Base64 images are ~33% larger than their binary counterparts and can't be cached separately. Use them for small icons or inline critical images — not for large photos." },
          { q: "What formats are supported?", a: "Any image format your browser supports: PNG, JPG, WebP, SVG, GIF, BMP, etc." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="base64-image" />
    </div>
  );
}
