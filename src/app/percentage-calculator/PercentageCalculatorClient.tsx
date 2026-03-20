"use client";

import { useState } from "react";

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  return Number.isInteger(n) ? n.toLocaleString() : parseFloat(n.toFixed(6)).toLocaleString();
}

export default function PercentageCalculatorClient() {
  // What is X% of Y?
  const [pctOf_x, setPctOf_x] = useState("");
  const [pctOf_y, setPctOf_y] = useState("");

  // X is what % of Y?
  const [whatPct_x, setWhatPct_x] = useState("");
  const [whatPct_y, setWhatPct_y] = useState("");

  // % change from X to Y
  const [chg_x, setChg_x] = useState("");
  const [chg_y, setChg_y] = useState("");

  // Increase/Decrease X by Y%
  const [adj_x, setAdj_x] = useState("");
  const [adj_y, setAdj_y] = useState("");

  const r1 = pctOf_x && pctOf_y ? fmt((parseFloat(pctOf_x) / 100) * parseFloat(pctOf_y)) : null;
  const r2 = whatPct_x && whatPct_y ? fmt((parseFloat(whatPct_x) / parseFloat(whatPct_y)) * 100) + "%" : null;
  const r3 = chg_x && chg_y ? fmt(((parseFloat(chg_y) - parseFloat(chg_x)) / Math.abs(parseFloat(chg_x))) * 100) + "%" : null;
  const r4inc = adj_x && adj_y ? fmt(parseFloat(adj_x) * (1 + parseFloat(adj_y) / 100)) : null;
  const r4dec = adj_x && adj_y ? fmt(parseFloat(adj_x) * (1 - parseFloat(adj_y) / 100)) : null;

  const cardClass = "bg-white rounded-2xl border border-gray-200 p-5 space-y-3";
  const labelClass = "text-sm font-semibold text-gray-700";
  const inputClass = "w-28 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const resultClass = "px-4 py-3 bg-indigo-50 rounded-xl text-center text-lg font-bold text-indigo-700";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* What is X% of Y? */}
      <div className={cardClass}>
        <h2 className={labelClass}>What is X% of Y?</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">What is</span>
          <input type="number" value={pctOf_x} onChange={(e) => setPctOf_x(e.target.value)} placeholder="10" className={inputClass} />
          <span className="text-sm text-gray-500">% of</span>
          <input type="number" value={pctOf_y} onChange={(e) => setPctOf_y(e.target.value)} placeholder="200" className={inputClass} />
          <span className="text-sm text-gray-500">?</span>
        </div>
        {r1 && <div className={resultClass}>= {r1}</div>}
      </div>

      {/* X is what % of Y? */}
      <div className={cardClass}>
        <h2 className={labelClass}>X is what % of Y?</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <input type="number" value={whatPct_x} onChange={(e) => setWhatPct_x(e.target.value)} placeholder="25" className={inputClass} />
          <span className="text-sm text-gray-500">is what % of</span>
          <input type="number" value={whatPct_y} onChange={(e) => setWhatPct_y(e.target.value)} placeholder="200" className={inputClass} />
          <span className="text-sm text-gray-500">?</span>
        </div>
        {r2 && <div className={resultClass}>= {r2}</div>}
      </div>

      {/* Percentage change */}
      <div className={cardClass}>
        <h2 className={labelClass}>Percentage Change</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">From</span>
          <input type="number" value={chg_x} onChange={(e) => setChg_x(e.target.value)} placeholder="80" className={inputClass} />
          <span className="text-sm text-gray-500">to</span>
          <input type="number" value={chg_y} onChange={(e) => setChg_y(e.target.value)} placeholder="100" className={inputClass} />
        </div>
        {r3 && (
          <div className={resultClass}>
            {parseFloat(r3) > 0 ? "+" : ""}{r3} change
          </div>
        )}
      </div>

      {/* Increase / Decrease by % */}
      <div className={cardClass}>
        <h2 className={labelClass}>Increase / Decrease by %</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <input type="number" value={adj_x} onChange={(e) => setAdj_x(e.target.value)} placeholder="200" className={inputClass} />
          <span className="text-sm text-gray-500">±</span>
          <input type="number" value={adj_y} onChange={(e) => setAdj_y(e.target.value)} placeholder="15" className={inputClass} />
          <span className="text-sm text-gray-500">%</span>
        </div>
        {r4inc && (
          <div className="grid grid-cols-2 gap-2">
            <div className="px-3 py-2 bg-green-50 rounded-xl text-center text-sm font-bold text-green-700">
              +{adj_y}% = {r4inc}
            </div>
            <div className="px-3 py-2 bg-red-50 rounded-xl text-center text-sm font-bold text-red-700">
              −{adj_y}% = {r4dec}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
