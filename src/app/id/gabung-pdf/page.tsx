import type { Metadata } from "next";
import PdfMergeClient from "../../pdf-merge/PdfMergeClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Gabung PDF Online Gratis - Merge PDF | FreeAIKit",
  description: "Gabungkan beberapa file PDF menjadi satu online gratis. Tanpa upload ke server, semua diproses di browser kamu.",
  keywords: ["gabung pdf", "merge pdf online", "gabung pdf gratis", "satukan pdf", "gabungkan file pdf", "merge pdf online gratis"],
  openGraph: { title: "Gabung PDF Online Gratis", description: "Gabungkan file PDF gratis. Semua di browser, tanpa upload.", url: "https://freeaikit.app/id/gabung-pdf" },
  alternates: { canonical: "https://freeaikit.app/id/gabung-pdf", languages: { en: "https://freeaikit.app/pdf-merge", id: "https://freeaikit.app/id/gabung-pdf", "x-default": "https://freeaikit.app/pdf-merge" } },
};

export default function GabungPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Gabung PDF Online" description="Gabungkan beberapa file PDF menjadi satu online gratis. Tanpa upload, semua di browser." slug="id/gabung-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Gabung PDF Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Gabungkan beberapa file PDF menjadi satu dokumen. 100% gratis, diproses di browser kamu.</p>
      </div>
      <PdfMergeClient />
      <RelatedTools currentSlug="pdf-merge" />
    </div>
  );
}
