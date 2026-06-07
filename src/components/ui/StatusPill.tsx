interface StatusPillProps {
  label: string;

  type?:
    | "live"
    | "final"
    | "upcoming"
    | "success"
    | "warning";
}

export default function StatusPill({
  label,
  type = "upcoming",
}: StatusPillProps) {
  const background =
    type === "live"
      ? "#dc2626"
      : type === "final"
      ? "#111827"
      : type === "success"
      ? "#16a34a"
      : type === "warning"
      ? "#d97706"
      : "#2563eb";

  return (
    <div
      style={{
        display: "inline-flex",

        alignItems: "center",

        gap: "8px",

        padding: "10px 16px",

        borderRadius: "999px",

        background,

        color: "#ffffff",

        fontWeight: 900,

        fontSize: "0.78rem",

        letterSpacing: "0.08em",

        textTransform:
          "uppercase",
      }}
    >
      {label}
    </div>
  );
}