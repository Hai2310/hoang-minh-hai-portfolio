import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Hoang Minh Hai — Data Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const stages = ["Source", "Ingest", "Process", "Store", "Serve", "Monitor"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050a14 0%, #0b1220 55%, #101a2e 100%)",
          padding: 64,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(28,42,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(28,42,68,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#34d399",
              fontSize: 22,
              marginBottom: 28,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#34d399" }} />
            Open to Data Engineering Opportunities
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: "#e8eefb", letterSpacing: -2 }}>
            Hoang Minh Hai
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 700,
              marginTop: 8,
              background: "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Data Engineer
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8ea0bd", marginTop: 18 }}>
            Data Pipeline • Cloud • Big Data
          </div>
        </div>

        {/* pipeline motif */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, position: "relative" }}>
          {stages.map((stage, i) => (
            <div key={stage} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  padding: "12px 22px",
                  borderRadius: 12,
                  border: "1px solid #1c2a44",
                  background: "rgba(11,18,32,0.9)",
                  color: i === 0 ? "#22d3ee" : "#8ea0bd",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {stage}
              </div>
              {i < stages.length - 1 && (
                <div
                  style={{
                    width: 46,
                    height: 0,
                    borderTop: "2px dashed rgba(34,211,238,0.5)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
