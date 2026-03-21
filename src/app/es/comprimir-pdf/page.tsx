import type { Metadata } from "next";
import PdfCompressClient from "../../pdf-compress/PdfCompressClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Comprimir PDF Online Gratis - Reducir Tamaño PDF | FreeAIKit",
  description: "Comprime archivos PDF online gratis. Reduce el tamaño de tus PDFs manteniendo la calidad. Sin subir archivos, todo en tu navegador.",
  keywords: ["comprimir pdf", "comprimir pdf online", "reducir tamaño pdf", "comprimir pdf gratis", "compresor pdf online"],
  openGraph: {
    title: "Comprimir PDF Online Gratis",
    description: "Comprime archivos PDF online gratis. Reduce el tamaño manteniendo la calidad.",
    url: "https://freeaikit.app/es/comprimir-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/comprimir-pdf",
    languages: { "en": "https://freeaikit.app/pdf-compress", "es": "https://freeaikit.app/es/comprimir-pdf", "x-default": "https://freeaikit.app/pdf-compress" },
  },
};

export default function ComprimirPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Comprimir PDF Online" description="Comprime archivos PDF online gratis." slug="es/comprimir-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Comprimir PDF Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Reduce el tamaño de tus archivos PDF manteniendo la calidad. Gratis, sin registro, en tu navegador.</p>
      </div>
      <PdfCompressClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Cuánto se puede reducir el tamaño?", a: "Dependiendo del contenido del PDF, puedes reducir el tamaño entre un 30% y un 70%. PDFs con muchas imágenes se comprimen más." },
            { q: "¿Se pierde calidad?", a: "Puedes elegir entre diferentes niveles de compresión. El nivel recomendado ofrece el mejor balance entre tamaño y calidad visual." },
            { q: "¿Es seguro?", a: "Sí. Tus archivos PDF se procesan localmente en tu navegador y nunca se suben a ningún servidor." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-compress" />
    </div>
  );
}
