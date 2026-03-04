"use client";

import { useState } from "react";
import { FaqItem } from "@/app/types";

// Static data — represents SSG (pre-rendered, no API needed)
const faqs: FaqItem[] = [
  {
    id: 1,
    category: "Orders",
    question: "How do I place an order?",
    answer:
      "Browse our product catalog, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase. We accept all major payment methods.",
  },
  {
    id: 2,
    category: "Orders",
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 1 hour of placing them. After that window, the order enters processing and cannot be changed. Contact our support team immediately if you need assistance.",
  },
  {
    id: 3,
    category: "Shipping",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5–7 business days. Expedited shipping (2–3 days) is available at checkout for an additional fee. We offer free standard shipping on all orders over $50.",
  },
  {
    id: 4,
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to over 80 countries worldwide. International shipping times vary by destination, typically 10–21 business days. Customs fees may apply depending on your country.",
  },
  {
    id: 5,
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return window for all products. Items must be in original, unused condition with tags attached. Electronics must be unopened. Refunds are processed within 5–7 business days of receiving the return.",
  },
  {
    id: 6,
    category: "Returns",
    question: "How do I initiate a return?",
    answer:
      "Log in to your account, go to Order History, and select the item you wish to return. Generate a return label, package your item securely, and drop it off at any carrier location.",
  },
  {
    id: 7,
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page and enter your email address. You'll receive a reset link within minutes. If you don't see it, check your spam folder.",
  },
  {
    id: 8,
    category: "Account",
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We use industry-standard SSL encryption for all transactions. Your payment information is never stored on our servers. We comply with GDPR and CCPA regulations.",
  },
  {
    id: 9,
    category: "Products",
    question: "Are the products authentic?",
    answer:
      "All products sold on RevoShop are 100% authentic. We work directly with authorized distributors and brands. Each item comes with manufacturer warranty where applicable.",
  },
  {
    id: 10,
    category: "Products",
    question: "What if I receive a damaged product?",
    answer:
      "If you receive a damaged or defective item, contact us within 48 hours with photos. We'll arrange a replacement or full refund at no cost to you, including return shipping.",
  },
];

const categories = [...new Set(faqs.map((f) => f.category))];

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "64px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(0,212,255,0.07)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "var(--color-accent3)",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "5px 14px",
              marginBottom: "20px",
            }}
          >
            Static Page · SSG
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 80px)",
              letterSpacing: "0.05em",
              color: "var(--color-text)",
              margin: "0 0 16px",
            }}
          >
            FREQUENTLY ASKED
            <br />
            <span style={{ color: "var(--color-accent3)" }}>QUESTIONS</span>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-muted)", maxWidth: "480px", margin: "0 auto 32px" }}>
            Everything you need to know about shopping with RevoShop.
          </p>

          {/* Search */}
          <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-muted)",
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                padding: "14px 20px 14px 48px",
                fontSize: "14px",
                outline: "none",
                fontFamily: "var(--font-body)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--color-accent3)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* Category tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          <button
            onClick={() => setActiveCategory("all")}
            style={{
              padding: "8px 18px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: activeCategory === "all" ? "var(--color-accent3)" : "transparent",
              color: activeCategory === "all" ? "#000" : "var(--color-muted)",
              border: `1px solid ${activeCategory === "all" ? "var(--color-accent3)" : "var(--color-border)"}`,
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
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: activeCategory === cat ? "var(--color-accent3)" : "transparent",
                color: activeCategory === cat ? "#000" : "var(--color-muted)",
                border: `1px solid ${activeCategory === cat ? "var(--color-accent3)" : "var(--color-border)"}`,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "var(--font-body)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-muted)" }}>
            No questions found for &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {filtered.map((faq, i) => (
              <div
                key={faq.id}
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  animation: `fadeUp 0.4s ease ${i * 40}ms both`,
                }}
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "22px 4px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "16px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--color-muted)",
                        flexShrink: 0,
                      }}
                    >
                      {String(faq.id).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        color: openId === faq.id ? "var(--color-accent3)" : "var(--color-text)",
                        transition: "color 0.2s",
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "var(--color-muted)",
                      fontSize: "20px",
                      lineHeight: 1,
                      transform: openId === faq.id ? "rotate(45deg)" : "none",
                      transition: "transform 0.25s ease",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                {openId === faq.id && (
                  <div
                    style={{
                      padding: "0 4px 24px 44px",
                      animation: "fadeIn 0.25s ease",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--color-muted)",
                        lineHeight: "1.8",
                        margin: 0,
                        borderLeft: "2px solid var(--color-accent3)",
                        paddingLeft: "18px",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
