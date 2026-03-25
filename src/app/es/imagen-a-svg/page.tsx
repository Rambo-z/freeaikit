import type { Metadata } from "next";
import ImageToSvgClient from "../../image-to-svg/ImageToSvgClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Convertir Imagen a SVG Online Gratis - PNG/JPG a SVG | FreeAIKit",
  description:
    "Convierte imagenes PNG, JPG y WebP a formato vectorial SVG gratis. Sin subir archivos al servidor, todo en tu navegador. Perfecto para logos, iconos e ilustraciones.",
  keywords: [
    "imagen a svg",
    "convertir imagen a svg",
    "png a svg",
    "jpg a svg",
    "convertir imagen a vector",
    "vectorizar imagen",
    "conversor svg gratis",
    "imagen a vector online",
  ],
  openGraph: {
    title: "Convertir Imagen a SVG Online Gratis",
    description:
      "Convierte imagenes PNG, JPG y WebP a SVG vectorial gratis. Todo en tu navegador.",
    url: "https://freeaikit.app/es/imagen-a-svg",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/imagen-a-svg",
    languages: {
      "en": "https://freeaikit.app/image-to-svg",
      "es": "https://freeaikit.app/es/imagen-a-svg",
      "x-default": "https://freeaikit.app/image-to-svg",
    },
  },
};

export default function ImagenASvgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Convertir Imagen a SVG"
        description="Convierte imagenes PNG, JPG y WebP a formato vectorial SVG gratis online."
        slug="es/imagen-a-svg"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Convertir Imagen a SVG Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convierte imagenes PNG, JPG y WebP a formato vectorial SVG. Perfecto para logos, iconos
          e ilustraciones. Todo se procesa en tu navegador.
        </p>
      </div>

      <ImageToSvgClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Que es SVG?", a: "SVG (Scalable Vector Graphics) es un formato de imagen vectorial que se puede escalar a cualquier tamano sin perder calidad, ideal para logos e iconos." },
            { q: "¿Que tipo de imagenes funcionan mejor?", a: "Imagenes con formas definidas, alto contraste y pocos colores (logos, iconos, ilustraciones) producen los mejores resultados." },
            { q: "¿Mis imagenes se suben a un servidor?", a: "No. La conversion se realiza completamente en tu navegador. Tus archivos nunca salen de tu dispositivo." },
            { q: "¿Puedo editar el SVG resultante?", a: "Si. El archivo SVG generado se puede abrir y editar en cualquier editor de vectores como Inkscape, Adobe Illustrator o Figma." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-to-svg" />
    </div>
  );
}
