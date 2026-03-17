"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Code,
  Link,
  Image,
  Heading,
  List,
  Copy,
  Download,
  Eye,
  Edit,
  Columns,
  Check,
} from "lucide-react";

// ─── Markdown Parser ──────────────────────────────────────────────────────────

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseMarkdown(md: string): string {
  let html = md;

  // Stash fenced code blocks first so inner content isn't processed
  const codeBlocks: string[] = [];
  html = html.replace(/```([\w]*)\n?([\s\S]*?)```/g, (_m, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(
      `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">${
        lang
          ? `<div class="text-gray-400 text-xs mb-2 font-sans">${escHtml(lang)}</div>`
          : ""
      }<code>${escHtml(code.replace(/\n$/, ""))}</code></pre>`
    );
    return `%%CODE${idx}%%`;
  });

  // Stash inline code
  const inlineCodes: string[] = [];
  html = html.replace(/`([^`]+)`/g, (_m, code) => {
    const idx = inlineCodes.length;
    inlineCodes.push(
      `<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600">${escHtml(code)}</code>`
    );
    return `%%INLINE${idx}%%`;
  });

  // Headings
  html = html.replace(
    /^#### (.+)$/gm,
    '<h4 class="text-base font-semibold mt-4 mb-2 text-gray-900">$1</h4>'
  );
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="text-lg font-semibold mt-5 mb-2 text-gray-900">$1</h3>'
  );
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-900 border-b border-gray-200 pb-1">$1</h2>'
  );
  html = html.replace(
    /^# (.+)$/gm,
    '<h1 class="text-3xl font-bold mt-4 mb-4 text-gray-900">$1</h1>'
  );

  // Blockquote
  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-3 bg-blue-50 py-2 rounded-r">$1</blockquote>'
  );

  // HR
  html = html.replace(/^---$/gm, '<hr class="border-gray-200 my-6" />');

  // Unordered lists
  html = html.replace(
    /^[\*\-] (.+)$/gm,
    '<li class="ml-4 list-disc text-gray-700">$1</li>'
  );
  // Ordered lists
  html = html.replace(
    /^\d+\. (.+)$/gm,
    '<li class="ml-4 list-decimal text-gray-700">$1</li>'
  );

  // Wrap consecutive <li> elements
  html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, (m) => {
    if (m.includes("list-decimal"))
      return `<ol class="my-3 pl-4 space-y-1">${m}</ol>`;
    return `<ul class="my-3 pl-4 space-y-1">${m}</ul>`;
  });

  // Inline formatting — order matters: bold+italic before bold before italic
  html = html.replace(
    /\*\*\*(.+?)\*\*\*/g,
    "<strong><em>$1</em></strong>"
  );
  html = html.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold text-gray-900">$1</strong>'
  );
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // Images before links (same bracket syntax, but has leading !)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="max-w-full rounded-lg my-3 shadow-sm" />'
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
  );

  // Restore stashed blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace(`%%CODE${i}%%`, block);
  });
  inlineCodes.forEach((code, i) => {
    html = html.replace(`%%INLINE${i}%%`, code);
  });

  // Paragraphs: double newline → paragraph break
  html = html.replace(
    /\n\n+/g,
    '</p><p class="my-3 text-gray-700 leading-relaxed">'
  );
  html =
    '<p class="my-3 text-gray-700 leading-relaxed">' + html + "</p>";

  // Strip <p> wrappers around block-level elements
  html = html.replace(
    /<p[^>]*>\s*(<(?:h[1-6]|ul|ol|pre|blockquote|hr)[^>]*>)/g,
    "$1"
  );
  html = html.replace(
    /(<\/(?:h[1-6]|ul|ol|pre|blockquote|hr)>)\s*<\/p>/g,
    "$1"
  );

  // Single newlines → <br> (only between text nodes)
  html = html.replace(/([^>])\n([^<])/g, "$1<br />$2");

  return html;
}

// ─── Sample Content ───────────────────────────────────────────────────────────

const SAMPLE_MD = `# Welcome to Markdown Editor

Write **Markdown** on the left, see the preview on the right.

## Features

- Real-time preview
- **Bold** and *italic* text
- \`inline code\` and code blocks
- [Links](https://freeaikit.app) and images
- ~~Strikethrough~~ text

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Blockquote

> This is a blockquote. Use it for important notes.

## Ordered List

1. First item
2. Second item
3. Third item

---

Made with ❤️ by FreeAIKit
`;

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "split" | "editor" | "preview";

// ─── Component ────────────────────────────────────────────────────────────────

export default function MarkdownEditorClient() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [copiedHtml, setCopiedHtml] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const renderedHtml = parseMarkdown(markdown);

  const wordCount = markdown
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const lineCount = markdown.split("\n").length;
  const charCount = markdown.length;

  // ── Toolbar insert helpers ─────────────────────────────────────────────────
  const insertAt = useCallback(
    (before: string, after = "", placeholder = "") => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = markdown.slice(start, end) || placeholder;
      const newText =
        markdown.slice(0, start) +
        before +
        selected +
        after +
        markdown.slice(end);
      setMarkdown(newText);
      // Restore cursor after React re-render
      requestAnimationFrame(() => {
        ta.focus();
        const cursor = start + before.length + selected.length;
        ta.setSelectionRange(cursor, cursor);
      });
    },
    [markdown]
  );

  const toolbarActions = [
    {
      icon: Bold,
      label: "Bold",
      action: () => insertAt("**", "**", "bold text"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => insertAt("*", "*", "italic text"),
    },
    {
      icon: Code,
      label: "Inline Code",
      action: () => insertAt("`", "`", "code"),
    },
    {
      icon: Heading,
      label: "Heading",
      action: () => insertAt("## ", "", "Heading"),
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertAt("[", "](https://)", "link text"),
    },
    {
      icon: Image,
      label: "Image",
      action: () => insertAt("![", "](https://)", "alt text"),
    },
    {
      icon: List,
      label: "List",
      action: () => insertAt("- ", "", "list item"),
    },
  ];

  // ── Export helpers ─────────────────────────────────────────────────────────
  const copyHtml = async () => {
    await navigator.clipboard.writeText(renderedHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const downloadMd = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHtml = () => {
    const full = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #111; line-height: 1.7; }
    h1 { font-size: 2em; border-bottom: 1px solid #e5e7eb; padding-bottom: .3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #e5e7eb; padding-bottom: .3em; }
    h3 { font-size: 1.25em; }
    pre { background: #1f2937; color: #f9fafb; padding: 1em; border-radius: .5em; overflow-x: auto; }
    code { background: #f3f4f6; padding: .15em .4em; border-radius: .25em; font-size: .9em; color: #db2777; }
    pre code { background: none; color: inherit; padding: 0; }
    blockquote { border-left: 4px solid #60a5fa; margin: 0; padding: .5em 1em; background: #eff6ff; color: #374151; border-radius: 0 .25em .25em 0; }
    a { color: #2563eb; }
    img { max-width: 100%; border-radius: .5em; }
    hr { border: none; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
${renderedHtml}
</body>
</html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── View mode button helper ────────────────────────────────────────────────
  const viewButtons: { mode: ViewMode; icon: typeof Edit; label: string }[] = [
    { mode: "editor", icon: Edit, label: "Editor" },
    { mode: "split", icon: Columns, label: "Split" },
    { mode: "preview", icon: Eye, label: "Preview" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">Markdown Editor</h1>
          <p className="text-xs text-gray-500">
            Real-time preview &bull; runs in your browser &bull; free forever
          </p>
        </div>

        {/* View mode toggles */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {viewButtons.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === mode
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Export buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copiedHtml ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copiedHtml ? "Copied!" : "Copy HTML"}
          </button>
          <button
            onClick={downloadMd}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            .md
          </button>
          <button
            onClick={downloadHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            .html
          </button>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-1 flex-wrap">
        {toolbarActions.map(({ icon: Icon, label, action }) => (
          <button
            key={label}
            onClick={action}
            title={label}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium"
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Editor / Preview panes ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor pane */}
        {(viewMode === "editor" || viewMode === "split") && (
          <div
            className={`flex flex-col ${
              viewMode === "split" ? "w-1/2 border-r border-gray-200" : "w-full"
            } bg-white`}
          >
            <div className="px-3 py-1.5 border-b border-gray-100 text-xs text-gray-400 font-medium uppercase tracking-wide">
              Editor
            </div>
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 font-mono text-sm text-gray-800 resize-none focus:outline-none bg-white leading-relaxed"
              placeholder="Start writing Markdown..."
            />
          </div>
        )}

        {/* Preview pane */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div
            className={`flex flex-col overflow-hidden ${
              viewMode === "split" ? "w-1/2" : "w-full"
            } bg-white`}
          >
            <div className="px-3 py-1.5 border-b border-gray-100 text-xs text-gray-400 font-medium uppercase tracking-wide">
              Preview
            </div>
            <div
              className="flex-1 overflow-y-auto p-6"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        )}
      </div>

      {/* ── Status bar ── */}
      <div className="bg-white border-t border-gray-200 px-4 py-1.5 flex items-center gap-4 text-xs text-gray-500">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
        <span>{lineCount} lines</span>
        <span className="ml-auto text-gray-400">Markdown Editor — FreeAIKit</span>
      </div>
    </div>
  );
}
