import type { Metadata } from "next";
import ImageCropClient from "../image-crop/ImageCropClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Flip Image Online Free - Mirror Photo Horizontal Vertical | FreeAIKit",
  description: "Flip images online for free. Mirror photos horizontally or vertically. No upload, everything runs in your browser.",
  keywords: ["flip image", "flip image online", "mirror image", "flip photo", "mirror photo online", "flip image horizontal", "flip image vertical"],
  openGraph: { title: "Flip Image Online Free", description: "Flip and mirror images for free. No upload, runs in your browser.", url: "https://freeaikit.app/flip-image" },
  alternates: { canonical: "https://freeaikit.app/flip-image" },
};

export default function FlipImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Flip Image Online" description="Flip and mirror images online for free. No upload, runs in your browser." slug="flip-image" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Flip Image Online Free</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Mirror your photos horizontally or vertically. 100% free, processed entirely in your browser.</p>
      </div>
      <ImageCropClient />
      <RelatedTools currentSlug="image-crop" />
    </div>
  );
}
