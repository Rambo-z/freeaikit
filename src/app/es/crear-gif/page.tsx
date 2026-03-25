import type { Metadata } from "next";
import GifMakerClient from "../../gif-maker/GifMakerClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Crear GIF Animado Online Gratis - Hacer GIF de Imagenes | FreeAIKit",
  description:
    "Crea GIFs animados a partir de imagenes. Sube varias imagenes, ajusta la velocidad y calidad. Gratis, instantaneo, funciona en tu navegador.",
  keywords: [
    "crear gif",
    "hacer gif",
    "gif animado",
    "creador de gif",
    "imagenes a gif",
    "hacer gif online",
    "generador de gif",
    "gif de fotos",
  ],
  openGraph: {
    title: "Crear GIF Animado Online Gratis",
    description:
      "Crea GIFs animados a partir de imagenes. Gratis y privado, funciona en tu navegador.",
    url: "https://freeaikit.app/es/crear-gif",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/crear-gif",
    languages: {
      "en": "https://freeaikit.app/gif-maker",
      "es": "https://freeaikit.app/es/crear-gif",
      "x-default": "https://freeaikit.app/gif-maker",
    },
  },
};

export default function CrearGifPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Crear GIF Animado"
        description="Crea GIFs animados a partir de imagenes gratis online."
        slug="es/crear-gif"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Crear GIF Animado Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Sube varias imagenes y crea un GIF animado al instante. Ajusta la velocidad de los
          fotogramas y la calidad. Todo en tu navegador.
        </p>
      </div>

      <GifMakerClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Cuantas imagenes puedo usar?", a: "Puedes subir tantas imagenes como necesites para crear tu GIF animado." },
            { q: "¿Que formatos de imagen acepta?", a: "Acepta JPG, PNG y WebP como imagenes de entrada." },
            { q: "¿Puedo ajustar la velocidad del GIF?", a: "Si. Puedes configurar el retardo entre fotogramas para controlar la velocidad de la animacion." },
            { q: "¿Se suben mis imagenes a un servidor?", a: "No. Todo el procesamiento se realiza en tu navegador. Tus imagenes nunca salen de tu dispositivo." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="gif-maker" />
    </div>
  );
}
