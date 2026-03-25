"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Trash2, RefreshCw, FileText } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

interface PageResult {
  pageNum: number;
  dataUrl: string;
  blob: Blob | null;
}

type Format = "jpeg" | "png";

export default function PdfToImagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [pages, setPages] = useState<PageResult[]>([]);
  const [format, setFormat] = useState<Format>("jpeg");
  const [dpi, setDpi] = useState(150);
  const [quality, setQuality] = useState(90);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (f.type === "application/pdf" || f.name.endsWith(".pdf")) {
      setFile(f); setPages([]); setProgress(""); setError("");
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) { handleFile(e.target.files[0]); e.target.value = ""; }
  }, [handleFile]);

  const convert = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    setPages([]);
    setError("");
    try {
      const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
      GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const ab = await file.arrayBuffer();
      const pdf = await getDocument({ data: ab }).promise;
      const total = pdf.numPages;
      const scale = dpi / 72;
      const results: PageResult[] = [];

      for (let i = 1; i <= total; i++) {
        setProgress(`Rendering page ${i} / ${total}…`);
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width; canvas.height = vp.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;

        const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
        const blob = await new Promise<Blob>((res) =>
          canvas.toBlob((b) => res(b!), mimeType, quality / 100)
        );
        const dataUrl = canvas.toDataURL(mimeType, quality / 100);
        results.push({ pageNum: i, dataUrl, blob });
        setPages([...results]);
      }
      setProgress("");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
    setIsProcessing(false);
  }, [file, dpi, format, quality]);

  const downloadOne = useCallback((p: PageResult) => {
    trackToolEvent('pdf-to-images', 'download');
    if (!p.blob) return;
    const base = file?.name.replace(/\.pdf$/i, "") ?? "page";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(p.blob);
    a.download = `${base}_page${p.pageNum}.${format}`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [file, format]);

  const downloadAll = useCallback(async () => {
    trackToolEvent('pdf-to-images', 'download');
    for (const p of pages) { downloadOne(p); await new Promise((r) => setTimeout(r, 100)); }
  }, [pages, downloadOne]);

  const reset = useCallback(() => { setFile(null); setPages([]); setProgress(""); setError(""); }, []);

  return (
    <div className="space-y-6">
      {/* Upload */}
      {!file ? (
        <div
          onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-white ${
            isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragging ? "bg-blue-100" : "bg-blue-50"}`}>
            <FileText className={`w-7 h-7 ${isDragging ? "text-blue-600" : "text-blue-500"}`} />
          </div>
          {isDragging ? (
            <p className="text-lg font-semibold text-blue-600">Drop PDF here</p>
          ) : (
            <>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-3">
                Upload PDF
              </button>
              <p className="text-sm text-gray-500 mb-1">or drop file here</p>
            </>
          )}
          <p className="text-xs text-gray-400">PDF files only — one file at a time</p>
          <input ref={fileInputRef} type="file" accept="application/pdf,.pdf" onChange={handleFileSelect} className="hidden" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">
          {/* File info */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <p className="text-sm font-medium text-gray-800 flex-1 truncate">{file.name}</p>
            <button onClick={reset} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Output Format</label>
              <div className="flex gap-2">
                {(["jpeg", "png"] as Format[]).map((f) => (
                  <button key={f} onClick={() => setFormat(f)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold border uppercase transition-all ${
                      format === f ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500"
                    }`}
                  >{f}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Resolution — {dpi} DPI</label>
              <input type="range" min={72} max={300} step={1} value={dpi} onChange={(e) => setDpi(Number(e.target.value))}
                className="w-full accent-blue-600" />
            </div>
            {format === "jpeg" && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Quality — {quality}%</label>
                <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
            <button onClick={convert} disabled={isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              {isProcessing
                ? <><RefreshCw className="w-4 h-4 animate-spin" />{progress || "Converting…"}</>
                : <>Convert to Images</>}
            </button>
            {pages.length > 0 && (
              <button onClick={downloadAll}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />Download All ({pages.length})
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Pages grid */}
      {pages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {pages.map((p) => (
            <div key={p.pageNum} className="bg-white rounded-xl border border-gray-200 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.dataUrl} alt={`Page ${p.pageNum}`} className="w-full aspect-[3/4] object-contain bg-gray-50 rounded-lg mb-2" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Page {p.pageNum}</span>
                <button onClick={() => downloadOne(p)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
