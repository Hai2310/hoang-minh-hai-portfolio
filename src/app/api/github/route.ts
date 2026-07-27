import { NextResponse } from "next/server";
import { getGitHubData } from "@/lib/github";

export const runtime = "nodejs";
export const revalidate = 3600;

/**
 * Public read-only repository endpoint. GitHub credentials remain server-only.
 */
export async function GET() {
  const data = await getGitHubData();
  return NextResponse.json(
    {
      source: data.source,
      totalPublicRepos: data.totalPublicRepos,
      languages: data.languages,
      repos: data.repos.map((repo) => ({
        name: repo.name,
        url: repo.url,
        description: repo.displayDescription,
        language: repo.language,
        stars: repo.stars,
        forks: repo.forks,
        updatedAt: repo.updatedAt,
        category: repo.category,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}
