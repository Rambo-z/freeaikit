"use client";

import { useState, useMemo } from "react";

type DiffLine = { type: "equal" | "add" | "remove"; text: string };

function diffLines(a: string, b: string): DiffLine[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const m = linesA.length;
  const n = linesB.length;

  // LCS-based diff
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = linesA[i - 1] === linesB[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;
  const stack: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      stack.push({ type: "equal", text: linesA[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "add", text: linesB[j - 1] });
      j--;
    } else {
      stack.push({ type: "remove", text: linesA[i - 1] });
      i--;
    }
  }
  while (stack.length) result.push(stack.pop()!);
  return result;
}

export default function TextDiffClient() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const diff = useMemo(() => {
    if (!textA && !textB) return [];
    return diffLines(textA, textB);
  }, [textA, textB]);

  const added = diff.filter((d) => d.type === "add").length;
  const removed = diff.filter((d) => d.type === "remove").length;
  const unchanged = diff.filter((d) => d.type === "equal").length;

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
          <h2 className="text-sm font-semibold text-gray-700">Original Text</h2>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Paste original text here..."
            rows={10}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
          <h2 className="text-sm font-semibold text-gray-700">Modified Text</h2>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="Paste modified text here..."
            rows={10}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>
      </div>

      {/* Stats */}
      {diff.length > 0 && (
        <div className="flex gap-3 text-sm">
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg font-semibold">+{added} added</span>
          <span className="px-3 py-1 bg-red-50 text-red-700 rounded-lg font-semibold">−{removed} removed</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg font-semibold">{unchanged} unchanged</span>
        </div>
      )}

      {/* Diff output */}
      {diff.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700">Diff Result</h2>
          </div>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm font-mono">
              <tbody>
                {diff.map((line, i) => (
                  <tr
                    key={i}
                    className={
                      line.type === "add"
                        ? "bg-green-50"
                        : line.type === "remove"
                        ? "bg-red-50"
                        : ""
                    }
                  >
                    <td className="w-8 px-3 py-0.5 text-right text-xs text-gray-400 select-none border-r border-gray-100">
                      {i + 1}
                    </td>
                    <td className="w-6 px-2 py-0.5 text-center select-none">
                      {line.type === "add" ? (
                        <span className="text-green-600 font-bold">+</span>
                      ) : line.type === "remove" ? (
                        <span className="text-red-600 font-bold">−</span>
                      ) : (
                        <span className="text-gray-300">&nbsp;</span>
                      )}
                    </td>
                    <td className="px-3 py-0.5 whitespace-pre-wrap break-all">
                      <span
                        className={
                          line.type === "add"
                            ? "text-green-800"
                            : line.type === "remove"
                            ? "text-red-800 line-through"
                            : "text-gray-700"
                        }
                      >
                        {line.text || "\u00A0"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
