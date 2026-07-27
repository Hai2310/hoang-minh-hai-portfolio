import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface ArchitectureFlowProps {
  /** Ordered pipeline stages, e.g. ["Source API", "Kafka", "Spark", "S3"] */
  stages: string[];
  /** Accessible description of the whole diagram */
  ariaLabel: string;
  compact?: boolean;
  className?: string;
}

/**
 * Animated architecture flow: stage nodes connected by dashed lines with
 * data packets moving through them. Horizontal on desktop, vertical on
 * mobile. Animations are disabled automatically under prefers-reduced-motion.
 */
export function ArchitectureFlow({ stages, ariaLabel, compact = false, className }: ArchitectureFlowProps) {
  return (
    <div role="img" aria-label={ariaLabel} className={cn("w-full", className)}>
      {/* Horizontal (md+) */}
      <div className="hidden items-stretch md:flex" aria-hidden>
        {stages.map((stage, i) => (
          <Fragment key={stage}>
            <FlowNode label={stage} compact={compact} index={i} total={stages.length} />
            {i < stages.length - 1 && <ConnectorX index={i} />}
          </Fragment>
        ))}
      </div>
      {/* Vertical (mobile) */}
      <div className="flex flex-col md:hidden" aria-hidden>
        {stages.map((stage, i) => (
          <Fragment key={stage}>
            <FlowNode label={stage} compact={compact} index={i} total={stages.length} fullWidth />
            {i < stages.length - 1 && <ConnectorY index={i} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function FlowNode({
  label,
  compact,
  index,
  total,
  fullWidth,
}: {
  label: string;
  compact: boolean;
  index: number;
  total: number;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-center shadow-sm",
        compact ? "px-2.5 py-2" : "px-3 py-3",
        fullWidth ? "w-full" : "min-w-[86px]",
      )}
    >
      <span className="absolute -top-2 left-2 rounded bg-surface-2 px-1 font-mono text-[9px] text-muted">
        {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
      <span className={cn("font-medium leading-tight text-foreground", compact ? "text-[11px]" : "text-xs")}>{label}</span>
      <span className="status-dot absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-success" />
    </div>
  );
}

function ConnectorX({ index }: { index: number }) {
  return (
    <div className="relative mx-1 min-w-[28px] flex-1 self-center">
      <div className="h-0 w-full border-t-2 border-dashed border-accent/45" />
      <span
        className="packet-x absolute -top-[3px] h-2 w-2 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/70"
        style={{ animationDelay: `${index * 0.45}s` }}
      />
    </div>
  );
}

function ConnectorY({ index }: { index: number }) {
  return (
    <div className="relative mx-auto h-9 w-0">
      <div className="h-full w-0 border-l-2 border-dashed border-accent/45" />
      <span
        className="packet-y absolute -left-[3px] h-2 w-2 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/70"
        style={{ animationDelay: `${index * 0.45}s` }}
      />
    </div>
  );
}
