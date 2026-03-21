import type { Metadata } from "next";
import PdfCompressClient from "../../pdf-compress/PdfCompressClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Comprimir PDF Online Grátis - Reduzir Tamanho PDF | FreeAIKit",
  description: "Comprima arquivos PDF online grátis. Reduza o tamanho dos seus PDFs mantendo a qualidade. Sem upload, tudo no seu navegador.",
  keywords: ["comprimir pdf", "comprimir pdf online", "reduzir tamanho pdf", "comprimir pdf grátis", "compressor pdf"],
  openGraph: { title: "Comprimir PDF Online Grátis", url: "https://freeaikit.app/pt/comprimir-pdf" },
  alternates: { canonical: "https://freeaikit.app/pt/comprimir-pdf", languages: { "en": "https://freeaikit.app/pdf-compress", "es": "https://freeaikit.app/es/comprimir-pdf", "pt": "https://freeaikit.app/pt/comprimir-pdf", "x-default": "https://freeaikit.app/pdf-compress" } },
};

export default function ComprimirPdfPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Comprimir PDF Online" description="Comprima arquivos PDF online grátis." slug="pt/comprimir-pdf" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Comprimir PDF Online Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Reduza o tamanho dos seus arquivos PDF mantendo a qualidade. Grátis, sem cadastro, no seu navegador.</p>
      </div>
      <PdfCompressClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "Quanto posso reduzir?", a: "Dependendo do conteúdo do PDF, você pode reduzir entre 30% e 70%. PDFs com muitas imagens comprimem mais." },
            { q: "É seguro?", a: "Sim. Seus arquivos PDF são processados localmente no seu navegador e nunca são enviados pra nenhum servidor." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="pdf-compress" />
    </div>
  );
}
