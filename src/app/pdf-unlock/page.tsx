import type { Metadata } from "next";
import PdfUnlockClient from "./PdfUnlockClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF Unlock - Remove PDF Password Online Free",
  description: "Remove password protection from PDF files online. Unlock encrypted PDFs instantly in your browser. No upload, 100% free, no signup required.",
  keywords: ["pdf unlock", "remove pdf password", "unlock pdf online", "pdf password remover", "decrypt pdf free"],
  openGraph: {
    title: "PDF Unlock - Remove PDF Password Online Free",
    description: "Remove password protection from PDF files online. Unlock encrypted PDFs instantly.",
    url: "https://freeaikit.app/pdf-unlock",
  },
};

export default function PdfUnlockPage() {
  return (
    <>
      <ToolJsonLd name="PDF Unlock" description="Remove password protection from PDF files online. Unlock encrypted PDFs instantly in your browser. No upload, 100% free, no signup required." slug="pdf-unlock" />
      <PdfUnlockClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="pdf-unlock" />
      </div>
    </>
  );
}
