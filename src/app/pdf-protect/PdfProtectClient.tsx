"use client";
import { useState, useCallback, useRef } from "react";
import { Upload, Lock, Download, X, AlertCircle, CheckCircle } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

export default function PdfProtectClient() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    trackToolEvent('pdf-protect', 'process');
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg("Please select a PDF file.");
      setStatus("error");
      return;
    }
    setFile(f);
    setStatus("idle");
    setResultBlob(null);
    setErrorMsg("");
  }, []);

  const protect = async () => {
    if (!file) return;
    setStatus("processing");
    setErrorMsg("");
    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import("pdf-lib");
      const arrayBuf = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuf);

      // Add protection metadata
      pdfDoc.setAuthor("Protected by FreeAIKit PDF Protect");
      pdfDoc.setKeywords(["protected", "confidential"]);

      // Add a subtle "PROTECTED" watermark to all pages
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawText("PROTECTED", {
          x: width / 2 - 60,
          y: height / 2,
          size: 48,
          font,
          color: rgb(0.9, 0.9, 0.9),
          opacity: 0.15,
          rotate: degrees(45),
        });
      }

      const bytes = await pdfDoc.save();
      setResultBlob(new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" }));
      setStatus("done");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to process PDF.");
      setStatus("error");
    }
  };

  const download = () => {
    if (!resultBlob || !file) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "_protected.pdf");
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setResultBlob(null);
    setErrorMsg("");
  };

  return (
    <div className="space-y-6">
      {/* Browser limitation notice */}
      <div className="flex gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Note:</strong> This tool adds a PROTECTED watermark to all pages of your PDF.
          It does not apply password encryption. For password-based encryption, use Adobe Acrobat
          or similar desktop tools.
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
            <Lock className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={reset}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
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
              <p>PROTECTED watermark added to all pages.</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={protect}
              disabled={status === "processing"}
              className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {status === "processing" ? "Processing..." : "Add Watermark"}
            </button>
            {status === "done" && resultBlob && (
              <button
                onClick={download}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
