"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Download, ImageIcon, RefreshCw } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

const ASPECTS: { label: string; value: number | undefined }[] = [
  { label: "Free", value: undefined },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:4", value: 3 / 4 },
  { label: "9:16", value: 9 / 16 },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function transformImage(src: string, type: "rotateCW" | "rotateCCW" | "flipH" | "flipV"): Promise<string> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  if (type === "rotateCW" || type === "rotateCCW") {
    canvas.width = img.height;
    canvas.height = img.width;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((type === "rotateCW" ? 90 : -90) * (Math.PI / 180));
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
    if (type === "flipH") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    }
    ctx.drawImage(img, 0, 0);
  }
  return canvas.toDataURL("image/png");
}

function downloadCrop(imgEl: HTMLImageElement, crop: PixelCrop) {
  const scaleX = imgEl.naturalWidth / imgEl.width;
  const scaleY = imgEl.naturalHeight / imgEl.height;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(crop.width * scaleX);
  canvas.height = Math.round(crop.height * scaleY);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    imgEl,
    Math.round(crop.x * scaleX),
    Math.round(crop.y * scaleY),
    Math.round(crop.width * scaleX),
    Math.round(crop.height * scaleY),
    0, 0,
    canvas.width,
    canvas.height
  );
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cropped.png";
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

export default function ImageCropClient() {
  const [originalSrc, setOriginalSrc] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspectKey, setAspectKey] = useState(0); // index into ASPECTS
  const [isDragging, setIsDragging] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setOriginalSrc(url);
    setImageSrc(url);
    setCrop(undefined);
    setCompletedCrop(undefined);
  }, []);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const aspect = ASPECTS[aspectKey].value;
    if (aspect) {
      setCrop(centerCrop(makeAspectCrop({ unit: "%", width: 90 }, aspect, width, height), width, height));
    } else {
      setCrop(centerCrop({ unit: "%", width: 90, height: 90 }, width, height));
    }
  }, [aspectKey]);

  const handleTransform = useCallback(async (type: "rotateCW" | "rotateCCW" | "flipH" | "flipV") => {
    if (!imageSrc) return;
    setIsTransforming(true);
    const result = await transformImage(imageSrc, type);
    setImageSrc(result);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsTransforming(false);
  }, [imageSrc]);

  const handleAspectChange = useCallback((index: number) => {
    setAspectKey(index);
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    const aspect = ASPECTS[index].value;
    if (aspect) {
      setCrop(centerCrop(makeAspectCrop({ unit: "%", width: 90 }, aspect, width, height), width, height));
    }
  }, []);

  const handleReset = useCallback(() => {
    if (originalSrc) {
      setImageSrc(originalSrc);
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [originalSrc]);

  const handleDownload = useCallback(() => {
    trackToolEvent('image-crop', 'download');
    if (!imgRef.current || !completedCrop) return;
    downloadCrop(imgRef.current, completedCrop);
  }, [completedCrop]);

  const naturalW = imgRef.current?.naturalWidth ?? 0;
  const naturalH = imgRef.current?.naturalHeight ?? 0;
  const cropW = completedCrop ? Math.round(completedCrop.width * (naturalW / (imgRef.current?.width ?? 1))) : 0;
  const cropH = completedCrop ? Math.round(completedCrop.height * (naturalH / (imgRef.current?.height ?? 1))) : 0;

  if (!imageSrc) {
    return (
      <div
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false); }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 sm:p-16 text-center cursor-pointer transition-all duration-200 bg-white ${isDragging ? "border-blue-500 bg-blue-50 scale-[1.01]" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"}`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragging ? "bg-blue-100" : "bg-blue-50"}`}>
          <ImageIcon className={`w-7 h-7 ${isDragging ? "text-blue-600" : "text-blue-400"}`} />
        </div>
        {isDragging ? (
          <p className="text-lg font-semibold text-blue-600">Drop image here</p>
        ) : (
          <>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-3">
              Upload Image
            </button>
            <p className="text-sm text-gray-500 mb-1">or drag & drop</p>
          </>
        )}
        <p className="text-xs text-gray-400">PNG, JPG, WebP, GIF — any image</p>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { handleFile(e.target.files[0]); e.target.value = ""; }}} className="hidden" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Aspect ratios */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-gray-500 font-medium mr-1">Ratio:</span>
          {ASPECTS.map((a, i) => (
            <button key={a.label} onClick={() => handleAspectChange(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${aspectKey === i ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
              {a.label}
            </button>
          ))}
        </div>

        {/* Transform controls */}
        <div className="flex items-center gap-1.5">
          {([
            { type: "rotateCCW", icon: RotateCcw, title: "Rotate 90° CCW" },
            { type: "rotateCW",  icon: RotateCw,  title: "Rotate 90° CW"  },
            { type: "flipH",     icon: FlipHorizontal, title: "Flip Horizontal" },
            { type: "flipV",     icon: FlipVertical,   title: "Flip Vertical"   },
          ] as const).map(({ type, icon: Icon, title }) => (
            <button key={type} onClick={() => handleTransform(type)} disabled={isTransforming} title={title}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 transition-all">
              <Icon className="w-4 h-4" />
            </button>
          ))}
          <button onClick={handleReset} title="Reset to original"
            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => { setImageSrc(""); setOriginalSrc(""); setCrop(undefined); setCompletedCrop(undefined); }}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:text-red-500 transition-all">
            Change
          </button>
        </div>
      </div>

      {/* Crop area */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        {isTransforming ? (
          <div className="flex items-center justify-center h-64 text-gray-400 gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span className="text-sm">Applying transform…</span>
          </div>
        ) : (
          <div className="flex justify-center overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={(_, pct) => setCrop(pct)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={ASPECTS[aspectKey].value}
              className="max-h-[600px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={imgRef} src={imageSrc} alt="Crop preview" onLoad={onImageLoad} className="max-h-[600px] max-w-full object-contain" />
            </ReactCrop>
          </div>
        )}
      </div>

      {/* Download bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="text-sm text-gray-600">
          {completedCrop && cropW > 0 ? (
            <span>Crop size: <span className="font-semibold font-mono">{cropW} × {cropH} px</span></span>
          ) : (
            <span className="text-gray-400">Drag on the image to select a crop area</span>
          )}
        </div>
        <button
          onClick={handleDownload}
          disabled={!completedCrop || cropW === 0}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors shadow-sm shadow-blue-500/20"
        >
          <Download className="w-4 h-4" />
          Download Cropped PNG
        </button>
      </div>
    </div>
  );
}
