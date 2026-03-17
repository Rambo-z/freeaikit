import type { Metadata } from "next";
import MarkdownEditorClient from "./MarkdownEditorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Markdown Editor - Free Online Markdown Preview",
  description:
    "Write and preview Markdown online with real-time rendering. Split-pane editor with live preview, syntax highlighting, and export to HTML. Free, no signup.",
  keywords: [
    "markdown editor",
    "markdown preview",
    "online markdown",
    "markdown to html",
    "free markdown editor",
  ],
  openGraph: {
    title: "Markdown Editor - Free Online Markdown Preview",
    description:
      "Write and preview Markdown online with real-time rendering.",
    url: "https://freeaikit.app/markdown-editor",
  },
};

export default function MarkdownEditorPage() {
  return (
    <>
      <ToolJsonLd name="Markdown Editor" description="Write and preview Markdown online with real-time rendering. Split-pane editor with live preview, syntax highlighting, and export to HTML. Free, no signup." slug="markdown-editor" />
      <MarkdownEditorClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="markdown-editor" />
      </div>
    </>
  );
}
