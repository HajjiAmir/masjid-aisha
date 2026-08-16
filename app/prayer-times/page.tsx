import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import GeometricPattern from "@/components/GeometricPattern";

const TodayPrayerTable = dynamic(
  () => import("@/components/prayer-times/TodayPrayerTable"),
  { ssr: true }
);

const MonthlyPrayerTable = dynamic(
  () => import("@/components/prayer-times/MonthlyPrayerTable"),
  { ssr: true }
);

const IslamicCalendarBlock = dynamic(
  () => import("@/components/prayer-times/IslamicCalendarBlock"),
  { ssr: true }
);

export const metadata = {
  title: "Prayer Times | Islamic Center of Lynchburg",
  description:
    "Daily and monthly prayer times for the Islamic Center of Lynchburg Virginia (Masjid Aisha). Astronomically calculated for Lynchburg, VA using the ISNA method.",
};

export default function PrayerTimesPage() {
  return (
    <main>
      {/* Hero section — matching homepage design language */}
      <section className="relative py-16 sm:py-32 bg-emerald-deep overflow-hidden">
        <GeometricPattern />
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-deep/90 via-emerald-deep/70 to-emerald-deep/95"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="hidden md:block font-arabic text-gold/60 text-lg mb-4 tracking-widest">
            أوقات الصلاة
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-cream-light tracking-tight leading-tight mb-4">
            Prayer Times
          </h1>
          <p className="text-cream-light/70 text-base sm:text-lg max-w-xl mx-auto">
            Astronomically calculated for Lynchburg, Virginia
          </p>
        </div>
        {/* Bottom gradient fade to cream */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-light to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Today's prayer table */}
      <section className="relative -mt-8 z-20 mx-auto max-w-3xl px-4 sm:px-6">
        <ScrollReveal>
          <TodayPrayerTable />
        </ScrollReveal>
      </section>

      {/* Islamic Calendar — mobile only */}
      <section className="md:hidden mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
        <IslamicCalendarBlock />
      </section>

      {/* Monthly table */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <ScrollReveal delay={2}>
          <MonthlyPrayerTable />
        </ScrollReveal>
      </section>

      {/* Info note */}
      <section className="mx-auto max-w-3xl px-6 pb-16 text-center">
        <ScrollReveal delay={3}>
          <p className="text-charcoal-muted text-sm leading-relaxed">
            Times calculated for Lynchburg, VA (37.41°N, 79.14°W) using the
            ISNA method (Fajr 15°, Isha 15°) with Shafi madhab for Asr.
            All times are displayed in Eastern Time regardless of your
            location. Iqamah times are set by the masjid and will be updated
            when confirmed.
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}
