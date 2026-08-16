import Link from "next/link";
import GeometricPattern from "@/components/GeometricPattern";

/**
 * HeroSection — Full-viewport hero with animated geometric background,
 * dark emerald gradient overlay, masjid name, and CTA.
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-[60dvh] md:min-h-[85dvh] flex items-center justify-center overflow-hidden bg-emerald-deep">
      {/* Animated geometric pattern background */}
      <GeometricPattern />

      {/* Dark gradient overlay for text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-emerald-deep/90 via-emerald-deep/70 to-emerald-deep/95"
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Decorative bismillah */}
        <p className="font-arabic text-gold/60 text-base sm:text-xl mb-6 tracking-widest">
          بسم الله الرحمن الرحيم
        </p>

        {/* Main heading */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream-light tracking-tight leading-tight mb-3">
          Islamic Center
          <span className="block text-gold mt-1">of Lynchburg</span>
        </h1>

        {/* Secondary name */}
        <p className="font-arabic text-gold-light/80 text-lg sm:text-2xl mb-2 tracking-wide">
          Masjid Aisha
        </p>

        {/* Location */}
        <p className="text-cream-light/60 text-sm sm:text-base font-medium tracking-widest uppercase mb-8">
          Lynchburg, Virginia
        </p>

        {/* Welcome line — warm, dignified, generic (no invented facts) */}
        <p className="text-cream-light/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          A place of prayer, learning, and community for all. We welcome you with open hearts.
        </p>

        {/* Primary CTA */}
        <Link
          href="/prayer-times"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold-light text-emerald-deep font-semibold text-sm sm:text-base rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-gold/25 active:scale-[0.98]"
        >
          View Prayer Times
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Bottom gradient fade to cream */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-light to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
