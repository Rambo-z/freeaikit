"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Download,
  RefreshCw,
  Trash2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

interface ConvertedImage {
  id: string;
  file: File;
  originalSize: number;
  convertedBlob: Blob | null;
  convertedSize: number;
  previewUrl: string;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

const OUTPUT_FORMATS = [
  { value: "image/jpeg", label: "JPG", ext: "jpg" },
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function getInputExt(file: File): string {
  const ext = file.name.split(".").pop()?.toUpperCase();
  return ext ?? file.type.split("/")[1]?.toUpperCase() ?? "IMG";
}

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
    img.onerror = () => reject(new Error("Failed to decode image"));
    img.src = URL.createObjectURL(file);
  });
}

async function convertImage(
  file: File,
  outputFormat: string,
  quality: number
): Promise<Blob> {
  const imageData = await decodeImageToImageData(file);

  if (outputFormat === "image/jpeg") {
    const { encode } = await import("@jsquash/jpeg");
    const buffer = await encode(imageData, { quality });
    return new Blob([buffer], { type: "image/jpeg" });
  }

  if (outputFormat === "image/webp") {
    const { encode } = await import("@jsquash/webp");
    const buffer = await encode(imageData, { quality });
    return new Blob([buffer], { type: "image/webp" });
  }

  if (outputFormat === "image/png") {
    const { encode } = await import("@jsquash/png");
    const buffer = await encode(imageData);
    return new Blob([buffer], { type: "image/png" });
  }

  throw new Error(`Unsupported format: ${outputFormat}`);
}

export default function ImageConvertClient() {
  const [images, setImages] = useState<ConvertedImage[]>([]);
  const [outputFormat, setOutputFormat] = useState("image/webp");
  const [quality, setQuality] = useState(85);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLossy = outputFormat !== "image/png";

  const addFiles = useCallback((files: FileList | File[]) => {
    const newImages: ConvertedImage[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: Math.random().toString(36).slice(2),
        file,
        originalSize: file.size,
        convertedBlob: null,
        convertedSize: 0,
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
    trackToolEvent('image-convert', 'process');
    setIsProcessing(true);
    const updated = [...images];

    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "pending", convertedBlob: null, convertedSize: 0 };
    }
    setImages([...updated]);

    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "processing" };
      setImages([...updated]);

      try {
        const blob = await convertImage(updated[i].file, outputFormat, quality);
        updated[i] = {
          ...updated[i],
          convertedBlob: blob,
          convertedSize: blob.size,
          status: "done",
        };
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
  }, [images, outputFormat, quality]);

  const downloadOne = useCallback(
    (img: ConvertedImage) => {
      if (!img.convertedBlob) return;
      const fmt = OUTPUT_FORMATS.find((f) => f.value === outputFormat);
      const ext = fmt?.ext ?? "jpg";
      const baseName = img.file.name.replace(/\.[^.]+$/, "");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(img.convertedBlob);
      a.download = `${baseName}.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
    },
    [outputFormat]
  );

  const downloadAll = useCallback(() => {
    trackToolEvent('image-convert', 'download');
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

  const allDone = images.length > 0 && images.every((i) => i.status === "done");
  const doneCount = images.filter((i) => i.status === "done").length;
  const outputLabel = OUTPUT_FORMATS.find((f) => f.value === outputFormat)?.label ?? "JPG";

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
                       ? "border-teal-500 bg-teal-50 scale-[1.02]"
                       : "border-gray-200 hover:border-teal-400 hover:bg-teal-50/30"
                   }`}
      >
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
          <Upload className="w-7 h-7 text-teal-500" />
        </div>
        <button className="px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/25 mb-3">
          Upload Images
        </button>
        <p className="text-sm text-gray-500 mb-1">or drop files here</p>
        <p className="text-xs text-gray-400">
          Supports JPG, PNG, WebP, GIF, BMP — multiple files allowed
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
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Controls */}
      {images.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Output Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Convert To
              </label>
              <div className="flex gap-2">
                {OUTPUT_FORMATS.map((fmt) => (
                  <button
                    key={fmt.value}
                    onClick={() => setOutputFormat(fmt.value)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      outputFormat === fmt.value
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
              {outputFormat === "image/webp" && (
                <p className="text-xs text-teal-600 mt-2">
                  WebP is 25–35% smaller than JPG at the same quality — ideal for web.
                </p>
              )}
              {outputFormat === "image/png" && (
                <p className="text-xs text-teal-600 mt-2">
                  PNG uses lossless compression — preserves every pixel perfectly.
                </p>
              )}
            </div>

            {/* Quality slider — only for lossy formats */}
            {isLossy && (
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
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Smaller file</span>
                  <span>Best quality</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-gray-100">
            <button
              onClick={processAll}
              disabled={isProcessing || images.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Converting...
                </>
              ) : (
                <>Convert to {outputLabel}</>
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
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {img.file.name}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                    {getInputExt(img.file)}
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                    img.status === "done" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {outputLabel}
                  </span>
                  <span className="text-xs text-gray-400">{formatBytes(img.originalSize)}</span>
                  {img.status === "done" && img.convertedSize > 0 && (
                    <span className="text-xs text-gray-500">
                      → {formatBytes(img.convertedSize)}
                    </span>
                  )}
                  {img.status === "processing" && (
                    <span className="text-xs text-teal-500">Converting...</span>
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
                    className="p-2 rounded-lg hover:bg-teal-50 text-teal-600 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                {img.status === "processing" && (
                  <RefreshCw className="w-4 h-4 text-teal-500 animate-spin" />
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
