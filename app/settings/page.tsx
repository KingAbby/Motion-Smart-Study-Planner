"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [pomodoroWork, setPomodoroWork] = useState("25");
  const [pomodoroBreak, setPomodoroBreak] = useState("5");
  const [pomodoroLong, setPomodoroLong] = useState("15");
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    studyReminders: true,
    breakReminders: true,
    weeklyReport: false,
  });
  const [saved, setSaved] = useState(false);

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="page-header animate-fade-in">
        <h1>Settings</h1>
        <p>Customize your study experience and preferences</p>
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Settings saved successfully!
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "700px" }}>
        {/* Appearance */}
        <div className="glass-card-static animate-fade-in" style={{ padding: "28px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px", color: "var(--text-accent)", display: "flex", alignItems: "center", gap: "8px" }}>
            🎨 Appearance
          </h2>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "10px" }}>
              Theme
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { value: "dark", label: "Dark", icon: "🌙" },
                { value: "light", label: "Light", icon: "☀️" },
                { value: "system", label: "System", icon: "💻" },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTheme(t.value)}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "var(--radius-md)",
                    border: theme === t.value
                      ? "2px solid var(--accent-primary)"
                      : "2px solid var(--border-color)",
                    background: theme === t.value
                      ? "rgba(99, 102, 241, 0.1)"
                      : "var(--bg-input)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all var(--transition-fast)",
                    minWidth: "90px",
                    color: "var(--text-primary)",
                  }}
                >
                  <span style={{ fontSize: "22px" }}>{t.icon}</span>
                  <span style={{ fontSize: "13px", fontWeight: theme === t.value ? 600 : 400 }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pomodoro Settings */}
        <div className="glass-card-static animate-fade-in stagger-1" style={{ padding: "28px", opacity: 0 }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px", color: "var(--text-accent)", display: "flex", alignItems: "center", gap: "8px" }}>
            ⏱️ Pomodoro Timer
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Focus Duration (min)
              </label>
              <input
                type="number"
                className="input-field"
                value={pomodoroWork}
                onChange={(e) => setPomodoroWork(e.target.value)}
                min="5"
                max="90"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Short Break (min)
              </label>
              <input
                type="number"
                className="input-field"
                value={pomodoroBreak}
                onChange={(e) => setPomodoroBreak(e.target.value)}
                min="1"
                max="30"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Long Break (min)
              </label>
              <input
                type="number"
                className="input-field"
                value={pomodoroLong}
                onChange={(e) => setPomodoroLong(e.target.value)}
                min="5"
                max="60"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card-static animate-fade-in stagger-2" style={{ padding: "28px", opacity: 0 }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px", color: "var(--text-accent)", display: "flex", alignItems: "center", gap: "8px" }}>
            🔔 Notifications
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { key: "taskReminders" as const, label: "Task Deadline Reminders", desc: "Get notified before task deadlines" },
              { key: "studyReminders" as const, label: "Study Session Reminders", desc: "Remind you when it's time to study" },
              { key: "breakReminders" as const, label: "Break Reminders", desc: "Notify when it's time for a break" },
              { key: "weeklyReport" as const, label: "Weekly Progress Report", desc: "Receive a weekly productivity summary" },
            ].map((item) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "2px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {item.desc}
                  </div>
                </div>
                <div
                  className={`toggle ${notifications[item.key] ? "active" : ""}`}
                  onClick={() => toggleNotif(item.key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Study Recommendations */}
        <div className="glass-card-static animate-fade-in stagger-3" style={{ padding: "28px", opacity: 0 }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px", color: "var(--text-accent)", display: "flex", alignItems: "center", gap: "8px" }}>
            💡 Study Recommendations
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "🌅", title: "Peak Hours", desc: "Your most productive hours are 9:00 AM - 12:00 PM. Schedule difficult subjects during this window." },
              { icon: "📖", title: "Session Length", desc: "Based on your data, 25-minute focus sessions with 5-minute breaks yield the best retention." },
              { icon: "🎯", title: "Subject Focus", desc: "Mathematics and Computer Science need more attention. Consider adding extra sessions this week." },
              { icon: "😴", title: "Rest Days", desc: "You've been studying consistently. Consider taking Sunday off for better long-term performance." },
            ].map((rec, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "14px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "24px", flexShrink: 0 }}>{rec.icon}</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{rec.title}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{rec.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "32px" }}>
          <button className="btn-primary" style={{ padding: "12px 32px" }} onClick={handleSave}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
            </svg>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
