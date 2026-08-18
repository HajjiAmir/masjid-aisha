"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getTodaysPrayerTimes,
  getNextPrayer,
  getPrayerTimesForDate,
  getEasternToday,
} from "@/lib/prayerTimes";
import { MASJID_CONFIG } from "@/lib/prayerConfig";
import { getTodaysHijri } from "@/lib/hijri";
import type { PrayerTime } from "@/lib/prayerTimes";

/**
 * TodayPrayerTable — Full today's prayer schedule for /prayer-times page.
 *
 * Shows Fajr, Sunrise (Shurooq), Dhuhr, Asr, Maghrib, Isha, and Jumu'ah
 * with Adhan (calculated) and Iqamah ([IQAMAH_TBD]) columns.
 * Includes a live countdown to the next prayer.
 */
export default function TodayPrayerTable() {
  const [dayData, setDayData] = useState<ReturnType<typeof getPrayerTimesForDate> | null>(null);
  const [hijri, setHijri] = useState<ReturnType<typeof getTodaysHijri> | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [nextPrayerName, setNextPrayerName] = useState<string>("");

  useEffect(() => {
    const today = getEasternToday();
    setDayData(getPrayerTimesForDate(today));
    setHijri(getTodaysHijri());
  }, []);

  const updateCountdown = useCallback(() => {
    const next = getNextPrayer();
    if (!next) return;

    setNextPrayerName(next.prayer.name);

    const totalSeconds = Math.max(0, Math.floor(next.remainingMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    parts.push(`${minutes.toString().padStart(hours > 0 ? 2 : 1, "0")}m`);
    parts.push(`${seconds.toString().padStart(2, "0")}s`);

    setCountdown(parts.join(" "));
  }, []);

  useEffect(() => {
    if (!dayData) return;
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [dayData, updateCountdown]);

  const isNextPrayer = (name: string) => name === nextPrayerName;

  if (!dayData || !hijri) {
    return (
      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-emerald-deep/30">
        <div className="px-6 py-5 border-b border-gold/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream-light">
                Today&apos;s Prayer Schedule
              </h2>
              <p className="text-cream-light/80 text-sm mt-0.5">
                <span className="inline-block h-[1em] w-32 bg-white/10 rounded animate-pulse align-middle" />
              </p>
              <p className="text-gold/70 text-xs mt-0.5">
                <span className="inline-block h-[1em] w-24 bg-white/10 rounded animate-pulse align-middle" />
              </p>
            </div>
            {/* Skeleton badge matches hydrated badge container exactly */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/20">
              <div className="w-2 h-2 rounded-full bg-white/10 animate-pulse" />
              <div className="text-sm">
                <span className="inline-block h-[1em] w-36 bg-white/10 rounded animate-pulse align-middle" />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-gold/10">
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-cream-light/60 uppercase tracking-wider">
                  Prayer
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-cream-light/60 uppercase tracking-wider">
                  Adhan
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-cream-light/60 uppercase tracking-wider">
                  Iqamah
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <tr
                  key={i}
                  className={`transition-colors duration-200 ${
                    i === 1
                      ? "prayer-row-next"
                      : i === 7
                        ? "bg-gold/5"
                        : i === 2
                          ? "bg-white/[0.02]"
                          : "hover:bg-white/5"
                  }`}
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="inline-block h-5 w-20 bg-white/10 rounded animate-pulse" />
                      <span className="hidden sm:inline-block h-4 w-12 bg-white/10 rounded animate-pulse" />
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <span className="inline-block h-5 w-16 bg-white/10 rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <span className="inline-block h-5 w-24 bg-white/10 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gold/10">
          <p className="text-cream-light/70 text-xs text-center">
            Adhan times calculated for Lynchburg, VA (ISNA method, Shafi madhab) •
            Iqamah times to be confirmed by the masjid
          </p>
        </div>
      </div>
    );
  }

  const schedule = dayData.schedule;
  const sunrise = dayData.sunrise;

  // Build the complete row list: 5 prayers + sunrise + jumu'ah
  interface TableRow {
    name: string;
    nameAr: string;
    adhanTime: string;
    showIqamah: boolean; // sunrise and jumu'ah have no iqamah
    isJumuah: boolean;
    isSpecial: boolean; // sunrise is informational, not a prayer
  }

  const rows: TableRow[] = [
    {
      name: "Fajr",
      nameAr: "الفجر",
      adhanTime: schedule.prayers[0].displayTime,
      showIqamah: true,
      isJumuah: false,
      isSpecial: false,
    },
    {
      name: "Sunrise",
      nameAr: "الشروق",
      adhanTime: sunrise.displayTime,
      showIqamah: false,
      isJumuah: false,
      isSpecial: true,
    },
    {
      name: "Dhuhr",
      nameAr: "الظهر",
      adhanTime: schedule.prayers[1].displayTime,
      showIqamah: true,
      isJumuah: false,
      isSpecial: false,
    },
    {
      name: "Asr",
      nameAr: "العصر",
      adhanTime: schedule.prayers[2].displayTime,
      showIqamah: true,
      isJumuah: false,
      isSpecial: false,
    },
    {
      name: "Maghrib",
      nameAr: "المغرب",
      adhanTime: schedule.prayers[3].displayTime,
      showIqamah: true,
      isJumuah: false,
      isSpecial: false,
    },
    {
      name: "Isha",
      nameAr: "العشاء",
      adhanTime: schedule.prayers[4].displayTime,
      showIqamah: true,
      isJumuah: false,
      isSpecial: false,
    },
    {
      name: "Jumu'ah",
      nameAr: "الجمعة",
      adhanTime: schedule.jumuah,
      showIqamah: false,
      isJumuah: true,
      isSpecial: false,
    },
  ];

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-emerald-deep/30">
      {/* Card header with date and countdown */}
      <div className="px-6 py-5 border-b border-gold/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream-light">
              Today&apos;s Prayer Schedule
            </h2>
            <p className="text-cream-light/80 text-sm mt-0.5">
              {schedule.date}
            </p>
            <p className="text-gold/70 text-xs mt-0.5">
              {hijri.formatted}
            </p>
          </div>
          {/* Live countdown badge */}
          {countdown && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/20">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
              <div className="text-sm">
                <span className="text-cream-light/90">Next: </span>
                <span className="text-gold-light font-semibold">
                  {nextPrayerName}
                </span>
                <span className="text-cream-light/80 mx-1">in</span>
                <span className="text-cream-light font-mono font-semibold tabular-nums">
                  {countdown}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prayer table */}
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead>
            <tr className="border-b border-gold/10">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-cream-light/60 uppercase tracking-wider"
              >
                Prayer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-semibold text-cream-light/60 uppercase tracking-wider"
              >
                Adhan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-semibold text-cream-light/60 uppercase tracking-wider"
              >
                Iqamah
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row) => (
              <tr
                key={row.name}
                className={`transition-colors duration-200 ${
                  isNextPrayer(row.name) && !row.isSpecial && !row.isJumuah
                    ? "prayer-row-next"
                    : row.isJumuah
                      ? "bg-gold/5"
                      : row.isSpecial
                        ? "bg-white/[0.02]"
                        : "hover:bg-white/5"
                }`}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-medium text-sm sm:text-base ${
                        row.isJumuah
                          ? "text-gold-glow"
                          : row.isSpecial
                            ? "text-cream-light/70 italic"
                            : "text-cream-light"
                      }`}
                    >
                      {row.name}
                    </span>
                    <span
                      className={`font-arabic text-sm ${
                        row.isJumuah ? "text-gold/70" : "text-cream-light/60"
                      }`}
                    >
                      {row.nameAr}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <span
                    className={`font-mono text-sm sm:text-base tabular-nums ${
                      isNextPrayer(row.name) && !row.isSpecial && !row.isJumuah
                        ? "text-gold-light font-semibold"
                        : row.isJumuah
                          ? "text-gold-light"
                          : row.isSpecial
                            ? "text-cream-light/60 italic"
                            : "text-cream-light/80"
                    }`}
                  >
                    {row.adhanTime}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  {row.showIqamah ? (
                    <span className="font-mono text-sm text-cream-light/70 italic">
                      [IQAMAH_TBD]
                    </span>
                  ) : row.isJumuah ? (
                    <span className="text-sm text-gold/40">—</span>
                  ) : (
                    <span className="text-sm text-cream-light/50">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <div className="px-6 py-3 border-t border-gold/10">
        <p className="text-cream-light/70 text-xs text-center">
          Adhan times calculated for Lynchburg, VA (ISNA method, Shafi madhab) •
          Iqamah times to be confirmed by the masjid
        </p>
      </div>
    </div>
  );
}
