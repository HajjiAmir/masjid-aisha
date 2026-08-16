import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import EventsTeaser from "@/components/home/EventsTeaser";
import ProgramsTeaser from "@/components/home/ProgramsTeaser";
import ScrollReveal from "@/components/ScrollReveal";

const PrayerTimesCard = dynamic(
  () => import("@/components/home/PrayerTimesCard"),
  { ssr: true }
);

const HadithOfTheDay = dynamic(
  () => import("@/components/home/HadithOfTheDay"),
  { ssr: true }
);

const IslamicCalendarSection = dynamic(
  () => import("@/components/home/IslamicCalendarSection"),
  { ssr: true }
);

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PrayerTimesCard />
      <WelcomeSection />
      <ScrollReveal>
        <HadithOfTheDay />
      </ScrollReveal>
      <div className="hidden md:block">
        <IslamicCalendarSection />
      </div>
      <ProgramsTeaser />
      <EventsTeaser />
    </main>
  );
}
