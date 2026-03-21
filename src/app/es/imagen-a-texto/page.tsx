import type { Metadata } from "next";
import ImageToTextClient from "../../image-to-text/ImageToTextClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Imagen a Texto (OCR) Online Gratis | FreeAIKit",
  description: "Extrae texto de imágenes con OCR. Soporta más de 100 idiomas, capturas de pantalla, fotos y documentos escaneados. Gratis, en tu navegador.",
  keywords: ["imagen a texto", "ocr online", "extraer texto de imagen", "foto a texto", "ocr gratis", "reconocimiento de texto"],
  openGraph: {
    title: "Imagen a Texto (OCR) Online Gratis",
    description: "Extrae texto de imágenes con OCR. Más de 100 idiomas. Gratis y privado.",
    url: "https://freeaikit.app/es/imagen-a-texto",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/imagen-a-texto",
    languages: { "en": "https://freeaikit.app/image-to-text", "es": "https://freeaikit.app/es/imagen-a-texto", "x-default": "https://freeaikit.app/image-to-text" },
  },
};

export default function ImagenATextoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Imagen a Texto (OCR)" description="Extrae texto de imágenes con OCR. Soporta más de 100 idiomas." slug="es/imagen-a-texto" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Imagen a Texto (OCR) Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Extrae texto de cualquier imagen usando OCR. Soporta más de 100 idiomas, capturas de pantalla, fotos y documentos escaneados.</p>
      </div>
      <ImageToTextClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Qué es OCR?", a: "OCR (Reconocimiento Óptico de Caracteres) es una tecnología que reconoce texto dentro de imágenes. Puede extraer texto impreso o manuscrito de fotos, capturas de pantalla y documentos escaneados." },
            { q: "¿Qué idiomas soporta?", a: "Más de 100 idiomas incluyendo español, inglés, chino, japonés, coreano, francés, alemán, árabe, hindi y más." },
            { q: "¿Mi imagen se sube a un servidor?", a: "No. Todo el procesamiento OCR se ejecuta en tu navegador usando Tesseract.js (WebAssembly). Tu imagen nunca sale de tu dispositivo." },
            { q: "¿Qué tan preciso es?", a: "La precisión depende de la calidad de la imagen. Imágenes claras y de alta resolución con buen contraste producen los mejores resultados." },
          ].map(({ q, a }) => (
            <div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-to-text" />
    </div>
  );
}
