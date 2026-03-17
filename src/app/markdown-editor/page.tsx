import type { Metadata } from "next";
import MarkdownEditorClient from "./MarkdownEditorClient";

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
  return <MarkdownEditorClient />;
}
