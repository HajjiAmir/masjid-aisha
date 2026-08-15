/**
 * prayerConfig.ts — Single source of truth for prayer time calculation parameters.
 *
 * Change any of these values if the masjid board specifies different settings.
 * All prayer-time code reads from this config — no other file holds coordinates,
 * method, madhab, or timezone constants.
 */

import { Coordinates, CalculationMethod, Madhab } from "adhan";

export const MASJID_CONFIG = {
  /**
   * Lynchburg, VA city center coordinates.
   * Source: multiple references (whereig.com, time-ok.com, Wikipedia) all converge
   * on ≈37.4137°N, 79.1422°W for the city center.
   */
  coordinates: new Coordinates(37.4137, -79.1422),

  /**
   * ISNA (Islamic Society of North America) calculation method.
   * Fajr angle: 15°, Isha angle: 15°.
   * Standard for most North American masjids.
   *
   * In adhan, CalculationMethod.NorthAmerica() is the ISNA preset.
   */
  calculationMethod: CalculationMethod.NorthAmerica,

  /**
   * Shafi madhab for Asr calculation (shadow factor = 1×).
   * This is the standard/earlier Asr time.
   * Change to Madhab.Hanafi for a later Asr (shadow factor = 2×).
   */
  madhab: Madhab.Shafi,

  /**
   * All displayed times are in Lynchburg's timezone (Eastern),
   * regardless of the visitor's device timezone.
   * Handles EST ↔ EDT transitions automatically via Intl.
   */
  timezone: "America/New_York",

  /**
   * Jumu'ah time — hour confirmed from the masjid's prayer clock;
   * exact minutes unconfirmed.
   */
  jumuahTime: "2:00 PM", // [CONFIRM_MINUTES_WITH_MASJID]
} as const;
