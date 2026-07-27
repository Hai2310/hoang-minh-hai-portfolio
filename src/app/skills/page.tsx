import type { Metadata } from "next";
import { SkillsExplorer } from "@/components/sections/SkillsExplorer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills of Hoang Minh Hai: Python, SQL, PL/SQL, Spark, Kafka, NiFi, Airflow, Snowflake, Oracle, PostgreSQL, Redshift, AWS, Power BI, and machine learning fundamentals.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading
        eyebrow="toolbox"
        title="Skills & Technologies"
        description="Skills grouped by engineering domain. No arbitrary percentage bars. Core skills are demonstrated through the projects and internship experience shown on this site; foundational topics are labeled honestly."
      />
      <Reveal>
        <SkillsExplorer />
      </Reveal>

      <section className="mt-16" aria-labelledby="strengths-heading">
        <h2 id="strengths-heading" className="mb-6 text-xl font-bold text-foreground">
          Professional Strengths
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.strengths.slice(0, 6).map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-surface p-4">
              <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
