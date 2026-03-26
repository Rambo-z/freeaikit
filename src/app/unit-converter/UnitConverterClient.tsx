"use client";

import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "volume" | "area" | "speed" | "data";

interface UnitDef {
  name: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "length", label: "Length" },
  { key: "weight", label: "Weight" },
  { key: "temperature", label: "Temperature" },
  { key: "volume", label: "Volume" },
  { key: "area", label: "Area" },
  { key: "speed", label: "Speed" },
  { key: "data", label: "Data" },
];

const linear = (factor: number): UnitDef["toBase"] => (v) => v * factor;
const linearInv = (factor: number): UnitDef["fromBase"] => (v) => v / factor;
const unit = (name: string, symbol: string, factor: number): UnitDef => ({
  name, symbol, toBase: linear(factor), fromBase: linearInv(factor),
});

const UNITS: Record<Category, UnitDef[]> = {
  length: [
    unit("Meter", "m", 1),
    unit("Kilometer", "km", 1000),
    unit("Centimeter", "cm", 0.01),
    unit("Millimeter", "mm", 0.001),
    unit("Mile", "mi", 1609.344),
    unit("Yard", "yd", 0.9144),
    unit("Foot", "ft", 0.3048),
    unit("Inch", "in", 0.0254),
  ],
  weight: [
    unit("Kilogram", "kg", 1),
    unit("Gram", "g", 0.001),
    unit("Milligram", "mg", 0.000001),
    unit("Pound", "lb", 0.453592),
    unit("Ounce", "oz", 0.0283495),
    unit("Metric Ton", "t", 1000),
    unit("Stone", "st", 6.35029),
  ],
  temperature: [
    {
      name: "Celsius", symbol: "\u00B0C",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    {
      name: "Fahrenheit", symbol: "\u00B0F",
      toBase: (v) => (v - 32) * 5 / 9,
      fromBase: (v) => v * 9 / 5 + 32,
    },
    {
      name: "Kelvin", symbol: "K",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  ],
  volume: [
    unit("Liter", "L", 1),
    unit("Milliliter", "mL", 0.001),
    unit("Gallon (US)", "gal", 3.78541),
    unit("Quart (US)", "qt", 0.946353),
    unit("Pint (US)", "pt", 0.473176),
    unit("Cup (US)", "cup", 0.236588),
    unit("Fluid Oz (US)", "fl oz", 0.0295735),
    unit("Cubic Meter", "m\u00B3", 1000),
  ],
  area: [
    unit("Square Meter", "m\u00B2", 1),
    unit("Square Kilometer", "km\u00B2", 1000000),
    unit("Hectare", "ha", 10000),
    unit("Acre", "ac", 4046.86),
    unit("Square Foot", "ft\u00B2", 0.092903),
    unit("Square Inch", "in\u00B2", 0.00064516),
    unit("Square Mile", "mi\u00B2", 2589988),
    unit("Square Yard", "yd\u00B2", 0.836127),
  ],
  speed: [
    unit("Meter/Second", "m/s", 1),
    unit("Kilometer/Hour", "km/h", 0.277778),
    unit("Mile/Hour", "mph", 0.44704),
    unit("Knot", "kn", 0.514444),
    unit("Foot/Second", "ft/s", 0.3048),
  ],
  data: [
    unit("Byte", "B", 1),
    unit("Kilobyte", "KB", 1024),
    unit("Megabyte", "MB", 1048576),
    unit("Gigabyte", "GB", 1073741824),
    unit("Terabyte", "TB", 1099511627776),
    unit("Bit", "bit", 0.125),
    unit("Kilobit", "Kbit", 128),
    unit("Megabit", "Mbit", 131072),
  ],
};

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) < 0.000001 && n !== 0) return n.toExponential(4);
  if (Math.abs(n) >= 1e12) return n.toExponential(4);
  return parseFloat(n.toPrecision(10)).toLocaleString(undefined, { maximumFractionDigits: 8 });
}

export default function UnitConverterClient() {
  const [category, setCategory] = useState<Category>("length");
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState("1");
  const [copied, setCopied] = useState(false);

  const units = UNITS[category];
  const fromUnit = units[fromIdx] || units[0];
  const toUnit = units[toIdx] || units[1];

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return "";
    const base = fromUnit.toBase(v);
    return fmt(toUnit.fromBase(base));
  }, [value, fromUnit, toUnit]);

  // Convert to all units
  const allResults = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return [];
    const base = fromUnit.toBase(v);
    return units.map((u) => ({ name: u.name, symbol: u.symbol, value: fmt(u.fromBase(base)) }));
  }, [value, fromUnit, units]);

  const copy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const swap = () => {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
  };

  return (
    <div className="space-y-5">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => { setCategory(c.key); setFromIdx(0); setToIdx(1); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              category === c.key
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-blue-400"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Converter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          {/* From */}
          <div className="space-y-1 flex-1 min-w-[140px]">
            <label className="text-sm font-semibold text-gray-700">From</label>
            <select
              value={fromIdx}
              onChange={(e) => setFromIdx(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {units.map((u, i) => (
                <option key={i} value={i}>{u.name} ({u.symbol})</option>
              ))}
            </select>
          </div>
          {/* Input */}
          <div className="space-y-1 flex-1 min-w-[120px]">
            <label className="text-sm font-semibold text-gray-700">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Swap */}
          <button
            onClick={swap}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all"
            title="Swap units"
          >
            ⇄
          </button>
          {/* To */}
          <div className="space-y-1 flex-1 min-w-[140px]">
            <label className="text-sm font-semibold text-gray-700">To</label>
            <select
              value={toIdx}
              onChange={(e) => setToIdx(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {units.map((u, i) => (
                <option key={i} value={i}>{u.name} ({u.symbol})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="flex items-center gap-3">
            <div className="flex-1 px-4 py-3 bg-blue-50 rounded-xl text-center text-lg font-bold text-blue-700">
              {value} {fromUnit.symbol} = {result} {toUnit.symbol}
            </div>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>

      {/* All conversions */}
      {allResults.length > 0 && value && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">All {CATEGORIES.find((c) => c.key === category)?.label} Conversions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allResults.map((r) => (
              <div key={r.name} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{r.name}</span>
                <span className="text-sm font-mono font-semibold text-gray-800">{r.value} {r.symbol}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
