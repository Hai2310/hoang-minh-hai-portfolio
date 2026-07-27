"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-[65vh] place-items-center px-4">
      <div className="max-w-lg rounded-2xl border border-border bg-surface p-7 text-center">
        <AlertTriangle className="mx-auto h-9 w-9 text-amber-500" aria-hidden />
        <h1 className="mt-4 text-2xl font-bold text-foreground">This page could not be loaded</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          A temporary error occurred. No form data or private information was stored.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background"
        >
          <RefreshCw className="h-4 w-4" aria-hidden /> Try again
        </button>
      </div>
    </div>
  );
}
