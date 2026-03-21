"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do",
  "eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim",
  "ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi",
  "aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit",
  "voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint",
  "occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt",
  "mollit","anim","id","est","laborum","habitant","morbi","tristique","senectus",
  "netus","malesuada","fames","ac","turpis","egestas","maecenas","pharetra","convallis",
  "posuere","blandit","volutpat","lacinia","viverra","tellus","integer","feugiat",
  "nisl","pretium","fusce","sagittis","eu","venenatis","cras","ornare","arcu","dui",
  "vivamus","at","augue","porta","nibh","massa","condimentum","lacus","vel","facilisis",
];

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}

function genSentence(minWords = 5, maxWords = 15): string {
  const len = minWords + randInt(maxWords - minWords + 1);
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(WORDS[randInt(WORDS.length)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function genParagraph(minSentences = 3, maxSentences = 7): string {
  const count = minSentences + randInt(maxSentences - minSentences + 1);
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) sentences.push(genSentence());
  return sentences.join(" ");
}

type Mode = "paragraphs" | "sentences" | "words";

function generate(mode: Mode, count: number): string {
  if (mode === "words") {
    const words: string[] = [];
    for (let i = 0; i < count; i++) words.push(WORDS[randInt(WORDS.length)]);
    if (words.length > 0) words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  }
  if (mode === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) sentences.push(genSentence());
    return sentences.join(" ");
  }
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) paragraphs.push(genParagraph());
  return paragraphs.join("\n\n");
}

export default function LoremIpsumClient() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState(() => generate("paragraphs", 3));
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    setOutput(generate(mode, count));
    setCopied(false);
  }, [mode, count]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [output]);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Type</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as Mode)}
              className="block px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Count</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="block w-20 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            Generate
          </button>
        </div>
      </div>

      {/* Output */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Generated Text</h2>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
          >
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
          {output}
        </div>
        <p className="text-xs text-gray-400">
          {output.split(/\s+/).filter(Boolean).length} words · {output.length} characters
        </p>
      </div>
    </div>
  );
}
