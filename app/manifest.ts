import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Islamic Center of Lynchburg — Masjid Aisha",
    short_name: "Masjid Aisha",
    description:
      "Serving the Muslim community of Lynchburg, Virginia with daily prayers, community events, and a welcoming environment.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF5EF",
    theme_color: "#0E3B2E",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
