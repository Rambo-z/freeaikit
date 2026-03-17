"use client";

import { useState, useCallback } from "react";
import { Copy, Check, AlertCircle, Download } from "lucide-react";

type Tab = "csv2json" | "json2csv";
type Delimiter = "," | ";" | "\t" | "|";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button onClick={handleCopy} disabled={!text}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ---- CSV Parser (RFC 4180 compliant) ---- */
function parseCsv(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        cell += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === delimiter) {
        row.push(cell);
        cell = "";
        i++;
      } else if (ch === "\r" && text[i + 1] === "\n") {
        row.push(cell);
        cell = "";
        rows.push(row);
        row = [];
        i += 2;
      } else if (ch === "\n") {
        row.push(cell);
        cell = "";
        rows.push(row);
        row = [];
        i++;
      } else {
        cell += ch;
        i++;
      }
    }
  }
  // Last cell/row
  row.push(cell);
  if (row.some((c) => c !== "")) rows.push(row);

  return rows;
}

function detectDelimiter(text: string): Delimiter {
  const firstLine = text.split(/\r?\n/)[0] || "";
  const counts: [Delimiter, number][] = [
    [",", (firstLine.match(/,/g) || []).length],
    [";", (firstLine.match(/;/g) || []).length],
    ["\t", (firstLine.match(/\t/g) || []).length],
    ["|", (firstLine.match(/\|/g) || []).length],
  ];
  counts.sort((a, b) => b[1] - a[1]);
  return counts[0][1] > 0 ? counts[0][0] : ",";
}

function csvToJson(text: string, delimiter: string): string {
  const rows = parseCsv(text, delimiter);
  if (rows.length < 2) return "[]";
  const headers = rows[0];
  const data = rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = (row[i] || "").trim();
    });
    return obj;
  });
  return JSON.stringify(data, null, 2);
}

function jsonToCsv(text: string, delimiter: string): string {
  const data = JSON.parse(text);
  if (!Array.isArray(data) || data.length === 0) throw new Error("Expected a JSON array of objects");
  const headers = Object.keys(data[0]);
  const escape = (val: string) => {
    const s = String(val ?? "");
    if (s.includes(delimiter) || s.includes('"') || s.includes("\n")) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  const lines = [headers.map(escape).join(delimiter)];
  for (const row of data) {
    lines.push(headers.map((h) => escape(row[h])).join(delimiter));
  }
  return lines.join("\n");
}

export default function CsvToJsonClient() {
  const [tab, setTab] = useState<Tab>("csv2json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter | "auto">("auto");

  const handleConvert = useCallback(() => {
    if (!input.trim()) return;
    setError("");
    setOutput("");
    try {
      if (tab === "csv2json") {
        const delim = delimiter === "auto" ? detectDelimiter(input) : delimiter;
        setOutput(csvToJson(input, delim));
      } else {
        const delim = delimiter === "auto" ? "," : delimiter;
        setOutput(jsonToCsv(input, delim));
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    }
  }, [input, tab, delimiter]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const ext = tab === "csv2json" ? "json" : "csv";
    const mime = tab === "csv2json" ? "application/json" : "text/csv";
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, tab]);

  const TABS: { key: Tab; label: string }[] = [
    { key: "csv2json", label: "CSV → JSON" },
    { key: "json2csv", label: "JSON → CSV" },
  ];

  const DELIMITERS: { value: Delimiter | "auto"; label: string }[] = [
    { value: "auto", label: "Auto-detect" },
    { value: ",", label: "Comma (,)" },
    { value: ";", label: "Semicolon (;)" },
    { value: "\t", label: "Tab" },
    { value: "|", label: "Pipe (|)" },
  ];

  const placeholder = tab === "csv2json"
    ? 'name,email,age\nAlice,alice@example.com,30\nBob,bob@example.com,25\n"Charlie, Jr.",charlie@example.com,35'
    : '[\n  { "name": "Alice", "email": "alice@example.com", "age": "30" },\n  { "name": "Bob", "email": "bob@example.com", "age": "25" }\n]';

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => { setTab(key); setOutput(""); setError(""); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${tab === key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
            {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs text-gray-500">Delimiter:</label>
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value as Delimiter | "auto")}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {DELIMITERS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <label className="text-sm font-semibold text-gray-700 block">
            {tab === "csv2json" ? "CSV Input" : "JSON Input"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={16}
            spellCheck={false}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button onClick={handleConvert} disabled={!input.trim()}
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors">
            Convert
          </button>
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              {tab === "csv2json" ? "JSON Output" : "CSV Output"}
            </label>
            <div className="flex gap-2">
              {output && (
                <button onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              )}
              {output && <CopyButton text={output} />}
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600 font-mono break-all">{error}</p>
            </div>
          )}

          {output && !error && (
            <pre className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-sm text-gray-700 overflow-auto max-h-[400px] whitespace-pre">{output}</pre>
          )}

          {!output && !error && (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              Output will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
