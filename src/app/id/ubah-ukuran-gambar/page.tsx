import type { Metadata } from "next";
import ImageResizeClient from "../../image-resize/ImageResizeClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Ubah Ukuran Gambar Online Gratis - Resize Foto | FreeAIKit",
  description: "Ubah ukuran gambar online gratis. Resize foto JPG, PNG dengan mudah. Tanpa upload ke server, semua diproses di browser.",
  keywords: ["ubah ukuran gambar", "resize foto online", "perkecil gambar", "resize gambar gratis", "ubah resolusi foto", "resize foto online gratis"],
  openGraph: { title: "Ubah Ukuran Gambar Online Gratis", description: "Resize gambar gratis. Semua di browser.", url: "https://freeaikit.app/id/ubah-ukuran-gambar" },
  alternates: { canonical: "https://freeaikit.app/id/ubah-ukuran-gambar", languages: { en: "https://freeaikit.app/image-resize", id: "https://freeaikit.app/id/ubah-ukuran-gambar", "x-default": "https://freeaikit.app/image-resize" } },
};

export default function UbahUkuranGambarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Ubah Ukuran Gambar" description="Ubah ukuran gambar online gratis. Resize foto dengan mudah. Tanpa upload." slug="id/ubah-ukuran-gambar" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Ubah Ukuran Gambar Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Resize gambar JPG dan PNG dengan mudah. 100% gratis, diproses di browser kamu.</p>
      </div>
      <ImageResizeClient />
      <RelatedTools currentSlug="image-resize" />
    </div>
  );
}
