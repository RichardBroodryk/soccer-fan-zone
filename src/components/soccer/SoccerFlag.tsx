// src/components/soccer/SoccerFlag.tsx

import {
  getFlag,
} from "../../utils/soccer/flagHelpers";

interface SoccerFlagProps {
  nation: string;

  size?: number;

  rounded?: boolean;
}

export default function SoccerFlag({
  nation,
  size = 44,
  rounded = true,
}: SoccerFlagProps) {
  const flag = getFlag(nation);

  /* ======================================================
     FALLBACK
     ====================================================== */

  if (!flag) {
    return (
      <div
        style={{
          width: size,

          height: size,

          borderRadius: rounded
            ? "999px"
            : "12px",

          background:
            "linear-gradient(135deg, #111827, #1f2937)",

          display: "flex",

          alignItems: "center",

          justifyContent:
            "center",

          color: "#ffffff",

          fontWeight: 900,

          fontSize:
            size < 40
              ? "0.7rem"
              : "0.9rem",
        }}
      >
        ?
      </div>
    );
  }

  return (
    <img
      src={flag}
      alt={nation}
      style={{
        width: size,

        height: size,

        objectFit: "cover",

        borderRadius: rounded
          ? "999px"
          : "12px",

        boxShadow:
          "0 4px 14px rgba(0,0,0,0.18)",

        border:
          "2px solid rgba(255,255,255,0.7)",
      }}
    />
  );
}