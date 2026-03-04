export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "40px",
          letterSpacing: "0.15em",
          color: "var(--color-accent)",
          animation: "pulse 1.5s ease infinite",
        }}
      >
        REVO<span style={{ color: "var(--color-muted)" }}>SHOP</span>
      </div>
      <div
        style={{
          width: "48px",
          height: "2px",
          background: "var(--color-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "50%",
            background: "var(--color-accent)",
            animation: "loadBar 1.2s ease infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes loadBar {
          0% { left: -50%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
