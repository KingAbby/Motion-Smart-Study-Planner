"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { useUser } from "@/lib/UserContext";
import { translations } from "@/lib/translations";

export default function SignUpPage() {
  const { language } = useLanguage();
  const { signUp, isAuthenticated } = useUser();
  const router = useRouter();
  const t = translations[language].auth;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState("");

  const semesterOptions = useMemo(
    () => Array.from({ length: 14 }, (_, index) => String(index + 1)),
    [],
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const values = [firstName, lastName, email, password, university, major, semester];
    if (values.some((value) => !value.trim())) {
      setError(t.requiredFields);
      return;
    }

    const result = signUp({
      firstName,
      lastName,
      email,
      password,
      university,
      major,
      semester,
    });

    if (!result.ok) {
      setError(t.emailExists);
      return;
    }

    setError("");
    router.push("/");
  };

  return (
    <div className="auth-shell">
      <div className="glass-card-static auth-card" style={{ maxWidth: "760px", padding: "30px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "6px" }}>{t.signUpTitle}</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "22px", fontSize: "14px" }}>
          {t.signUpSubtitle}
        </p>

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

          <div className="grid-2" style={{ gap: "14px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                {t.email}
              </label>
              <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                {t.password}
              </label>
              <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
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
            <select className="input-field" value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="">{t.selectSemester}</option>
              {semesterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
            {t.signUp}
          </button>
        </form>

        <p style={{ marginTop: "16px", color: "var(--text-secondary)", fontSize: "14px" }}>
          {t.haveAccount} <Link href="/sign-in" style={{ color: "var(--text-accent)", fontWeight: 600 }}>{t.signIn}</Link>
        </p>
      </div>
    </div>
  );
}
