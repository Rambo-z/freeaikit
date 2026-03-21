import type { Metadata } from "next";
import ImageCompressClient from "../../image-compress/ImageCompressClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Comprimir Imágenes Online Gratis - Reducir Tamaño JPG PNG | FreeAIKit",
  description:
    "Comprime imágenes online gratis. Reduce el tamaño de archivos JPG, PNG y WebP hasta un 80% sin perder calidad. Sin subir archivos, todo en tu navegador.",
  keywords: [
    "comprimir imagen",
    "comprimir imagen online",
    "comprimir foto",
    "reducir tamaño imagen",
    "comprimir jpg",
    "comprimir png",
    "compresor de imágenes",
    "comprimir fotos online gratis",
  ],
  openGraph: {
    title: "Comprimir Imágenes Online Gratis",
    description:
      "Comprime imágenes JPG, PNG y WebP gratis. Todo en tu navegador, sin subir archivos.",
    url: "https://freeaikit.app/es/comprimir-imagen",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/comprimir-imagen",
    languages: {
      "en": "https://freeaikit.app/image-compress",
      "es": "https://freeaikit.app/es/comprimir-imagen",
      "x-default": "https://freeaikit.app/image-compress",
    },
  },
};

export default function ComprimirImagenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Comprimir Imágenes Online"
        description="Comprime imágenes online gratis. Reduce el tamaño de archivos JPG, PNG y WebP hasta un 80% sin perder calidad."
        slug="es/comprimir-imagen"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Comprimir Imágenes Online Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Reduce el tamaño de tus imágenes hasta un 80% manteniendo la calidad visual.
          100% gratis, funciona en tu navegador. Tus archivos nunca salen de tu dispositivo.
        </p>
      </div>

      <ImageCompressClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ¿Cómo funciona la compresión de imágenes?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            Nuestro compresor usa motores WebAssembly (WASM) de nivel profesional compilados
            desde bibliotecas nativas en C — MozJPEG para JPG, libwebp para WebP, y libimagequant
            (el mismo motor detrás de TinyPNG) para PNG. La compresión de PNG usa cuantización
            perceptual de color, reduciendo el tamaño del archivo un 60–80% manteniendo la imagen
            visualmente idéntica. Todo el procesamiento se ejecuta localmente en tu navegador —
            tus imágenes nunca salen de tu dispositivo.
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-3">Características</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Procesamiento por lotes</strong> — Comprime múltiples imágenes a la vez</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Control de calidad</strong> — Ajusta el nivel de compresión con un deslizador</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Vista previa</strong> — Ve la reducción de tamaño antes de descargar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Privacidad primero</strong> — Las imágenes nunca salen de tu dispositivo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Múltiples formatos</strong> — Soporta JPG, PNG y WebP</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-6">
          {[
            { q: "¿Es realmente gratis?", a: "Sí, completamente gratis sin límites. Comprime todas las imágenes que quieras." },
            { q: "¿La compresión reduce la calidad de imagen?", a: "Tú controlas el nivel de calidad con un deslizador. Con calidad al 80%, la mayoría de imágenes se ven idénticas al original pero son significativamente más pequeñas." },
            { q: "¿Qué formatos soporta?", a: "Soportamos JPG/JPEG, PNG y WebP. También puedes convertir entre formatos durante la compresión." },
            { q: "¿Hay límite de tamaño?", a: "Como todo se ejecuta en tu navegador, no hay límite del servidor. Imágenes muy grandes (50MB+) pueden tardar más dependiendo de tu dispositivo." },
            { q: "¿Mis imágenes se suben a algún servidor?", a: "No. Todo el procesamiento ocurre localmente en tu navegador usando WebAssembly. Tus imágenes nunca salen de tu dispositivo." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="image-compress" />
    </div>
  );
}
