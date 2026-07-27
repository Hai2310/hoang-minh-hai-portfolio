import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ShieldCheck } from "lucide-react";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience, privacyNote } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Hoang Minh Hai: Data Engineer internships at VCCorp (streaming pipelines, Spark, Kafka, Airflow) and Insight Data (Oracle regulatory reporting ETL).",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading
        eyebrow="career"
        title="Professional Experience"
        description="Hands-on Data Engineering internships spanning near-real-time streaming platforms and enterprise regulatory ETL systems."
      />

      <ExperienceTimeline items={experience} />

      <div className="mt-10 flex items-start gap-3 rounded-xl border border-border bg-surface-2/60 p-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
        <p className="text-xs leading-relaxed text-muted sm:text-sm">{privacyNote}</p>
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-5">
        <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
        <p className="text-xs leading-relaxed text-muted sm:text-sm">
          Alongside internships, I maintain an active portfolio of personal and academic Data Engineering projects —
          cloud warehouses, AWS pipelines, streaming systems, and dimensional models.{" "}
          <Link href="/projects" className="font-semibold text-accent hover:underline">
            Explore the case studies
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
