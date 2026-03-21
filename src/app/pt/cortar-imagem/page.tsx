import type { Metadata } from "next";
import ImageCropClient from "../../image-crop/ImageCropClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Cortar Imagem Online Grátis - Recortar Foto | FreeAIKit",
  description: "Corte imagens online grátis. Proporções predefinidas (1:1, 4:3, 16:9), rotação e espelhamento. Sem upload.",
  keywords: ["cortar imagem", "recortar foto", "cortar imagem online", "crop imagem online grátis"],
  openGraph: { title: "Cortar Imagem Online Grátis", url: "https://freeaikit.app/pt/cortar-imagem" },
  alternates: { canonical: "https://freeaikit.app/pt/cortar-imagem", languages: { "en": "https://freeaikit.app/image-crop", "es": "https://freeaikit.app/es/recortar-imagen", "pt": "https://freeaikit.app/pt/cortar-imagem", "x-default": "https://freeaikit.app/image-crop" } },
};

export default function CortarImagemPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Cortar Imagem Online" description="Corte imagens online grátis." slug="pt/cortar-imagem" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Cortar Imagem Online Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Recorte e gire suas imagens com proporções predefinidas. Grátis, no seu navegador.</p>
      </div>
      <ImageCropClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "Quais proporções estão disponíveis?", a: "Livre, 1:1, 4:3, 16:9, 3:4, 9:16. Perfeitas pra redes sociais e apresentações." },
            { q: "Posso girar a imagem?", a: "Sim. Você pode girar 90° nas duas direções e espelhar horizontal ou verticalmente." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="image-crop" />
    </div>
  );
}
