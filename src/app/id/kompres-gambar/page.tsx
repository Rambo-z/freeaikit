import type { Metadata } from "next";
import ImageCompressClient from "../../image-compress/ImageCompressClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Kompres Gambar Online Gratis - Perkecil Ukuran JPG PNG | FreeAIKit",
  description: "Kompres gambar online gratis. Perkecil ukuran file JPG, PNG dan WebP hingga 80% tanpa kehilangan kualitas. Tanpa upload, semua di browser kamu.",
  keywords: ["kompres gambar", "kompres gambar online", "perkecil ukuran foto", "kompres jpg", "kompres png", "kompres foto online gratis"],
  openGraph: { title: "Kompres Gambar Online Gratis", description: "Kompres gambar JPG, PNG dan WebP gratis. Semua di browser, tanpa upload file.", url: "https://freeaikit.app/id/kompres-gambar" },
  alternates: { canonical: "https://freeaikit.app/id/kompres-gambar", languages: { en: "https://freeaikit.app/image-compress", id: "https://freeaikit.app/id/kompres-gambar", "x-default": "https://freeaikit.app/image-compress" } },
};

export default function KompresGambarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Kompres Gambar Online" description="Kompres gambar online gratis. Perkecil ukuran file JPG, PNG dan WebP hingga 80% tanpa kehilangan kualitas." slug="id/kompres-gambar" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Kompres Gambar Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Perkecil ukuran gambar hingga 80% dengan kualitas visual tetap terjaga. 100% gratis, berjalan di browser kamu. File tidak pernah keluar dari perangkatmu.</p>
      </div>
      <ImageCompressClient />
      <RelatedTools currentSlug="image-compress" />
    </div>
  );
}
