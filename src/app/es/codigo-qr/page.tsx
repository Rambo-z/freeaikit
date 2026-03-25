import type { Metadata } from "next";
import QrCodeClient from "../../qr-code/QrCodeClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Generador de Codigo QR Online Gratis | FreeAIKit",
  description:
    "Genera codigos QR para URLs, texto, email, telefono y WiFi al instante gratis. Personaliza colores, tamano y correccion de errores. Descarga como PNG o SVG.",
  keywords: [
    "generador codigo qr",
    "crear codigo qr",
    "codigo qr gratis",
    "generador qr online",
    "hacer codigo qr",
    "qr para wifi",
    "qr para url",
    "codigo qr png",
  ],
  openGraph: {
    title: "Generador de Codigo QR Online Gratis",
    description:
      "Genera codigos QR personalizados para URLs, WiFi, email y mas. Descarga PNG o SVG.",
    url: "https://freeaikit.app/es/codigo-qr",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/codigo-qr",
    languages: {
      "en": "https://freeaikit.app/qr-code",
      "es": "https://freeaikit.app/es/codigo-qr",
      "x-default": "https://freeaikit.app/qr-code",
    },
  },
};

export default function CodigoQrPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Generador de Codigo QR"
        description="Genera codigos QR para URLs, texto, email, telefono y WiFi gratis online."
        slug="es/codigo-qr"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Generador de Codigo QR Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Genera codigos QR para URLs, texto, email, telefono y WiFi. Personaliza colores y tamano.
          Descarga como PNG o SVG.
        </p>
      </div>

      <QrCodeClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Los codigos QR generados son permanentes?", a: "Si. Los codigos QR son estaticos, lo que significa que la informacion esta codificada directamente en el codigo y funciona para siempre sin depender de ningun servidor." },
            { q: "¿Puedo personalizar los colores?", a: "Si. Puedes cambiar el color de primer plano y fondo del codigo QR para que coincida con tu marca." },
            { q: "¿Que formatos de descarga hay?", a: "Puedes descargar tu codigo QR como imagen PNG o como archivo SVG vectorial para maxima calidad." },
            { q: "¿Puedo crear un QR para WiFi?", a: "Si. Introduce el nombre de la red, contrasena y tipo de seguridad para generar un QR que permite conectarse al WiFi escaneandolo." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="qr-code" />
    </div>
  );
}
