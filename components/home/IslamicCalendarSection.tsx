"use client";

import { useState, useEffect } from "react";
import {
  getTodaysHijri,
  getUpcomingIslamicDates,
  getRamadanStatus,
  MOON_SIGHTING_DISCLAIMER,
} from "@/lib/hijri";
import { formatDateISO, parseDateParts } from "@/lib/events";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * CrescentMoonIcon — Inline SVG crescent moon.
 */
function CrescentMoonIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.25a.75.75 0 01.472.167A9.72 9.72 0 0117.25 12a9.72 9.72 0 01-4.778 9.583.75.75 0 01-.944-1.024A8.22 8.22 0 0014.25 12a8.22 8.22 0 00-2.722-8.559A.75.75 0 0112 2.25z" />
    </svg>
  );
}

/**
 * IslamicCalendarSection — Homepage section showing Ramadan countdown
 * and upcoming significant Islamic dates.
 *
 * Placed after HadithOfTheDay, before EventsTeaser.
 */
export default function IslamicCalendarSection() {
  const [hijriToday, setHijriToday] = useState<ReturnType<typeof getTodaysHijri> | null>(null);
  const [ramadanStatus, setRamadanStatus] = useState<ReturnType<typeof getRamadanStatus> | null>(null);
  const [upcomingDates, setUpcomingDates] = useState<ReturnType<typeof getUpcomingIslamicDates> | null>(null);

  useEffect(() => {
    setHijriToday(getTodaysHijri());
    setRamadanStatus(getRamadanStatus());
    setUpcomingDates(getUpcomingIslamicDates().slice(0, 4));
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-emerald-deep relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="calendarPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="currentColor" strokeWidth="0.6">
                <polygon points="50,5 80,20 95,50 80,80 50,95 20,80 5,50 20,20" />
                <polygon points="50,20 70,30 80,50 70,70 50,80 30,70 20,50 30,30" />
              </g>
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#calendarPattern)" className="text-gold" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="font-arabic text-gold/60 text-sm tracking-widest uppercase mb-3">
              التقويم الهجري
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-light tracking-tight mb-2">
              Islamic Calendar
            </h2>
            {!hijriToday ? (
              <div className="h-4 w-32 bg-white/10 rounded animate-pulse mx-auto" />
            ) : (
              <p className="text-cream-light/60 text-sm">
                {hijriToday.formatted}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Ramadan countdown — visual centerpiece */}
        <ScrollReveal delay={1}>
          <div className="mb-14">
            <div className="relative bg-emerald-deep/60 backdrop-blur-sm border border-gold/15 rounded-2xl p-8 sm:p-10 text-center shadow-xl overflow-hidden">
              {/* Decorative crescent */}
              <div className="absolute top-4 right-4 text-gold/10" aria-hidden="true">
                <CrescentMoonIcon className="w-24 h-24 sm:w-32 sm:h-32" />
              </div>

              <div className="relative z-10">
                <CrescentMoonIcon className="w-8 h-8 text-gold mx-auto mb-4" />

                {!ramadanStatus ? (
                  <>
                    <div className="h-3 w-32 bg-gold/20 rounded animate-pulse mx-auto mb-4" />
                    <div className="h-20 w-24 bg-white/10 rounded-lg animate-pulse mx-auto mb-3" />
                    <div className="h-5 w-40 bg-white/10 rounded animate-pulse mx-auto" />
                  </>
                ) : ramadanStatus.inRamadan ? (
                  <>
                    <p className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">
                      Ramadan Mubarak
                    </p>
                    <div className="flex items-baseline justify-center gap-3 mb-3">
                      <span className="font-serif text-6xl sm:text-7xl font-bold text-cream-light tabular-nums">
                        {ramadanStatus.dayOfRamadan}
                      </span>
                    </div>
                    <p className="text-cream-light/80 text-lg font-serif">
                      Day of Ramadan
                    </p>
                  </>
                ) : ramadanStatus.daysUntilRamadan != null ? (
                  <>
                    <p className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">
                      Days Until Ramadan
                    </p>
                    <div className="flex items-baseline justify-center gap-3 mb-3">
                      <span className="font-serif text-6xl sm:text-7xl font-bold text-cream-light tabular-nums">
                        {ramadanStatus.daysUntilRamadan}
                      </span>
                    </div>
                    <p className="text-cream-light/60 text-sm">
                      The blessed month approaches
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Upcoming significant dates */}
        <ScrollReveal delay={2}>
          <div className="mb-10">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-light mb-6 text-center">
              Upcoming Dates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {!upcomingDates
                ? [1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4 p-4 bg-emerald-deep/50 backdrop-blur-sm border border-gold/10 rounded-xl">
                      <div className="w-14 h-16 rounded-lg bg-gold/10 animate-pulse shrink-0" />
                      <div className="flex flex-col min-w-0 justify-center w-full">
                        <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse mb-1.5" />
                        <div className="h-3 w-1/2 bg-white/10 rounded animate-pulse mb-1.5" />
                        <div className="h-3 w-1/3 bg-gold/20 rounded animate-pulse" />
                      </div>
                    </div>
                  ))
                : upcomingDates.map((dateEntry) => {
                    const parts = parseDateParts(dateEntry.gregorianISO);
                    const gregorianDisplay = formatDateISO(dateEntry.gregorianISO);
                    return (
                      <div
                        key={dateEntry.name}
                        className="flex gap-4 p-4 bg-emerald-deep/50 backdrop-blur-sm border border-gold/10 rounded-xl"
                      >
                        {/* Date tile — derived from gregorianISO */}
                        <div className="flex flex-col items-center justify-center w-14 h-16 rounded-lg bg-gold/10 border border-gold/20 shrink-0">
                          <span className="text-[9px] font-bold tracking-widest text-gold/70 uppercase leading-none">
                            {parts.month}
                          </span>
                          <span className="text-xl font-bold text-gold leading-tight">
                            {parts.day}
                          </span>
                          <span className="text-[9px] font-medium text-cream-light/50 leading-none">
                            {parts.weekday}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col min-w-0">
                          <h4 className="font-serif text-base font-semibold text-cream-light mb-0.5 leading-snug">
                            {dateEntry.name}
                          </h4>
                          <p className="text-cream-light/50 text-xs mb-1">
                            {dateEntry.hijriDate}
                          </p>
                          <p className="text-gold/80 text-xs font-medium">
                            {dateEntry.daysUntil === 0
                              ? 'Today'
                              : dateEntry.daysUntil === 1
                              ? 'Tomorrow'
                              : `In ${dateEntry.daysUntil} days`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </ScrollReveal>

        {/* Moon-sighting disclaimer */}
        <ScrollReveal delay={3}>
          <div className="text-center">
            <p className="text-cream-light/40 text-xs max-w-lg mx-auto leading-relaxed italic">
              <CrescentMoonIcon className="w-3 h-3 inline-block mr-1 -mt-0.5 opacity-50" />
              {MOON_SIGHTING_DISCLAIMER}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
