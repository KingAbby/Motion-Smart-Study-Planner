"use client";

import { useState } from "react";
import Link from "next/link";

interface Note {
  id: number;
  title: string;
  course: string;
  snippet: string;
  updatedAt: string;
  color: string;
  tags: string[];
}

const sampleNotes: Note[] = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    course: "Computer Science",
    snippet: "Binary trees, hash maps, and graph traversal algorithms. Key concepts for the midterm exam including BFS, DFS, and Dijkstra's...",
    updatedAt: "2 hours ago",
    color: "#6366f1",
    tags: ["midterm", "algorithms"],
  },
  {
    id: 2,
    title: "Cognitive Development Theories",
    course: "Psychology",
    snippet: "Piaget's stages of cognitive development: sensorimotor, preoperational, concrete operational, and formal operational...",
    updatedAt: "Yesterday",
    color: "#8b5cf6",
    tags: ["theory", "chapter-5"],
  },
  {
    id: 3,
    title: "Integration Techniques",
    course: "Mathematics",
    snippet: "Substitution method, integration by parts, partial fractions. Remember: ∫u dv = uv - ∫v du. Practice problems from...",
    updatedAt: "2 days ago",
    color: "#3b82f6",
    tags: ["calculus", "formulas"],
  },
  {
    id: 4,
    title: "Organic Chemistry Reactions",
    course: "Chemistry",
    snippet: "Nucleophilic substitution: SN1 and SN2 mechanisms. Elimination reactions: E1 and E2. Key factors: substrate, nucleophile...",
    updatedAt: "3 days ago",
    color: "#10b981",
    tags: ["reactions", "mechanisms"],
  },
  {
    id: 5,
    title: "Hamlet Analysis Notes",
    course: "English Literature",
    snippet: "Themes of revenge, mortality, and corruption. The 'To be or not to be' soliloquy explores existential dread and the...",
    updatedAt: "4 days ago",
    color: "#f59e0b",
    tags: ["shakespeare", "analysis"],
  },
  {
    id: 6,
    title: "Renewable Energy Systems",
    course: "Environmental Science",
    snippet: "Solar PV efficiency factors, wind turbine placement, hydroelectric dam environmental impact. Comparison of lifecycle...",
    updatedAt: "5 days ago",
    color: "#14b8a6",
    tags: ["sustainability", "presentation"],
  },
  {
    id: 7,
    title: "Quantum Mechanics Basics",
    course: "Physics",
    snippet: "Wave-particle duality, Heisenberg uncertainty principle, Schrödinger equation. Probability density functions and...",
    updatedAt: "1 week ago",
    color: "#ef4444",
    tags: ["quantum", "physics"],
  },
  {
    id: 8,
    title: "SQL & Database Normalization",
    course: "Computer Science",
    snippet: "1NF: atomic values, no repeating groups. 2NF: no partial dependencies. 3NF: no transitive dependencies. BCNF: every...",
    updatedAt: "1 week ago",
    color: "#6366f1",
    tags: ["database", "sql"],
  },
];

const courses = ["All", "Computer Science", "Psychology", "Mathematics", "Chemistry", "English Literature", "Environmental Science", "Physics"];

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCourse, setActiveCourse] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredNotes = sampleNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = activeCourse === "All" || note.course === activeCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div>
      <div className="page-header animate-fade-in">
        <h1>Notes</h1>
        <p>Organize your study notes by course and topic</p>
      </div>

      {/* Search & Controls */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        className="animate-fade-in"
      >
        <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="input-field"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "42px" }}
          />
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            className="btn-icon"
            onClick={() => setViewMode("grid")}
            style={{
              background: viewMode === "grid" ? "var(--bg-hover)" : undefined,
              borderColor: viewMode === "grid" ? "var(--accent-primary)" : undefined,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            className="btn-icon"
            onClick={() => setViewMode("list")}
            style={{
              background: viewMode === "list" ? "var(--bg-hover)" : undefined,
              borderColor: viewMode === "list" ? "var(--accent-primary)" : undefined,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Course Filter */}
      <div className="tabs animate-fade-in" style={{ overflowX: "auto", flexWrap: "nowrap" }}>
        {courses.map((c) => (
          <button
            key={c}
            className={`tab ${activeCourse === c ? "active" : ""}`}
            onClick={() => setActiveCourse(c)}
            style={{ whiteSpace: "nowrap" }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Notes Grid/List */}
      {filteredNotes.length === 0 ? (
        <div className="empty-state glass-card-static animate-fade-in">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
          <h3>No notes found</h3>
          <p>Try searching with different keywords or create a new note</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {filteredNotes.map((note, i) => (
            <Link
              key={note.id}
              href="/notes/editor"
              className="glass-card animate-fade-in"
              style={{
                padding: "20px",
                opacity: 0,
                animationDelay: `${i * 0.05}s`,
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "4px",
                    height: "24px",
                    borderRadius: "2px",
                    background: note.color,
                  }}
                />
                <span style={{ fontSize: "12px", color: note.color, fontWeight: 600 }}>{note.course}</span>
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "var(--text-primary)" }}>
                {note.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "14px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {note.snippet}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {note.tags.map((tag) => (
                    <span key={tag} className="badge badge-primary" style={{ fontSize: "10px", padding: "2px 6px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{note.updatedAt}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filteredNotes.map((note, i) => (
            <Link
              key={note.id}
              href="/notes/editor"
              className="glass-card animate-fade-in"
              style={{
                padding: "16px 20px",
                opacity: 0,
                animationDelay: `${i * 0.05}s`,
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div style={{ width: "4px", height: "40px", borderRadius: "2px", background: note.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{note.title}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {note.snippet}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: "12px", color: note.color, fontWeight: 500, marginBottom: "4px" }}>{note.course}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{note.updatedAt}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* FAB */}
      <Link href="/notes/editor" className="fab" title="New Note">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </Link>
    </div>
  );
}
