"use client";

import { useState, useCallback } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Download,
  ChevronDown,
} from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

// ── types & helpers ───────────────────────────────────────────────────────────

type Format = "standard" | "uppercase" | "nohyphens" | "braces";

function generateUUID(): string {
  return crypto.randomUUID();
}

function applyFormat(uuid: string, format: Format): string {
  switch (format) {
    case "standard":
      return uuid;
    case "uppercase":
      return uuid.toUpperCase();
    case "nohyphens":
      return uuid.replace(/-/g, "");
    case "braces":
      return `{${uuid}}`;
  }
}

const FORMAT_LABELS: Record<Format, string> = {
  standard: "Standard  (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)",
  uppercase: "Uppercase  (XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX)",
  nohyphens: "No Hyphens  (xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)",
  braces: "Braces  ({xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx})",
};

// ── component ─────────────────────────────────────────────────────────────────

export default function UuidGeneratorClient() {
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<Format>("standard");
  const [uuids, setUuids] = useState<string[]>(() =>
    Array.from({ length: 5 }, generateUUID)
  );
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [formatOpen, setFormatOpen] = useState(false);
  const [totalGenerated, setTotalGenerated] = useState(5);

  const generate = useCallback(
    (n = count) => {
      const newUuids = Array.from({ length: n }, generateUUID);
      setUuids(newUuids);
      setTotalGenerated((prev) => prev + n);
      setCopiedAll(false);
      setCopiedIndex(null);
    },
    [count]
  );

  const copyAll = useCallback(() => {
    const text = uuids.map((u) => applyFormat(u, format)).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    });
  }, [uuids, format]);

  const copyOne = useCallback(
    (idx: number) => {
      navigator.clipboard.writeText(applyFormat(uuids[idx], format)).then(() => {
        setCopiedIndex(idx);
        setTimeout(
          () => setCopiedIndex((i) => (i === idx ? null : i)),
          1400
        );
      });
    },
    [uuids, format]
  );

  const download = useCallback(() => {
    const text = uuids.map((u) => applyFormat(u, format)).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [uuids, format]);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            UUID Generator
          </h1>
          <p className="text-gray-500">
            Generate random UUID v4 identifiers. Bulk generation, multiple
            formats, instant copy or download.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Count */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Count
                <span className="ml-1 text-gray-400 font-normal">(1–100)</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="flex-1 accent-blue-600"
                />
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => {
                    const v = Math.min(100, Math.max(1, Number(e.target.value)));
                    setCount(v);
                  }}
                  className="w-16 border border-gray-300 rounded-xl px-2 py-1.5 text-sm text-center outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Format
              </label>
              <div className="relative">
                <button
                  onClick={() => setFormatOpen((o) => !o)}
                  className="w-full flex items-center justify-between border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:border-blue-400 transition-colors"
                >
                  <span className="truncate">
                    {FORMAT_LABELS[format].split("  ")[0]}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`shrink-0 text-gray-400 transition-transform ${
                      formatOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {formatOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    {(Object.keys(FORMAT_LABELS) as Format[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => {
                          setFormat(f);
                          setFormatOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          format === f
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="font-medium">
                          {FORMAT_LABELS[f].split("  ")[0]}
                        </div>
                        <div className="text-xs font-mono text-gray-400 mt-0.5">
                          {FORMAT_LABELS[f].split("  ")[1]}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Version note */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 self-center">Version:</span>
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg">
              v4 (random)
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-semibold rounded-lg cursor-not-allowed">
              v1 — coming soon
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-semibold rounded-lg cursor-not-allowed">
              v5 — coming soon
            </span>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => generate()}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <RefreshCw size={15} />
              Generate
            </button>
            <button
              onClick={copyAll}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
            >
              {copiedAll ? (
                <Check size={15} className="text-green-500" />
              ) : (
                <Copy size={15} />
              )}
              {copiedAll ? "Copied!" : "Copy All"}
            </button>
            <button
              onClick={download}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
            >
              <Download size={15} />
              Download .txt
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">{uuids.length}</span>{" "}
            UUID{uuids.length !== 1 ? "s" : ""}
          </span>
          <span className="text-xs text-gray-400">
            {totalGenerated} total generated this session
          </span>
        </div>

        {/* UUID list */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="divide-y divide-gray-100"
            onClick={() => setFormatOpen(false)}
          >
            {uuids.map((uuid, idx) => (
              <UUIDRow
                key={uuid + idx}
                uuid={applyFormat(uuid, format)}
                index={idx}
                onCopy={() => copyOne(idx)}
                copied={copiedIndex === idx}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-700">
          <strong className="block text-blue-900 mb-1">About UUID v4</strong>
          UUID version 4 uses <strong>122 bits of randomness</strong>, giving
          you approximately 5.3×10³⁶ possible values. The probability of a
          collision when generating 1 billion UUIDs per second for 100 years is
          effectively zero. This tool uses the browser&apos;s built-in{" "}
          <code className="bg-blue-100 px-1 rounded font-mono text-xs">
            crypto.randomUUID()
          </code>{" "}
          — cryptographically secure randomness, nothing stored or transmitted.
        </div>
      </div>
    </main>
  );
}

// ── sub-component ─────────────────────────────────────────────────────────────

function UUIDRow({
  uuid,
  index,
  onCopy,
  copied,
}: {
  uuid: string;
  index: number;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors group">
      <span className="w-6 shrink-0 text-xs text-gray-300 text-right select-none">
        {index + 1}
      </span>
      <span className="flex-1 font-mono text-sm text-gray-800 break-all select-all">
        {uuid}
      </span>
      <button
        onClick={onCopy}
        className="shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-blue-600 hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}
