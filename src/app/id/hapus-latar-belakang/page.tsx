import type { Metadata } from "next";
import BgRemoverClient from "../../bg-remover/BgRemoverClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Hapus Background Foto Online Gratis - Remove Background | FreeAIKit",
  description: "Hapus latar belakang foto online gratis menggunakan AI. Tanpa upload ke server, semua diproses di browser kamu. Hasil transparan PNG.",
  keywords: ["hapus background foto", "hapus latar belakang", "remove background online", "hapus bg foto", "background remover gratis", "edit foto hapus background"],
  openGraph: { title: "Hapus Background Foto Online Gratis", description: "Hapus latar belakang foto gratis dengan AI. Semua di browser, tanpa upload.", url: "https://freeaikit.app/id/hapus-latar-belakang" },
  alternates: { canonical: "https://freeaikit.app/id/hapus-latar-belakang", languages: { en: "https://freeaikit.app/bg-remover", id: "https://freeaikit.app/id/hapus-latar-belakang", "x-default": "https://freeaikit.app/bg-remover" } },
};

export default function HapusLatarBelakangPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Hapus Background Foto Online" description="Hapus latar belakang foto online gratis menggunakan AI. Tanpa upload, semua di browser." slug="id/hapus-latar-belakang" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Hapus Background Foto Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Hapus latar belakang foto secara otomatis dengan AI. 100% gratis, diproses di browser kamu. File tidak pernah diunggah ke server.</p>
      </div>
      <BgRemoverClient />
      <RelatedTools currentSlug="bg-remover" />
    </div>
  );
}
