import type { Metadata } from "next";
import BgRemoverClient from "../../bg-remover/BgRemoverClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Remover Fundo de Imagem Grátis com IA | FreeAIKit",
  description: "Remova o fundo de qualquer imagem com IA. Grátis, sem cadastro, sem marca d'água. Funciona no seu navegador.",
  keywords: ["remover fundo", "remover fundo imagem", "tirar fundo foto", "remover fundo online grátis", "apagar fundo imagem"],
  openGraph: { title: "Remover Fundo de Imagem Grátis", url: "https://freeaikit.app/pt/remover-fundo" },
  alternates: { canonical: "https://freeaikit.app/pt/remover-fundo", languages: { "en": "https://freeaikit.app/bg-remover", "es": "https://freeaikit.app/es/quitar-fondo", "pt": "https://freeaikit.app/pt/remover-fundo", "x-default": "https://freeaikit.app/bg-remover" } },
};

export default function RemoverFundoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Remover Fundo de Imagem" description="Remova o fundo de qualquer imagem com IA. Grátis." slug="pt/remover-fundo" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Remover Fundo de Imagem com IA</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Remova fundos de qualquer imagem em segundos. 100% grátis, funciona no seu navegador.</p>
      </div>
      <BgRemoverClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "É realmente grátis?", a: "Sim, completamente grátis. Sem marca d'água, sem cobranças." },
            { q: "Minhas fotos são enviadas pra algum servidor?", a: "Não. Todo o processamento acontece no seu navegador usando modelos de IA. Suas imagens nunca saem do seu dispositivo." },
            { q: "Quais formatos são suportados?", a: "PNG, JPG/JPEG e WebP como entrada. O resultado é sempre PNG com fundo transparente." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="bg-remover" />
    </div>
  );
}
