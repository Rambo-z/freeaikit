import type { Metadata } from "next";
import PdfMergeClient from "../../pdf-merge/PdfMergeClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Juntar PDF Online Grátis - Combinar Arquivos PDF | FreeAIKit",
  description: "Junte e combine arquivos PDF online grátis. Arraste, reordene e baixe o arquivo combinado. Sem cadastro, sem limites.",
  keywords: ["juntar pdf", "combinar pdf", "unir pdf", "mesclar pdf", "juntar pdf online grátis"],
  openGraph: { title: "Juntar PDF Online Grátis", url: "https://freeaikit.app/pt/juntar-pdf" },
  alternates: { canonical: "https://freeaikit.app/pt/juntar-pdf", languages: { "en": "https://freeaikit.app/pdf-merge", "es": "https://freeaikit.app/es/unir-pdf", "pt": "https://freeaikit.app/pt/juntar-pdf", "x-default": "https://freeaikit.app/pdf-merge" } },
};

export default function JuntarPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Juntar PDF Online" description="Junte e combine arquivos PDF online grátis." slug="pt/juntar-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Juntar PDF Online Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Combine múltiplos arquivos PDF em um só. Arraste, reordene e baixe. Grátis, no seu navegador.</p>
      </div>
      <PdfMergeClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "Quantos PDFs posso juntar?", a: "Sem limite. Combine quantos arquivos PDF precisar." },
            { q: "A qualidade é mantida?", a: "Sim. Os arquivos são combinados sem recompressão, mantendo a qualidade original." },
            { q: "É seguro?", a: "Completamente. Seus arquivos PDF são processados localmente no seu navegador e nunca são enviados pra nenhum servidor." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-merge" />
    </div>
  );
}
