import type { Metadata } from "next";
import { GraduationCap, MapPin } from "lucide-react";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResumeButtons } from "@/components/ui/ResumeButtons";
import { profile } from "@/data/profile";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "About",
  description: profile.summary,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      {/* Intro */}
      <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <ProfileAvatar className="aspect-square w-full max-w-[280px]" />
            <div className="mt-4 rounded-xl border border-border bg-surface p-4">
              <p className="text-lg font-bold text-foreground">{siteConfig.name}</p>
              <p className="text-sm text-accent">{siteConfig.subtitle}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> {siteConfig.location}
              </p>
              <div className="mt-4 flex gap-2">
                <ResumeButtons variant="view" className="flex-1 justify-center px-3" />
                <ResumeButtons variant="download" className="flex-1 justify-center px-3" />
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="about me" title={profile.about.title} />
          <Reveal>
            <div className="space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              {profile.about.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <blockquote className="mt-8 rounded-xl border-l-4 border-accent bg-surface p-5">
              <p className="text-sm font-medium italic leading-relaxed text-foreground sm:text-base">
                &ldquo;{profile.valueProposition}&rdquo;
              </p>
            </blockquote>
          </Reveal>

          {/* How I Work */}
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-foreground">How I Work</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.about.howIWork.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <div className="h-full rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50">
                    <p className="font-mono text-xs text-accent">0{i + 1}</p>
                    <h3 className="mt-2 text-sm font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <section id="education" className="mt-20 scroll-mt-24" aria-labelledby="education-heading">
        <SectionHeading eyebrow="education" title="Education" />
        <Reveal>
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="rounded-xl border border-accent/30 bg-accent/10 p-3 text-accent">
                  <GraduationCap className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3 id="education-heading" className="text-lg font-bold text-foreground">
                    {profile.education.institution}
                  </h3>
                  <p className="text-sm text-muted">{profile.education.school}</p>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {profile.education.degree} — {profile.education.major}
                  </p>
                </div>
              </div>
              <span className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted">
                {profile.education.period}
              </span>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{profile.education.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-lg border border-border bg-surface-2 px-4 py-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted">GPA</p>
                <p className="text-sm font-bold text-foreground">{profile.education.gpa}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface-2 px-4 py-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted">English</p>
                <p className="text-sm font-bold text-foreground">{profile.education.english}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Strengths */}
      <section className="mt-20" aria-labelledby="strengths-heading">
        <SectionHeading
          eyebrow="professional strengths"
          title="How I Approach Engineering Problems"
          description="Strengths connected to concrete engineering behavior — not corporate buzzwords."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.strengths.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.05}>
              <div className="h-full rounded-xl border border-border bg-surface p-4">
                <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
