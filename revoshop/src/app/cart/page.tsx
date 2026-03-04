"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "24px",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            filter: "grayscale(1) opacity(0.4)",
          }}
        >
          🛍
        </div>
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "36px",
              letterSpacing: "0.1em",
              color: "var(--color-text)",
              marginBottom: "8px",
            }}
          >
            CART IS EMPTY
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Looks like you haven&apos;t added anything yet.
          </p>
        </div>
        <Link href="/" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          padding: "32px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "48px",
              letterSpacing: "0.05em",
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            YOUR CART
            <span
              style={{
                marginLeft: "16px",
                fontFamily: "var(--font-mono)",
                fontSize: "18px",
                color: "var(--color-muted)",
              }}
            >
              ({totalItems} item{totalItems !== 1 ? "s" : ""})
            </span>
          </h1>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* Cart Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 100px 40px",
              gap: "16px",
              padding: "10px 16px",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span>Product</span>
            <span style={{ textAlign: "center" }}>Quantity</span>
            <span style={{ textAlign: "right" }}>Price</span>
            <span />
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 100px 40px",
                gap: "16px",
                padding: "20px 16px",
                borderBottom: "1px solid var(--color-border)",
                alignItems: "center",
                animation: "fadeIn 0.3s ease",
              }}
            >
              {/* Product info */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    background: "#fff",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={56}
                    height={56}
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  />
                </div>
                <div>
                  <Link
                    href={`/product/${item.id}`}
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "var(--color-text)",
                      textDecoration: "none",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </Link>
                  <span className="tag-chip" style={{ marginTop: "6px", display: "inline-block" }}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0",
                  border: "1px solid var(--color-border)",
                }}
              >
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "none",
                    border: "none",
                    color: "var(--color-muted)",
                    cursor: "pointer",
                    fontSize: "18px",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-text)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
                >
                  −
                </button>
                <span
                  style={{
                    width: "36px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-text)",
                    fontWeight: "600",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "none",
                    border: "none",
                    color: "var(--color-muted)",
                    cursor: "pointer",
                    fontSize: "18px",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-text)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    color: "var(--color-accent)",
                    letterSpacing: "0.02em",
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                {item.quantity > 1 && (
                  <div style={{ fontSize: "11px", color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                    ${item.price.toFixed(2)} each
                  </div>
                )}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  width: "32px",
                  height: "32px",
                  background: "none",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-muted)",
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.borderColor = "var(--color-accent2)";
                  el.style.color = "var(--color-accent2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.borderColor = "var(--color-border)";
                  el.style.color = "var(--color-muted)";
                }}
                title="Remove item"
              >
                ×
              </button>
            </div>
          ))}

          {/* Clear cart */}
          <div style={{ padding: "16px 16px 0" }}>
            <button onClick={clearCart} className="btn-danger">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div
          style={{
            position: "sticky",
            top: "100px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "28px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              letterSpacing: "0.08em",
              marginBottom: "24px",
            }}
          >
            ORDER SUMMARY
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span style={{ color: "var(--color-muted)" }}>Subtotal ({totalItems} items)</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span style={{ color: "var(--color-muted)" }}>Shipping</span>
              <span style={{ color: "#4a9a4a", fontSize: "12px", fontWeight: "600" }}>FREE</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span style={{ color: "var(--color-muted)" }}>Tax (est.)</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "20px",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "600", fontSize: "15px" }}>Total</span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                color: "var(--color-accent)",
                letterSpacing: "0.02em",
              }}
            >
              ${(totalPrice * 1.08).toFixed(2)}
            </span>
          </div>

          <button
            className="btn-primary"
            style={{ width: "100%", fontSize: "14px" }}
            onClick={() => alert("Checkout not implemented in this demo.")}
          >
            Proceed to Checkout →
          </button>

          <Link
            href="/"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "14px",
              fontSize: "12px",
              color: "var(--color-muted)",
              textDecoration: "none",
            }}
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
