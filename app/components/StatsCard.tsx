import type { CSSProperties } from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

const statsStyles = {
  card: {
    padding: "20px",
  } as CSSProperties,

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  } as CSSProperties,

  iconBox: (color: string): CSSProperties => ({
    width: "42px",
    height: "42px",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `${color}20`,
    color,
  }),

  trendBadge: {
    padding: "4px 8px",
    borderRadius: "var(--radius-full)",
    fontSize: "12px",
    fontWeight: 600,
  } as CSSProperties,

  value: {
    fontSize: "28px",
    fontWeight: 700,
    color: "var(--text-primary)",
    lineHeight: 1.2,
    marginBottom: "4px",
  } as CSSProperties,

  label: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    fontWeight: 500,
  } as CSSProperties,
};

export default function StatsCard({
  icon,
  label,
  value,
  trend,
  trendUp,
  color = "var(--accent-primary)",
}: StatsCardProps) {
  return (
    <div className="glass-card" style={statsStyles.card}>
      <div style={statsStyles.header}>
        <div style={statsStyles.iconBox(color)}>{icon}</div>
        {trend && (
          <span
            className={trendUp ? "badge-success" : "badge-danger"}
            style={statsStyles.trendBadge}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <div style={statsStyles.value}>{value}</div>
      <div style={statsStyles.label}>{label}</div>
    </div>
  );
}
