import type { Metadata } from "next";
import ImageCompressClient from "../image-compress/ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Compress GIF Online Free - Reduce GIF File Size | FreeAIKit",
  description: "Compress GIF files online for free. Reduce GIF file size without losing animation quality. No upload, everything runs in your browser.",
  keywords: ["compress gif", "compress gif online", "reduce gif size", "gif compressor", "gif compressor online free", "shrink gif file"],
  openGraph: { title: "Compress GIF Online Free", description: "Compress GIF files for free. Reduce file size without losing quality.", url: "https://freeaikit.app/compress-gif" },
  alternates: { canonical: "https://freeaikit.app/compress-gif" },
};

export default function CompressGifPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Compress GIF Online" description="Compress GIF files online for free. Reduce GIF file size without losing animation quality." slug="compress-gif" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Compress GIF Online Free</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Reduce your GIF file size while keeping the animation quality. 100% free, processed entirely in your browser.</p>
      </div>
      <ImageCompressClient />
      <RelatedTools currentSlug="image-compress" />
    </div>
  );
}
