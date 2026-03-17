"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThunderboltOutlined } from "@ant-design/icons";
import { useLanguage } from "@/lib/LanguageContext";
import { useUser } from "@/lib/UserContext";
import { translations } from "@/lib/translations";

export default function LandingPage() {
  const { language } = useLanguage();
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const t = translations[language].auth;
  const chips = [t.landingChipOne, t.landingChipTwo, t.landingChipThree];

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="auth-shell">
      <div
        className="glass-card-static auth-card animate-fade-in"
        style={{
          maxWidth: "760px",
          padding: "44px 30px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.09))",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            top: "-70px",
            right: "-70px",
            background:
              "radial-gradient(circle, rgba(129, 140, 248, 0.24) 0%, rgba(129, 140, 248, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            bottom: "-60px",
            left: "-60px",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0) 70%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: "76px",
              height: "76px",
              borderRadius: "var(--radius-lg)",
              margin: "0 auto 18px",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "32px",
              boxShadow: "var(--accent-glow)",
            }}
          >
            <ThunderboltOutlined />
          </div>
          <h1 style={{ fontSize: "34px", marginBottom: "8px", fontWeight: 700 }}>
            {t.landingTitle}
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "22px" }}>
            {t.landingSubtitle}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            {chips.map((chip) => (
              <span key={chip} className="badge badge-primary" style={{ padding: "6px 12px" }}>
                {chip}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/sign-in" className="btn-primary">
              {t.signIn}
            </Link>
            <Link href="/sign-up" className="btn-secondary">
              {t.signUp}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
