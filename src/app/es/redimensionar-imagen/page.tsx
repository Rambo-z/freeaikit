import type { Metadata } from "next";
import ImageResizeClient from "../../image-resize/ImageResizeClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Redimensionar Imagen Online Gratis - Cambiar Tamaño | FreeAIKit",
  description: "Cambia el tamaño de imágenes online gratis. Redimensiona en píxeles o porcentaje, mantén la proporción. Sin subir archivos, en tu navegador.",
  keywords: ["redimensionar imagen", "cambiar tamaño imagen", "resize imagen online", "redimensionar foto", "cambiar tamaño foto online gratis"],
  openGraph: {
    title: "Redimensionar Imagen Online Gratis",
    description: "Cambia el tamaño de imágenes online gratis. Sin subir archivos.",
    url: "https://freeaikit.app/es/redimensionar-imagen",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/redimensionar-imagen",
    languages: { "en": "https://freeaikit.app/image-resize", "es": "https://freeaikit.app/es/redimensionar-imagen", "x-default": "https://freeaikit.app/image-resize" },
  },
};

export default function RedimensionarImagenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Redimensionar Imagen" description="Cambia el tamaño de imágenes online gratis." slug="es/redimensionar-imagen" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Redimensionar Imagen Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Cambia el tamaño de tus imágenes en píxeles o porcentaje. Mantén la proporción automáticamente. Gratis, en tu navegador.</p>
      </div>
      <ImageResizeClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Puedo mantener la proporción?", a: "Sí. La herramienta bloquea la relación de aspecto por defecto. Puedes desbloquearlo si necesitas dimensiones personalizadas." },
            { q: "¿Qué formatos soporta?", a: "JPG, PNG, WebP y otros formatos de imagen comunes." },
            { q: "¿Es gratis?", a: "Sí, completamente gratis. Sin marcas de agua, sin límites, sin registro." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-resize" />
    </div>
  );
}
