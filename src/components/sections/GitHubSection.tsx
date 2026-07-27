import { Suspense } from "react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { GitHubExplorer } from "@/components/github/GitHubExplorer";
import { LanguageChart } from "@/components/github/LanguageChart";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSkeleton } from "@/components/ui/States";
import { getGitHubData } from "@/lib/github";
import { siteConfig } from "@/config/siteConfig";

async function GitHubContent() {
  const data = await getGitHubData();
  const recentlyUpdated = [...data.repos].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3);

  return (
    <>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="terminal-label mb-2">public repositories</p>
          <p className="text-3xl font-extrabold text-foreground">
            {data.totalPublicRepos ?? <span className="text-base font-medium text-muted">temporarily unavailable</span>}
          </p>
          <p className="mt-1 text-xs text-muted">
            {data.source === "live" ? "Loaded live from the GitHub API." : "Snapshot shown while the GitHub API is unavailable."}
          </p>
        </div>
        <LanguageChart languages={data.languages} />
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="terminal-label mb-2">recently updated</p>
          <ul className="space-y-2.5">
            {recentlyUpdated.map((r) => (
              <li key={r.id}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-xs font-medium text-foreground hover:text-accent"
                >
                  {r.name}
                </a>
                <span className="text-[10px] text-muted">{r.language ?? "—"}</span>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
          >
            <GithubIcon className="h-3.5 w-3.5" /> Full profile
          </a>
        </div>
      </div>

      <GitHubExplorer repos={data.repos} source={data.source} totalPublicRepos={data.totalPublicRepos} />
    </>
  );
}

export function GitHubSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="github-heading">
      <SectionHeading
        eyebrow="open source"
        title="GitHub Activity & More Projects"
        description="Public repositories across Data Engineering, Analytics, AI/ML, and Web Development — loaded from the GitHub API with a resilient local fallback."
      />
      <Suspense fallback={<LoadingSkeleton rows={6} />}>
        <GitHubContent />
      </Suspense>
    </section>
  );
}
