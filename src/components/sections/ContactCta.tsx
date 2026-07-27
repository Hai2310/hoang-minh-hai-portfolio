import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ResumeButtons } from "@/components/ui/ResumeButtons";
import { siteConfig } from "@/config/siteConfig";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="grid-bg relative overflow-hidden rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent)]"
          />
          <div className="relative">
            <p className="terminal-label mb-3">contact.init</p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Let&apos;s Build Reliable Data Systems</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              I am open to Data Engineer internships, junior Data Engineer opportunities, collaborative data projects,
              and freelance work involving ETL, data pipelines, cloud platforms, data warehousing, automation, and
              analytics.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                Get in Touch <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
              >
                <Mail className="h-4 w-4" aria-hidden /> {siteConfig.email}
              </a>
              <ResumeButtons variant="view" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
