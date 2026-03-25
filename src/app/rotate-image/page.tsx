import type { Metadata } from "next";
import ImageCropClient from "../image-crop/ImageCropClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Rotate Image Online Free - Rotate Photo 90 180 270 | FreeAIKit",
  description: "Rotate images online for free. Rotate photos 90, 180, or 270 degrees. Flip horizontal or vertical. No upload, runs in your browser.",
  keywords: ["rotate image", "rotate image online", "rotate photo", "rotate picture online", "rotate image 90 degrees", "rotate jpg online free"],
  openGraph: { title: "Rotate Image Online Free", description: "Rotate images and photos for free. No upload, runs in your browser.", url: "https://freeaikit.app/rotate-image" },
  alternates: { canonical: "https://freeaikit.app/rotate-image" },
};

export default function RotateImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Rotate Image Online" description="Rotate images online for free. Rotate 90, 180, 270 degrees or flip. No upload." slug="rotate-image" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Rotate Image Online Free</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Rotate your photos 90, 180, or 270 degrees. Flip horizontal or vertical. 100% free, processed in your browser.</p>
      </div>
      <ImageCropClient />
      <RelatedTools currentSlug="image-crop" />
    </div>
  );
}
