"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const sessionHistory = [
  { time: "09:15 AM", duration: "25 min", subject: "Mathematics", type: "focus" },
  { time: "09:45 AM", duration: "5 min", subject: "—", type: "break" },
  { time: "09:50 AM", duration: "25 min", subject: "Mathematics", type: "focus" },
  { time: "10:20 AM", duration: "5 min", subject: "—", type: "break" },
  { time: "10:25 AM", duration: "25 min", subject: "Computer Science", type: "focus" },
  { time: "10:55 AM", duration: "15 min", subject: "—", type: "longBreak" },
];

export default function TimerPage() {
  const { language } = useLanguage();
  const t = translations[language].timer;
  const presets = [
    { label: t.presetClassic, work: 25, short: 5, long: 15 },
    { label: t.presetLongFocus, work: 50, short: 10, long: 20 },
    { label: t.presetQuickSprint, work: 15, short: 3, long: 10 },
  ];
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = isBreak ? breakMinutes * 60 : workMinutes * 60;
  const progress = 1 - secondsLeft / totalSeconds;
  const circumference = 2 * Math.PI * 140;
  const dashOffset = circumference * (1 - progress);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const resetTimer = useCallback((workMins: number) => {
    setIsRunning(false);
    setIsBreak(false);
    setSecondsLeft(workMins * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        setSessions((prev) => prev + 1);
        setIsBreak(true);
        setSecondsLeft(breakMinutes * 60);
      } else {
        setIsBreak(false);
        setSecondsLeft(workMinutes * 60);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft, isBreak, breakMinutes, workMinutes]);

  return (
    <div>
      <div className="page-header animate-fade-in">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        {/* Timer */}
        <div className="glass-card animate-fade-in" style={{ padding: "40px 24px", textAlign: "center" }}>
          {/* Mode indicator */}
          <div
            style={{
              display: "inline-flex",
              padding: "6px 16px",
              borderRadius: "var(--radius-full)",
              background: isBreak ? "rgba(16, 185, 129, 0.15)" : "rgba(99, 102, 241, 0.15)",
              color: isBreak ? "#34d399" : "#818cf8",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "32px",
            }}
          >
            {isBreak ? t.breakTime : t.focusMode}
          </div>

          {/* Timer Ring */}
          <div style={{ position: "relative", width: "300px", height: "300px", margin: "0 auto 32px" }}>
            <svg viewBox="0 0 300 300" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
              <circle
                cx="150" cy="150" r="140"
                fill="none"
                stroke="var(--bg-input)"
                strokeWidth="8"
              />
              <circle
                cx="150" cy="150" r="140"
                fill="none"
                stroke={isBreak ? "#10b981" : "url(#timerGradient)"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "64px", fontWeight: 700, fontVariantNumeric: "tabular-nums", letterSpacing: "-2px" }}>
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </div>
              <div style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
                {t.sessionLabel}{sessions + 1}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "center" }}>
            <button
              className="btn-icon"
              onClick={() => resetTimer(workMinutes)}
              style={{ width: "48px", height: "48px" }}
              title={t.reset}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: isRunning ? "rgba(239, 68, 68, 0.2)" : "var(--accent-gradient)",
                border: isRunning ? "2px solid rgba(239, 68, 68, 0.4)" : "none",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all var(--transition-base)",
                boxShadow: isRunning ? "none" : "var(--accent-glow)",
              }}
            >
              {isRunning ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
            <button
              className="btn-icon"
              onClick={() => {
                if (!isBreak) {
                  setIsBreak(true);
                  setSecondsLeft(breakMinutes * 60);
                  setIsRunning(false);
                } else {
                  setIsBreak(false);
                  setSecondsLeft(workMinutes * 60);
                  setIsRunning(false);
                }
              }}
              style={{ width: "48px", height: "48px" }}
              title={t.skip}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" />
              </svg>
            </button>
          </div>

          {/* Subject */}
          <div style={{ marginTop: "28px" }}>
            <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
              {t.currentlyStudying}
            </label>
            <select
              className="input-field"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{ maxWidth: "250px", margin: "0 auto", textAlign: "center" }}
            >
              <option>Mathematics</option>
              <option>Computer Science</option>
              <option>Psychology</option>
              <option>Chemistry</option>
              <option>Physics</option>
              <option>English Literature</option>
            </select>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Presets */}
          <div className="glass-card animate-fade-in stagger-1" style={{ padding: "24px", opacity: 0 }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
              {t.presetsTitle}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  className="btn-ghost"
                  onClick={() => {
                    setWorkMinutes(preset.work);
                    setBreakMinutes(preset.short);
                    resetTimer(preset.work);
                  }}
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{preset.label}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                    {preset.work}m / {preset.short}m
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Session Stats */}
          <div className="glass-card animate-fade-in stagger-2" style={{ padding: "24px", opacity: 0 }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
              {t.todayStats}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: t.sessions, value: sessions, color: "#6366f1" },
                { label: t.focusTime, value: `${sessions * workMinutes}m`, color: "#8b5cf6" },
                { label: t.breakTimeLabel, value: `${sessions * breakMinutes}m`, color: "#10b981" },
                { label: t.streak, value: "3", color: "#f59e0b" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "14px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-input)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "22px", fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Session History */}
          <div className="glass-card animate-fade-in stagger-3" style={{ padding: "24px", opacity: 0 }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
              {t.sessionHistory}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {sessionHistory.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-input)",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "var(--text-muted)", minWidth: "65px" }}>{s.time}</span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: s.type === "focus" ? "rgba(99,102,241,0.15)" : s.type === "longBreak" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                      color: s.type === "focus" ? "#818cf8" : s.type === "longBreak" ? "#34d399" : "#fbbf24",
                    }}
                  >
                    {t.types[s.type as keyof typeof t.types]}
                  </span>
                  <span style={{ flex: 1, color: "var(--text-secondary)" }}>{s.subject}</span>
                  <span style={{ color: "var(--text-muted)" }}>{s.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
