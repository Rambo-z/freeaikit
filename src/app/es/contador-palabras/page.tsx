import type { Metadata } from "next";
import WordCounterClient from "../../word-counter/WordCounterClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Contador de Palabras y Caracteres Online Gratis | FreeAIKit",
  description:
    "Cuenta palabras, caracteres, oraciones, parrafos y tiempo de lectura al instante. Encuentra las palabras clave mas frecuentes. Gratis, sin registro.",
  keywords: [
    "contador de palabras",
    "contar palabras",
    "contador de caracteres",
    "contar caracteres online",
    "contador palabras online",
    "tiempo de lectura",
    "contador de letras",
    "analizador de texto",
  ],
  openGraph: {
    title: "Contador de Palabras y Caracteres Online Gratis",
    description:
      "Cuenta palabras, caracteres, oraciones y tiempo de lectura en tiempo real.",
    url: "https://freeaikit.app/es/contador-palabras",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/contador-palabras",
    languages: {
      "en": "https://freeaikit.app/word-counter",
      "es": "https://freeaikit.app/es/contador-palabras",
      "x-default": "https://freeaikit.app/word-counter",
    },
  },
};

export default function ContadorPalabrasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Contador de Palabras y Caracteres"
        description="Cuenta palabras, caracteres, oraciones, parrafos y tiempo de lectura online gratis."
        slug="es/contador-palabras"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Contador de Palabras y Caracteres Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Cuenta palabras, caracteres, oraciones, parrafos y calcula el tiempo de lectura
          en tiempo real. Encuentra las palabras clave mas frecuentes.
        </p>
      </div>

      <WordCounterClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Que estadisticas muestra?", a: "Muestra el numero de palabras, caracteres (con y sin espacios), oraciones, parrafos, tiempo de lectura estimado y las palabras clave mas frecuentes." },
            { q: "¿Funciona con otros idiomas?", a: "Si. El contador funciona con cualquier idioma, incluyendo espanol, ingles, frances, aleman y mas." },
            { q: "¿Se almacena mi texto?", a: "No. Todo el procesamiento ocurre en tu navegador. Tu texto nunca se envia a ningun servidor." },
            { q: "¿Como se calcula el tiempo de lectura?", a: "Se basa en una velocidad de lectura promedio de aproximadamente 200-250 palabras por minuto." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="word-counter" />
    </div>
  );
}
