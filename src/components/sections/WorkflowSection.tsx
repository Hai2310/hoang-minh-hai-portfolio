import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * "From Raw Data to Trusted Decisions" — the data engineering lifecycle with
 * a data packet traveling through the stages.
 */
export function WorkflowSection() {
  const { stages } = profile.workflow;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="workflow-heading">
      <SectionHeading
        eyebrow="data lifecycle"
        title={profile.workflow.title}
        description="Every system I build follows the same disciplined lifecycle — from understanding sources to serving trusted datasets."
      />

      <div className="relative">
        {/* connecting line with traveling packet (desktop) */}
        <div className="absolute left-0 right-0 top-6 hidden lg:block" aria-hidden>
          <div className="h-0 border-t-2 border-dashed border-accent/35" />
          <span className="packet-x absolute -top-[3px] h-2 w-2 rounded-full bg-accent shadow-[0_0_10px] shadow-accent/80" style={{ animationDuration: "7s" }} />
        </div>
        {/* connecting line (mobile) */}
        <div className="absolute bottom-0 left-6 top-0 lg:hidden" aria-hidden>
          <div className="h-full border-l-2 border-dashed border-accent/35" />
          <span className="packet-y absolute -left-[3px] h-2 w-2 rounded-full bg-accent shadow-[0_0_10px] shadow-accent/80" style={{ animationDuration: "7s" }} />
        </div>

        <ol className="grid gap-6 pl-14 sm:grid-cols-2 lg:grid-cols-7 lg:pl-0" aria-label="Pipeline lifecycle stages">
          {stages.map((stage, i) => (
            <Reveal key={stage.name} delay={i * 0.07} className="lg:pt-14">
              <li
                className={cn(
                  "relative h-full rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-md",
                )}
              >
                <span
                  className="absolute -left-10 top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-background font-mono text-xs font-bold text-accent lg:-top-8 lg:left-1/2 lg:-translate-x-1/2"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-foreground">{stage.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{stage.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
