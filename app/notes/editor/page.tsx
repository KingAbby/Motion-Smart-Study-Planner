"use client";

import { useState } from "react";
import Link from "next/link";

const toolbarButtons = [
  { icon: "B", label: "Bold", style: "bold" },
  { icon: "I", label: "Italic", style: "italic" },
  { icon: "U", label: "Underline", style: "underline" },
  { icon: "S", label: "Strikethrough", style: "strikethrough" },
];

const headingButtons = ["H1", "H2", "H3"];

const defaultContent = `# Data Structures & Algorithms

## Binary Trees

A binary tree is a tree data structure where each node has **at most two children**, referred to as the left child and the right child.

### Key Properties:
- **Full Binary Tree**: Every node has 0 or 2 children
- **Complete Binary Tree**: All levels filled except possibly the last
- **Perfect Binary Tree**: All internal nodes have two children

### Traversal Methods:
1. **In-order** (Left, Root, Right)
2. **Pre-order** (Root, Left, Right) 
3. **Post-order** (Left, Right, Root)
4. **Level-order** (BFS)

## Hash Maps

Hash maps provide O(1) average case lookup, insert, and delete operations.

### Collision Resolution:
- Chaining (linked lists)
- Open addressing (linear probing, quadratic probing)
- Robin Hood hashing

## Graph Traversal

### BFS (Breadth-First Search)
- Uses a **queue** data structure
- Explores neighbors level by level
- Good for finding shortest path in unweighted graphs

### DFS (Depth-First Search)  
- Uses a **stack** (or recursion)
- Explores as deep as possible before backtracking
- Good for topological sorting, cycle detection

> 💡 **Exam Tip**: Remember that BFS uses a queue while DFS uses a stack!
`;

export default function NoteEditorPage() {
  const [content, setContent] = useState(defaultContent);
  const [title, setTitle] = useState("Data Structures & Algorithms");
  const [course, setCourse] = useState("Computer Science");
  const [isPreview, setIsPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/^### (.*$)/gm, '<h3 style="font-size:16px;font-weight:600;color:var(--text-accent);margin:16px 0 8px;">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 style="font-size:18px;font-weight:700;color:var(--text-primary);margin:20px 0 10px;">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 style="font-size:24px;font-weight:700;color:var(--text-primary);margin:0 0 16px;">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^> (.*$)/gm, '<blockquote style="border-left:3px solid var(--accent-primary);padding:10px 16px;background:rgba(99,102,241,0.08);border-radius:0 var(--radius-sm) var(--radius-sm) 0;margin:12px 0;font-size:13px;">$1</blockquote>')
      .replace(/^(\d+)\. (.*$)/gm, '<div style="padding:2px 0 2px 20px;font-size:14px;">$1. $2</div>')
      .replace(/^- (.*$)/gm, '<div style="padding:2px 0 2px 20px;font-size:14px;">• $1</div>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
    return html;
  };

  return (
    <div>
      <div className="page-header animate-fade-in">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/notes" className="btn-icon" style={{ width: "36px", height: "36px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
            <h1>Note Editor</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {saved && (
              <span className="animate-fade-in" style={{ fontSize: "12px", color: "var(--success)", display: "flex", alignItems: "center", gap: "4px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                Saved
              </span>
            )}
            <button className="btn-secondary" style={{ padding: "8px 16px" }} onClick={handleSave}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Note Metadata */}
      <div className="glass-card-static animate-fade-in" style={{ padding: "20px", marginBottom: "16px" }}>
        <div className="grid-2">
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-muted)", marginBottom: "6px" }}>Title</label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ fontSize: "16px", fontWeight: 600 }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-muted)", marginBottom: "6px" }}>Course</label>
            <select className="input-field" value={course} onChange={(e) => setCourse(e.target.value)}>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Psychology</option>
              <option>Chemistry</option>
              <option>Physics</option>
              <option>English Literature</option>
              <option>Environmental Science</option>
            </select>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="glass-card-static animate-fade-in"
        style={{
          padding: "10px 14px",
          marginBottom: "2px",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          flexWrap: "wrap",
        }}
      >
        {toolbarButtons.map((btn) => (
          <button
            key={btn.style}
            className="btn-ghost"
            style={{
              padding: "6px 10px",
              fontWeight: btn.style === "bold" ? 700 : 400,
              fontStyle: btn.style === "italic" ? "italic" : "normal",
              textDecoration: btn.style === "underline" ? "underline" : btn.style === "strikethrough" ? "line-through" : "none",
              fontSize: "14px",
              minWidth: "32px",
              justifyContent: "center",
            }}
            title={btn.label}
          >
            {btn.icon}
          </button>
        ))}
        <div style={{ width: "1px", height: "24px", background: "var(--border-color)", margin: "0 4px" }} />
        {headingButtons.map((h) => (
          <button key={h} className="btn-ghost" style={{ padding: "6px 10px", fontSize: "12px", fontWeight: 700, minWidth: "32px", justifyContent: "center" }} title={h}>
            {h}
          </button>
        ))}
        <div style={{ width: "1px", height: "24px", background: "var(--border-color)", margin: "0 4px" }} />
        <button className="btn-ghost" title="Bulleted List" style={{ padding: "6px 10px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
        </button>
        <button className="btn-ghost" title="Code Block" style={{ padding: "6px 10px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        </button>
        <button className="btn-ghost" title="Quote" style={{ padding: "6px 10px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </button>
        <div style={{ flex: 1 }} />
        <div className="tabs" style={{ marginBottom: 0, background: "transparent" }}>
          <button className={`tab ${!isPreview ? "active" : ""}`} onClick={() => setIsPreview(false)} style={{ fontSize: "12px", padding: "6px 14px" }}>
            Edit
          </button>
          <button className={`tab ${isPreview ? "active" : ""}`} onClick={() => setIsPreview(true)} style={{ fontSize: "12px", padding: "6px 14px" }}>
            Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      <div
        className="glass-card-static animate-fade-in"
        style={{
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
          minHeight: "500px",
          overflow: "hidden",
        }}
      >
        {!isPreview ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: "500px",
              padding: "24px",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: "14px",
              lineHeight: 1.7,
              fontFamily: "var(--font-inter), monospace",
              resize: "vertical",
            }}
          />
        ) : (
          <div
            style={{
              padding: "24px",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              fontSize: "14px",
            }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        )}
      </div>
    </div>
  );
}
