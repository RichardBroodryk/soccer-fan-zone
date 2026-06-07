/* ======================================================
   FLAG IMPORTS
   ====================================================== */

import algeria from "../../assets/soccer/flags/algeria.jpg";
import argentina from "../../assets/soccer/flags/argentina.jpg";
import australia from "../../assets/soccer/flags/australia.jpg";
import austria from "../../assets/soccer/flags/austria.jpg";
import belgium from "../../assets/soccer/flags/belgium.jpg";
import bosnia from "../../assets/soccer/flags/bosnia-herzegovina.jpg";
import brazil from "../../assets/soccer/flags/brazil.jpg";
import cameroon from "../../assets/soccer/flags/cameroon.jpg";
import canada from "../../assets/soccer/flags/canada.jpg";
import capeVerde from "../../assets/soccer/flags/cape-verde.jpg";
import colombia from "../../assets/soccer/flags/colombia.jpg";
import congoDr from "../../assets/soccer/flags/congodr.jpg";
import coteDivoire from "../../assets/soccer/flags/cote-divoire.jpg";
import croatia from "../../assets/soccer/flags/croatia.jpg";
import curacao from "../../assets/soccer/flags/curacao.jpg";
import czech from "../../assets/soccer/flags/czech.jpg";
import ecuador from "../../assets/soccer/flags/ecuador.jpg";
import egypt from "../../assets/soccer/flags/egypt.jpg";
import england from "../../assets/soccer/flags/england.png";
import france from "../../assets/soccer/flags/france.jpg";
import germany from "../../assets/soccer/flags/germany.jpg";
import ghana from "../../assets/soccer/flags/ghana.jpg";
import haiti from "../../assets/soccer/flags/haiti.jpg";
import iran from "../../assets/soccer/flags/iran.jpg";
import iraq from "../../assets/soccer/flags/iraq.jpg";
import japan from "../../assets/soccer/flags/japan.jpg";
import jordan from "../../assets/soccer/flags/jordan.jpg";
import mexico from "../../assets/soccer/flags/mexico.jpg";
import morocco from "../../assets/soccer/flags/morocco.jpg";
import netherlands from "../../assets/soccer/flags/netherland.jpg";
import newZealand from "../../assets/soccer/flags/new-zealand.jpg";
import norway from "../../assets/soccer/flags/norway.jpg";
import panama from "../../assets/soccer/flags/panama.jpg";
import paraguay from "../../assets/soccer/flags/paraguay.jpg";
import portugal from "../../assets/soccer/flags/portugal.jpg";
import qatar from "../../assets/soccer/flags/qatar.jpg";
import saudiArabia from "../../assets/soccer/flags/saudi-arabia.jpg";
import scotland from "../../assets/soccer/flags/scotland.jpg";
import senegal from "../../assets/soccer/flags/senegal.jpg";
import southAfrica from "../../assets/soccer/flags/south-africa.jpg";
import southKorea from "../../assets/soccer/flags/south-korea.jpg";
import spain from "../../assets/soccer/flags/spain.jpg";
import sweden from "../../assets/soccer/flags/sweden.jpg";
import switzerland from "../../assets/soccer/flags/switzerland.jpg";
import tunisia from "../../assets/soccer/flags/tunisia.jpg";
import turkey from "../../assets/soccer/flags/turkey.jpg";
import uruguay from "../../assets/soccer/flags/uruguay.jpg";
import usa from "../../assets/soccer/flags/usa.jpg";
import uzbekistan from "../../assets/soccer/flags/uzbekistan.jpg";

/* ======================================================
   FLAG MAP
   ====================================================== */

const FLAG_MAP: Record<string, string> = {
  algeria,
  argentina,
  australia,
  austria,
  belgium,

  bosnia,
  "bosnia-herzegovina": bosnia,

  brazil,
  "cameroon": cameroon,
  canada,

  "cape-verde": capeVerde,

  colombia,

  congodr: congoDr,
  "dr-congo": congoDr,

  "cote-divoire": coteDivoire,
  "ivory-coast": coteDivoire,

  croatia,
  curacao,

  czech,
  czechia: czech,

  ecuador,
  egypt,
  england,
  france,
  germany,
  ghana,
  haiti,
  iran,
  iraq,
  japan,
  jordan,
  mexico,
  morocco,

  netherland: netherlands,
netherlands,

  "new-zealand": newZealand,

  norway,
  panama,
  paraguay,
  portugal,
  qatar,

  "saudi-arabia": saudiArabia,

  scotland,
  senegal,

  "south-africa": southAfrica,

  "south-korea": southKorea,

  spain,
  sweden,
  switzerland,
  tunisia,

  turkiye: turkey,

  uruguay,

  usa,
  "united-states": usa,

  uzbekistan,
};

/* ======================================================
   NORMALIZER
   ====================================================== */

export function normalizeNation(
  nation: string
) {
  const normalized = nation
    .toLowerCase()
    .trim()

    /* REMOVE ACCENTS */
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

    /* CLEAN SYMBOLS */
    .replace(/&/g, "and")
    .replace(/'/g, "")
    .replace(/\./g, "")

    /* SPACES TO DASHES */
    .replace(/\s+/g, "-");

  /* ======================================================
     SPECIAL CASES
     ====================================================== */

  const aliases: Record<
    string,
    string
  > = {
    usa: "united-states",

    us: "united-states",

    "united-states-of-america":
      "united-states",

    turkey: "turkiye",

    turkiye: "turkiye",

    "bosnia-and-herzegovina":
      "bosnia-herzegovina",

    "bosnia-herzegovina":
      "bosnia-herzegovina",

    "cote-divoire":
      "ivory-coast",

    "dr-congo":
      "dr-congo",

    "congo-dr":
      "dr-congo",

    "czech-republic":
      "czechia",

    korea:
      "south-korea",

    "korea-republic":
      "south-korea",

    "republic-of-korea":
      "south-korea",

    holland:
      "netherlands",
  };

  return (
    aliases[normalized] ||
    normalized
  );
}

/* ======================================================
   GET FLAG
   ====================================================== */

export function getFlag(
  nation: string
): string | null {
  const normalized =
    normalizeNation(nation);

  return (
    FLAG_MAP[normalized] ||
    null
  );
}