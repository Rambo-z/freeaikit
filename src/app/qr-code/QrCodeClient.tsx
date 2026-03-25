"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Download, RefreshCw } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

type ErrorLevel = "L" | "M" | "Q" | "H";
type Format = "png" | "svg";

const PRESETS = [
  { label: "URL", placeholder: "https://example.com" },
  { label: "Text", placeholder: "Enter any text…" },
  { label: "Email", placeholder: "mailto:hello@example.com" },
  { label: "Phone", placeholder: "tel:+1234567890" },
  { label: "WiFi", placeholder: "WIFI:T:WPA;S:NetworkName;P:password;;" },
];

export default function QrCodeClient() {
  const [text, setText] = useState("https://freeaikit.app");
  const [size, setSize] = useState(512);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("M");
  const [format, setFormat] = useState<Format>("png");
  const [margin, setMargin] = useState(4);
  const [activePreset, setActivePreset] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [svgString, setSvgString] = useState("");

  const generate = useCallback(async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    try {
      const QRCode = await import("qrcode");
      if (format === "png") {
        const canvas = canvasRef.current;
        if (!canvas) return;
        await QRCode.toCanvas(canvas, text, {
          width: size,
          margin,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
        });
        setSvgString("");
      } else {
        const svg = await QRCode.toString(text, {
          type: "svg",
          width: size,
          margin,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
        });
        setSvgString(svg);
      }
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  }, [text, size, fgColor, bgColor, errorLevel, format, margin]);

  // Auto-generate on any change
  useEffect(() => { generate(); }, [generate]);

  const download = useCallback(() => {
    if (format === "png") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "qrcode.png";
      a.click();
    } else {
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "qrcode.svg";
      a.click();
      URL.revokeObjectURL(a.href);
    }
  }, [format, svgString]);

  const hasOutput = format === "png" || (format === "svg" && svgString);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: settings */}
      <div className="space-y-5">
        {/* Preset tabs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button key={p.label} onClick={() => { setActivePreset(i); setText(""); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activePreset === i ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >{p.label}</button>
            ))}
          </div>
        </div>

        {/* Text input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={PRESETS[activePreset].placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size — {size}px</label>
          <input type="range" min={128} max={1024} step={64} value={size} onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-emerald-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>128px</span><span>1024px</span></div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foreground</label>
            <div className="flex items-center gap-2">
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
              <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
            <div className="flex items-center gap-2">
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
              <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono" />
            </div>
          </div>
        </div>

        {/* Error correction + margin */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Error Correction</label>
            <div className="flex gap-1.5">
              {(["L", "M", "Q", "H"] as ErrorLevel[]).map((l) => (
                <button key={l} onClick={() => setErrorLevel(l)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    errorLevel === l ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-500"
                  }`}
                >{l}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Zone — {margin}</label>
            <input type="range" min={0} max={10} value={margin} onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-emerald-600 mt-1" />
          </div>
        </div>

        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Download Format</label>
          <div className="flex gap-2">
            {(["png", "svg"] as Format[]).map((f) => (
              <button key={f} onClick={() => setFormat(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold border uppercase transition-all ${
                  format === f ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-500"
                }`}
              >{f}</button>
            ))}
          </div>
        </div>

        <button onClick={download} disabled={!hasOutput || isGenerating}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-sm"
        >
          {isGenerating
            ? <><RefreshCw className="w-4 h-4 animate-spin" />Generating…</>
            : <><Download className="w-4 h-4" />Download {format.toUpperCase()}</>}
        </button>
      </div>

      {/* Right: preview */}
      <div className="flex items-center justify-center bg-white rounded-2xl border border-gray-200 p-6 min-h-64">
        {format === "png" ? (
          <canvas ref={canvasRef} className="max-w-full max-h-80 rounded-lg" style={{ imageRendering: "pixelated" }} />
        ) : svgString ? (
          <div className="max-w-full max-h-80" dangerouslySetInnerHTML={{ __html: svgString }} />
        ) : (
          <p className="text-gray-400 text-sm">QR code preview will appear here</p>
        )}
      </div>
    </div>
  );
}
