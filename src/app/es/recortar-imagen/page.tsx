import type { Metadata } from "next";
import ImageCropClient from "../../image-crop/ImageCropClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Recortar Imagen Online Gratis - Cortar Fotos | FreeAIKit",
  description: "Recorta imágenes online gratis. Proporciones predefinidas (1:1, 4:3, 16:9), rotación y volteo. Sin subir archivos.",
  keywords: ["recortar imagen", "recortar foto", "cortar imagen online", "recortar imagen online gratis", "crop imagen"],
  openGraph: {
    title: "Recortar Imagen Online Gratis",
    description: "Recorta imágenes online gratis. Proporciones predefinidas, rotación y volteo.",
    url: "https://freeaikit.app/es/recortar-imagen",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/recortar-imagen",
    languages: { "en": "https://freeaikit.app/image-crop", "es": "https://freeaikit.app/es/recortar-imagen", "x-default": "https://freeaikit.app/image-crop" },
  },
};

export default function RecortarImagenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Recortar Imagen Online" description="Recorta imágenes online gratis." slug="es/recortar-imagen" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Recortar Imagen Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Recorta y rota tus imágenes con proporciones predefinidas. Gratis, en tu navegador.</p>
      </div>
      <ImageCropClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Qué proporciones están disponibles?", a: "Libre, 1:1, 4:3, 16:9, 3:4, 9:16. Perfectas para redes sociales, presentaciones y más." },
            { q: "¿Puedo rotar la imagen?", a: "Sí. Puedes rotar 90° en ambas direcciones y voltear horizontal o verticalmente." },
            { q: "¿En qué formato se descarga?", a: "La imagen se descarga en el mismo formato original (JPG, PNG, etc.)." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-crop" />
    </div>
  );
}
