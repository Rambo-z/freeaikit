"use client";

import { useState, useCallback, useRef } from "react";
import { Copy, Check, Pipette } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "").match(/.{2}/g);
  if (!m) return [0, 0, 0];
  return [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  if (r === 0 && g === 0 && b === 0) return [0, 0, 0, 100];
  const c1 = 1 - r / 255, m1 = 1 - g / 255, y1 = 1 - b / 255;
  const k = Math.min(c1, m1, y1);
  return [
    Math.round(((c1 - k) / (1 - k)) * 100),
    Math.round(((m1 - k) / (1 - k)) * 100),
    Math.round(((y1 - k) / (1 - k)) * 100),
    Math.round(k * 100),
  ];
}

function getContrastColor(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? "#000000" : "#ffffff";
}

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#000000", "#6b7280",
  "#ffffff", "#f5f5f4",
];

export default function ColorPickerClient() {
  const [color, setColor] = useState("#3b82f6");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);
  const contrast = getContrastColor(color);

  const copy = useCallback((text: string, field: string) => {
    trackToolEvent('color-picker', 'process');
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    });
  }, []);

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
    { label: "HSL", value: `hsl(${h}, ${s}%, ${l}%)` },
    { label: "CMYK", value: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` },
    { label: "CSS Variable", value: `--color: ${color};` },
  ];

  return (
    <div className="space-y-5">
      {/* Color picker */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl border-2 border-gray-200 cursor-pointer shadow-inner flex items-center justify-center"
            style={{ backgroundColor: color }}
            onClick={() => inputRef.current?.click()}
          >
            <Pipette className="w-6 h-6" style={{ color: contrast }} />
          </div>
          <input
            ref={inputRef}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="sr-only"
          />
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">HEX Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColor(v);
              }}
              onBlur={() => {
                if (!/^#[0-9a-fA-F]{6}$/.test(color)) setColor("#3b82f6");
              }}
              className="block w-32 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={7}
            />
          </div>
          {/* RGB sliders */}
          <div className="flex-1 min-w-[200px] space-y-2">
            {[
              { label: "R", val: r, color: "red" },
              { label: "G", val: g, color: "green" },
              { label: "B", val: b, color: "blue" },
            ].map((ch) => (
              <div key={ch.label} className="flex items-center gap-2">
                <span className="w-4 text-xs font-bold text-gray-500">{ch.label}</span>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={ch.val}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    const nr = ch.label === "R" ? v : r;
                    const ng = ch.label === "G" ? v : g;
                    const nb = ch.label === "B" ? v : b;
                    setColor(rgbToHex(nr, ng, nb));
                  }}
                  className="flex-1 h-2 rounded-full cursor-pointer accent-blue-600"
                />
                <span className="w-8 text-xs font-mono text-gray-500 text-right">{ch.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${color === c ? "border-blue-500 scale-110" : "border-gray-200 hover:border-gray-400"}`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>

      {/* Preview */}
      <div
        className="rounded-2xl p-8 text-center transition-colors"
        style={{ backgroundColor: color }}
      >
        <p className="text-2xl font-bold" style={{ color: contrast }}>
          {color.toUpperCase()}
        </p>
        <p className="text-sm mt-1" style={{ color: contrast, opacity: 0.7 }}>
          rgb({r}, {g}, {b}) · hsl({h}, {s}%, {l}%)
        </p>
      </div>

      {/* Format values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {formats.map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
              <div className="text-sm font-mono text-gray-800 mt-0.5">{value}</div>
            </div>
            <button
              onClick={() => copy(value, label)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
            >
              {copiedField === label ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copiedField === label ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
