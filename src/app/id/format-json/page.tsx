import type { Metadata } from "next";
import JsonFormatterClient from "../../json-formatter/JsonFormatterClient";
import ToolJsonLd from "../../components/ToolJsonLd";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Format JSON Online Gratis - JSON Formatter & Validator | FreeAIKit",
  description: "Format dan validasi JSON online gratis. Beautify, minify, dan periksa JSON. Tanpa upload ke server, semua diproses di browser.",
  keywords: ["format json", "json formatter online", "json validator", "beautify json", "format json gratis", "json formatter gratis"],
  openGraph: { title: "Format JSON Online Gratis", description: "Format dan validasi JSON gratis. Semua di browser.", url: "https://freeaikit.app/id/format-json" },
  alternates: { canonical: "https://freeaikit.app/id/format-json", languages: { en: "https://freeaikit.app/json-formatter", id: "https://freeaikit.app/id/format-json", "x-default": "https://freeaikit.app/json-formatter" } },
};

export default function FormatJsonPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Format JSON Online" description="Format dan validasi JSON online gratis. Beautify, minify, dan periksa JSON." slug="id/format-json" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Format JSON Online Gratis</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Format, validasi, dan beautify data JSON. 100% gratis, diproses di browser kamu.</p>
      </div>
      <JsonFormatterClient />
      <RelatedTools currentSlug="json-formatter" />
    </div>
  );
}
