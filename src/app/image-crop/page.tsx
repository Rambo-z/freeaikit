import type { Metadata } from "next";
import ImageCropClient from "./ImageCropClient";

export const metadata: Metadata = {
  title: "Image Crop & Rotate - Free Online | FreeAIKit",
  description:
    "Crop images to any size or aspect ratio. Rotate 90°/180°/270°, flip horizontally or vertically. Free ratio presets: 1:1, 4:3, 16:9. Download full-resolution result.",
  keywords: ["image crop", "crop image online", "rotate image", "flip image", "image cropper", "free image crop tool", "crop photo online"],
  openGraph: {
    title: "Image Crop & Rotate - Free Online",
    description: "Crop, rotate and flip images for free. No upload to server, runs in browser.",
    url: "https://freeaikit.app/image-crop",
  },
};

export default function ImageCropPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Image Crop & Rotate
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Crop to any size or aspect ratio. Rotate and flip. Download at full
          resolution. Free, private — your image never leaves your browser.
        </p>
      </div>
      <ImageCropClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "Does cropping reduce image quality?",
            a: "No. The crop is exported at the full original resolution of the cropped area. Only the pixels outside the selection are removed — the remaining pixels are untouched.",
          },
          {
            q: "What aspect ratio presets are available?",
            a: "Free (no constraint), 1:1 (square), 4:3, 16:9, 3:4, and 9:16. You can also drag freely to any custom crop.",
          },
          {
            q: "What format is the downloaded file?",
            a: "Downloads are exported as PNG to preserve full quality. PNG supports transparency, so images with transparent backgrounds are handled correctly.",
          },
          {
            q: "Is my image uploaded to a server?",
            a: "No. All cropping and rotation happens in your browser using the Canvas API. Your image never leaves your device.",
          },
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
