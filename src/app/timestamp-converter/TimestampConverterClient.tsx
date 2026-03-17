"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, Clock, RefreshCw } from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────

function nowSec(): number {
  return Math.floor(Date.now() / 1000);
}

function detectAndNormalize(raw: string): { ms: number; unit: "s" | "ms" } | null {
  const n = Number(raw.trim());
  if (isNaN(n) || !isFinite(n)) return null;
  // 13-digit+ → milliseconds, otherwise seconds
  if (Math.abs(n) >= 1e12) {
    return { ms: n, unit: "ms" };
  }
  return { ms: n * 1000, unit: "s" };
}

function formatDate(d: Date, tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    }).format(d);
  } catch {
    return "—";
  }
}

function toISO(d: Date): string {
  return d.toISOString();
}

function toRFC2822(d: Date): string {
  return d.toUTCString();
}

function toLocalStr(d: Date): string {
  return d.toLocaleString();
}

// ── copy hook ─────────────────────────────────────────────────────────────────

function useCopy(timeout = 1400) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), timeout);
    });
  }, [timeout]);

  return { copiedKey, copy };
}

// ── component ─────────────────────────────────────────────────────────────────

export default function TimestampConverterClient() {
  const [nowTs, setNowTs] = useState(nowSec());

  // Section 1: ts → date
  const [tsInput, setTsInput] = useState(() => String(nowSec()));
  const [tsResult, setTsResult] = useState<{
    date: Date;
    unit: "s" | "ms";
  } | null>(null);
  const [tsError, setTsError] = useState<string | null>(null);

  // Section 2: date → ts
  const [dateInput, setDateInput] = useState(() => {
    const d = new Date();
    // local datetime-local input format
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  });

  const { copiedKey, copy } = useCopy();

  // live clock
  useEffect(() => {
    const id = setInterval(() => setNowTs(nowSec()), 1000);
    return () => clearInterval(id);
  }, []);

  // parse ts input
  useEffect(() => {
    if (!tsInput.trim()) {
      setTsResult(null);
      setTsError(null);
      return;
    }
    const parsed = detectAndNormalize(tsInput);
    if (!parsed) {
      setTsResult(null);
      setTsError("Invalid timestamp — enter a numeric Unix timestamp.");
      return;
    }
    const d = new Date(parsed.ms);
    if (isNaN(d.getTime())) {
      setTsResult(null);
      setTsError("Timestamp out of range.");
      return;
    }
    setTsError(null);
    setTsResult({ date: d, unit: parsed.unit });
  }, [tsInput]);

  // derived date→ts
  const dateToTs = (() => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return { sec: Math.floor(d.getTime() / 1000), ms: d.getTime() };
  })();

  const CopyBtn = ({
    text,
    id,
    small,
  }: {
    text: string;
    id: string;
    small?: boolean;
  }) => (
    <button
      onClick={() => copy(text, id)}
      className={`shrink-0 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors ${
        small ? "p-1" : "p-1.5"
      }`}
    >
      {copiedKey === id ? (
        <Check size={small ? 13 : 15} className="text-green-500" />
      ) : (
        <Copy size={small ? 13 : 15} />
      )}
    </button>
  );

  const OutputRow = ({
    label,
    value,
    id,
  }: {
    label: string;
    value: string;
    id: string;
  }) => (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className="w-28 shrink-0 text-xs font-semibold text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <span className="flex-1 font-mono text-sm text-gray-800 break-all">
        {value}
      </span>
      <CopyBtn text={value} id={id} small />
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Unix Timestamp Converter
          </h1>
          <p className="text-gray-500">
            Convert between Unix timestamps and human-readable dates. Supports
            seconds and milliseconds.
          </p>
        </div>

        {/* Live clock */}
        <div className="bg-blue-600 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-blue-200 shrink-0" />
            <div>
              <div className="text-xs text-blue-200 font-medium mb-0.5">
                Current Unix Time
              </div>
              <div className="font-mono text-2xl font-bold text-white tracking-tight">
                {nowTs}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTsInput(String(nowTs))}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-xl transition-colors"
            >
              <RefreshCw size={13} />
              Use in converter
            </button>
            <CopyBtn text={String(nowTs)} id="live-ts" />
          </div>
        </div>

        {/* Section 1: Timestamp → Date */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            Timestamp → Date
          </h2>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={tsInput}
                onChange={(e) => setTsInput(e.target.value)}
                placeholder="e.g. 1700000000 or 1700000000000"
                className={`w-full border rounded-xl px-4 py-2.5 font-mono text-sm outline-none transition-colors ${
                  tsError
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                }`}
                spellCheck={false}
              />
              {tsError && (
                <p className="mt-1.5 text-xs text-red-600">{tsError}</p>
              )}
              {tsResult && (
                <p className="mt-1.5 text-xs text-gray-400">
                  Detected as:{" "}
                  <span className="font-semibold text-gray-600">
                    {tsResult.unit === "s" ? "seconds" : "milliseconds"}
                  </span>
                </p>
              )}
            </div>
            <button
              onClick={() => setTsInput(String(nowTs))}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold rounded-xl transition-colors shrink-0"
            >
              Now
            </button>
          </div>

          {tsResult && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 pt-1 pb-1">
              <OutputRow
                label="UTC"
                value={formatDate(tsResult.date, "UTC")}
                id="ts-utc"
              />
              <OutputRow
                label="Local"
                value={toLocalStr(tsResult.date)}
                id="ts-local"
              />
              <OutputRow
                label="ISO 8601"
                value={toISO(tsResult.date)}
                id="ts-iso"
              />
              <OutputRow
                label="RFC 2822"
                value={toRFC2822(tsResult.date)}
                id="ts-rfc"
              />
              <OutputRow
                label="Seconds"
                value={String(Math.floor(tsResult.date.getTime() / 1000))}
                id="ts-sec"
              />
              <OutputRow
                label="Milliseconds"
                value={String(tsResult.date.getTime())}
                id="ts-ms"
              />
            </div>
          )}
        </div>

        {/* Section 2: Date → Timestamp */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            Date → Timestamp
          </h2>

          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            step="1"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition-colors mb-4"
          />

          {dateToTs ? (
            <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 pt-1 pb-1">
              <OutputRow
                label="Seconds"
                value={String(dateToTs.sec)}
                id="d2t-sec"
              />
              <OutputRow
                label="Milliseconds"
                value={String(dateToTs.ms)}
                id="d2t-ms"
              />
              <OutputRow
                label="ISO 8601"
                value={new Date(dateToTs.ms).toISOString()}
                id="d2t-iso"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-400">Enter a valid date above.</p>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-700">
          <strong className="block text-blue-900 mb-1">What is a Unix timestamp?</strong>
          Unix time (also called epoch time) counts the number of seconds elapsed since{" "}
          <strong>January 1, 1970 00:00:00 UTC</strong>, ignoring leap seconds. It is
          used universally in software, databases, and APIs for a timezone-neutral
          representation of moments in time.
        </div>
      </div>
    </main>
  );
}
