import { cn } from "@/lib/utils";

/**
 * Premium abstract Data Engineer avatar: connected nodes around a database
 * symbol with the initials "HMH". Used when no /public/profile.jpg exists.
 */
export function Avatar({ className, label = "Abstract Data Engineer avatar with initials HMH" }: { className?: string; label?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2",
        className,
      )}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="av-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="60%" stopColor="var(--accent-2)" />
            <stop offset="100%" stopColor="var(--accent-3)" />
          </linearGradient>
        </defs>
        {/* connection lines */}
        <g stroke="url(#av-grad)" strokeWidth="1" opacity="0.55">
          <line x1="20" y1="24" x2="60" y2="52" />
          <line x1="100" y1="20" x2="60" y2="52" />
          <line x1="16" y1="88" x2="60" y2="74" />
          <line x1="104" y1="92" x2="60" y2="74" />
          <line x1="60" y1="52" x2="60" y2="74" />
        </g>
        {/* outer nodes */}
        <g fill="url(#av-grad)">
          <circle cx="20" cy="24" r="5" />
          <circle cx="100" cy="20" r="5" />
          <circle cx="16" cy="88" r="5" />
          <circle cx="104" cy="92" r="5" />
        </g>
        {/* database cylinder */}
        <g stroke="url(#av-grad)" strokeWidth="2.5" fill="none">
          <ellipse cx="60" cy="56" rx="18" ry="7" />
          <path d="M42 56 v18 c0 3.9 8 7 18 7 s18 -3.1 18 -7 v-18" />
          <path d="M42 65 c0 3.9 8 7 18 7 s18 -3.1 18 -7" opacity="0.7" />
        </g>
      </svg>
      <span className="absolute bottom-2 right-3 font-mono text-[10px] font-bold tracking-widest text-muted">
        HMH
      </span>
    </div>
  );
}
