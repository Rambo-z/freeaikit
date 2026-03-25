import type { Metadata } from "next";
import GifMakerClient from "../gif-maker/GifMakerClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Make a GIF Online Free - Create Animated GIF from Images | FreeAIKit",
  description: "Make a GIF online for free. Create animated GIFs from images with custom frame delay and size. No upload, everything runs in your browser.",
  keywords: ["make a gif", "make gif online", "create gif", "gif maker free", "animated gif maker", "make gif from images", "create animated gif online"],
  openGraph: { title: "Make a GIF Online Free", description: "Create animated GIFs from images for free. No upload, runs in your browser.", url: "https://freeaikit.app/make-gif" },
  alternates: { canonical: "https://freeaikit.app/make-gif" },
};

export default function MakeGifPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Make a GIF Online" description="Make animated GIFs from images online for free. No upload, runs in your browser." slug="make-gif" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Make a GIF Online Free</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Create animated GIFs from your images. Set custom frame delays, adjust size, and download your GIF. 100% free, runs in your browser.</p>
      </div>
      <GifMakerClient />
      <RelatedTools currentSlug="gif-maker" />
    </div>
  );
}
