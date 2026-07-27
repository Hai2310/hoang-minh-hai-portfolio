import Link from "next/link";
import { ArrowLeft, Database, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grid-bg flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
          <Database className="h-8 w-8" aria-hidden />
        </div>
        <p className="terminal-label">error · 404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          <span className="text-gradient">404</span> — Record Not Found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          The page you requested does not exist in this dataset. It may have been moved, renamed, or never ingested.
        </p>
        <div className="mt-4 rounded-lg border border-border bg-surface p-3 text-left font-mono text-xs text-muted">
          <p>
            <span className="text-accent">$</span> SELECT * FROM pages WHERE slug = &apos;current-url&apos;;
          </p>
          <p className="mt-1 text-red-500">-- 0 rows returned</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:opacity-95"
          >
            <Home className="h-4 w-4" aria-hidden /> Back to Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Browse Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
