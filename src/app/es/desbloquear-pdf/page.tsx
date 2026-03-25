import type { Metadata } from "next";
import PdfUnlockClient from "../../pdf-unlock/PdfUnlockClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Desbloquear PDF Online Gratis - Quitar Contrasena PDF | FreeAIKit",
  description:
    "Elimina la proteccion por contrasena de archivos PDF online. Desbloquea PDFs cifrados al instante en tu navegador. Sin subir archivos, 100% gratis, sin registro.",
  keywords: [
    "desbloquear pdf",
    "quitar contrasena pdf",
    "eliminar contrasena pdf",
    "desproteger pdf",
    "pdf sin contrasena",
    "desbloquear pdf online",
    "quitar proteccion pdf",
    "pdf unlock gratis",
  ],
  openGraph: {
    title: "Desbloquear PDF Online Gratis",
    description:
      "Elimina la proteccion por contrasena de archivos PDF online. Desbloquea PDFs al instante.",
    url: "https://freeaikit.app/es/desbloquear-pdf",
  },
  alternates: {
    canonical: "https://freeaikit.app/es/desbloquear-pdf",
    languages: {
      "en": "https://freeaikit.app/pdf-unlock",
      "es": "https://freeaikit.app/es/desbloquear-pdf",
      "x-default": "https://freeaikit.app/pdf-unlock",
    },
  },
};

export default function DesbloquearPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Desbloquear PDF"
        description="Elimina la proteccion por contrasena de archivos PDF online gratis. Sin subir archivos, 100% en tu navegador."
        slug="es/desbloquear-pdf"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Desbloquear PDF Gratis
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Elimina la proteccion por contrasena de archivos PDF al instante. Introduce la contrasena
          y descarga el PDF desbloqueado. Todo en tu navegador.
        </p>
      </div>

      <PdfUnlockClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {[
            { q: "¿Necesito saber la contrasena?", a: "Si. Para desbloquear un PDF protegido, necesitas proporcionar la contrasena correcta. Esta herramienta no descifra PDFs sin la contrasena." },
            { q: "¿Mi PDF se sube a un servidor?", a: "No. Todo el procesamiento ocurre en tu navegador. Tu archivo PDF nunca sale de tu dispositivo." },
            { q: "¿Que tipo de proteccion puede eliminar?", a: "Puede eliminar la proteccion por contrasena de usuario (para abrir el PDF) y las restricciones de permisos (imprimir, copiar, editar)." },
            { q: "¿Es legal desbloquear un PDF?", a: "Si, siempre que tengas autorizacion para acceder al contenido del PDF. Esta herramienta es para desbloquear tus propios documentos protegidos." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-unlock" />
    </div>
  );
}
