// src/styles/cinematic.ts

import type {
  CSSProperties,
} from "react";

/* ======================================================
   SURFACES
   ====================================================== */

export const surfaceDark: CSSProperties =
{
  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",

  color: "#ffffff",
};

export const surfaceGlass: CSSProperties =
{
  background:
    "rgba(255,255,255,0.06)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(12px)",
};

export const surfaceLight: CSSProperties =
{
  background: "#ffffff",

  color: "#111827",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
};

/* ======================================================
   CINEMATIC CARDS
   ====================================================== */

export const cinematicCard: CSSProperties =
{
  borderRadius: "28px",

  overflow: "hidden",

  boxShadow:
    "0 25px 70px rgba(0,0,0,0.32)",
};

export const elevatedCard: CSSProperties =
{
  borderRadius: "32px",

  overflow: "hidden",

  boxShadow:
    "0 30px 90px rgba(0,0,0,0.38)",
};

/* ======================================================
   HERO SYSTEMS
   ====================================================== */

export const heroOverlay: CSSProperties =
{
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.42))",
};

export const heroCenter: CSSProperties =
{
  position: "relative",

  zIndex: 5,

  textAlign: "center",

  color: "#ffffff",

  maxWidth: "1000px",

  padding: "40px 20px",
};

/* ======================================================
   GLASS PANELS
   ====================================================== */

export const glassPanel: CSSProperties =
{
  background:
    "rgba(255,255,255,0.08)",

  border:
    "1px solid rgba(255,255,255,0.12)",

  backdropFilter:
    "blur(12px)",
};

/* ======================================================
   BADGES
   ====================================================== */

export const badgeBase: CSSProperties =
{
  display: "inline-flex",

  alignItems: "center",

  gap: "8px",

  padding: "8px 14px",

  borderRadius: "999px",

  color: "#ffffff",

  fontWeight: 900,

  fontSize: "0.72rem",

  letterSpacing: "0.08em",

  textTransform: "uppercase",

  backdropFilter: "blur(12px)",

  border:
    "1px solid rgba(255,255,255,0.18)",
};

export const liveBadge: CSSProperties =
{
  ...badgeBase,

  background:
    "rgba(220,38,38,0.92)",
};

export const upcomingBadge: CSSProperties =
{
  ...badgeBase,

  background:
  "rgba(15,23,42,0.92)",
};

export const finalBadge: CSSProperties =
{
  ...badgeBase,

  background:
    "rgba(17,24,39,0.92)",
};

/* ======================================================
   SECTION HEADERS
   ====================================================== */

export const sectionHeading: CSSProperties =
{
  marginBottom: "24px",
};

export const sectionEyebrow: CSSProperties =
{
  fontSize: "0.8rem",

  textTransform: "uppercase",

  letterSpacing: "0.12em",

  fontWeight: 900,
};

/* ======================================================
   GRID SYSTEMS
   ====================================================== */

export const autoGrid300: CSSProperties =
{
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",

  gap: "20px",
};

export const autoGrid260: CSSProperties =
{
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(260px, 1fr))",

  gap: "18px",
};

export const autoGrid220: CSSProperties =
{
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",

  gap: "18px",
};

export const autoGrid240: CSSProperties =
{
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",

  gap: "18px",
};

/* ======================================================
   OVERLAYS
   ====================================================== */

export const darkOverlay =
  `
    linear-gradient(
      to top,
      rgba(0,0,0,0.82),
      rgba(0,0,0,0.06)
    )
  `;

export const liveOverlay =
  `
    linear-gradient(
      to top,
      rgba(90,0,0,0.88),
      rgba(0,0,0,0.14)
    )
  `;

export const featuredOverlay =
  `
    linear-gradient(
      to top,
      rgba(120,70,0,0.82),
      rgba(0,0,0,0.14)
    )
  `;

export const dangerOverlay =
  `
    linear-gradient(
      to top,
      rgba(100,0,0,0.82),
      rgba(0,0,0,0.14)
    )
  `;

  /* ======================================================
   SPLIT EFFECT
   ====================================================== */

export const splitBeam = (
  accent: string
) => ({
  position:
    "absolute" as const,

  top: "-10%",

  left: "50%",

  transform:
    "translateX(-50%) rotate(12deg)",

  width: "8px",

  height: "140%",

  background:
    "rgba(255,255,255,0.18)",

  boxShadow: `
    0 0 35px ${accent}
  `,

  zIndex: 3,
});
/* ======================================================
   ATMOSPHERE
   ====================================================== */

export const atmosphericGlow = (
  color: string,
  opacity = 0.18
) => `
  radial-gradient(
    circle at top right,
    ${color}${Math.floor(
      opacity * 255
    )
      .toString(16)
      .padStart(2, "0")},
    transparent 60%
  )
`;

export const atmosphericCenter = (
  color: string,
  opacity = 0.14
) => `
  radial-gradient(
    circle at center,
    ${color}${Math.floor(
      opacity * 255
    )
      .toString(16)
      .padStart(2, "0")},
    transparent 70%
  )
`;
/* ======================================================
   CINEMATIC TEXT
   ====================================================== */

export const cinematicText = {
  letterSpacing:
    "-0.03em",

  textTransform:
    "uppercase" as const,
};

/* ======================================================
   CINEMATIC GLASS
   ====================================================== */

export const cinematicGlass = (
  background =
    "rgba(255,255,255,0.08)",

  border =
    "1px solid rgba(255,255,255,0.12)"
) => ({
  background,

  backdropFilter:
    "blur(18px)",

  WebkitBackdropFilter:
    "blur(18px)",

  border,
});

/* ======================================================
   CINEMATIC PANEL
   ====================================================== */

export const cinematicPanel = {
  borderRadius:
    "28px",

  overflow:
    "hidden" as const,

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.28)",
};
/* ======================================================
   DARK PANELS
   ====================================================== */

export const darkPanel = {
  background:
    "linear-gradient(135deg, #020617, #0f172a, #111827)",

  color:
    "#ffffff",

  borderRadius:
    "34px",

  boxShadow:
    "0 25px 70px rgba(0,0,0,0.35)",

  overflow:
    "hidden" as const,

  position:
    "relative" as const,
};
/* ======================================================
   SECTION HEADERS
   ====================================================== */

export const sectionHeaderWrap = {
  marginBottom:
    "24px",
};

export const sectionDescription = {
  margin: 0,

  color:
    "#6b7280",

  lineHeight: 1.7,
};