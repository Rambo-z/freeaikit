"use client";

import { useState, useMemo, useCallback } from "react";
import { Copy, Check, AlertCircle, CheckCircle2 } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

// ── helpers ──────────────────────────────────────────────────────────────────

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHighlighted(text: string, re: RegExp): string {
  const parts: string[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  // always use global flag for iteration
  const reG = new RegExp(
    re.source,
    re.flags.includes("g") ? re.flags : re.flags + "g"
  );
  while ((m = reG.exec(text)) !== null) {
    parts.push(escape(text.slice(last, m.index)));
    parts.push(
      `<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">${escape(
        m[0]
      )}</mark>`
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) reG.lastIndex++; // avoid infinite loop on zero-length match
  }
  parts.push(escape(text.slice(last)));
  return parts.join("");
}

interface MatchInfo {
  index: number;
  match: string;
  groups: string[];
}

function collectMatches(text: string, re: RegExp): MatchInfo[] {
  const results: MatchInfo[] = [];
  const reG = new RegExp(
    re.source,
    re.flags.includes("g") ? re.flags : re.flags + "g"
  );
  let m: RegExpExecArray | null;
  while ((m = reG.exec(text)) !== null) {
    results.push({ index: m.index, match: m[0], groups: m.slice(1) });
    if (m[0].length === 0) reG.lastIndex++;
  }
  return results;
}

// ── component ────────────────────────────────────────────────────────────────

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState("(\\w+)@([\\w.]+\\.[\\w]+)");
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
  });
  const [testStr, setTestStr] = useState(
    "Contact us at hello@example.com or support@freeaikit.app for help."
  );
  const [copied, setCopied] = useState(false);

  const flagStr = Object.entries(flags)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join("");

  const result = useMemo(() => {
    if (!pattern) {
      return {
        error: null,
        matches: [] as MatchInfo[],
        highlighted: escape(testStr),
        empty: true,
      };
    }
    try {
      const re = new RegExp(pattern, flagStr || "g");
      const matches = collectMatches(testStr, re);
      const highlighted = buildHighlighted(testStr, re);
      return { error: null, matches, highlighted, empty: false };
    } catch (e: unknown) {
      return {
        error: (e as Error).message,
        matches: [] as MatchInfo[],
        highlighted: escape(testStr),
        empty: false,
      };
    }
  }, [pattern, flagStr, testStr]);

  const copyRegex = useCallback(() => {
    trackToolEvent('regex-tester', 'process');
    const full = `/${pattern}/${flagStr}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [pattern, flagStr]);

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const flagDefs: { key: keyof typeof flags; label: string; title: string }[] =
    [
      { key: "g", label: "g", title: "Global — find all matches" },
      { key: "i", label: "i", title: "Case insensitive" },
      { key: "m", label: "m", title: "Multiline — ^ and $ match line boundaries" },
      { key: "s", label: "s", title: "DotAll — . matches newlines" },
    ];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Regex Tester
          </h1>
          <p className="text-gray-500 text-base">
            Test regular expressions in real-time with match highlighting and
            group capture details.
          </p>
        </div>

        {/* Regex input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Regular Expression
          </label>
          <div
            className={`flex items-center gap-2 border rounded-xl px-4 py-2 transition-colors ${
              result.error
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-gray-50 focus-within:border-blue-500 focus-within:bg-white"
            }`}
          >
            <span className="text-gray-400 font-mono text-lg select-none">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern…"
              className="flex-1 bg-transparent font-mono text-sm text-gray-900 outline-none placeholder-gray-400"
              spellCheck={false}
            />
            <span className="text-gray-400 font-mono text-lg select-none">
              /{flagStr}
            </span>
            <button
              onClick={copyRegex}
              title="Copy full regex"
              className="ml-2 p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {copied ? (
                <Check size={15} className="text-green-500" />
              ) : (
                <Copy size={15} />
              )}
            </button>
          </div>

          {/* Error message */}
          {result.error && (
            <div className="mt-2 flex items-start gap-2 text-red-600 text-sm">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>{result.error}</span>
            </div>
          )}

          {/* Flags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 self-center">Flags:</span>
            {flagDefs.map(({ key, label, title }) => (
              <button
                key={key}
                title={title}
                onClick={() => toggleFlag(key)}
                className={`px-3 py-1 rounded-lg text-sm font-mono font-semibold transition-colors border ${
                  flags[key]
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Test string */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Test String
          </label>
          <textarea
            value={testStr}
            onChange={(e) => setTestStr(e.target.value)}
            rows={4}
            placeholder="Enter text to test against…"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 font-mono text-sm text-gray-900 bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition-colors resize-y"
            spellCheck={false}
          />
        </div>

        {/* Stats bar */}
        <div
          className={`rounded-xl px-5 py-3 mb-4 flex items-center gap-2 text-sm font-medium ${
            result.error
              ? "bg-red-50 text-red-700 border border-red-200"
              : result.matches.length > 0
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-gray-100 text-gray-500 border border-gray-200"
          }`}
        >
          {result.error ? (
            <>
              <AlertCircle size={15} />
              <span>Invalid regular expression</span>
            </>
          ) : result.matches.length > 0 ? (
            <>
              <CheckCircle2 size={15} />
              <span>
                {result.matches.length}{" "}
                {result.matches.length === 1 ? "match" : "matches"} found
              </span>
            </>
          ) : (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-400 inline-block" />
              <span>
                {pattern ? "No matches" : "Enter a pattern to start"}
              </span>
            </>
          )}
        </div>

        {/* Highlighted output */}
        {testStr && !result.error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Highlighted Result
            </h2>
            <pre
              className="font-mono text-sm text-gray-800 whitespace-pre-wrap break-all leading-relaxed"
              dangerouslySetInnerHTML={{ __html: result.highlighted }}
            />
          </div>
        )}

        {/* Match details */}
        {result.matches.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Match Details
            </h2>
            <div className="space-y-3">
              {result.matches.map((m, idx) => (
                <MatchCard key={idx} index={idx} info={m} />
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-blue-800 mb-2">
            Quick Reference
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-blue-700 font-mono">
            {[
              [".","any character"],["\\d","digit"],["\\w","word char"],["\\s","whitespace"],
              ["^","start"],["$","end"],["*","0 or more"],["+","1 or more"],
              ["?","0 or 1"],["(…)","group"],["[abc]","char class"],["{n,m}","quantifier"],
            ].map(([sym, desc]) => (
              <div key={sym} className="flex gap-2">
                <span className="text-blue-900 font-bold w-10">{sym}</span>
                <span className="text-blue-600">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// ── sub-components ────────────────────────────────────────────────────────────

function MatchCard({ index, info }: { index: number; info: MatchInfo }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(info.match).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Match {index + 1}
          </span>
          <span className="text-xs text-gray-400">@ index {info.index}</span>
        </div>
        <button
          onClick={copy}
          className="p-1 rounded text-gray-400 hover:text-blue-600 transition-colors"
        >
          {copied ? (
            <Check size={13} className="text-green-500" />
          ) : (
            <Copy size={13} />
          )}
        </button>
      </div>
      <div className="font-mono text-sm text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-1.5 mb-2 break-all">
        {info.match || <span className="text-gray-400 italic">empty string</span>}
      </div>
      {info.groups.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {info.groups.map((g, gi) => (
            <div key={gi} className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">Group {gi + 1}:</span>
              <span className="font-mono text-xs bg-yellow-100 text-yellow-800 rounded px-1.5 py-0.5">
                {g ?? <span className="italic">undefined</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
