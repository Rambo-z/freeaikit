"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, Check, RefreshCw, Eye, EyeOff } from "lucide-react";

const UPPER   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER   = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?";
const AMBIGUOUS = /[0Ol1I]/g;

type Options = {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  noAmbiguous: boolean;
};

function generatePassword(opts: Options): string {
  let chars = "";
  if (opts.upper)   chars += UPPER;
  if (opts.lower)   chars += LOWER;
  if (opts.numbers) chars += NUMBERS;
  if (opts.symbols) chars += SYMBOLS;
  if (opts.noAmbiguous) chars = chars.replace(AMBIGUOUS, "");
  if (!chars) return "";

  const arr = new Uint32Array(opts.length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => chars[n % chars.length]).join("");
}

function getStrength(pw: string): { label: string; color: string; width: string } {
  if (!pw) return { label: "", color: "bg-gray-200", width: "0%" };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 2) return { label: "Weak",   color: "bg-red-500",    width: "25%" };
  if (score <= 3) return { label: "Fair",   color: "bg-yellow-400", width: "50%" };
  if (score <= 5) return { label: "Good",   color: "bg-blue-500",   width: "75%" };
  return              { label: "Strong", color: "bg-green-500",  width: "100%" };
}

export default function PasswordGeneratorClient() {
  const [opts, setOpts] = useState<Options>({
    length: 20, upper: true, lower: true, numbers: true, symbols: true, noAmbiguous: false,
  });
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [showPasswords, setShowPasswords] = useState(true);

  const generate = useCallback((count = 5) => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) list.push(generatePassword(opts));
    setPasswords(list);
    setCopied(null);
  }, [opts]);

  useEffect(() => { generate(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const copy = useCallback((pw: string, i: number) => {
    navigator.clipboard.writeText(pw).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  const toggle = (key: keyof Options) => {
    setOpts((o) => {
      const next = { ...o, [key]: !o[key] };
      const anyChar = next.upper || next.lower || next.numbers || next.symbols;
      return anyChar ? next : o; // prevent all unchecked
    });
  };

  const hasValidChars = opts.upper || opts.lower || opts.numbers || opts.symbols;
  const strength = getStrength(passwords[0] ?? "");

  return (
    <div className="space-y-5">
      {/* Options */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">
        {/* Length */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">Password Length</label>
            <span className="text-sm font-bold font-mono text-indigo-600 w-8 text-center">{opts.length}</span>
          </div>
          <input
            type="range" min={6} max={64} step={1} value={opts.length}
            onChange={(e) => setOpts((o) => ({ ...o, length: Number(e.target.value) }))}
            className="w-full h-2 rounded-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>6</span><span>16</span><span>32</span><span>64</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {([
            { key: "upper",       label: "A–Z Uppercase" },
            { key: "lower",       label: "a–z Lowercase" },
            { key: "numbers",     label: "0–9 Numbers"   },
            { key: "symbols",     label: "!@# Symbols"   },
            { key: "noAmbiguous", label: "No ambiguous (0Ol1I)" },
          ] as { key: keyof Options; label: string }[]).map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={opts[key] as boolean}
                onChange={() => toggle(key)}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>

        {/* Generate button */}
        <button
          onClick={() => generate(5)}
          disabled={!hasValidChars}
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm shadow-indigo-500/20"
        >
          <RefreshCw className="w-4 h-4" />
          Generate Passwords
        </button>
      </div>

      {/* Results */}
      {passwords.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Generated Passwords</h2>
            <button onClick={() => setShowPasswords((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
              {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPasswords ? "Hide" : "Show"}
            </button>
          </div>

          {/* Strength bar for first password */}
          {passwords[0] && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Strength</span>
                <span className={`font-semibold ${strength.label === "Strong" ? "text-green-600" : strength.label === "Good" ? "text-blue-600" : strength.label === "Fair" ? "text-yellow-600" : "text-red-600"}`}>
                  {strength.label}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: strength.width }} />
              </div>
            </div>
          )}

          <div className="space-y-2">
            {passwords.map((pw, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 group">
                <span className="flex-1 font-mono text-sm text-gray-800 break-all select-all">
                  {showPasswords ? pw : "•".repeat(pw.length)}
                </span>
                <button
                  onClick={() => copy(pw, i)}
                  className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100"
                >
                  {copied === i ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === i ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
