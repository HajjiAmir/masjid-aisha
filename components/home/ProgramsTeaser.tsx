import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import GeometricPattern from "@/components/GeometricPattern";
import { PROGRAMS } from "@/lib/programsData";

/* ─── Program Icon Components ─── */
function DawahIcon() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function RingsIcon() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  dawah: <DawahIcon />,
  newmuslim: <HeartIcon />,
  marriage: <RingsIcon />,
};

export default function ProgramsTeaser() {
  // Show first 3 programs (not youth, which links to events)
  const featured = PROGRAMS.filter((p) => !p.linkTo).slice(0, 3);

  return (
    <section className="py-10 sm:py-24 bg-emerald-deep relative overflow-hidden">
      <div className="hidden md:block">
        <GeometricPattern />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-emerald-deep/95 to-emerald-deep/90"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="hidden md:block font-arabic text-gold/60 text-sm tracking-widest uppercase mb-3">
              خدماتنا
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-cream-light tracking-tight mb-3">
              Our Programs
            </h2>
            <p className="text-cream-light/60 text-sm max-w-md mx-auto">
              Standing services for the community — from learning about Islam to
              marriage assistance
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featured.map((program) => (
              <Link
                key={program.id}
                href={`/programs#${program.slug}`}
                className="group bg-emerald-deep/50 backdrop-blur-sm border border-gold/15 rounded-2xl p-6 text-center hover:border-gold/30 hover:bg-emerald-deep/60 transition-all duration-200 shadow-lg"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors duration-200">
                  {ICONS[program.icon] || <DawahIcon />}
                </div>
                <h3 className="font-serif text-lg font-semibold text-cream-light mb-2">
                  {program.title}
                </h3>
                <p className="text-cream-light/50 text-sm leading-relaxed line-clamp-2">
                  {program.description}
                </p>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="mt-8 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gold text-emerald-deep font-semibold text-sm hover:bg-gold-light transition-colors duration-200 shadow-lg shadow-gold/20"
            >
              View All Programs
              <svg
                className="w-4 h-4"
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
    </section>
  );
}
