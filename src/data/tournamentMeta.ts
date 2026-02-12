/* ==================================================
   TOURNAMENT META — AUTHORITATIVE v3 (LOCKED)
   Rugby Anthem Zone
   Scope: Tournament identity + routing + match binding

   Identity layers:
     - conceptId  → competition concept (timeless)
     - instanceId → year + gender instance (concrete)

   Rule:
     - Routing is authoritative
     - matchKey MUST match matches2026.tournament exactly
   ================================================== */

/* ================= TYPES ================= */

export type TournamentType =
  | "annual"
  | "championship"
  | "cup"
  | "sevens"
  | "tour";

export type Gender = "men" | "women";

export interface TournamentMeta {
  /* ================= IDENTITY ================= */

  /** Timeless competition identity (used by comments, featured, continuity) */
  conceptId: string;

  /** Concrete instance identity (stable internal key) */
  instanceId: string;

  name: string;
  year: number;
  gender: Gender;
  type: TournamentType;
  status: "active" | "upcoming" | "planned";

  /* ================= MATCH BINDING ================= */

  /** 🔒 MUST MATCH matches2026.tournament EXACTLY */
  matchKey: string;

  /* ================= HERO COPY ================= */

  heroBadge?: string;
  heroSubtitle?: string;

  /* ================= ROUTING ================= */

  /** 🔒 CANONICAL ROUTE — route-as-authority */
  route: string;
}

/* ==================================================
   2026 TOURNAMENTS — CANONICAL SET
   (Aligned to international calendar reality)
   ================================================== */

export const tournaments2026: TournamentMeta[] = [
  /* ================= MEN ================= */

  {
    conceptId: "six-nations",
    instanceId: "six-nations-2026-men",
    name: "Six Nations",
    year: 2026,
    gender: "men",
    type: "annual",
    status: "active",
    matchKey: "Six Nations 2026",
    heroBadge: "ANNUAL CHAMPIONSHIP",
    heroSubtitle:
      "England · France · Ireland · Italy · Scotland · Wales",
    route: "/tournaments/men/six-nations-2026",
  },

  {
    conceptId: "nations-championship",
    instanceId: "nations-championship-2026-men",
    name: "Nations Championship",
    year: 2026,
    gender: "men",
    type: "championship",
    status: "planned",
    matchKey: "Nations Championship 2026",
    heroBadge: "GLOBAL CHAMPIONSHIP",
    heroSubtitle:
      "Six Nations · SANZAAR · Japan · Fiji",
    route: "/tournaments/men/nations-championship-2026",
  },

  {
    conceptId: "pacific-nations-cup",
    instanceId: "pacific-nations-cup-2026-men",
    name: "Pacific Nations Cup",
    year: 2026,
    gender: "men",
    type: "cup",
    status: "planned",
    matchKey: "Pacific Nations Cup 2026",
    heroBadge: "REGIONAL CUP",
    heroSubtitle:
      "Pacific region · International competition",
    route: "/tournaments/men/pacific-nations-cup-2026",
  },

  {
    conceptId: "svns-series",
    instanceId: "svns-2026-men",
    name: "SVNS Series",
    year: 2026,
    gender: "men",
    type: "sevens",
    status: "active",
    matchKey: "SVNS Series 2026",
    heroBadge: "SEVENS SERIES",
    heroSubtitle:
      "World Rugby global sevens circuit",
    route: "/tournaments/men/svns-2026",
  },

  {
    conceptId: "sa-nz-rival-tour",
    instanceId: "sa-nz-rival-tour-2026-men",
    name: "The Greatest Rivalry",
    year: 2026,
    gender: "men",
    type: "tour",
    status: "planned",
    matchKey: "Men's SA vs NZ Rival Tour 2026",
    heroBadge: "ICONIC RIVALRY",
    heroSubtitle:
      "South Africa · New Zealand",
    route: "/tournaments/men/sa-nz-rival-tour-2026",
  },

  /* ================= WOMEN ================= */

  {
    conceptId: "six-nations",
    instanceId: "six-nations-2026-women",
    name: "Women’s Six Nations",
    year: 2026,
    gender: "women",
    type: "annual",
    status: "active",
    matchKey: "Women's Six Nations 2026",
    heroBadge: "ANNUAL CHAMPIONSHIP",
    heroSubtitle:
      "England · France · Ireland · Italy · Scotland · Wales",
    route: "/tournaments/women/six-nations-2026",
  },

  {
    conceptId: "nations-championship",
    instanceId: "nations-championship-2026-women",
    name: "Nations Championship",
    year: 2026,
    gender: "women",
    type: "championship",
    status: "planned",
    matchKey: "Women's Nations Championship 2026",
    heroBadge: "GLOBAL CHAMPIONSHIP",
    heroSubtitle:
      "Cross-hemisphere elite competition",
    route: "/tournaments/women/nations-championship-2026",
  },

  {
    conceptId: "pacific-nations-cup",
    instanceId: "pacific-nations-cup-2026-women",
    name: "Pacific Nations Cup",
    year: 2026,
    gender: "women",
    type: "cup",
    status: "upcoming",
    matchKey: "Women's Pacific Nations Cup 2026",
    heroBadge: "REGIONAL CUP",
    heroSubtitle:
      "Pacific region · International competition",
    route: "/tournaments/women/pacific-nations-cup-2026",
  },

  {
    conceptId: "svns-series",
    instanceId: "svns-2026-women",
    name: "SVNS Series",
    year: 2026,
    gender: "women",
    type: "sevens",
    status: "active",
    matchKey: "SVNS Series 2026",
    heroBadge: "SEVENS SERIES",
    heroSubtitle:
      "World Rugby global women’s sevens circuit",
    route: "/tournaments/women/svns-2026",
  },

  {
    conceptId: "sa-nz-rival-tour",
    instanceId: "sa-nz-rival-tour-2026-women",
    name: "Women’s SA vs NZ Rival Tour",
    year: 2026,
    gender: "women",
    type: "tour",
    status: "planned",
    matchKey: "Women's SA vs NZ Rival Tour 2026",
    heroBadge: "ICONIC RIVALRY",
    heroSubtitle:
      "South Africa · New Zealand",
    route: "/tournaments/women/sa-nz-rival-tour-2026",
  },
];
