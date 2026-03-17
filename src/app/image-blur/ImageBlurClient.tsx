"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, Download, Trash2, Undo2 } from "lucide-react";

interface BlurRegion {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function ImageBlurClient() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [regions, setRegions] = useState<BlurRegion[]>([]);
  const [blurAmount, setBlurAmount] = useState(20);
  const [blurType, setBlurType] = useState<"blur" | "pixelate">("blur");
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentRect, setCurrentRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      setRegions([]);
    };
    img.src = url;
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  // Get mouse position relative to canvas (accounting for display scale)
  const getCanvasPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  // Draw canvas with image + blur regions
  const drawCanvas = useCallback((extraRect?: { x: number; y: number; w: number; h: number } | null) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !image) return;

    canvas.width = image.width;
    canvas.height = image.height;

    // Draw original image
    ctx.drawImage(image, 0, 0);

    // Apply blur to each region
    const allRegions = extraRect
      ? [...regions, { id: "temp", ...extraRect }]
      : regions;

    for (const region of allRegions) {
      const rx = Math.min(region.x, region.x + region.w);
      const ry = Math.min(region.y, region.y + region.h);
      const rw = Math.abs(region.w);
      const rh = Math.abs(region.h);

      if (rw < 2 || rh < 2) continue;

      if (blurType === "pixelate") {
        // Pixelation
        const pixelSize = Math.max(4, blurAmount);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = rw;
        tempCanvas.height = rh;
        const tempCtx = tempCanvas.getContext("2d")!;

        // Draw region to small size
        const smallW = Math.max(1, Math.floor(rw / pixelSize));
        const smallH = Math.max(1, Math.floor(rh / pixelSize));
        tempCtx.drawImage(canvas, rx, ry, rw, rh, 0, 0, smallW, smallH);

        // Draw back at full size with no smoothing
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, rx, ry, rw, rh);
        ctx.imageSmoothingEnabled = true;
      } else {
        // Gaussian blur using CSS filter
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = rw;
        tempCanvas.height = rh;
        const tempCtx = tempCanvas.getContext("2d")!;

        // Copy the region
        tempCtx.drawImage(canvas, rx, ry, rw, rh, 0, 0, rw, rh);

        // Apply blur
        ctx.save();
        ctx.beginPath();
        ctx.rect(rx, ry, rw, rh);
        ctx.clip();
        ctx.filter = `blur(${blurAmount}px)`;
        ctx.drawImage(tempCanvas, 0, 0, rw, rh, rx, ry, rw, rh);
        ctx.restore();
      }

      // Draw region border (dashed)
      ctx.strokeStyle = region.id === "temp" ? "rgba(59,130,246,0.6)" : "rgba(59,130,246,0.3)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(rx, ry, rw, rh);
      ctx.setLineDash([]);
    }
  }, [image, regions, blurAmount, blurType]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getCanvasPos(e);
    setDrawing(true);
    setStartPos(pos);
    setCurrentRect(null);
  }, [getCanvasPos]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !startPos) return;
    const pos = getCanvasPos(e);
    const rect = {
      x: startPos.x,
      y: startPos.y,
      w: pos.x - startPos.x,
      h: pos.y - startPos.y,
    };
    setCurrentRect(rect);
    drawCanvas(rect);
  }, [drawing, startPos, getCanvasPos, drawCanvas]);

  const handleMouseUp = useCallback(() => {
    if (!drawing || !currentRect) {
      setDrawing(false);
      return;
    }
    const rw = Math.abs(currentRect.w);
    const rh = Math.abs(currentRect.h);
    if (rw > 5 && rh > 5) {
      setRegions((prev) => [...prev, {
        id: Math.random().toString(36).slice(2),
        ...currentRect,
      }]);
    }
    setDrawing(false);
    setStartPos(null);
    setCurrentRect(null);
  }, [drawing, currentRect]);

  const removeRegion = (id: string) => {
    setRegions((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "blurred-image.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, []);

  return (
    <div className="space-y-5">
      {/* Upload */}
      {!image && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 p-12 text-center cursor-pointer transition-colors"
        >
          <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Drop an image or click to upload</p>
          <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}

      {/* Editor */}
      {image && (
        <>
          {/* Controls */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-600">Type:</label>
              <select value={blurType} onChange={(e) => setBlurType(e.target.value as "blur" | "pixelate")}
                className="px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="blur">Gaussian Blur</option>
                <option value="pixelate">Pixelate</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-600">Intensity:</label>
              <input type="range" value={blurAmount} onChange={(e) => setBlurAmount(Number(e.target.value))}
                min={5} max={50} className="w-24" />
              <span className="text-xs text-gray-500 w-6">{blurAmount}</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-gray-400">{regions.length} region{regions.length !== 1 ? "s" : ""}</span>
              <button onClick={() => setRegions([])} disabled={regions.length === 0}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-red-500 disabled:opacity-40 rounded transition-colors">
                <Undo2 className="w-3 h-3" /> Clear All
              </button>
              <button onClick={() => { setImage(null); setImageUrl(null); setRegions([]); }}
                className="text-xs text-gray-400 hover:text-red-500 px-2 py-1">Change Image</button>
            </div>
          </div>

          {/* Canvas */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 mb-2 text-center">Click and drag to draw blur regions</p>
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="max-w-full max-h-[500px] cursor-crosshair rounded-xl border border-gray-100"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Region list */}
          {regions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-wrap gap-2">
              {regions.map((r, i) => (
                <div key={r.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                  Region {i + 1}
                  <button onClick={() => removeRegion(r.id)} className="hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Download */}
          <div className="text-center">
            <button onClick={handleDownload} disabled={regions.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors">
              <Download className="w-4 h-4" /> Download Blurred Image
            </button>
          </div>
        </>
      )}
    </div>
  );
}
