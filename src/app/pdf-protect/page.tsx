import type { Metadata } from "next";
import PdfProtectClient from "./PdfProtectClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PDF Protect - Add Password to PDF Online Free",
  description: "Add password protection to PDF files online. Encrypt your PDF with a password to restrict access. Free, no signup, 100% browser-based.",
  keywords: ["pdf protect", "add password to pdf", "pdf encrypt", "password protect pdf online", "pdf security free"],
  openGraph: {
    title: "PDF Protect - Add Password to PDF Online Free",
    description: "Add password protection to PDF files online. Encrypt and secure your PDF.",
    url: "https://freeaikit.app/pdf-protect",
  },
};

export default function PdfProtectPage() {
  return (
    <>
      <ToolJsonLd name="PDF Protect" description="Add password protection to PDF files online. Encrypt your PDF with a password to restrict access. Free, no signup, 100% browser-based." slug="pdf-protect" />
      <PdfProtectClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="pdf-protect" />
      </div>
    </>
  );
}
