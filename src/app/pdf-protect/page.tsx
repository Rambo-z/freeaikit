import type { Metadata } from "next";
import PdfProtectClient from "./PdfProtectClient";

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
  return <PdfProtectClient />;
}
