import type { Metadata } from "next";
import JsonFormatterClient from "../../json-formatter/JsonFormatterClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Formatador JSON Online Grátis - Validar e Formatar JSON | FreeAIKit",
  description: "Formate e valide JSON online grátis. Indentação automática, destaque de sintaxe e detecção de erros. Sem upload, tudo no seu navegador.",
  keywords: ["formatador json", "formatar json online", "validar json", "json formatter", "editor json online", "json beautifier", "formatar json grátis"],
  openGraph: { title: "Formatador JSON Online Grátis", description: "Formate e valide JSON online grátis. Tudo no seu navegador.", url: "https://freeaikit.app/pt/formatador-json" },
  alternates: { canonical: "https://freeaikit.app/pt/formatador-json", languages: { "en": "https://freeaikit.app/json-formatter", "es": "https://freeaikit.app/es/formato-json", "pt": "https://freeaikit.app/pt/formatador-json", "x-default": "https://freeaikit.app/json-formatter" } },
};

export default function FormatadorJsonPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Formatador JSON Online" description="Formate e valide JSON online grátis. Indentação automática e detecção de erros." slug="pt/formatador-json" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Formatador JSON Online Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Formate, valide e embeleze seu JSON instantaneamente. Destaque de sintaxe, detecção de erros e indentação automática. 100% grátis, funciona no seu navegador.</p>
      </div>
      <JsonFormatterClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "O que é JSON?", a: "JSON (JavaScript Object Notation) é um formato leve de troca de dados, fácil de ler e escrever para humanos e máquinas." },
            { q: "O formatador valida meu JSON?", a: "Sim. O formatador detecta erros de sintaxe automaticamente e mostra onde está o problema no seu JSON." },
            { q: "Meus dados são seguros?", a: "Sim. Todo o processamento acontece localmente no seu navegador. Seus dados nunca são enviados para nenhum servidor." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="json-formatter" />
    </div>
  );
}
