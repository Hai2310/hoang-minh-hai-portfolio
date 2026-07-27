import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { SkillsExplorer } from "@/components/sections/SkillsExplorer";
import { ContactCta } from "@/components/sections/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <WorkflowSection />

      {/* About teaser */}
      <section className="border-y border-border bg-surface/50" aria-labelledby="about-teaser-heading">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <div>
              <p className="terminal-label mb-3">about</p>
              <h2 id="about-teaser-heading" className="text-2xl font-bold text-foreground sm:text-3xl">
                {profile.about.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{profile.about.paragraphs[0]}</p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                More about how I work <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.about.howIWork.map((step, i) => (
                <div key={step.title} className="rounded-xl border border-border bg-surface p-4">
                  <p className="font-mono text-[10px] text-accent">0{i + 1}</p>
                  <h3 className="mt-1.5 text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FeaturedProjectsSection limit={3} />

      {/* Education + CTA band */}
      <section className="border-y border-border bg-surface/50" aria-labelledby="education-teaser-heading">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <Reveal>
            <div className="flex items-start gap-4">
              <span className="rounded-xl border border-accent/30 bg-accent/10 p-3 text-accent">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h2 id="education-teaser-heading" className="text-lg font-bold text-foreground">
                  {profile.education.institution}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {profile.education.major} · {profile.education.period} · GPA {profile.education.gpa} · {profile.education.english}
                </p>
                <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-muted">{profile.education.description}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/about#education"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
            >
              Education Details <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Skills teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="skills-teaser-heading">
        <SectionHeading
          eyebrow="toolbox"
          title="Skills Across the Data Stack"
          description="Grouped by engineering domain — search to explore the full toolbox."
        />
        <SkillsExplorer compact />
        <div className="mt-10 text-center">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
          >
            Explore All Skills <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <GitHubSection />
      <ContactCta />
    </>
  );
}
