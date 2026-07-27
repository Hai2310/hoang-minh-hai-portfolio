import { siteConfig } from "@/config/siteConfig";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated server-side from our own config — no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.professionalName,
    jobTitle: "Data Engineer",
    description: siteConfig.seo.description,
    email: `mailto:${siteConfig.email}`,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hanoi",
      addressCountry: "VN",
    },
    sameAs: [siteConfig.links.github, siteConfig.links.orcid, siteConfig.links.linkedin].filter(Boolean),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Hanoi University of Science and Technology",
    },
    knowsAbout: [
      "Data Engineering",
      "ETL",
      "Data Pipelines",
      "Data Warehousing",
      "Apache Spark",
      "Apache Kafka",
      "Apache Airflow",
      "Snowflake",
      "Oracle",
      "AWS",
    ],
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteConfig.seo.title,
    url: siteConfig.url,
    mainEntity: personJsonLd(),
  };
}

export function projectJsonLd(project: {
  title: string;
  description: string;
  url: string;
  github: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.url,
    codeRepository: project.github,
    keywords: project.keywords.join(", "),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
