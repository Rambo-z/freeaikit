import type { Metadata } from "next";
import ImageConvertClient from "../../image-convert/ImageConvertClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Converter Imagem Online Grátis - JPG PNG WebP | FreeAIKit",
  description: "Converta imagens entre JPG, PNG e WebP grátis. Conversão em lote, sem perda de qualidade. No seu navegador.",
  keywords: ["converter imagem", "converter jpg pra png", "converter png pra jpg", "conversor de imagem online grátis"],
  openGraph: { title: "Converter Imagem Online Grátis", url: "https://freeaikit.app/pt/converter-imagem" },
  alternates: { canonical: "https://freeaikit.app/pt/converter-imagem", languages: { "en": "https://freeaikit.app/image-convert", "es": "https://freeaikit.app/es/convertir-imagen", "pt": "https://freeaikit.app/pt/converter-imagem", "x-default": "https://freeaikit.app/image-convert" } },
};

export default function ConverterImagemPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Converter Imagem Online" description="Converta imagens entre JPG, PNG e WebP grátis." slug="pt/converter-imagem" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Converter Imagem Online Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Converta entre JPG, PNG e WebP instantaneamente. Processamento em lote, sem perda de qualidade.</p>
      </div>
      <ImageConvertClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "Quais formatos posso converter?", a: "JPG, PNG e WebP em qualquer direção." },
            { q: "Perde qualidade?", a: "A conversão mantém a máxima qualidade possível. Você pode ajustar o nível com o controle deslizante." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="image-convert" />
    </div>
  );
}
