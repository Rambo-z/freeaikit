import type { Metadata } from "next";
import ImageToPdfClient from "../../image-to-pdf/ImageToPdfClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Imagen a PDF Online Gratis - Convertir JPG a PDF | FreeAIKit",
  description: "Convierte imágenes a PDF online gratis. JPG, PNG, WebP a PDF. Múltiples imágenes en un solo PDF. Sin subir archivos.",
  keywords: ["imagen a pdf", "jpg a pdf", "convertir imagen a pdf", "foto a pdf", "jpg a pdf online gratis", "convertir jpg a pdf"],
  openGraph: {
    title: "Imagen a PDF Online Gratis",
    description: "Convierte imágenes JPG, PNG, WebP a PDF online gratis.",
    url: "https://freeaikit.app/es/imagen-a-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/imagen-a-pdf",
    languages: { "en": "https://freeaikit.app/image-to-pdf", "es": "https://freeaikit.app/es/imagen-a-pdf", "x-default": "https://freeaikit.app/image-to-pdf" },
  },
};

export default function ImagenAPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Imagen a PDF" description="Convierte imágenes a PDF online gratis." slug="es/imagen-a-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Convertir Imagen a PDF Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Convierte JPG, PNG y WebP a PDF. Combina múltiples imágenes en un solo archivo PDF.</p>
      </div>
      <ImageToPdfClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Puedo combinar varias imágenes en un PDF?", a: "Sí. Sube múltiples imágenes y se combinarán todas en un solo archivo PDF en el orden que elijas." },
            { q: "¿Qué formatos de imagen acepta?", a: "JPG/JPEG, PNG y WebP." },
            { q: "¿Se mantiene la calidad?", a: "Sí. Las imágenes se insertan en el PDF sin recompresión adicional." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-to-pdf" />
    </div>
  );
}
