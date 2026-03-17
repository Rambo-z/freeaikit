import type { Metadata } from "next";
import PdfExtractClient from "./PdfExtractClient";

export const metadata: Metadata = {
  title: "PDF Extract Pages - Extract Pages from PDF Online Free",
  description: "Extract specific pages from a PDF file online. Select page ranges and download as a new PDF. Free, no signup, 100% browser-based.",
  keywords: ["pdf extract pages", "extract pages from pdf", "pdf page extractor", "split pdf pages", "free pdf extract"],
  openGraph: {
    title: "PDF Extract Pages - Extract Pages from PDF Online Free",
    description: "Extract specific pages from a PDF file. Select ranges and download as new PDF.",
    url: "https://freeaikit.app/pdf-extract",
  },
};

export default function PdfExtractPage() {
  return <PdfExtractClient />;
}
