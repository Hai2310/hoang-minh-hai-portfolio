import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types";

export function PrevNextNav({ prev, next }: { prev?: Project; next?: Project }) {
  return (
    <nav aria-label="Project navigation" className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="group rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden /> Previous project
          </span>
          <span className="mt-2 block text-sm font-bold text-foreground">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="group rounded-xl border border-border bg-surface p-5 text-right transition-all hover:-translate-y-0.5 hover:border-accent/50"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-muted">
            Next project <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
          <span className="mt-2 block text-sm font-bold text-foreground">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
