"use client";

import { useState, useCallback, useMemo } from "react";
import { Copy, Check } from "lucide-react";

export default function RemoveDuplicatesClient() {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input) return { output: "", total: 0, unique: 0, removed: 0 };
    let lines = input.split("\n");
    const total = lines.length;
    if (trimLines) lines = lines.map((l) => l.trim());
    if (removeEmpty) lines = lines.filter((l) => l.length > 0);

    const seen = new Set<string>();
    const unique: string[] = [];
    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    }

    return {
      output: unique.join("\n"),
      total,
      unique: unique.length,
      removed: total - unique.length - (removeEmpty ? lines.length - total + (total - lines.length) : 0),
    };
  }, [input, caseSensitive, trimLines, removeEmpty]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(result.output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [result.output]);

  const linesRemoved = input ? input.split("\n").length - result.output.split("\n").filter(Boolean).length : 0;

  return (
    <div className="space-y-5">
      {/* Options */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="w-4 h-4 accent-indigo-600 rounded" />
            <span className="text-sm text-gray-700">Case sensitive</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} className="w-4 h-4 accent-indigo-600 rounded" />
            <span className="text-sm text-gray-700">Trim whitespace</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} className="w-4 h-4 accent-indigo-600 rounded" />
            <span className="text-sm text-gray-700">Remove empty lines</span>
          </label>
        </div>
      </div>

      {/* Input / Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
          <h2 className="text-sm font-semibold text-gray-700">Input Text</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with duplicate lines..."
            rows={12}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
          {input && (
            <p className="text-xs text-gray-400">{input.split("\n").length} lines</p>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Result</h2>
            <button
              onClick={copy}
              disabled={!result.output}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 disabled:opacity-40 transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            value={result.output}
            readOnly
            rows={12}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono bg-gray-50 focus:outline-none resize-y"
          />
          {input && (
            <p className="text-xs text-gray-400">
              {result.unique} unique lines · {linesRemoved > 0 ? `${linesRemoved} removed` : "no duplicates found"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
