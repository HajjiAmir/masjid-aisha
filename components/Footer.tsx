import Link from "next/link";

const QUICK_LINKS = [
  { href: "/prayer-times", label: "Prayer Times" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-emerald-deep text-cream-light/90">
      {/* DESKTOP LAYOUT */}
      <div className="hidden md:block">
        {/* Bismillah header */}
        <div className="border-b border-gold/10 py-4 text-center">
          <p className="font-arabic text-gold/90 text-xl tracking-wider">
            بسم الله الرحمن الرحيم
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Column 1: Masjid info */}
            <div>
              <h3 className="font-serif text-xl font-bold text-cream-light mb-1">
                Islamic Center of Lynchburg
              </h3>
              <p className="font-arabic text-gold-light text-sm mb-4">
                Masjid Aisha
              </p>
              <address className="not-italic text-sm leading-relaxed text-cream-light/70">
                <p>2308 12th St</p>
                <p className="mb-3">Lynchburg, VA 24501</p>
                <p>
                  <span className="text-gold-light/80 font-medium">Call/Text:</span>{" "}
                  <a href="tel:3137698647" className="hover:text-gold transition-colors duration-200 inline-block py-1 min-h-[44px] leading-[44px]">
                    313-769-8647
                  </a>
                </p>
                <p>
                  <a href="tel:4342485756" className="hover:text-gold transition-colors duration-200 inline-block py-1 min-h-[44px] leading-[44px]">
                    434-248-5756
                  </a>
                </p>
                <p>
                  <a href="tel:4346609438" className="hover:text-gold transition-colors duration-200 inline-block py-1 min-h-[44px] leading-[44px]">
                    434-660-9438
                  </a>
                </p>
                <p className="mt-2">
                  <span className="text-cream-light/70">[EMAIL_TBD]</span>
                </p>
              </address>
            </div>

            {/* Column 2: Quick links */}
            <div>
              <h3 className="hidden md:block font-serif text-lg font-semibold text-cream-light mb-4">
                Quick Links
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1 md:gap-x-0 md:space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="gold-hover relative text-sm text-cream-light/70 hover:text-gold transition-colors duration-200 inline-block py-2 min-h-[44px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Connect */}
            <div className="hidden md:block">
              <h3 className="font-serif text-lg font-semibold text-cream-light mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-3">
                {/* Facebook link */}
                <a
                  href="https://www.facebook.com/IslamicCenterOfLynchburgVirginia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gold/20 text-cream-light hover:text-gold transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              </div>
              <p className="mt-6 text-sm text-cream-light/70 leading-relaxed">
                Visit us for daily prayers and community events. Everyone is welcome.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-gold/10 py-4">
          <p className="text-center text-xs text-cream-light/60">
            © {new Date().getFullYear()} Islamic Center of Lynchburg Virginia (Masjid Aisha). All rights reserved.
          </p>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
        <h2 className="font-serif text-xl font-bold text-cream-light">
          Islamic Center of Lynchburg
        </h2>
        <p className="font-arabic text-gold-light text-sm">
          Masjid Aisha
        </p>
        
        <p className="text-sm text-cream-light/70 mt-3">
          2308 12th St, Lynchburg, VA 24501
        </p>
        
        <div className="mt-1 text-sm">
          <a
            href="tel:3137698647"
            className="hover:text-gold transition-colors inline-flex items-center justify-center min-h-[44px]"
          >
            Call/Text: 313-769-8647
          </a>
        </div>

        <div className="mt-6">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream-light/70 hover:text-gold transition-colors min-h-[44px] py-2 flex items-center justify-center"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex justify-center">
          <a
            href="https://www.facebook.com/IslamicCenterOfLynchburgVirginia/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-gold/20 text-cream-light hover:text-gold transition-all duration-200"
            aria-label="Facebook"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-gold/10">
          <p className="text-xs text-cream-light/50">
            © {new Date().getFullYear()} Islamic Center of Lynchburg Virginia (Masjid Aisha). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
