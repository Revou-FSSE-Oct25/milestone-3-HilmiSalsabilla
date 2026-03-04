"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/app/types";
import { useCart } from "@/app/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const categoryColors: Record<string, string> = {
    "electronics": "var(--color-accent3)",
    "jewelery": "#ffd700",
    "men's clothing": "var(--color-accent)",
    "women's clothing": "#ff9de2",
  };

  const catColor = categoryColors[product.category] ?? "var(--color-muted)";

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        className="product-card"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          height: "100%",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            background: "#fff",
            aspectRatio: "1",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          {/* Category badge */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "rgba(0,0,0,0.85)",
              border: `1px solid ${catColor}`,
              color: catColor,
              fontSize: "9px",
              fontWeight: "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "3px 8px",
              backdropFilter: "blur(8px)",
            }}
          >
            {product.category}
          </div>

          {/* Rating */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(0,0,0,0.85)",
              color: "#ffd700",
              fontSize: "10px",
              fontWeight: "600",
              padding: "3px 8px",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              backdropFilter: "blur(8px)",
            }}
          >
            ★ {product.rating.rate}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flex: 1,
          }}
        >
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--color-text)",
              lineHeight: "1.5",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </h3>

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  color: "var(--color-accent)",
                  letterSpacing: "0.02em",
                }}
              >
                ${product.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                background: added ? "#1a3a1a" : inCart ? "rgba(232,255,0,0.1)" : "transparent",
                border: `1px solid ${added ? "#4a9a4a" : inCart ? "var(--color-accent)" : "var(--color-border)"}`,
                color: added ? "#4a9a4a" : inCart ? "var(--color-accent)" : "var(--color-muted)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "7px 12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-body)",
              }}
              title={inCart ? "In cart" : "Add to cart"}
            >
              {added ? "✓ Added" : inCart ? "In Cart" : "+ Cart"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
