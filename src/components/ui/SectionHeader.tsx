import type {
  ReactNode,
} from "react";

interface SectionHeaderProps {
  title: string;

  subtitle?: string;

  action?: ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",

        justifyContent:
          "space-between",

        alignItems: "flex-end",

        gap: "18px",

        flexWrap: "wrap",

        marginBottom: "24px",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,

            fontSize: "2rem",

            fontWeight: 900,
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              margin:
                "8px 0 0",

              color:
                "rgba(255,255,255,0.68)",

              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}