import type { Metadata } from "next";
import ImageToPdfClient from "../../image-to-pdf/ImageToPdfClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Ubah Gambar ke PDF Online Gratis - JPG ke PDF | FreeAIKit",
  description: "Konversi gambar ke PDF online gratis. Ubah JPG, PNG ke file PDF. Tanpa upload ke server, semua diproses di browser.",
  keywords: ["gambar ke pdf", "jpg ke pdf", "konversi gambar ke pdf", "ubah foto ke pdf", "jpg to pdf gratis", "png ke pdf online"],
  openGraph: { title: "Ubah Gambar ke PDF Online Gratis", description: "Konversi gambar ke PDF gratis. Semua di browser.", url: "https://freeaikit.app/id/gambar-ke-pdf" },
  alternates: { canonical: "https://freeaikit.app/id/gambar-ke-pdf", languages: { en: "https://freeaikit.app/image-to-pdf", id: "https://freeaikit.app/id/gambar-ke-pdf", "x-default": "https://freeaikit.app/image-to-pdf" } },
};

export default function GambarKePdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Ubah Gambar ke PDF" description="Konversi gambar ke PDF online gratis. Tanpa upload, semua di browser." slug="id/gambar-ke-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Ubah Gambar ke PDF Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Konversi gambar JPG dan PNG ke file PDF. 100% gratis, diproses di browser kamu.</p>
      </div>
      <ImageToPdfClient />
      <RelatedTools currentSlug="image-to-pdf" />
    </div>
  );
}
