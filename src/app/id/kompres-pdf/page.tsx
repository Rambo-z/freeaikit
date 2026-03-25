import type { Metadata } from "next";
import PdfCompressClient from "../../pdf-compress/PdfCompressClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Kompres PDF Online Gratis - Perkecil Ukuran PDF | FreeAIKit",
  description: "Kompres file PDF online gratis. Perkecil ukuran PDF tanpa kehilangan kualitas. Tanpa upload ke server, semua di browser.",
  keywords: ["kompres pdf", "kompres pdf online", "perkecil ukuran pdf", "compress pdf gratis", "kompres file pdf", "mengecilkan pdf"],
  openGraph: { title: "Kompres PDF Online Gratis", description: "Kompres file PDF gratis. Semua di browser, tanpa upload.", url: "https://freeaikit.app/id/kompres-pdf" },
  alternates: { canonical: "https://freeaikit.app/id/kompres-pdf", languages: { en: "https://freeaikit.app/pdf-compress", id: "https://freeaikit.app/id/kompres-pdf", "x-default": "https://freeaikit.app/pdf-compress" } },
};

export default function KompresPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Kompres PDF Online" description="Kompres file PDF online gratis. Perkecil ukuran PDF tanpa kehilangan kualitas." slug="id/kompres-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Kompres PDF Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Perkecil ukuran file PDF tanpa kehilangan kualitas. 100% gratis, diproses di browser kamu.</p>
      </div>
      <PdfCompressClient />
      <RelatedTools currentSlug="pdf-compress" />
    </div>
  );
}
