import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { projects, getAdjacentProjects, getProjectBySlug } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experience } from "@/data/experience";
import { classifyRepo, enrichRepo, scoreRepo } from "@/lib/github";
import { contactSchema, sanitizePlainText, sanitizeSingleLine } from "@/lib/validation";
import { isAllowedOrigin, readJsonBody } from "@/lib/requestSecurity";
import { rateLimit } from "@/lib/rateLimit";
import { cn, slugify, truncate } from "@/lib/utils";
import { TechBadge } from "@/components/ui/TechBadge";
import type { GitHubRepo } from "@/types";

const repoFixture: GitHubRepo = {
  id: 1,
  name: "Realtime-IMDB-Sentiment-Analysis",
  fullName: "Hai2310/Realtime-IMDB-Sentiment-Analysis",
  description: "Streaming pipeline",
  url: "https://github.com/Hai2310/Realtime-IMDB-Sentiment-Analysis",
  homepage: null,
  language: "Python",
  stars: 0,
  forks: 0,
  size: 500,
  fork: false,
  topics: ["kafka", "spark"],
  createdAt: "2025-10-01T00:00:00Z",
  updatedAt: "2026-07-01T00:00:00Z",
  pushedAt: "2026-07-01T00:00:00Z",
};

describe("project data", () => {
  it("contains at least six case studies with unique slugs", () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every project has a GitHub URL and case-study content", () => {
    for (const p of projects) {
      expect(p.github).toMatch(/^https:\/\/github\.com\//);
      expect(p.sections.length).toBeGreaterThan(0);
      expect(p.contributions.length).toBeGreaterThan(0);
      expect(p.challenges.length).toBeGreaterThan(0);
      expect(p.lessons.length).toBeGreaterThan(0);
    }
  });

  it("adjacent navigation wraps correctly at boundaries", () => {
    const first = [...projects].sort((a, b) => a.order - b.order)[0];
    const { prev, next } = getAdjacentProjects(first.slug);
    expect(prev).toBeUndefined();
    expect(next).toBeDefined();
  });

  it("getProjectBySlug returns undefined for unknown slugs", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("experience data", () => {
  it("includes both internships", () => {
    const companies = experience.map((e) => e.company);
    expect(companies).toContain("VCCorp");
    expect(companies).toContain("Insight Data");
  });
});

describe("skills data", () => {
  it("groups skills by engineering domain", () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(10);
    for (const g of skillGroups) {
      expect(g.skills.length).toBeGreaterThan(0);
    }
  });
});

describe("github classification and scoring", () => {
  it("honors manual overrides for known repositories", () => {
    expect(classifyRepo(repoFixture)).toBe("streaming");
    const enriched = enrichRepo(repoFixture);
    expect(enriched.caseStudySlug).toBe("realtime-imdb-sentiment");
    expect(enriched.featured).toBe(true);
  });

  it("classifies unknown repos from keywords", () => {
    const unknown = { ...repoFixture, name: "my-kafka-streaming-lab", topics: [] };
    expect(classifyRepo(unknown)).toBe("streaming");
  });

  it("keeps unrelated repositories in the Other category", () => {
    const unrelated = {
      ...repoFixture,
      name: "miscellaneous-notes",
      description: "General notes",
      topics: [],
    };
    expect(classifyRepo(unrelated)).toBe("other");
  });

  it("does not treat short abbreviations as arbitrary substrings", () => {
    const htmlPortfolio = {
      ...repoFixture,
      name: "simple-html-portfolio",
      description: "Personal website",
      topics: [],
    };
    expect(classifyRepo(htmlPortfolio)).toBe("web-apps");

    const publicNotes = {
      ...repoFixture,
      name: "public-notes",
      description: "General notes",
      topics: [],
    };
    expect(classifyRepo(publicNotes)).toBe("other");
  });

  it("scores featured repos higher than plain ones", () => {
    const plain = { ...repoFixture, name: "random-notes", description: null, topics: [] };
    expect(scoreRepo(repoFixture, "streaming")).toBeGreaterThan(scoreRepo(plain, "web-apps"));
  });
});

describe("contact validation", () => {
  it("rejects invalid emails and short messages", () => {
    const result = contactSchema.safeParse({
      name: "A",
      email: "not-an-email",
      subject: "Hi",
      opportunityType: "Internship",
      message: "short",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid submission and rejects filled honeypots", () => {
    const base = {
      name: "Jane Recruiter",
      email: "jane@company.com",
      subject: "Junior DE role",
      opportunityType: "Data Engineering Role",
      message: "We would like to interview you for our data platform team.",
      website: "",
    };
    expect(contactSchema.safeParse(base).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, website: "spammy" }).success).toBe(false);
  });

  it("sanitizes HTML angle brackets and header line breaks", () => {
    expect(sanitizePlainText("<script>alert(1)</script>hi")).toBe("scriptalert(1)/scripthi");
    expect(sanitizeSingleLine("Hello\r\nBcc: attacker@example.com")).toBe(
      "Hello Bcc: attacker@example.com",
    );
  });

  it("rejects multi-line subject values submitted directly to the API", () => {
    const result = contactSchema.safeParse({
      name: "Jane Recruiter",
      email: "jane@company.com",
      subject: "Role\r\nBcc: attacker@example.com",
      opportunityType: "Data Engineering Role",
      message: "This is a valid length message for the contact form.",
      website: "",
    });
    expect(result.success).toBe(false);
  });
});


describe("request security", () => {
  it("accepts local same-site origins and rejects unrelated origins", () => {
    expect(
      isAllowedOrigin(
        new Request("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { origin: "http://localhost:3000" },
        }),
      ),
    ).toBe(true);

    expect(
      isAllowedOrigin(
        new Request("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { origin: "https://malicious.example" },
        }),
      ),
    ).toBe(false);
  });

  it("requires JSON and rejects oversized request bodies", async () => {
    const wrongType = await readJsonBody(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "content-type": "text/plain" },
        body: "hello",
      }),
    );
    expect(wrongType).toMatchObject({ ok: false, status: 415 });

    const oversized = await readJsonBody(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "x".repeat(17_000) }),
      }),
    );
    expect(oversized).toMatchObject({ ok: false, status: 413 });
  });

  it("enforces the in-memory request limit for a unique key", async () => {
    const key = `unit-test-${Date.now()}-${Math.random()}`;
    expect((await rateLimit(key, 2, 60_000)).allowed).toBe(true);
    expect((await rateLimit(key, 2, 60_000)).allowed).toBe(true);
    const blocked = await rateLimit(key, 2, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});

describe("utils", () => {
  it("cn joins truthy classes", () => {
    expect(cn("a", false, "b", undefined)).toBe("a b");
  });
  it("slugify normalizes text", () => {
    expect(slugify("Hello World 2026!")).toBe("hello-world-2026");
  });
  it("truncate shortens long strings with ellipsis", () => {
    expect(truncate("abcdef", 4)).toBe("abc…");
  });
});

describe("ui components", () => {
  it("TechBadge renders its label", () => {
    render(<TechBadge label="Apache Kafka" />);
    expect(screen.getByText("Apache Kafka")).toBeInTheDocument();
  });
});
