import type { Metadata } from "next";
import PasswordGeneratorClient from "../../password-generator/PasswordGeneratorClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Generador de Contrasenas Seguras Online Gratis | FreeAIKit",
  description:
    "Genera contrasenas fuertes y aleatorias al instante. Elige longitud, mayusculas, minusculas, numeros y simbolos. Usa aleatoriedad criptograficamente segura. Gratis, sin almacenar datos.",
  keywords: [
    "generador de contrasenas",
    "generar contrasena segura",
    "contrasena aleatoria",
    "generador de passwords",
    "contrasena fuerte",
    "crear contrasena",
    "generador contrasenas online",
    "password seguro",
  ],
  openGraph: {
    title: "Generador de Contrasenas Seguras Online Gratis",
    description:
      "Genera contrasenas fuertes y aleatorias con opciones personalizables. Criptograficamente seguro.",
    url: "https://freeaikit.app/es/generar-contrasena",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/generar-contrasena",
    languages: {
      "en": "https://freeaikit.app/password-generator",
      "es": "https://freeaikit.app/es/generar-contrasena",
      "x-default": "https://freeaikit.app/password-generator",
    },
  },
};

export default function GenerarContrasenaPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Generador de Contrasenas Seguras"
        description="Genera contrasenas fuertes y aleatorias online gratis. Criptograficamente seguro."
        slug="es/generar-contrasena"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Generador de Contrasenas Seguras
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Genera contrasenas fuertes y aleatorias al instante. Personaliza la longitud y los
          caracteres incluidos. Usa aleatoriedad criptograficamente segura.
        </p>
      </div>

      <PasswordGeneratorClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Las contrasenas generadas son realmente seguras?", a: "Si. Usamos crypto.getRandomValues(), la API criptografica del navegador, para generar numeros verdaderamente aleatorios." },
            { q: "¿Se almacenan mis contrasenas?", a: "No. Las contrasenas se generan localmente en tu navegador y nunca se envian ni almacenan en ningun servidor." },
            { q: "¿Que longitud deberia tener mi contrasena?", a: "Recomendamos al menos 16 caracteres con una combinacion de mayusculas, minusculas, numeros y simbolos para maxima seguridad." },
            { q: "¿Puedo personalizar los caracteres?", a: "Si. Puedes elegir incluir o excluir mayusculas, minusculas, numeros y simbolos segun tus necesidades." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="password-generator" />
    </div>
  );
}
