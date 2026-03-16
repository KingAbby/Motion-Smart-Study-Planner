"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import {
  AppstoreOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  UserOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const MOBILE_BREAKPOINT = 768;

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  section: string;
  items: NavItem[];
}


const sidebarStyles = {
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 8px",
    marginBottom: "32px",
  } as CSSProperties,

  logoIcon: {
    width: "40px",
    height: "40px",
    background: "var(--accent-gradient)",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
    color: "white",
  } as CSSProperties,

  logoTitle: {
    fontSize: "20px",
    fontWeight: 700,
    background: "var(--accent-gradient)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  } as CSSProperties,

  section: {
    marginBottom: "8px",
  } as CSSProperties,

  sectionLabel: {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    color: "var(--text-muted)",
    padding: "0 12px",
    marginBottom: "8px",
  } as CSSProperties,

  linkIcon: {
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  } as CSSProperties,

  spacer: {
    flex: 1,
  } as CSSProperties,

  studyTip: {
    padding: "16px",
    marginTop: "16px",
    background: "rgba(99, 102, 241, 0.08)",
  } as CSSProperties,

  studyTipTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-accent)",
    marginBottom: "6px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  } as CSSProperties,

  studyTipText: {
    fontSize: "12px",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
  } as CSSProperties,
};

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { language } = useLanguage();
  const t = translations[language].sidebar;
  const pathname = usePathname();
  const navSections: NavSection[] = [
    {
      section: t.overview,
      items: [
        { name: t.dashboard, href: "/", icon: <AppstoreOutlined /> },
      ],
    },
    {
      section: t.features,
      items: [
        { name: t.tasks, href: "/tasks", icon: <CheckSquareOutlined /> },
        { name: t.schedule, href: "/schedule", icon: <CalendarOutlined /> },
        { name: t.notes, href: "/notes", icon: <FileTextOutlined /> },
        { name: t.progress, href: "/progress", icon: <BarChartOutlined /> },
        { name: t.focusTimer, href: "/timer", icon: <ClockCircleOutlined /> },
      ],
    },
    {
      section: t.account,
      items: [
        { name: t.profile, href: "/profile", icon: <UserOutlined /> },
        { name: t.settings, href: "/settings", icon: <SettingOutlined /> },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      onToggle();
    }
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={onToggle}
      />
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div style={sidebarStyles.logo}>
          <div style={sidebarStyles.logoIcon}>
            <ThunderboltOutlined />
          </div>
          <h1 style={sidebarStyles.logoTitle}>Motion</h1>
        </div>

        {navSections.map((section) => (
          <div key={section.section} style={sidebarStyles.section}>
            <div style={sidebarStyles.sectionLabel}>{section.section}</div>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
                onClick={handleLinkClick}
              >
                <span style={sidebarStyles.linkIcon}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        ))}

        <div style={sidebarStyles.spacer} />

        <div className="glass-card-static" style={sidebarStyles.studyTip}>
          <div style={sidebarStyles.studyTipTitle}>
            <BulbOutlined />
            {t.studyTipTitle}
          </div>
          <div style={sidebarStyles.studyTipText}>
            {t.studyTipText}
          </div>
        </div>
      </aside>
    </>
  );
}
