import type { Metadata } from "next";
import HashGeneratorClient from "./HashGeneratorClient";

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
  return <HashGeneratorClient />;
}
