import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FlaskConical, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { ProjectDiagram } from "@/components/diagrams/ProjectDiagram";
import { CaseStudyTOC, type TocItem } from "@/components/projects/CaseStudyTOC";
import { PrevNextNav } from "@/components/projects/PrevNextNav";
import { JsonLd, projectJsonLd } from "@/components/seo/JsonLd";
import { TechBadge } from "@/components/ui/TechBadge";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/config/siteConfig";
import type { ImplementationState } from "@/types";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.shortDescription,
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}

const STATE_STYLES: Record<ImplementationState, { label: string; classes: string }> = {
  implemented: { label: "Implemented", classes: "border-success/50 bg-success/10 text-success" },
  demonstrated: { label: "Demonstrated", classes: "border-accent/50 bg-accent/10 text-accent" },
  designed: { label: "Designed", classes: "border-accent-2/50 bg-accent-2/10 text-accent-2" },
  planned: { label: "Planned extension", classes: "border-accent-3/50 bg-accent-3/10 text-accent-3" },
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);

  const tocItems: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
    ...project.sections.filter((s) => s.id !== "overview").map((s) => ({ id: s.id, label: s.heading })),
    { id: "contributions", label: "Engineering Contributions" },
    { id: "challenges", label: "Challenges & Lessons" },
    { id: "future", label: "Future Improvements" },
  ];

  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
      <JsonLd
        data={projectJsonLd({
          title: project.title,
          description: project.shortDescription,
          url: `${siteConfig.url}/projects/${project.slug}`,
          github: project.github,
          keywords: project.stack,
        })}
      />

      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> All projects
      </Link>

      {/* Case-study hero */}
      <header className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {project.context}
          </span>
          <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
            {project.status}
          </span>
          {project.period && (
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-[11px] text-muted">
              {project.period}
            </span>
          )}
        </div>
        <h1 className="mt-5 max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {project.title}
        </h1>
        <p className="terminal-label mt-2">{project.category}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{project.shortDescription}</p>

        <dl className="mt-6 grid gap-4 rounded-xl border border-border bg-surface-2/50 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-muted">Role</dt>
            <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">{project.role}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-muted">Project context</dt>
            <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">{project.context}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-muted">Status</dt>
            <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">{project.status}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:opacity-95"
          >
            <GithubIcon className="h-4 w-4" /> View Repository <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Sticky TOC — desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <CaseStudyTOC items={tocItems} />
          </div>
        </div>

        <div className="min-w-0 space-y-14">
          {/* Overview + business problem */}
          <section id="overview" className="scroll-mt-24">
            <h2 className="mb-4 text-xl font-bold text-foreground">Overview & Business Problem</h2>
            <p className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm leading-relaxed text-foreground">
              {project.businessProblem}
            </p>
            {project.implementationStatus && (
              <div className="mt-5 rounded-xl border border-border bg-surface p-5">
                <h3 className="terminal-label mb-3">implementation status — honestly labeled</h3>
                <ul className="space-y-2.5">
                  {project.implementationStatus.map((s) => (
                    <li key={s.label} className="grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-x-2.5">
                      <span
                        className={cn(
                          "w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-semibold",
                          STATE_STYLES[s.state].classes,
                        )}
                      >
                        {STATE_STYLES[s.state].label}
                      </span>
                      <span className="text-sm font-medium text-foreground">{s.label}</span>
                      {s.detail && <span className="text-xs leading-relaxed text-muted sm:col-start-2">{s.detail}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Architecture */}
          <section id="architecture" className="scroll-mt-24">
            <h2 className="mb-4 text-xl font-bold text-foreground">Architecture</h2>
            <div className="grid-bg rounded-2xl border border-border bg-surface p-5 sm:p-7">
              <ProjectDiagram project={project} />
              {project.architectureNote && (
                <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted">{project.architectureNote}</p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.concepts.map((c) => (
                <span key={c} className="rounded-full border border-accent-3/35 bg-accent-3/10 px-2.5 py-1 text-[11px] font-medium text-accent-3">
                  {c}
                </span>
              ))}
            </div>
          </section>

          {/* Dynamic sections */}
          {project.sections
            .filter((s) => s.id !== "overview")
            .map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-bold text-foreground">{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)} className="mb-3 text-sm leading-relaxed text-muted sm:text-base">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2 text-sm leading-relaxed text-muted sm:text-base">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

          {/* Contributions */}
          <section id="contributions" className="scroll-mt-24">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
              <Rocket className="h-5 w-5 text-accent" aria-hidden /> Key Engineering Contributions
            </h2>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {project.contributions.map((c) => (
                <li key={c} className="flex gap-2.5 rounded-lg border border-border bg-surface p-3.5 text-xs leading-relaxed text-muted sm:text-sm">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <h3 className="terminal-label mb-3">technology stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <TechBadge key={t} label={t} />
                ))}
              </div>
            </div>
          </section>

          {/* Challenges & lessons */}
          <section id="challenges" className="scroll-mt-24">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-5">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <FlaskConical className="h-5 w-5 text-accent-2" aria-hidden /> Key Challenges
                </h2>
                <ul className="space-y-2.5 text-xs leading-relaxed text-muted sm:text-sm">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <Lightbulb className="h-5 w-5 text-amber-500" aria-hidden /> Lessons Learned
                </h2>
                <ul className="space-y-2.5 text-xs leading-relaxed text-muted sm:text-sm">
                  {project.lessons.map((l) => (
                    <li key={l} className="flex gap-2.5">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber-500" aria-hidden />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Future */}
          <section id="future" className="scroll-mt-24">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
              <TrendingUp className="h-5 w-5 text-success" aria-hidden /> Future Improvements
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-muted">
              {project.future.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-success" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </article>
  );
}
