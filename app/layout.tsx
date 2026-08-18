import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Amiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Islamic Center of Lynchburg | Masjid Aisha",
    template: "%s | Islamic Center of Lynchburg",
  },
  description:
    "Welcome to the Islamic Center of Lynchburg Virginia (Masjid Aisha). Serving the Muslim community of Lynchburg with daily prayers, community events, and a welcoming environment for all.",
  metadataBase: new URL("https://masjidaisha.net"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Islamic Center of Lynchburg — Masjid Aisha",
    description:
      "Serving the Muslim community of Lynchburg, Virginia with daily prayers, community events, and a welcoming environment.",
    url: "https://masjidaisha.net",
    siteName: "Masjid Aisha",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Islamic Center of Lynchburg — Masjid Aisha",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamic Center of Lynchburg — Masjid Aisha",
    description:
      "Serving the Muslim community of Lynchburg, Virginia with daily prayers, community events, and a welcoming environment.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E3B2E",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
