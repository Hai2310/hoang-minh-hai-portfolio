import Link from "next/link";
import { BookMarked, ExternalLink, GitFork, Star } from "lucide-react";
import { TechBadge } from "@/components/ui/TechBadge";
import type { EnrichedRepo } from "@/lib/github";
import { formatDate, cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<EnrichedRepo["category"], string> = {
  "data-engineering": "Data Engineering",
  cloud: "Cloud",
  streaming: "Streaming",
  "data-warehouse": "Data Warehouse",
  "analytics-bi": "Analytics & BI",
  "ai-ml": "AI / ML",
  "web-apps": "Web & Apps",
  other: "Other",
};

export function GitHubRepoCard({ repo }: { repo: EnrichedRepo }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="rounded-lg border border-border bg-surface-2 p-2 text-accent">
            <BookMarked className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <h3 className="text-sm font-bold leading-snug text-foreground">{repo.displayTitle}</h3>
            <p className="font-mono text-[10px] text-muted">{CATEGORY_LABELS[repo.category]}</p>
          </div>
        </div>
        {repo.featured && (
          <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
            Featured
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">{repo.displayDescription}</p>

      {repo.techTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.techTags.slice(0, 4).map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-2" aria-hidden />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1" title="Stars">
            <Star className="h-3 w-3" aria-hidden /> {repo.stars}
          </span>
          <span className="flex items-center gap-1" title="Forks">
            <GitFork className="h-3 w-3" aria-hidden /> {repo.forks}
          </span>
        </div>
        <span title="Last updated">upd {formatDate(repo.updatedAt)}</span>
      </div>

      <div className="mt-3 flex gap-2">
        {repo.caseStudySlug && (
          <Link
            href={`/projects/${repo.caseStudySlug}`}
            className={cn(
              "flex-1 rounded-lg bg-accent/10 px-3 py-1.5 text-center text-xs font-semibold text-accent transition-colors hover:bg-accent/20",
            )}
          >
            Case Study
          </Link>
        )}
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${repo.name} on GitHub`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/50"
        >
          GitHub <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
    </article>
  );
}
