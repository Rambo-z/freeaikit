import type { Metadata } from "next";
import ImageToTextClient from "../../image-to-text/ImageToTextClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "OCR Gambar ke Teks Online Gratis - Ekstrak Teks dari Foto | FreeAIKit",
  description: "Ekstrak teks dari gambar online gratis menggunakan OCR. Konversi foto ke teks. Tanpa upload ke server, semua diproses di browser.",
  keywords: ["ocr online", "gambar ke teks", "ekstrak teks dari gambar", "foto ke teks", "ocr gratis", "baca teks dari gambar"],
  openGraph: { title: "OCR Gambar ke Teks Online Gratis", description: "Ekstrak teks dari gambar gratis dengan OCR. Semua di browser.", url: "https://freeaikit.app/id/gambar-ke-teks" },
  alternates: { canonical: "https://freeaikit.app/id/gambar-ke-teks", languages: { en: "https://freeaikit.app/image-to-text", id: "https://freeaikit.app/id/gambar-ke-teks", "x-default": "https://freeaikit.app/image-to-text" } },
};

export default function GambarKeTeksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="OCR Gambar ke Teks" description="Ekstrak teks dari gambar online gratis menggunakan OCR. Tanpa upload, semua di browser." slug="id/gambar-ke-teks" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">OCR Gambar ke Teks Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Ekstrak teks dari gambar dan foto menggunakan OCR. 100% gratis, diproses di browser kamu.</p>
      </div>
      <ImageToTextClient />
      <RelatedTools currentSlug="image-to-text" />
    </div>
  );
}
