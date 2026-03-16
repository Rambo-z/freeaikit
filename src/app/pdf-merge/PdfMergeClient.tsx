"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Trash2, RefreshCw, GripVertical, FileText, Scissors } from "lucide-react";

interface PdfFile {
  id: string;
  file: File;
  numPages: number;
  status: "pending" | "loading" | "ready" | "error";
  error?: string;
}

type Mode = "merge" | "split";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function parsePageRanges(input: string, total: number): number[][] {
  // Returns array of [start, end] pairs (1-indexed)
  const ranges: number[][] = [];
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  for (const part of parts) {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map(Number);
      if (a >= 1 && b <= total && a <= b) ranges.push([a, b]);
    } else {
      const n = Number(part);
      if (n >= 1 && n <= total) ranges.push([n, n]);
    }
  }
  return ranges;
}

export default function PdfMergeClient() {
  const [mode, setMode] = useState<Mode>("merge");
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitRanges, setSplitRanges] = useState("1-3, 4-6");
  const [dragOver, setDragOver] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPageCount = useCallback(async (file: File): Promise<number> => {
    const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
    GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    const ab = await file.arrayBuffer();
    const doc = await getDocument({ data: ab }).promise;
    return doc.numPages;
  }, []);

  const addFiles = useCallback(async (incoming: FileList | File[]) => {
    const pdfs = Array.from(incoming).filter(
      (f) => f.type === "application/pdf" || f.name.endsWith(".pdf")
    );
    const newItems: PdfFile[] = pdfs.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      numPages: 0,
      status: "loading" as const,
    }));
    setFiles((prev) => [...prev, ...newItems]);

    for (const item of newItems) {
      try {
        const n = await loadPageCount(item.file);
        setFiles((prev) =>
          prev.map((p) => p.id === item.id ? { ...p, numPages: n, status: "ready" as const } : p)
        );
        // Set default split range hint
        setSplitRanges((prev) => prev || `1-${n}`);
      } catch {
        setFiles((prev) =>
          prev.map((p) => p.id === item.id ? { ...p, status: "error" as const, error: "Failed to read" } : p)
        );
      }
    }
  }, [loadPageCount]);

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

  const removeFile = useCallback((id: string) => setFiles((prev) => prev.filter((f) => f.id !== id)), []);

  // Drag-to-reorder
  const dragItem = useRef<string | null>(null);
  const handleItemDragStart = (id: string) => { dragItem.current = id; };
  const handleItemDragOver = (e: React.DragEvent, id: string) => { e.preventDefault(); setDragOver(id); };
  const handleItemDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOver(null);
    if (!dragItem.current || dragItem.current === targetId) return;
    setFiles((prev) => {
      const from = prev.findIndex((f) => f.id === dragItem.current);
      const to = prev.findIndex((f) => f.id === targetId);
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    dragItem.current = null;
  };

  const mergePdfs = useCallback(async () => {
    const ready = files.filter((f) => f.status === "ready");
    if (ready.length < 2) return;
    setIsProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const item of ready) {
        const bytes = await item.file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const outBytes = await merged.save();
      const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Merge failed");
    }
    setIsProcessing(false);
  }, [files]);

  const splitPdf = useCallback(async () => {
    const item = files.find((f) => f.status === "ready");
    if (!item) return;
    setIsProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await item.file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const ranges = parsePageRanges(splitRanges, item.numPages);
      if (ranges.length === 0) { alert("No valid page ranges"); setIsProcessing(false); return; }

      for (let i = 0; i < ranges.length; i++) {
        const [start, end] = ranges[i];
        const part = await PDFDocument.create();
        const indices = Array.from({ length: end - start + 1 }, (_, k) => start - 1 + k);
        const pages = await part.copyPages(src, indices);
        pages.forEach((p) => part.addPage(p));
        const outBytes = await part.save();
        const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        const base = item.file.name.replace(/\.pdf$/i, "");
        a.download = `${base}_pages_${start}-${end}.pdf`;
        a.click();
        URL.revokeObjectURL(a.href);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Split failed");
    }
    setIsProcessing(false);
  }, [files, splitRanges]);

  const readyFiles = files.filter((f) => f.status === "ready");
  const canMerge = mode === "merge" && readyFiles.length >= 2;
  const canSplit = mode === "split" && readyFiles.length === 1;

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {(["merge", "split"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setFiles([]); }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === m ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {m === "merge" ? "Merge PDFs" : "Split PDF"}
          </button>
        ))}
      </div>

      {/* Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 bg-white ${
          isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
      >
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${isDragging ? "bg-blue-100" : "bg-blue-50"}`}>
          {mode === "merge" ? <Upload className="w-6 h-6 text-blue-500" /> : <Scissors className="w-6 h-6 text-blue-500" />}
        </div>
        {isDragging ? (
          <p className="text-base font-semibold text-blue-600">Drop PDF files here</p>
        ) : (
          <>
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm mb-2">
              {mode === "merge" ? "Upload PDFs" : "Upload PDF"}
            </button>
            <p className="text-sm text-gray-500">or drop files here</p>
          </>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {mode === "merge" ? "Select 2 or more PDF files to merge" : "Select 1 PDF file to split"}
        </p>
        <input ref={fileInputRef} type="file" accept="application/pdf,.pdf" multiple={mode === "merge"} onChange={handleFileSelect} className="hidden" />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          {mode === "merge" && (
            <p className="text-xs text-gray-400 mb-1">Drag to reorder — PDFs will be merged in this order</p>
          )}
          {files.map((f) => (
            <div
              key={f.id}
              draggable={mode === "merge" && f.status === "ready"}
              onDragStart={() => handleItemDragStart(f.id)}
              onDragOver={(e) => handleItemDragOver(e, f.id)}
              onDrop={(e) => handleItemDrop(e, f.id)}
              onDragLeave={() => setDragOver(null)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                dragOver === f.id ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-gray-50"
              }`}
            >
              {mode === "merge" && (
                <GripVertical className="w-4 h-4 text-gray-300 cursor-grab flex-shrink-0" />
              )}
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{f.file.name}</p>
                <p className="text-xs text-gray-400">
                  {f.status === "loading" ? "Reading…" :
                   f.status === "ready" ? `${f.numPages} pages · ${formatBytes(f.file.size)}` :
                   f.status === "error" ? f.error : ""}
                </p>
              </div>
              <button onClick={() => removeFile(f.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Split range input */}
          {mode === "split" && readyFiles.length === 1 && (
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Page ranges <span className="text-gray-400 font-normal">(e.g. 1-3, 4-6, 7)</span>
              </label>
              <input
                type="text"
                value={splitRanges}
                onChange={(e) => setSplitRanges(e.target.value)}
                placeholder="1-3, 4-6, 7"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Each range downloads as a separate PDF. Total pages: {readyFiles[0].numPages}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button
              onClick={mode === "merge" ? mergePdfs : splitPdf}
              disabled={isProcessing || (!canMerge && !canSplit)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isProcessing ? (
                <><RefreshCw className="w-4 h-4 animate-spin" />{mode === "merge" ? "Merging…" : "Splitting…"}</>
              ) : mode === "merge" ? (
                <><Download className="w-4 h-4" />Merge & Download</>
              ) : (
                <><Scissors className="w-4 h-4" />Split & Download</>
              )}
            </button>
            <button onClick={() => setFiles([])} className="px-4 py-2.5 text-gray-500 hover:text-red-500 text-sm transition-colors">
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
