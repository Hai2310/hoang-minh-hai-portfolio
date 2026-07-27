/**
 * Central, owner-editable portfolio configuration.
 * Keep this file free of secrets because parts of it are imported by client components.
 */
function normalizeSiteUrl(value: string | undefined): string {
  const fallback = "http://localhost:3000";
  const candidate = (value || fallback).trim();
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return fallback;
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: "Hoang Minh Hai",
  professionalName: "Minh Hai",
  shortName: "HMH",
  role: "Data Engineer",
  subtitle: "Data Engineer | Cloud Data Platforms | Big Data & Streaming",
  headline: "I build reliable data systems that turn raw data into business value.",
  location: "Hanoi, Vietnam",
  email: "minhhaiit1k68@gmail.com",
  lastUpdated: "2026-07-28",

  links: {
    github: "https://github.com/Hai2310",
    orcid: "https://orcid.org/0009-0009-3301-9414",
    /** Add a real LinkedIn URL when available; leave undefined to hide it. */
    linkedin: undefined as string | undefined,
  },

  /** Public setting so client and server render the same GitHub profile link. */
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "Hai2310",

  profileImage: {
    path: "/profile.jpg",
    alt: "Portrait of Hoang Minh Hai, Data Engineer",
  },

  resume: {
    path: "/HoangMinhHai_DataEngineer_CV.pdf",
    downloadName: "Hoang-Minh-Hai-Data-Engineer-CV.pdf",
  },

  /** Set NEXT_PUBLIC_SITE_URL in production; used for canonical URLs, OG tags and sitemap. */
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),

  seo: {
    title: "Hoang Minh Hai | Data Engineer Portfolio",
    description:
      "Portfolio of Hoang Minh Hai, a Data Engineer specializing in ETL, data pipelines, data warehouses, Big Data, Spark, Kafka, Airflow, Snowflake, Oracle, AWS, and business analytics.",
    keywords: [
      "Data Engineer",
      "ETL",
      "Data Pipeline",
      "Data Warehouse",
      "Big Data",
      "Apache Spark",
      "Apache Kafka",
      "Apache Airflow",
      "Snowflake",
      "Oracle",
      "AWS",
      "Hanoi",
      "Vietnam",
    ],
  },

  github: {
    includeForks: false,
    revalidateSeconds: 3600,
    requestTimeoutMs: 7000,
    maxRepos: 60,
    fallbackSnapshotDate: "2026-07-26",
  },
} as const;

export type SiteConfig = typeof siteConfig;
