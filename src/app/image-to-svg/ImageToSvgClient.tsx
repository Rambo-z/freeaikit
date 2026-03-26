"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Trash2, RefreshCw, AlertCircle } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

interface SvgItem {
  id: string;
  file: File;
  previewUrl: string;
  svgString: string | null;
  svgSize: number;
  originalSize: number;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

type Preset = "detailed" | "balanced" | "simple";

const PRESETS: { value: Preset; label: string; desc: string; options: object }[] = [
  {
    value: "detailed",
    label: "Detailed",
    desc: "More colors, sharp edges — best for logos and icons",
    options: { numberofcolors: 32, ltres: 0.5, qtres: 0.5, pathomit: 4, colorsampling: 2 },
  },
  {
    value: "balanced",
    label: "Balanced",
    desc: "Good quality with reasonable file size",
    options: { numberofcolors: 16, ltres: 1, qtres: 1, pathomit: 8, colorsampling: 2 },
  },
  {
    value: "simple",
    label: "Simple",
    desc: "Fewer colors, smaller SVG — best for illustrations",
    options: { numberofcolors: 8, ltres: 2, qtres: 2, pathomit: 16, colorsampling: 2 },
  },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

async function convertToSvg(file: File, preset: Preset): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ImageTracer = (await import("imagetracerjs" as any)).default || (await import("imagetracerjs" as any));
  const cfg = PRESETS.find((p) => p.value === preset)!;

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    ImageTracer.imageToSVG(
      url,
      (svgstr: string) => {
        URL.revokeObjectURL(url);
        if (!svgstr) {
          reject(new Error("Conversion failed"));
        } else {
          resolve(svgstr);
        }
      },
      cfg.options
    );
  });
}

export default function ImageToSvgClient() {
  const [items, setItems] = useState<SvgItem[]>([]);
  const [preset, setPreset] = useState<Preset>("balanced");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const accepted = Array.from(files).filter((f) =>
      ["image/png", "image/jpeg", "image/webp", "image/gif", "image/bmp"].includes(f.type)
    );
    const newItems: SvgItem[] = accepted.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      previewUrl: URL.createObjectURL(file),
      svgString: null,
      svgSize: 0,
      originalSize: file.size,
      status: "pending" as const,
    }));
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { addFiles(e.target.files); e.target.value = ""; }
  }, [addFiles]);

  const convertAll = useCallback(async () => {
    setIsProcessing(true);
    setItems((prev) => prev.map((p) => ({ ...p, status: "pending" as const, svgString: null, svgSize: 0 })));

    setItems((snapshot) => {
      (async () => {
        for (const item of snapshot) {
          setItems((prev) => prev.map((p) => p.id === item.id ? { ...p, status: "processing" as const } : p));
          try {
            const svg = await convertToSvg(item.file, preset);
            const size = new Blob([svg]).size;
            setItems((prev) => prev.map((p) =>
              p.id === item.id ? { ...p, svgString: svg, svgSize: size, status: "done" as const } : p
            ));
          } catch (err) {
            setItems((prev) => prev.map((p) =>
              p.id === item.id ? { ...p, status: "error" as const, error: err instanceof Error ? err.message : "Failed" } : p
            ));
          }
        }
        setIsProcessing(false);
      })();
      return snapshot;
    });
  }, [preset]);

  const downloadOne = useCallback((item: SvgItem) => {
    trackToolEvent('image-to-svg', 'download');
    if (!item.svgString) return;
    const blob = new Blob([item.svgString], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = item.file.name.replace(/\.[^.]+$/, "") + ".svg";
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const downloadAll = useCallback(() => {
    trackToolEvent('image-to-svg', 'download');
    items.filter((i) => i.status === "done").forEach(downloadOne);
  }, [items, downloadOne]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const reset = useCallback(() => {
    setItems((prev) => { prev.forEach((i) => URL.revokeObjectURL(i.previewUrl)); return []; });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const allDone = items.length > 0 && items.every((i) => i.status === "done");
  const doneCount = items.filter((i) => i.status === "done").length;

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-white ${
          isDragging ? "border-blue-500 bg-blue-50 scale-[1.02] shadow-lg" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${isDragging ? "bg-blue-100" : "bg-blue-50"}`}>
          <Upload className={`w-7 h-7 ${isDragging ? "text-blue-600" : "text-blue-500"}`} />
        </div>
        {isDragging ? (
          <p className="text-lg font-semibold text-blue-600 mb-1">Drop images here</p>
        ) : (
          <>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-3">
              Upload Images
            </button>
            <p className="text-sm text-gray-500 mb-1">or drop files here</p>
          </>
        )}
        <p className="text-xs text-gray-400">PNG, JPG, WebP, GIF, BMP — multiple files allowed</p>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-400">
          {["No upload to server", "100% free", "Powered by ImageTracer"].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />{t}
            </span>
          ))}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
      </div>

      {/* Controls */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-3">Conversion Style</label>
          <div className="grid grid-cols-3 gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPreset(p.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  preset === p.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${preset === p.value ? "text-blue-700" : "text-gray-800"}`}>{p.label}</div>
                <div className="text-xs text-gray-400 leading-tight">{p.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-gray-100">
            <button
              onClick={convertAll}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isProcessing ? <><RefreshCw className="w-4 h-4 animate-spin" />Converting…</> : <>Convert to SVG</>}
            </button>
            {allDone && (
              <button onClick={downloadAll} className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm">
                <Download className="w-4 h-4" />Download All ({doneCount})
              </button>
            )}
            <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-red-600 text-sm transition-colors ml-auto">
              <Trash2 className="w-4 h-4" />Clear All
            </button>
          </div>
        </div>
      )}

      {/* Item list */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                {/* Preview */}
                <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
                  {item.status === "done" && item.svgString ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`data:image/svg+xml;base64,${btoa(item.svgString)}`} alt="" className="w-full h-full object-contain" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.previewUrl} alt="" className="w-full h-full object-contain" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.file.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-gray-500">{formatBytes(item.originalSize)}</span>
                    {item.status === "done" && (
                      <>
                        <span className="text-xs text-gray-400">→</span>
                        <span className="text-xs font-medium text-blue-600">{formatBytes(item.svgSize)} SVG</span>
                      </>
                    )}
                    {item.status === "processing" && (
                      <span className="text-xs text-blue-500 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />Converting…
                      </span>
                    )}
                    {item.status === "error" && (
                      <span className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{item.error}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {item.status === "done" && (
                    <button onClick={() => downloadOne(item)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Download SVG">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Remove">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
