import type { Metadata } from "next";
import PdfRotateClient from "./PdfRotateClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF Rotate - Rotate PDF Pages Online Free",
  description: "Rotate PDF pages online. Rotate all pages or specific pages by 90, 180, or 270 degrees. Free, no signup, works in your browser.",
  keywords: ["pdf rotate", "rotate pdf pages", "rotate pdf online", "pdf page rotation", "free pdf rotate"],
  openGraph: {
    title: "PDF Rotate - Rotate PDF Pages Online Free",
    description: "Rotate PDF pages online. All pages or specific pages, 90/180/270 degrees.",
    url: "https://freeaikit.app/pdf-rotate",
  },
};

export default function PdfRotatePage() {
  return (
    <>
      <ToolJsonLd name="PDF Rotate" description="Rotate PDF pages online. Rotate all pages or specific pages by 90, 180, or 270 degrees. Free, no signup, works in your browser." slug="pdf-rotate" />
      <PdfRotateClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="pdf-rotate" />
      </div>
    </>
  );
}
