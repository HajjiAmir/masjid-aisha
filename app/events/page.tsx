import Link from "next/link";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import EventsList from "@/components/events/EventsList";

export const metadata: Metadata = {
  title: "Events & Programs | Islamic Center of Lynchburg",
  description:
    "Upcoming events and recurring programs at the Islamic Center of Lynchburg Virginia (Masjid Aisha).",
};

export default function EventsPage() {
  return (
    <main className="flex-1 bg-cream min-h-screen">
      {/* Hero Header */}
      <section className="bg-emerald-deep pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center text-cream-light">
        <ScrollReveal>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Events &amp; Programs
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join us for upcoming community events and regular educational programs.
          </p>
        </ScrollReveal>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <EventsList />

        {/* Cross-link to Programs */}
        <ScrollReveal>
          <div className="text-center py-8">
            <p className="text-charcoal-muted text-sm mb-2">
              Looking for our standing services?
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-emerald-deep font-semibold hover:text-gold transition-colors duration-200 group"
            >
              View Programs
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Back link */}
        <ScrollReveal>
          <div className="text-center pb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-deep hover:text-gold font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to Homepage
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
