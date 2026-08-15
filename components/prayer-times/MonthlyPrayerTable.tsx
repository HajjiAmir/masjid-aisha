"use client";

import { useState, useEffect } from "react";
import { getMonthlyPrayerTimes, getEasternDateParts } from "@/lib/prayerTimes";

/**
 * MonthlyPrayerTable — Full month of adhan times in a responsive table.
 *
 * Today's row is highlighted based on the Eastern (America/New_York) date,
 * not the visitor's device calendar. Horizontally scrollable on mobile.
 */
export default function MonthlyPrayerTable() {
  const [monthData, setMonthData] = useState<ReturnType<typeof getMonthlyPrayerTimes> | null>(null);

  useEffect(() => {
    const { year, month } = getEasternDateParts();
    setMonthData(getMonthlyPrayerTimes(year, month));
  }, []);

  const columns = [
    { key: "day" as const, label: "Day" },
    { key: "fajr" as const, label: "Fajr" },
    { key: "sunrise" as const, label: "Sunrise" },
    { key: "dhuhr" as const, label: "Dhuhr" },
    { key: "asr" as const, label: "Asr" },
    { key: "maghrib" as const, label: "Maghrib" },
    { key: "isha" as const, label: "Isha" },
  ];

  if (!monthData) {
    return (
      <div className="bg-emerald-deep rounded-2xl overflow-hidden shadow-xl border border-gold/10">
        <div className="px-6 py-4 border-b border-gold/10">
          <div className="h-6 w-40 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-60 bg-white/10 rounded animate-pulse mt-1" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]" role="table">
            <thead>
              <tr className="border-b border-gold/10">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`px-3 sm:px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
                      col.key === "day"
                        ? "text-left text-cream-light/60"
                        : "text-right text-cream-light/50"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="hover:bg-white/[0.03]">
                  <td className="px-3 sm:px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-6 bg-white/10 rounded animate-pulse" />
                      <div className="h-3 w-8 bg-white/10 rounded animate-pulse" />
                    </div>
                  </td>
                  {["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"].map((prayer) => (
                    <td key={prayer} className="px-3 sm:px-4 py-2.5">
                      <div className="flex justify-end">
                        <div className="h-4 w-12 bg-white/10 rounded animate-pulse" />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-deep rounded-2xl overflow-hidden shadow-xl border border-gold/10">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-gold/10">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream-light">
          {monthData.monthName} {monthData.year}
        </h2>
        <p className="text-cream-light/60 text-sm mt-0.5">
          Monthly adhan times for Lynchburg, VA
        </p>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto scroll-hint">
        <table className="w-full min-w-[600px]" role="table">
          <thead>
            <tr className="border-b border-gold/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-3 sm:px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
                    col.key === "day"
                      ? "text-left text-cream-light/60 sticky left-0 z-10 bg-emerald-deep"
                      : "text-right text-cream-light/50"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {monthData.days.map((entry) => (
              <tr
                key={entry.day}
                className={`transition-colors duration-150 ${
                  entry.isToday
                    ? "bg-gold/10 border-l-3 border-l-gold"
                    : "hover:bg-white/[0.03]"
                }`}
                aria-current={entry.isToday ? "date" : undefined}
              >
                <td className={`px-3 sm:px-4 py-2.5 sticky left-0 z-10 ${entry.isToday ? "bg-[#1c4636]" : "bg-emerald-deep"}`}>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-sm tabular-nums ${
                        entry.isToday
                          ? "text-gold-light font-bold"
                          : "text-cream-light/80"
                      }`}
                    >
                      {entry.day}
                    </span>
                    <span
                      className={`text-xs ${
                        entry.isToday
                          ? "text-gold/80"
                          : "text-cream-light/40"
                      }`}
                    >
                      {entry.dayOfWeek}
                    </span>
                    {entry.isToday && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gold/20 text-gold-light rounded">
                        Today
                      </span>
                    )}
                  </div>
                </td>
                {(
                  ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const
                ).map((prayer) => (
                  <td
                    key={prayer}
                    className={`px-3 sm:px-4 py-2.5 text-right font-mono text-xs sm:text-sm tabular-nums ${
                      entry.isToday
                        ? "text-cream-light font-medium"
                        : "text-cream-light/60"
                    }`}
                  >
                    {entry[prayer]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
