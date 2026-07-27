import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/experience", "/projects", "/skills", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(siteConfig.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(siteConfig.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
