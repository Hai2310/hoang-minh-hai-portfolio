import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seo.title,
    short_name: "HMH Portfolio",
    description: siteConfig.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050a14",
    theme_color: "#050a14",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
