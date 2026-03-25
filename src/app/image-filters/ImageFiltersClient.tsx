"use client";

import { useState, useRef, useCallback } from "react";
import { ImageIcon, Download, RefreshCw } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

type FilterState = {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: number;
  sepia: number;
  hue: number;
};

const DEFAULTS: FilterState = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  hue: 0,
};

const PRESETS: { label: string; values: FilterState }[] = [
  { label: "Original", values: { ...DEFAULTS } },
  { label: "Grayscale", values: { ...DEFAULTS, grayscale: 100, saturation: 0 } },
  { label: "Sepia", values: { ...DEFAULTS, sepia: 80, brightness: 110 } },
  { label: "Vintage", values: { ...DEFAULTS, sepia: 50, brightness: 90, contrast: 110, saturation: 80 } },
  { label: "Vivid", values: { ...DEFAULTS, contrast: 120, saturation: 150, brightness: 105 } },
  { label: "Cool", values: { ...DEFAULTS, hue: 200, saturation: 80, brightness: 105 } },
  { label: "Warm", values: { ...DEFAULTS, hue: 20, saturation: 120, brightness: 105 } },
  { label: "Dark", values: { ...DEFAULTS, brightness: 70, contrast: 130 } },
];

function buildFilter(f: FilterState): string {
  return [
    `brightness(${f.brightness}%)`,
    `contrast(${f.contrast}%)`,
    `saturate(${f.saturation}%)`,
    f.blur > 0 ? `blur(${f.blur}px)` : "",
    f.grayscale > 0 ? `grayscale(${f.grayscale}%)` : "",
    f.sepia > 0 ? `sepia(${f.sepia}%)` : "",
    f.hue !== 0 ? `hue-rotate(${f.hue}deg)` : "",
  ].filter(Boolean).join(" ") || "none";
}

const SLIDERS: { key: keyof FilterState; label: string; min: number; max: number; step: number; unit: string; default: number }[] = [
  { key: "brightness", label: "Brightness", min: 0, max: 200, step: 1, unit: "%", default: 100 },
  { key: "contrast",   label: "Contrast",   min: 0, max: 200, step: 1, unit: "%", default: 100 },
  { key: "saturation", label: "Saturation", min: 0, max: 200, step: 1, unit: "%", default: 100 },
  { key: "hue",        label: "Hue Rotate", min: 0, max: 360, step: 1, unit: "°", default: 0 },
  { key: "blur",       label: "Blur",       min: 0, max: 20,  step: 0.5, unit: "px", default: 0 },
  { key: "grayscale",  label: "Grayscale",  min: 0, max: 100, step: 1, unit: "%", default: 0 },
  { key: "sepia",      label: "Sepia",      min: 0, max: 100, step: 1, unit: "%", default: 0 },
];

export default function ImageFiltersClient() {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULTS });
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(URL.createObjectURL(file));
    setFilters({ ...DEFAULTS });
  }, [imageSrc]);

  const filterString = buildFilter(filters);
  const isDefault = filterString === "none" || filterString === buildFilter(DEFAULTS);

  const handleDownload = useCallback(() => {
    trackToolEvent('image-filters', 'download');
    const img = imgRef.current;
    if (!img) return;
    setIsDownloading(true);
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = filterString;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsDownloading(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "filtered.jpg";
        a.click();
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      }, "image/jpeg", 0.92);
    }, 50);
  }, [filterString]);

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
        <p className="text-xs text-gray-400">PNG, JPG, WebP — any image</p>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { handleFile(e.target.files[0]); e.target.value = ""; }}} className="hidden" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
      {/* Preview */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Preview</h2>
            <button onClick={() => { setImageSrc(""); setFilters({ ...DEFAULTS }); }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors">
              Change image
            </button>
          </div>
          <div className="flex justify-center bg-gray-50 rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Filtered preview"
              style={{ filter: filterString }}
              className="max-h-[480px] max-w-full object-contain"
            />
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm shadow-blue-500/20"
        >
          {isDownloading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {isDownloading ? "Preparing…" : "Download Filtered Image"}
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Presets */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Presets</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setFilters({ ...p.values })}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  JSON.stringify(filters) === JSON.stringify(p.values)
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Adjustments</h3>
            {!isDefault && (
              <button onClick={() => setFilters({ ...DEFAULTS })}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                Reset all
              </button>
            )}
          </div>
          {SLIDERS.map(({ key, label, min, max, step, unit, default: def }) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-600">{label}</label>
                <span className="text-xs font-mono text-gray-500 w-12 text-right">
                  {filters[key]}{unit}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={filters[key]}
                onChange={(e) => setFilters((f) => ({ ...f, [key]: Number(e.target.value) }))}
                className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer"
              />
              {filters[key] !== def && (
                <button
                  onClick={() => setFilters((f) => ({ ...f, [key]: def }))}
                  className="text-[10px] text-gray-400 hover:text-blue-500"
                >
                  Reset
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
