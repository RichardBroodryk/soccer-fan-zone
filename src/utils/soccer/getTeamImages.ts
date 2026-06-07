// src/utils/soccer/getTeamImages.ts

/* ======================================================
   TEAM IMAGE IMPORTS
   ====================================================== */

/* AFC */

import australia1 from "../../assets/soccer/teams/australia1.jpg";
import australia2 from "../../assets/soccer/teams/australia2.jpg";

import iran1 from "../../assets/soccer/teams/iran1.jpg";
import iran2 from "../../assets/soccer/teams/iran2.jpg";

import iraq1 from "../../assets/soccer/teams/iraq1.jpg";
import iraq2 from "../../assets/soccer/teams/iraq2.jpg";

import japan1 from "../../assets/soccer/teams/japan1.jpg";
import japan2 from "../../assets/soccer/teams/japan2.jpg";

import jordan1 from "../../assets/soccer/teams/jordan1.jpg";
import jordan2 from "../../assets/soccer/teams/jordan2.jpg";

import qatar1 from "../../assets/soccer/teams/qatar1.jpg";
import qatar2 from "../../assets/soccer/teams/qatar2.jpg";

import saudiArabia1 from "../../assets/soccer/teams/saudi-arabia1.jpg";
import saudiArabia2 from "../../assets/soccer/teams/saudi-arabia2.jpg";

import southKorea1 from "../../assets/soccer/teams/korea1.jpg";
import southKorea2 from "../../assets/soccer/teams/korea2.jpg";

import uzbekistan1 from "../../assets/soccer/teams/uzbekistan1.jpg";
import uzbekistan2 from "../../assets/soccer/teams/uzbekistan2.jpg";

/* CAF */

import algeria1 from "../../assets/soccer/teams/algeria1.jpg";
import algeria2 from "../../assets/soccer/teams/algeria2.jpg";

import caboVerde1 from "../../assets/soccer/teams/cabo-verde1.jpg";
import caboVerde2 from "../../assets/soccer/teams/cabo-verde2.jpg";

import congoDr1 from "../../assets/soccer/teams/congodr1.jpg";
import congoDr2 from "../../assets/soccer/teams/congodr2.jpg";

import egypt1 from "../../assets/soccer/teams/egypt1.jpg";
import egypt2 from "../../assets/soccer/teams/egypt2.jpg";

import ghana1 from "../../assets/soccer/teams/ghana1.jpg";
import ghana2 from "../../assets/soccer/teams/ghana2.jpg";

import ivoryCoast1 from "../../assets/soccer/teams/ivory-coast1.jpg";
import ivoryCoast2 from "../../assets/soccer/teams/ivory-coast2.jpg";

import morocco1 from "../../assets/soccer/teams/morocco1.jpg";
import morocco2 from "../../assets/soccer/teams/morocco2.jpg";

import senegal1 from "../../assets/soccer/teams/senegal1.jpg";
import senegal2 from "../../assets/soccer/teams/senegal2.jpg";

import southAfrica1 from "../../assets/soccer/teams/south-africa1.jpg";
import southAfrica2 from "../../assets/soccer/teams/south-africa2.jpg";

import tunisia1 from "../../assets/soccer/teams/tunisia1.jpg";
import tunisia2 from "../../assets/soccer/teams/tunisia2.jpg";

/* CONCACAF */

import canada1 from "../../assets/soccer/teams/canada1.jpg";
import canada2 from "../../assets/soccer/teams/canada2.jpg";

import curacao1 from "../../assets/soccer/teams/curacao1.jpg";
import curacao2 from "../../assets/soccer/teams/curacao2.jpg";

import haiti1 from "../../assets/soccer/teams/haiti1.jpg";
import haiti2 from "../../assets/soccer/teams/haiti2.jpg";

import mexico1 from "../../assets/soccer/teams/mexico1.jpg";
import mexico2 from "../../assets/soccer/teams/mexico2.jpg";

import panama1 from "../../assets/soccer/teams/panama1.jpg";
import panama2 from "../../assets/soccer/teams/panama2.jpg";

import usa1 from "../../assets/soccer/teams/usa1.jpg";
import usa2 from "../../assets/soccer/teams/usa2.jpg";

/* CONMEBOL */

import argentina1 from "../../assets/soccer/teams/argentina1.jpg";
import argentina2 from "../../assets/soccer/teams/argentina2.jpg";

import brazil1 from "../../assets/soccer/teams/brazil1.jpg";
import brazil2 from "../../assets/soccer/teams/brazil2.jpg";

import colombia1 from "../../assets/soccer/teams/colombia1.jpg";
import colombia2 from "../../assets/soccer/teams/colombia2.jpg";

import ecuador1 from "../../assets/soccer/teams/ecuador1.jpg";
import ecuador2 from "../../assets/soccer/teams/ecuador2.jpg";

import paraguay1 from "../../assets/soccer/teams/paraguay1.jpg";
import paraguay2 from "../../assets/soccer/teams/paraguay2.jpg";

import uruguay1 from "../../assets/soccer/teams/uruguay1.jpg";
import uruguay2 from "../../assets/soccer/teams/uruguay2.jpg";

/* OFC */

import newZealand1 from "../../assets/soccer/teams/new-zealand1.jpg";
import newZealand2 from "../../assets/soccer/teams/new-zealand2.jpg";

/* UEFA */

import austria1 from "../../assets/soccer/teams/austria1.jpg";
import austria2 from "../../assets/soccer/teams/austria2.jpg";

import belgium1 from "../../assets/soccer/teams/belgium1.jpg";
import belgium2 from "../../assets/soccer/teams/belgium2.jpg";

import bosnia1 from "../../assets/soccer/teams/bosnia1.jpg";
import bosnia2 from "../../assets/soccer/teams/bosnia2.jpg";

import croatia1 from "../../assets/soccer/teams/croatia1.jpg";
import croatia2 from "../../assets/soccer/teams/croatia2.jpg";

import czechia1 from "../../assets/soccer/teams/czech1.jpg";
import czechia2 from "../../assets/soccer/teams/czech2.jpg";

import england1 from "../../assets/soccer/teams/england1.jpg";
import england2 from "../../assets/soccer/teams/england2.jpg";

import france1 from "../../assets/soccer/teams/france1.jpg";
import france2 from "../../assets/soccer/teams/france2.jpg";

import germany1 from "../../assets/soccer/teams/germany1.jpg";
import germany2 from "../../assets/soccer/teams/germany2.jpg";

import netherlands1 from "../../assets/soccer/teams/netherlands1.jpg";
import netherlands2 from "../../assets/soccer/teams/netherlands2.jpg";

import norway1 from "../../assets/soccer/teams/norway1.jpg";
import norway2 from "../../assets/soccer/teams/norway2.jpg";

import portugal1 from "../../assets/soccer/teams/portugal1.jpg";
import portugal2 from "../../assets/soccer/teams/portugal2.jpg";

import scotland1 from "../../assets/soccer/teams/scotland1.jpg";
import scotland2 from "../../assets/soccer/teams/scotland2.jpg";

import spain1 from "../../assets/soccer/teams/spain1.jpg";
import spain2 from "../../assets/soccer/teams/spain2.jpg";

import sweden1 from "../../assets/soccer/teams/sweden1.jpg";
import sweden2 from "../../assets/soccer/teams/sweden2.jpg";

import switzerland1 from "../../assets/soccer/teams/switserland1.jpg";
import switzerland2 from "../../assets/soccer/teams/switserland2.jpg";

import turkey1 from "../../assets/soccer/teams/turkey1.jpg";
import turkey2 from "../../assets/soccer/teams/turkey2.jpg";

/* ======================================================
   TEAM IMAGE MAPS
   ====================================================== */

const TEAM_IMAGE_MAP: Record<
  string,
  string[]
> = {
  australia: [australia1, australia2],
  iran: [iran1, iran2],
  iraq: [iraq1, iraq2],
  japan: [japan1, japan2],
  jordan: [jordan1, jordan2],
  qatar: [qatar1, qatar2],

  "saudi-arabia": [
    saudiArabia1,
    saudiArabia2,
  ],

  "south-korea": [
    southKorea1,
    southKorea2,
  ],

  uzbekistan: [
    uzbekistan1,
    uzbekistan2,
  ],

  algeria: [algeria1, algeria2],

  "cape-verde": [
    caboVerde1,
    caboVerde2,
  ],

  "dr-congo": [
    congoDr1,
    congoDr2,
  ],

  egypt: [egypt1, egypt2],
  ghana: [ghana1, ghana2],

  "ivory-coast": [
    ivoryCoast1,
    ivoryCoast2,
  ],

  morocco: [morocco1, morocco2],
  senegal: [senegal1, senegal2],

  "south-africa": [
    southAfrica1,
    southAfrica2,
  ],

  tunisia: [tunisia1, tunisia2],

  canada: [canada1, canada2],
  curacao: [curacao1, curacao2],
  haiti: [haiti1, haiti2],
  mexico: [mexico1, mexico2],
  panama: [panama1, panama2],

  "united-states": [
    usa1,
    usa2,
  ],

  argentina: [
    argentina1,
    argentina2,
  ],

  brazil: [brazil1, brazil2],

  colombia: [
    colombia1,
    colombia2,
  ],

  ecuador: [ecuador1, ecuador2],

  paraguay: [
    paraguay1,
    paraguay2,
  ],

  uruguay: [
    uruguay1,
    uruguay2,
  ],

  "new-zealand": [
    newZealand1,
    newZealand2,
  ],

  austria: [austria1, austria2],
  belgium: [belgium1, belgium2],
  bosnia: [bosnia1, bosnia2],
  croatia: [croatia1, croatia2],
  czechia: [czechia1, czechia2],
  england: [england1, england2],
  france: [france1, france2],
  germany: [germany1, germany2],

  netherlands: [
    netherlands1,
    netherlands2,
  ],

  norway: [norway1, norway2],

  portugal: [
    portugal1,
    portugal2,
  ],

  scotland: [
    scotland1,
    scotland2,
  ],

  spain: [spain1, spain2],
  sweden: [sweden1, sweden2],

  switzerland: [
    switzerland1,
    switzerland2,
  ],

  turkiye: [turkey1, turkey2],
};

/* ======================================================
   CONFEDERATION THEMES
   ====================================================== */

const CONFEDERATION_THEMES = {
  AFC: {
    gradient:
      "linear-gradient(135deg, rgba(255,80,80,0.38), rgba(120,0,0,0.42))",
  },

  CAF: {
    gradient:
      "linear-gradient(135deg, rgba(0,160,90,0.32), rgba(0,60,30,0.42))",
  },

  CONCACAF: {
    gradient:
      "linear-gradient(135deg, rgba(0,120,255,0.30), rgba(0,30,80,0.40))",
  },

  CONMEBOL: {
    gradient:
      "linear-gradient(135deg, rgba(255,215,0,0.24), rgba(20,60,140,0.40))",
  },

  OFC: {
    gradient:
      "linear-gradient(135deg, rgba(0,180,255,0.26), rgba(0,50,90,0.38))",
  },

  UEFA: {
    gradient:
      "linear-gradient(135deg, rgba(60,90,255,0.26), rgba(10,20,60,0.40))",
  },
};

/* ======================================================
   GET TEAM HERO IMAGE
   ====================================================== */

export function getTeamHeroImage(
  teamId: string
): string | null {
  return (
    TEAM_IMAGE_MAP[teamId]?.[0] ||
    null
  );
}

/* ======================================================
   GET TEAM GALLERY IMAGES
   ====================================================== */

export function getTeamGalleryImages(
  teamId: string
): string[] {
  return (
    TEAM_IMAGE_MAP[teamId] || []
  );
}

/* ======================================================
   GET CONFEDERATION THEME
   ====================================================== */

export function getConfederationTheme(
  region: string
) {
  return (
    CONFEDERATION_THEMES[
      region as keyof typeof CONFEDERATION_THEMES
    ] || CONFEDERATION_THEMES.UEFA
  );
}