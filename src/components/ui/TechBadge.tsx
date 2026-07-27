import { cn } from "@/lib/utils";

export function TechBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] leading-none text-muted transition-colors hover:border-accent/50 hover:text-foreground",
        className,
      )}
    >
      {label}
    </span>
  );
}
