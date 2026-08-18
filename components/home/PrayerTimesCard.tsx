"use client";

import { useState, useEffect, useCallback } from "react";
import { getTodaysPrayerTimes, getNextPrayer } from "@/lib/prayerTimes";
import { getTodaysHijri } from "@/lib/hijri";
import type { PrayerTime } from "@/lib/prayerTimes";

/**
 * PrayerTimesCard — "Today's Prayer Times" glassmorphism card.
 * Displays five daily prayers + Jumu'ah row with a live countdown
 * ticking every second to the next prayer.
 */
export default function PrayerTimesCard() {
  const [schedule, setSchedule] = useState<ReturnType<typeof getTodaysPrayerTimes> | null>(null);
  const [hijri, setHijri] = useState<ReturnType<typeof getTodaysHijri> | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [nextPrayerName, setNextPrayerName] = useState<string>("");
  const [nextPrayerTime, setNextPrayerTime] = useState<string>("");

  useEffect(() => {
    setSchedule(getTodaysPrayerTimes());
    setHijri(getTodaysHijri());
  }, []);

  const updateCountdown = useCallback(() => {
    const next = getNextPrayer();
    if (!next) return;

    setNextPrayerName(next.prayer.name);
    setNextPrayerTime(next.prayer.displayTime);

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
    if (!schedule) return;
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [schedule, updateCountdown]);

  const isNextPrayer = (prayer: PrayerTime) => prayer.name === nextPrayerName;

  if (!schedule || !hijri) {
    return (
      <section className="relative -mt-12 z-20 mx-auto max-w-2xl px-4 sm:px-6">
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-emerald-deep/30">
          <div className="px-6 py-5 border-b border-gold/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream-light">
                  Today&apos;s Prayer Times
                </h2>
                {/* Skeleton: mobile layout — matches hydrated mt-1, mt-0.5 */}
                <div className="md:hidden">
                  <p className="text-gold-light text-sm font-medium mt-1 flex items-center gap-1.5">
                    <span className="inline-block h-[1em] w-3.5 bg-gold/20 rounded animate-pulse" />
                    <span className="inline-block h-[1em] w-32 bg-gold/20 rounded animate-pulse" />
                  </p>
                  <p className="text-cream-light/60 text-xs mt-0.5">
                    <span className="inline-block h-[1em] w-24 bg-white/10 rounded animate-pulse align-middle" />
                  </p>
                </div>
                {/* Skeleton: desktop layout — matches hydrated mt-0.5, mt-0.5 */}
                <div className="hidden md:block">
                  <p className="text-cream-light/80 text-sm mt-0.5">
                    <span className="inline-block h-[1em] w-32 bg-white/10 rounded animate-pulse align-middle" />
                  </p>
                  <p className="text-gold/70 text-xs mt-0.5">
                    <span className="inline-block h-[1em] w-24 bg-white/10 rounded animate-pulse align-middle" />
                  </p>
                </div>
              </div>
              {/* Skeleton badge — matches hydrated badge container */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/20">
                <div className="w-2 h-2 rounded-full bg-white/10 animate-pulse" />
                <div className="text-sm">
                  <span className="inline-block h-[1em] w-36 bg-white/10 rounded animate-pulse align-middle" />
                </div>
              </div>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-3.5 transition-colors duration-200 ${
                  i === 1 ? "prayer-row-next" : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-block h-5 w-20 bg-white/10 rounded animate-pulse" />
                  <span className="hidden sm:inline-block h-4 w-12 bg-white/10 rounded animate-pulse" />
                </div>
                <span className="inline-block h-5 w-16 bg-white/10 rounded animate-pulse" />
              </div>
            ))}
            <div className="flex items-center justify-between px-6 py-3.5 bg-gold/5">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gold-glow text-sm sm:text-base">
                  Jumu&apos;ah
                </span>
                <span className="font-arabic text-gold/70 text-sm">الجمعة</span>
              </div>
              <span className="inline-block h-5 w-16 bg-gold/20 rounded animate-pulse" />
            </div>
          </div>
          <div className="px-6 py-3 border-t border-gold/10">
            <p className="text-cream-light/70 text-xs text-center">
              Times shown are for Lynchburg, VA (Eastern Time)
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative -mt-12 z-20 mx-auto max-w-2xl px-4 sm:px-6">
      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-emerald-deep/30">
        {/* Card header */}
        <div className="px-6 py-5 border-b border-gold/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream-light">
                Today&apos;s Prayer Times
              </h2>
              {/* Mobile: elevated Hijri (above Gregorian, gold-light, crescent icon) */}
              <div className="md:hidden">
                <p className="text-gold-light text-sm font-medium mt-1 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gold/70" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.472.167A9.72 9.72 0 0117.25 12a9.72 9.72 0 01-4.778 9.583.75.75 0 01-.944-1.024A8.22 8.22 0 0014.25 12a8.22 8.22 0 00-2.722-8.559A.75.75 0 0112 2.25z" /></svg>
                  {hijri.formatted}
                </p>
                <p className="text-cream-light/60 text-xs mt-0.5">{schedule.date}</p>
              </div>
              {/* Desktop: pre-revision order (Gregorian first, Hijri below in text-xs) */}
              <div className="hidden md:block">
                <p className="text-cream-light/80 text-sm mt-0.5">{schedule.date}</p>
                <p className="text-gold/70 text-xs mt-0.5">{hijri.formatted}</p>
              </div>
            </div>
            {/* Live countdown badge */}
            {countdown && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/20">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
                <div className="text-sm">
                  <span className="text-cream-light/90">Next: </span>
                  <span className="text-gold-light font-semibold">{nextPrayerName}</span>
                  <span className="text-cream-light/80 mx-1">in</span>
                  <span className="text-cream-light font-mono font-semibold tabular-nums">
                    {countdown}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prayer rows */}
        <div className="divide-y divide-white/5">
          {schedule.prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`flex items-center justify-between px-6 py-3.5 transition-colors duration-200 ${
                isNextPrayer(prayer)
                  ? "prayer-row-next"
                  : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-cream-light text-sm sm:text-base">
                  {prayer.name}
                </span>
                <span className="font-arabic text-cream-light/70 text-sm">
                  {prayer.nameAr}
                </span>
              </div>
              <span
                className={`font-mono text-sm sm:text-base tabular-nums ${
                  isNextPrayer(prayer)
                    ? "text-gold-light font-semibold"
                    : "text-cream-light/80"
                }`}
              >
                {prayer.displayTime}
              </span>
            </div>
          ))}

          {/* Jumu'ah row */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-gold/5">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gold-glow text-sm sm:text-base">
                Jumu&apos;ah
              </span>
              <span className="font-arabic text-gold/70 text-sm">الجمعة</span>
            </div>
            <span className="text-gold-light text-sm sm:text-base font-mono">
              {schedule.jumuah}
            </span>
          </div>
        </div>

        {/* Card footer note */}
        <div className="px-6 py-3 border-t border-gold/10">
          <p className="text-cream-light/70 text-xs text-center">
            Times shown are for Lynchburg, VA (Eastern Time)
          </p>
        </div>
      </div>
    </section>
  );
}
