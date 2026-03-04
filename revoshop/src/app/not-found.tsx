"use client";

import Link from "next/link";

export default function NotFound() {
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
            fontFamily: "var(--font-display)",
            fontSize: "clamp(80px, 20vw, 200px)",
            lineHeight: "0.9",
            color: "var(--color-border)",
            letterSpacing: "-0.02em",
            marginBottom: "32px",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "32px",
            letterSpacing: "0.1em",
            color: "var(--color-accent)",
            marginBottom: "16px",
          }}
        >
          PAGE NOT FOUND
        </h1>
        <p
          style={{
            color: "var(--color-muted)",
            maxWidth: "380px",
            margin: "0 auto 32px",
            lineHeight: "1.7",
          }}
        >
          Looks like this page slipped out of the catalog. Let&apos;s get you back on track.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link href="/" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
