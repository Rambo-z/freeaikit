import type { Metadata } from "next";
import HashGeneratorClient from "./HashGeneratorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Hash Generator - Free Online MD5, SHA-1, SHA-256, SHA-512 Tool",
  description:
    "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files. Real-time hashing, file drag & drop, one-click copy. Free, no upload to server.",
  keywords: [
    "hash generator",
    "md5 generator",
    "sha256 generator",
    "sha-512 hash",
    "online hash tool",
    "checksum generator",
    "file hash",
  ],
  openGraph: {
    title: "Hash Generator - Free Online MD5, SHA-1, SHA-256, SHA-512 Tool",
    description:
      "Generate cryptographic hashes from text or files instantly. Runs entirely in your browser — no uploads.",
    url: "https://freeaikit.app/hash-generator",
  },
};

export default function HashGeneratorPage() {
  return (
    <>
      <ToolJsonLd name="Hash Generator" description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files. Real-time hashing, file drag & drop, one-click copy. Free, no upload to server." slug="hash-generator" />
      <HashGeneratorClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="hash-generator" />
      </div>
    </>
  );
}
