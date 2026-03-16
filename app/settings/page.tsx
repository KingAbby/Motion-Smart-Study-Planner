"use client";

import { useEffect, useState } from "react";
import {
  AimOutlined,
  BellOutlined,
  BookOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  DesktopOutlined,
  FieldTimeOutlined,
  MoonOutlined,
  SkinOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].settings;
  const common = translations[language].common;
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
    setNotifications((prev: typeof notifications) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = localStorage.getItem("appTheme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const applyTheme = (mode: string) => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    if (mode === "system") {
      document.documentElement.setAttribute(
        "data-theme",
        media.matches ? "light" : "dark",
      );
      return;
    }
    document.documentElement.setAttribute(
      "data-theme",
      mode === "light" ? "light" : "dark",
    );
  };

  const handleThemeChange = (mode: string) => {
    setTheme(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("appTheme", mode);
    }
    applyTheme(mode);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>

      <div className="page-header animate-fade-in">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
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
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {common.saved}
        </div>
      )}

      {/* Language Switcher */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-secondary)",
          }}
        >
          {common.language}:
        </span>
        <button
          onClick={() => setLanguage("en")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-md)",
            border:
              language === "en"
                ? "2px solid var(--accent-primary)"
                : "1px solid var(--border-color)",
            background:
              language === "en" ? "rgba(99, 102, 241, 0.1)" : "var(--bg-input)",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: language === "en" ? 600 : 400,
            color: "var(--text-primary)",
            transition: "all var(--transition-fast)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="fi fi-gb" style={{ fontSize: "14px" }} />
          {common.english}
        </button>
        <button
          onClick={() => setLanguage("id")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-md)",
            border:
              language === "id"
                ? "2px solid var(--accent-primary)"
                : "1px solid var(--border-color)",
            background:
              language === "id" ? "rgba(99, 102, 241, 0.1)" : "var(--bg-input)",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: language === "id" ? 600 : 400,
            color: "var(--text-primary)",
            transition: "all var(--transition-fast)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="fi fi-id" style={{ fontSize: "14px" }} />
          {common.bahasa}
        </button>
      </div>


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "700px",
        }}
      >
        {/* Appearance */}
        <div
          className="glass-card-static animate-fade-in"
          style={{ padding: "28px" }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "20px",
              color: "var(--text-accent)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <SkinOutlined />
            {t.appearance}
          </h2>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                marginBottom: "10px",
              }}
            >
              {t.theme}
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { value: "dark", label: t.dark, icon: <MoonOutlined /> },
                { value: "light", label: t.light, icon: <SunOutlined /> },
                { value: "system", label: t.system, icon: <DesktopOutlined /> },
              ].map((btn) => (
                <button
                  key={btn.value}
                  type="button"
                  onClick={() => handleThemeChange(btn.value)}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "var(--radius-md)",
                    border:
                      theme === btn.value
                        ? "2px solid var(--accent-primary)"
                        : "2px solid var(--border-color)",
                    background:
                      theme === btn.value
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
                  <span style={{ fontSize: "22px", display: "inline-flex" }}>
                    {btn.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: theme === btn.value ? 600 : 400,
                    }}
                  >
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pomodoro Settings */}
        <div
          className="glass-card-static animate-fade-in stagger-1"
          style={{ padding: "28px", opacity: 0 }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "20px",
              color: "var(--text-accent)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ClockCircleOutlined />
            {t.pomodoro}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  marginBottom: "6px",
                }}
              >
                {t.focusDuration}
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
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  marginBottom: "6px",
                }}
              >
                {t.shortBreak}
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
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  marginBottom: "6px",
                }}
              >
                {t.longBreak}
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
        <div
          className="glass-card-static animate-fade-in stagger-2"
          style={{ padding: "28px", opacity: 0 }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "20px",
              color: "var(--text-accent)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <BellOutlined />
            {t.notifications}
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              {
                key: "taskReminders" as const,
                label: t.taskReminders,
                desc: t.taskRemindersDesc,
              },
              {
                key: "studyReminders" as const,
                label: t.studyReminders,
                desc: t.studyRemindersDesc,
              },
              {
                key: "breakReminders" as const,
                label: t.breakReminders,
                desc: t.breakRemindersDesc,
              },
              {
                key: "weeklyReport" as const,
                label: t.weeklyReport,
                desc: t.weeklyReportDesc,
              },
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
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      marginBottom: "2px",
                    }}
                  >
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
        <div
          className="glass-card-static animate-fade-in stagger-3"
          style={{ padding: "28px", opacity: 0 }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "20px",
              color: "var(--text-accent)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <BulbOutlined />
            {t.recommendations}
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {[
              { icon: <FieldTimeOutlined />, title: t.peakHours, desc: t.peakHoursDesc },
              { icon: <BookOutlined />, title: t.sessionLength, desc: t.sessionLengthDesc },
              { icon: <AimOutlined />, title: t.subjectFocus, desc: t.subjectFocusDesc },
              { icon: <CoffeeOutlined />, title: t.restDays, desc: t.restDaysDesc },
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
                <span style={{ fontSize: "24px", flexShrink: 0, display: "inline-flex" }}>
                  {rec.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}
                  >
                    {rec.title}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {rec.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "32px",
          }}
        >
          <button
            className="btn-primary"
            style={{ padding: "12px 32px" }}
            onClick={handleSave}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {common.save}
          </button>
        </div>
      </div>
    </div>
  );
}
