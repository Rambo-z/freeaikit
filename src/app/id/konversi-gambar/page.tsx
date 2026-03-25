import type { Metadata } from "next";
import ImageConvertClient from "../../image-convert/ImageConvertClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Konversi Format Gambar Online Gratis - JPG PNG WebP | FreeAIKit",
  description: "Konversi format gambar online gratis. Ubah antara JPG, PNG dan WebP. Tanpa upload ke server, semua diproses di browser.",
  keywords: ["konversi gambar", "ubah format gambar", "jpg ke png", "png ke jpg", "konversi foto online", "ubah format foto gratis"],
  openGraph: { title: "Konversi Format Gambar Online Gratis", description: "Konversi format gambar gratis. Semua di browser.", url: "https://freeaikit.app/id/konversi-gambar" },
  alternates: { canonical: "https://freeaikit.app/id/konversi-gambar", languages: { en: "https://freeaikit.app/image-convert", id: "https://freeaikit.app/id/konversi-gambar", "x-default": "https://freeaikit.app/image-convert" } },
};

export default function KonversiGambarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Konversi Format Gambar" description="Konversi format gambar online gratis. Ubah antara JPG, PNG dan WebP." slug="id/konversi-gambar" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Konversi Format Gambar Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Ubah format gambar antara JPG, PNG dan WebP. 100% gratis, diproses di browser kamu.</p>
      </div>
      <ImageConvertClient />
      <RelatedTools currentSlug="image-convert" />
    </div>
  );
}
