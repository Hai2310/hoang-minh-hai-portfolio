import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjectsSection({ limit }: { limit?: number }) {
  const list = typeof limit === "number" ? featuredProjects.slice(0, limit) : featuredProjects;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="featured-projects-heading">
      <SectionHeading
        eyebrow="case studies"
        title="Featured Data Engineering Projects"
        description="End-to-end systems across cloud warehouses, AWS data lakes, streaming platforms, and enterprise ETL — each with architecture, engineering decisions, and lessons learned."
      />
      <div className="space-y-8">
        {list.map((project, i) => (
          <Reveal key={project.slug} delay={0.05}>
            <FeaturedProjectCard project={project} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
      {typeof limit === "number" && (
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
          >
            View All Projects <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  );
}
