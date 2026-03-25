"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, RefreshCw, Loader2, AlertCircle, ImageIcon } from "lucide-react";
import EmailCapture from "../components/EmailCapture";
import { trackToolEvent } from "@/lib/analytics";

type ProcessingState = "idle" | "loading-model" | "processing" | "done" | "error";

export default function BgRemoverClient() {
  const [state, setState] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(async (file: File) => {
    trackToolEvent('bg-remover', 'process');
    setError("");
    setFileName(file.name);
    setOriginalUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setState("loading-model");
    setProgress(0);

    try {
      const { removeBackground } = await import("@imgly/background-removal");

      setState("processing");
      setProgress(10);

      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            const pct = Math.round((current / total) * 100);
            setProgress(Math.min(pct, 99));
          }
        },
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setState("done");
      setProgress(100);
    } catch (err) {
      console.error("Background removal failed:", err);
      setError(
        err instanceof Error ? err.message : "Failed to process image. Please try again."
      );
      setState("error");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        processImage(file);
      }
    },
    [processImage]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processImage(file);
      }
    },
    [processImage]
  );

  const handleDownload = useCallback(() => {
    trackToolEvent('bg-remover', 'download');
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    const baseName = fileName.replace(/\.[^.]+$/, "");
    a.download = `${baseName}-no-bg.png`;
    a.click();
  }, [resultUrl, fileName]);

  const handleReset = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setState("idle");
    setProgress(0);
    setError("");
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [originalUrl, resultUrl]);

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {state === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-16 text-center cursor-pointer
                     transition-all duration-300 bg-white ${
                       isDragging
                         ? "border-blue-500 bg-blue-50 scale-[1.02]"
                         : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
                     }`}
        >
          {/* Upload Icon */}
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-blue-500" />
          </div>

          {/* Upload Button */}
          <button className="px-8 py-3.5 bg-blue-600 text-white rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-4">
            Upload Image
          </button>

          <p className="text-base text-gray-500 mb-1">
            or drop a file here
          </p>
          <p className="text-sm text-gray-400">
            Supports PNG, JPG, WebP — up to 4096x4096px
          </p>

          {/* Trust badges */}
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
              No watermark
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Processing State */}
      {(state === "loading-model" || state === "processing") && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-1">
              {state === "loading-model"
                ? "Loading AI Model..."
                : "Removing Background..."}
            </p>
            <p className="text-sm text-gray-500 mb-5">
              {state === "loading-model"
                ? "First time may take 10-20 seconds to download the model"
                : "This usually takes a few seconds"}
            </p>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.max(progress, 5)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">{progress}%</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-lg font-semibold text-red-600 mb-2">Processing Failed</p>
          <p className="text-sm text-gray-600 mb-5">{error}</p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}

      {/* Result */}
      {state === "done" && originalUrl && resultUrl && (
        <div className="space-y-6">
          {/* Before/After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Original */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">Original</span>
              </div>
              <div className="p-4 flex items-center justify-center min-h-[300px] bg-gray-50/50">
                <img
                  src={originalUrl}
                  alt="Original"
                  className="max-w-full max-h-[400px] object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Result */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-500">Background Removed</span>
              </div>
              <div
                className="p-4 flex items-center justify-center min-h-[300px]"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                }}
              >
                <img
                  src={resultUrl}
                  alt="Background removed"
                  className="max-w-full max-h-[400px] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
            >
              <Download className="w-4 h-4" />
              Download PNG (Transparent)
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Process Another Image
            </button>
          </div>

          {/* Email Capture */}
          <EmailCapture trigger="after-use" />
        </div>
      )}
    </div>
  );
}
