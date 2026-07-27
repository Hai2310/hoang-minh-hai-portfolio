"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui" }}>
          <div style={{ maxWidth: 520, textAlign: "center" }}>
            <h1>Portfolio temporarily unavailable</h1>
            <p>Please retry. If the problem continues, use the email address in the resume.</p>
            <button type="button" onClick={reset} style={{ padding: "10px 16px", cursor: "pointer" }}>
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
