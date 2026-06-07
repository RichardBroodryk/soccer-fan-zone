// src/utils/soccer/getPlayerTheme.ts

/* ======================================================
   TYPES
   ====================================================== */

export interface PlayerTheme {
  overlay: string;

  glow: string;

  accent: string;

  atmosphere: string;

  roleStyle: string;
}

/* ======================================================
   POSITION ACCENTS
   ====================================================== */

const POSITION_COLORS = {
  Goalkeeper: "#38bdf8",

  Defender: "#22c55e",

  Midfielder: "#a855f7",

  Forward: "#f97316",
};

/* ======================================================
   MAIN ENGINE
   ====================================================== */

export function getPlayerTheme({
  teamId,
  region,
  position,
}: {
  teamId: string;

  region: string;

  position:
    | "Goalkeeper"
    | "Defender"
    | "Midfielder"
    | "Forward";
}): PlayerTheme {
 

  const accent =
    POSITION_COLORS[position];

  return {
    overlay: `
      linear-gradient(
        135deg,
        rgba(0,0,0,0.35),
        rgba(0,0,0,0.72)
      )
    `,

    glow: `
      0 0 40px ${accent}44
    `,

    accent,

    atmosphere: `
      radial-gradient(
        circle at top right,
        ${accent}22,
        transparent 60%
      )
    `,

    roleStyle:
      position === "Forward"
        ? "Attacking Threat"
        : position ===
          "Midfielder"
        ? "Creative Engine"
        : position ===
          "Defender"
        ? "Defensive Anchor"
        : "Shot Stopper",
  };
}