"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { GitHubRepoCard } from "@/components/github/GitHubRepoCard";
import { EmptyState } from "@/components/ui/States";
import { siteConfig } from "@/config/siteConfig";
import type { EnrichedRepo } from "@/lib/github";
import type { RepoCategory } from "@/types";
import { cn } from "@/lib/utils";

const TABS: { value: "all" | RepoCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "data-engineering", label: "Data Engineering" },
  { value: "cloud", label: "Cloud" },
  { value: "streaming", label: "Streaming" },
  { value: "data-warehouse", label: "Data Warehouse" },
  { value: "analytics-bi", label: "Analytics & BI" },
  { value: "ai-ml", label: "AI & Machine Learning" },
  { value: "web-apps", label: "Web & Applications" },
  { value: "other", label: "Other" },
];

export function GitHubExplorer({
  repos,
  source,
  totalPublicRepos,
}: {
  repos: EnrichedRepo[];
  source: "live" | "fallback";
  totalPublicRepos: number | null;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["value"]>("all");

  const filtered = useMemo(() => (tab === "all" ? repos : repos.filter((r) => r.category === tab)), [repos, tab]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Filter repositories by domain" className="flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.value}
              role="tab"
              aria-selected={tab === t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                tab === t.value
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          {totalPublicRepos !== null ? `${totalPublicRepos} public repositories` : "View full GitHub profile"}
        </a>
      </div>

      {source === "fallback" && (
        <p className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-xs text-muted">
          <Info className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
          Live GitHub data is temporarily unavailable — showing the public snapshot captured on {siteConfig.github.fallbackSnapshotDate}.
        </p>
      )}

      {filtered.length === 0 ? (
        <EmptyState title="No repositories in this category" message="Try another filter, or browse all repositories." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((repo) => (
            <GitHubRepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
