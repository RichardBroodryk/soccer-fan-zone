import {
  getFlag,
  normalizeNation,
} from "./flagHelpers";

/* ======================================================
   TYPES
   ====================================================== */

export interface MatchTheme {
  homeFlag: string | null;

  awayFlag: string | null;

  overlay: string;

  atmosphere: string;

  accent: string;

  rivalryLevel:
    | "low"
    | "medium"
    | "high"
    | "elite";

  cardBackground: string;

  heroBackground: string;

  glow: string;
}

/* ======================================================
   RIVALRIES
   ====================================================== */

const ELITE_RIVALRIES = [
  ["argentina", "brazil"],

  ["england", "germany"],

  ["france", "england"],

  ["spain", "portugal"],

  ["netherlands", "germany"],

  ["argentina", "uruguay"],
];

const HIGH_RIVALRIES = [
  ["mexico", "united-states"],

  ["japan", "south-korea"],

  ["england", "france"],

  ["croatia", "serbia"],

  ["ghana", "nigeria"],
];

/* ======================================================
   RIVALRY LEVEL
   ====================================================== */

function includesRivalry(
  home: string,
  away: string,
  list: string[][]
) {
  return list.some(
    ([a, b]) =>
      (a === home &&
        b === away) ||
      (a === away &&
        b === home)
  );
}

function getRivalryLevel(
  home: string,
  away: string
): MatchTheme["rivalryLevel"] {
  const normalizedHome =
    normalizeNation(home);

  const normalizedAway =
    normalizeNation(away);

  if (
    includesRivalry(
      normalizedHome,
      normalizedAway,
      ELITE_RIVALRIES
    )
  ) {
    return "elite";
  }

  if (
    includesRivalry(
      normalizedHome,
      normalizedAway,
      HIGH_RIVALRIES
    )
  ) {
    return "high";
  }

  return "medium";
}

/* ======================================================
   LIGHT STAGE OVERLAY
   ====================================================== */

function getStageOverlay(
  stage: string
) {
  const normalized =
    stage.toLowerCase();

  if (
    normalized.includes(
      "final"
    )
  ) {
    return `
      linear-gradient(
        135deg,
        rgba(255,215,0,0.12),
        rgba(255,255,255,0.08)
      )
    `;
  }

  if (
    normalized.includes(
      "semi"
    )
  ) {
    return `
      linear-gradient(
        135deg,
        rgba(255,255,255,0.12),
        rgba(255,255,255,0.04)
      )
    `;
  }

  if (
    normalized.includes(
      "quarter"
    )
  ) {
    return `
      linear-gradient(
        135deg,
        rgba(96,165,250,0.10),
        rgba(255,255,255,0.04)
      )
    `;
  }

  return `
    linear-gradient(
      135deg,
      rgba(255,255,255,0.06),
      rgba(255,255,255,0.02)
    )
  `;
}

/* ======================================================
   LIGHT ATMOSPHERE
   ====================================================== */

function getAtmosphere(
  status: string
) {
  if (status === "live") {
    return `
      radial-gradient(
        circle at top,
        rgba(239,68,68,0.08),
        transparent 60%
      )
    `;
  }

  return `
    radial-gradient(
      circle at top,
      rgba(255,255,255,0.12),
      transparent 60%
    )
  `;
}

/* ======================================================
   ACCENTS
   ====================================================== */

function getAccent(
  rivalry:
    | "low"
    | "medium"
    | "high"
    | "elite"
) {
  switch (rivalry) {
    case "elite":
      return "#facc15";

    case "high":
      return "#fb923c";

    case "medium":
      return "#60a5fa";

    default:
      return "#cbd5e1";
  }
}

/* ======================================================
   GLOW
   ====================================================== */

function getGlow(
  rivalry:
    | "low"
    | "medium"
    | "high"
    | "elite"
) {
  switch (rivalry) {
    case "elite":
      return "rgba(250,204,21,0.16)";

    case "high":
      return "rgba(251,146,60,0.14)";

    case "medium":
      return "rgba(96,165,250,0.12)";

    default:
      return "rgba(255,255,255,0.08)";
  }
}

/* ======================================================
   LIGHT CARD BACKGROUND
   ====================================================== */

function buildMatchBackground({
  homeFlag,
  awayFlag,
  overlay,
}: {
  homeFlag: string | null;

  awayFlag: string | null;

  overlay: string;
}) {
  return `
    ${overlay},

    linear-gradient(
      130deg,
      rgba(255,255,255,0.08),
      rgba(255,255,255,0.02)
    ),

    url(${homeFlag}),

    url(${awayFlag})
  `;
}

/* ======================================================
   LIGHT HERO BACKGROUND
   ====================================================== */

function buildHeroBackground({
  homeFlag,
  awayFlag,
}: {
  homeFlag: string | null;

  awayFlag: string | null;
}) {
  return `
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.04),
      rgba(255,255,255,0.12)
    ),

    url(${homeFlag}),

    url(${awayFlag})
  `;
}

/* ======================================================
   MAIN ENGINE
   ====================================================== */

export function getMatchTheme({
  home,
  away,
  status,
  stage,
}: {
  home: string;

  away: string;

  status: string;

  stage: string;
}): MatchTheme {
  const rivalryLevel =
    getRivalryLevel(
      home,
      away
    );

  const homeFlag =
    getFlag(home);

  const awayFlag =
    getFlag(away);

  const overlay =
    getStageOverlay(
      stage
    );

  return {
    homeFlag,

    awayFlag,

    overlay,

    atmosphere:
      getAtmosphere(
        status
      ),

    accent:
      getAccent(
        rivalryLevel
      ),

    glow:
      getGlow(
        rivalryLevel
      ),

    rivalryLevel,

    cardBackground:
      buildMatchBackground({
        homeFlag,
        awayFlag,
        overlay,
      }),

    heroBackground:
      buildHeroBackground({
        homeFlag,
        awayFlag,
      }),
  };
}