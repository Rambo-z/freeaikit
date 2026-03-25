import type { Metadata } from "next";
import CsvToJsonClient from "../../csv-to-json/CsvToJsonClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Convertir CSV a JSON Online Gratis | FreeAIKit",
  description:
    "Convierte CSV a JSON y JSON a CSV online. Soporta delimitadores personalizados, cabeceras y datos anidados. Gratis, instantaneo, funciona en tu navegador.",
  keywords: [
    "csv a json",
    "convertir csv a json",
    "json a csv",
    "conversor csv",
    "csv a json online",
    "convertir csv",
    "csv parser online",
    "conversor json",
  ],
  openGraph: {
    title: "Convertir CSV a JSON Online Gratis",
    description:
      "Convierte entre CSV y JSON al instante. Gratis y privado, funciona en tu navegador.",
    url: "https://freeaikit.app/es/csv-a-json",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/csv-a-json",
    languages: {
      "en": "https://freeaikit.app/csv-to-json",
      "es": "https://freeaikit.app/es/csv-a-json",
      "x-default": "https://freeaikit.app/csv-to-json",
    },
  },
};

export default function CsvAJsonPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Convertir CSV a JSON"
        description="Convierte CSV a JSON y JSON a CSV online gratis. Instantaneo y privado."
        slug="es/csv-a-json"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Convertir CSV a JSON Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convierte archivos CSV a JSON y viceversa al instante. Soporta delimitadores
          personalizados y cabeceras. Todo en tu navegador.
        </p>
      </div>

      <CsvToJsonClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Puedo convertir JSON a CSV tambien?", a: "Si. La herramienta permite convertir en ambas direcciones: CSV a JSON y JSON a CSV." },
            { q: "¿Soporta delimitadores personalizados?", a: "Si. Puedes usar coma, punto y coma, tabulador u otros delimitadores personalizados." },
            { q: "¿Hay limite de tamano?", a: "Como todo se procesa en tu navegador, no hay limite del servidor. Archivos muy grandes pueden tardar mas dependiendo de tu dispositivo." },
            { q: "¿Mis datos se suben a algun servidor?", a: "No. Todo el procesamiento ocurre localmente en tu navegador. Tus datos nunca salen de tu dispositivo." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="csv-to-json" />
    </div>
  );
}
