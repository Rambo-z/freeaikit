import type { Metadata } from "next";
import PdfMergeClient from "../../pdf-merge/PdfMergeClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Unir PDF Online Gratis - Combinar Archivos PDF | FreeAIKit",
  description: "Une y combina archivos PDF online gratis. Arrastra y suelta tus PDFs, reordénalos y descarga el archivo combinado. Sin registro, sin límites.",
  keywords: ["unir pdf", "combinar pdf", "juntar pdf", "fusionar pdf", "unir pdf online gratis", "combinar archivos pdf"],
  openGraph: {
    title: "Unir PDF Online Gratis",
    description: "Une y combina archivos PDF online gratis. Sin registro, sin límites.",
    url: "https://freeaikit.app/es/unir-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/unir-pdf",
    languages: { "en": "https://freeaikit.app/pdf-merge", "es": "https://freeaikit.app/es/unir-pdf", "x-default": "https://freeaikit.app/pdf-merge" },
  },
};

export default function UnirPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Unir PDF Online" description="Une y combina archivos PDF online gratis. Sin registro, sin límites." slug="es/unir-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Unir PDF Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Combina múltiples archivos PDF en uno solo. Arrastra, reordena y descarga. Gratis, en tu navegador.</p>
      </div>
      <PdfMergeClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Cuántos PDFs puedo unir?", a: "No hay límite. Puedes combinar tantos archivos PDF como necesites." },
            { q: "¿Se mantiene la calidad?", a: "Sí. Los archivos se combinan sin recompresión, manteniendo la calidad original de cada página." },
            { q: "¿Es seguro?", a: "Completamente. Tus archivos PDF se procesan localmente en tu navegador y nunca se suben a ningún servidor." },
            { q: "¿Puedo reordenar las páginas?", a: "Sí. Puedes arrastrar y soltar los archivos para cambiar el orden antes de combinarlos." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-merge" />
    </div>
  );
}
