"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface Task {
  id: number;
  title: string;
  description: string;
  course: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  done: boolean;
  tags: string[];
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Essay: Impact of AI on Education",
    description: "Write a 2000-word essay analyzing the effects of artificial intelligence on modern educational systems.",
    course: "Computer Science",
    deadline: "2026-03-17",
    priority: "high",
    done: false,
    tags: ["writing", "research"],
  },
  {
    id: 2,
    title: "Chapter 5 Reading Summary",
    description: "Summarize key concepts from Chapter 5: Cognitive Development",
    course: "Psychology",
    deadline: "2026-03-18",
    priority: "medium",
    done: false,
    tags: ["reading"],
  },
  {
    id: 3,
    title: "Calculus Problem Set #7",
    description: "Complete problems 1-20 from Chapter 7: Integration Techniques",
    course: "Mathematics",
    deadline: "2026-03-19",
    priority: "high",
    done: false,
    tags: ["math", "homework"],
  },
  {
    id: 4,
    title: "Lab Report: Chemical Reactions",
    description: "Document findings from Tuesday's lab experiment on exothermic reactions",
    course: "Chemistry",
    deadline: "2026-03-20",
    priority: "low",
    done: true,
    tags: ["lab", "writing"],
  },
  {
    id: 5,
    title: "Group Presentation Slides",
    description: "Prepare slides for the group presentation on renewable energy",
    course: "Environmental Science",
    deadline: "2026-03-21",
    priority: "medium",
    done: false,
    tags: ["presentation", "group"],
  },
  {
    id: 6,
    title: "Database Schema Design",
    description: "Design the ER diagram and normalize to 3NF for the student management system project",
    course: "Computer Science",
    deadline: "2026-03-22",
    priority: "high",
    done: false,
    tags: ["project", "database"],
  },
  {
    id: 7,
    title: "Literary Analysis: Hamlet Act 3",
    description: "Analyze the significance of the 'To be or not to be' soliloquy",
    course: "English Literature",
    deadline: "2026-03-17",
    priority: "medium",
    done: true,
    tags: ["writing", "analysis"],
  },
  {
    id: 8,
    title: "Physics Experiment Data Analysis",
    description: "Plot graphs and calculate uncertainties from the pendulum experiment",
    course: "Physics",
    deadline: "2026-03-23",
    priority: "low",
    done: false,
    tags: ["lab", "analysis"],
  },
];

export default function TasksPage() {
  const { language } = useLanguage();
  const t = translations[language].tasks;
  const priorityConfig = {
    high: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171", label: t.priority.high },
    medium: { bg: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", label: t.priority.medium },
    low: { bg: "rgba(16, 185, 129, 0.15)", color: "#34d399", label: t.priority.low },
  };
  const filters = [
    { value: "all", label: t.filters.all },
    { value: "today", label: t.filters.today },
    { value: "thisWeek", label: t.filters.thisWeek },
    { value: "highPriority", label: t.filters.highPriority },
    { value: "completed", label: t.filters.completed },
  ];
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.course.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (activeFilter) {
      case "today":
        return task.deadline === "2026-03-17";
      case "thisWeek":
        return true;
      case "highPriority":
        return task.priority === "high";
      case "completed":
        return task.done;
      default:
        return true;
    }
  });

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div>
      <div className="page-header animate-fade-in">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      {/* Progress Summary */}
      <div
        className="glass-card-static animate-fade-in"
        style={{
          padding: "20px 24px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              {t.overallProgress}
            </span>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>
              {completedCount}/{tasks.length} tasks
            </span>
          </div>
          <div className="progress-bar" style={{ height: "10px" }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--accent-primary)" }}>
              {tasks.filter((t) => !t.done).length}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{t.pending}</div>
          </div>
          <div style={{ width: "1px", background: "var(--border-color)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--success)" }}>
              {completedCount}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{t.done}</div>
          </div>
          <div style={{ width: "1px", background: "var(--border-color)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--danger)" }}>
              {tasks.filter((t) => t.priority === "high" && !t.done).length}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{t.urgent}</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        className="animate-fade-in"
      >
        <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="input-field"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "42px" }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tabs animate-fade-in">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`tab ${activeFilter === f.value ? "active" : ""}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredTasks.length === 0 ? (
          <div className="empty-state glass-card-static">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyDesc}</p>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="glass-card animate-fade-in"
              style={{
                padding: "18px 20px",
                opacity: 0,
                animationDelay: `${index * 0.05}s`,
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <div
                className={`custom-checkbox ${task.done ? "checked" : ""}`}
                onClick={() => toggleTask(task.id)}
                style={{ marginTop: "2px" }}
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
                    fontSize: "15px",
                    fontWeight: 600,
                    color: task.done ? "var(--text-muted)" : "var(--text-primary)",
                    textDecoration: task.done ? "line-through" : "none",
                    marginBottom: "6px",
                  }}
                >
                  {task.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    marginBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  {task.description}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    {task.course}
                  </span>
                  <span>•</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {task.deadline}
                  </span>
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "2px 8px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(99, 102, 241, 0.1)",
                        color: "var(--text-accent)",
                        fontSize: "11px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: priorityConfig[task.priority].bg,
                  color: priorityConfig[task.priority].color,
                  whiteSpace: "nowrap",
                }}
              >
                {priorityConfig[task.priority].label}
              </span>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <Link href="/tasks/new" className="fab" title={t.addTaskFab}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </Link>
    </div>
  );
}
