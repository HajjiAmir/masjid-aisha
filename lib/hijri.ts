/**
 * hijri.ts — Hijri (Islamic) calendar conversion and significant dates.
 *
 * Uses the built-in Intl.DateTimeFormat with the Umm al-Qura calendar
 * (islamic-umalqura) for all Gregorian→Hijri conversion. No external
 * dependencies required.
 *
 * All date derivation uses America/New_York as the source of truth,
 * consistent with prayer times, hadith, and events.
 */

import { MASJID_CONFIG } from './prayerConfig';

/* ─── Month name mapping ─── */

/**
 * Map from Intl's Unicode transliteration to conventional English.
 * Intl returns names like "Rabiʻ I", "Dhuʻl-Hijjah", etc.
 */
const INTL_TO_ENGLISH: Record<string, string> = {
  'Muharram': 'Muharram',
  'Safar': 'Safar',
  'Rabiʻ I': "Rabi' al-Awwal",
  'Rabiʻ II': "Rabi' al-Thani",
  'Jumada I': 'Jumada al-Ula',
  'Jumada II': 'Jumada al-Thani',
  'Rajab': 'Rajab',
  'Shaʻban': "Sha'ban",
  'Ramadan': 'Ramadan',
  'Shawwal': 'Shawwal',
  'Dhuʻl-Qiʻdah': "Dhul-Qi'dah",
  'Dhuʻl-Hijjah': 'Dhul-Hijjah',
};

/* ─── Moon-sighting disclaimer ─── */

export const MOON_SIGHTING_DISCLAIMER =
  'Dates are estimates based on the Umm al-Qura calendar and may shift by a day depending on moon sighting. Confirm with the masjid.';

/* ─── Types ─── */

export interface HijriDate {
  day: number;
  monthName: string;      // English transliteration (e.g. "Rabi' al-Awwal")
  monthNameIntl: string;   // Raw Intl name for matching (e.g. "Rabiʻ I")
  year: number;
  era: 'AH';
  formatted: string;       // e.g. "2 Rabi' al-Awwal 1448 AH"
}

export interface IslamicDate {
  name: string;            // e.g. "Eid al-Fitr"
  description: string;     // e.g. "1 Shawwal — End of Ramadan"
  hijriDate: string;       // e.g. "1 Shawwal 1448 AH"
  gregorianISO: string;    // e.g. "2027-03-10"
  daysUntil: number;
}

export interface RamadanStatus {
  inRamadan: boolean;
  dayOfRamadan?: number;
  daysUntilRamadan?: number;
}

/* ─── Internal helpers ─── */

const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * Get today's date string in Eastern time (YYYY-MM-DD).
 * Reuses the same pattern as prayerTimes/events/hadith.
 */
function getEasternToday(): string {
  return new Date().toLocaleDateString('en-CA', {
    timeZone: MASJID_CONFIG.timezone,
  });
}

/**
 * Convert a Gregorian ISO date string to a UTC Date at noon
 * (noon avoids any edge-case DST issues).
 */
function isoToUTCNoon(dateISO: string): Date {
  const [y, m, d] = dateISO.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
}

/**
 * Get Hijri date parts from a UTC Date object.
 */
function getHijriParts(date: Date): { day: number; monthIntl: string; year: number } {
  const parts = hijriFormatter.formatToParts(date);
  const day = Number(parts.find(p => p.type === 'day')?.value ?? '0');
  const monthIntl = parts.find(p => p.type === 'month')?.value ?? '';
  const year = Number(parts.find(p => p.type === 'year')?.value ?? '0');
  return { day, monthIntl, year };
}

/**
 * Map an Intl month name to the conventional English transliteration.
 */
function mapMonthName(intlName: string): string {
  return INTL_TO_ENGLISH[intlName] ?? intlName;
}

/* ─── Public API ─── */

/**
 * Get today's Hijri date (derived from Eastern today).
 */
export function getTodaysHijri(todayOverride?: string): HijriDate {
  const todayISO = todayOverride ?? getEasternToday();
  return getHijriForDate(todayISO);
}

/**
 * Convert any Gregorian ISO date string to a HijriDate.
 */
export function getHijriForDate(dateISO: string): HijriDate {
  const date = isoToUTCNoon(dateISO);
  const { day, monthIntl, year } = getHijriParts(date);
  const monthName = mapMonthName(monthIntl);
  return {
    day,
    monthName,
    monthNameIntl: monthIntl,
    year,
    era: 'AH',
    formatted: `${day} ${monthName} ${year} AH`,
  };
}

/**
 * Significant Islamic dates to search for.
 * Each entry: [hijriDay, intlMonthName, eventName, description]
 */
const SIGNIFICANT_DATES: [number, string, string, string][] = [
  [1, 'Ramadan', 'Ramadan Begins', '1 Ramadan — Start of the month of fasting'],
  [1, 'Shawwal', 'Eid al-Fitr', '1 Shawwal — End of Ramadan'],
  [8, 'Dhuʻl-Hijjah', 'Hajj Begins', '8 Dhul-Hijjah — Start of the Hajj pilgrimage'],
  [9, 'Dhuʻl-Hijjah', 'Day of Arafah', '9 Dhul-Hijjah — Day of Arafah'],
  [10, 'Dhuʻl-Hijjah', 'Eid al-Adha', '10 Dhul-Hijjah — Festival of Sacrifice'],
  [1, 'Muharram', 'Islamic New Year', '1 Muharram — Start of the new Islamic year'],
  [10, 'Muharram', 'Ashura', '10 Muharram — Day of Ashura'],
  [15, 'Shaʻban', "Laylat al-Bara'ah", "15 Sha'ban — Night of Salvation (observed by some)"],
];

/**
 * Get upcoming significant Islamic dates by scanning forward from today.
 * Scans up to 400 days to find each target date.
 */
export function getUpcomingIslamicDates(todayOverride?: string): IslamicDate[] {
  const todayISO = todayOverride ?? getEasternToday();
  const startDate = isoToUTCNoon(todayISO);

  // Track which dates we've found
  const found = new Map<string, IslamicDate>();
  const targetKeys = new Set(SIGNIFICANT_DATES.map(([d, m]) => `${d}-${m}`));

  for (let offset = 0; offset < 400; offset++) {
    const scanDate = new Date(startDate.getTime() + offset * 86400000);
    const { day, monthIntl, year } = getHijriParts(scanDate);
    const key = `${day}-${monthIntl}`;

    if (targetKeys.has(key) && !found.has(key)) {
      const entry = SIGNIFICANT_DATES.find(([d, m]) => d === day && m === monthIntl);
      if (entry) {
        const [, , name, description] = entry;
        const monthEnglish = mapMonthName(monthIntl);
        const gregorianISO = scanDate.toISOString().slice(0, 10);
        found.set(key, {
          name,
          description,
          hijriDate: `${day} ${monthEnglish} ${year} AH`,
          gregorianISO,
          daysUntil: offset,
        });
      }
    }

    // Stop early if all found
    if (found.size === SIGNIFICANT_DATES.length) break;
  }

  // Sort by daysUntil (soonest first)
  return Array.from(found.values()).sort((a, b) => a.daysUntil - b.daysUntil);
}

/**
 * Get the current Ramadan status: are we in Ramadan, and if not, how many days until?
 */
export function getRamadanStatus(todayOverride?: string): RamadanStatus {
  const todayISO = todayOverride ?? getEasternToday();
  const todayDate = isoToUTCNoon(todayISO);
  const { day, monthIntl } = getHijriParts(todayDate);

  if (monthIntl === 'Ramadan') {
    return {
      inRamadan: true,
      dayOfRamadan: day,
    };
  }

  // Scan forward to find 1 Ramadan
  for (let offset = 1; offset < 400; offset++) {
    const scanDate = new Date(todayDate.getTime() + offset * 86400000);
    const parts = getHijriParts(scanDate);
    if (parts.day === 1 && parts.monthIntl === 'Ramadan') {
      return {
        inRamadan: false,
        daysUntilRamadan: offset,
      };
    }
  }

  return { inRamadan: false, daysUntilRamadan: undefined };
}
