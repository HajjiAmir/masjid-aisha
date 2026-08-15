"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * ScrollReveal — Wrapper component for scroll-triggered fade-rise animation.
 *
 * Uses IntersectionObserver to detect when the element enters the viewport,
 * then adds the `is-visible` class to trigger the CSS transition defined
 * in globals.css. Triggers once only (does not re-hide on scroll-out).
 *
 * prefers-reduced-motion: the CSS in globals.css instantly shows elements
 * without any transition, so users who prefer reduced motion see no animation.
 *
 * @param delay — stagger delay tier (0–4), each ~100ms increment
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion — if reduced, just show immediately
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      data-delay={delay || undefined}
    >
      {children}
    </div>
  );
}
