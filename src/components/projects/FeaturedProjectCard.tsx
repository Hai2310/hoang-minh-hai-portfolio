import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { ArchitectureFlow } from "@/components/diagrams/ArchitectureFlow";
import { TechBadge } from "@/components/ui/TechBadge";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const CONTEXT_STYLES: Record<Project["context"], string> = {
  Internship: "border-accent-2/50 bg-accent-2/10 text-accent-2",
  "Personal Project": "border-accent-3/40 bg-accent-3/10 text-accent-3",
  "Academic Project": "border-success/40 bg-success/10 text-success",
};

export function FeaturedProjectCard({ project, flip = false }: { project: Project; flip?: boolean }) {
  const architectureSummary = project.architecture.slice(0, 6);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-lg">
      <div className={cn("grid lg:grid-cols-2", flip && "lg:[direction:rtl]")}>
        {/* Visual side */}
        <div className="grid-bg relative flex min-h-[220px] flex-col justify-center border-b border-border p-6 lg:border-b-0 lg:[direction:ltr]">
          <p className="terminal-label mb-4">architecture.flow</p>
          <ArchitectureFlow
            stages={architectureSummary}
            ariaLabel={`Architecture flow for ${project.title}: ${project.architecture.join(", then ")}`}
            compact
          />
          {project.architecture.length > 6 && (
            <p className="mt-3 font-mono text-[10px] text-muted">
              +{project.architecture.length - 6} more stages — see case study
            </p>
          )}
        </div>

        {/* Content side */}
        <div className="flex flex-col p-6 sm:p-8 lg:[direction:ltr]">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-semibold", CONTEXT_STYLES[project.context])}>
              {project.context}
            </span>
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted">
              {project.status}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-bold leading-snug text-foreground">{project.title}</h3>
          <p className="terminal-label mt-1.5">{project.category}</p>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-foreground">Problem: </span>
            {project.businessProblem}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 8).map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
            {project.stack.length > 8 && (
              <span className="px-1 py-1 text-[11px] text-muted">+{project.stack.length - 8} more</span>
            )}
          </div>

          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {project.contributions.slice(0, 3).map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:opacity-95"
            >
              View Case Study <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
            >
              <GithubIcon className="h-4 w-4" /> View Source
              <ExternalLink className="h-3 w-3 text-muted" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
