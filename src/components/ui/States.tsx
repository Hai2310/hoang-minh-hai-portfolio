import { AlertTriangle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export function ErrorState({
  title = "Something went wrong",
  message = "The content could not be loaded. Please try again later.",
  className,
}: {
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn("flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-8 text-center", className)}
    >
      <AlertTriangle className="h-8 w-8 text-amber-500" aria-hidden />
      <p className="font-semibold text-foreground">{title}</p>
      <p className="max-w-md text-sm text-muted">{message}</p>
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message = "There is no content to display right now.",
  className,
}: {
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface p-8 text-center", className)}>
      <Inbox className="h-8 w-8 text-muted" aria-hidden />
      <p className="font-semibold text-foreground">{title}</p>
      <p className="max-w-md text-sm text-muted">{message}</p>
    </div>
  );
}

export function LoadingSkeleton({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)} aria-busy="true" aria-label="Loading content">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border border-border bg-surface p-5">
          <div className="mb-3 h-4 w-2/3 rounded bg-surface-2" />
          <div className="mb-2 h-3 w-full rounded bg-surface-2" />
          <div className="mb-4 h-3 w-5/6 rounded bg-surface-2" />
          <div className="flex gap-2">
            <div className="h-5 w-14 rounded bg-surface-2" />
            <div className="h-5 w-14 rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
