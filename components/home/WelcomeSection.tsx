import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * WelcomeSection — Community welcome teaser with real interior photo.
 * Contains [ABOUT_TEXT_TBD] marker for future content replacement.
 */
export default function WelcomeSection() {
  return (
    <section className="py-12 sm:py-28 bg-cream-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <ScrollReveal>
            <div>
              <p className="hidden md:block font-arabic text-gold text-sm tracking-widest uppercase mb-3">
                أهلاً وسهلاً
              </p>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-emerald-deep tracking-tight mb-6">
                Welcome to Our Community
              </h2>
              {/* [ABOUT_TEXT_TBD] — Replace with real about text when available */}
              <div className="space-y-4 text-charcoal-muted leading-relaxed">
                <p>
                  The Islamic Center of Lynchburg serves as a spiritual home for
                  Muslims in the Lynchburg area. We are a welcoming and diverse
                  community united by faith, service, and a shared commitment to
                  one another.
                </p>
                <p>
                  Whether you are a long-time resident or new to the area, we
                  invite you to join us for daily prayers, community gatherings,
                  and educational programs.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-emerald-deep font-semibold hover:text-gold transition-colors duration-200 group"
              >
                Learn More About Us
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          {/* Real interior photo */}
          <ScrollReveal delay={2}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-emerald-deep/15">
              <Image
                src="/images/community-meal-setup.jpg"
                alt="Community meal setup in the prayer hall at the Islamic Center of Lynchburg"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle gradient overlay at bottom for depth */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-deep/20 to-transparent"
                aria-hidden="true"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
