import Link from "next/link";
import GeometricPattern from "@/components/GeometricPattern";
import ScrollReveal from "@/components/ScrollReveal";
import GivingPanel from "@/components/donate/GivingPanel";

export const metadata = {
  title: "Donate | Islamic Center of Lynchburg",
  description:
    "Support the Islamic Center of Lynchburg Virginia (Masjid Aisha) through your generous giving. Sadaqah, Zakat, and Masjid Operations.",
};

/*
 * Featured Hadith — sourced VERBATIM from lib/hadithData.ts, entry #25.
 * This is the full verified text from the An-Nawawi collection (Brief #4 pipeline).
 * The displayed excerpt below is character-exact from this source.
 */
const FEATURED_HADITH_FULL = `Also on the authority of Abu Dharr (may Allah be pleased with him): Some people from amongst the Companions of the Messenger of Allah (peace and blessings of Allah be upon him) said to the Prophet (peace and blessings of Allah be upon him), "O Messenger of Allah, the affluent have made off with the rewards; they pray as we pray, they fast as we fast, and they give [much] in charity by virtue of their wealth." He (peace and blessings of Allah be upon him) said, "Has not Allah made things for you to give in charity? Truly every tasbeehah [saying: 'subhan-Allah'] is a charity, and every takbeerah [saying: 'Allahu akbar'] is a charity, and every tahmeedah [saying: 'al-hamdu lillah'] is a charity, and every tahleelah [saying: 'laa ilaha illAllah'] is a charity. And commanding the good is a charity, and forbidding an evil is a charity, and in the bud\`i [sexual act] of each one of you there is a charity." They said, "O Messenger of Allah, when one of us fulfils his carnal desire will he have some reward for that?" He (peace and blessings of Allah be upon him) said, "Do you not see that if he were to act upon it [his desire] in an unlawful manner then he would be deserving of punishment? Likewise, if he were to act upon it in a lawful manner then he will be deserving of a reward." [Muslim]`;

/* The excerpt displayed on the page — character-exact substring of the full text */
const FEATURED_HADITH_EXCERPT = `"O Messenger of Allah, the affluent have made off with the rewards; they pray as we pray, they fast as we fast, and they give [much] in charity by virtue of their wealth." He (peace and blessings of Allah be upon him) said, "Has not Allah made things for you to give in charity? Truly every tasbeehah [saying: 'subhan-Allah'] is a charity, and every takbeerah [saying: 'Allahu akbar'] is a charity, and every tahmeedah [saying: 'al-hamdu lillah'] is a charity, and every tahleelah [saying: 'laa ilaha illAllah'] is a charity. And commanding the good is a charity, and forbidding an evil is a charity…"`;

export default function DonatePage() {
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
            Support Your Masjid
          </h1>
          <p className="text-cream-light/70 text-base sm:text-lg max-w-xl mx-auto">
            Your generosity sustains our community
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-light to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════════════════
          2. HADITH CENTERPIECE
          ════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-20 bg-cream-light">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <blockquote className="relative bg-white/80 border-l-4 border-gold rounded-r-2xl p-6 sm:p-8 shadow-sm">
              {/* Decorative opening quote */}
              <span
                className="absolute top-3 left-4 text-gold/20 text-6xl font-serif leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-charcoal-muted leading-relaxed text-base sm:text-lg relative z-10 pt-6 sm:pt-4">
                {FEATURED_HADITH_EXCERPT}
              </p>
              <footer className="mt-5 pt-4 border-t border-emerald-deep/10">
                <p className="text-emerald-deep/70 text-sm font-medium">
                  Excerpt from Hadith #25 — An-Nawawi&apos;s Forty Hadith
                </p>
                <p className="text-charcoal-muted/50 text-xs mt-0.5">
                  Narrated by Abu Dharr (may Allah be pleased with him) · [Muslim]
                </p>
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. GIVING PANEL
          ════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-20 bg-emerald-deep relative overflow-hidden">
        <div className="hidden md:block">
          <GeometricPattern />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-deep/95 to-emerald-deep/90"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-lg px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-light tracking-tight mb-2">
                Make a Gift
              </h2>
              <p className="text-cream-light/60 text-sm">
                Choose an amount, frequency, and fund
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="bg-cream-light/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl shadow-emerald-deep/20">
              <GivingPanel />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. "WHY GIVE" BAND
          ════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-20 bg-cream-light">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            {/* Gold rule */}
            <div className="hidden md:flex justify-center mb-8" aria-hidden="true">
              <div className="w-16 h-px bg-gold/40" />
            </div>
            <div className="text-center">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-deep tracking-tight mb-6">
                Why Your Support Matters
              </h2>
              <div className="space-y-4 text-charcoal-muted leading-relaxed text-base">
                <p>
                  Your contributions help sustain the masjid&apos;s daily
                  operations — from utilities and maintenance to community
                  programs and services.
                </p>
                <p>
                  Every gift, large or small, is an investment in a place of
                  prayer, learning, and community for Muslims in the Lynchburg
                  area.
                </p>
                <p>
                  May Allah accept your generosity and multiply its reward.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. OTHER WAYS TO GIVE
          ════════════════════════════════════════════════════ */}
      <section className="py-0">
        <div className="bg-gold/10 border-y border-gold/20">
          <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
            <ScrollReveal>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-gold/15 border-2 border-gold/30 flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-emerald-deep mb-3">
                    Other Ways to Give
                  </h2>
                  <p className="text-charcoal-muted leading-relaxed mb-3">
                    You are welcome to give in person at the masjid during any
                    prayer time, or reach out to arrange your contribution:
                  </p>
                  <div className="space-y-1.5">
                    <p>
                      <a
                        href="tel:3137698647"
                        className="text-emerald-deep font-semibold hover:text-gold transition-colors duration-200"
                      >
                        313-769-8647
                      </a>
                      <span className="text-charcoal-muted/50 text-sm ml-2">
                        Call / Text
                      </span>
                    </p>
                    <p>
                      <a
                        href="tel:4342485756"
                        className="text-charcoal-muted hover:text-gold transition-colors duration-200"
                      >
                        434-248-5756
                      </a>
                    </p>
                    <p>
                      <a
                        href="tel:4346609438"
                        className="text-charcoal-muted hover:text-gold transition-colors duration-200"
                      >
                        434-660-9438
                      </a>
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-emerald-deep font-semibold text-sm hover:text-gold transition-colors duration-200 group"
                    >
                      Contact the Masjid
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. ZAKAT NOTE
          ════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-cream-light">
        <div className="mx-auto max-w-2xl px-6">
          <ScrollReveal>
            <div className="bg-white/80 border border-emerald-deep/10 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-emerald-deep mb-3">
                Zakat &amp; Sadaqah
              </h3>
              <p className="text-charcoal-muted text-sm leading-relaxed mb-3">
                Zakat and sadaqah contributions can be designated separately
                using the fund selector in the giving panel above. Select
                &ldquo;Zakat&rdquo; to ensure your obligation is directed
                appropriately, or &ldquo;General Sadaqah&rdquo; for voluntary
                giving.
              </p>
              <p className="text-charcoal-muted/40 italic text-sm border-l-2 border-gold/30 pl-4 py-1">
                [Zakat distribution details to be provided by the masjid]
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
