import Image from "next/image";
import Link from "next/link";
import GeometricPattern from "@/components/GeometricPattern";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "About | Islamic Center of Lynchburg",
  description:
    "Learn about the Islamic Center of Lynchburg Virginia (Masjid Aisha), a welcoming mosque serving the Muslim community of Lynchburg and the surrounding area.",
};

/* ─── Placeholder Treatment Component ─── */
function PlaceholderText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-charcoal-muted/50 italic text-sm leading-relaxed border-l-2 border-gold/30 pl-4 py-2">
      {children}
    </p>
  );
}

function PlaceholderTextLight({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-cream-light/40 italic text-sm leading-relaxed border-l-2 border-gold/30 pl-4 py-2">
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* ════════════════════════════════════════════════════
          1. HERO HEADER
          ════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-32 bg-emerald-deep overflow-hidden">
        <GeometricPattern />
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-deep/90 via-emerald-deep/70 to-emerald-deep/95"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="hidden md:block font-arabic text-gold/60 text-lg mb-4 tracking-widest">
            بسم الله الرحمن الرحيم
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-cream-light tracking-tight leading-tight mb-4">
            About Us
          </h1>
          <p className="text-cream-light/70 text-base sm:text-lg max-w-xl mx-auto">
            The Islamic Center of Lynchburg Virginia
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-transparent to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════════════════
          2. PHOTO BAND + MISSION / WELCOME (imagery first)
          ════════════════════════════════════════════════════ */}
      <section className="relative bg-emerald-deep overflow-hidden">
        {/* Full-width photo with overlay */}
        <div className="relative h-[220px] sm:h-[320px] md:h-[480px]">
          <Image
            src="/images/prayer-hall-decorated.jpg"
            alt="Prayer hall at the Islamic Center of Lynchburg with festive decorations"
            fill
            className="object-cover"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/60 via-emerald-deep/40 to-emerald-deep/90" />
          {/* Mission text overlaid */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full pb-10 sm:pb-14 px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="hidden md:block font-arabic text-gold/70 text-sm tracking-widest uppercase mb-3">
                  أهلاً وسهلاً
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-cream-light tracking-tight mb-4 drop-shadow-lg">
                  Welcome
                </h2>
                <p className="text-cream-light/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  The Islamic Center of Lynchburg Virginia, also known as Masjid
                  Aisha, is a house of prayer and community serving Muslims in
                  the Lynchburg area.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom fade to cream */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream-light to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Extended welcome copy — cream band */}
      <section className="py-10 sm:py-20 bg-cream-light">
        <div className="mx-auto max-w-2xl px-6">
          <ScrollReveal>
            <div className="text-center space-y-4 text-charcoal-muted leading-relaxed text-base sm:text-lg">
              <p>
                Whether you are a long-time member of the community, new to the
                area, or a neighbor interested in learning more, you are always
                welcome here.
              </p>
              <p>
                We invite you to visit us for daily prayers, community
                gatherings, and to experience the warmth of our congregation.
              </p>
            </div>
            {/* Inline link to /contact replacing full contact block */}
            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-emerald-deep font-semibold hover:text-gold transition-colors duration-200 group"
              >
                Planning a visit? Find directions and contact details
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gold decorative rule */}
      <div className="hidden md:flex justify-center bg-cream-light" aria-hidden="true">
        <div className="w-24 h-px bg-gold/40" />
      </div>

      {/* ════════════════════════════════════════════════════
          3. OUR STORY — emerald band with placeholder
          ════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-emerald-deep relative overflow-hidden">
        <div className="hidden md:block">
          <GeometricPattern />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-deep/95 to-emerald-deep/90"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="hidden md:block font-arabic text-gold/60 text-sm tracking-widest uppercase mb-3">
                قصتنا
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-light tracking-tight mb-6">
                Our Story
              </h2>
              <PlaceholderTextLight>
                This section will share the masjid&apos;s history, founding, and
                journey — provided by the community.
              </PlaceholderTextLight>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <PlaceholderTextLight>
              The masjid&apos;s history, milestones, and community growth will
              be shared here once provided by the board.
            </PlaceholderTextLight>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. LIFE AT THE MASJID — gallery grid (cream band)
          ════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-cream-light">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="hidden md:block font-arabic text-gold text-sm tracking-widest uppercase mb-3">
                حياة المسجد
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-deep tracking-tight">
                Life at the Masjid
              </h2>
            </div>
          </ScrollReveal>

          {/* Gold decorative rule */}
          <div className="hidden md:flex justify-center mb-10" aria-hidden="true">
            <div className="w-16 h-px bg-gold/40" />
          </div>

          <ScrollReveal delay={1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Photo 1 — current green carpet */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-emerald-deep/10 group">
                <Image
                  src="/images/prayer-hall-current.jpg"
                  alt="Inside the prayer hall"
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-deep/80 to-transparent p-3">
                  <p className="text-cream-light/90 text-xs sm:text-sm font-medium">
                    Inside the prayer hall
                  </p>
                </div>
              </div>

              {/* Photo 2 — prayer hall interior */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-emerald-deep/10 group">
                <Image
                  src="/images/prayer-hall-old-1.jpg"
                  alt="Inside the prayer hall"
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-deep/80 to-transparent p-3">
                  <p className="text-cream-light/90 text-xs sm:text-sm font-medium">
                    Inside the prayer hall
                  </p>
                </div>
              </div>

              {/* Photo 3 — masjid exterior */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-emerald-deep/10 group">
                <Image
                  src="/images/masjid-exterior-front.jpg"
                  alt="Masjid Aisha exterior"
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-deep/80 to-transparent p-3">
                  <p className="text-cream-light/90 text-xs sm:text-sm font-medium">
                    Masjid Aisha exterior
                  </p>
                </div>
              </div>

              {/* Photo 4 — community meal setup */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-emerald-deep/10 group">
                <Image
                  src="/images/community-meal-setup.jpg"
                  alt="Community meal setup"
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-deep/80 to-transparent p-3">
                  <p className="text-cream-light/90 text-xs sm:text-sm font-medium">
                    Community meal setup
                  </p>
                </div>
              </div>

              {/* Placeholder slot — extensible */}
              <div className="rounded-2xl border-2 border-dashed border-emerald-deep/15 h-48 sm:h-56 flex flex-col items-center justify-center p-4 text-center">
                <svg className="w-8 h-8 text-emerald-deep/20 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-charcoal-muted/35 italic text-xs leading-snug">
                  More photos coming from our community
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. LEADERSHIP & COMMUNITY — emerald band, gold accents
          ════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-emerald-deep relative overflow-hidden">
        <div className="hidden md:block">
          <GeometricPattern />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-deep/95 to-emerald-deep/90"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="hidden md:block font-arabic text-gold/60 text-sm tracking-widest uppercase mb-3">
                القيادة والمجتمع
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-light tracking-tight mb-4">
                Leadership &amp; Community
              </h2>
              {/* Gold decorative rule */}
              <div className="hidden md:flex justify-center mt-4 mb-6" aria-hidden="true">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              <PlaceholderTextLight>
                Leadership information will be provided by the masjid.
              </PlaceholderTextLight>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Imam placeholder card */}
              <div className="bg-emerald-deep/50 backdrop-blur-sm border border-gold/15 rounded-2xl p-8 text-center shadow-lg">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gold/5 border-2 border-dashed border-gold/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-cream-light mb-1">
                  Imam
                </h3>
                <p className="text-cream-light/40 italic text-sm">
                  [To be provided by the masjid]
                </p>
              </div>

              {/* Board placeholder card */}
              <div className="bg-emerald-deep/50 backdrop-blur-sm border border-gold/15 rounded-2xl p-8 text-center shadow-lg">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gold/5 border-2 border-dashed border-gold/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-cream-light mb-1">
                  Board of Directors
                </h3>
                <p className="text-cream-light/40 italic text-sm">
                  [To be provided by the masjid]
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. CTA BAND — cream band for contrast rhythm
          ════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-20 bg-cream-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            {/* Gold decorative rule */}
            <div className="hidden md:flex justify-center mb-8" aria-hidden="true">
              <div className="w-16 h-px bg-gold/40" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-deep tracking-tight mb-4">
              Join us for daily prayers
            </h2>
            <p className="text-charcoal-muted text-base mb-8 max-w-md mx-auto">
              Everyone is welcome at the Islamic Center of Lynchburg.
            </p>
            <Link
              href="/prayer-times"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-emerald-deep text-cream-light font-semibold text-sm hover:bg-emerald-deep/90 transition-colors duration-200 shadow-lg shadow-emerald-deep/20"
            >
              View Prayer Times
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
