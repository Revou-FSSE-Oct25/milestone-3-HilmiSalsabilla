"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isInCart, totalItems } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details">("description");

  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data: Product = await res.json();
        setProduct(data);

        // Fetch related products (same category)
        const allRes = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(data.category)}`);
        if (allRes.ok) {
          const allData: Product[] = await allRes.json();
          setRelated(allData.filter((p) => p.id !== data.id).slice(0, 4));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const inCart = product ? isInCart(product.id) : false;

  const renderStars = (rate: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{ color: i < Math.round(rate) ? "#ffd700" : "var(--color-border)", fontSize: "16px" }}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
          }}
        >
          <div className="skeleton" style={{ aspectRatio: "1", borderRadius: "2px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "20px" }}>
            <div className="skeleton" style={{ height: "14px", width: "30%", borderRadius: "2px" }} />
            <div className="skeleton" style={{ height: "40px", width: "80%", borderRadius: "2px" }} />
            <div className="skeleton" style={{ height: "24px", width: "20%", borderRadius: "2px" }} />
            <div className="skeleton" style={{ height: "80px", borderRadius: "2px" }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "36px",
            color: "var(--color-accent2)",
            letterSpacing: "0.1em",
            marginBottom: "16px",
          }}
        >
          PRODUCT NOT FOUND
        </h2>
        <p style={{ color: "var(--color-muted)", marginBottom: "32px" }}>{error}</p>
        <Link href="/" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          <Link href="/" style={{ color: "var(--color-muted)", textDecoration: "none" }}>Shop</Link>
          <span style={{ color: "var(--color-border)" }}>›</span>
          <span style={{ color: "var(--color-muted)", textTransform: "capitalize" }}>{product.category}</span>
          <span style={{ color: "var(--color-border)" }}>›</span>
          <span
            style={{
              color: "var(--color-text)",
              maxWidth: "240px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Product */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "48px 24px",
          display: "grid",
          gridTemplateColumns: "minmax(320px, 560px) 1fr",
          gap: "60px",
          alignItems: "start",
        }}
      >
        {/* Image Panel */}
        <div
          style={{
            position: "sticky",
            top: "100px",
            background: "#fff",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            aspectRatio: "1",
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            priority
          />
        </div>

        {/* Info Panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            animation: "fadeUp 0.5s ease forwards",
          }}
        >
          {/* Category + ID */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span className="tag-chip" style={{ color: "var(--color-accent)", borderColor: "rgba(232,255,0,0.3)" }}>
              {product.category}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-muted)",
              }}
            >
              #{String(product.id).padStart(4, "0")}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: "600",
              lineHeight: "1.3",
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex" }}>{renderStars(product.rating.rate)}</div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--color-muted)",
              }}
            >
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "52px",
                color: "var(--color-accent)",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              ${product.price.toFixed(2)}
            </span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "var(--color-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                In Stock
              </div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4a9a4a",
                  display: "inline-block",
                  marginTop: "4px",
                }}
              />
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--color-border)",
                marginBottom: "16px",
              }}
            >
              {(["description", "details"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "10px 20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: "none",
                    border: "none",
                    borderBottom: `2px solid ${activeTab === tab ? "var(--color-accent)" : "transparent"}`,
                    color: activeTab === tab ? "var(--color-accent)" : "var(--color-muted)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-body)",
                    marginBottom: "-1px",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "description" ? (
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-muted)",
                  lineHeight: "1.8",
                  margin: 0,
                }}
              >
                {product.description}
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Product ID", value: `#${product.id}` },
                  { label: "Category", value: product.category },
                  { label: "Rating", value: `${product.rating.rate}/5 (${product.rating.count} reviews)` },
                  { label: "Price", value: `$${product.price.toFixed(2)}` },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--color-border)",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ color: "var(--color-muted)" }}>{label}</span>
                    <span style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{
                flex: 1,
                minWidth: "200px",
                background: addedFeedback ? "#1a3a1a" : undefined,
                color: addedFeedback ? "#4a9a4a" : undefined,
              }}
            >
              {addedFeedback ? "✓ Added to Cart" : inCart ? "Add Again" : "Add to Cart"}
            </button>

            <Link
              href="/cart"
              className="btn-secondary"
              style={{ flex: 1, minWidth: "160px", textDecoration: "none", textAlign: "center" }}
            >
              View Cart {totalItems > 0 && `(${totalItems})`}
            </Link>
          </div>

          {/* Back link */}
          <button
            onClick={() => router.back()}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-muted)",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: 0,
              fontFamily: "var(--font-body)",
            }}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "48px 24px",
            background: "var(--color-surface)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                letterSpacing: "0.08em",
                color: "var(--color-text)",
                marginBottom: "24px",
              }}
            >
              RELATED PRODUCTS
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {related.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                  <div
                    className="product-card"
                    style={{
                      background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ background: "#fff", padding: "20px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Image src={p.image} alt={p.title} width={160} height={160} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                    </div>
                    <div style={{ padding: "14px" }}>
                      <p style={{ fontSize: "12px", color: "var(--color-muted)", margin: "0 0 6px", lineHeight: "1.4" }}>
                        {p.title.length > 50 ? p.title.slice(0, 50) + "..." : p.title}
                      </p>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: "var(--color-accent)" }}>
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
