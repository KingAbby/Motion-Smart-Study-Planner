"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useLanguage } from "@/lib/LanguageContext";
import { useUser } from "@/lib/UserContext";
import { translations } from "@/lib/translations";

export default function SignInPage() {
  const { language } = useLanguage();
  const { signIn, isAuthenticated } = useUser();
  const router = useRouter();
  const t = translations[language].auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError(t.requiredFields);
      return;
    }

    const result = signIn(email, password);
    if (!result.ok) {
      setError(t.invalidCredentials);
      return;
    }

    setError("");
    router.push("/");
  };

  return (
    <div className="auth-shell">
      <div className="glass-card-static auth-card" style={{ maxWidth: "460px", padding: "30px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "6px" }}>{t.signInTitle}</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "22px", fontSize: "14px" }}>
          {t.signInSubtitle}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
              {t.email}
            </label>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
              {t.password}
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="input-field"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingRight: "42px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>
          </div>

          {error ? (
            <div
              style={{
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                background: "rgba(239, 68, 68, 0.15)",
                color: "#f87171",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          ) : null}

          <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
            {t.signIn}
          </button>
        </form>

        <p style={{ marginTop: "16px", color: "var(--text-secondary)", fontSize: "14px" }}>
          {t.noAccount} <Link href="/sign-up" style={{ color: "var(--text-accent)", fontWeight: 600 }}>{t.signUp}</Link>
        </p>
      </div>
    </div>
  );
}
