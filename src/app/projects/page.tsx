import type { Metadata } from "next";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Data Engineering case studies by Hoang Minh Hai: Snowflake Medallion Architecture, AWS data pipelines, real-time streaming with Kafka and Spark, Oracle regulatory ETL, and dimensional modeling.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const nonFeatured = projects.filter((p) => !p.featured).sort((a, b) => a.order - b.order);

  return (
    <div className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="portfolio"
          title="Projects & Case Studies"
          description="Six Data Engineering case studies — from cloud data warehouses and AWS lakehouses to streaming platforms and enterprise regulatory ETL. Each page documents architecture, decisions, and lessons."
        />
      </div>

      <FeaturedProjectsSection />

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6" aria-labelledby="more-case-studies-heading">
        <h2 id="more-case-studies-heading" className="mb-8 text-xl font-bold text-foreground">
          More Case Studies
        </h2>
        <div className="space-y-8">
          {nonFeatured.map((project, i) => (
            <Reveal key={project.slug}>
              <FeaturedProjectCard project={project} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="border-t border-border">
        <GitHubSection />
      </div>
    </div>
  );
}
