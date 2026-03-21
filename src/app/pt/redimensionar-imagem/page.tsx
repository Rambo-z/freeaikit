import type { Metadata } from "next";
import ImageResizeClient from "../../image-resize/ImageResizeClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Redimensionar Imagem Online Grátis | FreeAIKit",
  description: "Mude o tamanho de imagens online grátis. Redimensione em pixels ou porcentagem. Sem upload, no seu navegador.",
  keywords: ["redimensionar imagem", "mudar tamanho imagem", "resize imagem online", "redimensionar foto"],
  openGraph: { title: "Redimensionar Imagem Online Grátis", url: "https://freeaikit.app/pt/redimensionar-imagem" },
  alternates: { canonical: "https://freeaikit.app/pt/redimensionar-imagem", languages: { "en": "https://freeaikit.app/image-resize", "es": "https://freeaikit.app/es/redimensionar-imagen", "pt": "https://freeaikit.app/pt/redimensionar-imagem", "x-default": "https://freeaikit.app/image-resize" } },
};

export default function RedimensionarImagemPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Redimensionar Imagem" description="Mude o tamanho de imagens online grátis." slug="pt/redimensionar-imagem" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Redimensionar Imagem Online Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Mude o tamanho das suas imagens em pixels ou porcentagem. Grátis, no seu navegador.</p>
      </div>
      <ImageResizeClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "Posso manter a proporção?", a: "Sim. A ferramenta bloqueia a proporção por padrão. Você pode desbloquear pra dimensões personalizadas." },
            { q: "É grátis?", a: "Sim, completamente grátis. Sem marca d'água, sem limites, sem cadastro." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="image-resize" />
    </div>
  );
}
