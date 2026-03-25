import type { Metadata } from "next";
import ImageWatermarkClient from "../../image-watermark/ImageWatermarkClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Marca de Agua en Imagenes Online Gratis | FreeAIKit",
  description:
    "Agrega marcas de agua de texto a imagenes gratis. Personaliza fuente, color, opacidad, posicion y rotacion. Modo individual o mosaico. Descarga como PNG. Sin subir archivos.",
  keywords: [
    "marca de agua",
    "agregar marca de agua",
    "marca de agua en fotos",
    "marca de agua online",
    "watermark imagen",
    "poner marca de agua",
    "marca de agua gratis",
    "proteger imagenes",
  ],
  openGraph: {
    title: "Marca de Agua en Imagenes Online Gratis",
    description:
      "Agrega marcas de agua de texto personalizables a cualquier imagen. Individual o mosaico. Sin subir archivos.",
    url: "https://freeaikit.app/es/marca-de-agua",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/marca-de-agua",
    languages: {
      "en": "https://freeaikit.app/image-watermark",
      "es": "https://freeaikit.app/es/marca-de-agua",
      "x-default": "https://freeaikit.app/image-watermark",
    },
  },
};

export default function MarcaDeAguaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Marca de Agua en Imagenes"
        description="Agrega marcas de agua de texto a imagenes gratis online. Personaliza fuente, color y posicion."
        slug="es/marca-de-agua"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Agregar Marca de Agua a Imagenes Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Agrega marcas de agua de texto a tus imagenes. Personaliza fuente, color, opacidad,
          posicion y rotacion. Modo individual o mosaico repetido.
        </p>
      </div>

      <ImageWatermarkClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Puedo personalizar la marca de agua?", a: "Si. Puedes ajustar el texto, tamano de fuente, color, opacidad, posicion y angulo de rotacion de la marca de agua." },
            { q: "¿Que es el modo mosaico?", a: "El modo mosaico repite la marca de agua en patron por toda la imagen, ofreciendo mayor proteccion contra uso no autorizado." },
            { q: "¿En que formato se descarga?", a: "La imagen con marca de agua se descarga en formato PNG." },
            { q: "¿Mis imagenes se suben a un servidor?", a: "No. Todo el procesamiento ocurre en tu navegador. Tus imagenes nunca salen de tu dispositivo." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-watermark" />
    </div>
  );
}
