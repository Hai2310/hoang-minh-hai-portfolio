import { siteConfig } from "@/config/siteConfig";
import { fallbackRepos } from "@/data/githubFallback";
import { projectOverrides } from "@/data/projectOverrides";
import type { GitHubRepo, ProjectOverride, RepoCategory } from "@/types";

export interface EnrichedRepo extends GitHubRepo {
  override?: ProjectOverride;
  category: RepoCategory;
  score: number;
  displayTitle: string;
  displayDescription: string;
  techTags: string[];
  caseStudySlug?: string;
  featured: boolean;
}

export interface GitHubData {
  repos: EnrichedRepo[];
  source: "live" | "fallback";
  totalPublicRepos: number | null;
  languages: { name: string; count: number }[];
}

const CATEGORY_KEYWORDS: Record<RepoCategory, string[]> = {
  "data-engineering": ["etl", "pipeline", "airflow", "nifi", "ingest", "crawler", "crawling", "data-pipeline", "pineline", "odi"],
  cloud: ["aws", "s3", "redshift", "glue", "athena", "ec2", "lambda", "cloud", "azure", "gcp"],
  streaming: ["kafka", "stream", "streaming", "realtime", "real-time", "spark-streaming", "flink"],
  "data-warehouse": ["warehouse", "snowflake", "medallion", "dwh", "data-mart", "star-schema", "databricks", "tpc-h", "delta"],
  "analytics-bi": ["analytics", "power-bi", "powerbi", "dashboard", "bi", "analysis", "visualization", "report"],
  "ai-ml": ["ml", "machine-learning", "deep-learning", "nlp", "sentiment", "chatbot", "prediction", "tensorflow", "pytorch", "lstm", "cnn", "transformer", "ai"],
  "web-apps": ["web", "website", "app", "shopify", "travel", "nextjs", "react", "frontend", "fullstack"],
  other: [],
};

function findOverride(repo: GitHubRepo): ProjectOverride | undefined {
  const name = repo.name.toLowerCase();
  return projectOverrides.find((o) => o.match.toLowerCase() === name);
}

function normalizeSearchText(value: string): string {
  return ` ${value.toLowerCase().replace(/[^a-z0-9+]+/g, " ").replace(/\s+/g, " ").trim()} `;
}

function matchesKeyword(normalizedHaystack: string, keyword: string): boolean {
  const normalizedKeyword = normalizeSearchText(keyword).trim();
  if (!normalizedKeyword) return false;

  // Short abbreviations such as BI, ML and AI must match complete tokens.
  // A raw substring check would incorrectly classify words such as "public" or "html".
  if (normalizedKeyword.length <= 3 && !normalizedKeyword.includes(" ")) {
    return normalizedHaystack.includes(` ${normalizedKeyword} `);
  }

  return normalizedHaystack.includes(normalizedKeyword);
}

export function classifyRepo(repo: GitHubRepo): RepoCategory {
  const override = findOverride(repo);
  if (override?.category) return override.category;

  const haystack = normalizeSearchText(
    `${repo.name} ${(repo.topics ?? []).join(" ")} ${repo.description ?? ""}`,
  );
  let best: RepoCategory = "other";
  let bestScore = 0;
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [RepoCategory, string[]][]) {
    const score = keywords.reduce((acc, keyword) => (matchesKeyword(haystack, keyword) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = category;
    }
  }
  return best;
}

/**
 * Configurable scoring: pinned/featured first, then Data Engineering relevance,
 * recency, and documentation signals. Stars are a minor signal only.
 */
export function scoreRepo(repo: GitHubRepo, category: RepoCategory): number {
  const override = findOverride(repo);
  let score = 0;

  if (override?.featured) score += 100;
  if (category === "data-engineering" || category === "streaming" || category === "data-warehouse" || category === "cloud")
    score += 30;

  const daysSinceUpdate = (Date.now() - new Date(repo.pushedAt).getTime()) / 86_400_000;
  score += Math.max(0, 20 - daysSinceUpdate / 15); // decays over ~10 months

  if (repo.size > 1000) score += 6;
  else if (repo.size > 200) score += 3;
  if (repo.description) score += 5;
  if (repo.topics.length > 0) score += 4;
  if (repo.homepage) score += 2;
  if (repo.language === "Python" || repo.language === "Jupyter Notebook" || repo.language === "SQL") score += 3;
  score += Math.min(repo.stars, 5); // stars intentionally minor
  if (override?.sortOrder != null) score += Math.max(0, 20 - override.sortOrder);

  return score;
}

export function enrichRepo(repo: GitHubRepo): EnrichedRepo {
  const override = findOverride(repo);
  const category = classifyRepo(repo);
  return {
    ...repo,
    override,
    category,
    score: scoreRepo(repo, category),
    displayTitle: override?.displayTitle ?? repo.name.replace(/[-_]+/g, " "),
    displayDescription:
      override?.description ??
      repo.description ??
      "Public repository — open GitHub to review its source code and documentation.",
    techTags: override?.techTags ?? [repo.language, ...repo.topics].filter((t): t is string => Boolean(t)).slice(0, 6),
    caseStudySlug: override?.caseStudySlug,
    featured: override?.featured ?? false,
  };
}

interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  fork: boolean;
  topics?: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

function mapRepo(r: GitHubApiRepo): GitHubRepo {
  return {
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    description: r.description,
    url: r.html_url,
    homepage: r.homepage || null,
    language: r.language,
    stars: r.stargazers_count,
    forks: r.forks_count,
    size: r.size,
    fork: r.fork,
    topics: r.topics ?? [],
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    pushedAt: r.pushed_at,
  };
}

/**
 * Server-side only. Fetches public repos with ISR caching; falls back to a
 * local snapshot when the API fails or is rate-limited, and hides dynamic
 * counts rather than showing wrong numbers.
 */
export async function getGitHubData(): Promise<GitHubData> {
  const username = process.env.GITHUB_USERNAME ?? siteConfig.githubUsername;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers,
        next: { revalidate: siteConfig.github.revalidateSeconds },
        signal: AbortSignal.timeout(siteConfig.github.requestTimeoutMs),
      },
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const raw = (await res.json()) as GitHubApiRepo[];
    if (!Array.isArray(raw)) throw new Error("Unexpected GitHub API payload");
    return buildData(raw.map(mapRepo), "live");
  } catch {
    return buildData(fallbackRepos, "fallback");
  }
}

function buildData(repos: GitHubRepo[], source: "live" | "fallback"): GitHubData {
  const filtered = siteConfig.github.includeForks ? repos : repos.filter((r) => !r.fork);
  const enriched = filtered
    .map(enrichRepo)
    .sort((a, b) => b.score - a.score)
    .slice(0, siteConfig.github.maxRepos);

  const langMap = new Map<string, number>();
  for (const r of filtered) {
    if (!r.language) continue;
    langMap.set(r.language, (langMap.get(r.language) ?? 0) + 1);
  }
  const languages = [...langMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    repos: enriched,
    source,
    totalPublicRepos: source === "live" ? repos.length : null,
    languages,
  };
}
