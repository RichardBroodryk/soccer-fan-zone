interface MetricCardProps {
  label: string;

  value: string | number;

  dark?: boolean;
}

export default function MetricCard({
  label,
  value,
  dark = false,
}: MetricCardProps) {
  return (
    <div
      style={{
        borderRadius: "24px",

        padding: "28px",

        background: dark
          ? "linear-gradient(135deg, #111827, #1f2937)"
          : "#ffffff",

        color: dark
          ? "#ffffff"
          : "#111827",

        boxShadow:
          "0 10px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          fontSize: "0.92rem",

          opacity: 0.72,

          marginBottom: "12px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "2.3rem",

          fontWeight: 900,
        }}
      >
        {value}
      </div>
    </div>
  );
}