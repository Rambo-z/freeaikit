import type { Metadata } from "next";
import PdfToImagesClient from "../../pdf-to-images/PdfToImagesClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF para Imagem Online Grátis - Converter PDF para JPG PNG | FreeAIKit",
  description: "Converta PDF para imagens JPG ou PNG online grátis. Escolha resolução e qualidade. Sem upload, tudo no seu navegador.",
  keywords: ["pdf para imagem", "pdf para jpg", "converter pdf para imagem", "pdf para png", "pdf para jpg online grátis"],
  openGraph: { title: "PDF para Imagem Online Grátis", url: "https://freeaikit.app/pt/pdf-para-imagem" },
  alternates: { canonical: "https://freeaikit.app/pt/pdf-para-imagem", languages: { "en": "https://freeaikit.app/pdf-to-images", "es": "https://freeaikit.app/es/pdf-a-imagen", "pt": "https://freeaikit.app/pt/pdf-para-imagem", "x-default": "https://freeaikit.app/pdf-to-images" } },
};

export default function PdfParaImagemPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="PDF para Imagem" description="Converta PDF para imagens JPG ou PNG online grátis." slug="pt/pdf-para-imagem" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Converter PDF para Imagem Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Converta cada página do seu PDF em uma imagem JPG ou PNG. Escolha resolução e qualidade.</p>
      </div>
      <PdfToImagesClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "Quais formatos de saída?", a: "JPG ou PNG. JPG é menor, PNG mantém melhor a qualidade." },
            { q: "Posso escolher a resolução?", a: "Sim. Ajuste os DPI de 72 até 300 pra controlar qualidade e tamanho." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-to-images" />
    </div>
  );
}
