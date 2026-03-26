"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

export default function RandomNumberClient() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [quantity, setQuantity] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    trackToolEvent('random-number', 'process');
    const lo = parseInt(min) || 0;
    const hi = parseInt(max) || 100;
    const qty = Math.max(1, Math.min(1000, parseInt(quantity) || 1));
    const low = Math.min(lo, hi);
    const high = Math.max(lo, hi);
    const range = high - low + 1;

    if (!allowDuplicates && qty > range) {
      // Can't generate more unique numbers than the range allows
      const nums: number[] = [];
      for (let i = low; i <= high; i++) nums.push(i);
      // Fisher-Yates shuffle
      for (let i = nums.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
      setResults(nums);
      return;
    }

    if (allowDuplicates) {
      const nums: number[] = [];
      for (let i = 0; i < qty; i++) {
        nums.push(low + Math.floor(Math.random() * range));
      }
      setResults(nums);
    } else {
      const set = new Set<number>();
      while (set.size < qty) {
        set.add(low + Math.floor(Math.random() * range));
      }
      setResults(Array.from(set));
    }
    setCopied(false);
  }, [min, max, quantity, allowDuplicates]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(results.join(", ")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [results]);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Min</label>
            <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="block w-28 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Max</label>
            <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="block w-28 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Quantity</label>
            <input type="number" min={1} max={1000} value={quantity} onChange={(e) => setQuantity(e.target.value)} className="block w-20 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
          <span className="text-sm text-gray-700">Allow duplicates</span>
        </label>
        <button
          onClick={generate}
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
        >
          <RefreshCw className="w-4 h-4" />
          Generate
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Results ({results.length})</h2>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy All"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 font-mono text-sm font-semibold rounded-lg">
                {n.toLocaleString()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
