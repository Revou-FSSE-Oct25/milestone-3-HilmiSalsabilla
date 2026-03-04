"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product, NewProduct } from "@/app/types";
import { useAuth } from "@/app/context/AuthContext";

const emptyForm: NewProduct = {
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "https://fakestoreapi.com/img/81fAn1i5mGL._AC_SX466_.jpg",
};

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<NewProduct>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchProducts();
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/products?limit=12");
      if (!res.ok) throw new Error("Failed to load products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    setEditProduct(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.category) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    setSubmitting(true);
    try {
      if (editProduct) {
        // Update (PUT)
        const res = await fetch(`https://fakestoreapi.com/products/${editProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Update failed");
        // Optimistic update
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editProduct.id
              ? { ...p, ...formData }
              : p
          )
        );
        showToast(`"${formData.title}" updated successfully`);
      } else {
        // Create (POST)
        const res = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Create failed");
        const newProduct: Product = await res.json();
        setProducts((prev) => [{ ...formData, id: newProduct.id || Date.now(), rating: { rate: 0, count: 0 } }, ...prev]);
        showToast(`"${formData.title}" created successfully`);
      }
      setShowModal(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Operation failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
      showToast("Product deleted successfully");
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 200,
            background: toast.type === "success" ? "#1a3a1a" : "rgba(255,61,61,0.15)",
            border: `1px solid ${toast.type === "success" ? "#4a9a4a" : "rgba(255,61,61,0.4)"}`,
            color: toast.type === "success" ? "#4a9a4a" : "var(--color-accent2)",
            padding: "14px 20px",
            fontSize: "13px",
            fontWeight: "500",
            maxWidth: "360px",
            animation: "slideIn 0.3s ease",
            backdropFilter: "blur(10px)",
          }}
        >
          {toast.type === "success" ? "✓ " : "⚠ "}{toast.msg}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          padding: "28px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "36px",
                  letterSpacing: "0.08em",
                  color: "var(--color-text)",
                  margin: 0,
                }}
              >
                DASHBOARD
              </h1>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "rgba(232,255,0,0.1)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(232,255,0,0.3)",
                  padding: "3px 8px",
                }}
              >
                Admin
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: 0 }}>
              Welcome, {user?.name?.firstname} {user?.name?.lastname} — Product Management
            </p>
          </div>

          <button onClick={openCreate} className="btn-primary">
            + Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px 24px 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
          }}
        >
          {[
            { label: "Total Products", value: products.length, color: "var(--color-accent)" },
            { label: "Categories", value: [...new Set(products.map((p) => p.category))].length, color: "var(--color-accent3)" },
            { label: "Avg Price", value: `$${products.length ? (products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(0) : 0}`, color: "#ffd700" },
            { label: "Avg Rating", value: products.length ? (products.reduce((s, p) => s + p.rating.rate, 0) / products.length).toFixed(1) : "0", color: "#ff9de2" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "32px",
                  color: stat.color,
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "11px", color: "var(--color-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table area */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
        {/* Search */}
        <div style={{ marginBottom: "16px", position: "relative", maxWidth: "360px" }}>
          <svg
            width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-muted)", pointerEvents: "none" }}
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: "64px", borderRadius: "2px" }} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ textAlign: "center", padding: "48px", color: "var(--color-accent2)" }}>
            <p>{error}</p>
            <button onClick={fetchProducts} className="btn-secondary" style={{ marginTop: "16px" }}>
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div style={{ border: "1px solid var(--color-border)", overflow: "hidden" }}>
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr 120px 90px 70px 90px",
                gap: "16px",
                padding: "10px 16px",
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              <span>IMG</span>
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Rating</span>
              <span style={{ textAlign: "right" }}>Actions</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--color-muted)", fontSize: "13px" }}>
                No products found
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "48px 1fr 120px 90px 70px 90px",
                      gap: "16px",
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--color-border)",
                      alignItems: "center",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#fff",
                        border: "1px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={32}
                        height={32}
                        style={{ objectFit: "contain", width: "100%", height: "100%" }}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "var(--color-text)",
                          margin: "0 0 2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.title}
                      </p>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--color-muted)",
                        }}
                      >
                        ID #{product.id}
                      </span>
                    </div>

                    <span className="tag-chip" style={{ fontSize: "10px" }}>
                      {product.category}
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        color: "var(--color-accent)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </span>

                    <span style={{ fontSize: "12px", color: "#ffd700" }}>
                      ★ {product.rating.rate}
                    </span>

                    <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => openEdit(product)}
                        style={{
                          padding: "6px 12px",
                          background: "transparent",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-muted)",
                          fontSize: "11px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontFamily: "var(--font-body)",
                          fontWeight: "600",
                          letterSpacing: "0.06em",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.target as HTMLElement;
                          el.style.borderColor = "var(--color-text)";
                          el.style.color = "var(--color-text)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.target as HTMLElement;
                          el.style.borderColor = "var(--color-border)";
                          el.style.color = "var(--color-muted)";
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="btn-danger"
                        style={{ padding: "6px 10px", fontSize: "11px" }}
                      >
                        Del
                      </button>
                    </div>
                  </div>

                  {/* Delete confirmation inline */}
                  {deleteConfirm === product.id && (
                    <div
                      style={{
                        padding: "14px 16px",
                        background: "rgba(255,61,61,0.06)",
                        borderBottom: "1px solid rgba(255,61,61,0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "13px",
                      }}
                    >
                      <span style={{ color: "var(--color-accent2)" }}>
                        Delete &quot;{product.title.slice(0, 40)}...&quot;?
                      </span>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{
                          background: "var(--color-accent2)",
                          color: "#fff",
                          border: "none",
                          padding: "6px 16px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="btn-secondary"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.2s ease",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              width: "100%",
              maxWidth: "520px",
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "fadeUp 0.25s ease",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                {editProduct ? "EDIT PRODUCT" : "ADD PRODUCT"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  background: "none",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-muted)",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Title */}
              <div>
                <label style={{...}}>Title *</label>
                <input type="text" value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>

              {/* Category */}
              <div>
                <label style={{...}}>Category *</label>
                <input type="text" value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>

              {/* Price */}
              <div>
                <label style={{...}}>Price *</label>
                <input type="number" value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} />
              </div>

              {/* Image URL */}
              <div>
                <label style={{...}}>Image URL</label>
                <input type="text" value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
              </div>

              {/* Description */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    marginBottom: "8px",
                  }}
                >
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product description..."
                  rows={4}
                  style={{
                    width: "100%",
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                    padding: "11px 14px",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    resize: "vertical",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                />
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary"
                  style={{ flex: 1, opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Saving..." : editProduct ? "Save Changes" : "Create Product"}
                </button>
                <button onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
