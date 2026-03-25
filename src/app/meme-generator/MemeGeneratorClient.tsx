"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, Download } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

export default function MemeGeneratorClient() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState("Impact");
  const [textColor, setTextColor] = useState("#ffffff");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = url;
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d")!;

    canvas.width = image.width;
    canvas.height = image.height;

    // Draw image
    ctx.drawImage(image, 0, 0);

    // Scale font to image size
    const scale = image.width / 600;
    const fs = Math.round(fontSize * scale);

    ctx.font = `bold ${fs}px ${fontFamily}, Arial, sans-serif`;
    ctx.fillStyle = textColor;
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = Math.max(2, fs / 12);
    ctx.lineJoin = "round";
    ctx.textAlign = "center";

    const maxWidth = image.width * 0.9;
    const padding = fs * 0.6;

    // Helper: draw text with word wrap
    const drawText = (text: string, startY: number, direction: 1 | -1) => {
      if (!text) return;
      const words = text.toUpperCase().split(" ");
      const lines: string[] = [];
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      // If direction is -1 (bottom), reverse lines to draw from bottom up
      const orderedLines = direction === -1 ? [...lines].reverse() : lines;

      orderedLines.forEach((line, i) => {
        const y = startY + direction * i * (fs * 1.1);
        ctx.strokeText(line, image.width / 2, y);
        ctx.fillText(line, image.width / 2, y);
      });
    };

    // Top text
    ctx.textBaseline = "top";
    drawText(topText, padding, 1);

    // Bottom text
    ctx.textBaseline = "bottom";
    drawText(bottomText, image.height - padding, -1);
  }, [image, topText, bottomText, fontSize, fontFamily, textColor, outlineColor]);

  useEffect(() => {
    drawMeme();
  }, [drawMeme]);

  const handleDownload = useCallback(() => {
    trackToolEvent('meme-generator', 'download');
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "meme.png";
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
          <p className="text-gray-400 text-xs mt-1">Upload any image to start creating your meme</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}

      {/* Editor */}
      {image && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
          {/* Canvas */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex justify-center">
                <canvas ref={canvasRef}
                  className="max-w-full max-h-[500px] rounded-xl border border-gray-100"
                  style={{ objectFit: "contain" }} />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" /> Download Meme
              </button>
              <button onClick={() => { setImage(null); setTopText(""); setBottomText(""); }}
                className="px-4 py-2.5 text-sm text-gray-500 hover:text-red-500 rounded-xl border border-gray-200 hover:border-red-200 transition-colors">
                Change Image
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 h-fit">
            <h2 className="text-sm font-semibold text-gray-700">Meme Text</h2>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Top Text</label>
              <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)}
                placeholder="TOP TEXT"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Bottom Text</label>
              <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)}
                placeholder="BOTTOM TEXT"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Font Size: {fontSize}px</label>
              <input type="range" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
                min={20} max={80} className="w-full" />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Font</label>
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Impact">Impact (Classic)</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Comic Sans MS">Comic Sans</option>
                <option value="Arial">Arial</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Text Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer" />
                  <span className="text-xs text-gray-500 font-mono">{textColor}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Outline</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={outlineColor} onChange={(e) => setOutlineColor(e.target.value)}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer" />
                  <span className="text-xs text-gray-500 font-mono">{outlineColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
