import type { Metadata } from "next";
import JsonFormatterClient from "../../json-formatter/JsonFormatterClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Formateador JSON Online Gratis - Validar y Embellecer JSON | FreeAIKit",
  description:
    "Formatea, embellece, minifica y valida JSON online. Resaltado de sintaxis, deteccion de errores con indicaciones de linea. Gratis, instantaneo, sin subir datos.",
  keywords: [
    "formateador json",
    "formatear json online",
    "validar json",
    "json beautifier",
    "minificar json",
    "json online",
    "validador json",
    "embellecedor json",
  ],
  openGraph: {
    title: "Formateador JSON Online Gratis",
    description:
      "Formatea, minifica y valida JSON con resaltado de sintaxis. Gratis e instantaneo.",
    url: "https://freeaikit.app/es/formato-json",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/formato-json",
    languages: {
      "en": "https://freeaikit.app/json-formatter",
      "es": "https://freeaikit.app/es/formato-json",
      "x-default": "https://freeaikit.app/json-formatter",
    },
  },
};

export default function FormatoJsonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Formateador JSON Online"
        description="Formatea, embellece, minifica y valida JSON online gratis. Resaltado de sintaxis y deteccion de errores."
        slug="es/formato-json"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Formateador y Validador JSON Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Formatea, embellece, minifica y valida tu JSON al instante. Con resaltado de sintaxis
          y deteccion de errores. Todo en tu navegador.
        </p>
      </div>

      <JsonFormatterClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Que es JSON?", a: "JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos, facil de leer y escribir para humanos y maquinas." },
            { q: "¿Mis datos se suben a algun servidor?", a: "No. Todo el procesamiento ocurre localmente en tu navegador. Tus datos nunca salen de tu dispositivo." },
            { q: "¿Puedo minificar JSON?", a: "Si. Puedes alternar entre formato embellecido (con indentacion) y formato minificado (compacto) con un solo clic." },
            { q: "¿Detecta errores de sintaxis?", a: "Si. El validador identifica errores de sintaxis y te indica la linea donde se encuentra el problema." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="json-formatter" />
    </div>
  );
}
