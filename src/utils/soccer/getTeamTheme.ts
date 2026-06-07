// src/utils/soccer/getTeamTheme.ts

import {
  getConfederationTheme,
} from "./getTeamImages";

/* ======================================================
   TYPES
   ====================================================== */

export interface TeamTheme {
  overlay: string;

  atmosphere: string;

  accent: string;

  glow: string;

  confederationGradient: string;
}

/* ======================================================
   ELITE NATIONS
   ====================================================== */

const ELITE_TEAMS = [
  "argentina",
  "brazil",
  "france",
  "england",
  "germany",
  "spain",
  "portugal",
];

/* ======================================================
   ACCENT COLORS
   ====================================================== */

function getAccent(
  teamId: string
) {
  switch (teamId) {
    case "argentina":
      return "#7dd3fc";

    case "brazil":
      return "#facc15";

    case "france":
      return "#60a5fa";

    case "england":
      return "#ef4444";

    case "germany":
      return "#f59e0b";

    case "spain":
      return "#f97316";

    case "portugal":
      return "#22c55e";

    default:
      return "#60a5fa";
  }
}

/* ======================================================
   OVERLAYS
   ====================================================== */

function getOverlay(
  elite: boolean
) {
  return elite
    ? `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0.16),
        rgba(0,0,0,0.58)
      )
    `
    : `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0.10),
        rgba(0,0,0,0.48)
      )
    `;
}

/* ======================================================
   ATMOSPHERE
   ====================================================== */

function getAtmosphere(
  accent: string
) {
  return `
    radial-gradient(
      circle at top right,
      ${accent}22,
      transparent 58%
    )
  `;
}

/* ======================================================
   MAIN ENGINE
   ====================================================== */

export function getTeamTheme({
  teamId,
  region,
}: {
  teamId: string;

  region: string;
}): TeamTheme {
  const elite =
    ELITE_TEAMS.includes(
      teamId
    );

  const accent =
    getAccent(teamId);

  const confederation =
    getConfederationTheme(
      region
    );

  return {
    overlay:
      getOverlay(elite),

    atmosphere:
      getAtmosphere(accent),

    accent,

    glow: `
      0 0 50px ${accent}55
    `,

    confederationGradient:
      confederation.gradient,
  };
}