import type { Metadata } from "next";
import ImageFiltersClient from "./ImageFiltersClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Image Filters & Effects - Free Online | FreeAIKit",
  description:
    "Apply filters to photos online: brightness, contrast, saturation, blur, grayscale, sepia, hue. Real-time preview, download full-resolution result. Free, no upload.",
  keywords: ["image filters online", "photo effects", "brightness contrast", "grayscale filter", "sepia filter", "image editor online", "photo filter free"],
  openGraph: {
    title: "Image Filters & Effects - Free Online",
    description: "Apply brightness, contrast, saturation, sepia and more filters to images. Free, real-time.",
    url: "https://freeaikit.app/image-filters",
  },
};

export default function ImageFiltersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Image Filters & Effects" description="Apply filters to photos online: brightness, contrast, saturation, blur, grayscale, sepia, hue. Real-time preview, download full-resolution result. Free, no upload." slug="image-filters" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Image Filters & Effects
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Adjust brightness, contrast, saturation, blur, grayscale and more.
          Real-time preview. Download at full resolution. Free and private.
        </p>
      </div>
      <ImageFiltersClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "Does applying filters reduce image quality?",
            a: "The filters are applied to the original full-resolution image and exported as JPEG at 92% quality. The display preview uses CSS filter for real-time performance, while the download uses the Canvas API for full-res rendering.",
          },
          {
            q: "Can I reset filters back to the original?",
            a: "Yes. Click the 'Original' preset or drag all sliders back to their default positions. The original file is kept in memory for the duration of your session.",
          },
          {
            q: "What filters are available?",
            a: "Brightness, Contrast, Saturation, Blur, Grayscale, Sepia, and Hue Rotate. You can combine them freely, or use quick presets like Vintage, Vivid, Cool, and Dark.",
          },
          {
            q: "Is my image uploaded to a server?",
            a: "No. All filter processing happens in your browser using the HTML5 Canvas API. Your image is never sent to any server.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="image-filters" />
    </div>
  );
}
