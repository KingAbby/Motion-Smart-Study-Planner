"use client";

import { useState } from "react";

const weeklyData = [
  { day: "Mon", hours: 4.5, tasks: 3 },
  { day: "Tue", hours: 3.0, tasks: 2 },
  { day: "Wed", hours: 5.5, tasks: 5 },
  { day: "Thu", hours: 2.0, tasks: 1 },
  { day: "Fri", hours: 6.0, tasks: 4 },
  { day: "Sat", hours: 4.0, tasks: 3 },
  { day: "Sun", hours: 1.5, tasks: 1 },
];

const subjectProgress = [
  { name: "Computer Science", completed: 18, total: 24, color: "#6366f1", hours: 32 },
  { name: "Mathematics", completed: 12, total: 18, color: "#3b82f6", hours: 24 },
  { name: "Psychology", completed: 8, total: 12, color: "#8b5cf6", hours: 16 },
  { name: "Chemistry", completed: 6, total: 10, color: "#10b981", hours: 12 },
  { name: "English Literature", completed: 5, total: 8, color: "#f59e0b", hours: 10 },
  { name: "Physics", completed: 4, total: 8, color: "#ef4444", hours: 8 },
  { name: "Environmental Science", completed: 3, total: 5, color: "#14b8a6", hours: 6 },
];

const maxHours = Math.max(...weeklyData.map((d) => d.hours));

const streakDays = [true, true, true, false, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, false, true];

const tabs = ["Week", "Month", "Semester"];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("Week");

  return (
    <div>
      <div className="page-header animate-fade-in">
        <h1>Progress Tracker</h1>
        <p>Monitor your academic performance and study patterns</p>
      </div>

      {/* Tabs */}
      <div className="tabs animate-fade-in">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid-stats" style={{ marginBottom: "24px" }}>
        {[
          { label: "Study Streak", value: "7 days", icon: "🔥", color: "#f59e0b" },
          { label: "Avg. Focus", value: "45 min", icon: "🎯", color: "#6366f1" },
          { label: "Completion Rate", value: "76%", icon: "✅", color: "#10b981" },
          { label: "Total Hours", value: "108h", icon: "📚", color: "#8b5cf6" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="glass-card animate-fade-in"
            style={{ padding: "20px", opacity: 0, animationDelay: `${i * 0.05}s` }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--radius-md)",
                  background: `${stat.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: 700 }}>{stat.value}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: "24px" }}>
        {/* Study Hours Bar Chart */}
        <div className="glass-card animate-fade-in" style={{ padding: "24px", opacity: 0, animationDelay: "0.1s" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
            Weekly Study Hours
          </h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "200px", paddingTop: "10px" }}>
            {weeklyData.map((d, i) => (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>
                  {d.hours}h
                </span>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "40px",
                    height: `${(d.hours / maxHours) * 160}px`,
                    background: `linear-gradient(to top, #6366f1, #8b5cf6)`,
                    borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                    transition: "height 0.8s ease",
                    opacity: 0.8 + (i * 0.03),
                  }}
                />
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Completion Donut */}
        <div className="glass-card animate-fade-in" style={{ padding: "24px", opacity: 0, animationDelay: "0.15s" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
            Task Completion
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", width: "160px", height: "160px" }}>
              <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-input)" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(56 / 85) * 314} 314`}
                  style={{ transition: "stroke-dasharray 1s ease" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: 700 }}>56</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>of 85 tasks</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Completed", value: 56, color: "#6366f1" },
                { label: "In Progress", value: 12, color: "#f59e0b" },
                { label: "Overdue", value: 5, color: "#ef4444" },
                { label: "Upcoming", value: 12, color: "#94a3b8" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color }} />
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)", minWidth: "80px" }}>{item.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="glass-card animate-fade-in" style={{ padding: "24px", marginBottom: "24px", opacity: 0, animationDelay: "0.2s" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
          Subject Progress
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {subjectProgress.map((subject) => (
            <div key={subject.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: subject.color }} />
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>{subject.name}</span>
                </div>
                <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "var(--text-muted)" }}>
                  <span>{subject.completed}/{subject.total} tasks</span>
                  <span>{subject.hours}h studied</span>
                  <span style={{ fontWeight: 600, color: subject.color }}>
                    {Math.round((subject.completed / subject.total) * 100)}%
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(subject.completed / subject.total) * 100}%`,
                    background: subject.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Streak Calendar */}
      <div className="glass-card animate-fade-in" style={{ padding: "24px", opacity: 0, animationDelay: "0.25s" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
          🔥 Study Streak — March 2026
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", maxWidth: "350px" }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, padding: "4px" }}>
              {d}
            </div>
          ))}
          {/* Empty cells for alignment (March 2026 starts on Sunday) */}
          {[...Array(6)].map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {streakDays.map((active, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "var(--radius-sm)",
                background: active
                  ? i <= 15
                    ? "var(--accent-primary)"
                    : "rgba(99, 102, 241, 0.3)"
                  : "var(--bg-input)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                color: active ? "white" : "var(--text-muted)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
