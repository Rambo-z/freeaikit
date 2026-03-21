import type { Metadata } from "next";
import ImageToTextClient from "../../image-to-text/ImageToTextClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Imagem para Texto (OCR) Online Grátis | FreeAIKit",
  description: "Extraia texto de imagens com OCR. Suporta mais de 100 idiomas, capturas de tela, fotos e documentos digitalizados. Grátis, no seu navegador.",
  keywords: ["imagem para texto", "ocr online", "extrair texto de imagem", "foto para texto", "ocr grátis"],
  openGraph: { title: "Imagem para Texto (OCR) Grátis", url: "https://freeaikit.app/pt/imagem-para-texto" },
  alternates: { canonical: "https://freeaikit.app/pt/imagem-para-texto", languages: { "en": "https://freeaikit.app/image-to-text", "es": "https://freeaikit.app/es/imagen-a-texto", "pt": "https://freeaikit.app/pt/imagem-para-texto", "x-default": "https://freeaikit.app/image-to-text" } },
};

export default function ImagemParaTextoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Imagem para Texto (OCR)" description="Extraia texto de imagens com OCR. Mais de 100 idiomas." slug="pt/imagem-para-texto" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Imagem para Texto (OCR) Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Extraia texto de qualquer imagem usando OCR. Suporta mais de 100 idiomas.</p>
      </div>
      <ImageToTextClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "O que é OCR?", a: "OCR (Reconhecimento Óptico de Caracteres) é uma tecnologia que reconhece texto dentro de imagens." },
            { q: "Quais idiomas são suportados?", a: "Mais de 100 idiomas incluindo português, inglês, espanhol, chinês, japonês e mais." },
            { q: "Minha imagem é enviada pra algum servidor?", a: "Não. Todo o processamento OCR roda no seu navegador usando Tesseract.js (WebAssembly)." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="image-to-text" />
    </div>
  );
}
