import type { Metadata } from "next";
import UuidGeneratorClient from "./UuidGeneratorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "UUID Generator - Free Online UUID v4 Generator",
  description:
    "Generate random UUID v4 identifiers instantly. Bulk generation up to 100 UUIDs, multiple formats (standard, uppercase, no hyphens, braces), copy all, download as TXT. Free, no signup.",
  keywords: [
    "uuid generator",
    "uuid v4",
    "random uuid",
    "guid generator",
    "unique id generator",
    "online uuid",
    "bulk uuid",
  ],
  openGraph: {
    title: "UUID Generator - Free Online UUID v4 Generator",
    description:
      "Generate up to 100 UUID v4 identifiers with format options. Copy all or download as TXT.",
    url: "https://freeaikit.app/uuid-generator",
  },
};

export default function UuidGeneratorPage() {
  return (
    <>
      <ToolJsonLd name="UUID Generator" description="Generate random UUID v4 identifiers instantly. Bulk generation up to 100 UUIDs, multiple formats (standard, uppercase, no hyphens, braces), copy all, download as TXT. Free, no signup." slug="uuid-generator" />
      <UuidGeneratorClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="uuid-generator" />
      </div>
    </>
  );
}
