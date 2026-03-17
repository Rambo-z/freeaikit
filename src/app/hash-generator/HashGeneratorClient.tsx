"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Copy, Check, Upload, FileText, Type } from "lucide-react";

// ── MD5 (pure JS, RFC 1321) ───────────────────────────────────────────────────

function md5(inputStr: string): string {
  const hc = "0123456789abcdef";
  function rh(n: number) {
    return hc.charAt((n >> 4) & 0x0f) + hc.charAt(n & 0x0f);
  }
  function ad(x: number, y: number) {
    const l = (x & 0xffff) + (y & 0xffff);
    return (((x >> 16) + (y >> 16) + (l >> 16)) << 16) | (l & 0xffff);
  }
  function rl(n: number, c: number) {
    return (n << c) | (n >>> (32 - c));
  }
  function cm(
    q: number,
    a: number,
    b: number,
    x: number,
    s: number,
    t: number
  ) {
    return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
  }
  function ff(
    a: number, b: number, c: number, d: number,
    x: number, s: number, t: number
  ) { return cm((b & c) | (~b & d), a, b, x, s, t); }
  function gg(
    a: number, b: number, c: number, d: number,
    x: number, s: number, t: number
  ) { return cm((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(
    a: number, b: number, c: number, d: number,
    x: number, s: number, t: number
  ) { return cm(b ^ c ^ d, a, b, x, s, t); }
  function ii(
    a: number, b: number, c: number, d: number,
    x: number, s: number, t: number
  ) { return cm(c ^ (b | ~d), a, b, x, s, t); }
  function sb(x: string) {
    let i;
    const nblk = ((x.length + 8) >> 6) + 1;
    const blks = new Array(nblk * 16).fill(0);
    for (i = 0; i < x.length; i++) blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
    blks[i >> 2] |= 0x80 << ((i % 4) * 8);
    blks[nblk * 16 - 2] = x.length * 8;
    return blks;
  }
  const x = sb(inputStr);
  let [a, b, c, d] = [1732584193, -271733879, -1732584194, 271733878];
  for (let i = 0; i < x.length; i += 16) {
    const [oa, ob, oc, od] = [a, b, c, d];
    a = ff(a,b,c,d,x[i+0],7,-680876936); d = ff(d,a,b,c,x[i+1],12,-389564586);
    c = ff(c,d,a,b,x[i+2],17,606105819); b = ff(b,c,d,a,x[i+3],22,-1044525330);
    a = ff(a,b,c,d,x[i+4],7,-176418897); d = ff(d,a,b,c,x[i+5],12,1200080426);
    c = ff(c,d,a,b,x[i+6],17,-1473231341); b = ff(b,c,d,a,x[i+7],22,-45705983);
    a = ff(a,b,c,d,x[i+8],7,1770035416); d = ff(d,a,b,c,x[i+9],12,-1958414417);
    c = ff(c,d,a,b,x[i+10],17,-42063); b = ff(b,c,d,a,x[i+11],22,-1990404162);
    a = ff(a,b,c,d,x[i+12],7,1804603682); d = ff(d,a,b,c,x[i+13],12,-40341101);
    c = ff(c,d,a,b,x[i+14],17,-1502002290); b = ff(b,c,d,a,x[i+15],22,1236535329);
    a = gg(a,b,c,d,x[i+1],5,-165796510); d = gg(d,a,b,c,x[i+6],9,-1069501632);
    c = gg(c,d,a,b,x[i+11],14,643717713); b = gg(b,c,d,a,x[i+0],20,-373897302);
    a = gg(a,b,c,d,x[i+5],5,-701558691); d = gg(d,a,b,c,x[i+10],9,38016083);
    c = gg(c,d,a,b,x[i+15],14,-660478335); b = gg(b,c,d,a,x[i+4],20,-405537848);
    a = gg(a,b,c,d,x[i+9],5,568446438); d = gg(d,a,b,c,x[i+14],9,-1019803690);
    c = gg(c,d,a,b,x[i+3],14,-187363961); b = gg(b,c,d,a,x[i+8],20,1163531501);
    a = gg(a,b,c,d,x[i+13],5,-1444681467); d = gg(d,a,b,c,x[i+2],9,-51403784);
    c = gg(c,d,a,b,x[i+7],14,1735328473); b = gg(b,c,d,a,x[i+12],20,-1926607734);
    a = hh(a,b,c,d,x[i+5],4,-378558); d = hh(d,a,b,c,x[i+8],11,-2022574463);
    c = hh(c,d,a,b,x[i+11],16,1839030562); b = hh(b,c,d,a,x[i+14],23,-35309556);
    a = hh(a,b,c,d,x[i+1],4,-1530992060); d = hh(d,a,b,c,x[i+4],11,1272893353);
    c = hh(c,d,a,b,x[i+7],16,-155497632); b = hh(b,c,d,a,x[i+10],23,-1094730640);
    a = hh(a,b,c,d,x[i+13],4,681279174); d = hh(d,a,b,c,x[i+0],11,-358537222);
    c = hh(c,d,a,b,x[i+3],16,-722521979); b = hh(b,c,d,a,x[i+6],23,76029189);
    a = hh(a,b,c,d,x[i+9],4,-640364487); d = hh(d,a,b,c,x[i+12],11,-421815835);
    c = hh(c,d,a,b,x[i+15],16,530742520); b = hh(b,c,d,a,x[i+2],23,-995338651);
    a = ii(a,b,c,d,x[i+0],6,-198630844); d = ii(d,a,b,c,x[i+7],10,1126891415);
    c = ii(c,d,a,b,x[i+14],15,-1416354905); b = ii(b,c,d,a,x[i+5],21,-57434055);
    a = ii(a,b,c,d,x[i+12],6,1700485571); d = ii(d,a,b,c,x[i+3],10,-1894986606);
    c = ii(c,d,a,b,x[i+10],15,-1051523); b = ii(b,c,d,a,x[i+1],21,-2054922799);
    a = ii(a,b,c,d,x[i+8],6,1873313359); d = ii(d,a,b,c,x[i+15],10,-30611744);
    c = ii(c,d,a,b,x[i+6],15,-1560198380); b = ii(b,c,d,a,x[i+13],21,1309151649);
    a = ii(a,b,c,d,x[i+4],6,-145523070); d = ii(d,a,b,c,x[i+11],10,-1120210379);
    c = ii(c,d,a,b,x[i+2],15,718787259); b = ii(b,c,d,a,x[i+9],21,-343485551);
    a = ad(a, oa); b = ad(b, ob); c = ad(c, oc); d = ad(d, od);
  }
  return [a, b, c, d]
    .map((n) =>
      [0, 8, 16, 24].map((s) => rh((n >> s) & 0xff)).join("")
    )
    .join("");
}

// ── Web Crypto helpers ────────────────────────────────────────────────────────

async function webcryptoHash(
  algo: string,
  data: ArrayBuffer
): Promise<string> {
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function strToUint8(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

// ── types ─────────────────────────────────────────────────────────────────────

interface Hashes {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

// ── component ─────────────────────────────────────────────────────────────────

export default function HashGeneratorClient() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [text, setText] = useState("Hello, World!");
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<Hashes | null>(null);
  const [computing, setComputing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1400);
    });
  }, []);

  // compute hashes when text changes
  useEffect(() => {
    if (mode !== "text") return;
    let cancelled = false;
    setComputing(true);
    const md5hash = md5(text);
    const data = strToUint8(text).buffer as ArrayBuffer;
    Promise.all([
      webcryptoHash("SHA-1", data),
      webcryptoHash("SHA-256", data),
      webcryptoHash("SHA-512", data),
    ]).then(([sha1, sha256, sha512]) => {
      if (!cancelled)
        setHashes({ md5: md5hash, sha1, sha256, sha512 });
    }).finally(() => {
      if (!cancelled) setComputing(false);
    });
    return () => { cancelled = true; };
  }, [text, mode]);

  const processFile = useCallback(async (f: File) => {
    setFile(f);
    setComputing(true);
    setHashes(null);
    try {
      const buf = await f.arrayBuffer();
      const u8 = new Uint8Array(buf);
      // MD5 needs a string — decode as latin1 for binary-safe hashing
      const latin1 = Array.from(u8).map((b) => String.fromCharCode(b)).join("");
      const md5hash = md5(latin1);
      const [sha1, sha256, sha512] = await Promise.all([
        webcryptoHash("SHA-1", buf),
        webcryptoHash("SHA-256", buf),
        webcryptoHash("SHA-512", buf),
      ]);
      setHashes({ md5: md5hash, sha1, sha256, sha512 });
    } catch (e) {
      console.error(e);
    } finally {
      setComputing(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) processFile(f);
    },
    [processFile]
  );

  const hashRows: { key: keyof Hashes; label: string; bits: number }[] = [
    { key: "md5", label: "MD5", bits: 128 },
    { key: "sha1", label: "SHA-1", bits: 160 },
    { key: "sha256", label: "SHA-256", bits: 256 },
    { key: "sha512", label: "SHA-512", bits: 512 },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hash Generator
          </h1>
          <p className="text-gray-500">
            Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files.
            All processing happens in your browser — nothing is uploaded.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setMode("text")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                mode === "text"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Type size={15} />
              Text
            </button>
            <button
              onClick={() => setMode("file")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                mode === "file"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Upload size={15} />
              File
            </button>
          </div>

          {mode === "text" ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Input Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                placeholder="Enter text to hash…"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 font-mono text-sm text-gray-900 bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition-colors resize-y"
                spellCheck={false}
              />
              <p className="mt-1.5 text-xs text-gray-400">
                {text.length} character{text.length !== 1 ? "s" : ""} ·{" "}
                {new TextEncoder().encode(text).length} bytes
              </p>
            </div>
          ) : (
            <div>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  dragging
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                <Upload
                  size={32}
                  className="mx-auto mb-3 text-gray-400"
                />
                <p className="text-sm font-medium text-gray-700">
                  {file ? file.name : "Drop a file here or click to select"}
                </p>
                {file && (
                  <p className="text-xs text-gray-400 mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) processFile(f);
                }}
              />
            </div>
          )}
        </div>

        {/* Hash results */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Hash Values</h2>

          {computing && (
            <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Computing…
            </div>
          )}

          <div className="space-y-3">
            {hashRows.map(({ key, label, bits }) => (
              <HashRow
                key={key}
                label={label}
                bits={bits}
                value={hashes?.[key] ?? ""}
                loading={computing}
                onCopy={() => hashes && copy(hashes[key], key)}
                copied={copiedKey === key}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-700">
          <strong className="block text-blue-900 mb-1">When to use which algorithm?</strong>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>MD5 / SHA-1</strong> — legacy systems, checksums (not for security)</li>
            <li><strong>SHA-256</strong> — general-purpose cryptographic integrity verification</li>
            <li><strong>SHA-512</strong> — maximum security, larger hash space</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

// ── sub-components ────────────────────────────────────────────────────────────

function HashRow({
  label,
  bits,
  value,
  loading,
  onCopy,
  copied,
}: {
  label: string;
  bits: number;
  value: string;
  loading: boolean;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">{label}</span>
          <span className="text-xs text-gray-400">{bits}-bit</span>
        </div>
        <button
          onClick={onCopy}
          disabled={!value || loading}
          className="p-1 rounded text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-30"
        >
          {copied ? (
            <Check size={13} className="text-green-500" />
          ) : (
            <Copy size={13} />
          )}
        </button>
      </div>
      <div className="font-mono text-xs text-gray-800 break-all leading-relaxed min-h-[1.25rem]">
        {loading ? (
          <span className="text-gray-300 animate-pulse">computing…</span>
        ) : value ? (
          value
        ) : (
          <span className="text-gray-300 flex items-center gap-1">
            <FileText size={12} />
            —
          </span>
        )}
      </div>
    </div>
  );
}
