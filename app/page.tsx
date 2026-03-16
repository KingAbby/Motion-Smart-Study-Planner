"use client";

import StatsCard from "./components/StatsCard";
import Link from "next/link";

const upcomingTasks = [
  {
    id: 1,
    title: "Essay: Impact of AI on Education",
    course: "Computer Science",
    deadline: "Tomorrow, 11:59 PM",
    priority: "high",
    done: false,
  },
  {
    id: 2,
    title: "Chapter 5 Reading Summary",
    course: "Psychology",
    deadline: "Wed, Mar 18",
    priority: "medium",
    done: false,
  },
  {
    id: 3,
    title: "Calculus Problem Set #7",
    course: "Mathematics",
    deadline: "Thu, Mar 19",
    priority: "high",
    done: false,
  },
  {
    id: 4,
    title: "Lab Report: Chemical Reactions",
    course: "Chemistry",
    deadline: "Fri, Mar 20",
    priority: "low",
    done: true,
  },
];

const todaySchedule = [
  { time: "08:00 - 09:30", subject: "Mathematics", type: "Lecture", color: "#6366f1" },
  { time: "10:00 - 11:00", subject: "Psychology", type: "Study Session", color: "#8b5cf6" },
  { time: "13:00 - 14:30", subject: "Computer Science", type: "Lab", color: "#3b82f6" },
  { time: "15:00 - 16:00", subject: "Chemistry", type: "Review", color: "#10b981" },
];

const priorityStyles: Record<string, { bg: string; color: string; label: string }> = {
  high: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171", label: "High" },
  medium: { bg: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", label: "Medium" },
  low: { bg: "rgba(16, 185, 129, 0.15)", color: "#34d399", label: "Low" },
};

export default function Dashboard() {
  return (
    <div>
      {/* Welcome Banner */}
      <div
        className="glass-card-static animate-fade-in"
        style={{
          padding: "32px",
          marginBottom: "28px",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-20px",
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
            Good Morning, Student! 👋
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "20px" }}>
            You have <strong style={{ color: "var(--text-accent)" }}>3 tasks</strong> due this week.
            Stay focused and keep up the great work!
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/tasks" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              View Tasks
            </Link>
            <Link href="/timer" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Start Focus
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid-stats" style={{ marginBottom: "28px" }}>
        <div className="animate-fade-in stagger-1" style={{ opacity: 0 }}>
          <StatsCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
            }
            label="Tasks Today"
            value="5"
            trend="12%"
            trendUp={true}
            color="#6366f1"
          />
        </div>
        <div className="animate-fade-in stagger-2" style={{ opacity: 0 }}>
          <StatsCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            }
            label="Study Hours"
            value="6.5h"
            trend="8%"
            trendUp={true}
            color="#8b5cf6"
          />
        </div>
        <div className="animate-fade-in stagger-3" style={{ opacity: 0 }}>
          <StatsCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            }
            label="Completed"
            value="12"
            trend="3%"
            trendUp={false}
            color="#10b981"
          />
        </div>
        <div className="animate-fade-in stagger-4" style={{ opacity: 0 }}>
          <StatsCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            }
            label="Focus Sessions"
            value="8"
            trend="15%"
            trendUp={true}
            color="#f59e0b"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid-2" style={{ marginBottom: "28px" }}>
        {/* Upcoming Tasks */}
        <div className="glass-card animate-fade-in stagger-5" style={{ padding: "24px", opacity: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Upcoming Tasks</h2>
            <Link
              href="/tasks"
              style={{
                fontSize: "13px",
                color: "var(--text-accent)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View All →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  transition: "all var(--transition-fast)",
                }}
              >
                <div
                  className={`custom-checkbox ${task.done ? "checked" : ""}`}
                >
                  {task.done && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: task.done ? "var(--text-muted)" : "var(--text-primary)",
                      textDecoration: task.done ? "line-through" : "none",
                      marginBottom: "4px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {task.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span>{task.course}</span>
                    <span>•</span>
                    <span>{task.deadline}</span>
                  </div>
                </div>
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: priorityStyles[task.priority].bg,
                    color: priorityStyles[task.priority].color,
                  }}
                >
                  {priorityStyles[task.priority].label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today&apos;s Schedule */}
        <div className="glass-card animate-fade-in stagger-6" style={{ padding: "24px", opacity: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Today&apos;s Schedule</h2>
            <Link
              href="/schedule"
              style={{
                fontSize: "13px",
                color: "var(--text-accent)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Full Calendar →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {todaySchedule.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  borderLeft: `3px solid ${item.color}`,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {item.subject}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span>{item.time}</span>
                    <span
                      style={{
                        padding: "2px 6px",
                        borderRadius: "var(--radius-full)",
                        background: `${item.color}20`,
                        color: item.color,
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Productivity Score */}
      <div
        className="glass-card animate-fade-in"
        style={{ padding: "24px", marginBottom: "28px" }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "20px" }}>
          Daily Productivity Score
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: `conic-gradient(var(--accent-primary) 0deg ${78 * 3.6}deg, var(--bg-input) ${78 * 3.6}deg 360deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                background: "var(--bg-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-accent)" }}>78</span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>out of 100</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Tasks Completed", value: 80, color: "#6366f1" },
                { label: "Focus Time", value: 65, color: "#8b5cf6" },
                { label: "Study Goals", value: 90, color: "#10b981" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.value}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${item.value}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Study Recommendation */}
        <div
          style={{
            marginTop: "20px",
            padding: "14px 18px",
            borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "13px",
          }}
        >
          <span style={{ fontSize: "18px" }}>💡</span>
          <div>
            <strong style={{ color: "#34d399" }}>Study Recommendation:</strong>{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              Based on your patterns, your peak focus hours are between 9:00 AM - 12:00 PM. Try scheduling your hardest tasks during this window.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
