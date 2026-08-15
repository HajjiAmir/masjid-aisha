# Islamic Center of Lynchburg — Masjid Aisha

Official website for the Islamic Center of Lynchburg Virginia (Masjid Aisha), located at 2308 12th St, Lynchburg, VA 24501.

## Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme` config)
- **Prayer Times**: [Adhan.js](https://github.com/batoulapps/adhan-js) — astronomically calculated for Lynchburg, VA using the ISNA method
- **Hijri Calendar**: `Intl.DateTimeFormat` with `islamic-umalqura` calendar — zero external dependencies
- **Fonts**: Playfair Display (headings), Inter (body), Amiri (Arabic text) via `next/font/google`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — prayer times, hadith of the day, Islamic calendar, events & programs teasers |
| `/prayer-times` | Today's adhan + iqamah times, monthly calendar table |
| `/about` | Masjid information with honest placeholders for story & leadership |
| `/events` | Upcoming community events with countdown chips |
| `/programs` | Standing services (dawah, new Muslim support, marriage, youth) with inquiry forms |
| `/contact` | Contact cards, embedded map, directions, contact form |
| `/donate` | Giving panel with demo-mode safety (no payment fields) |

## Getting Started

```bash
npm install
npm run dev        # Development server at http://localhost:3000
npm run build      # Production build
npm start          # Production server
```

## Demo Mode

This site is built as a **board demo** — a production-quality preview for the masjid's leadership. Several features operate in honest demo mode:

- **Forms** (contact, inquiry, donate): Collect input but do not persist or transmit data. Each shows a clear "Demo Mode" notice on submit with the masjid's phone number as a fallback.
- **Honest placeholders**: Content the masjid hasn't provided yet (email, iqamah times, leadership bios, masjid history) is styled with italic/muted/gold-accented markers like `[EMAIL_TBD]` and `[IQAMAH_TBD]` — never fabricated.
- **Donations**: No payment fields exist anywhere. The donate flow ends at an honest notice directing users to contact the masjid.
- **Sample events & programs**: Marked with `isSampleData: true` for easy identification and replacement.

## Content Rules

- **No fabricated facts**: Every piece of content is either verified (address, phone numbers, prayer calculations) or explicitly marked as a placeholder.
- **Verified hadith only**: Hadith of the Day draws from Imam Nawawi's 40 Hadith collection with source citations.
- **Derived dates only**: All dates, weekdays, Hijri conversions, and countdowns are computed from `new Date()` at render time — never hard-coded.
- **Real photos only**: All images are actual photos of the masjid, never AI-generated or stock.

## Brand Kit

The `masjid-ayesha-brand-kit/` folder contains the official brand assets (favicon, OG image, logo marks). The star favicon and social preview image are integrated. Logo marks (mark-tile.svg, mark-transparent.svg, mark-circle.svg) are **not yet placed on the site** — pending board approval.
