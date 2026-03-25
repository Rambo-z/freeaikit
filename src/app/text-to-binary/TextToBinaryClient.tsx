"use client";

import { useState, useCallback } from "react";
import { Copy, Check, ArrowLeftRight } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

type Mode = "text-to-bin" | "bin-to-text";
type Encoding = "binary" | "hex" | "octal" | "decimal";

function textToBin(text: string, encoding: Encoding): string {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes)
    .map((b) => {
      switch (encoding) {
        case "binary":  return b.toString(2).padStart(8, "0");
        case "hex":     return b.toString(16).padStart(2, "0");
        case "octal":   return b.toString(8).padStart(3, "0");
        case "decimal": return b.toString(10);
      }
    })
    .join(" ");
}

function binToText(input: string, encoding: Encoding): string {
  try {
    const parts = input.trim().split(/\s+/);
    const bytes = parts.map((p) => {
      switch (encoding) {
        case "binary":  return parseInt(p, 2);
        case "hex":     return parseInt(p, 16);
        case "octal":   return parseInt(p, 8);
        case "decimal": return parseInt(p, 10);
      }
    });
    if (bytes.some(isNaN)) return "[Invalid input]";
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch {
    return "[Invalid input]";
  }
}

export default function TextToBinaryClient() {
  const [mode, setMode] = useState<Mode>("text-to-bin");
  const [encoding, setEncoding] = useState<Encoding>("binary");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = input
    ? mode === "text-to-bin"
      ? textToBin(input, encoding)
      : binToText(input, encoding)
    : "";

  const swap = useCallback(() => {
    setMode((m) => (m === "text-to-bin" ? "bin-to-text" : "text-to-bin"));
    setInput(output);
  }, [output]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [output]);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
            {(["text-to-bin", "bin-to-text"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setInput(""); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === m ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                {m === "text-to-bin" ? "Text → Code" : "Code → Text"}
              </button>
            ))}
          </div>
          <select
            value={encoding}
            onChange={(e) => setEncoding(e.target.value as Encoding)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="binary">Binary (01)</option>
            <option value="hex">Hexadecimal (0F)</option>
            <option value="octal">Octal (07)</option>
            <option value="decimal">Decimal (0-255)</option>
          </select>
          <button
            onClick={swap}
            disabled={!output}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Swap
          </button>
        </div>
      </div>

      {/* Input / Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
          <h2 className="text-sm font-semibold text-gray-700">
            {mode === "text-to-bin" ? "Text Input" : `${encoding.charAt(0).toUpperCase() + encoding.slice(1)} Input`}
          </h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "text-to-bin" ? "Type text here..." : `Paste ${encoding} values separated by spaces...`}
            rows={6}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              {mode === "text-to-bin" ? `${encoding.charAt(0).toUpperCase() + encoding.slice(1)} Output` : "Text Output"}
            </h2>
            <button
              onClick={copy}
              disabled={!output}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="min-h-[150px] px-3 py-2 bg-gray-50 rounded-xl text-sm font-mono text-gray-700 break-all leading-relaxed whitespace-pre-wrap">
            {output || <span className="text-gray-300 italic">Output will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
