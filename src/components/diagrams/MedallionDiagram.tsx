import { ArrowRight } from "lucide-react";

const layers = [
  {
    name: "Bronze",
    subtitle: "Raw Tables",
    items: ["Staged TPC-H files", "Source metadata kept", "No business logic"],
    classes: "from-amber-700/25 to-amber-900/10 border-amber-600/40 text-amber-500",
  },
  {
    name: "Silver",
    subtitle: "Clean & Enriched",
    items: ["Typed & trimmed keys", "Deduplicated records", "Validated references"],
    classes: "from-slate-400/25 to-slate-600/10 border-slate-400/40 text-slate-400",
  },
  {
    name: "Gold",
    subtitle: "Business Metrics",
    items: ["Daily sales & revenue", "AOV & CLV", "RFM segmentation"],
    classes: "from-yellow-400/25 to-yellow-600/10 border-yellow-400/50 text-yellow-400",
  },
];

export function MedallionDiagram() {
  return (
    <div
      role="img"
      aria-label="Medallion architecture diagram: data files flow from Bronze raw tables, through Silver cleaned and enriched tables, into Gold business metrics, with Snowflake Streams capturing changes and Tasks orchestrating transformations between layers."
      className="w-full"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch" aria-hidden>
        {layers.map((layer, i) => (
          <div key={layer.name} className="flex flex-1 flex-col items-stretch gap-3 md:flex-row md:items-center">
            <div className={`flex-1 rounded-xl border bg-gradient-to-br p-4 ${layer.classes}`}>
              <p className="font-mono text-xs font-bold uppercase tracking-widest">{layer.name}</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">{layer.subtitle}</p>
              <ul className="mt-2.5 space-y-1 text-xs text-muted">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-current" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 && (
              <div className="flex flex-col items-center justify-center gap-1 self-center px-1 md:h-full">
                <span className="rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                  {i === 0 ? "Streams (CDC)" : "Tasks + Procs"}
                </span>
                <ArrowRight className="h-4 w-4 rotate-90 text-accent md:rotate-0" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
