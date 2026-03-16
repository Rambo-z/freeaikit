"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Download, ImageIcon, RefreshCw } from "lucide-react";

type Position = "tl" | "tc" | "tr" | "ml" | "mc" | "mr" | "bl" | "bc" | "br";

const POSITIONS: { id: Position; label: string }[] = [
  { id: "tl", label: "↖" }, { id: "tc", label: "↑" }, { id: "tr", label: "↗" },
  { id: "ml", label: "←" }, { id: "mc", label: "●" }, { id: "mr", label: "→" },
  { id: "bl", label: "↙" }, { id: "bc", label: "↓" }, { id: "br", label: "↘" },
];

export default function ImageWatermarkClient() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imgNaturalW, setImgNaturalW] = useState(0);
  const [imgNaturalH, setImgNaturalH] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [text, setText] = useState("© FreeAIKit");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(70);
  const [position, setPosition] = useState<Position>("br");
  const [rotation, setRotation] = useState(0);
  const [margin, setMargin] = useState(30);
  const [repeat, setRepeat] = useState(false);

  const [isRendering, setIsRendering] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const renderWatermark = useCallback(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !imgRef.current) return;
    setIsRendering(true);

    const img = imgRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    ctx.save();
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textBaseline = "middle";

    const textW = ctx.measureText(text).width;
    const textH = fontSize;

    if (repeat) {
      const stepX = textW * 2;
      const stepY = textH * 4;
      for (let y = -canvas.height; y < canvas.height * 2; y += stepY) {
        for (let x = -canvas.width; x < canvas.width * 2; x += stepX) {
          ctx.save();
          ctx.translate(x + textW / 2, y + textH / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.fillText(text, -textW / 2, 0);
          ctx.restore();
        }
      }
    } else {
      const col = position[1] === "l" ? "left" : position[1] === "c" ? "center" : "right";
      const row = position[0] === "t" ? "top" : position[0] === "m" ? "mid" : "bot";

      let x: number, y: number;
      if (col === "left") x = margin + textW / 2;
      else if (col === "center") x = canvas.width / 2;
      else x = canvas.width - margin - textW / 2;

      if (row === "top") y = margin + textH / 2;
      else if (row === "mid") y = canvas.height / 2;
      else y = canvas.height - margin - textH / 2;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillText(text, -textW / 2, 0);
      ctx.restore();
    }
    ctx.restore();
    setIsRendering(false);
  }, [text, fontSize, color, opacity, position, rotation, margin, repeat]);

  useEffect(() => {
    if (imageUrl) renderWatermark();
  }, [imageUrl, renderWatermark]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImgNaturalW(img.naturalWidth);
      setImgNaturalH(img.naturalHeight);
      setImageUrl(url);
    };
    img.src = url;
  }, [imageUrl]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const download = useCallback(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "watermarked.png";
    a.click();
  }, []);

  return (
    <div className="space-y-6">
      {/* Upload */}
      {!imageUrl ? (
        <div
          onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-white ${
            isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragging ? "bg-blue-100" : "bg-blue-50"}`}>
            <ImageIcon className={`w-7 h-7 ${isDragging ? "text-blue-600" : "text-blue-500"}`} />
          </div>
          {isDragging ? (
            <p className="text-lg font-semibold text-blue-600">Drop image here</p>
          ) : (
            <>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-3">
                Upload Image
              </button>
              <p className="text-sm text-gray-500 mb-1">or drop file here</p>
            </>
          )}
          <p className="text-xs text-gray-400">PNG, JPG, WebP — any image</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { handleFile(e.target.files[0]); e.target.value = ""; }}} className="hidden" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">Watermark Settings</h3>
              <button onClick={() => { setImageUrl(null); imgRef.current = null; }}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                Change image
              </button>
            </div>

            {/* Text */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Watermark Text</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Font size + opacity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Font Size — {fontSize}px</label>
                <input type="range" min={16} max={200} step={4} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Opacity — {opacity}%</label>
                <input type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
            </div>

            {/* Color + Rotation */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Text Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                  <input type="text" value={color} onChange={(e) => setColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Rotation — {rotation}°</label>
                <input type="range" min={-180} max={180} value={rotation} onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
            </div>

            {/* Mode */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Mode</label>
              <div className="flex gap-2">
                <button onClick={() => setRepeat(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${!repeat ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500"}`}>
                  Single
                </button>
                <button onClick={() => setRepeat(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${repeat ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500"}`}>
                  Repeat (Tiled)
                </button>
              </div>
            </div>

            {/* Position (only for single) */}
            {!repeat && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Position</label>
                <div className="grid grid-cols-3 gap-1.5 w-28">
                  {POSITIONS.map((p) => (
                    <button key={p.id} onClick={() => setPosition(p.id)}
                      className={`aspect-square rounded-lg text-sm font-bold border transition-all ${
                        position === p.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-400 hover:border-gray-300"
                      }`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Margin */}
            {!repeat && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Margin — {margin}px</label>
                <input type="range" min={0} max={100} value={margin} onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
            )}

            <button onClick={download}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" />Download PNG
            </button>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Preview</h3>
              <span className="text-xs text-gray-400">{imgNaturalW} × {imgNaturalH}px</span>
            </div>
            <div className="relative bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center" style={{ minHeight: 200 }}>
              {isRendering && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                  <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              )}
              <canvas ref={previewCanvasRef} className="max-w-full max-h-80 rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
