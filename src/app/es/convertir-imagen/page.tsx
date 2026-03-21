import type { Metadata } from "next";
import ImageConvertClient from "../../image-convert/ImageConvertClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Convertir Imagen Online Gratis - JPG PNG WebP | FreeAIKit",
  description: "Convierte imágenes entre JPG, PNG y WebP gratis. Conversión por lotes, sin pérdida de calidad. En tu navegador, sin subir archivos.",
  keywords: ["convertir imagen", "convertir jpg a png", "convertir png a jpg", "convertir imagen online", "conversor de imágenes gratis"],
  openGraph: {
    title: "Convertir Imagen Online Gratis",
    description: "Convierte imágenes entre JPG, PNG y WebP gratis.",
    url: "https://freeaikit.app/es/convertir-imagen",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/convertir-imagen",
    languages: { "en": "https://freeaikit.app/image-convert", "es": "https://freeaikit.app/es/convertir-imagen", "x-default": "https://freeaikit.app/image-convert" },
  },
};

export default function ConvertirImagenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Convertir Imagen Online" description="Convierte imágenes entre JPG, PNG y WebP gratis." slug="es/convertir-imagen" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Convertir Imagen Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Convierte entre JPG, PNG y WebP al instante. Procesamiento por lotes, sin pérdida de calidad.</p>
      </div>
      <ImageConvertClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Qué formatos puedo convertir?", a: "Puedes convertir entre JPG, PNG y WebP en cualquier dirección." },
            { q: "¿Se pierde calidad?", a: "La conversión mantiene la máxima calidad posible. Puedes ajustar el nivel de calidad con el control deslizante." },
            { q: "¿Puedo convertir varias imágenes a la vez?", a: "Sí. Arrastra múltiples archivos y se convertirán todos simultáneamente." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-convert" />
    </div>
  );
}
