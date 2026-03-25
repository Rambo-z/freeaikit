"use client";

import { useState, useMemo, useCallback } from "react";
import { Copy, Check, AlertCircle, Clock, Shield, User } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

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

function base64UrlDecode(str: string): string {
  // Replace URL-safe chars and add padding
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) base64 += "=".repeat(4 - pad);
  return atob(base64);
}

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodeJwt(token: string): DecodedJwt {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 parts separated by dots");

  const header = JSON.parse(base64UrlDecode(parts[0]));
  const payload = JSON.parse(base64UrlDecode(parts[1]));
  const signature = parts[2];

  return { header, payload, signature };
}

function formatTimestamp(ts: number): string {
  try {
    // JWT timestamps are in seconds
    const d = new Date(ts * 1000);
    return d.toLocaleString() + " (UTC: " + d.toISOString() + ")";
  } catch {
    return String(ts);
  }
}

const TIME_CLAIMS = new Set(["exp", "iat", "nbf", "auth_time"]);

const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjIsInJvbGUiOiJhZG1pbiJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoderClient() {
  const [input, setInput] = useState("");

  const token = input.trim();

  const decoded = useMemo(() => {
    if (!token) return null;
    try {
      return { data: decodeJwt(token), error: "" };
    } catch (e: unknown) {
      return { data: null, error: e instanceof Error ? e.message : "Invalid JWT" };
    }
  }, [token]);

  const isExpired = useMemo(() => {
    if (!decoded?.data) return false;
    const exp = decoded.data.payload.exp;
    if (typeof exp === "number") return exp * 1000 < Date.now();
    return false;
  }, [decoded]);

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">Paste JWT Token</label>
          <button onClick={() => setInput(SAMPLE_JWT)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Load Example
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi..."
          rows={4}
          spellCheck={false}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none break-all"
        />
      </div>

      {/* Error */}
      {decoded?.error && (
        <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600">{decoded.error}</p>
        </div>
      )}

      {/* Decoded output */}
      {decoded?.data && (
        <div className="space-y-5">
          {/* Status badges */}
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              Algorithm: {String(decoded.data.header.alg || "unknown")}
            </div>
            {decoded.data.payload.sub != null && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                <User className="w-3.5 h-3.5" />
                Subject: {String(decoded.data.payload.sub)}
              </div>
            )}
            {decoded.data.payload.exp != null && (
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${isExpired ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                <Clock className="w-3.5 h-3.5" />
                {isExpired ? "Expired" : "Valid (not expired)"}
              </div>
            )}
          </div>

          {/* Header */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-red-600">Header</h2>
              <CopyButton text={JSON.stringify(decoded.data.header, null, 2)} />
            </div>
            <pre className="px-4 py-3 bg-red-50 rounded-xl font-mono text-sm text-gray-700 overflow-auto">
              {JSON.stringify(decoded.data.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-blue-600">Payload</h2>
              <CopyButton text={JSON.stringify(decoded.data.payload, null, 2)} />
            </div>
            <pre className="px-4 py-3 bg-blue-50 rounded-xl font-mono text-sm text-gray-700 overflow-auto">
              {JSON.stringify(decoded.data.payload, null, 2)}
            </pre>

            {/* Claims table */}
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 overflow-hidden">
              {Object.entries(decoded.data.payload).map(([key, value]) => (
                <div key={key} className="grid grid-cols-[140px_1fr] text-sm">
                  <div className="px-4 py-2.5 bg-gray-50 font-medium text-gray-600 font-mono text-xs">{key}</div>
                  <div className="px-4 py-2.5 font-mono text-gray-800 text-xs break-all">
                    {TIME_CLAIMS.has(key) && typeof value === "number" ? (
                      <span>{formatTimestamp(value)} <span className="text-gray-400">({value})</span></span>
                    ) : (
                      String(value)
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signature */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-emerald-600">Signature</h2>
            <div className="px-4 py-3 bg-emerald-50 rounded-xl font-mono text-sm text-gray-700 break-all">
              {decoded.data.signature}
            </div>
            <p className="text-xs text-gray-400">
              Signature verification requires the secret/public key and is not performed client-side.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
