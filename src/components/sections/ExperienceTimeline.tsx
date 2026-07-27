"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TechBadge } from "@/components/ui/TechBadge";
import type { ExperienceItem } from "@/types";
import { cn } from "@/lib/utils";

/** Vertical professional timeline with expandable experience cards. */
export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const [expanded, setExpanded] = useState<string | null>(items[0]?.company ?? null);

  return (
    <ol className="relative space-y-8 border-l-2 border-dashed border-accent/35 pl-8 sm:pl-10">
      {items.map((item) => {
        const isOpen = expanded === item.company;
        const panelId = `exp-panel-${item.company.replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <li key={item.company} className="relative">
            <span
              className="absolute -left-[41px] top-6 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-background sm:-left-[49px]"
              aria-hidden
            >
              <span className="status-dot h-2 w-2 rounded-full bg-accent" />
            </span>

            <article className="overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/40">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setExpanded(isOpen ? null : item.company)}
                className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left sm:p-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">{item.role}</h2>
                    <span className="rounded-full border border-accent-2/50 bg-accent-2/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent-2">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">{item.company}</p>
                  <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">{item.summary}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-[11px] text-muted">
                    {item.period}
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 text-muted transition-transform", isOpen && "rotate-180 text-accent")}
                    aria-hidden
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-5 py-5 sm:px-6">
                      <h3 className="terminal-label mb-3">responsibilities</h3>
                      <ul className="grid gap-2 text-xs leading-relaxed text-muted sm:grid-cols-2 sm:text-sm">
                        {item.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <h3 className="terminal-label mb-3 mt-6">technologies</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((tech) => (
                          <TechBadge key={tech} label={tech} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
