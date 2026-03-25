"use client";

import { useState, useCallback } from "react";
import { Copy, Check, AlertCircle, CheckCircle2 } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

type Tab = "format" | "yaml2json" | "json2yaml";

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

// Lazy-load js-yaml
let yamlLib: typeof import("js-yaml") | null = null;
async function getYaml() {
  if (!yamlLib) yamlLib = await import("js-yaml");
  return yamlLib;
}

export default function YamlFormatterClient() {
  const [tab, setTab] = useState<Tab>("format");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const handleFormat = useCallback(async () => {
    trackToolEvent('yaml-formatter', 'process');
    if (!input.trim()) return;
    setError("");
    setOutput("");
    try {
      const yaml = await getYaml();
      const parsed = yaml.load(input);
      setOutput(yaml.dump(parsed, { indent, lineWidth: -1, noRefs: true }));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid YAML");
    }
  }, [input, indent]);

  const handleYamlToJson = useCallback(async () => {
    if (!input.trim()) return;
    setError("");
    setOutput("");
    try {
      const yaml = await getYaml();
      const parsed = yaml.load(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid YAML");
    }
  }, [input, indent]);

  const handleJsonToYaml = useCallback(async () => {
    if (!input.trim()) return;
    setError("");
    setOutput("");
    try {
      const yaml = await getYaml();
      const parsed = JSON.parse(input);
      setOutput(yaml.dump(parsed, { indent, lineWidth: -1, noRefs: true }));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [input, indent]);

  const handleAction = useCallback(() => {
    if (tab === "format") handleFormat();
    else if (tab === "yaml2json") handleYamlToJson();
    else handleJsonToYaml();
  }, [tab, handleFormat, handleYamlToJson, handleJsonToYaml]);

  const TABS: { key: Tab; label: string }[] = [
    { key: "format", label: "Format YAML" },
    { key: "yaml2json", label: "YAML → JSON" },
    { key: "json2yaml", label: "JSON → YAML" },
  ];

  const placeholder = tab === "json2yaml"
    ? '{\n  "name": "example",\n  "version": "1.0",\n  "dependencies": {\n    "react": "^19.0.0"\n  }\n}'
    : 'name: example\nversion: "1.0"\ndependencies:\n  react: "^19.0.0"\nscripts:\n  - build\n  - test\n  - deploy';

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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              {tab === "json2yaml" ? "JSON Input" : "YAML Input"}
            </label>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">Indent:</label>
              <select value={indent} onChange={(e) => setIndent(Number(e.target.value))}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
              </select>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={16}
            spellCheck={false}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button onClick={handleAction} disabled={!input.trim()}
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors">
            {tab === "format" ? "Format & Validate" : tab === "yaml2json" ? "Convert to JSON" : "Convert to YAML"}
          </button>
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              {tab === "yaml2json" ? "JSON Output" : "YAML Output"}
            </label>
            {output && <CopyButton text={output} />}
          </div>

          {error && (
            <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600 font-mono break-all">{error}</p>
            </div>
          )}

          {output && !error && (
            <>
              <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valid {tab === "yaml2json" ? "JSON" : "YAML"}
              </div>
              <pre className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-sm text-gray-700 overflow-auto max-h-[400px] whitespace-pre">{output}</pre>
            </>
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
