"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getUpcomingEvents, formatDateISO, parseDateParts } from "@/lib/events";

/**
 * EventsTeaser — Upcoming events preview on the homepage.
 * Displays top 3 upcoming events with date tiles derived from dateISO.
 */
export default function EventsTeaser() {
  const [events, setEvents] = useState<ReturnType<typeof getUpcomingEvents> | null>(null);

  useEffect(() => {
    setEvents(getUpcomingEvents().slice(0, 3));
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="font-arabic text-gold text-sm tracking-widest uppercase mb-3">
              الأنشطة القادمة
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-deep tracking-tight">
              Upcoming Events
            </h2>
          </div>
        </ScrollReveal>

        {!events ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="event-card group bg-cream-light rounded-xl p-5 border border-emerald-deep/5 flex gap-4 h-[120px]">
                <div className="w-16 h-[4.5rem] rounded-xl bg-emerald-deep/5 animate-pulse shrink-0" />
                <div className="flex flex-col min-w-0 justify-center w-full">
                  <div className="h-3 w-16 bg-charcoal-muted/20 rounded animate-pulse mb-1.5" />
                  <div className="h-5 w-3/4 bg-emerald-deep/20 rounded animate-pulse mb-2" />
                  <div className="h-3 w-full bg-charcoal-muted/10 rounded animate-pulse mb-1" />
                  <div className="h-3 w-2/3 bg-charcoal-muted/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <ScrollReveal delay={1}>
            <div className="text-center py-10">
              <p className="text-lg text-charcoal-muted">No upcoming events — check back soon!</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => {
              const { month, day, weekday } = parseDateParts(event.dateISO);
              const displayDate = formatDateISO(event.dateISO);
              return (
                <ScrollReveal key={event.id} delay={(index + 1) as 1 | 2 | 3}>
                  <div className="event-card group bg-cream-light rounded-xl p-5 border border-emerald-deep/5 flex gap-4 h-full">
                    {/* Date tile */}
                    <div className="flex flex-col items-center justify-center w-16 h-[4.5rem] rounded-xl bg-emerald-deep/5 border border-emerald-deep/10 shrink-0">
                      <span className="text-[10px] font-bold tracking-widest text-emerald-deep/60 uppercase leading-none">
                        {month}
                      </span>
                      <span className="text-2xl font-bold text-gold leading-tight">
                        {day}
                      </span>
                      <span className="text-[10px] font-medium text-charcoal-muted leading-none">
                        {weekday}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs font-medium text-charcoal-muted mb-1">
                        {event.time}
                      </p>
                      <h3 className="font-serif text-base font-semibold text-emerald-deep mb-1.5 group-hover:text-gold transition-colors duration-200 leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        <ScrollReveal delay={4}>
          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-deep hover:bg-emerald-rich text-cream-light font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-deep/25 active:scale-[0.98]"
            >
              View All Events
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
