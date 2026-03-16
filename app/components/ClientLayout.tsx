"use client";

import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

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
