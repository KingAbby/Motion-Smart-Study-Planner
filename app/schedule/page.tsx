"use client";

import { useState } from "react";
import Link from "next/link";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

interface ScheduleEvent {
  id: number;
  day: string;
  startTime: string;
  duration: number; // in hours
  subject: string;
  type: string;
  color: string;
}

const sampleEvents: ScheduleEvent[] = [
  { id: 1, day: "Mon", startTime: "08:00", duration: 1.5, subject: "Mathematics", type: "Lecture", color: "#6366f1" },
  { id: 2, day: "Mon", startTime: "10:00", duration: 1, subject: "Psychology", type: "Study", color: "#8b5cf6" },
  { id: 3, day: "Mon", startTime: "13:00", duration: 1.5, subject: "Computer Science", type: "Lab", color: "#3b82f6" },
  { id: 4, day: "Tue", startTime: "09:00", duration: 1, subject: "Chemistry", type: "Lecture", color: "#10b981" },
  { id: 5, day: "Tue", startTime: "14:00", duration: 2, subject: "English Literature", type: "Seminar", color: "#f59e0b" },
  { id: 6, day: "Wed", startTime: "08:00", duration: 1.5, subject: "Mathematics", type: "Tutorial", color: "#6366f1" },
  { id: 7, day: "Wed", startTime: "11:00", duration: 1, subject: "Physics", type: "Study", color: "#ef4444" },
  { id: 8, day: "Wed", startTime: "15:00", duration: 1, subject: "Computer Science", type: "Study", color: "#3b82f6" },
  { id: 9, day: "Thu", startTime: "09:00", duration: 1.5, subject: "Psychology", type: "Lecture", color: "#8b5cf6" },
  { id: 10, day: "Thu", startTime: "13:00", duration: 1, subject: "Chemistry", type: "Lab", color: "#10b981" },
  { id: 11, day: "Fri", startTime: "10:00", duration: 1, subject: "Environmental Science", type: "Lecture", color: "#14b8a6" },
  { id: 12, day: "Fri", startTime: "14:00", duration: 2, subject: "Computer Science", type: "Project", color: "#3b82f6" },
  { id: 13, day: "Sat", startTime: "09:00", duration: 2, subject: "Mathematics", type: "Study", color: "#6366f1" },
  { id: 14, day: "Sat", startTime: "14:00", duration: 1.5, subject: "Physics", type: "Study", color: "#ef4444" },
];

const views = ["Week", "Day"];

export default function SchedulePage() {
  const [activeView, setActiveView] = useState("Week");
  const [selectedDay, setSelectedDay] = useState("Mon");

  const getEventsForDay = (day: string) =>
    sampleEvents.filter((e) => e.day === day);

  const getEventPosition = (startTime: string) => {
    const [h] = startTime.split(":").map(Number);
    return (h - 8) * 60;
  };

  return (
    <div>
      <div className="page-header animate-fade-in">
        <h1>Study Schedule</h1>
        <p>Plan your weekly study sessions and manage your calendar</p>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
        className="animate-fade-in"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600 }}>March 16 – 22, 2026</h2>
          <div style={{ display: "flex", gap: "4px" }}>
            <button className="btn-icon" style={{ width: "32px", height: "32px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="btn-icon" style={{ width: "32px", height: "32px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div className="tabs" style={{ marginBottom: 0 }}>
            {views.map((v) => (
              <button
                key={v}
                className={`tab ${activeView === v ? "active" : ""}`}
                onClick={() => setActiveView(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <Link href="/schedule/planner" className="btn-primary" style={{ fontSize: "13px", padding: "8px 16px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            Auto Plan
          </Link>
        </div>
      </div>

      {/* Day Selector for mobile / day view */}
      {activeView === "Day" && (
        <div className="tabs animate-fade-in" style={{ overflowX: "auto" }}>
          {daysOfWeek.map((day) => (
            <button
              key={day}
              className={`tab ${selectedDay === day ? "active" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* Week View */}
      {activeView === "Week" && (
        <div className="glass-card-static animate-fade-in" style={{ padding: "0", overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "60px repeat(7, 1fr)",
              minHeight: "600px",
              overflowX: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "60px repeat(7, 1fr)",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <div style={{ padding: "14px 8px", borderRight: "1px solid var(--border-color)" }} />
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: day === "Mon" ? "var(--accent-primary)" : "var(--text-secondary)",
                    borderRight: "1px solid var(--border-color)",
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Time grid */}
            <div
              style={{
                display: "contents",
              }}
            >
              {/* Time labels column */}
              <div style={{ borderRight: "1px solid var(--border-color)" }}>
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    style={{
                      height: "60px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      textAlign: "right",
                      borderBottom: "1px solid rgba(99,102,241,0.05)",
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  style={{
                    position: "relative",
                    borderRight: "1px solid var(--border-color)",
                    minHeight: `${timeSlots.length * 60}px`,
                  }}
                >
                  {/* Grid lines */}
                  {timeSlots.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: "60px",
                        borderBottom: "1px solid rgba(99,102,241,0.05)",
                      }}
                    />
                  ))}

                  {/* Events */}
                  {getEventsForDay(day).map((event) => (
                    <div
                      key={event.id}
                      style={{
                        position: "absolute",
                        top: `${getEventPosition(event.startTime)}px`,
                        left: "4px",
                        right: "4px",
                        height: `${event.duration * 60 - 4}px`,
                        background: `${event.color}20`,
                        border: `1px solid ${event.color}40`,
                        borderLeft: `3px solid ${event.color}`,
                        borderRadius: "var(--radius-sm)",
                        padding: "6px 8px",
                        fontSize: "11px",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all var(--transition-fast)",
                      }}
                    >
                      <div style={{ fontWeight: 600, color: event.color, marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {event.subject}
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: "10px" }}>
                        {event.type}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Day View */}
      {activeView === "Day" && (
        <div className="glass-card-static animate-fade-in" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
            {selectedDay} Schedule
          </h3>
          {getEventsForDay(selectedDay).length === 0 ? (
            <div className="empty-state">
              <h3>No sessions planned</h3>
              <p>This day is free! Consider planning a study session.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {getEventsForDay(selectedDay).map((event) => (
                <div
                  key={event.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                    borderLeft: `4px solid ${event.color}`,
                  }}
                >
                  <div style={{ textAlign: "center", minWidth: "60px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>{event.startTime}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{event.duration}h</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>
                      {event.subject}
                    </div>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "var(--radius-full)",
                        background: `${event.color}20`,
                        color: event.color,
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
