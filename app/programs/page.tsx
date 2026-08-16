import Link from "next/link";
import GeometricPattern from "@/components/GeometricPattern";
import ScrollReveal from "@/components/ScrollReveal";
import InquiryForm from "@/components/programs/InquiryForm";
import { PROGRAMS } from "@/lib/programsData";

export const metadata = {
  title: "Programs | Islamic Center of Lynchburg",
  description:
    "Standing services at the Islamic Center of Lynchburg Virginia (Masjid Aisha): learn about Islam, new Muslim support, marriage services, and youth education.",
};

/* ─── Program Icon Components ─── */
function DawahIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function HeartIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function RingsIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
  );
}

function YouthIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

const ICON_MAP: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  dawah: DawahIcon,
  newmuslim: HeartIcon,
  marriage: RingsIcon,
  youth: YouthIcon,
};

export default function ProgramsPage() {
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
            Programs
          </h1>
          <p className="text-cream-light/70 text-base sm:text-lg max-w-xl mx-auto">
            Standing services for the community
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-light to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════════════════
          2. PROGRAM CARDS
          ════════════════════════════════════════════════════ */}
      <div className="bg-cream-light">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
          {/* Sample data notice */}
          <ScrollReveal>
            <div className="mb-10 text-center">
              <p className="text-charcoal-muted/60 italic text-xs border-l-2 border-gold/30 pl-4 py-1 inline-block text-left">
                Programs shown are sample entries for demonstration. Actual
                offerings will be provided by the masjid.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {PROGRAMS.map((program, index) => {
              const IconComponent = ICON_MAP[program.icon] || DawahIcon;
              const isEmeraldBg = index % 2 === 0;

              return (
                <ScrollReveal key={program.id} delay={Math.min(index, 4) as 0 | 1 | 2 | 3 | 4}>
                  <section
                    id={program.slug}
                    className={`rounded-2xl overflow-hidden shadow-lg ${
                      isEmeraldBg
                        ? "bg-emerald-deep text-cream-light"
                        : "bg-white border border-emerald-deep/10"
                    }`}
                  >
                    {/* Card header */}
                    <div className={`p-6 sm:p-8 ${isEmeraldBg ? "" : ""}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                            isEmeraldBg
                              ? "bg-gold/15 border border-gold/25 text-gold"
                              : "bg-emerald-deep/10 text-emerald-deep"
                          }`}
                        >
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <div>
                          <p
                            className={`font-arabic text-xs tracking-widest mb-1 ${
                              isEmeraldBg ? "text-gold/60" : "text-gold"
                            }`}
                          >
                            {program.arabicTitle}
                          </p>
                          <h2
                            className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                              isEmeraldBg ? "text-cream-light" : "text-emerald-deep"
                            }`}
                          >
                            {program.title}
                          </h2>
                        </div>
                      </div>

                      <p
                        className={`leading-relaxed text-base mb-5 ${
                          isEmeraldBg
                            ? "text-cream-light/80"
                            : "text-charcoal-muted"
                        }`}
                      >
                        {program.description}
                      </p>

                      {/* What to expect */}
                      <div className="mb-6">
                        <h3
                          className={`text-sm font-semibold mb-3 ${
                            isEmeraldBg ? "text-gold" : "text-emerald-deep"
                          }`}
                        >
                          What to expect
                        </h3>
                        <ul className="space-y-2">
                          {program.whatToExpect.map((item, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-2.5 text-sm ${
                                isEmeraldBg
                                  ? "text-cream-light/70"
                                  : "text-charcoal-muted"
                              }`}
                            >
                              <svg
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isEmeraldBg ? "text-gold/60" : "text-gold"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sample data badge */}
                      {program.isSampleData && (
                        <p
                          className={`text-xs italic ${
                            isEmeraldBg
                              ? "text-cream-light/50"
                              : "text-charcoal-muted/30"
                          }`}
                        >
                          Sample program entry for demonstration
                        </p>
                      )}
                    </div>

                    {/* Inquire panel or link-out */}
                    <div
                      className={`px-6 sm:px-8 pb-6 sm:pb-8 pt-4 ${
                        isEmeraldBg
                          ? "border-t border-gold/10"
                          : "border-t border-emerald-deep/5"
                      }`}
                    >
                      {program.linkTo ? (
                        <div className="text-center py-4">
                          <Link
                            href={program.linkTo}
                            className={`inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-200 group ${
                              isEmeraldBg
                                ? "text-gold hover:text-gold-light"
                                : "text-emerald-deep hover:text-gold"
                            }`}
                          >
                            {program.linkLabel || "Learn More"}
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <h3
                            className={`font-serif text-lg font-semibold mb-4 ${
                              isEmeraldBg ? "text-cream-light" : "text-emerald-deep"
                            }`}
                          >
                            Inquire
                          </h3>
                          <div
                            className={`rounded-xl p-5 ${
                              isEmeraldBg
                                ? "bg-cream-light/95"
                                : "bg-cream-light"
                            }`}
                          >
                            <InquiryForm
                              programTitle={program.id}
                              showInterestSelect={program.icon === "dawah"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Cross-link to Events */}
          <ScrollReveal>
            <div className="text-center mt-12 pt-8 border-t border-emerald-deep/10">
              <p className="text-charcoal-muted text-sm mb-2">
                Looking for weekly classes and dated events?
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-emerald-deep font-semibold hover:text-gold transition-colors duration-200 group"
              >
                View Events &amp; Schedule
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
