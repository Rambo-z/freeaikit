"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

type CaseKey =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "screaming";

function toWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")       // split camelCase / PascalCase
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // split consecutive caps
    .replace(/[_\-\s]+/g, " ")                  // normalize separators
    .trim()
    .split(" ")
    .filter(Boolean);
}

function convertCase(text: string, key: CaseKey): string {
  if (!text) return "";
  const words = toWords(text);
  switch (key) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    case "sentence": {
      const lower = text.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    case "camel":
      return words
        .map((w, i) =>
          i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join("");
    case "pascal":
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
    case "snake":
      return words.map((w) => w.toLowerCase()).join("_");
    case "kebab":
      return words.map((w) => w.toLowerCase()).join("-");
    case "screaming":
      return words.map((w) => w.toUpperCase()).join("_");
  }
}

const CASES: { key: CaseKey; label: string; example: string }[] = [
  { key: "upper",     label: "UPPER CASE",          example: "HELLO WORLD" },
  { key: "lower",     label: "lower case",           example: "hello world" },
  { key: "title",     label: "Title Case",           example: "Hello World" },
  { key: "sentence",  label: "Sentence case",        example: "Hello world" },
  { key: "camel",     label: "camelCase",            example: "helloWorld" },
  { key: "pascal",    label: "PascalCase",           example: "HelloWorld" },
  { key: "snake",     label: "snake_case",           example: "hello_world" },
  { key: "kebab",     label: "kebab-case",           example: "hello-world" },
  { key: "screaming", label: "SCREAMING_SNAKE_CASE", example: "HELLO_WORLD" },
];

export default function TextCaseClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<CaseKey | null>(null);

  const copy = useCallback((key: CaseKey, value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">Input Text</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here…"
          rows={4}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        {input && (
          <p className="text-xs text-gray-400">
            {input.length} characters · {wordCount} word{wordCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Conversions grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CASES.map(({ key, label, example }) => {
          const value = convertCase(input, key);
          const isCopied = copied === key;
          return (
            <div
              key={key}
              className="bg-white rounded-xl border border-gray-200 p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {label}
                </span>
                <button
                  onClick={() => copy(key, value)}
                  disabled={!value}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 disabled:opacity-40 transition-all"
                >
                  {isCopied ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {isCopied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="min-h-[40px] px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono text-gray-700 break-all leading-relaxed">
                {value || (
                  <span className="text-gray-300 italic text-xs">{example}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
