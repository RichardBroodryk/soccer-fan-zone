// src/components/ui/StatCard.tsx

interface StatCardProps {
  label: string;

  value: string | number;

  subtitle?: string;

  dark?: boolean;

  accent?: string;
}

export default function StatCard({
  label,
  value,
  subtitle,
  dark = false,
  accent,
}: StatCardProps) {
  return (
    <div
      style={{
        position: "relative",

        overflow: "hidden",

        borderRadius: "24px",

        padding: "28px",

        background: dark
          ? "linear-gradient(135deg, #111827, #1f2937)"
          : "#ffffff",

        color: dark
          ? "#ffffff"
          : "#111827",

        boxShadow:
          "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* ACCENT */}

      {accent && (
        <div
          style={{
            position: "absolute",

            top: 0,
            left: 0,
            right: 0,

            height: "4px",

            background: accent,
          }}
        />
      )}

      {/* LABEL */}

      <div
        style={{
          fontSize: "0.92rem",

          color: dark
            ? "rgba(255,255,255,0.72)"
            : "#6b7280",

          marginBottom: "12px",

          fontWeight: 700,
        }}
      >
        {label}
      </div>

      {/* VALUE */}

      <div
        style={{
          fontSize: "2.4rem",

          fontWeight: 900,

          lineHeight: 1,
        }}
      >
        {value}
      </div>

      {/* SUBTITLE */}

      {subtitle && (
        <div
          style={{
            marginTop: "12px",

            fontSize: "0.88rem",

            lineHeight: 1.6,

            color: dark
              ? "rgba(255,255,255,0.68)"
              : "#6b7280",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}