"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "48px 24px 32px",
        }}
      >
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                letterSpacing: "0.05em",
                marginBottom: "12px",
              }}
            >
              REVO<span style={{ color: "var(--color-accent)" }}>SHOP</span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", lineHeight: "1.7", maxWidth: "220px" }}>
              Next-generation commerce. Premium products, seamless experience.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "16px",
              }}
            >
              Shop
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/", label: "All Products" },
                { href: "/promotions", label: "Promotions" },
                { href: "/cart", label: "Cart" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "14px",
                    color: "var(--color-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-text)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "16px",
              }}
            >
              Support
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/login", label: "Account" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "14px",
                    color: "var(--color-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-text)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "16px",
              }}
            >
              Stay Updated
            </h4>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", marginBottom: "12px" }}>
              Get deals and news in your inbox.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  padding: "10px 14px",
                  fontSize: "13px",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                }}
              />
              <button className="btn-primary" style={{ padding: "10px 16px", fontSize: "12px" }}>
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            © 2025 RevoShop. Built with Next.js & FakeStoreAPI.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <span
                key={item}
                style={{ fontSize: "12px", color: "var(--color-muted)", cursor: "pointer" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
