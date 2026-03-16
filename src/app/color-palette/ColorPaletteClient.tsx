"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Copy, Check, ImageIcon, RefreshCw } from "lucide-react";

interface ColorSwatch {
  hex: string;
  r: number;
  g: number;
  b: number;
  count: number;
}

function toHex(v: number) {
  return v.toString(16).padStart(2, "0");
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function extractColors(imgEl: HTMLImageElement, numColors: number): ColorSwatch[] {
  const MAX_DIM = 200;
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, MAX_DIM / Math.max(imgEl.naturalWidth, imgEl.naturalHeight));
  canvas.width = Math.round(imgEl.naturalWidth * scale);
  canvas.height = Math.round(imgEl.naturalHeight * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // Quantize: reduce to 32-step buckets
  const freq = new Map<string, { r: number; g: number; b: number; count: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue; // skip transparent
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const key = `${r},${g},${b}`;
    const existing = freq.get(key);
    if (existing) {
      existing.count++;
    } else {
      freq.set(key, { r: Math.min(r, 255), g: Math.min(g, 255), b: Math.min(b, 255), count: 1 });
    }
  }

  // Sort by frequency, pick top candidates, then ensure diversity
  const sorted = Array.from(freq.values()).sort((a, b) => b.count - a.count);

  // Greedy diversity selection: skip colors too similar to already-selected
  const selected: typeof sorted = [];
  for (const candidate of sorted) {
    if (selected.length >= numColors) break;
    const tooClose = selected.some((s) => {
      const dr = s.r - candidate.r, dg = s.g - candidate.g, db = s.b - candidate.b;
      return Math.sqrt(dr * dr + dg * dg + db * db) < 64;
    });
    if (!tooClose) selected.push(candidate);
  }

  // If we didn't get enough diverse colors, fill with next most frequent
  for (const candidate of sorted) {
    if (selected.length >= numColors) break;
    if (!selected.includes(candidate)) selected.push(candidate);
  }

  return selected.slice(0, numColors).map((c) => ({
    ...c,
    hex: rgbToHex(c.r, c.g, c.b),
  }));
}

function luminance(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export default function ColorPaletteClient() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [numColors, setNumColors] = useState(6);
  const [palette, setPalette] = useState<ColorSwatch[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback((url: string, n: number) => {
    setIsExtracting(true);
    const img = new Image();
    img.onload = () => {
      const colors = extractColors(img, n);
      setPalette(colors);
      setIsExtracting(false);
    };
    img.src = url;
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    processImage(url, numColors);
  }, [imageUrl, numColors, processImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleNumColorsChange = useCallback((n: number) => {
    setNumColors(n);
    if (imageUrl) processImage(imageUrl, n);
  }, [imageUrl, processImage]);

  const copyHex = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    });
  }, []);

  const copyCss = useCallback(() => {
    const css = `:root {\n${palette.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n")}\n}`;
    navigator.clipboard.writeText(css);
    setCopiedHex("css");
    setTimeout(() => setCopiedHex(null), 1500);
  }, [palette]);

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div
        onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-white ${
          isDragging ? "border-yellow-500 bg-yellow-50 scale-[1.02]" : "border-gray-200 hover:border-yellow-400 hover:bg-yellow-50/30"
        }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragging ? "bg-yellow-100" : "bg-yellow-50"}`}>
          <ImageIcon className={`w-7 h-7 ${isDragging ? "text-yellow-600" : "text-yellow-500"}`} />
        </div>
        {isDragging ? (
          <p className="text-lg font-semibold text-yellow-600">Drop image here</p>
        ) : (
          <>
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl text-sm font-semibold hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-500/25 mb-3">
              Upload Image
            </button>
            <p className="text-sm text-gray-500 mb-1">or drop file here</p>
          </>
        )}
        <p className="text-xs text-gray-400">PNG, JPG, WebP — any image</p>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { handleFile(e.target.files[0]); e.target.value = ""; }}} className="hidden" />
      </div>

      {imageUrl && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image preview + settings */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Uploaded" className="w-full max-h-64 object-contain rounded-xl bg-gray-50" />
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Number of Colors — <span className="text-yellow-600 font-bold">{numColors}</span>
              </label>
              <div className="flex gap-2">
                {[3, 5, 6, 8, 10, 12].map((n) => (
                  <button key={n} onClick={() => handleNumColorsChange(n)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      numColors === n ? "border-yellow-500 bg-yellow-50 text-yellow-700" : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >{n}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Palette */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">Extracted Palette</h3>
              {palette.length > 0 && (
                <button onClick={copyCss}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all"
                >
                  {copiedHex === "css" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy CSS Variables
                </button>
              )}
            </div>

            {isExtracting ? (
              <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span className="text-sm">Extracting colors…</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {/* Color strip */}
                {palette.length > 0 && (
                  <div className="flex rounded-xl overflow-hidden h-12 mb-4">
                    {palette.map((c) => (
                      <div key={c.hex} className="flex-1 cursor-pointer hover:scale-y-110 transition-transform origin-bottom"
                        style={{ backgroundColor: c.hex }} onClick={() => copyHex(c.hex)} title={c.hex} />
                    ))}
                  </div>
                )}
                {palette.map((c) => (
                  <div key={c.hex}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors group cursor-pointer"
                    onClick={() => copyHex(c.hex)}
                  >
                    <div className="w-10 h-10 rounded-lg flex-shrink-0 border border-black/10 shadow-sm"
                      style={{ backgroundColor: c.hex }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono font-semibold text-gray-800">{c.hex}</p>
                      <p className="text-xs text-gray-400">{c.r}, {c.g}, {c.b}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedHex === c.hex
                        ? <Check className="w-4 h-4 text-green-500" />
                        : <Copy className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
