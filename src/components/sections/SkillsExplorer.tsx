"use client";

import { useMemo, useState } from "react";
import { Crosshair, Search } from "lucide-react";
import { TechBadge } from "@/components/ui/TechBadge";
import { EmptyState } from "@/components/ui/States";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

/**
 * Searchable skills explorer grouped by engineering domain.
 * Skills are presented as grouped tags — no arbitrary percentage bars.
 */
export function SkillsExplorer({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const groups = compact ? skillGroups.slice(0, 6) : skillGroups;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        skills: g.skills.filter((s) => s.toLowerCase().includes(q) || g.title.toLowerCase().includes(q)),
      }))
      .filter((g) => g.skills.length > 0);
  }, [groups, query]);

  const totalMatches = filtered.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <div>
      <div className="relative mb-8 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills — e.g. Spark, Airflow, SQL…"
          aria-label="Search skills"
          className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-accent"
        />
      </div>

      {query && (
        <p className="mb-6 text-xs text-muted" role="status">
          {totalMatches} skill{totalMatches === 1 ? "" : "s"} matching &ldquo;{query}&rdquo;
        </p>
      )}

      {filtered.length === 0 ? (
        <EmptyState title="No matching skills" message="Try a broader term such as “data”, “cloud”, or “SQL”." />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((group) => (
            <article
              key={group.id}
              className="group rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
            >
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Crosshair className="h-3.5 w-3.5 text-accent transition-transform group-hover:rotate-90" aria-hidden />
                {group.title}
              </h3>
              <p className="mt-1 text-xs text-muted">{group.blurb}</p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span key={skill} title={`${skill} — ${group.title}`}>
                    <TechBadge
                      label={skill}
                      className={cn(query && skill.toLowerCase().includes(query.trim().toLowerCase()) && "border-accent/60 text-accent")}
                    />
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {!compact && (
        <aside className="mt-10 rounded-xl border border-accent-3/30 bg-accent-3/5 p-5">
          <p className="terminal-label mb-3">current focus</p>
          <div className="flex flex-wrap gap-2">
            {profile.currentFocus.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-accent-3/40 bg-surface px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
