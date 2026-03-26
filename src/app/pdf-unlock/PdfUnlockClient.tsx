"use client";
import { useState, useCallback, useRef } from "react";
import { Upload, Lock, Unlock, Download, AlertCircle, CheckCircle, X } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

export default function PdfUnlockClient() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    trackToolEvent('pdf-unlock', 'process');
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

  const unlock = async () => {
    if (!file) return;
    setStatus("processing");
    setErrorMsg("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuf = await file.arrayBuffer();
      // pdf-lib does not decrypt AES/RC4-encrypted PDFs.
      // ignoreEncryption: true bypasses the encryption guard so the PDF
      // structure can be re-saved without any password restriction flag.
      // This is effective for owner-password-only locked PDFs (print/copy/edit restrictions).
      let pdfDoc: Awaited<ReturnType<typeof PDFDocument.load>>;
      try {
        pdfDoc = await PDFDocument.load(arrayBuf, { ignoreEncryption: true });
      } catch {
        throw new Error(
          "Could not open this PDF. It may use a strong user password that requires decryption — this tool cannot bypass those."
        );
      }
      const unlockedBytes = await pdfDoc.save();
      // Cast through unknown to satisfy strict lib type (Uint8Array<ArrayBufferLike> vs BlobPart)
      const blob = new Blob([unlockedBytes as unknown as BlobPart], { type: "application/pdf" });
      setResultBlob(blob);
      setStatus("done");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to unlock PDF.");
      setStatus("error");
    }
  };

  const download = () => {
    if (!resultBlob || !file) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "_unlocked.pdf");
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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-4">
            <Unlock className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Unlock</h1>
          <p className="text-gray-500">Remove owner-password restrictions from PDF files. Everything runs in your browser.</p>
        </div>

        {/* Drop zone */}
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
              dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
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
            <p className="text-sm text-gray-400">Removes print / copy / edit restrictions</p>
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
              <button onClick={reset} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Note */}
            <div className="flex gap-2 p-3 bg-amber-50 rounded-xl text-sm text-amber-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                This tool removes owner-level restrictions (print, copy, edit). PDFs protected with a strong
                user-open password cannot be unlocked here — you need the password for those.
              </p>
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
                <p>PDF unlocked successfully! Click Download to save.</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {status !== "done" ? (
                <button
                  onClick={unlock}
                  disabled={status === "processing"}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {status === "processing" ? "Unlocking..." : "Unlock PDF"}
                </button>
              ) : (
                <button
                  onClick={download}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Unlocked PDF
                </button>
              )}
            </div>
          </div>
        )}

        {/* Info section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🔓", title: "Removes Restrictions", desc: "Lifts print, copy, and edit restrictions from protected PDFs." },
            {
              icon: "🛡️",
              title: "100% Private",
              desc: "All processing happens in your browser. Your file never leaves your device.",
            },
            { icon: "⚡", title: "Instant", desc: "No server processing wait time. Unlock in seconds." },
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
