"use client";

import { useState, useMemo, useCallback } from "react";
import { Copy, Check, ArrowUpDown } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

type Base = 2 | 8 | 10 | 16;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    trackToolEvent('base-converter', 'process');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button onClick={handleCopy} disabled={!text}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all">
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

const BASES: { value: Base; label: string; prefix: string; placeholder: string }[] = [
  { value: 2,  label: "Binary (Base 2)",       prefix: "0b", placeholder: "e.g. 1010 1111" },
  { value: 8,  label: "Octal (Base 8)",        prefix: "0o", placeholder: "e.g. 257" },
  { value: 10, label: "Decimal (Base 10)",     prefix: "",   placeholder: "e.g. 175" },
  { value: 16, label: "Hexadecimal (Base 16)", prefix: "0x", placeholder: "e.g. AF" },
];

function cleanInput(text: string): string {
  // Remove common prefixes and spaces
  return text.trim().replace(/^0[xXbBoO]/, "").replace(/[\s_]/g, "");
}

function formatBinary(bin: string): string {
  // Group in 4-digit chunks
  const padded = bin.padStart(Math.ceil(bin.length / 4) * 4, "0");
  return padded.match(/.{1,4}/g)?.join(" ") || bin;
}

function formatHex(hex: string): string {
  return hex.toUpperCase();
}

export default function BaseConverterClient() {
  const [inputBase, setInputBase] = useState<Base>(10);
  const [input, setInput] = useState("");

  const conversions = useMemo(() => {
    const clean = cleanInput(input);
    if (!clean) return null;

    try {
      // Parse with BigInt for arbitrary precision
      const num = BigInt(`0${inputBase === 16 ? "x" : inputBase === 8 ? "o" : inputBase === 2 ? "b" : "d"}${clean}`);
      if (inputBase === 10) {
        // BigInt doesn't support "0d" prefix
        const parsed = BigInt(clean);
        return {
          binary: formatBinary(parsed.toString(2)),
          octal: parsed.toString(8),
          decimal: parsed.toString(10),
          hex: formatHex(parsed.toString(16)),
        };
      }
      return {
        binary: formatBinary(num.toString(2)),
        octal: num.toString(8),
        decimal: num.toString(10),
        hex: formatHex(num.toString(16)),
      };
    } catch {
      return null;
    }
  }, [input, inputBase]);

  const currentBase = BASES.find((b) => b.value === inputBase)!;

  return (
    <div className="space-y-5">
      {/* Input section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700 shrink-0">Input Base:</label>
          <div className="flex flex-wrap gap-2">
            {BASES.map((b) => (
              <button key={b.value} onClick={() => { setInputBase(b.value); setInput(""); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${inputBase === b.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                Base {b.value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-gray-400">{currentBase.prefix}</span>
            <span className="text-xs text-gray-500">{currentBase.label}</span>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={currentBase.placeholder}
            spellCheck={false}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Conversion arrow */}
      <div className="flex justify-center">
        <ArrowUpDown className="w-5 h-5 text-gray-300" />
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">Conversions</h2>

        {!conversions && input.trim() && (
          <p className="text-sm text-red-500">Invalid number for base {inputBase}. Check your input.</p>
        )}

        {!input.trim() && (
          <p className="text-sm text-gray-400">Enter a number above to see all base conversions.</p>
        )}

        {conversions && (
          <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 overflow-hidden">
            {[
              { label: "Binary (2)", value: conversions.binary, base: 2 },
              { label: "Octal (8)", value: conversions.octal, base: 8 },
              { label: "Decimal (10)", value: conversions.decimal, base: 10 },
              { label: "Hex (16)", value: conversions.hex, base: 16 },
            ].map((row) => (
              <div key={row.label} className={`grid grid-cols-[140px_1fr_40px] items-center text-sm ${row.base === inputBase ? "bg-blue-50/50" : ""}`}>
                <div className="px-4 py-3 bg-gray-50 font-medium text-gray-600 text-xs">{row.label}</div>
                <div className="px-4 py-3 font-mono text-gray-800 break-all">{row.value}</div>
                <div className="px-2"><CopyButton text={row.value.replace(/\s/g, "")} /></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick reference */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="py-2 px-3 text-left">Dec</th>
                <th className="py-2 px-3 text-left">Bin</th>
                <th className="py-2 px-3 text-left">Oct</th>
                <th className="py-2 px-3 text-left">Hex</th>
                <th className="py-2 px-3 text-left">Dec</th>
                <th className="py-2 px-3 text-left">Bin</th>
                <th className="py-2 px-3 text-left">Oct</th>
                <th className="py-2 px-3 text-left">Hex</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }, (_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 px-3 text-gray-700">{i}</td>
                  <td className="py-1.5 px-3 text-gray-500">{i.toString(2).padStart(4, "0")}</td>
                  <td className="py-1.5 px-3 text-gray-500">{i.toString(8)}</td>
                  <td className="py-1.5 px-3 text-gray-500">{i.toString(16).toUpperCase()}</td>
                  <td className="py-1.5 px-3 text-gray-700">{i + 8}</td>
                  <td className="py-1.5 px-3 text-gray-500">{(i + 8).toString(2).padStart(4, "0")}</td>
                  <td className="py-1.5 px-3 text-gray-500">{(i + 8).toString(8)}</td>
                  <td className="py-1.5 px-3 text-gray-500">{(i + 8).toString(16).toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
