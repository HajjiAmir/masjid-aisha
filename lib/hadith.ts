/**
 * hadith.ts — Hadith of the Day selection logic.
 *
 * Selects one hadith per day from the Nawawi collection based on
 * Eastern (America/New_York) day-of-year, modulo collection length.
 *
 * Deterministic: same hadith for all visitors on a given date,
 * advancing at midnight Eastern.
 */

import { NAWAWI_COLLECTION, type NawawiHadith } from "./hadithData";
import { MASJID_CONFIG } from "./prayerConfig";

export type { NawawiHadith } from "./hadithData";

/**
 * Get today's date string in Eastern time (YYYY-MM-DD).
 * Reuses the same timezone logic as prayer times.
 */
function getEasternDateString(): string {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: MASJID_CONFIG.timezone,
  });
}

/**
 * Compute the day-of-year (0-indexed) for a given YYYY-MM-DD string.
 * Jan 1 = 0, Jan 2 = 1, ..., Dec 31 = 364 or 365.
 */
function dayOfYear(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const startOfYear = new Date(year, 0, 1);
  const diffMs = date.getTime() - startOfYear.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Get the hadith for a specific date string (YYYY-MM-DD).
 * Pure function — useful for testing.
 */
export function getHadithForDate(dateStr: string): NawawiHadith {
  const doy = dayOfYear(dateStr);
  const index = doy % NAWAWI_COLLECTION.length;
  return NAWAWI_COLLECTION[index];
}

/**
 * Get today's Hadith of the Day.
 * "Today" is derived from America/New_York timezone, not the visitor's
 * device-local date.
 */
export function getTodaysHadith(): NawawiHadith {
  const todayStr = getEasternDateString();
  return getHadithForDate(todayStr);
}
