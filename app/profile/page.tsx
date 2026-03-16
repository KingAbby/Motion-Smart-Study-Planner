"use client";

import Link from "next/link";

const achievements = [
  { icon: "🔥", title: "7-Day Streak", desc: "Study for 7 consecutive days", unlocked: true },
  { icon: "🎯", title: "Focus Master", desc: "Complete 50 focus sessions", unlocked: true },
  { icon: "📚", title: "Bookworm", desc: "Study for 100+ hours total", unlocked: true },
  { icon: "⚡", title: "Speed Learner", desc: "Complete 10 tasks in one day", unlocked: false },
  { icon: "🏆", title: "Semester Champion", desc: "Maintain 90%+ completion rate", unlocked: false },
  { icon: "🌟", title: "Perfect Week", desc: "Complete all tasks in a week", unlocked: false },
];

const recentActivity = [
  { action: "Completed task", detail: "Essay: Impact of AI on Education", time: "2 hours ago", icon: "✅" },
  { action: "Focus session", detail: "Mathematics — 25 min", time: "3 hours ago", icon: "🎯" },
  { action: "Created note", detail: "Data Structures & Algorithms", time: "Yesterday", icon: "📝" },
  { action: "Completed task", detail: "Lab Report: Chemical Reactions", time: "Yesterday", icon: "✅" },
  { action: "Focus session", detail: "Computer Science — 50 min", time: "2 days ago", icon: "🎯" },
];

export default function ProfilePage() {
  return (
    <div>
      <div className="page-header animate-fade-in">
        <h1>Profile</h1>
        <p>Your student profile and academic summary</p>
      </div>

      {/* Profile Card */}
      <div
        className="glass-card-static animate-fade-in"
        style={{
          padding: "32px",
          marginBottom: "24px",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-30px",
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              fontWeight: 700,
              color: "white",
              flexShrink: 0,
              boxShadow: "var(--accent-glow)",
            }}
          >
            S
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>Student User</h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px" }}>
              Computer Science Major • 4th Semester
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "13px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                State University
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Joined Feb 2025
              </span>
            </div>
          </div>
          <Link href="/settings" className="btn-secondary" style={{ padding: "8px 16px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid-stats" style={{ marginBottom: "24px" }}>
        {[
          { label: "Tasks Completed", value: "56", icon: "📋", color: "#6366f1" },
          { label: "Study Hours", value: "108h", icon: "⏰", color: "#8b5cf6" },
          { label: "Focus Sessions", value: "87", icon: "🎯", color: "#10b981" },
          { label: "Notes Created", value: "24", icon: "📝", color: "#f59e0b" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="glass-card animate-fade-in"
            style={{ padding: "20px", opacity: 0, animationDelay: `${i * 0.05}s`, textAlign: "center" }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{stat.icon}</div>
            <div style={{ fontSize: "26px", fontWeight: 700, color: stat.color, marginBottom: "4px" }}>{stat.value}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: "24px" }}>
        {/* Achievements */}
        <div className="glass-card animate-fade-in" style={{ padding: "24px", opacity: 0, animationDelay: "0.1s" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
            🏆 Achievements
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {achievements.map((a, i) => (
              <div
                key={i}
                style={{
                  padding: "14px",
                  borderRadius: "var(--radius-md)",
                  background: a.unlocked ? "var(--bg-input)" : "rgba(15,15,26,0.4)",
                  border: `1px solid ${a.unlocked ? "var(--border-hover)" : "var(--border-color)"}`,
                  opacity: a.unlocked ? 1 : 0.5,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{a.icon}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "4px", color: "var(--text-primary)" }}>
                  {a.title}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.4 }}>{a.desc}</div>
                {a.unlocked && (
                  <div className="badge badge-success" style={{ marginTop: "8px", fontSize: "10px" }}>
                    Unlocked
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card animate-fade-in" style={{ padding: "24px", opacity: 0, animationDelay: "0.15s" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
            📊 Recent Activity
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentActivity.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <span style={{ fontSize: "20px" }}>{a.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "2px" }}>{a.action}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {a.detail}
                  </div>
                </div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", flexShrink: 0 }}>
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Enrollment */}
      <div className="glass-card animate-fade-in" style={{ padding: "24px", opacity: 0, animationDelay: "0.2s" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
          📚 Enrolled Courses
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { name: "Computer Science", code: "CS301", color: "#6366f1" },
            { name: "Mathematics", code: "MTH201", color: "#3b82f6" },
            { name: "Psychology", code: "PSY101", color: "#8b5cf6" },
            { name: "Chemistry", code: "CHM202", color: "#10b981" },
            { name: "English Literature", code: "ENG301", color: "#f59e0b" },
            { name: "Physics", code: "PHY201", color: "#ef4444" },
            { name: "Environmental Science", code: "ENV101", color: "#14b8a6" },
          ].map((course) => (
            <div
              key={course.code}
              style={{
                padding: "16px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-input)",
                border: "1px solid var(--border-color)",
                borderLeft: `3px solid ${course.color}`,
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{course.name}</div>
              <div style={{ fontSize: "12px", color: course.color, fontWeight: 500 }}>{course.code}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
