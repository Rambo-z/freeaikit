"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Copy,
  Check,
  Loader2,
  ImageIcon,
  Download,
  RefreshCw,
  X,
  FileText,
  Plus,
} from "lucide-react";
import EmailCapture from "../components/EmailCapture";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      {copied ? "Copied!" : "Copy"}
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
  { code: "ind", label: "Indonesian" },
  { code: "ukr", label: "Ukrainian" },
  { code: "ces", label: "Czech" },
  { code: "ron", label: "Romanian" },
  { code: "swe", label: "Swedish" },
  { code: "fin", label: "Finnish" },
];

interface ImageItem {
  id: string;
  file: File;
  url: string;
  text: string;
  status: "pending" | "processing" | "done" | "error";
  progress: number;
  progressMsg: string;
  error: string;
  confidence: number;
}

let idCounter = 0;

export default function ImageToTextClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [language, setLanguage] = useState("eng");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newItems: ImageItem[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      newItems.push({
        id: `img-${++idCounter}`,
        file,
        url: URL.createObjectURL(file),
        text: "",
        status: "pending",
        progress: 0,
        progressMsg: "",
        error: "",
        confidence: 0,
      });
    }
    if (newItems.length > 0) {
      setImages((prev) => [...prev, ...newItems]);
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

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) addFiles([file]);
          break;
        }
      }
    },
    [addFiles]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const recognizeAll = useCallback(async () => {
    const pending = images.filter(
      (i) => i.status === "pending" || i.status === "error"
    );
    if (pending.length === 0) return;

    setIsProcessing(true);

    // Reset statuses
    setImages((prev) =>
      prev.map((i) =>
        i.status === "pending" || i.status === "error"
          ? { ...i, status: "pending" as const, progress: 0, text: "", error: "" }
          : i
      )
    );

    try {
      const Tesseract = await import("tesseract.js");

      // Update first pending to show engine loading
      setImages((prev) =>
        prev.map((i, idx) =>
          idx === prev.findIndex((p) => p.status === "pending")
            ? { ...i, status: "processing" as const, progressMsg: "Loading OCR engine..." }
            : i
        )
      );

      const worker = await Tesseract.createWorker(language);

      for (const item of pending) {
        // Mark as processing
        setImages((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "processing" as const, progress: 0, progressMsg: "Recognizing..." }
              : i
          )
        );

        try {
          const { data } = await worker.recognize(item.url);

          setImages((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    status: "done" as const,
                    text: data.text,
                    progress: 100,
                    confidence: data.confidence,
                  }
                : i
            )
          );
        } catch (err) {
          setImages((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    status: "error" as const,
                    error: err instanceof Error ? err.message : "OCR failed",
                  }
                : i
            )
          );
        }
      }

      await worker.terminate();
    } catch (err) {
      // Engine loading failed
      setImages((prev) =>
        prev.map((i) =>
          i.status === "processing" || i.status === "pending"
            ? {
                ...i,
                status: "error" as const,
                error: err instanceof Error ? err.message : "Failed to load OCR engine",
              }
            : i
        )
      );
    }

    setIsProcessing(false);
  }, [images, language]);

  const allText = images
    .filter((i) => i.status === "done" && i.text)
    .map((i) => i.text)
    .join("\n\n---\n\n");

  const hasDone = images.some((i) => i.status === "done");
  const hasPending = images.some(
    (i) => i.status === "pending" || i.status === "error"
  );

  const handleDownloadTxt = useCallback(() => {
    if (!allText) return;
    const blob = new Blob([allText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [allText]);

  const handleReset = useCallback(() => {
    images.forEach((i) => URL.revokeObjectURL(i.url));
    setImages([]);
  }, [images]);

  return (
    <div className="space-y-5" onPaste={handlePaste}>
      {/* Upload area — always show when no images or as add-more */}
      {images.length === 0 ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-16 text-center cursor-pointer
                     transition-all duration-300 bg-white ${
                       isDragging
                         ? "border-blue-500 bg-blue-50 scale-[1.02]"
                         : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
                     }`}
        >
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-blue-500" />
          </div>
          <button className="px-8 py-3.5 bg-blue-600 text-white rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-4">
            Upload Image
          </button>
          <p className="text-base text-gray-500 mb-1">
            or drop images here, or paste from clipboard (Ctrl+V)
          </p>
          <p className="text-sm text-gray-400">
            Supports JPG, PNG, WebP, BMP, TIFF — multiple files OK
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
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
              Powered by Tesseract.js
            </span>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
            }}
            className="hidden"
          />
        </div>
      ) : (
        <>
          {/* Controls bar */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-3 flex-wrap">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={isProcessing}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-xs text-gray-400 self-end pb-2">
                {images.length} image{images.length > 1 ? "s" : ""}
                {hasDone &&
                  ` · ${images.filter((i) => i.status === "done").length} done`}
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add More
              </button>
              <button
                onClick={recognizeAll}
                disabled={isProcessing || !hasPending}
                className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Extract Text
                    {hasPending &&
                      ` (${images.filter((i) => i.status === "pending" || i.status === "error").length})`}
                  </>
                )}
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = "";
              }}
              className="hidden"
            />
          </div>

          {/* Image cards */}
          <div className="space-y-4">
            {images.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image preview */}
                  <div className="p-4 border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <ImageIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600 truncate">
                          {item.file.name}
                        </span>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {(item.file.size / 1024).toFixed(0)} KB
                        </span>
                      </div>
                      <button
                        onClick={() => removeImage(item.id)}
                        disabled={isProcessing}
                        className="text-gray-300 hover:text-red-500 disabled:opacity-30 transition-colors p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <img
                      src={item.url}
                      alt={item.file.name}
                      className="w-full rounded-xl max-h-[300px] object-contain bg-gray-50"
                    />
                  </div>

                  {/* Result */}
                  <div className="p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Extracted Text
                      </span>
                      <div className="flex items-center gap-2">
                        {item.status === "done" && item.confidence > 0 && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.confidence >= 80
                                ? "bg-green-50 text-green-600"
                                : item.confidence >= 50
                                  ? "bg-yellow-50 text-yellow-600"
                                  : "bg-red-50 text-red-600"
                            }`}
                          >
                            {Math.round(item.confidence)}% confidence
                          </span>
                        )}
                        {item.text && <CopyButton text={item.text} />}
                      </div>
                    </div>

                    {item.status === "processing" && (
                      <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        <div className="w-full max-w-xs">
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all"
                              style={{
                                width: `${Math.max(item.progress, 5)}%`,
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 text-center mt-1">
                            {item.progressMsg || "Processing..."}
                          </p>
                        </div>
                      </div>
                    )}

                    {item.status === "error" && (
                      <div className="flex-1 flex items-center justify-center py-8">
                        <p className="text-sm text-red-500">{item.error}</p>
                      </div>
                    )}

                    {item.status === "done" && item.text ? (
                      <>
                        <textarea
                          value={item.text}
                          readOnly
                          rows={10}
                          className="flex-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none resize-none min-h-[200px]"
                        />
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                          <span>
                            {item.text.length.toLocaleString()} characters
                          </span>
                          <span>
                            {item.text
                              .split(/\s+/)
                              .filter(Boolean)
                              .length.toLocaleString()}{" "}
                            words
                          </span>
                        </div>
                      </>
                    ) : item.status === "done" && !item.text ? (
                      <div className="flex-1 flex items-center justify-center py-8 text-gray-400 text-sm">
                        No text detected in this image
                      </div>
                    ) : item.status === "pending" ? (
                      <div className="flex-1 flex items-center justify-center py-8 text-gray-400 text-sm">
                        Click &ldquo;Extract Text&rdquo; to start OCR
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom action bar */}
          {hasDone && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  {allText.length.toLocaleString()} total characters
                </span>
                <span>
                  {allText
                    .split(/\s+/)
                    .filter(Boolean)
                    .length.toLocaleString()}{" "}
                  total words
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={allText} />
                <button
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download TXT
                </button>
                <button
                  onClick={handleReset}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Email Capture */}
          {hasDone && <EmailCapture trigger="after-use" />}
        </>
      )}
    </div>
  );
}
