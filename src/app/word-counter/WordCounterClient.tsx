"use client";

import { useState, useMemo } from "react";
import { trackToolEvent } from "@/lib/analytics";

const STOP_WORDS = new Set([
  "the","a","an","and","or","but","in","on","at","to","for","of","with","by","from",
  "is","was","are","were","be","been","has","have","had","do","does","did","will",
  "would","could","should","may","might","can","it","this","that","these","those",
  "i","you","he","she","we","they","me","him","her","us","them","my","your","his",
  "its","our","their","what","which","who","not","no","up","so","if","as","than",
  "then","when","there","here","just","about","also","more","some","into","over",
]);

function analyze(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const sentences = text.trim()
    ? text.split(/(?<=[.!?])\s+|[.!?]+$/).filter((s) => s.trim().length > 0).length
    : 0;
  const paragraphs = text.trim()
    ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0;
  const lines = text ? text.split("\n").length : 0;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const readingTimeSec = Math.round((words.length / 200) * 60);
  const readingTimeMin = Math.floor(readingTimeSec / 60);
  const readingTimeSecs = readingTimeSec % 60;

  const freq: Record<string, number> = {};
  words.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, "");
    if (clean.length > 2 && !STOP_WORDS.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });
  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return { words: words.length, chars: text.length, charsNoSpaces, sentences, paragraphs, lines, readingTimeMin, readingTimeSecs, topWords };
}

const STAT_SAMPLE = "Paste or type any text above to see real-time statistics.";

export default function WordCounterClient() {
  const [text, setText] = useState("");

  const stats = useMemo(() => analyze(text || STAT_SAMPLE), [text]);
  const isEmpty = !text;

  const readingTime = stats.readingTimeMin > 0
    ? `${stats.readingTimeMin} min ${stats.readingTimeSecs} sec`
    : `${Math.max(stats.readingTimeSecs, 1)} sec`;

  const statCards = [
    { label: "Words",                value: isEmpty ? "—" : stats.words.toLocaleString() },
    { label: "Characters",           value: isEmpty ? "—" : stats.chars.toLocaleString() },
    { label: "Characters (no space)",value: isEmpty ? "—" : stats.charsNoSpaces.toLocaleString() },
    { label: "Sentences",            value: isEmpty ? "—" : stats.sentences.toLocaleString() },
    { label: "Paragraphs",           value: isEmpty ? "—" : stats.paragraphs.toLocaleString() },
    { label: "Lines",                value: isEmpty ? "—" : stats.lines.toLocaleString() },
    { label: "Reading Time",         value: isEmpty ? "—" : readingTime },
  ];

  return (
    <div className="space-y-5">
      {/* Textarea */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          rows={10}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
        {text && (
          <button
            onClick={() => setText("")}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
            <div className={`text-2xl font-bold mb-1 ${isEmpty ? "text-gray-300" : "text-gray-900"}`}>
              {value}
            </div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Top keywords */}
      {!isEmpty && stats.topWords.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Top Keywords</h2>
          <div className="space-y-2">
            {stats.topWords.map(([word, count]) => {
              const maxCount = stats.topWords[0][1];
              const pct = Math.round((count / maxCount) * 100);
              return (
                <div key={word} className="flex items-center gap-3">
                  <span className="w-28 text-sm font-mono text-gray-700 truncate">{word}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-xs text-gray-500 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
