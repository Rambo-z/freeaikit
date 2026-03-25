"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Download, Trash2, Minimize2, AlignLeft } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
    .replace(/\s+/g, " ")             // collapse whitespace
    .replace(/\s*\{\s*/g, "{")
    .replace(/\s*\}\s*/g, "}")
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*,\s*/g, ",")
    .replace(/;}/g, "}")              // remove last semicolon before }
    .trim();
}

function beautifyCSS(css: string): string {
  const min = minifyCSS(css);
  let result = "";
  let level = 0;
  const pad = "  ";

  for (let i = 0; i < min.length; i++) {
    const ch = min[i];
    if (ch === "{") {
      result += " {\n" + pad.repeat(level + 1);
      level++;
    } else if (ch === "}") {
      level = Math.max(0, level - 1);
      result = result.replace(/[ \t]+$/, "");
      result += "\n" + pad.repeat(level) + "}\n\n";
    } else if (ch === ";") {
      result += ";\n" + pad.repeat(level);
    } else {
      result += ch;
    }
  }

  return result.trim();
}

export default function CssMinifierClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "beautify" | "">("");
  const [copied, setCopied] = useState(false);

  const process = useCallback((raw: string, m: "minify" | "beautify") => {
    if (!raw.trim()) return;
    setOutput(m === "minify" ? minifyCSS(raw) : beautifyCSS(raw));
    setMode(m);
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [output]);

  const download = useCallback(() => {
    const blob = new Blob([output], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "minify" ? "styles.min.css" : "styles.css";
    a.click();
    URL.revokeObjectURL(url);
  }, [output, mode]);

  const inputBytes = new Blob([input]).size;
  const outputBytes = new Blob([output]).size;
  const savings = inputBytes > 0 && outputBytes < inputBytes
    ? Math.round((1 - outputBytes / inputBytes) * 100)
    : 0;

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-sm font-semibold text-gray-700">CSS Input</h2>
          {input && (
            <button
              onClick={() => { setInput(""); setOutput(""); setMode(""); }}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-red-500 border border-gray-200 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`.container {\n  display: flex;\n  /* center all children */\n  align-items: center;\n  justify-content: center;\n}`}
          rows={12}
          spellCheck={false}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />

        {inputBytes > 0 && (
          <p className="text-xs text-gray-400 font-mono">
            Input size: {inputBytes} bytes ({(inputBytes / 1024).toFixed(2)} KB)
          </p>
        )}

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => process(input, "minify")}
            disabled={!input.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm shadow-blue-500/20"
          >
            <Minimize2 className="w-4 h-4" />
            Minify CSS
          </button>
          <button
            onClick={() => process(input, "beautify")}
            disabled={!input.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-900 disabled:opacity-50 transition-colors shadow-sm"
          >
            <AlignLeft className="w-4 h-4" />
            Beautify CSS
          </button>
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-sm font-semibold text-gray-700">
                {mode === "minify" ? "Minified CSS" : "Beautified CSS"}
              </h2>
              {mode === "minify" && inputBytes > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-500">
                    {inputBytes} B
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-green-100 px-2 py-0.5 rounded font-mono text-green-700">
                    {outputBytes} B
                  </span>
                  {savings > 0 && (
                    <span className="bg-green-500 text-white px-2 py-0.5 rounded font-bold text-[11px]">
                      -{savings}%
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={download}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none resize-y"
          />
        </div>
      )}
    </div>
  );
}
