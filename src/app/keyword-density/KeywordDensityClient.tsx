"use client";

import { useState, useMemo } from "react";
import { trackToolEvent } from "@/lib/analytics";

const STOP_WORDS = new Set([
  "a","about","above","after","again","against","all","am","an","and","any","are","aren't","as","at",
  "be","because","been","before","being","below","between","both","but","by","can","can't","cannot",
  "could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few",
  "for","from","further","get","got","had","hadn't","has","hasn't","have","haven't","having","he","he'd",
  "he'll","he's","her","here","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm",
  "i've","if","in","into","is","isn't","it","it's","its","itself","just","let's","me","more","most",
  "mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our",
  "ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should",
  "shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves",
  "then","there","there's","these","they","they'd","they'll","they're","they've","this","those",
  "through","to","too","under","until","up","us","very","was","wasn't","we","we'd","we'll","we're",
  "we've","were","weren't","what","what's","when","when's","where","where's","which","while","who",
  "who's","whom","why","why's","will","with","won't","would","wouldn't","you","you'd","you'll",
  "you're","you've","your","yours","yourself","yourselves",
]);

interface KeywordResult {
  keyword: string;
  count: number;
  density: number;
}

function analyzeText(text: string, ngramSize: number): { results: KeywordResult[]; totalWords: number } {
  const words = text.toLowerCase().match(/[a-zA-Z\u00C0-\u024F]+(?:'[a-zA-Z]+)?/g) || [];
  const totalWords = words.length;
  if (totalWords === 0) return { results: [], totalWords: 0 };

  const filteredWords = words.filter((w) => !STOP_WORDS.has(w) && w.length > 1);

  const freq = new Map<string, number>();

  if (ngramSize === 1) {
    for (const w of filteredWords) {
      freq.set(w, (freq.get(w) || 0) + 1);
    }
  } else {
    // For n-grams, use original words array (preserve order) but skip stop-word-only n-grams
    for (let i = 0; i <= words.length - ngramSize; i++) {
      const ngram = words.slice(i, i + ngramSize);
      // Skip if ALL words are stop words
      if (ngram.every((w) => STOP_WORDS.has(w))) continue;
      const key = ngram.join(" ");
      freq.set(key, (freq.get(key) || 0) + 1);
    }
  }

  const results: KeywordResult[] = Array.from(freq.entries())
    .filter(([, count]) => count >= 2) // At least 2 occurrences
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);

  return { results, totalWords };
}

type NgramTab = 1 | 2 | 3;

export default function KeywordDensityClient() {
  const [text, setText] = useState("");
  const [ngramTab, setNgramTab] = useState<NgramTab>(1);
  const [highlightKeyword, setHighlightKeyword] = useState("");

  const { results, totalWords } = useMemo(() => analyzeText(text, ngramTab), [text, ngramTab]);

  const uniqueWords = useMemo(() => {
    const words = text.toLowerCase().match(/[a-zA-Z\u00C0-\u024F]+(?:'[a-zA-Z]+)?/g) || [];
    return new Set(words.filter((w) => !STOP_WORDS.has(w) && w.length > 1)).size;
  }, [text]);

  const TABS: { value: NgramTab; label: string }[] = [
    { value: 1, label: "1-Word" },
    { value: 2, label: "2-Word" },
    { value: 3, label: "3-Word" },
  ];

  const getDensityColor = (density: number) => {
    if (density > 5) return "text-red-600 bg-red-50";
    if (density > 3) return "text-amber-600 bg-amber-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">Paste Your Content</label>
            <button onClick={() => setText("")} disabled={!text}
              className="text-xs text-gray-400 hover:text-red-500 disabled:opacity-40 transition-colors">
              Clear
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your article, blog post, or web page text here to analyze keyword density..."
            rows={20}
            spellCheck={false}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
              <div className="text-lg font-bold text-gray-900">{totalWords.toLocaleString()}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Total Words</div>
            </div>
            <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
              <div className="text-lg font-bold text-gray-900">{uniqueWords.toLocaleString()}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Unique Keywords</div>
            </div>
            <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
              <div className="text-lg font-bold text-gray-900">{text.length.toLocaleString()}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Characters</div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Keyword Analysis</h2>
          </div>

          {/* N-gram tabs */}
          <div className="flex gap-2">
            {TABS.map(({ value, label }) => (
              <button key={value} onClick={() => { setNgramTab(value); setHighlightKeyword(""); }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${ngramTab === value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                {label}
              </button>
            ))}
          </div>

          {results.length === 0 && (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              {text ? "No keywords found with 2+ occurrences" : "Enter text to analyze keyword density"}
            </div>
          )}

          {results.length > 0 && (
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 overflow-hidden max-h-[500px] overflow-y-auto">
              {/* Header */}
              <div className="grid grid-cols-[1fr_60px_80px_50px] text-[10px] uppercase tracking-wide text-gray-500 bg-gray-50 font-semibold">
                <div className="px-3 py-2">Keyword</div>
                <div className="px-3 py-2 text-center">Count</div>
                <div className="px-3 py-2 text-center">Density</div>
                <div className="px-3 py-2 text-center">Bar</div>
              </div>
              {results.map((r) => (
                <div key={r.keyword}
                  onClick={() => setHighlightKeyword(highlightKeyword === r.keyword ? "" : r.keyword)}
                  className={`grid grid-cols-[1fr_60px_80px_50px] text-sm cursor-pointer transition-colors ${highlightKeyword === r.keyword ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                  <div className="px-3 py-2 font-mono text-xs text-gray-800 truncate">{r.keyword}</div>
                  <div className="px-3 py-2 text-center text-gray-600 text-xs">{r.count}</div>
                  <div className="px-3 py-2 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${getDensityColor(r.density)}`}>
                      {r.density.toFixed(2)}%
                    </span>
                  </div>
                  <div className="px-3 py-2 flex items-center">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, r.density * 20)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 text-[10px] text-gray-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400" /> 0-3% Normal</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> 3-5% High</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> 5%+ Overstuffed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
