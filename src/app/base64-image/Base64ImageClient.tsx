"use client";

import { useState, useCallback, useRef } from "react";
import { Copy, Check, Download, Upload, ImageIcon, RefreshCw } from "lucide-react";

type Tab = "encode" | "decode";

export default function Base64ImageClient() {
  const [tab, setTab] = useState<Tab>("encode");

  // Encode state
  const [encodeImageUrl, setEncodeImageUrl] = useState<string | null>(null);
  const [encodeBase64, setEncodeBase64] = useState("");
  const [encodeMime, setEncodeMime] = useState("image/png");
  const [isEncoding, setIsEncoding] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [encodeCopied, setEncodeCopied] = useState(false);

  // Decode state
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeImageUrl, setDecodeImageUrl] = useState<string | null>(null);
  const [decodeError, setDecodeError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Encode ---
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setIsEncoding(true);
    setEncodeMime(file.type || "image/png");
    if (encodeImageUrl) URL.revokeObjectURL(encodeImageUrl);
    const url = URL.createObjectURL(file);
    setEncodeImageUrl(url);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setEncodeBase64(result); // full data URL
      setIsEncoding(false);
    };
    reader.readAsDataURL(file);
  }, [encodeImageUrl]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const copyBase64 = useCallback(() => {
    navigator.clipboard.writeText(encodeBase64).then(() => {
      setEncodeCopied(true);
      setTimeout(() => setEncodeCopied(false), 1500);
    });
  }, [encodeBase64]);

  // base64-only (no data URL prefix)
  const rawBase64 = encodeBase64.includes(",") ? encodeBase64.split(",")[1] : encodeBase64;

  // --- Decode ---
  const handleDecode = useCallback(() => {
    setDecodeError("");
    let input = decodeInput.trim();
    if (!input) return;

    // Accept full data URL or raw base64
    let dataUrl: string;
    if (input.startsWith("data:")) {
      dataUrl = input;
    } else {
      // Guess mime type or default to png
      dataUrl = `data:image/png;base64,${input}`;
    }

    // Validate
    try {
      const img = new Image();
      img.onload = () => {
        if (decodeImageUrl) URL.revokeObjectURL(decodeImageUrl);
        setDecodeImageUrl(dataUrl);
      };
      img.onerror = () => {
        setDecodeError("Invalid base64 image data. Make sure you paste a valid base64 string or data URL.");
      };
      img.src = dataUrl;
    } catch {
      setDecodeError("Could not decode the base64 string.");
    }
  }, [decodeInput, decodeImageUrl]);

  const downloadDecoded = useCallback(() => {
    if (!decodeImageUrl) return;
    const a = document.createElement("a");
    a.href = decodeImageUrl;
    a.download = "decoded-image.png";
    a.click();
  }, [decodeImageUrl]);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        {(["encode", "decode"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold border transition-all capitalize ${
              tab === t ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}>
            {t === "encode" ? "Image → Base64" : "Base64 → Image"}
          </button>
        ))}
      </div>

      {tab === "encode" && (
        <div className="space-y-5">
          {/* Upload */}
          {!encodeImageUrl ? (
            <div
              onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-white ${
                isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragging ? "bg-blue-100" : "bg-blue-50"}`}>
                <ImageIcon className={`w-7 h-7 ${isDragging ? "text-blue-600" : "text-blue-500"}`} />
              </div>
              {isDragging ? (
                <p className="text-lg font-semibold text-blue-600">Drop image here</p>
              ) : (
                <>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mb-3">
                    Upload Image
                  </button>
                  <p className="text-sm text-gray-500 mb-1">or drop file here</p>
                </>
              )}
              <p className="text-xs text-gray-400">PNG, JPG, WebP, SVG — any image</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { handleFile(e.target.files[0]); e.target.value = ""; }}} className="hidden" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Preview */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">Image Preview</h3>
                  <button onClick={() => { setEncodeImageUrl(null); setEncodeBase64(""); }}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors">Change</button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={encodeImageUrl} alt="Preview" className="w-full max-h-48 object-contain rounded-xl bg-gray-50" />
                <div className="flex gap-2 text-xs text-gray-400 font-mono">
                  <span className="bg-gray-50 px-2 py-1 rounded">{encodeMime}</span>
                  {encodeBase64 && <span className="bg-gray-50 px-2 py-1 rounded">{(encodeBase64.length * 0.75 / 1024).toFixed(1)} KB raw</span>}
                </div>
              </div>

              {/* Base64 output */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">Base64 Output</h3>
                  {encodeBase64 && (
                    <button onClick={copyBase64}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                      {encodeCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {encodeCopied ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
                {isEncoding ? (
                  <div className="flex items-center gap-2 text-gray-400 py-4">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Encoding…</span>
                  </div>
                ) : (
                  <textarea readOnly value={encodeBase64} rows={8}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none resize-none bg-gray-50 text-gray-600 break-all" />
                )}
                {rawBase64 && (
                  <p className="text-xs text-gray-400">
                    Raw base64 length: <span className="font-mono font-medium">{rawBase64.length.toLocaleString()} chars</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "decode" && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste Base64 String or Data URL
              </label>
              <textarea
                value={decodeInput}
                onChange={(e) => { setDecodeInput(e.target.value); setDecodeError(""); setDecodeImageUrl(null); }}
                placeholder="data:image/png;base64,iVBORw0KGgo... or just the raw base64 string"
                rows={6}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            {decodeError && (
              <p className="text-sm text-red-500">{decodeError}</p>
            )}
            <button onClick={handleDecode} disabled={!decodeInput.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
              <Upload className="w-4 h-4" />Decode Image
            </button>
          </div>

          {decodeImageUrl && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">Decoded Image</h3>
                <button onClick={downloadDecoded}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                  <Download className="w-3.5 h-3.5" />Download PNG
                </button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={decodeImageUrl} alt="Decoded" className="max-w-full max-h-80 object-contain rounded-xl bg-gray-50 mx-auto block" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
