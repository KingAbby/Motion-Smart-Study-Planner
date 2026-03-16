"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const deadlines = [
  { id: 1, title: "Essay: Impact of AI on Education", course: "Computer Science", deadline: "2026-03-17", hoursNeeded: 4, priority: "high" },
  { id: 2, title: "Chapter 5 Reading Summary", course: "Psychology", deadline: "2026-03-18", hoursNeeded: 2, priority: "medium" },
  { id: 3, title: "Calculus Problem Set #7", course: "Mathematics", deadline: "2026-03-19", hoursNeeded: 3, priority: "high" },
  { id: 4, title: "Group Presentation Slides", course: "Environmental Science", deadline: "2026-03-21", hoursNeeded: 3, priority: "medium" },
  { id: 5, title: "Database Schema Design", course: "Computer Science", deadline: "2026-03-22", hoursNeeded: 5, priority: "high" },
];

const generatedSchedule = [
  { day: "Mon", sessions: [
    { time: "09:00 - 11:00", task: "Essay: Impact of AI on Education", color: "#6366f1" },
    { time: "14:00 - 16:00", task: "Essay: Impact of AI on Education", color: "#6366f1" },
  ]},
  { day: "Tue", sessions: [
    { time: "09:00 - 11:00", task: "Chapter 5 Reading Summary", color: "#8b5cf6" },
    { time: "14:00 - 15:00", task: "Calculus Problem Set #7", color: "#ef4444" },
  ]},
  { day: "Wed", sessions: [
    { time: "09:00 - 11:00", task: "Calculus Problem Set #7", color: "#ef4444" },
    { time: "15:00 - 17:00", task: "Group Presentation Slides", color: "#f59e0b" },
  ]},
  { day: "Thu", sessions: [
    { time: "10:00 - 11:00", task: "Group Presentation Slides", color: "#f59e0b" },
    { time: "13:00 - 15:30", task: "Database Schema Design", color: "#3b82f6" },
  ]},
  { day: "Fri", sessions: [
    { time: "09:00 - 11:30", task: "Database Schema Design", color: "#3b82f6" },
  ]},
];

const priorityColors: Record<string, string> = {
  high: "#f87171",
  medium: "#fbbf24",
  low: "#34d399",
};

export default function PlannerPage() {
  const { language } = useLanguage();
  const t = translations[language].planner;
  const [isGenerated, setIsGenerated] = useState(false);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState("4");

  return (
    <div>
      <div className="page-header animate-fade-in">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <Link href="/schedule" className="btn-icon" style={{ width: "36px", height: "36px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
          <h1>{t.title}</h1>
        </div>
        <p>{t.subtitle}</p>
      </div>

      {!isGenerated ? (
        <>
          {/* Configuration */}
          <div className="glass-card-static animate-fade-in" style={{ padding: "28px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px", color: "var(--text-accent)" }}>
              {t.configTitle}
            </h2>
            <div className="grid-2" style={{ marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  {t.maxHoursPerDay}
                </label>
                <select
                  className="input-field"
                  value={studyHoursPerDay}
                  onChange={(e) => setStudyHoursPerDay(e.target.value)}
                >
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                  <option value="5">5 hours</option>
                  <option value="6">6 hours</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  {t.preferredStudyTime}
                </label>
                <select className="input-field">
                  <option>{t.morning}</option>
                  <option>{t.afternoon}</option>
                  <option>{t.evening}</option>
                  <option>{t.flexible}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Deadlines */}
          <div className="glass-card-static animate-fade-in" style={{ padding: "28px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
              {t.tasksToSchedule}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {deadlines.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div className="custom-checkbox checked">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{d.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      {d.course} • {t.dueLabel}: {d.deadline} • ~{d.hoursNeeded}{t.hoursNeededSuffix}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: priorityColors[d.priority],
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }} onClick={() => setIsGenerated(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              {t.generateSchedule}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Generated Schedule */}
          <div
            className="animate-fade-in"
            style={{
              padding: "14px 20px",
              borderRadius: "var(--radius-md)",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              color: "#34d399",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            {t.scheduleGenerated}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {generatedSchedule.map((day, di) => (
              <div key={day.day} className="glass-card animate-fade-in" style={{ padding: "20px", opacity: 0, animationDelay: `${di * 0.1}s` }}>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(99,102,241,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--accent-primary)",
                  }}>
                    {day.day}
                  </span>
                  {day.sessions.length} {day.sessions.length === 1 ? t.session : t.sessions}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {day.sessions.map((session, si) => (
                    <div
                      key={si}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-input)",
                        borderLeft: `3px solid ${session.color}`,
                      }}
                    >
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", minWidth: "110px" }}>
                        {session.time}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>{session.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "28px" }}>
            <button className="btn-secondary" onClick={() => setIsGenerated(false)}>
              {t.regenerate}
            </button>
            <Link href="/schedule" className="btn-primary">
              {t.applyToCalendar}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
