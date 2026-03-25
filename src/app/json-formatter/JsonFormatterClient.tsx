"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Download, Trash2, Braces, Minimize2 } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

function syntaxHighlight(json: string): string {
  const escaped = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let style = "color:#d97706"; // number - amber
      if (/^"/.test(match)) {
        style = /:$/.test(match)
          ? "color:#0369a1;font-weight:600" // key - blue
          : "color:#16a34a"; // string - green
      } else if (/true|false/.test(match)) {
        style = "color:#7c3aed"; // boolean - violet
      } else if (/null/.test(match)) {
        style = "color:#dc2626"; // null - red
      }
      return `<span style="${style}">${match}</span>`;
    }
  );
}

export default function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"format" | "minify" | "">("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const process = useCallback(
    (raw: string, m: "format" | "minify") => {
      setError("");
      if (!raw.trim()) return;
      try {
        const parsed = JSON.parse(raw);
        const result =
          m === "format" ? JSON.stringify(parsed, null, indent) : JSON.stringify(parsed);
        setOutput(result);
        setHighlighted(syntaxHighlight(result));
        setMode(m);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Invalid JSON");
        setOutput("");
        setHighlighted("");
      }
    },
    [indent]
  );

  const copy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [output]);

  const download = useCallback(() => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "minify" ? "data.min.json" : "data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [output, mode]);

  const inputBytes = new Blob([input]).size;
  const outputBytes = new Blob([output]).size;

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-sm font-semibold text-gray-700">JSON Input</h2>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Indent:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 space</option>
            </select>
            {input && (
              <button
                onClick={() => {
                  setInput("");
                  setOutput("");
                  setHighlighted("");
                  setError("");
                  setMode("");
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-red-500 border border-gray-200 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Paste your JSON here...\n\n{\n  "name": "FreeAIKit",\n  "free": true,\n  "tools": 16\n}`}
          rows={10}
          spellCheck={false}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-xs font-mono">{error}</p>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => process(input, "format")}
            disabled={!input.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm shadow-blue-500/20"
          >
            <Braces className="w-4 h-4" />
            Format / Beautify
          </button>
          <button
            onClick={() => process(input, "minify")}
            disabled={!input.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-900 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Minimize2 className="w-4 h-4" />
            Minify
          </button>
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-sm font-semibold text-gray-700">
                {mode === "format" ? "Formatted JSON" : "Minified JSON"}
              </h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-500">
                  {(inputBytes / 1024).toFixed(1)} KB
                </span>
                <span className="text-gray-400">→</span>
                <span
                  className={`px-2 py-0.5 rounded font-mono ${
                    outputBytes < inputBytes
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {(outputBytes / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={download}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>

          <pre
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono overflow-auto max-h-[500px] leading-relaxed whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>
      )}
    </div>
  );
}
