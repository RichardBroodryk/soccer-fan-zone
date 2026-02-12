/* ==================================================
   TOURNAMENT VISUALS — AUTHORITATIVE
   Rugby Anthem Zone
   Purpose:
     - Centralize ALL tournament visual identity
     - Prevent image / logo / flag loss during refactors
   Bound by:
     - TournamentMeta.conceptId
   ================================================== */

import sixNationsMen from "../assets/images/tournaments/six-nations-men-2026.jpg";
import sixNationsWomen from "../assets/images/tournaments/six-nations-women-2026.jpg";
import nationsChampionship from "../assets/images/tournaments/nations-championship-2026.jpg";
import pacificNationsCup from "../assets/images/tournaments/nations-cup-2026.jpg";
import svns from "../assets/images/tournaments/svns-2026.jpg";
import greatestRivalry from "../assets/images/tournaments/greatest-rivalry-2026.jpg";

/* ================= TYPES ================= */

export type HeroLayout =
  | "default"
  | "contained"   // logos / wide art → avoid blur
  | "top";        // image requires heading higher

export type AnthemMode =
  | "standard"
  | "global"
  | "six-nations"
  | "rivalry";

export interface TournamentVisual {
  conceptId: string;

  /* HERO */
  heroImageMen?: string;
  heroImageWomen?: string;
  heroLayout?: HeroLayout;

  /* LIST / HUB */
  logo?: string;

  /* ANTHEMS */
  anthemMode?: AnthemMode;
}

/* ==================================================
   CANONICAL VISUAL MAP
   ================================================== */

export const tournamentVisuals: TournamentVisual[] = [
  {
    conceptId: "six-nations",
    heroImageMen: sixNationsMen,
    heroImageWomen: sixNationsWomen,
    logo: sixNationsMen,
    anthemMode: "six-nations",
  },

  {
    conceptId: "nations-championship",
    heroImageMen: nationsChampionship,
    heroImageWomen: nationsChampionship,
    logo: nationsChampionship,
    heroLayout: "contained", // prevents blur
    anthemMode: "global",
  },

  {
    conceptId: "pacific-nations-cup",
    heroImageMen: pacificNationsCup,
    heroImageWomen: pacificNationsCup,
    logo: pacificNationsCup,
    heroLayout: "contained", // prevents blur
    anthemMode: "global",
  },

  {
    conceptId: "svns-series",
    heroImageMen: svns,
    heroImageWomen: svns,
    logo: svns,
    heroLayout: "contained",     // text must sit higher
    anthemMode: "global",
  },

  {
    conceptId: "sa-nz-rival-tour",
    heroImageMen: greatestRivalry,
    heroImageWomen: greatestRivalry,
    logo: greatestRivalry,
    heroLayout: "contained",
    anthemMode: "rivalry",
  },
];

/* ==================================================
   RESOLVERS (SAFE HELPERS)
   ================================================== */

export function getTournamentVisual(conceptId: string) {
  return tournamentVisuals.find(
    (v) => v.conceptId === conceptId
  );
}
