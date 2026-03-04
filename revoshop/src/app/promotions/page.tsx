"use client";

import Link from "next/link";
import { Promotion } from "@/app/types";

// Static promotional data — SSG (pre-rendered static content)
const promotions: Promotion[] = [
  {
    id: 1,
    title: "Summer Mega Sale",
    description: "Up to 50% off on all electronics. Limited time offer — don't miss out on the biggest sale of the year.",
    discount: "50% OFF",
    badge: "ELECTRONICS",
    color: "var(--color-accent)",
    endDate: "2025-08-31",
  },
  {
    id: 2,
    title: "Fashion Week Special",
    description: "Refresh your wardrobe with our curated fashion collection. New arrivals from top brands at exclusive prices.",
    discount: "30% OFF",
    badge: "FASHION",
    color: "#ff9de2",
    endDate: "2025-07-15",
  },
  {
    id: 3,
    title: "Jewelry Extravaganza",
    description: "Handpicked luxury jewelry pieces at unbeatable prices. Perfect for gifting or treating yourself.",
    discount: "40% OFF",
    badge: "JEWELRY",
    color: "#ffd700",
    endDate: "2025-07-31",
  },
  {
    id: 4,
    title: "Free Shipping Weekend",
    description: "This weekend only — free shipping on all orders, no minimum spend required. Shop without limits.",
    discount: "FREE SHIP",
    badge: "ALL ITEMS",
    color: "var(--color-accent3)",
    endDate: "2025-07-07",
  },
];

const deals = [
  { category: "electronics", label: "Electronics", discount: "Up to 50% off", count: "300+ products" },
  { category: "jewelery", label: "Jewelry", discount: "Up to 40% off", count: "50+ pieces" },
  { category: "men's clothing", label: "Men's Fashion", discount: "Up to 30% off", count: "200+ styles" },
  { category: "women's clothing", label: "Women's Fashion", discount: "Up to 35% off", count: "300+ styles" },
];

export default function PromotionsPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Diagonal stripe accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(232,255,0,0.01) 40px,
              rgba(232,255,0,0.01) 80px
            )`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,61,61,0.1)",
              border: "1px solid rgba(255,61,61,0.3)",
              color: "var(--color-accent2)",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "5px 14px",
              marginBottom: "20px",
            }}
          >
            ⚡ Limited Time Offers
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(60px, 12vw, 120px)",
              lineHeight: "0.9",
              letterSpacing: "0.02em",
              color: "var(--color-text)",
              margin: "0 0 20px",
            }}
          >
            HOT
            <br />
            <span style={{ color: "var(--color-accent)" }}>DEALS</span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--color-muted)",
              maxWidth: "440px",
              margin: "0 auto 36px",
              lineHeight: "1.7",
            }}
          >
            Exclusive promotions updated regularly. Check back often for the latest savings.
          </p>
        </div>
      </section>

      {/* Main Promos */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 24px 0" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            letterSpacing: "0.1em",
            color: "var(--color-text)",
            marginBottom: "28px",
          }}
        >
          FEATURED PROMOTIONS
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {promotions.map((promo, i) => (
            <div
              key={promo.id}
              style={{
                background: "var(--color-surface)",
                border: `1px solid var(--color-border)`,
                borderTop: `3px solid ${promo.color}`,
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                animation: `fadeUp 0.5s ease ${i * 80}ms both`,
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  right: "-30px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${promo.color}15 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Badge */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: promo.color,
                    background: `${promo.color}15`,
                    border: `1px solid ${promo.color}40`,
                    padding: "4px 10px",
                  }}
                >
                  {promo.badge}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "28px",
                    color: promo.color,
                    letterSpacing: "0.05em",
                  }}
                >
                  {promo.discount}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "var(--color-text)",
                  marginBottom: "10px",
                }}
              >
                {promo.title}
              </h3>

              <p
                style={{
                  fontSize: "13px",
                  color: "var(--color-muted)",
                  lineHeight: "1.7",
                  marginBottom: "20px",
                }}
              >
                {promo.description}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Ends: {promo.endDate}
                </span>
                <Link
                  href="/"
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: promo.color,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Deals */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            letterSpacing: "0.1em",
            color: "var(--color-text)",
            marginBottom: "28px",
          }}
        >
          DEALS BY CATEGORY
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "12px",
          }}
        >
          {deals.map((deal, i) => (
            <Link
              key={deal.category}
              href={`/?category=${deal.category}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="product-card"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "24px",
                  animation: `fadeUp 0.5s ease ${i * 60}ms both`,
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    marginBottom: "8px",
                  }}
                >
                  {deal.count}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    color: "var(--color-text)",
                    marginBottom: "4px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {deal.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "32px",
                    color: "var(--color-accent)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {deal.discount}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section
        style={{
          background: "var(--color-accent)",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 52px)",
            color: "#000",
            letterSpacing: "0.05em",
            marginBottom: "16px",
          }}
        >
          DON&apos;T MISS OUT
        </h2>
        <p style={{ color: "#333", marginBottom: "28px", fontSize: "15px" }}>
          Sign up for alerts and be the first to know about new deals.
        </p>
        <Link
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#000",
            color: "var(--color-accent)",
            fontWeight: "700",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "14px 36px",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          Create Account →
        </Link>
      </section>
    </div>
  );
}
