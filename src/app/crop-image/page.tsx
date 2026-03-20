import type { Metadata } from "next";
import ImageCropClient from "../image-crop/ImageCropClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Crop Image Online Free - Crop Photos Instantly | FreeAIKit",
  description: "Crop images online for free. Select custom areas, use preset aspect ratios, rotate and flip. No upload, runs in your browser.",
  keywords: [
    "crop image",
    "crop image online",
    "image cropper",
    "crop photo",
    "crop picture",
    "crop image free",
    "photo cropper",
    "crop image online free",
  ],
  openGraph: {
    title: "Crop Image Online Free - Crop Photos Instantly",
    description: "Crop images online for free. Select custom areas, use preset aspect ratios, rotate and flip. No upload, runs in your browser.",
    url: "https://freeaikit.app/crop-image",
  },
  alternates: {
    canonical: "https://freeaikit.app/crop-image",
  },
};

export default function CropImagePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Crop Image Online"
        description="Crop images online for free. Select custom areas, use preset aspect ratios, rotate and flip. No upload, runs in your browser."
        slug="crop-image"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Crop Image Online
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Crop images to any size or aspect ratio. Rotate, flip, and adjust. Free, private, instant results.
        </p>
      </div>

      <ImageCropClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I crop an image?", a: "Upload your image, drag to select the area you want to keep, and click Crop. Download your cropped image instantly." },
          { q: "Can I crop to specific aspect ratios?", a: "Yes. Choose from preset ratios like 1:1 (square), 16:9 (widescreen), 4:3, or set a custom ratio." },
          { q: "Can I also rotate images?", a: "Yes. Rotate by 90 degrees or flip horizontally/vertically alongside cropping." },
          { q: "What formats are supported?", a: "JPG, PNG, WebP, and other common image formats. Output matches your input format." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="image-crop" />
    </div>
  );
}
