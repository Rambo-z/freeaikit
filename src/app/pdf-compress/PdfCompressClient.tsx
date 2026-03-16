"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Download,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";

interface CompressedPdf {
  id: string;
  file: File;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

type Preset = "screen" | "ebook" | "printer";

const PRESETS: { value: Preset; label: string; dpi: string; desc: string }[] = [
  {
    value: "screen",
    label: "Screen",
    dpi: "72 dpi",
    desc: "Smallest file — great for email and web sharing",
  },
  {
    value: "ebook",
    label: "eBook",
    dpi: "150 dpi",
    desc: "Balanced quality — good for reading on screen",
  },
  {
    value: "printer",
    label: "Printer",
    dpi: "300 dpi",
    desc: "High quality — suitable for printing",
  },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let gsModule: any = null;

async function getGS() {
  if (gsModule) return gsModule;
  const createGS = (await import("@jspawn/ghostscript-wasm/gs.mjs")).default;
  gsModule = await createGS({
    locateFile: () => "/gs.wasm",
  });
  return gsModule;
}

async function compressPdf(file: File, preset: Preset): Promise<Blob> {
  const gs = await getGS();

  const arrayBuffer = await file.arrayBuffer();
  const inputBytes = new Uint8Array(arrayBuffer);

  const inputPath = "/input.pdf";
  const outputPath = "/output.pdf";

  gs.FS.writeFile(inputPath, inputBytes);

  gs.callMain([
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    `-dPDFSETTINGS=/${preset}`,
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",
    `-sOutputFile=${outputPath}`,
    inputPath,
  ]);

  const output = gs.FS.readFile(outputPath);

  // cleanup
  try { gs.FS.unlink(inputPath); } catch { /* ignore */ }
  try { gs.FS.unlink(outputPath); } catch { /* ignore */ }

  return new Blob([output], { type: "application/pdf" });
}

export default function PdfCompressClient() {
  const [pdfs, setPdfs] = useState<CompressedPdf[]>([]);
  const [preset, setPreset] = useState<Preset>("ebook");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const processAll = useCallback(async () => {
    setIsProcessing(true);
    const updated = [...pdfs];

    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "pending", compressedBlob: null, compressedSize: 0 };
    }
    setPdfs([...updated]);

    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "processing" };
      setPdfs([...updated]);

      try {
        const blob = await compressPdf(updated[i].file, preset);
        if (blob.size >= updated[i].originalSize) {
          updated[i] = {
            ...updated[i],
            compressedBlob: updated[i].file,
            compressedSize: updated[i].originalSize,
            status: "done",
          };
        } else {
          updated[i] = {
            ...updated[i],
            compressedBlob: blob,
            compressedSize: blob.size,
            status: "done",
          };
        }
      } catch (err) {
        updated[i] = {
          ...updated[i],
          status: "error",
          error: err instanceof Error ? err.message : "Failed",
        };
      }
      setPdfs([...updated]);
    }

    setIsProcessing(false);
  }, [pdfs, preset]);

  const downloadOne = useCallback((pdf: CompressedPdf) => {
    if (!pdf.compressedBlob) return;
    const baseName = pdf.file.name.replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(pdf.compressedBlob);
    a.download = `${baseName}-compressed.pdf`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const downloadAll = useCallback(() => {
    pdfs.filter((p) => p.status === "done").forEach(downloadOne);
  }, [pdfs, downloadOne]);

  const removePdf = useCallback((id: string) => {
    setPdfs((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleReset = useCallback(() => {
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
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer
                   transition-all duration-300 bg-white ${
                     isDragging
                       ? "border-orange-500 bg-orange-50 scale-[1.02]"
                       : "border-gray-200 hover:border-orange-400 hover:bg-orange-50/30"
                   }`}
      >
        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-7 h-7 text-orange-500" />
        </div>
        <button className="px-6 py-3 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/25 mb-3">
          Upload PDF
        </button>
        <p className="text-sm text-gray-500 mb-1">or drop files here</p>
        <p className="text-xs text-gray-400">PDF files only — multiple files allowed</p>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            No upload to server
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            100% free
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Powered by Ghostscript
          </span>
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
          <div>
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
                  <div className={`text-sm font-semibold mb-0.5 ${
                    preset === p.value ? "text-orange-700" : "text-gray-800"
                  }`}>
                    {p.label}
                  </div>
                  <div className="text-xs text-gray-500">{p.dpi}</div>
                  <div className="text-xs text-gray-400 mt-1 leading-tight">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-gray-100">
            <button
              onClick={processAll}
              disabled={isProcessing || pdfs.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Compressing...
                </>
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
        <div className={`border rounded-2xl p-5 text-center ${
          savings > 0 ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"
        }`}>
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
            <div
              key={pdf.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
            >
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
                      <span className={`text-xs font-medium ${
                        pdf.compressedSize < pdf.originalSize ? "text-green-600" : "text-yellow-600"
                      }`}>
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
                    <span className="text-xs text-orange-500">Compressing...</span>
                  )}
                  {pdf.status === "error" && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {pdf.error}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {pdf.status === "done" && (
                  <button
                    onClick={() => downloadOne(pdf)}
                    className="p-2 rounded-lg hover:bg-orange-50 text-orange-600 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                {pdf.status === "processing" && (
                  <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
                )}
                <button
                  onClick={() => removePdf(pdf.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove"
                >
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
