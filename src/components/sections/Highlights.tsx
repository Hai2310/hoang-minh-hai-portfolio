import { BarChart3, Cloud, Database, ShieldCheck, Workflow, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const ICONS: Record<string, typeof Workflow> = {
  workflow: Workflow,
  zap: Zap,
  cloud: Cloud,
  database: Database,
  "shield-check": ShieldCheck,
  "bar-chart": BarChart3,
};

export function Highlights() {
  return (
    <section aria-label="Professional highlights" className="border-y border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-6">
        {profile.highlights.map((h, i) => {
          const Icon = ICONS[h.icon] ?? Workflow;
          return (
            <Reveal key={h.title} delay={i * 0.05} y={12}>
              <div className="flex h-full flex-col items-center gap-2.5 rounded-xl border border-transparent px-3 py-4 text-center transition-colors hover:border-border hover:bg-surface">
                <span className="rounded-lg border border-accent/30 bg-accent/10 p-2.5 text-accent">
                  <Icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <p className="text-xs font-semibold leading-snug text-foreground">{h.title}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
