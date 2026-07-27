import { Fragment } from "react";
import { Activity, CheckCircle2, Database, Radio, Server } from "lucide-react";

const STAGES = [
  { name: "Sources", techs: ["Open Library API", "Databases"] },
  { name: "Ingestion", techs: ["Kafka", "NiFi"] },
  { name: "Processing", techs: ["Spark", "PySpark"] },
  { name: "Storage", techs: ["S3", "Snowflake", "Redshift"] },
  { name: "Serving", techs: ["Power BI", "REST API"] },
  { name: "Monitoring", techs: ["Grafana"] },
];

const STATUS = [
  { label: "Batch Pipelines", value: "Ready", Icon: Server },
  { label: "Streaming", value: "Active", Icon: Radio },
  { label: "Data Quality", value: "Passing", Icon: CheckCircle2 },
  { label: "Monitoring", value: "Online", Icon: Activity },
];

/**
 * Hero visual: an animated data pipeline diagram with data packets moving
 * through ingestion, processing, storage, serving, and monitoring stages.
 * Simplifies to a vertical pipeline on small screens.
 */
export function PipelineDiagram() {
  return (
    <div className="w-full">
      <div
        role="img"
        aria-label="Animated data pipeline diagram: source APIs and databases flow through Kafka and NiFi ingestion, Spark processing, S3, Snowflake and Redshift storage, then Power BI and API serving, with Grafana monitoring."
        className="rounded-2xl border border-border bg-surface/80 p-4 shadow-xl backdrop-blur sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3" aria-hidden>
          <p className="terminal-label">pipeline · main.tf</p>
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </span>
        </div>

        {/* Desktop horizontal pipeline */}
        <div className="hidden lg:flex lg:items-stretch" aria-hidden>
          {STAGES.map((stage, i) => (
            <Fragment key={stage.name}>
              <StageCard stage={stage} index={i} />
              {i < STAGES.length - 1 && (
                <div className="relative mx-0.5 w-4 shrink-0 self-center">
                  <div className="h-0 w-full border-t-2 border-dashed border-accent/45" />
                  <span
                    className="packet-x absolute -top-[3px] h-2 w-2 rounded-full bg-accent shadow-[0_0_10px] shadow-accent/80"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Mobile / tablet vertical pipeline */}
        <div className="flex flex-col lg:hidden" aria-hidden>
          {STAGES.map((stage, i) => (
            <Fragment key={stage.name}>
              <StageCard stage={stage} index={i} fullWidth />
              {i < STAGES.length - 1 && (
                <div className="relative mx-auto h-8 w-0">
                  <div className="h-full border-l-2 border-dashed border-accent/45" />
                  <span
                    className="packet-y absolute -left-[3px] h-2 w-2 rounded-full bg-accent shadow-[0_0_10px] shadow-accent/80"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Decorative status panel — not a real production system */}
        <div className="mt-5 rounded-xl border border-border bg-surface-2/70 p-3.5" aria-hidden>
          <p className="terminal-label mb-2.5 flex items-center gap-1.5">
            <Database className="h-3 w-3" /> System Status
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STATUS.map(({ label, value, Icon }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2">
                <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
                <div className="min-w-0">
                  <p className="truncate text-[10px] text-muted">{label}</p>
                  <p className="flex items-center gap-1 text-[11px] font-semibold text-success">
                    <span className="status-dot h-1.5 w-1.5 rounded-full bg-success" />
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  index,
  fullWidth,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl border border-border bg-surface-2/60 px-2.5 py-3 ${
        fullWidth ? "w-full" : "min-w-0 flex-1"
      }`}
    >
      <span className="absolute -top-2 left-2.5 rounded bg-surface px-1 font-mono text-[9px] text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="text-xs font-bold text-foreground">{stage.name}</p>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {stage.techs.map((t) => (
          <span key={t} className="rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] text-accent">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
