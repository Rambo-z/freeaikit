"use client";

import { useState, useRef, useCallback } from "react";
import { ImageIcon, Download } from "lucide-react";

const SIZES = [
  { size: 16,  label: "16×16",   desc: "Browser tab" },
  { size: 32,  label: "32×32",   desc: "Standard favicon" },
  { size: 48,  label: "48×48",   desc: "Windows shortcut" },
  { size: 64,  label: "64×64",   desc: "Retina display" },
  { size: 128, label: "128×128", desc: "High-res" },
  { size: 180, label: "180×180", desc: "Apple touch icon" },
  { size: 192, label: "192×192", desc: "Android / Chrome" },
  { size: 512, label: "512×512", desc: "PWA splash screen" },
];

function generateFaviconBlob(src: string, size: number, bgColor: string | null): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
      }

      // Draw image centered with contain scaling
      const ratio = Math.min(size / img.width, size / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      const x = (size - w) / 2;
      const y = (size - h) / 2;
      ctx.drawImage(img, x, y, w, h);

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas export failed"));
      }, "image/png");
    };
    img.onerror = reject;
    img.src = src;
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function FaviconGeneratorClient() {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [useBg, setUseBg] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [downloading, setDownloading] = useState<number | "all" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(URL.createObjectURL(file));
  }, [imageSrc]);

  const handleDownload = useCallback(async (size: number) => {
    if (!imageSrc) return;
    setDownloading(size);
    try {
      const blob = await generateFaviconBlob(imageSrc, size, useBg ? bgColor : null);
      const filename = size === 180 ? "apple-touch-icon.png" : `favicon-${size}x${size}.png`;
      downloadBlob(blob, filename);
    } finally {
      setDownloading(null);
    }
  }, [imageSrc, useBg, bgColor]);

  const handleDownloadAll = useCallback(async () => {
    if (!imageSrc) return;
    setDownloading("all");
    try {
      for (const { size } of SIZES) {
        const blob = await generateFaviconBlob(imageSrc, size, useBg ? bgColor : null);
        const filename = size === 180 ? "apple-touch-icon.png" : `favicon-${size}x${size}.png`;
        downloadBlob(blob, filename);
        await new Promise((r) => setTimeout(r, 150));
      }
    } catch {
      // individual downloads may still succeed
    } finally {
      setDownloading(null);
    }
  }, [imageSrc, useBg, bgColor]);

  if (!imageSrc) {
    return (
      <div
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false); }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 sm:p-16 text-center cursor-pointer transition-all bg-white ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"}`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragging ? "bg-blue-100" : "bg-blue-50"}`}>
          <ImageIcon className={`w-7 h-7 ${isDragging ? "text-blue-600" : "text-blue-400"}`} />
        </div>
        {isDragging ? (
          <p className="text-lg font-semibold text-blue-600">Drop image here</p>
        ) : (
          <>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-3">Upload Image</button>
            <p className="text-sm text-gray-500 mb-1">or drag & drop</p>
          </>
        )}
        <p className="text-xs text-gray-400">PNG, JPG, WebP, SVG — square images work best</p>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { handleFile(e.target.files[0]); e.target.value = ""; }}} className="hidden" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Options */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="useBg"
              checked={useBg}
              onChange={(e) => setUseBg(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="useBg" className="text-sm text-gray-700 cursor-pointer">
              Fill background color
            </label>
          </div>
          {useBg && (
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-gray-500">{bgColor}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadAll}
            disabled={downloading !== null}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            {downloading === "all" ? "Downloading…" : "Download All"}
          </button>
          <button onClick={() => setImageSrc("")}
            className="px-3 py-2 text-xs text-gray-500 border border-gray-200 rounded-xl hover:text-red-500 transition-colors">
            Change
          </button>
        </div>
      </div>

      {/* Size grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {SIZES.map(({ size, label, desc }) => (
          <div key={size} className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center gap-3">
            {/* Preview canvas */}
            <div
              className="rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                width: Math.min(size, 96),
                height: Math.min(size, 96),
                background: useBg ? bgColor : "repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 12px 12px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={`${label} preview`}
                style={{
                  width: Math.min(size, 96),
                  height: Math.min(size, 96),
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <button
              onClick={() => handleDownload(size)}
              disabled={downloading !== null}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading === size ? "…" : "Download"}
            </button>
          </div>
        ))}
      </div>

      {/* HTML snippet */}
      <div className="bg-gray-900 rounded-2xl p-5 text-sm font-mono text-green-400 space-y-1">
        <p className="text-gray-400 text-xs mb-2">Copy into your HTML {"<head>"}:</p>
        <p>{`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`}</p>
        <p>{`<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`}</p>
        <p>{`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`}</p>
        <p>{`<link rel="manifest" href="/site.webmanifest">`}</p>
      </div>
    </div>
  );
}
