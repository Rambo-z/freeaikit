import type { Metadata } from "next";
import PdfExtractClient from "../../pdf-extract/PdfExtractClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Extraer Paginas de PDF Online Gratis | FreeAIKit",
  description:
    "Extrae paginas especificas de un archivo PDF online. Selecciona rangos de paginas y descarga como un nuevo PDF. Gratis, sin registro, 100% en tu navegador.",
  keywords: [
    "extraer paginas pdf",
    "extraer paginas de pdf",
    "separar paginas pdf",
    "dividir pdf",
    "extraer pdf online",
    "pdf extractor",
    "separar pdf gratis",
  ],
  openGraph: {
    title: "Extraer Paginas de PDF Online Gratis",
    description:
      "Extrae paginas especificas de un PDF. Selecciona rangos y descarga como nuevo PDF.",
    url: "https://freeaikit.app/es/extraer-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/extraer-pdf",
    languages: {
      "en": "https://freeaikit.app/pdf-extract",
      "es": "https://freeaikit.app/es/extraer-pdf",
      "x-default": "https://freeaikit.app/pdf-extract",
    },
  },
};

export default function ExtraerPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Extraer Paginas de PDF"
        description="Extrae paginas especificas de un archivo PDF online gratis. Sin registro, 100% en tu navegador."
        slug="es/extraer-pdf"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Extraer Paginas de PDF Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Selecciona y extrae paginas especificas de cualquier PDF. Descarga como un nuevo archivo PDF.
          Gratis y privado.
        </p>
      </div>

      <PdfExtractClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Puedo extraer varias paginas a la vez?", a: "Si. Puedes seleccionar paginas individuales o rangos de paginas (por ejemplo, 1-5, 8, 12-15) y se combinaran en un solo PDF." },
            { q: "¿Se mantiene la calidad del PDF?", a: "Si. Las paginas se extraen sin recompresion ni perdida de calidad." },
            { q: "¿Mi PDF se sube a un servidor?", a: "No. Todo el procesamiento ocurre en tu navegador. Tu archivo nunca sale de tu dispositivo." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-extract" />
    </div>
  );
}
