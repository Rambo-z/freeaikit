"use client";

import { useState, useCallback, useRef } from "react";
import {
  Download,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

interface CompressedPdf {
  id: string;
  file: File;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  status: "pending" | "processing" | "done" | "error";
  statusText?: string;
  error?: string;
}

type Preset = "screen" | "ebook" | "printer";

const PRESETS: { value: Preset; label: string; dpi: number; quality: number; desc: string }[] = [
  { value: "screen",  label: "Screen",  dpi: 72,  quality: 0.5, desc: "Smallest file — great for email and web sharing" },
  { value: "ebook",   label: "eBook",   dpi: 120, quality: 0.72, desc: "Balanced quality — good for reading on screen" },
  { value: "printer", label: "Printer", dpi: 200, quality: 0.88, desc: "High quality — suitable for printing" },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

async function compressPdf(
  file: File,
  preset: Preset,
  onProgress: (text: string) => void,
  signal: AbortSignal
): Promise<Blob> {
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const { jsPDF } = await import("jspdf");

  const arrayBuffer = await file.arrayBuffer();
  if (signal.aborted) throw new Error("Cancelled");
  onProgress("Parsing PDF…");

  const loadingTask = getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  const cfg = PRESETS.find((p) => p.value === preset)!;
  const scale = cfg.dpi / 72;

  const firstPage = await pdfDoc.getPage(1);
  const vp0 = firstPage.getViewport({ scale });
  const mmW = (vp0.width / cfg.dpi) * 25.4;
  const mmH = (vp0.height / cfg.dpi) * 25.4;

  const doc = new jsPDF({
    orientation: mmW > mmH ? "l" : "p",
    unit: "mm",
    format: [mmW, mmH],
    compress: true,
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    if (signal.aborted) throw new Error("Cancelled");
    onProgress(`Rendering page ${pageNum} / ${numPages}…`);

    const page = await pdfDoc.getPage(pageNum);
    const vp = page.getViewport({ scale });
    canvas.width = vp.width;
    canvas.height = vp.height;

    await page.render({ canvasContext: ctx, viewport: vp }).promise;

    // Extract raw JPEG bytes (avoid base64 overhead in PDF)
    const jpegBlob = await new Promise<Blob>((res) =>
      canvas.toBlob((b) => res(b!), "image/jpeg", cfg.quality)
    );
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

    const mmPageW = (vp.width / cfg.dpi) * 25.4;
    const mmPageH = (vp.height / cfg.dpi) * 25.4;

    if (pageNum > 1) {
      doc.addPage([mmPageW, mmPageH], mmPageW > mmPageH ? "l" : "p");
    }
    doc.addImage(
      jpegBytes, "JPEG", 0, 0, mmPageW, mmPageH, undefined, "FAST"
    );
  }

  const pdfBytes = doc.output("arraybuffer");
  return new Blob([pdfBytes], { type: "application/pdf" });
}

export default function PdfCompressClient() {
  const [pdfs, setPdfs] = useState<CompressedPdf[]>([]);
  const [preset, setPreset] = useState<Preset>("ebook");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Track abort controllers per pdf id so delete cancels in-flight processing
  const abortRefs = useRef<Map<string, AbortController>>(new Map());

  const addFiles = useCallback((files: FileList | File[]) => {
    const newPdfs: CompressedPdf[] = Array.from(files)
      .filter((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"))
      .map((file) => ({
        id: Math.random().toString(36).slice(2),
        file,
        originalSize: file.size,
        compressedBlob: null,
        compressedSize: 0,
        status: "pending" as const,
      }));
    setPdfs((prev) => [...prev, ...newPdfs]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only reset if leaving the outer container entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        addFiles(e.target.files);
        e.target.value = "";
      }
    },
    [addFiles]
  );

  const removePdf = useCallback((id: string) => {
    // Abort any in-flight processing for this id
    abortRefs.current.get(id)?.abort();
    abortRefs.current.delete(id);
    setPdfs((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const processAll = useCallback(async () => {
    trackToolEvent('pdf-compress', 'process');
    setIsProcessing(true);

    // Snapshot current list and reset statuses
    setPdfs((prev) => {
      const reset = prev.map((p) => ({
        ...p, status: "pending" as const, compressedBlob: null, compressedSize: 0, statusText: undefined, error: undefined,
      }));
      return reset;
    });

    // Use a ref-based snapshot to avoid stale closure
    setPdfs((snapshot) => {
      (async () => {
        for (const item of snapshot) {
          const ac = new AbortController();
          abortRefs.current.set(item.id, ac);

          setPdfs((prev) => prev.map((p) =>
            p.id === item.id ? { ...p, status: "processing" as const, statusText: "Starting…" } : p
          ));

          try {
            const blob = await compressPdf(item.file, preset, (text) => {
              setPdfs((prev) => prev.map((p) =>
                p.id === item.id ? { ...p, statusText: text } : p
              ));
            }, ac.signal);

            abortRefs.current.delete(item.id);

            setPdfs((prev) => {
              const existing = prev.find((p) => p.id === item.id);
              if (!existing) return prev; // was deleted
              return prev.map((p) => {
                if (p.id !== item.id) return p;
                if (blob.size >= item.originalSize) {
                  return { ...p, compressedBlob: item.file, compressedSize: item.originalSize, status: "done" as const, statusText: undefined };
                }
                return { ...p, compressedBlob: blob, compressedSize: blob.size, status: "done" as const, statusText: undefined };
              });
            });
          } catch (err) {
            abortRefs.current.delete(item.id);
            const msg = err instanceof Error ? err.message : "Failed";
            if (msg === "Cancelled") continue;
            setPdfs((prev) => prev.map((p) =>
              p.id === item.id ? { ...p, status: "error" as const, statusText: undefined, error: msg } : p
            ));
          }
        }
        setIsProcessing(false);
      })();
      return snapshot; // return unchanged, we update inside async block
    });
  }, [preset]);

  const downloadOne = useCallback((pdf: CompressedPdf) => {
    trackToolEvent('pdf-compress', 'download');
    if (!pdf.compressedBlob) return;
    const baseName = pdf.file.name.replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(pdf.compressedBlob);
    a.download = `${baseName}-compressed.pdf`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const downloadAll = useCallback(() => {
    trackToolEvent('pdf-compress', 'download');
    pdfs.filter((p) => p.status === "done").forEach(downloadOne);
  }, [pdfs, downloadOne]);

  const handleReset = useCallback(() => {
    abortRefs.current.forEach((ac) => ac.abort());
    abortRefs.current.clear();
    setPdfs([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const allDone = pdfs.length > 0 && pdfs.every((p) => p.status === "done");
  const doneCount = pdfs.filter((p) => p.status === "done").length;
  const totalOriginal = pdfs.reduce((s, p) => s + p.originalSize, 0);
  const totalCompressed = pdfs.reduce((s, p) => s + p.compressedSize, 0);
  const savings = totalOriginal > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer
                   transition-all duration-200 bg-white ${
                     isDragging
                       ? "border-orange-500 bg-orange-50 scale-[1.02] shadow-lg"
                       : "border-gray-200 hover:border-orange-400 hover:bg-orange-50/30"
                   }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${isDragging ? "bg-orange-100" : "bg-orange-50"}`}>
          <FileText className={`w-7 h-7 transition-colors ${isDragging ? "text-orange-600" : "text-orange-500"}`} />
        </div>
        {isDragging ? (
          <p className="text-lg font-semibold text-orange-600 mb-1">Drop PDF files here</p>
        ) : (
          <>
            <button className="px-6 py-3 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/25 mb-3">
              Upload PDF
            </button>
            <p className="text-sm text-gray-500 mb-1">or drop files here</p>
          </>
        )}
        <p className="text-xs text-gray-400">PDF files only — multiple files allowed</p>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-400">
          {["No upload to server", "100% free", "Powered by PDF.js"].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {t}
            </span>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Controls */}
      {pdfs.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Compression Quality
          </label>
          <div className="grid grid-cols-3 gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPreset(p.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  preset === p.value
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`text-sm font-semibold mb-0.5 ${preset === p.value ? "text-orange-700" : "text-gray-800"}`}>
                  {p.label}
                </div>
                <div className="text-xs text-gray-500">{p.dpi} dpi</div>
                <div className="text-xs text-gray-400 mt-1 leading-tight">{p.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-gray-100">
            <button
              onClick={processAll}
              disabled={isProcessing || pdfs.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isProcessing ? (
                <><RefreshCw className="w-4 h-4 animate-spin" />Compressing…</>
              ) : (
                <>Compress PDF</>
              )}
            </button>

            {allDone && (
              <button
                onClick={downloadAll}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download All ({doneCount})
              </button>
            )}

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-red-600 text-sm transition-colors ml-auto"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      {allDone && totalOriginal > 0 && (
        <div className={`border rounded-2xl p-5 text-center ${savings > 0 ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
          {savings > 0 ? (
            <>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-green-800 text-lg">
                Saved {savings}% — {formatBytes(totalOriginal - totalCompressed)} smaller
              </p>
              <p className="text-sm text-green-600 mt-1">
                {formatBytes(totalOriginal)} → {formatBytes(totalCompressed)}
              </p>
            </>
          ) : (
            <>
              <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-yellow-800 text-lg">
                Already optimized — try Screen quality for a smaller file
              </p>
            </>
          )}
        </div>
      )}

      {/* PDF List */}
      {pdfs.length > 0 && (
        <div className="space-y-3">
          {pdfs.map((pdf) => (
            <div key={pdf.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-orange-500" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{pdf.file.name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-gray-500">{formatBytes(pdf.originalSize)}</span>
                  {pdf.status === "done" && (
                    <>
                      <span className="text-xs text-gray-400">→</span>
                      <span className={`text-xs font-medium ${pdf.compressedSize < pdf.originalSize ? "text-green-600" : "text-yellow-600"}`}>
                        {formatBytes(pdf.compressedSize)}
                      </span>
                      {pdf.compressedSize < pdf.originalSize ? (
                        <span className="text-xs text-green-500">
                          (-{Math.round((1 - pdf.compressedSize / pdf.originalSize) * 100)}%)
                        </span>
                      ) : (
                        <span className="text-xs text-yellow-500">(already optimal)</span>
                      )}
                    </>
                  )}
                  {pdf.status === "processing" && (
                    <span className="text-xs text-orange-500">{pdf.statusText || "Processing…"}</span>
                  )}
                  {pdf.status === "error" && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />{pdf.error}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {pdf.status === "done" && (
                  <button onClick={() => downloadOne(pdf)} className="p-2 rounded-lg hover:bg-orange-50 text-orange-600 transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                )}
                {pdf.status === "processing" && (
                  <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
                )}
                <button onClick={() => removePdf(pdf.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
