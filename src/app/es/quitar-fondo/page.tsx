import type { Metadata } from "next";
import BgRemoverClient from "../../bg-remover/BgRemoverClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Quitar Fondo de Imagen Gratis con IA | FreeAIKit",
  description:
    "Elimina el fondo de cualquier imagen con IA. Gratis, sin registro, sin marca de agua. Funciona en tu navegador, tus fotos no se suben a ningún servidor.",
  keywords: ["quitar fondo", "quitar fondo imagen", "eliminar fondo", "remover fondo", "quitar fondo online gratis", "borrar fondo foto"],
  openGraph: {
    title: "Quitar Fondo de Imagen Gratis con IA",
    description: "Elimina el fondo de cualquier imagen con IA. Gratis, sin registro.",
    url: "https://freeaikit.app/es/quitar-fondo",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/quitar-fondo",
    languages: { "en": "https://freeaikit.app/bg-remover", "es": "https://freeaikit.app/es/quitar-fondo", "x-default": "https://freeaikit.app/bg-remover" },
  },
};

export default function QuitarFondoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Quitar Fondo de Imagen" description="Elimina el fondo de cualquier imagen con IA. Gratis, sin registro, sin marca de agua." slug="es/quitar-fondo" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Quitar Fondo de Imagen con IA</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Elimina fondos de cualquier imagen en segundos. 100% gratis, funciona en tu navegador.</p>
      </div>
      <BgRemoverClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Es realmente gratis?", a: "Sí, completamente gratis sin límites. No hay marcas de agua ni cargos ocultos." },
            { q: "¿Mis fotos se suben a un servidor?", a: "No. Todo el procesamiento ocurre localmente en tu navegador usando modelos de IA. Tus imágenes nunca salen de tu dispositivo." },
            { q: "¿Qué formatos soporta?", a: "Puedes subir imágenes en PNG, JPG/JPEG y WebP. El resultado siempre es PNG con fondo transparente." },
            { q: "¿Cómo funciona?", a: "Usamos modelos avanzados de inteligencia artificial que se ejecutan directamente en tu navegador. La IA analiza tu imagen, identifica el sujeto principal y separa con precisión el fondo." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="bg-remover" />
    </div>
  );
}
