"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const authRoutes = ["/landing", "/sign-in", "/sign-up"];
  const isAuthRoute = authRoutes.includes(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const applyTheme = (mode: "light" | "dark") => {
      document.documentElement.setAttribute("data-theme", mode);
    };

    const syncTheme = () => {
      const stored = localStorage.getItem("appTheme") || "dark";
      if (stored === "system") {
        applyTheme(media.matches ? "light" : "dark");
        return;
      }
      applyTheme(stored === "light" ? "light" : "dark");
    };

    syncTheme();

    const handleSystemChange = () => {
      const stored = localStorage.getItem("appTheme") || "dark";
      if (stored === "system") {
        applyTheme(media.matches ? "light" : "dark");
      }
    };

    if (media.addEventListener) {
      media.addEventListener("change", handleSystemChange);
    } else {
      media.addListener(handleSystemChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleSystemChange);
      } else {
        media.removeListener(handleSystemChange);
      }
    };
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  if (isAuthRoute) {
    return <main className="main-content auth-main">{children}</main>;
  }

  return (
    <>
      <button
        className="hamburger-btn"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>
      <Sidebar isOpen={sidebarOpen} onToggle={closeSidebar} />
      <main className="main-content">{children}</main>
    </>
  );
}
