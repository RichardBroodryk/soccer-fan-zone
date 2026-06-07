import type {
  ReactNode,
} from "react";

interface HeroBannerProps {
  image: string;

  badge?: string;

  title: string;

  subtitle?: string;

  children?: ReactNode;
}

export default function HeroBanner({
  image,
  badge,
  title,
  subtitle,
  children,
}: HeroBannerProps) {
  return (
    <header
      style={{
        position: "relative",

        overflow: "hidden",

        minHeight: "420px",

        borderRadius: "34px",

        padding: "48px",

        display: "flex",

        alignItems: "flex-end",

        backgroundImage: `url(${image})`,

        backgroundSize: "cover",

        backgroundPosition:
          "center",

        color: "#ffffff",

        marginBottom: "36px",
      }}
    >
      <div
        style={{
          position: "absolute",

          inset: 0,

          background:
            "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.28))",
        }}
      />

      <div
        style={{
          position: "relative",

          zIndex: 2,

          maxWidth: "900px",
        }}
      >
        {badge && (
          <div
            style={{
              display:
                "inline-flex",

              alignItems:
                "center",

              padding:
                "10px 18px",

              borderRadius:
                "999px",

              background:
                "rgba(255,255,255,0.12)",

              marginBottom:
                "20px",

              fontWeight: 900,

              fontSize:
                "0.82rem",

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",
            }}
          >
            {badge}
          </div>
        )}

        <h1
          style={{
            margin: 0,

            fontSize: "3.6rem",

            fontWeight: 900,

            lineHeight: 1,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              marginTop: "18px",

              lineHeight: 1.8,

              fontSize: "1.05rem",

              maxWidth: "760px",

              color:
                "rgba(255,255,255,0.86)",
            }}
          >
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </header>
  );
}