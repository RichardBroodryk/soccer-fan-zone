import type {
  CSSProperties,
  ReactNode,
} from "react";

interface PremiumCardProps {
  children: ReactNode;

  dark?: boolean;

  glass?: boolean;

  clickable?: boolean;

  onClick?: () => void;

  padding?: string;

  style?: CSSProperties;
}

export default function PremiumCard({
  children,
  dark = false,
  glass = false,
  clickable = false,
  onClick,
  padding = "28px",
  style,
}: PremiumCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",

        overflow: "hidden",

        borderRadius: "28px",

        padding,

        cursor: clickable
          ? "pointer"
          : "default",

        transition:
          "all 0.25s ease",

        background: glass
          ? "rgba(255,255,255,0.08)"
          : dark
          ? "linear-gradient(180deg, rgba(17,24,39,0.98), rgba(3,7,18,0.98))"
          : "#ffffff",

        color: dark
          ? "#ffffff"
          : "#111827",

        border: glass
          ? "1px solid rgba(255,255,255,0.12)"
          : dark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.04)",

        backdropFilter: glass
          ? "blur(14px)"
          : undefined,

        boxShadow: dark
          ? "0 20px 60px rgba(0,0,0,0.28)"
          : "0 10px 30px rgba(0,0,0,0.08)",

        ...style,
      }}
    >
      {children}
    </div>
  );
}