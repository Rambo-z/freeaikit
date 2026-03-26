"use client";

import { useState, useCallback, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

type SortMode = "alpha" | "alpha-rev" | "length" | "length-rev" | "numeric" | "numeric-rev" | "random";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "alpha",       label: "A → Z" },
  { value: "alpha-rev",   label: "Z → A" },
  { value: "numeric",     label: "Numeric ↑" },
  { value: "numeric-rev", label: "Numeric ↓" },
  { value: "length",      label: "Shortest first" },
  { value: "length-rev",  label: "Longest first" },
  { value: "random",      label: "Random shuffle" },
];

function sortLines(lines: string[], mode: SortMode, caseSensitive: boolean): string[] {
  const arr = [...lines];
  const key = (s: string) => (caseSensitive ? s : s.toLowerCase());

  switch (mode) {
    case "alpha":
      return arr.sort((a, b) => key(a).localeCompare(key(b)));
    case "alpha-rev":
      return arr.sort((a, b) => key(b).localeCompare(key(a)));
    case "numeric":
      return arr.sort((a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0));
    case "numeric-rev":
      return arr.sort((a, b) => (parseFloat(b) || 0) - (parseFloat(a) || 0));
    case "length":
      return arr.sort((a, b) => a.length - b.length);
    case "length-rev":
      return arr.sort((a, b) => b.length - a.length);
    case "random":
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
  }
}

export default function SortLinesClient() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<SortMode>("alpha");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [removeDups, setRemoveDups] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const output = useMemo(() => {
    if (!input) return "";
    let lines = input.split("\n");
    if (removeEmpty) lines = lines.filter((l) => l.trim().length > 0);
    if (removeDups) {
      const seen = new Set<string>();
      lines = lines.filter((l) => {
        const k = caseSensitive ? l : l.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }
    return sortLines(lines, mode, caseSensitive).join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode, caseSensitive, removeEmpty, removeDups, shuffleKey]);

  const copy = useCallback(() => {
    trackToolEvent('sort-lines', 'process');
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [output]);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Sort Order</label>
            <select
              value={mode}
              onChange={(e) => { setMode(e.target.value as SortMode); if (e.target.value === "random") setShuffleKey((k) => k + 1); }}
              className="block px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          {mode === "random" && (
            <button
              onClick={() => setShuffleKey((k) => k + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Reshuffle
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
            <span className="text-sm text-gray-700">Case sensitive</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
            <span className="text-sm text-gray-700">Remove empty lines</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={removeDups} onChange={(e) => setRemoveDups(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
            <span className="text-sm text-gray-700">Remove duplicates</span>
          </label>
        </div>
      </div>

      {/* Input / Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
          <h2 className="text-sm font-semibold text-gray-700">Input</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste lines to sort..."
            rows={14}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
          {input && <p className="text-xs text-gray-400">{input.split("\n").length} lines</p>}
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Sorted Output</h2>
            <button
              onClick={copy}
              disabled={!output}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={14}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono bg-gray-50 focus:outline-none resize-y"
          />
          {output && <p className="text-xs text-gray-400">{output.split("\n").length} lines</p>}
        </div>
      </div>
    </div>
  );
}
