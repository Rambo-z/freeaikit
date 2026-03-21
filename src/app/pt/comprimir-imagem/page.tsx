import type { Metadata } from "next";
import ImageCompressClient from "../../image-compress/ImageCompressClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Comprimir Imagem Online Grátis - Reduzir Tamanho JPG PNG | FreeAIKit",
  description: "Comprima imagens online grátis. Reduza o tamanho de arquivos JPG, PNG e WebP em até 80% sem perder qualidade. Sem upload, tudo no seu navegador.",
  keywords: ["comprimir imagem", "comprimir imagem online", "comprimir foto", "reduzir tamanho imagem", "comprimir jpg", "comprimir png", "compressor de imagem"],
  openGraph: { title: "Comprimir Imagem Online Grátis", description: "Comprima imagens JPG, PNG e WebP grátis. Tudo no seu navegador.", url: "https://freeaikit.app/pt/comprimir-imagem" },
  alternates: { canonical: "https://freeaikit.app/pt/comprimir-imagem", languages: { "en": "https://freeaikit.app/image-compress", "es": "https://freeaikit.app/es/comprimir-imagen", "pt": "https://freeaikit.app/pt/comprimir-imagem", "x-default": "https://freeaikit.app/image-compress" } },
};

export default function ComprimirImagemPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Comprimir Imagem Online" description="Comprima imagens online grátis. Reduza o tamanho de arquivos JPG, PNG e WebP em até 80%." slug="pt/comprimir-imagem" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Comprimir Imagem Online Grátis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Reduza o tamanho das suas imagens em até 80% mantendo a qualidade visual. 100% grátis, funciona no seu navegador. Seus arquivos nunca saem do seu dispositivo.</p>
      </div>
      <ImageCompressClient />
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Como funciona a compressão de imagens?</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Nosso compressor usa motores WebAssembly (WASM) de nível profissional — MozJPEG pra JPG, libwebp pra WebP e libimagequant (o mesmo motor do TinyPNG) pra PNG. A compressão de PNG usa quantização perceptual de cor, reduzindo o tamanho do arquivo em 60–80% mantendo a imagem visualmente idêntica. Todo o processamento roda localmente no seu navegador.</p>
      </section>
      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            { q: "É realmente grátis?", a: "Sim, completamente grátis sem limites. Comprima quantas imagens quiser." },
            { q: "A compressão reduz a qualidade?", a: "Você controla o nível de qualidade com um controle deslizante. Com qualidade em 80%, a maioria das imagens fica idêntica ao original." },
            { q: "Quais formatos são suportados?", a: "JPG/JPEG, PNG e WebP. Você também pode converter entre formatos durante a compressão." },
            { q: "Minhas imagens são enviadas pra algum servidor?", a: "Não. Todo o processamento acontece localmente no seu navegador usando WebAssembly. Suas imagens nunca saem do seu dispositivo." },
          ].map(({ q, a }) => (<div key={q}><h3 className="font-semibold mb-1">{q}</h3><p className="text-gray-600 text-sm">{a}</p></div>))}
        </div>
      </section>
      <RelatedTools currentSlug="image-compress" />
    </div>
  );
}
