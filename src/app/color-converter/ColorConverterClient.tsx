"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

// ─── Conversion Functions ─────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToCmyk(
  r: number,
  g: number,
  b: number
): [number, number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return [0, 0, 0, 100];
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return [
    Math.round(c * 100),
    Math.round(m * 100),
    Math.round(y * 100),
    Math.round(k * 100),
  ];
}

function isValidHex(hex: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
}

function parseRgbInput(input: string): [number, number, number] | null {
  const m = input.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/
  );
  if (!m) {
    // Try bare "37 99 235" or "37,99,235"
    const parts = input.split(/[\s,]+/).map(Number);
    if (
      parts.length >= 3 &&
      parts.slice(0, 3).every((n) => !isNaN(n) && n >= 0 && n <= 255)
    ) {
      return [parts[0], parts[1], parts[2]];
    }
    return null;
  }
  const [, r, g, b] = m;
  return [Number(r), Number(g), Number(b)];
}

function parseHslInput(input: string): [number, number, number] | null {
  const m = input.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function parseCmykInput(
  input: string
): [number, number, number, number] | null {
  const m = input.match(
    /cmyk\(\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i
  );
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])];
}

function cmykToRgb(
  c: number,
  m: number,
  y: number,
  k: number
): [number, number, number] {
  c /= 100; m /= 100; y /= 100; k /= 100;
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return [r, g, b];
}

// Named CSS colors (common subset)
const CSS_NAMED_COLORS: Record<string, string> = {
  "#ff0000": "red", "#00ff00": "lime", "#0000ff": "blue",
  "#ffffff": "white", "#000000": "black", "#ffff00": "yellow",
  "#00ffff": "cyan", "#ff00ff": "magenta", "#808080": "gray",
  "#c0c0c0": "silver", "#800000": "maroon", "#808000": "olive",
  "#008000": "green", "#800080": "purple", "#008080": "teal",
  "#000080": "navy", "#ff6347": "tomato", "#ff7f50": "coral",
  "#ffd700": "gold", "#f0e68c": "khaki", "#add8e6": "lightblue",
  "#90ee90": "lightgreen", "#ffb6c1": "lightpink", "#20b2aa": "lightseagreen",
  "#87cefa": "lightskyblue", "#778899": "lightslategray",
  "#00ced1": "darkturquoise", "#ff8c00": "darkorange",
  "#8b0000": "darkred", "#006400": "darkgreen", "#00008b": "darkblue",
  "#ff69b4": "hotpink", "#cd853f": "peru", "#dda0dd": "plum",
  "#b0e0e6": "powderblue", "#bc8f8f": "rosybrown", "#4169e1": "royalblue",
  "#fa8072": "salmon", "#f4a460": "sandybrown", "#2e8b57": "seagreen",
  "#a0522d": "sienna", "#87ceeb": "skyblue", "#6a5acd": "slateblue",
  "#708090": "slategray", "#d2b48c": "tan", "#40e0d0": "turquoise",
  "#ee82ee": "violet", "#9acd32": "yellowgreen",
};

function getNamedColor(hex: string): string | null {
  return CSS_NAMED_COLORS[hex.toLowerCase()] ?? null;
}

// Generate shades
function generateShades(hex: string): string[] {
  const [r, g, b] = hexToRgb(hex);
  const [h, s] = rgbToHsl(r, g, b);
  // 5 lightness stops: 80, 65, 50, 35, 20
  return [80, 65, 50, 35, 20].map((l) => {
    const [nr, ng, nb] = hslToRgb(h, s, l);
    return rgbToHex(nr, ng, nb);
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

const DEFAULT_HEX = "#2563eb";
const MAX_RECENT = 5;

interface CopyState {
  hex: boolean;
  rgb: boolean;
  hsl: boolean;
  cmyk: boolean;
}

export default function ColorConverterClient() {
  const [hex, setHex] = useState(DEFAULT_HEX);
  const [hexInput, setHexInput] = useState(DEFAULT_HEX);
  const [rgbInput, setRgbInput] = useState("");
  const [hslInput, setHslInput] = useState("");
  const [cmykInput, setCmykInput] = useState("");
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [copied, setCopied] = useState<CopyState>({
    hex: false,
    rgb: false,
    hsl: false,
    cmyk: false,
  });

  // Derived values
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);
  const namedColor = getNamedColor(hex);
  const shades = generateShades(hex);

  const rgbStr = `rgb(${r}, ${g}, ${b})`;
  const hslStr = `hsl(${h}, ${s}%, ${l}%)`;
  const cmykStr = `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;

  // Sync derived string displays whenever hex changes
  useEffect(() => {
    setHexInput(hex);
    setRgbInput(rgbStr);
    setHslInput(hslStr);
    setCmykInput(cmykStr);
  }, [hex, rgbStr, hslStr, cmykStr]);

  const pushRecent = useCallback((color: string) => {
    trackToolEvent('color-converter', 'process');
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c !== color);
      return [color, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const applyHex = useCallback(
    (newHex: string) => {
      setHex(newHex);
      pushRecent(newHex);
    },
    [pushRecent]
  );

  // ── Input handlers ─────────────────────────────────────────────────────────
  const handleHexInputChange = (val: string) => {
    setHexInput(val);
    const normalized = val.startsWith("#") ? val : `#${val}`;
    if (isValidHex(normalized)) applyHex(normalized);
  };

  const handleRgbInputChange = (val: string) => {
    setRgbInput(val);
    const parsed = parseRgbInput(val);
    if (parsed) applyHex(rgbToHex(...parsed));
  };

  const handleHslInputChange = (val: string) => {
    setHslInput(val);
    const parsed = parseHslInput(val);
    if (parsed) {
      const [nr, ng, nb] = hslToRgb(...parsed);
      applyHex(rgbToHex(nr, ng, nb));
    }
  };

  const handleCmykInputChange = (val: string) => {
    setCmykInput(val);
    const parsed = parseCmykInput(val);
    if (parsed) {
      const [nr, ng, nb] = cmykToRgb(...parsed);
      applyHex(rgbToHex(nr, ng, nb));
    }
  };

  // ── Copy helper ────────────────────────────────────────────────────────────
  const copyValue = async (key: keyof CopyState, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
  };

  // ── Luminance for swatch text colour ──────────────────────────────────────
  const isLight = (hexColor: string) => {
    const [rr, gg, bb] = hexToRgb(hexColor);
    return 0.299 * rr + 0.587 * gg + 0.114 * bb > 128;
  };

  const formatRows: {
    key: keyof CopyState;
    label: string;
    value: string;
    input: string;
    onChange: (v: string) => void;
  }[] = [
    {
      key: "hex",
      label: "HEX",
      value: hex,
      input: hexInput,
      onChange: handleHexInputChange,
    },
    {
      key: "rgb",
      label: "RGB",
      value: rgbStr,
      input: rgbInput,
      onChange: handleRgbInputChange,
    },
    {
      key: "hsl",
      label: "HSL",
      value: hslStr,
      input: hslInput,
      onChange: handleHslInputChange,
    },
    {
      key: "cmyk",
      label: "CMYK",
      value: cmykStr,
      input: cmykInput,
      onChange: handleCmykInputChange,
    },
  ];

  return (
    <div className="space-y-6">
        {/* ── Color Picker + Swatch ── */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Large swatch */}
          <div
            className="h-40 w-full transition-colors duration-150 flex items-center justify-center relative"
            style={{ backgroundColor: hex }}
          >
            <span
              className={`text-2xl font-bold font-mono tracking-wider ${
                isLight(hex) ? "text-black/40" : "text-white/60"
              }`}
            >
              {hex.toUpperCase()}
            </span>
            {namedColor && (
              <span
                className={`absolute bottom-3 right-4 text-xs font-medium px-2 py-1 rounded-full ${
                  isLight(hex)
                    ? "bg-black/10 text-black/60"
                    : "bg-white/20 text-white/80"
                }`}
              >
                {namedColor}
              </span>
            )}
          </div>

          {/* Color picker */}
          <div className="p-4 flex items-center gap-4 border-t border-gray-100">
            <label className="cursor-pointer flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-xl border-2 border-gray-200 overflow-hidden relative"
                style={{ backgroundColor: hex }}
              >
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => applyHex(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                Click to pick color
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={360}
              value={h}
              onChange={(e) => {
                const [nr, ng, nb] = hslToRgb(Number(e.target.value), s, l);
                applyHex(rgbToHex(nr, ng, nb));
              }}
              className="flex-1 accent-blue-600"
            />
          </div>
        </div>

        {/* ── Format Rows ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {formatRows.map(({ key, label, value, input, onChange }) => (
            <div key={key} className="flex items-center gap-3 px-4 py-3">
              <span className="w-12 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {label}
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => {
                  // Reset to current if input is invalid
                  if (key === "hex") setHexInput(hex);
                  else if (key === "rgb") setRgbInput(rgbStr);
                  else if (key === "hsl") setHslInput(hslStr);
                  else setCmykInput(cmykStr);
                }}
                className="flex-1 font-mono text-sm text-gray-800 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                spellCheck={false}
              />
              <button
                onClick={() => copyValue(key, value)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  copied[key]
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {copied[key] ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied[key] ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </div>

        {/* ── Color Shades ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Color Shades
          </h2>
          <div className="flex gap-2">
            {shades.map((shade, i) => (
              <button
                key={i}
                onClick={() => applyHex(shade)}
                className="flex-1 group relative"
                title={shade}
              >
                <div
                  className="h-14 rounded-xl transition-transform hover:scale-105 hover:shadow-md border border-black/10"
                  style={{ backgroundColor: shade }}
                />
                <span
                  className={`mt-1 block text-center text-[10px] font-mono transition-colors ${
                    shade === hex
                      ? "text-blue-600 font-bold"
                      : "text-gray-500 group-hover:text-gray-800"
                  }`}
                >
                  {shade.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Recent Colors ── */}
        {recentColors.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Recent Colors
            </h2>
            <div className="flex gap-2 flex-wrap">
              {recentColors.map((color) => (
                <button
                  key={color}
                  onClick={() => applyHex(color)}
                  title={color}
                  className="group flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 hover:shadow-md ${
                      color === hex
                        ? "border-blue-500 scale-110 shadow-md"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] font-mono text-gray-400 group-hover:text-gray-700">
                    {color.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Color Details ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Color Details
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: "Red", value: r, max: 255 },
              { label: "Green", value: g, max: 255 },
              { label: "Blue", value: b, max: 255 },
              { label: "Hue", value: h, max: 360, unit: "°" },
            ].map(({ label, value, max, unit }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <div className="text-2xl font-bold text-gray-900 font-mono">
                  {value}
                  {unit ?? ""}
                </div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${(value / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {namedColor && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-2">
              <span className="font-medium text-gray-400">Named CSS color:</span>
              <code className="text-blue-600 font-mono font-semibold">
                {namedColor}
              </code>
            </div>
          )}
        </div>
    </div>
  );
}
