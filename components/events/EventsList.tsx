"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import GeometricPattern from "@/components/GeometricPattern";
import {
  getUpcomingEvents,
  getUpcomingByCategory,
  formatDateISO,
  parseDateParts,
  daysUntil,
  type MasjidEvent,
} from "@/lib/events";

/* ─── Inline SVG program icons (no new deps) ─── */

function BookIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

const PROGRAM_ICONS: Record<string, () => React.JSX.Element> = {
  book: BookIcon,
  people: PeopleIcon,
  family: FamilyIcon,
};

/* ─── Date Tile Component ─── */

function DateTile({ dateISO }: { dateISO: string }) {
  const { month, day, weekday } = parseDateParts(dateISO);
  return (
    <div className="flex flex-col items-center justify-center w-14 h-16 md:w-16 md:h-[4.5rem] rounded-xl bg-emerald-deep/5 border border-emerald-deep/10 shrink-0">
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
  );
}

/* ─── Event Card Component ─── */

function EventCard({ event }: { event: MasjidEvent }) {
  return (
    <div className="event-card group h-full bg-cream-light rounded-xl p-5 border border-emerald-deep/5 flex gap-4">
      <DateTile dateISO={event.dateISO} />
      <div className="flex flex-col min-w-0">
        <p className="text-xs font-medium text-charcoal-muted mb-1">{event.time}</p>
        <h3 className="font-serif text-base font-semibold text-emerald-deep mb-1.5 group-hover:text-gold transition-colors duration-200 leading-snug">
          {event.title}
        </h3>
        <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">
          {event.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Program Card Component ─── */

function ProgramCard({ event }: { event: MasjidEvent }) {
  const IconComponent = event.icon ? PROGRAM_ICONS[event.icon] : null;
  return (
    <div className="event-card group h-full bg-cream-light rounded-xl p-5 border border-emerald-deep/5 flex flex-col relative overflow-hidden">
      {/* Weekly badge */}
      {event.recurring && (
        <div className="absolute top-0 right-0 bg-gold/10 text-gold px-3 py-1 text-[10px] font-bold tracking-wider rounded-bl-lg uppercase">
          {event.recurring}
        </div>
      )}
      <div className="flex gap-4 mt-1">
        <DateTile dateISO={event.dateISO} />
        <div className="flex flex-col min-w-0 flex-1">
          <p className="text-xs font-medium text-charcoal-muted mb-1">{event.time}</p>
          <div className="flex items-center gap-2 mb-1.5">
            {IconComponent && (
              <span className="text-emerald-deep/50 shrink-0">
                <IconComponent />
              </span>
            )}
            <h3 className="font-serif text-base font-semibold text-emerald-deep group-hover:text-gold transition-colors duration-200 leading-snug">
              {event.title}
            </h3>
          </div>
          <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Featured Event Card ─── */

function FeaturedEventCard({ event }: { event: MasjidEvent }) {
  const days = daysUntil(event.dateISO);
  const displayDate = formatDateISO(event.dateISO);
  const countdownText =
    days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[360px] flex items-end">
      {/* Background photo */}
      <Image
        src="/images/prayer-hall-current.jpg"
        alt="Prayer hall at the Islamic Center of Lynchburg"
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
        quality={75}
      />

      {/* Dark emerald gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/80 to-emerald-deep/30"
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-10 w-full p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-gold/80 text-xs font-bold tracking-widest uppercase mb-2">
              Next Event
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-cream-light tracking-tight mb-3 leading-tight">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-cream-light/80 text-sm">
              <span>{displayDate}</span>
              <span className="text-gold/60">•</span>
              <span>{event.time}</span>
            </div>
            <p className="text-cream-light/60 text-sm mt-3 max-w-md leading-relaxed hidden sm:block">
              {event.description}
            </p>
          </div>

          {/* Countdown chip */}
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-semibold tracking-wide">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {countdownText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsList() {
  const [data, setData] = useState<{
    featured: MasjidEvent | null;
    events: MasjidEvent[];
    programs: MasjidEvent[];
    allPrograms: MasjidEvent[];
  } | null>(null);

  useEffect(() => {
    const allUpcoming = getUpcomingEvents();
    const featured = allUpcoming[0] ?? null;
    const remainingEvents = allUpcoming.slice(1);
    const evts = remainingEvents.filter((e) => e.category === "event");
    const progs = remainingEvents.filter((e) => e.category === "program");
    const allPrograms = getUpcomingByCategory().programs;
    
    setData({
      featured,
      events: evts,
      programs: progs,
      allPrograms
    });
  }, []);

  /* ── Featured Hero: always SSR the image so browser discovers it
       immediately. Text overlay hydrates after useEffect. ── */
  const featuredHero = (
    <div className="relative w-full rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[360px] flex items-end">
      {/* Background photo — SSR for LCP discovery (Next.js 16) */}
      <Image
        src="/images/community-meal-gathering.jpg"
        alt="Community iftar meal at Masjid Aisha"
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
        quality={75}
        loading="eager"
        fetchPriority="high"
      />

      {/* Dark emerald gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/80 to-emerald-deep/30"
        aria-hidden="true"
      />

      {/* Content overlay — skeleton until data loads, then hydrated text */}
      <div className="relative z-10 w-full p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-gold/80 text-xs font-bold tracking-widest uppercase mb-2">
              Next Event
            </p>
            {data?.featured ? (
              <>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-cream-light tracking-tight mb-3 leading-tight">
                  {data.featured.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-cream-light/80 text-sm">
                  <span>{formatDateISO(data.featured.dateISO)}</span>
                  <span className="text-gold/60">•</span>
                  <span>{data.featured.time}</span>
                </div>
                <p className="text-cream-light/60 text-sm mt-3 max-w-md leading-relaxed hidden sm:block">
                  {data.featured.description}
                </p>
              </>
            ) : (
              <>
                <div className="h-8 sm:h-10 w-3/4 bg-white/10 rounded animate-pulse mb-3" />
                <div className="flex items-center gap-4">
                  <span className="inline-block h-4 w-28 bg-white/10 rounded animate-pulse" />
                  <span className="inline-block h-4 w-16 bg-white/10 rounded animate-pulse" />
                </div>
              </>
            )}
          </div>

          {/* Countdown chip */}
          <div className="shrink-0">
            {data?.featured ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-semibold tracking-wide">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {(() => {
                  const days = daysUntil(data.featured.dateISO);
                  return days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`;
                })()}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full">
                <span className="inline-block h-4 w-20 bg-white/10 rounded animate-pulse" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!data) {
    return (
      <div className="space-y-20">
        {featuredHero}
        <section className="relative">
          <div className="hidden md:block absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 opacity-30 pointer-events-none overflow-hidden rounded-3xl" aria-hidden="true">
            <GeometricPattern />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8 border-b border-emerald-deep/10 pb-4">
              <h2 className="font-serif text-3xl font-bold text-emerald-deep">
                Upcoming Events
              </h2>
              <span className="h-6 w-8 bg-emerald-deep/10 rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="event-card bg-cream-light rounded-xl p-5 border border-emerald-deep/5 flex gap-4 h-[120px]">
                  <div className="w-14 h-16 md:w-16 md:h-[4.5rem] rounded-xl bg-emerald-deep/5 animate-pulse shrink-0" />
                  <div className="flex flex-col min-w-0 justify-center w-full">
                    <div className="h-3 w-16 bg-charcoal-muted/20 rounded animate-pulse mb-1.5" />
                    <div className="h-5 w-3/4 bg-emerald-deep/20 rounded animate-pulse mb-2" />
                    <div className="h-3 w-full bg-charcoal-muted/10 rounded animate-pulse mb-1" />
                    <div className="h-3 w-2/3 bg-charcoal-muted/10 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="relative">
          <div className="hidden md:block absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 opacity-30 pointer-events-none overflow-hidden rounded-3xl" aria-hidden="true">
            <GeometricPattern />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8 border-b border-emerald-deep/10 pb-4">
              <h2 className="font-serif text-3xl font-bold text-emerald-deep">
                Recurring Programs
              </h2>
              <span className="h-6 w-8 bg-emerald-deep/10 rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="event-card bg-cream-light rounded-xl p-5 border border-emerald-deep/5 flex gap-4 h-[120px]">
                  <div className="w-14 h-16 md:w-16 md:h-[4.5rem] rounded-xl bg-emerald-deep/5 animate-pulse shrink-0" />
                  <div className="flex flex-col min-w-0 justify-center w-full">
                    <div className="h-3 w-16 bg-charcoal-muted/20 rounded animate-pulse mb-1.5" />
                    <div className="h-5 w-3/4 bg-emerald-deep/20 rounded animate-pulse mb-2" />
                    <div className="h-3 w-full bg-charcoal-muted/10 rounded animate-pulse mb-1" />
                    <div className="h-3 w-2/3 bg-charcoal-muted/10 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  const { featured, events, allPrograms } = data;

  return (
    <>
      {featured ? featuredHero : null}

      {/* Upcoming Events Section */}
      <section className="relative">
        <div className="hidden md:block absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 opacity-30 pointer-events-none overflow-hidden rounded-3xl" aria-hidden="true">
          <GeometricPattern />
        </div>

        <div className="relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8 border-b border-emerald-deep/10 pb-4">
              <h2 className="font-serif text-3xl font-bold text-emerald-deep">
                Upcoming Events
              </h2>
              <span className="bg-emerald-deep/10 text-emerald-deep px-3 py-1 rounded-full text-sm font-medium">
                {events.length}
              </span>
            </div>
          </ScrollReveal>

          {events.length === 0 ? (
            <ScrollReveal delay={1}>
              <div className="text-center py-12 bg-cream-light rounded-xl border border-emerald-deep/5">
                <CalendarIcon />
                <p className="text-lg text-charcoal-muted mt-2">
                  No upcoming events scheduled. Check back soon!
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event, index) => (
                <ScrollReveal key={event.id} delay={((index % 3) + 1) as 1 | 2 | 3}>
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recurring Programs Section */}
      <section className="relative">
        <div className="hidden md:block absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 opacity-30 pointer-events-none overflow-hidden rounded-3xl" aria-hidden="true">
          <GeometricPattern />
        </div>

        <div className="relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8 border-b border-emerald-deep/10 pb-4">
              <h2 className="font-serif text-3xl font-bold text-emerald-deep">
                Recurring Programs
              </h2>
              <span className="bg-emerald-deep/10 text-emerald-deep px-3 py-1 rounded-full text-sm font-medium">
                {allPrograms.length}
              </span>
            </div>
          </ScrollReveal>

          {allPrograms.length === 0 ? (
            <ScrollReveal delay={1}>
              <div className="text-center py-12 bg-cream-light rounded-xl border border-emerald-deep/5">
                <p className="text-lg text-charcoal-muted">
                  No recurring programs currently scheduled.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allPrograms.map((program, index) => (
                <ScrollReveal key={program.id} delay={((index % 3) + 1) as 1 | 2 | 3}>
                  <ProgramCard event={program} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
