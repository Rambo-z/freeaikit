"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Copy, Check, Loader2, ImageIcon } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button onClick={handleCopy} disabled={!text}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy Text"}
    </button>
  );
}

const LANGUAGES = [
  { code: "eng", label: "English" },
  { code: "chi_sim", label: "Chinese (Simplified)" },
  { code: "chi_tra", label: "Chinese (Traditional)" },
  { code: "jpn", label: "Japanese" },
  { code: "kor", label: "Korean" },
  { code: "spa", label: "Spanish" },
  { code: "fra", label: "French" },
  { code: "deu", label: "German" },
  { code: "por", label: "Portuguese" },
  { code: "ita", label: "Italian" },
  { code: "rus", label: "Russian" },
  { code: "ara", label: "Arabic" },
  { code: "hin", label: "Hindi" },
  { code: "tha", label: "Thai" },
  { code: "vie", label: "Vietnamese" },
  { code: "tur", label: "Turkish" },
  { code: "pol", label: "Polish" },
  { code: "nld", label: "Dutch" },
];

export default function ImageToTextClient() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("eng");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setImage(url);
    setResult("");
    setStatus("idle");
    setProgress(0);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleRecognize = useCallback(async () => {
    if (!image) return;
    setStatus("loading");
    setResult("");
    setProgress(0);
    setErrorMsg("");
    setProgressMsg("Loading OCR engine...");

    try {
      const Tesseract = await import("tesseract.js");
      const worker = await Tesseract.createWorker(language, undefined, {
        logger: (m: { status: string; progress: number }) => {
          setProgressMsg(m.status);
          setProgress(Math.round(m.progress * 100));
        },
      });
      const { data } = await worker.recognize(image);
      setResult(data.text);
      setStatus("done");
      await worker.terminate();
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "OCR failed");
      setStatus("error");
    }
  }, [image, language]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) handleFile(file);
        break;
      }
    }
  }, [handleFile]);

  return (
    <div className="space-y-5" onPaste={handlePaste}>
      {/* Upload area */}
      {!image && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 p-12 text-center cursor-pointer transition-colors"
        >
          <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Drop an image here or click to upload</p>
          <p className="text-gray-400 text-sm mt-1">You can also paste from clipboard (Ctrl+V)</p>
          <p className="text-gray-400 text-xs mt-2">JPG, PNG, WebP, BMP, TIFF</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}

      {/* Image loaded */}
      {image && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: Image + Controls */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">{fileName}</span>
                </div>
                <button onClick={() => { setImage(null); setResult(""); setStatus("idle"); }}
                  className="text-xs text-gray-400 hover:text-red-500">Change</button>
              </div>
              <img src={image} alt="Uploaded" className="w-full rounded-xl max-h-[400px] object-contain bg-gray-50" />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>

              <button onClick={handleRecognize} disabled={status === "loading"}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Recognizing... {progress}%
                  </>
                ) : "Extract Text (OCR)"}
              </button>

              {status === "loading" && (
                <div className="space-y-1">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 text-center">{progressMsg}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Result */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Extracted Text</h2>
              {result && <CopyButton text={result} />}
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500">{errorMsg}</p>
            )}

            {result ? (
              <textarea value={result} readOnly rows={20}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none resize-none" />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                {status === "loading" ? "Processing..." : "Extracted text will appear here"}
              </div>
            )}

            {result && (
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{result.length.toLocaleString()} characters</span>
                <span>{result.split(/\s+/).filter(Boolean).length.toLocaleString()} words</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
