import type { Metadata } from "next";
import PdfToImagesClient from "../../pdf-to-images/PdfToImagesClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Ubah PDF ke Gambar Online Gratis - PDF ke JPG | FreeAIKit",
  description: "Konversi PDF ke gambar JPG/PNG online gratis. Tanpa upload ke server, semua diproses di browser kamu.",
  keywords: ["pdf ke gambar", "pdf ke jpg", "konversi pdf ke gambar", "pdf to jpg gratis", "pdf ke png online"],
  openGraph: { title: "Ubah PDF ke Gambar Online Gratis", description: "Konversi PDF ke gambar gratis. Semua di browser.", url: "https://freeaikit.app/id/pdf-ke-gambar" },
  alternates: { canonical: "https://freeaikit.app/id/pdf-ke-gambar", languages: { en: "https://freeaikit.app/pdf-to-images", id: "https://freeaikit.app/id/pdf-ke-gambar", "x-default": "https://freeaikit.app/pdf-to-images" } },
};

export default function PdfKeGambarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Ubah PDF ke Gambar" description="Konversi PDF ke gambar JPG/PNG online gratis. Tanpa upload, semua di browser." slug="id/pdf-ke-gambar" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Ubah PDF ke Gambar Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Konversi halaman PDF ke gambar JPG atau PNG. 100% gratis, diproses di browser kamu.</p>
      </div>
      <PdfToImagesClient />
      <RelatedTools currentSlug="pdf-to-images" />
    </div>
  );
}
