"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "64px",
            marginBottom: "24px",
          }}
        >
          ⚡
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "36px",
            letterSpacing: "0.1em",
            color: "var(--color-accent2)",
            marginBottom: "12px",
          }}
        >
          SOMETHING BROKE
        </h1>
        <p
          style={{
            color: "var(--color-muted)",
            maxWidth: "400px",
            margin: "0 auto 32px",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            background: "var(--color-surface)",
            padding: "12px 20px",
            border: "1px solid var(--color-border)",
          }}
        >
          {error.message || "An unexpected error occurred"}
        </p>
        <button onClick={reset} className="btn-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}
