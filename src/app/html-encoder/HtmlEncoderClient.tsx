"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

type Tab = "encode" | "decode";

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

const NAMED_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function encodeHtml(text: string, mode: "named" | "numeric" | "all"): string {
  if (mode === "all") {
    // Encode ALL non-ASCII + special chars as numeric
    return Array.from(text)
      .map((ch) => {
        if (NAMED_ENTITIES[ch]) return NAMED_ENTITIES[ch];
        const code = ch.codePointAt(0)!;
        if (code > 127) return `&#${code};`;
        return ch;
      })
      .join("");
  }
  if (mode === "numeric") {
    return Array.from(text)
      .map((ch) => {
        const code = ch.codePointAt(0)!;
        if (ch === "&" || ch === "<" || ch === ">" || ch === '"' || ch === "'" || code > 127) {
          return `&#${code};`;
        }
        return ch;
      })
      .join("");
  }
  // named: only encode the 5 special chars
  return text.replace(/[&<>"']/g, (ch) => NAMED_ENTITIES[ch] || ch);
}

function decodeHtml(text: string): string {
  // Decode named entities
  const REVERSE: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": "\u00A0",
    "&copy;": "\u00A9",
    "&reg;": "\u00AE",
    "&trade;": "\u2122",
    "&mdash;": "\u2014",
    "&ndash;": "\u2013",
    "&laquo;": "\u00AB",
    "&raquo;": "\u00BB",
    "&hellip;": "\u2026",
  };

  let result = text;
  // Named entities
  for (const [entity, char] of Object.entries(REVERSE)) {
    result = result.split(entity).join(char);
  }
  // Numeric decimal: &#123;
  result = result.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
  // Numeric hex: &#x1F600;
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));

  return result;
}

export default function HtmlEncoderClient() {
  const [tab, setTab] = useState<Tab>("encode");
  const [input, setInput] = useState("");
  const [encodeMode, setEncodeMode] = useState<"named" | "numeric" | "all">("named");

  const output = input
    ? tab === "encode"
      ? encodeHtml(input, encodeMode)
      : decodeHtml(input)
    : "";

  const TABS: { key: Tab; label: string }[] = [
    { key: "encode", label: "Encode" },
    { key: "decode", label: "Decode" },
  ];

  const MODES: { value: "named" | "numeric" | "all"; label: string }[] = [
    { value: "named", label: "Named (&amp;)" },
    { value: "numeric", label: "Numeric (&#38;)" },
    { value: "all", label: "All + Non-ASCII" },
  ];

  const placeholder = tab === "encode"
    ? '<div class="hello">5 > 3 && "world" © 2026</div>'
    : '&lt;div class=&quot;hello&quot;&gt;5 &gt; 3 &amp;&amp; &quot;world&quot; &copy; 2026&lt;/div&gt;';

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${tab === key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
            {label}
          </button>
        ))}
        {tab === "encode" && (
          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs text-gray-500">Mode:</label>
            <select value={encodeMode} onChange={(e) => setEncodeMode(e.target.value as "named" | "numeric" | "all")}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {MODES.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <label className="text-sm font-semibold text-gray-700 block">
            {tab === "encode" ? "Text / HTML Input" : "Encoded HTML Entities"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={12}
            spellCheck={false}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              {tab === "encode" ? "Encoded Output" : "Decoded Output"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          {output ? (
            <pre className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-sm text-gray-700 overflow-auto max-h-[320px] whitespace-pre-wrap break-all">{output}</pre>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              Output will appear here as you type
            </div>
          )}
        </div>
      </div>

      {/* Reference table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Common HTML Entities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[
            ["&", "&amp;"],
            ["<", "&lt;"],
            [">", "&gt;"],
            ['"', "&quot;"],
            ["'", "&#39;"],
            ["\u00A0", "&nbsp;"],
            ["\u00A9", "&copy;"],
            ["\u00AE", "&reg;"],
            ["\u2122", "&trade;"],
            ["\u2014", "&mdash;"],
            ["\u2013", "&ndash;"],
            ["\u2026", "&hellip;"],
          ].map(([char, entity]) => (
            <div key={entity} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-xs font-mono">
              <span className="text-blue-600 font-bold text-sm">{char === "\u00A0" ? "⎵" : char}</span>
              <span className="text-gray-500">{entity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
