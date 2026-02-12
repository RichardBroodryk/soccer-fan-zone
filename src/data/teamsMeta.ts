/* ======================================================
   TEAM META — AUTHORITATIVE (v1)
   Rugby Anthem Zone
   Rule: Flag + Feather = Men + Women
   Date: 2026-01-18
====================================================== */

/* ================= FLAGS ================= */

import argentinaFlag from "../assets/images/flags/argentina.jpg";
import australiaFlag from "../assets/images/flags/australia.jpg";
import canadaFlag from "../assets/images/flags/canada.jpg";
import chileFlag from "../assets/images/flags/chile.jpg";
import englandFlag from "../assets/images/flags/england.png";
import fijiFlag from "../assets/images/flags/fiji.jpg";
import franceFlag from "../assets/images/flags/france.jpg";
import georgiaFlag from "../assets/images/flags/georgia.jpg";
import irelandFlag from "../assets/images/flags/ireland.jpg";
import italyFlag from "../assets/images/flags/italy.jpg";
import japanFlag from "../assets/images/flags/japan.jpg";
import namibiaFlag from "../assets/images/flags/namibia.jpg";
import netherlandsFlag from "../assets/images/flags/netherlands.jpg";
import newZealandFlag from "../assets/images/flags/new-zealand.jpg";
import portugalFlag from "../assets/images/flags/portugal.jpg";
import romaniaFlag from "../assets/images/flags/romania.jpg";
import samoaFlag from "../assets/images/flags/samoa.jpg";
import scotlandFlag from "../assets/images/flags/scotland.jpg";
import southAfricaFlag from "../assets/images/flags/south-africa.jpg";
import tongaFlag from "../assets/images/flags/tonga.jpg";
import usaFlag from "../assets/images/flags/united-states-of-america.jpg";
import uruguayFlag from "../assets/images/flags/uruguay.jpg";
import walesFlag from "../assets/images/flags/wales.jpg";

/* ================= FEATHER LOGOS ================= */

import argentinaFeather from "../assets/images/logos/feathered/argentina.png";
import australiaFeather from "../assets/images/logos/feathered/australia.png";
import canadaFeather from "../assets/images/logos/feathered/canada.png";
import chileFeather from "../assets/images/logos/feathered/chile.png";
import englandFeather from "../assets/images/logos/feathered/england.png";
import fijiFeather from "../assets/images/logos/feathered/fiji.png";
import franceFeather from "../assets/images/logos/feathered/france.png";
import georgiaFeather from "../assets/images/logos/feathered/georgia.png";
import irelandFeather from "../assets/images/logos/feathered/ireland.png";
import italyFeather from "../assets/images/logos/feathered/italy.png";
import japanFeather from "../assets/images/logos/feathered/japan.png";
import namibiaFeather from "../assets/images/logos/feathered/namibia.png";
import newZealandFeather from "../assets/images/logos/feathered/new-zealand.png";
import portugalFeather from "../assets/images/logos/feathered/portugal.png";
import romaniaFeather from "../assets/images/logos/feathered/romania.png";
import samoaFeather from "../assets/images/logos/feathered/samoa.png";
import scotlandFeather from "../assets/images/logos/feathered/scotland.png";
import southAfricaFeather from "../assets/images/logos/feathered/south-africa.png";
import tongaFeather from "../assets/images/logos/feathered/tonga.png";
import usaFeather from "../assets/images/logos/feathered/united-states-of-america.png";
import uruguayFeather from "../assets/images/logos/feathered/uruguay.png";
import walesFeather from "../assets/images/logos/feathered/wales.png";

/* ================= TYPES ================= */

export type TeamGender = "men" | "women";

export interface TeamMeta {
  id: string;
  name: string;
  gender: TeamGender;
  flag: string;
  feather: string;
}

/* ================= TEAMS ================= */

export const teamsMeta: TeamMeta[] = [
  /* ================= ARGENTINA ================= */
  { id: "argentina-men", name: "Argentina", gender: "men", flag: argentinaFlag, feather: argentinaFeather },
  { id: "argentina-women", name: "Argentina", gender: "women", flag: argentinaFlag, feather: argentinaFeather },

  /* ================= AUSTRALIA ================= */
  { id: "australia-men", name: "Australia", gender: "men", flag: australiaFlag, feather: australiaFeather },
  { id: "australia-women", name: "Australia", gender: "women", flag: australiaFlag, feather: australiaFeather },

  /* ================= CANADA ================= */
  { id: "canada-men", name: "Canada", gender: "men", flag: canadaFlag, feather: canadaFeather },
  { id: "canada-women", name: "Canada", gender: "women", flag: canadaFlag, feather: canadaFeather },

  /* ================= CHILE ================= */
  { id: "chile-men", name: "Chile", gender: "men", flag: chileFlag, feather: chileFeather },
  { id: "chile-women", name: "Chile", gender: "women", flag: chileFlag, feather: chileFeather },

  /* ================= ENGLAND ================= */
  { id: "england-men", name: "England", gender: "men", flag: englandFlag, feather: englandFeather },
  { id: "england-women", name: "England", gender: "women", flag: englandFlag, feather: englandFeather },

  /* ================= FIJI ================= */
  { id: "fiji-men", name: "Fiji", gender: "men", flag: fijiFlag, feather: fijiFeather },
  { id: "fiji-women", name: "Fiji", gender: "women", flag: fijiFlag, feather: fijiFeather },

  /* ================= FRANCE ================= */
  { id: "france-men", name: "France", gender: "men", flag: franceFlag, feather: franceFeather },
  { id: "france-women", name: "France", gender: "women", flag: franceFlag, feather: franceFeather },

  /* ================= GEORGIA ================= */
  { id: "georgia-men", name: "Georgia", gender: "men", flag: georgiaFlag, feather: georgiaFeather },
  { id: "georgia-women", name: "Georgia", gender: "women", flag: georgiaFlag, feather: georgiaFeather },

  /* ================= IRELAND ================= */
  { id: "ireland-men", name: "Ireland", gender: "men", flag: irelandFlag, feather: irelandFeather },
  { id: "ireland-women", name: "Ireland", gender: "women", flag: irelandFlag, feather: irelandFeather },

  /* ================= ITALY ================= */
  { id: "italy-men", name: "Italy", gender: "men", flag: italyFlag, feather: italyFeather },
  { id: "italy-women", name: "Italy", gender: "women", flag: italyFlag, feather: italyFeather },

  /* ================= JAPAN ================= */
  { id: "japan-men", name: "Japan", gender: "men", flag: japanFlag, feather: japanFeather },
  { id: "japan-women", name: "Japan", gender: "women", flag: japanFlag, feather: japanFeather },

  /* ================= NAMIBIA ================= */
  { id: "namibia-men", name: "Namibia", gender: "men", flag: namibiaFlag, feather: namibiaFeather },
  { id: "namibia-women", name: "Namibia", gender: "women", flag: namibiaFlag, feather: namibiaFeather },

  /* ================= NETHERLANDS ================= */
  { id: "netherlands-men", name: "Netherlands", gender: "men", flag: netherlandsFlag, feather: namibiaFeather },
  { id: "netherlands-women", name: "Netherlands", gender: "women", flag: netherlandsFlag, feather: namibiaFeather },

  /* ================= NEW ZEALAND ================= */
  { id: "new-zealand-men", name: "New Zealand", gender: "men", flag: newZealandFlag, feather: newZealandFeather },
  { id: "new-zealand-women", name: "New Zealand", gender: "women", flag: newZealandFlag, feather: newZealandFeather },

  /* ================= PORTUGAL ================= */
  { id: "portugal-men", name: "Portugal", gender: "men", flag: portugalFlag, feather: portugalFeather },
  { id: "portugal-women", name: "Portugal", gender: "women", flag: portugalFlag, feather: portugalFeather },

  /* ================= ROMANIA ================= */
  { id: "romania-men", name: "Romania", gender: "men", flag: romaniaFlag, feather: romaniaFeather },
  { id: "romania-women", name: "Romania", gender: "women", flag: romaniaFlag, feather: romaniaFeather },

  /* ================= SAMOA ================= */
  { id: "samoa-men", name: "Samoa", gender: "men", flag: samoaFlag, feather: samoaFeather },
  { id: "samoa-women", name: "Samoa", gender: "women", flag: samoaFlag, feather: samoaFeather },

  /* ================= SCOTLAND ================= */
  { id: "scotland-men", name: "Scotland", gender: "men", flag: scotlandFlag, feather: scotlandFeather },
  { id: "scotland-women", name: "Scotland", gender: "women", flag: scotlandFlag, feather: scotlandFeather },

  /* ================= SOUTH AFRICA ================= */
  { id: "south-africa-men", name: "South Africa", gender: "men", flag: southAfricaFlag, feather: southAfricaFeather },
  { id: "south-africa-women", name: "South Africa", gender: "women", flag: southAfricaFlag, feather: southAfricaFeather },

  /* ================= TONGA ================= */
  { id: "tonga-men", name: "Tonga", gender: "men", flag: tongaFlag, feather: tongaFeather },
  { id: "tonga-women", name: "Tonga", gender: "women", flag: tongaFlag, feather: tongaFeather },

  /* ================= USA ================= */
  { id: "usa-men", name: "USA", gender: "men", flag: usaFlag, feather: usaFeather },
  { id: "usa-women", name: "USA", gender: "women", flag: usaFlag, feather: usaFeather },

  /* ================= URUGUAY ================= */
  { id: "uruguay-men", name: "Uruguay", gender: "men", flag: uruguayFlag, feather: uruguayFeather },
  { id: "uruguay-women", name: "Uruguay", gender: "women", flag: uruguayFlag, feather: uruguayFeather },

  /* ================= WALES ================= */
  { id: "wales-men", name: "Wales", gender: "men", flag: walesFlag, feather: walesFeather },
  { id: "wales-women", name: "Wales", gender: "women", flag: walesFlag, feather: walesFeather },
];
