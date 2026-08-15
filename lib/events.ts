/**
 * events.ts — Events & Programs data and filtering logic.
 * SAMPLE DATA — will be replaced with real events from the masjid.
 *
 * IMPORTANT: dateDisplay is DERIVED from dateISO at runtime.
 * Never store weekday strings — they must match the ISO date.
 */

import { MASJID_CONFIG } from './prayerConfig';

export interface MasjidEvent {
  id: string;
  title: string;
  dateISO: string;       // ISO date: "YYYY-MM-DD" — single source of truth
  time: string;          // e.g. "7:00 PM"
  description: string;
  category: 'event' | 'program';
  recurring?: string;    // e.g. "Weekly" for programs
  icon?: string;         // icon key for programs
  isSampleData: true;
}

/**
 * Derive a human-readable display date from an ISO date string.
 * e.g. "2026-09-11" → "Friday, September 11, 2026"
 *
 * Uses UTC to avoid timezone shifts altering the calendar date.
 */
export function formatDateISO(dateISO: string): string {
  const [y, m, d] = dateISO.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Get the abbreviated month and day number from an ISO date string.
 * e.g. "2026-09-11" → { month: "SEP", day: 11, weekday: "Fri" }
 */
export function parseDateParts(dateISO: string): {
  month: string;
  day: number;
  weekday: string;
} {
  const [y, m, d] = dateISO.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return {
    month: date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
    day: d,
    weekday: date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
  };
}

/**
 * Get days until an event from a reference date.
 */
export function daysUntil(dateISO: string, fromISO?: string): number {
  const from = fromISO ?? getEasternToday();
  const [fy, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = dateISO.split('-').map(Number);
  const fromDate = Date.UTC(fy, fm - 1, fd);
  const toDate = Date.UTC(ty, tm - 1, td);
  return Math.round((toDate - fromDate) / (1000 * 60 * 60 * 24));
}

// SAMPLE DATA — these are placeholder events for demo purposes only
export const SAMPLE_EVENTS: MasjidEvent[] = [
  {
    id: '1',
    title: 'Community Iftar Gathering',
    dateISO: '2026-09-06',
    time: '7:00 PM',
    description: 'Join us for a community iftar dinner. All are welcome.',
    category: 'event',
    isSampleData: true,
  },
  {
    id: '2',
    title: 'Youth Quran Study Circle',
    dateISO: '2026-09-14',
    time: '11:00 AM',
    description: 'Weekly Quran study session for youth ages 10–18.',
    category: 'program',
    recurring: 'Weekly',
    icon: 'book',
    isSampleData: true,
  },
  {
    id: '3',
    title: 'New Muslim Welcome Session',
    dateISO: '2026-09-20',
    time: '6:30 PM',
    description: 'A welcoming session for new members of the community.',
    category: 'event',
    isSampleData: true,
  },
  {
    id: '4',
    title: 'Sisters\' Halaqa',
    dateISO: '2026-09-21',
    time: '10:00 AM',
    description: 'A weekly gathering for sisters to study and discuss Islamic topics.',
    category: 'program',
    recurring: 'Weekly',
    icon: 'people',
    isSampleData: true,
  },
  {
    id: '5',
    title: 'Annual Fundraising Dinner',
    dateISO: '2026-10-04',
    time: '6:00 PM',
    description: 'Annual fundraising dinner to support masjid operations and community programs.',
    category: 'event',
    isSampleData: true,
  },
  {
    id: '6',
    title: 'Friday Night Family Program',
    dateISO: '2026-09-11',
    time: '7:30 PM',
    description: 'A family-friendly evening of learning, activities, and community bonding.',
    category: 'program',
    recurring: 'Weekly',
    icon: 'family',
    isSampleData: true,
  },
];

/**
 * Get today's date string in Eastern time (YYYY-MM-DD).
 */
function getEasternToday(): string {
  return new Date().toLocaleDateString('en-CA', {
    timeZone: MASJID_CONFIG.timezone,
  });
}

/**
 * Get upcoming events (events on or after Eastern "today"),
 * sorted by date ascending.
 */
export function getUpcomingEvents(today?: string): MasjidEvent[] {
  const todayStr = today ?? getEasternToday();
  return SAMPLE_EVENTS
    .filter(e => e.dateISO >= todayStr)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
}

/**
 * Get upcoming events by category.
 */
export function getUpcomingByCategory(today?: string): {
  events: MasjidEvent[];
  programs: MasjidEvent[];
} {
  const upcoming = getUpcomingEvents(today);
  return {
    events: upcoming.filter(e => e.category === 'event'),
    programs: upcoming.filter(e => e.category === 'program'),
  };
}
