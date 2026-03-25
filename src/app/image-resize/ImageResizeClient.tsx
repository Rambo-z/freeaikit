"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Trash2, RefreshCw, Lock, Unlock } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

interface ResizeItem {
  id: string;
  file: File;
  previewUrl: string;
  originalW: number;
  originalH: number;
  outWidth: number;
  outHeight: number;
  resultBlob: Blob | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

type Mode = "pixels" | "percentage";

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const k = 1024, sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageResizeClient() {
  const [items, setItems] = useState<ResizeItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<Mode>("pixels");
  const [widthVal, setWidthVal] = useState("1280");
  const [heightVal, setHeightVal] = useState("720");
  const [percent, setPercent] = useState("50");
  const [lockRatio, setLockRatio] = useState(true);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [quality, setQuality] = useState(90);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const accepted = Array.from(files).filter((f) => f.type.startsWith("image/"));
    for (const file of accepted) {
      const img = await loadImage(file);
      const item: ResizeItem = {
        id: Math.random().toString(36).slice(2),
        file,
        previewUrl: img.src,
        originalW: img.naturalWidth,
        originalH: img.naturalHeight,
        outWidth: img.naturalWidth,
        outHeight: img.naturalHeight,
        resultBlob: null,
        status: "pending",
      };
      setItems((prev) => [...prev, item]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files);
  }, [addFiles]);
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { addFiles(e.target.files); e.target.value = ""; }
  }, [addFiles]);

  const handleWidthChange = useCallback((val: string) => {
    setWidthVal(val);
    if (lockRatio) {
      const w = parseInt(val);
      if (!isNaN(w) && items.length > 0) {
        const ratio = items[0].originalH / items[0].originalW;
        setHeightVal(String(Math.round(w * ratio)));
      }
    }
  }, [lockRatio, items]);

  const handleHeightChange = useCallback((val: string) => {
    setHeightVal(val);
    if (lockRatio) {
      const h = parseInt(val);
      if (!isNaN(h) && items.length > 0) {
        const ratio = items[0].originalW / items[0].originalH;
        setWidthVal(String(Math.round(h * ratio)));
      }
    }
  }, [lockRatio, items]);

  const resizeAll = useCallback(async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    setItems((prev) => prev.map((p) => ({ ...p, status: "pending" as const, resultBlob: null })));

    for (const item of items) {
      setItems((prev) => prev.map((p) => p.id === item.id ? { ...p, status: "processing" as const } : p));
      try {
        let targetW: number, targetH: number;
        if (mode === "percentage") {
          const pct = parseFloat(percent) / 100;
          targetW = Math.round(item.originalW * pct);
          targetH = Math.round(item.originalH * pct);
        } else {
          targetW = parseInt(widthVal) || item.originalW;
          targetH = lockRatio
            ? Math.round(targetW * item.originalH / item.originalW)
            : parseInt(heightVal) || item.originalH;
        }

        const img = await loadImage(item.file);
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, targetW, targetH);
        URL.revokeObjectURL(img.src);

        const mimeType = format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
        const blob = await new Promise<Blob>((res) =>
          canvas.toBlob((b) => res(b!), mimeType, quality / 100)
        );

        setItems((prev) => prev.map((p) =>
          p.id === item.id ? { ...p, resultBlob: blob, outWidth: targetW, outHeight: targetH, status: "done" as const } : p
        ));
      } catch (err) {
        setItems((prev) => prev.map((p) =>
          p.id === item.id ? { ...p, status: "error" as const, error: err instanceof Error ? err.message : "Failed" } : p
        ));
      }
    }
    setIsProcessing(false);
  }, [items, mode, widthVal, heightVal, percent, lockRatio, format, quality]);

  const downloadOne = useCallback((item: ResizeItem) => {
    trackToolEvent('image-resize', 'download');
    if (!item.resultBlob) return;
    const ext = format;
    const base = item.file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(item.resultBlob);
    a.download = `${base}-resized.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [format]);

  const downloadAll = useCallback(() => {
    trackToolEvent('image-resize', 'download');
    items.filter((i) => i.status === "done").forEach(downloadOne);
  }, [items, downloadOne]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const allDone = items.length > 0 && items.every((i) => i.status === "done");

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-white ${
          isDragging ? "border-cyan-500 bg-cyan-50 scale-[1.02]" : "border-gray-200 hover:border-cyan-400 hover:bg-cyan-50/30"
        }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragging ? "bg-cyan-100" : "bg-cyan-50"}`}>
          <Upload className={`w-7 h-7 ${isDragging ? "text-cyan-600" : "text-cyan-500"}`} />
        </div>
        {isDragging ? (
          <p className="text-lg font-semibold text-cyan-600">Drop images here</p>
        ) : (
          <>
            <button className="px-6 py-3 bg-cyan-600 text-white rounded-xl text-sm font-semibold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/25 mb-3">
              Upload Images
            </button>
            <p className="text-sm text-gray-500 mb-1">or drop files here</p>
          </>
        )}
        <p className="text-xs text-gray-400">PNG, JPG, WebP — multiple files allowed</p>
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
      </div>

      {/* Settings */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">
          {/* Mode toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resize By</label>
            <div className="flex gap-2">
              {(["pixels", "percentage"] as Mode[]).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    mode === m ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {m === "pixels" ? "Pixels" : "Percentage"}
                </button>
              ))}
            </div>
          </div>

          {mode === "pixels" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">Width</label>
                  <input type="number" value={widthVal} onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <button onClick={() => setLockRatio((v) => !v)} className="mt-5 p-2 rounded-lg border border-gray-200 hover:border-cyan-400 transition-colors" title={lockRatio ? "Unlock ratio" : "Lock ratio"}>
                  {lockRatio ? <Lock className="w-4 h-4 text-cyan-600" /> : <Unlock className="w-4 h-4 text-gray-400" />}
                </button>
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">Height</label>
                  <input type="number" value={heightVal} onChange={(e) => handleHeightChange(e.target.value)}
                    disabled={lockRatio}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-50 disabled:text-gray-400" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scale — {percent}%</label>
              <input type="range" min={1} max={200} value={percent} onChange={(e) => setPercent(e.target.value)}
                className="w-full accent-cyan-600" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1%</span><span>100%</span><span>200%</span></div>
            </div>
          )}

          {/* Output format + quality */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <div className="flex gap-2">
                {(["jpeg", "png", "webp"] as const).map((f) => (
                  <button key={f} onClick={() => setFormat(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border uppercase transition-all ${
                      format === f ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >{f}</button>
                ))}
              </div>
            </div>
            {format !== "png" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quality — {quality}%</label>
                <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-cyan-600" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100">
            <button onClick={resizeAll} disabled={isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-xl text-sm font-semibold hover:bg-cyan-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isProcessing ? <><RefreshCw className="w-4 h-4 animate-spin" />Resizing…</> : <>Resize All</>}
            </button>
            {allDone && (
              <button onClick={downloadAll}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />Download All
              </button>
            )}
            <button onClick={() => setItems([])} className="px-4 py-2.5 text-gray-500 hover:text-red-500 text-sm transition-colors ml-auto">
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Image grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-3">
              <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.status === "done" && item.resultBlob ? URL.createObjectURL(item.resultBlob) : item.previewUrl}
                  alt="" className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs font-medium text-gray-800 truncate">{item.file.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.status === "done"
                  ? `${item.outWidth}×${item.outHeight} · ${formatBytes(item.resultBlob?.size ?? 0)}`
                  : item.status === "processing" ? "Resizing…"
                  : item.status === "error" ? item.error
                  : `${item.originalW}×${item.originalH}`}
              </p>
              <div className="flex gap-1 mt-2">
                {item.status === "done" && (
                  <button onClick={() => downloadOne(item)} className="flex-1 py-1.5 bg-cyan-50 text-cyan-600 rounded-lg text-xs font-medium hover:bg-cyan-100 transition-colors flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" />Save
                  </button>
                )}
                <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
