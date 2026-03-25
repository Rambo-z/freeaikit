"use client";

import { useState, useMemo } from "react";
import { trackToolEvent } from "@/lib/analytics";

function calcAge(birth: Date, target: Date) {
  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prev = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((target.getTime() - birth.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  // Next birthday
  let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= target) {
    nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / 86400000);

  // Day of week born
  const dayOfWeek = birth.toLocaleDateString("en-US", { weekday: "long" });

  return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysUntilBirthday, dayOfWeek };
}

export default function AgeCalculatorClient() {
  const today = new Date().toISOString().split("T")[0];
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(today);

  const result = useMemo(() => {
    if (!birthDate || !targetDate) return null;
    const birth = new Date(birthDate + "T00:00:00");
    const target = new Date(targetDate + "T00:00:00");
    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    if (birth > target) return null;
    return calcAge(birth, target);
  }, [birthDate, targetDate]);

  const statCard = (label: string, value: string | number) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
      <div className="text-2xl font-bold text-gray-900">{typeof value === "number" ? value.toLocaleString() : value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={today}
              className="block px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Age at Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="block px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main result */}
      {result && (
        <>
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 text-center">
            <div className="text-4xl font-extrabold text-blue-700">
              {result.years} <span className="text-lg font-semibold">years</span>{" "}
              {result.months} <span className="text-lg font-semibold">months</span>{" "}
              {result.days} <span className="text-lg font-semibold">days</span>
            </div>
            <p className="text-sm text-blue-500 mt-2">
              Born on a {result.dayOfWeek} · {result.daysUntilBirthday} days until next birthday
            </p>
          </div>

          {/* Detail stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {statCard("Total Years", result.years)}
            {statCard("Total Months", result.totalMonths)}
            {statCard("Total Weeks", result.totalWeeks)}
            {statCard("Total Days", result.totalDays)}
            {statCard("Total Hours", result.totalHours)}
            {statCard("Next Birthday", `${result.daysUntilBirthday} days`)}
          </div>
        </>
      )}

      {!result && birthDate && (
        <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-4 text-center text-sm text-yellow-700">
          Please select a valid date of birth before the target date.
        </div>
      )}
    </div>
  );
}
