# Masjid Ayesha Brand Kit — Integration Brief for Apollo

## What this is
Official brand assets for masjidaisha.net: an eight-pointed Islamic star mark in the site's
gold (#C9A227) on deep emerald (#0E3B2E), favicons at all required sizes, and a 1200x630
Open Graph image so shared links preview beautifully in iMessage/WhatsApp/Facebook.

## Files
- favicon.ico              -> place at app/favicon.ico  (replaces default; Next serves automatically)
- icon-32.png / icon-16.png -> optional explicit link tags; app/favicon.ico already covers these sizes
- icon-180.png             -> place at app/apple-icon.png (Apple touch icon, served automatically)
- icon-192.png, icon-512.png -> public/icons/ for the web manifest
- og-image.png (og-image.jpg) -> public/og-image.png
- mark-tile.svg            -> master app-icon artwork (rounded emerald tile)
- mark-transparent.svg     -> gold star mark on transparency, for use inside the site (header, footer)
- mark-circle.svg          -> circular badge variant (profile pictures, stamps)

## Integration steps (Next.js App Router)
1. Copy favicon.ico to app/favicon.ico and icon-180.png to app/apple-icon.png. Remove any
   default Vercel/Next favicon so nothing overrides these.
2. Copy og-image.png to public/og-image.png; icon-192/512 to public/icons/.
3. In app/layout.tsx metadata, ensure:
   metadata.metadataBase = new URL('https://masjidaisha.net')
   openGraph: { title: 'Islamic Center of Lynchburg — Masjid Aisha', description: <site description>,
     url: 'https://masjidaisha.net', siteName: 'Masjid Aisha',
     images: [{ url: '/og-image.png', width: 1200, height: 630,
       alt: 'Islamic Center of Lynchburg — Masjid Aisha' }], locale: 'en_US', type: 'website' }
   twitter: { card: 'summary_large_image', title: ..., description: ..., images: ['/og-image.png'] }
4. Add themeColor '#0E3B2E' to viewport/metadata so mobile browser chrome matches the brand.
5. Optional but recommended: app/manifest.ts web manifest using icon-192/512, name, theme colors.
6. OPTIONAL site usage: mark-transparent.svg may replace/augment the text logo in Header/Footer
   at small size — only if it fits without crowding; show screenshots either way.

## Acceptance criteria
1. Browser tab shows the star favicon on all routes (screenshot), no Vercel triangle anywhere.
2. View-source proof of og:image, og:title, twitter:card meta tags on the homepage.
3. After deploy (Brief #9), validate the link preview with a card validator or by pasting the
   link in a messaging app — screenshot the rendered preview.
4. Lighthouse unaffected (>=90 both categories, homepage).

Hard rules unchanged: no new dependencies, no tracking, nothing else modified.
