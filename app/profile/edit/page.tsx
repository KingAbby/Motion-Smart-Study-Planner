"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLanguage } from "@/lib/LanguageContext";
import { useUser } from "@/lib/UserContext";
import { translations } from "@/lib/translations";

export default function EditProfilePage() {
  const { language } = useLanguage();
  const { isAuthenticated, userProfile, updateProfile } = useUser();
  const router = useRouter();
  const t = translations[language].editProfile;

  const [firstName, setFirstName] = useState(userProfile?.firstName || "");
  const [lastName, setLastName] = useState(userProfile?.lastName || "");
  const [university, setUniversity] = useState(userProfile?.university || "");
  const [major, setMajor] = useState(userProfile?.major || "");
  const [semester, setSemester] = useState(userProfile?.semester || "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const values = [firstName, lastName, university, major, semester];
    if (values.some((value) => !value.trim())) {
      setError(t.requiredFields);
      return;
    }

    updateProfile({ firstName, lastName, university, major, semester });
    setError("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <Link href="/profile" className="btn-ghost" style={{ marginBottom: "10px" }}>
        <ArrowLeftOutlined />
        {t.backToProfile}
      </Link>

      <div className="page-header animate-fade-in">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="glass-card-static animate-fade-in" style={{ maxWidth: "760px", padding: "28px" }}>
        {saved ? (
          <div
            style={{
              padding: "10px 12px",
              borderRadius: "var(--radius-md)",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              fontSize: "13px",
              marginBottom: "12px",
            }}
          >
            {t.updated}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
          <div className="grid-2" style={{ gap: "14px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                {t.firstName}
              </label>
              <input className="input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                {t.lastName}
              </label>
              <input className="input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
              {t.email}
            </label>
            <input className="input-field" value={userProfile?.email || ""} disabled />
            <p style={{ marginTop: "6px", color: "var(--text-muted)", fontSize: "12px" }}>{t.emailReadonly}</p>
          </div>

          <div className="grid-2" style={{ gap: "14px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                {t.university}
              </label>
              <input className="input-field" value={university} onChange={(e) => setUniversity(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                {t.major}
              </label>
              <input className="input-field" value={major} onChange={(e) => setMajor(e.target.value)} />
            </div>
          </div>

          <div style={{ maxWidth: "220px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
              {t.semester}
            </label>
            <input className="input-field" value={semester} onChange={(e) => setSemester(e.target.value)} />
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

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="submit" className="btn-primary">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
