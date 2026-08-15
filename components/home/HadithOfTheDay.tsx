"use client";

import { useState, useEffect } from "react";
import { getTodaysHadith, type NawawiHadith } from "@/lib/hadith";

/** Character threshold above which the hadith text is clamped */
const CLAMP_THRESHOLD = 500;

export default function HadithOfTheDay() {
  const [hadith, setHadith] = useState<NawawiHadith | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setHadith(getTodaysHadith());
  }, []);

  if (!hadith) return null;

  const isLong = hadith.text.length > CLAMP_THRESHOLD;

  return (
    <section className="relative py-16 sm:py-24 bg-emerald-deep overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="hadithPattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <g fill="none" stroke="currentColor" strokeWidth="0.6">
                <polygon points="40,4 64,16 76,40 64,64 40,76 16,64 4,40 16,16" />
                <polygon points="40,16 56,24 64,40 56,56 40,64 24,56 16,40 24,24" />
              </g>
            </pattern>
          </defs>
          <rect
            width="400"
            height="400"
            fill="url(#hadithPattern)"
            className="text-gold"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        {/* Section label */}
        <div className="text-center mb-8">
          <p className="text-gold/60 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Hadith of the Day
          </p>
          <p className="font-serif text-cream-light/50 text-sm italic">
            An-Nawawi&apos;s Forty Hadith
          </p>
        </div>

        {/* Hadith card */}
        <div className="relative bg-emerald-deep/80 backdrop-blur-sm border border-gold/15 rounded-2xl p-6 sm:p-10 shadow-xl">
          {/* Gold left accent bar */}
          <div
            className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-gold/60 via-gold/30 to-gold/60 rounded-full"
            aria-hidden="true"
          />

          {/* Hadith number badge */}
          <div className="flex items-center gap-2 mb-6 pl-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold tracking-wide">
              Hadith #{hadith.number}
            </span>
          </div>

          {/* Hadith text */}
          <blockquote className="pl-4 sm:pl-6">
            <div className="relative">
              <p
                className={`font-serif text-cream-light/90 text-base sm:text-lg leading-relaxed sm:leading-loose transition-all duration-500 ${
                  isLong && !expanded ? "line-clamp-6" : ""
                }`}
              >
                &ldquo;{hadith.text}&rdquo;
              </p>

              {/* Fade overlay when clamped */}
              {isLong && !expanded && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-deep/80 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Expand/collapse button */}
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-gold/80 hover:text-gold text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 group"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    Show less
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    Read full hadith
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                )}
              </button>
            )}

            {/* Narrator attribution */}
            {hadith.narrator && (
              <p className="mt-6 text-cream-light/60 text-sm italic pl-0">
                — {hadith.narrator}
              </p>
            )}

            {/* Source citation */}
            {hadith.citation && (
              <p className="mt-1 text-cream-light/40 text-xs tracking-wide">
                {hadith.citation}
              </p>
            )}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
