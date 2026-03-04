"use client";

import { useState, useEffect } from "react";
import { Product } from "@/app/types";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData: Product[] = await productsRes.json();
        const categoriesData: string[] = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products
    .filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating.rate - a.rating.rate;
      return 0;
    });

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(232,255,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,255,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(232,255,0,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "80px 24px 64px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(232,255,0,0.07)",
              border: "1px solid rgba(232,255,0,0.2)",
              padding: "5px 14px",
              marginBottom: "24px",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--color-accent)",
                animation: "pulse 2s infinite",
              }}
            />
            Live Inventory
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: "0.95",
              letterSpacing: "-0.01em",
              margin: "0 0 20px",
              color: "var(--color-text)",
            }}
          >
            SHOP THE
            <br />
            <span style={{ color: "var(--color-accent)" }}>FUTURE</span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--color-muted)",
              maxWidth: "440px",
              lineHeight: "1.7",
              marginBottom: "32px",
            }}
          >
            Curated products from electronics to fashion. Discover quality items at unbeatable prices.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/promotions" className="btn-primary">
              View Promotions
            </Link>
            <Link href="/faq" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section
        style={{
          position: "sticky",
          top: "64px",
          zIndex: 50,
          background: "rgba(10,10,10,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "12px 24px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div style={{ flex: 1, minWidth: "200px", maxWidth: "360px", position: "relative" }}>
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-muted)",
                pointerEvents: "none",
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                padding: "9px 14px 9px 36px",
                fontSize: "13px",
                outline: "none",
                fontFamily: "var(--font-body)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
            />
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedCategory("all")}
              style={{
                padding: "7px 14px",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: selectedCategory === "all" ? "var(--color-accent)" : "transparent",
                color: selectedCategory === "all" ? "#000" : "var(--color-muted)",
                border: `1px solid ${selectedCategory === "all" ? "var(--color-accent)" : "var(--color-border)"}`,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "var(--font-body)",
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "7px 14px",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: selectedCategory === cat ? "var(--color-accent)" : "transparent",
                  color: selectedCategory === cat ? "#000" : "var(--color-muted)",
                  border: `1px solid ${selectedCategory === cat ? "var(--color-accent)" : "var(--color-border)"}`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-body)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              marginLeft: "auto",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              padding: "9px 14px",
              fontSize: "13px",
              outline: "none",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
            }}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>
      </section>

      {/* Products Grid */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Results count */}
        {!loading && !error && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <p style={{ fontSize: "13px", color: "var(--color-muted)" }}>
              <span style={{ color: "var(--color-text)", fontWeight: "600" }}>{filtered.length}</span>
              {" "}product{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div className="skeleton" style={{ aspectRatio: "1" }} />
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div className="skeleton" style={{ height: "14px", borderRadius: "2px", width: "90%" }} />
                  <div className="skeleton" style={{ height: "14px", borderRadius: "2px", width: "70%" }} />
                  <div className="skeleton" style={{ height: "28px", borderRadius: "2px", width: "50%", marginTop: "8px" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
              }}
            >
              ⚠
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                letterSpacing: "0.05em",
                color: "var(--color-accent2)",
                marginBottom: "8px",
              }}
            >
              ERROR
            </h3>
            <p style={{ color: "var(--color-muted)" }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary"
              style={{ marginTop: "24px" }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "32px", color: "var(--color-muted)", letterSpacing: "0.05em" }}>
                  NO RESULTS
                </p>
                <p style={{ color: "var(--color-muted)", marginTop: "8px" }}>
                  Try adjusting your search or filter.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "16px",
                }}
              >
                {filtered.map((product, i) => (
                  <div
                    key={product.id}
                    style={{
                      animation: "fadeUp 0.5s ease forwards",
                      animationFillMode: "forwards",
                      animationDelay: `${Math.min(i * 40, 400)}ms`,
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
