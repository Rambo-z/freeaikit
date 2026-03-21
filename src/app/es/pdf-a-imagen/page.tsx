import type { Metadata } from "next";
import PdfToImagesClient from "../../pdf-to-images/PdfToImagesClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF a Imagen Online Gratis - Convertir PDF a JPG PNG | FreeAIKit",
  description: "Convierte PDF a imágenes JPG o PNG online gratis. Elige resolución y calidad. Sin subir archivos, todo en tu navegador.",
  keywords: ["pdf a imagen", "pdf a jpg", "convertir pdf a imagen", "pdf a png", "pdf a jpg online gratis"],
  openGraph: {
    title: "PDF a Imagen Online Gratis",
    description: "Convierte PDF a imágenes JPG o PNG online gratis.",
    url: "https://freeaikit.app/es/pdf-a-imagen",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/pdf-a-imagen",
    languages: { "en": "https://freeaikit.app/pdf-to-images", "es": "https://freeaikit.app/es/pdf-a-imagen", "x-default": "https://freeaikit.app/pdf-to-images" },
  },
};

export default function PdfAImagenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="PDF a Imagen" description="Convierte PDF a imágenes JPG o PNG online gratis." slug="es/pdf-a-imagen" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Convertir PDF a Imagen Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Convierte cada página de tu PDF en una imagen JPG o PNG. Elige resolución y calidad.</p>
      </div>
      <PdfToImagesClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Qué formatos de salida hay?", a: "Puedes convertir a JPG o PNG. JPG es más pequeño, PNG mantiene mejor la calidad." },
            { q: "¿Puedo elegir la resolución?", a: "Sí. Puedes ajustar los DPI desde 72 hasta 300 para controlar la calidad y el tamaño." },
            { q: "¿Funciona con PDFs grandes?", a: "Sí. Todo se procesa en tu navegador, página por página. PDFs muy largos pueden tardar más." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-to-images" />
    </div>
  );
}
