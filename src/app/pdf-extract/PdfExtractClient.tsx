"use client";
import { useState, useCallback, useRef } from "react";
import { Upload, Scissors, Download, X, AlertCircle, CheckCircle } from "lucide-react";

export default function PdfExtractClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageRange, setPageRange] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "processing" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [extractedCount, setExtractedCount] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileDataRef = useRef<ArrayBuffer | null>(null);

  const handleFile = useCallback(async (f: File) => {
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
      const count = pdfDoc.getPageCount();
      setPageCount(count);
      setPageRange(`1-${count}`);
      setStatus("idle");
    } catch {
      setErrorMsg("Failed to read PDF.");
      setStatus("error");
    }
  }, []);

  // Parse page range string, return 0-indexed array (deduplicated, sorted)
  const parseRange = (str: string, total: number): number[] => {
    const indices = new Set<number>();
    str.split(",").forEach((part) => {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [rawA, rawB] = trimmed.split("-");
        const a = parseInt(rawA.trim(), 10);
        const b = parseInt(rawB.trim(), 10);
        if (!isNaN(a) && !isNaN(b)) {
          for (let i = Math.max(1, a); i <= Math.min(total, b); i++) {
            indices.add(i - 1);
          }
        }
      } else {
        const n = parseInt(trimmed, 10);
        if (!isNaN(n) && n >= 1 && n <= total) {
          indices.add(n - 1);
        }
      }
    });
    return Array.from(indices).sort((a, b) => a - b);
  };

  const extract = async () => {
    if (!file || !fileDataRef.current || !pageRange.trim()) return;
    setStatus("processing");
    setErrorMsg("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const srcDoc = await PDFDocument.load(fileDataRef.current);
      const indices = parseRange(pageRange, pageCount);
      if (indices.length === 0) {
        setErrorMsg("No valid pages in range. Check your input.");
        setStatus("error");
        return;
      }
      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(srcDoc, indices);
      copiedPages.forEach((page) => newDoc.addPage(page));
      const bytes = await newDoc.save();
      setResultBlob(new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" }));
      setExtractedCount(indices.length);
      setStatus("done");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to extract pages.");
      setStatus("error");
    }
  };

  const download = () => {
    if (!resultBlob || !file) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "_extracted.pdf");
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setPageRange("");
    setStatus("idle");
    setResultBlob(null);
    setErrorMsg("");
    fileDataRef.current = null;
  };

  // Quick preset buttons
  const presets =
    pageCount > 0
      ? [
          { label: "All pages", value: `1-${pageCount}` },
          { label: "First half", value: `1-${Math.floor(pageCount / 2)}` },
          {
            label: "Second half",
            value: `${Math.floor(pageCount / 2) + 1}-${pageCount}`,
          },
          {
            label: "Odd pages",
            value: Array.from({ length: pageCount }, (_, i) => i + 1)
              .filter((n) => n % 2 !== 0)
              .join(","),
          },
          {
            label: "Even pages",
            value: Array.from({ length: pageCount }, (_, i) => i + 1)
              .filter((n) => n % 2 === 0)
              .join(","),
          },
        ]
      : [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-4">
            <Scissors className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Extract Pages</h1>
          <p className="text-gray-500">
            Extract specific pages from a PDF. Enter a page range and download as a new PDF.
          </p>
        </div>

        {!file ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
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
            <p className="text-gray-600 font-medium mb-1">
              Drop your PDF here or click to browse
            </p>
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
              <Scissors className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB &middot; {pageCount}{" "}
                  {pageCount === 1 ? "page" : "pages"}
                </p>
              </div>
              <button
                onClick={reset}
                className="p-1 text-gray-400 hover:text-gray-600"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {status === "loading" && (
              <p className="text-sm text-gray-500 text-center py-2">Loading PDF...</p>
            )}

            {pageCount > 0 && (
              <>
                {/* Page range input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page Range{" "}
                    <span className="text-gray-400 font-normal">(e.g. 1-3, 5, 7-9)</span>
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => {
                      setPageRange(e.target.value);
                      setStatus("idle");
                      setResultBlob(null);
                    }}
                    placeholder={`1-${pageCount}`}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Total: {pageCount} pages. Use commas to separate multiple ranges.
                  </p>
                </div>

                {/* Quick presets */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Quick select:</p>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => {
                          setPageRange(p.value);
                          setStatus("idle");
                          setResultBlob(null);
                        }}
                        className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status messages */}
                {status === "error" && (
                  <div className="flex gap-2 p-3 bg-red-50 rounded-xl text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{errorMsg}</p>
                  </div>
                )}
                {status === "done" && (
                  <div className="flex gap-2 p-3 bg-green-50 rounded-xl text-sm text-green-700">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                      Extracted {extractedCount}{" "}
                      {extractedCount === 1 ? "page" : "pages"} successfully!
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={extract}
                    disabled={status === "processing" || !pageRange.trim()}
                    className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    <Scissors className="w-4 h-4" />
                    {status === "processing" ? "Extracting..." : "Extract Pages"}
                  </button>
                  {status === "done" && resultBlob && (
                    <button
                      onClick={download}
                      className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Feature highlights */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "✂️",
              title: "Flexible Extraction",
              desc: "Use page ranges, individual pages, or quick presets.",
            },
            {
              icon: "🛡️",
              title: "100% Private",
              desc: "All processing in your browser. Files never uploaded.",
            },
            {
              icon: "📄",
              title: "Preserves Quality",
              desc: "Extracted pages retain original PDF quality and text.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-4 border border-gray-100 text-center"
            >
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
