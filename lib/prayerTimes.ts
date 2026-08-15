/**
 * prayerTimes.ts — Astronomically-calculated prayer times for the Islamic Center
 * of Lynchburg Virginia (Masjid Aisha), powered by the `adhan` library.
 *
 * PUBLIC INTERFACE (unchanged from Brief #1 — homepage PrayerTimesCard depends on it):
 *   - PrayerTime, PrayerSchedule interfaces
 *   - getTodaysPrayerTimes(): PrayerSchedule
 *   - getNextPrayer(): { prayer: PrayerTime; remainingMs: number } | null
 *
 * NEW EXPORTS (for /prayer-times page):
 *   - getPrayerTimesForDate(date: Date): FullDayPrayerData
 *   - getMonthlyPrayerTimes(year: number, month: number): MonthlyPrayerData
 *   - FullDayPrayerData, MonthlyPrayerData, MonthDayEntry interfaces
 *   - getEasternToday(): Date
 */

import {
  Coordinates,
  PrayerTimes as AdhanPrayerTimes,
  Prayer,
  CalculationParameters,
} from "adhan";
import { MASJID_CONFIG } from "./prayerConfig";

// ---------------------------------------------------------------------------
// Types — original public interface preserved
// ---------------------------------------------------------------------------

export interface PrayerTime {
  name: string;
  nameAr: string;
  time: string; // HH:MM format (24h)
  displayTime: string; // formatted for display (12h)
}

export interface PrayerSchedule {
  prayers: PrayerTime[];
  jumuah: string;
  date: string;
}

// ---------------------------------------------------------------------------
// New types — for the /prayer-times page
// ---------------------------------------------------------------------------

export interface FullDayPrayerData {
  schedule: PrayerSchedule;
  sunrise: PrayerTime; // Shurooq — not a salah, but shown in the table
}

export interface MonthDayEntry {
  day: number;
  dayOfWeek: string; // e.g. "Fri"
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  isToday: boolean;
}

export interface MonthlyPrayerData {
  year: number;
  month: number; // 0-indexed (JS convention)
  monthName: string;
  days: MonthDayEntry[];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Build adhan CalculationParameters from config. */
function getParams(): CalculationParameters {
  const params = MASJID_CONFIG.calculationMethod();
  params.madhab = MASJID_CONFIG.madhab;
  return params;
}

/**
 * Get the current calendar date in America/New_York, regardless of the
 * visitor's device timezone. This is the authoritative "today" for all
 * prayer-time logic: schedule display, monthly-table highlight, and
 * countdown day-boundary rollover.
 */
export function getEasternToday(): Date {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-CA", {
    timeZone: MASJID_CONFIG.timezone,
  }); // "YYYY-MM-DD"
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Get the current Eastern date components (year, month 0-indexed, day).
 */
export function getEasternDateParts(): {
  year: number;
  month: number;
  day: number;
} {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MASJID_CONFIG.timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);

  let year = 0,
    month = 0,
    day = 0;
  for (const p of parts) {
    if (p.type === "year") year = Number(p.value);
    if (p.type === "month") month = Number(p.value) - 1; // 0-indexed
    if (p.type === "day") day = Number(p.value);
  }
  return { year, month, day };
}

/** Format a Date to 12-hour display in Eastern time, e.g. "5:12 AM". */
function formatTime12h(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: MASJID_CONFIG.timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/** Format a Date to 24-hour HH:MM in Eastern time. */
function formatTime24h(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: MASJID_CONFIG.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/** Arabic names for each prayer. */
const ARABIC_NAMES: Record<string, string> = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

/** Convert an adhan Date result into our PrayerTime interface. */
function toPrayerTime(name: string, date: Date): PrayerTime {
  return {
    name,
    nameAr: ARABIC_NAMES[name] || "",
    time: formatTime24h(date),
    displayTime: formatTime12h(date),
  };
}

/** Build a PrayerTimes instance for a given calendar date. */
function computeForDate(calendarDate: Date): AdhanPrayerTimes {
  return new AdhanPrayerTimes(
    MASJID_CONFIG.coordinates,
    calendarDate,
    getParams()
  );
}

// ---------------------------------------------------------------------------
// Public API — original interface (homepage PrayerTimesCard depends on these)
// ---------------------------------------------------------------------------

/**
 * Get today's prayer schedule. "Today" is derived from the current instant
 * in America/New_York, NOT the visitor's device-local date.
 */
export function getTodaysPrayerTimes(): PrayerSchedule {
  const today = getEasternToday();
  const pt = computeForDate(today);

  const prayers: PrayerTime[] = [
    toPrayerTime("Fajr", pt.fajr),
    toPrayerTime("Dhuhr", pt.dhuhr),
    toPrayerTime("Asr", pt.asr),
    toPrayerTime("Maghrib", pt.maghrib),
    toPrayerTime("Isha", pt.isha),
  ];

  const dateFormatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    prayers,
    jumuah: MASJID_CONFIG.jumuahTime,
    date: dateFormatted,
  };
}

/**
 * Get the next upcoming prayer and milliseconds remaining.
 * After Isha, rolls over to tomorrow's Fajr (tomorrow in Eastern time).
 * Compares against the current real UTC instant, NOT device-local time.
 */
export function getNextPrayer(): {
  prayer: PrayerTime;
  remainingMs: number;
} | null {
  const now = new Date();
  const today = getEasternToday();
  const pt = computeForDate(today);

  const next = pt.nextPrayer(now);

  // If nextPrayer returns 'none', all prayers for today have passed → Fajr tomorrow
  if (next === Prayer.None) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const ptTomorrow = computeForDate(tomorrow);
    const fajrTime = ptTomorrow.fajr;
    return {
      prayer: toPrayerTime("Fajr", fajrTime),
      remainingMs: Math.max(0, fajrTime.getTime() - now.getTime()),
    };
  }

  // Skip Sunrise — it's not a prayer with iqamah
  if (next === Prayer.Sunrise) {
    // Find the next actual prayer after sunrise (Dhuhr)
    const dhuhrTime = pt.dhuhr;
    return {
      prayer: toPrayerTime("Dhuhr", dhuhrTime),
      remainingMs: Math.max(0, dhuhrTime.getTime() - now.getTime()),
    };
  }

  const nextTime = pt.timeForPrayer(next);
  if (!nextTime) return null;

  const prayerNames: Record<string, string> = {
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
  };

  const name = prayerNames[next] || next;
  return {
    prayer: toPrayerTime(name, nextTime),
    remainingMs: Math.max(0, nextTime.getTime() - now.getTime()),
  };
}

// ---------------------------------------------------------------------------
// New API — for the /prayer-times page
// ---------------------------------------------------------------------------

/**
 * Get the full day prayer data for any date, including Sunrise.
 */
export function getPrayerTimesForDate(calendarDate: Date): FullDayPrayerData {
  const pt = computeForDate(calendarDate);

  const prayers: PrayerTime[] = [
    toPrayerTime("Fajr", pt.fajr),
    toPrayerTime("Dhuhr", pt.dhuhr),
    toPrayerTime("Asr", pt.asr),
    toPrayerTime("Maghrib", pt.maghrib),
    toPrayerTime("Isha", pt.isha),
  ];

  const dateFormatted = calendarDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    schedule: {
      prayers,
      jumuah: MASJID_CONFIG.jumuahTime,
      date: dateFormatted,
    },
    sunrise: toPrayerTime("Sunrise", pt.sunrise),
  };
}

/**
 * Get a full month of prayer times for the monthly table.
 * "Today" highlight is derived from America/New_York, not device time.
 */
export function getMonthlyPrayerTimes(
  year: number,
  month: number
): MonthlyPrayerData {
  const { day: easternDay, month: easternMonth, year: easternYear } = getEasternDateParts();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: MonthDayEntry[] = [];

  const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const pt = computeForDate(date);

    days.push({
      day: d,
      dayOfWeek: dayFormatter.format(date),
      fajr: formatTime12h(pt.fajr),
      sunrise: formatTime12h(pt.sunrise),
      dhuhr: formatTime12h(pt.dhuhr),
      asr: formatTime12h(pt.asr),
      maghrib: formatTime12h(pt.maghrib),
      isha: formatTime12h(pt.isha),
      isToday:
        year === easternYear && month === easternMonth && d === easternDay,
    });
  }

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(year, month, 1)
  );

  return {
    year,
    month,
    monthName,
    days,
  };
}
