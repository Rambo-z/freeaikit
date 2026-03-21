"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

type Tab = "encode" | "decode" | "parse";

function safeEncode(str: string): { result: string; error: string } {
  try { return { result: encodeURIComponent(str), error: "" }; }
  catch { return { result: "", error: "Encoding failed." }; }
}

function safeDecode(str: string): { result: string; error: string } {
  try { return { result: decodeURIComponent(str), error: "" }; }
  catch { return { result: "", error: "Invalid percent-encoded string. Check for malformed sequences." }; }
}

function parseUrl(raw: string): { field: string; value: string }[] | null {
  let url: URL;
  try {
    url = new URL(raw.trim().startsWith("http") ? raw.trim() : `https://${raw.trim()}`);
  } catch {
    return null;
  }

  const rows: { field: string; value: string }[] = [
    { field: "Protocol", value: url.protocol },
    { field: "Host", value: url.hostname },
    { field: "Port", value: url.port || "(default)" },
    { field: "Path", value: url.pathname },
    { field: "Query String", value: url.search || "(none)" },
    { field: "Hash", value: url.hash || "(none)" },
  ];

  url.searchParams.forEach((value, key) => {
    rows.push({ field: `  param: ${key}`, value });
  });

  return rows;
}

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

export default function UrlEncoderClient() {
  const [tab, setTab] = useState<Tab>("encode");
  const [input, setInput] = useState("");

  const encoded = safeEncode(input);
  const decoded = safeDecode(input);
  const parsed = tab === "parse" ? parseUrl(input) : null;

  const TABS: { key: Tab; label: string }[] = [
    { key: "encode", label: "Encode" },
    { key: "decode", label: "Decode" },
    { key: "parse",  label: "Parse URL" },
  ];

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${tab === key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <label className="text-sm font-semibold text-gray-700 block">
          {tab === "encode" ? "Text to Encode" : tab === "decode" ? "URL-Encoded String to Decode" : "URL to Parse"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            tab === "encode" ? "Hello World! This is a test & example=true" :
            tab === "decode" ? "Hello%20World%21%20This%20is%20a%20test%20%26%20example%3Dtrue" :
            "https://example.com/search?q=hello+world&lang=en#results"
          }
          rows={4}
          spellCheck={false}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Output */}
      {tab === "encode" && input && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Encoded (encodeURIComponent)</h2>
            <CopyButton text={encoded.result} />
          </div>
          {encoded.error ? (
            <p className="text-sm text-red-500">{encoded.error}</p>
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-sm text-gray-700 break-all">{encoded.result}</div>
          )}
        </div>
      )}

      {tab === "decode" && input && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Decoded (decodeURIComponent)</h2>
            <CopyButton text={decoded.result} />
          </div>
          {decoded.error ? (
            <p className="text-sm text-red-500">{decoded.error}</p>
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-sm text-gray-700 break-all">{decoded.result}</div>
          )}
        </div>
      )}

      {tab === "parse" && input && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-700">Parsed URL</h2>
          {parsed === null ? (
            <p className="text-sm text-red-500">Could not parse URL. Make sure it includes a valid domain (e.g. https://example.com/path?q=1).</p>
          ) : (
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 overflow-hidden">
              {parsed.map(({ field, value }) => (
                <div key={field} className="grid grid-cols-[160px_1fr] text-sm">
                  <div className="px-4 py-2.5 bg-gray-50 font-medium text-gray-600 font-mono text-xs">{field}</div>
                  <div className="px-4 py-2.5 font-mono text-gray-800 text-xs break-all">{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
