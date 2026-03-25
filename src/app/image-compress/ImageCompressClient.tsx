"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Download,
  RefreshCw,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

interface CompressedImage {
  id: string;
  file: File;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  previewUrl: string;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// Decode any image to ImageData using Canvas (universal decoder)
function decodeImageToImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

// Compress using WASM engines (MozJPEG / OxiPNG / libwebp)
async function compressImage(
  file: File,
  quality: number,
  outputFormat: string
): Promise<Blob> {
  if (outputFormat === "image/jpeg") {
    // MozJPEG WASM — much better than Canvas
    const imageData = await decodeImageToImageData(file);
    const { encode } = await import("@jsquash/jpeg");
    const buffer = await encode(imageData, { quality });
    return new Blob([buffer], { type: "image/jpeg" });
  }

  if (outputFormat === "image/webp") {
    // libwebp WASM
    const imageData = await decodeImageToImageData(file);
    const { encode } = await import("@jsquash/webp");
    const buffer = await encode(imageData, { quality });
    return new Blob([buffer], { type: "image/webp" });
  }

  if (outputFormat === "image/png") {
    // pngquant-style lossy compression: color quantization (24bit → 8bit palette)
    // Same technique as TinyPNG — visually near-identical, 60-80% smaller
    const imageData = await decodeImageToImageData(file);
    const { width, height } = imageData;

    // Quality maps to max colors: 100%→256, 50%→128, 10%→26
    const maxColors = Math.max(16, Math.round((quality / 100) * 256));

    // Step 1: Quantize with imagequant (libimagequant WASM)
    const iqModule = await import("@panda-ai/imagequant");
    await iqModule.default(); // init WASM
    const { palette, indices } = iqModule.quantize_image(
      new Uint8Array(imageData.data.buffer),
      width,
      height,
      maxColors
    );

    // Step 2: Build RGBA frames for UPNG (indexed PNG encoder)
    // Convert palette+indices back to RGBA buffer for UPNG.encode
    const UPNG = await import("upng-js");
    const rgba = new Uint8Array(width * height * 4);
    for (let i = 0; i < indices.length; i++) {
      const pi = indices[i] * 4;
      const ri = i * 4;
      rgba[ri] = palette[pi];
      rgba[ri + 1] = palette[pi + 1];
      rgba[ri + 2] = palette[pi + 2];
      rgba[ri + 3] = palette[pi + 3];
    }

    // UPNG.encode(imgs, w, h, cnum) — cnum=0 for lossless, >0 for palette colors
    const pngBuffer = UPNG.encode([rgba.buffer], width, height, maxColors);
    return new Blob([pngBuffer], { type: "image/png" });
  }

  throw new Error(`Unsupported format: ${outputFormat}`);
}

export default function ImageCompressClient() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(80);
  const [outputFormat, setOutputFormat] = useState("image/jpeg");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newImages: CompressedImage[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: Math.random().toString(36).slice(2),
        file,
        originalSize: file.size,
        compressedBlob: null,
        compressedSize: 0,
        previewUrl: URL.createObjectURL(file),
        status: "pending" as const,
      }));
    setImages((prev) => [...prev, ...newImages]);
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
    trackToolEvent('image-compress', 'process');
    setIsProcessing(true);
    const updated = [...images];

    // Reset all to pending so re-compress works when format/quality changes
    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "pending", compressedBlob: null, compressedSize: 0 };
    }
    setImages([...updated]);

    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "processing" };
      setImages([...updated]);

      try {
        const blob = await compressImage(updated[i].file, quality, outputFormat);
        // If compressed is larger than original, keep original
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
      setImages([...updated]);
    }

    setIsProcessing(false);
  }, [images, quality, outputFormat]);

  const downloadOne = useCallback((img: CompressedImage) => {
    trackToolEvent('image-compress', 'download');
    if (!img.compressedBlob) return;
    const extMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
    const ext = extMap[outputFormat] || "jpg";
    const baseName = img.file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(img.compressedBlob);
    a.download = `${baseName}-compressed.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [outputFormat]);

  const downloadAll = useCallback(() => {
    trackToolEvent('image-compress', 'download');
    images.filter((img) => img.status === "done").forEach(downloadOne);
  }, [images, downloadOne]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const handleReset = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [images]);

  const totalOriginal = images.reduce((s, i) => s + i.originalSize, 0);
  const totalCompressed = images.reduce((s, i) => s + i.compressedSize, 0);
  const allDone = images.length > 0 && images.every((i) => i.status === "done");
  const savings = totalOriginal > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer
                   transition-all duration-300 bg-white ${
                     isDragging
                       ? "border-blue-500 bg-blue-50 scale-[1.02]"
                       : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
                   }`}
      >
        <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-4">
          <Upload className="w-7 h-7 text-sky-500" />
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-3">
          Upload Images
        </button>
        <p className="text-sm text-gray-500 mb-1">or drop files here</p>
        <p className="text-xs text-gray-400">
          Supports JPG, PNG, WebP — multiple files allowed
        </p>

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
            Batch support
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Controls */}
      {images.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Quality Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Smallest file</span>
                <span>Best quality</span>
              </div>
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format
              </label>
              <div className="flex gap-2">
                {[
                  { value: "image/jpeg", label: "JPG" },
                  { value: "image/png", label: "PNG" },
                  { value: "image/webp", label: "WebP" },
                ].map((fmt) => (
                  <button
                    key={fmt.value}
                    onClick={() => setOutputFormat(fmt.value)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      outputFormat === fmt.value
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
              {outputFormat === "image/png" && (
                <p className="text-xs text-blue-500 mt-2">
                  Uses smart color quantization (like TinyPNG) — 60-80% smaller, visually identical.
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-gray-100">
            <button
              onClick={processAll}
              disabled={isProcessing || images.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                <>Compress All</>
              )}
            </button>

            {allDone && (
              <button
                onClick={downloadAll}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download All
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

      {/* Stats Summary */}
      {allDone && totalOriginal > 0 && (
        <div className={`border rounded-2xl p-5 text-center ${
          savings > 0
            ? "bg-green-50 border-green-200"
            : "bg-yellow-50 border-yellow-200"
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
                Already optimized — no further compression possible
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                Try a lower quality setting or WebP format for better results
              </p>
            </>
          )}
        </div>
      )}

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={img.previewUrl}
                  alt={img.file.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {img.file.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {formatBytes(img.originalSize)}
                  </span>
                  {img.status === "done" && (
                    <>
                      <span className="text-xs text-gray-400">&rarr;</span>
                      <span className={`text-xs font-medium ${
                        img.compressedSize < img.originalSize ? "text-green-600" : "text-yellow-600"
                      }`}>
                        {formatBytes(img.compressedSize)}
                      </span>
                      {img.compressedSize < img.originalSize ? (
                        <span className="text-xs text-green-500">
                          (-{Math.round((1 - img.compressedSize / img.originalSize) * 100)}%)
                        </span>
                      ) : (
                        <span className="text-xs text-yellow-500">
                          (already optimal)
                        </span>
                      )}
                    </>
                  )}
                  {img.status === "processing" && (
                    <span className="text-xs text-blue-500">Compressing...</span>
                  )}
                  {img.status === "error" && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {img.error}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {img.status === "done" && (
                  <button
                    onClick={() => downloadOne(img)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                {img.status === "processing" && (
                  <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                )}
                <button
                  onClick={() => removeImage(img.id)}
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
