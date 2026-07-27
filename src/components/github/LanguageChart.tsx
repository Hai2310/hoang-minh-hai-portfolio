"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#22d3ee", "#3b82f6", "#8b5cf6", "#34d399", "#f59e0b", "#64748b"];

/** Language distribution across public repositories (by repo count). */
export function LanguageChart({ languages }: { languages: { name: string; count: number }[] }) {
  if (languages.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="terminal-label mb-2">primary languages</p>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languages}
              dataKey="count"
              nameKey="name"
              innerRadius={46}
              outerRadius={72}
              paddingAngle={3}
              strokeWidth={0}
            >
              {languages.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontSize: 12,
                color: "var(--foreground)",
              }}
              formatter={(value, name) => [`${value} repos`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted">
        {languages.map((l, i) => (
          <li key={l.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} aria-hidden />
            {l.name} <span className="ml-auto font-mono text-[10px]">{l.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
