import type { Metadata } from "next";
import ImageToPdfClient from "../../image-to-pdf/ImageToPdfClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Imagem para PDF Online Grátis - Converter JPG para PDF | FreeAIKit",
  description: "Converta imagens para PDF online grátis. JPG, PNG, WebP para PDF. Múltiplas imagens em um só PDF. Sem upload.",
  keywords: ["imagem para pdf", "jpg para pdf", "converter imagem para pdf", "foto para pdf", "jpg para pdf online grátis"],
  openGraph: { title: "Imagem para PDF Online Grátis", url: "https://freeaikit.app/pt/imagem-para-pdf" },
  alternates: { canonical: "https://freeaikit.app/pt/imagem-para-pdf", languages: { "en": "https://freeaikit.app/image-to-pdf", "es": "https://freeaikit.app/es/imagen-a-pdf", "pt": "https://freeaikit.app/pt/imagem-para-pdf", "x-default": "https://freeaikit.app/image-to-pdf" } },
};

export default function ImagemParaPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Imagem para PDF" description="Converta imagens para PDF online grátis." slug="pt/imagem-para-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Converter Imagem para PDF Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Converta JPG, PNG e WebP para PDF. Combine múltiplas imagens em um só arquivo PDF.</p>
      </div>
      <ImageToPdfClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "Posso combinar várias imagens em um PDF?", a: "Sim. Envie múltiplas imagens e elas serão combinadas em um só arquivo PDF na ordem que você escolher." },
            { q: "A qualidade é mantida?", a: "Sim. As imagens são inseridas no PDF sem recompressão adicional." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="image-to-pdf" />
    </div>
  );
}
