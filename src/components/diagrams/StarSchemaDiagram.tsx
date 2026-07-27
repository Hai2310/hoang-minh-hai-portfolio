/**
 * Star schema diagram: Fact_Sales in the center surrounded by six dimensions.
 * Rendered as SVG so it scales cleanly at any width.
 */
export function StarSchemaDiagram() {
  const dims = [
    { x: 60, y: 30, name: "Dim_Time", fields: "date · month · quarter · year" },
    { x: 440, y: 30, name: "Dim_Product", fields: "product · brand · price" },
    { x: 60, y: 140, name: "Dim_Category", fields: "category · group" },
    { x: 440, y: 140, name: "Dim_Customer", fields: "segment · region" },
    { x: 60, y: 250, name: "Dim_Employee", fields: "name · role" },
    { x: 440, y: 250, name: "Dim_Store", fields: "branch · city" },
  ];

  return (
    <div
      role="img"
      aria-label="Star schema diagram: the Fact_Sales fact table with measures Sales Amount, Quantity, Discount and Profit, connected to six dimensions: Dim_Time, Dim_Product, Dim_Category, Dim_Customer, Dim_Employee and Dim_Store."
      className="w-full overflow-x-auto"
    >
      <svg viewBox="0 0 640 330" className="mx-auto min-w-[520px] max-w-2xl" aria-hidden>
        <defs>
          <linearGradient id="fact-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-3)" />
          </linearGradient>
        </defs>
        {dims.map((d) => (
          <line
            key={`l-${d.name}`}
            x1={d.x + 70}
            y1={d.y + 30}
            x2="320"
            y2="165"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.5"
            className="anim-dash"
          />
        ))}
        {dims.map((d) => (
          <g key={d.name}>
            <rect x={d.x} y={d.y} width="140" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={d.x + 70} y={d.y + 25} textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="700" fontFamily="var(--font-mono)">
              {d.name}
            </text>
            <text x={d.x + 70} y={d.y + 44} textAnchor="middle" fill="var(--muted)" fontSize="9.5">
              {d.fields}
            </text>
          </g>
        ))}
        <g>
          <rect x="230" y="120" width="180" height="92" rx="12" fill="var(--surface)" stroke="url(#fact-grad)" strokeWidth="2.5" />
          <text x="320" y="147" textAnchor="middle" fill="var(--accent)" fontSize="15" fontWeight="800" fontFamily="var(--font-mono)">
            Fact_Sales
          </text>
          <text x="320" y="168" textAnchor="middle" fill="var(--foreground)" fontSize="10.5">
            Sales Amount · Quantity
          </text>
          <text x="320" y="185" textAnchor="middle" fill="var(--foreground)" fontSize="10.5">
            Discount · Profit
          </text>
          <text x="320" y="202" textAnchor="middle" fill="var(--muted)" fontSize="9">
            grain: transaction line
          </text>
        </g>
      </svg>
    </div>
  );
}
