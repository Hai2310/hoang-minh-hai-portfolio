export type ImplementationState = "implemented" | "demonstrated" | "designed" | "planned";

export interface StatusItem {
  label: string;
  state: ImplementationState;
  detail?: string;
}

export interface CaseStudySection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  status: string;
  role: string;
  context: "Internship" | "Personal Project" | "Academic Project";
  period?: string;
  github: string;
  featured: boolean;
  order: number;
  shortDescription: string;
  businessProblem: string;
  /** Ordered pipeline stages shown in the architecture flow diagram */
  architecture: string[];
  architectureNote?: string;
  diagram: "medallion" | "cloud" | "streaming" | "enterprise-etl" | "etl" | "star-schema";
  stack: string[];
  concepts: string[];
  contributions: string[];
  /** Honest implementation status where the spec requires the distinction */
  implementationStatus?: StatusItem[];
  sections: CaseStudySection[];
  challenges: string[];
  lessons: string[];
  future: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: "Internship" | "Full-time" | "Part-time";
  summary: string;
  responsibilities: string[];
  stack: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  size: number;
  fork: boolean;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
}

export type RepoCategory =
  | "data-engineering"
  | "cloud"
  | "streaming"
  | "data-warehouse"
  | "analytics-bi"
  | "ai-ml"
  | "web-apps"
  | "other";

export interface ProjectOverride {
  match: string;
  displayTitle?: string;
  category?: RepoCategory;
  featured?: boolean;
  description?: string;
  thumbnail?: string;
  techTags?: string[];
  caseStudySlug?: string;
  sortOrder?: number;
}
