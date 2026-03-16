"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewTaskPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    deadline: "",
    priority: "medium",
    tags: "",
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="page-header animate-fade-in">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <Link
            href="/tasks"
            className="btn-icon"
            style={{ width: "36px", height: "36px" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
          <h1>Add New Task</h1>
        </div>
        <p>Create a new task with details, deadline, and priority</p>
      </div>

      {saved && (
        <div
          className="animate-slide-up"
          style={{
            padding: "14px 20px",
            borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#34d399",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Task created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="glass-card-static animate-fade-in" style={{ padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px", color: "var(--text-accent)" }}>
            Task Details
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Task Title *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Complete Chapter 5 Summary"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Description
              </label>
              <textarea
                className="input-field"
                placeholder="Add more details about this task..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ minHeight: "120px" }}
              />
            </div>

            <div className="grid-2">
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Course / Subject *
                </label>
                <select
                  className="input-field"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  required
                >
                  <option value="">Select course...</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="English Literature">English Literature</option>
                  <option value="Environmental Science">Environmental Science</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Deadline *
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Priority Level
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                {(["low", "medium", "high"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: p })}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                      border: formData.priority === p
                        ? `2px solid ${p === "high" ? "#f87171" : p === "medium" ? "#fbbf24" : "#34d399"}`
                        : "2px solid var(--border-color)",
                      background: formData.priority === p
                        ? p === "high"
                          ? "rgba(239, 68, 68, 0.15)"
                          : p === "medium"
                          ? "rgba(245, 158, 11, 0.15)"
                          : "rgba(16, 185, 129, 0.15)"
                        : "transparent",
                      color: formData.priority === p
                        ? p === "high"
                          ? "#f87171"
                          : p === "medium"
                          ? "#fbbf24"
                          : "#34d399"
                        : "var(--text-secondary)",
                    }}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Tags (comma separated)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., homework, research, writing"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <Link href="/tasks" className="btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
