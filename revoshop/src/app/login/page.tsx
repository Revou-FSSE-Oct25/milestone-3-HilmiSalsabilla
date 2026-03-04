"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [localError, setLocalError] = useState<string | null>(null);

  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      setLocalError("Please fill in all fields");
      return;
    }
    setLocalError(null);
    try {
      await login({ username: form.username, password: form.password });
      router.push("/");
    } catch {
      // Error shown from context
    }
  };

  const handleDemoLogin = async () => {
    setLocalError(null);
    try {
      await login({ username: "johnd", password: "m38rmF$" });
      router.push("/");
    } catch {
      // Error shown from context
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(232,255,0,0.03) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "48px",
              letterSpacing: "0.05em",
              marginBottom: "8px",
            }}
          >
            REVO<span style={{ color: "var(--color-accent)" }}>SHOP</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              letterSpacing: "0.1em",
              color: "var(--color-muted)",
              fontWeight: "normal",
            }}
          >
            SIGN IN
          </h1>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "36px",
          }}
        >
          {/* Error */}
          {(error || localError) && (
            <div
              style={{
                background: "rgba(255,61,61,0.08)",
                border: "1px solid rgba(255,61,61,0.3)",
                color: "var(--color-accent2)",
                padding: "12px 16px",
                fontSize: "13px",
                marginBottom: "24px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span>⚠</span>
              {localError || error}
            </div>
          )}

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  marginBottom: "8px",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Enter your username"
                style={{
                  width: "100%",
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  padding: "12px 16px",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  padding: "12px 16px",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn-primary"
              style={{
                width: "100%",
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "wait" : "pointer",
              }}
            >
              {isLoading ? "Signing in..." : "Sign In →"}
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              margin: "24px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            <span style={{ fontSize: "11px", color: "var(--color-muted)", letterSpacing: "0.08em" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          </div>

          {/* Demo login */}
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="btn-secondary"
            style={{ width: "100%" }}
          >
            Use Demo Account
          </button>

          {/* Demo credentials */}
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              background: "rgba(232,255,0,0.04)",
              border: "1px solid rgba(232,255,0,0.15)",
              fontSize: "12px",
              color: "var(--color-muted)",
              lineHeight: "1.7",
            }}
          >
            <strong style={{ color: "var(--color-accent)", display: "block", marginBottom: "4px" }}>
              Demo Credentials
            </strong>
            Username: <code style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}>johnd</code>
            <br />
            Password: <code style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}>m38rmF$</code>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "12px",
            color: "var(--color-muted)",
          }}
        >
          Powered by FakeStoreAPI authentication
        </p>
      </div>
    </div>
  );
}
