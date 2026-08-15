import Link from "next/link";
import GeometricPattern from "@/components/GeometricPattern";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/contact/ContactForm";
import CopyAddressButton from "@/components/contact/CopyAddressButton";

export const metadata = {
  title: "Contact | Islamic Center of Lynchburg",
  description:
    "Get in touch with the Islamic Center of Lynchburg Virginia (Masjid Aisha). Find our address, phone numbers, directions, and send us a message.",
};

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.5!2d-79.14!3d37.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjMwOCAxMnRoIFN0!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus";

const MAP_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=2308+12th+St+Lynchburg+VA+24501";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=2308+12th+St+Lynchburg+VA+24501";

export default function ContactPage() {
  return (
    <main>
      {/* ════════════════════════════════════════════════════
          1. HERO HEADER (compact)
          ════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-24 bg-emerald-deep overflow-hidden">
        <GeometricPattern />
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-deep/90 via-emerald-deep/70 to-emerald-deep/95"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="font-arabic text-gold/60 text-lg mb-4 tracking-widest">
            تواصل معنا
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream-light tracking-tight leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-cream-light/70 text-base sm:text-lg max-w-xl mx-auto">
            We welcome your questions, visits, and community
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. MAP HERO — large, prominent, directly under header
          ════════════════════════════════════════════════════ */}
      <section className="bg-emerald-deep">
        <div className="mx-auto max-w-6xl px-0 sm:px-6">
          {/* Map container */}
          <div className="relative rounded-none sm:rounded-2xl overflow-hidden shadow-2xl shadow-emerald-deep/30 border-0 sm:border border-gold/10 bg-emerald-deep/40">
            <iframe
              title="Map showing the Islamic Center of Lynchburg at 2308 12th St, Lynchburg, VA 24501"
              src={MAP_EMBED_URL}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[280px] sm:h-[380px] md:h-[450px]"
            />
            <noscript>
              <div className="p-8 text-center">
                <p className="text-cream-light/70 text-sm mb-3">
                  Map could not be loaded.
                </p>
                <a
                  href={MAP_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold font-medium hover:text-gold-light transition-colors duration-200"
                >
                  View on Google Maps →
                </a>
              </div>
            </noscript>
          </div>

          {/* Fallback link */}
          <div className="mt-2 text-center">
            <a
              href={MAP_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-light/60 text-xs hover:text-gold transition-colors duration-200"
            >
              Can&apos;t see the map? Open in Google Maps →
            </a>
          </div>

          {/* Get Directions — full prominence */}
          <div className="mt-5 pb-10 text-center">
            <a
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl bg-gold text-emerald-deep font-bold text-base hover:bg-gold-light transition-colors duration-200 shadow-xl shadow-gold/25"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. CONTACT ACTION TILES — large, tappable
          ════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-cream-light">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <div className="space-y-4">
              {/* Call/Text — FIRST and most prominent */}
              <div className="flex items-center gap-5 p-5 sm:p-6 bg-white/80 border border-emerald-deep/10 rounded-2xl shadow-sm">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-emerald-deep flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-cream-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg sm:text-xl font-semibold text-emerald-deep mb-0.5">
                    Call / Text
                  </h2>
                  <a href="tel:3137698647" className="text-emerald-deep font-bold text-xl sm:text-2xl tabular-nums hover:text-gold transition-colors duration-200">
                    313-769-8647
                  </a>
                  <div className="flex flex-wrap gap-x-4 mt-1.5">
                    <a href="tel:4342485756" className="text-charcoal-muted text-sm hover:text-gold transition-colors duration-200">
                      434-248-5756
                    </a>
                    <a href="tel:4346609438" className="text-charcoal-muted text-sm hover:text-gold transition-colors duration-200">
                      434-660-9438
                    </a>
                  </div>
                </div>
              </div>

              {/* Visit — address */}
              <div className="flex items-center gap-5 p-5 sm:p-6 bg-white/80 border border-emerald-deep/10 rounded-2xl shadow-sm">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-emerald-deep/10 flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg sm:text-xl font-semibold text-emerald-deep mb-0.5">
                    Visit
                  </h2>
                  <address className="not-italic text-charcoal-muted text-base leading-snug">
                    2308 12th St, Lynchburg, VA 24501
                  </address>
                  <CopyAddressButton />
                </div>
              </div>

              {/* Email — placeholder */}
              <div className="flex items-center gap-5 p-5 sm:p-6 bg-white/80 border border-emerald-deep/10 rounded-2xl shadow-sm">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-emerald-deep/10 flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg sm:text-xl font-semibold text-emerald-deep mb-0.5">
                    Email
                  </h2>
                  <p className="text-charcoal-muted/40 italic text-sm">
                    [EMAIL_TBD]
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. JUMU'AH VISITOR NOTE — gold-accented callout band
          ════════════════════════════════════════════════════ */}
      <section className="py-0">
        <div className="bg-gold/10 border-y border-gold/20">
          <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
            <ScrollReveal>
              <div className="flex items-start gap-5">
                {/* Gold crescent icon */}
                <div className="w-14 h-14 rounded-full bg-gold/15 border-2 border-gold/30 flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 text-gold" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.25a.75.75 0 01.472.167A9.72 9.72 0 0117.25 12a9.72 9.72 0 01-4.778 9.583.75.75 0 01-.944-1.024A8.22 8.22 0 0014.25 12a8.22 8.22 0 00-2.722-8.559A.75.75 0 0112 2.25z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-emerald-deep mb-3">
                    Joining Us for Jumu&apos;ah?
                  </h2>
                  <p className="text-charcoal-muted leading-relaxed mb-3">
                    Friday prayer (Jumu&apos;ah) is at{" "}
                    <span className="font-semibold text-emerald-deep">
                      2:00 PM
                    </span>
                    . Please confirm the current time with the masjid, as it may
                    adjust seasonally.
                  </p>
                  <p className="text-charcoal-muted leading-relaxed mb-4">
                    First-time visitors are warmly welcome. Come as you are — we
                    are glad to have you.
                  </p>
                  <p className="text-charcoal-muted/40 italic text-sm border-l-2 border-gold/30 pl-4 py-1">
                    [Visitor information — parking, entrance, wudu facilities —
                    to be provided by the masjid]
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/prayer-times"
                      className="inline-flex items-center gap-2 text-emerald-deep font-semibold text-sm hover:text-gold transition-colors duration-200 group"
                    >
                      View Full Prayer Schedule
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
          5. CONTACT FORM — Honest Demo Mode (unchanged logic)
          ════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-emerald-deep relative overflow-hidden">
        <GeometricPattern />
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-deep/95 to-emerald-deep/90"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-xl px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-light tracking-tight mb-2">
                Send Us a Message
              </h2>
              <p className="text-cream-light/60 text-sm">
                We&apos;d love to hear from you
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="bg-cream-light/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl shadow-emerald-deep/20">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
