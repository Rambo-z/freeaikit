"use client";

import { useState, useCallback } from "react";
import { Copy, Check, AlertCircle, CheckCircle2 } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

type Mode = "beautify" | "minify";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button onClick={handleCopy} disabled={!text}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function parseXml(text: string): { doc: Document | null; error: string } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");
  const errorNode = doc.querySelector("parsererror");
  if (errorNode) {
    return { doc: null, error: errorNode.textContent || "XML parsing error" };
  }
  return { doc, error: "" };
}

function beautifyXml(text: string, indentStr: string): { result: string; error: string } {
  const { doc, error } = parseXml(text);
  if (!doc || error) return { result: "", error: error || "Invalid XML" };

  const lines: string[] = [];

  // Check for XML declaration
  const declMatch = text.match(/^<\?xml[^?]*\?>/);
  if (declMatch) lines.push(declMatch[0]);

  function serialize(node: Node, depth: number) {
    const indent = indentStr.repeat(depth);

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      let tag = `<${el.tagName}`;

      // Attributes
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        tag += ` ${attr.name}="${attr.value}"`;
      }

      // Self-closing if no children
      if (!el.childNodes.length) {
        lines.push(`${indent}${tag}/>`);
        return;
      }

      // Single text child — inline
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        const text = el.childNodes[0].textContent?.trim() || "";
        lines.push(`${indent}${tag}>${text}</${el.tagName}>`);
        return;
      }

      lines.push(`${indent}${tag}>`);
      for (let i = 0; i < el.childNodes.length; i++) {
        serialize(el.childNodes[i], depth + 1);
      }
      lines.push(`${indent}</${el.tagName}>`);
    } else if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) lines.push(`${indent}${text}`);
    } else if (node.nodeType === Node.COMMENT_NODE) {
      lines.push(`${indent}<!--${node.textContent}-->`);
    } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
      lines.push(`${indent}<![CDATA[${node.textContent}]]>`);
    } else if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
      const pi = node as ProcessingInstruction;
      lines.push(`${indent}<?${pi.target} ${pi.data}?>`);
    }
  }

  // Process top-level nodes
  for (let i = 0; i < doc.childNodes.length; i++) {
    serialize(doc.childNodes[i], 0);
  }

  return { result: lines.join("\n"), error: "" };
}

function minifyXml(text: string): { result: string; error: string } {
  const { error } = parseXml(text);
  if (error) return { result: "", error };

  // Remove whitespace between tags
  const result = text
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .replace(/>\s+/g, ">")
    .replace(/\s+</g, "<")
    .trim();

  return { result, error: "" };
}

export default function XmlFormatterClient() {
  const [mode, setMode] = useState<Mode>("beautify");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const handleFormat = useCallback(() => {
    trackToolEvent('xml-formatter', 'process');
    if (!input.trim()) return;
    setError("");
    setOutput("");

    const indentStr = " ".repeat(indent);
    const result = mode === "beautify" ? beautifyXml(input, indentStr) : minifyXml(input);

    if (result.error) {
      setError(result.error);
    } else {
      setOutput(result.result);
    }
  }, [input, mode, indent]);

  const MODES: { key: Mode; label: string }[] = [
    { key: "beautify", label: "Beautify" },
    { key: "minify", label: "Minify" },
  ];

  const placeholder = '<bookstore><book category="fiction"><title>The Great Gatsby</title><author>F. Scott Fitzgerald</author><price>10.99</price></book><book category="tech"><title>Clean Code</title><author>Robert C. Martin</author><price>29.99</price></book></bookstore>';

  const sizeInfo = output ? (
    <span className="text-xs text-gray-400">
      {input.length.toLocaleString()} → {output.length.toLocaleString()} chars
      {mode === "minify" && input.length > 0 && (
        <> ({Math.round((1 - output.length / input.length) * 100)}% smaller)</>
      )}
    </span>
  ) : null;

  return (
    <div className="space-y-5">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2">
        {MODES.map(({ key, label }) => (
          <button key={key} onClick={() => { setMode(key); setOutput(""); setError(""); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${mode === key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
            {label}
          </button>
        ))}
        {mode === "beautify" && (
          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs text-gray-500">Indent:</label>
            <select value={indent} onChange={(e) => setIndent(Number(e.target.value))}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <label className="text-sm font-semibold text-gray-700 block">XML Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={16}
            spellCheck={false}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button onClick={handleFormat} disabled={!input.trim()}
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors">
            {mode === "beautify" ? "Beautify XML" : "Minify XML"}
          </button>
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">Output</label>
              {sizeInfo}
            </div>
            {output && <CopyButton text={output} />}
          </div>

          {error && (
            <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600 break-all">{error}</p>
            </div>
          )}

          {output && !error && (
            <>
              <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valid XML
              </div>
              <pre className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-sm text-gray-700 overflow-auto max-h-[400px] whitespace-pre">{output}</pre>
            </>
          )}

          {!output && !error && (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              Output will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
