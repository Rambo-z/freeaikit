"use client";
import { useState, useCallback, useRef } from "react";
import { Upload, RotateCw, Download, X, AlertCircle } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

type RotateMode = "all" | "odd" | "even" | "custom";

export default function PdfRotateClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [mode, setMode] = useState<RotateMode>("all");
  const [customPages, setCustomPages] = useState(""); // e.g. "1,3,5-8"
  const [status, setStatus] = useState<"idle" | "loading" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileDataRef = useRef<ArrayBuffer | null>(null);

  const handleFile = useCallback(async (f: File) => {
    trackToolEvent('pdf-rotate', 'process');
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg("Please select a PDF file.");
      setStatus("error");
      return;
    }
    setFile(f);
    setStatus("loading");
    setResultBlob(null);
    setErrorMsg("");
    try {
      const buf = await f.arrayBuffer();
      fileDataRef.current = buf;
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.load(buf);
      setPageCount(pdfDoc.getPageCount());
      setStatus("idle");
    } catch {
      setErrorMsg("Failed to read PDF.");
      setStatus("error");
    }
  }, []);

  // Parse page range string like "1,3,5-8" into 0-indexed set
  const parsePages = (str: string, total: number): Set<number> => {
    const result = new Set<number>();
    str.split(",").forEach((part) => {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [a, b] = trimmed.split("-").map(Number);
        for (let i = a; i <= b && i <= total; i++) result.add(i - 1);
      } else {
        const n = Number(trimmed);
        if (n >= 1 && n <= total) result.add(n - 1);
      }
    });
    return result;
  };

  const rotate = async () => {
    if (!file || !fileDataRef.current) return;
    setStatus("processing");
    setErrorMsg("");
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.load(fileDataRef.current);
      const pages = pdfDoc.getPages();
      const total = pages.length;

      let targetIndices: Set<number>;
      if (mode === "all") {
        targetIndices = new Set(pages.map((_, i) => i));
      } else if (mode === "odd") {
        // Pages 1, 3, 5... (0-indexed: 0, 2, 4...)
        targetIndices = new Set(pages.map((_, i) => i).filter((i) => i % 2 === 0));
      } else if (mode === "even") {
        // Pages 2, 4, 6... (0-indexed: 1, 3, 5...)
        targetIndices = new Set(pages.map((_, i) => i).filter((i) => i % 2 === 1));
      } else {
        targetIndices = parsePages(customPages, total);
      }

      targetIndices.forEach((idx) => {
        const page = pages[idx];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + angle) % 360));
      });

      const bytes = await pdfDoc.save();
      // Cast through unknown to satisfy strict lib type (Uint8Array<ArrayBufferLike> vs BlobPart)
      setResultBlob(new Blob([bytes as unknown as BlobPart], { type: "application/pdf" }));
      setStatus("done");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to rotate PDF.");
      setStatus("error");
    }
  };

  const download = () => {
    if (!resultBlob || !file) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "_rotated.pdf");
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setStatus("idle");
    setResultBlob(null);
    setErrorMsg("");
    fileDataRef.current = null;
  };

  const angleOptions = [
    { value: 90 as const, label: "90° Clockwise" },
    { value: 180 as const, label: "180°" },
    { value: 270 as const, label: "90° Counter-clockwise" },
  ];

  const modeOptions = [
    { value: "all" as const, label: "All Pages" },
    { value: "odd" as const, label: "Odd Pages (1, 3, 5...)" },
    { value: "even" as const, label: "Even Pages (2, 4, 6...)" },
    { value: "custom" as const, label: "Custom Range" },
  ];

  const showControls =
    (status === "idle" || status === "done" || status === "error" || status === "processing") && pageCount > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-4">
            <RotateCw className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Rotate</h1>
          <p className="text-gray-500">Rotate PDF pages by 90, 180, or 270 degrees. All pages or specific ones.</p>
        </div>

        {/* Drop zone */}
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
              dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
          >
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium mb-1">Drop your PDF here or click to browse</p>
            <p className="text-sm text-gray-400">PDF files only</p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            {/* File info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <RotateCw className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB &middot; {pageCount} {pageCount === 1 ? "page" : "pages"}
                </p>
              </div>
              <button onClick={reset} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {status === "loading" && (
              <p className="text-sm text-gray-500 text-center py-2">Loading PDF...</p>
            )}

            {showControls && (
              <>
                {/* Rotation angle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rotation Angle</label>
                  <div className="flex gap-2 flex-wrap">
                    {angleOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setAngle(opt.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                          angle === opt.value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apply to</label>
                  <div className="flex gap-2 flex-wrap">
                    {modeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setMode(opt.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          mode === opt.value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {mode === "custom" && (
                    <input
                      type="text"
                      value={customPages}
                      onChange={(e) => setCustomPages(e.target.value)}
                      placeholder="e.g. 1,3,5-8"
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>

                {/* Error message */}
                {status === "error" && (
                  <div className="flex gap-2 p-3 bg-red-50 rounded-xl text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{errorMsg}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={rotate}
                    disabled={status === "processing" || (mode === "custom" && !customPages.trim())}
                    className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    {status === "processing" ? "Rotating..." : "Rotate PDF"}
                  </button>
                  {status === "done" && resultBlob && (
                    <button
                      onClick={download}
                      className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Info section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "🔄",
              title: "Flexible Rotation",
              desc: "Rotate all pages or select odd, even, or custom page ranges.",
            },
            { icon: "🛡️", title: "100% Private", desc: "All processing in your browser. Files never uploaded." },
            { icon: "📐", title: "Preserves Quality", desc: "No re-rendering. PDF structure stays intact." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
