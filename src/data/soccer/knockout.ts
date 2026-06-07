import type { SoccerMatch } from "./types";

export interface KnockoutRound {
  id: string;

  title: string;

  order: number;

  matches: SoccerMatch[];
}

/* ======================================================
   ROUND OF 32
   ====================================================== */

const roundOf32: SoccerMatch[] = [
  {
    id: "r32-1",

    home: "1A",
    away: "2B",

    date: "2026-06-28T12:00:00",

    stadium: "SoFi Stadium",
    stadiumId: "sofi-stadium",

    city: "Los Angeles",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 1,
  },

  {
    id: "r32-2",

    home: "1C",
    away: "2D",

    date: "2026-06-28T15:00:00",

    stadium: "AT&T Stadium",
    stadiumId: "att-stadium",

    city: "Dallas",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 1,
  },

  {
    id: "r32-3",

    home: "1E",
    away: "2F",

    date: "2026-06-28T18:00:00",

    stadium: "MetLife Stadium",
    stadiumId: "metlife-stadium",

    city: "New York",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 1,
  },

  {
    id: "r32-4",

    home: "1G",
    away: "2H",

    date: "2026-06-28T21:00:00",

    stadium: "Mercedes-Benz Stadium",
    stadiumId: "mercedes-benz-stadium",

    city: "Atlanta",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 1,
  },

  {
    id: "r32-5",

    home: "1I",
    away: "2J",

    date: "2026-06-29T12:00:00",

    stadium: "Hard Rock Stadium",
    stadiumId: "hard-rock-stadium",

    city: "Miami",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 2,
  },

  {
    id: "r32-6",

    home: "1K",
    away: "2L",

    date: "2026-06-29T15:00:00",

    stadium: "BC Place",
    stadiumId: "bc-place",

    city: "Vancouver",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 2,
  },

  {
    id: "r32-7",

    home: "1M",
    away: "2N",

    date: "2026-06-29T18:00:00",

    stadium: "Lincoln Financial Field",
    stadiumId: "lincoln-financial-field",

    city: "Philadelphia",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 2,
  },

  {
    id: "r32-8",

    home: "1O",
    away: "2P",

    date: "2026-06-29T21:00:00",

    stadium: "Lumen Field",
    stadiumId: "lumen-field",

    city: "Seattle",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 2,
  },

  {
    id: "r32-9",

    home: "1B",
    away: "2A",

    date: "2026-06-30T12:00:00",

    stadium: "Gillette Stadium",
    stadiumId: "gillette-stadium",

    city: "Boston",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 3,
  },

  {
    id: "r32-10",

    home: "1D",
    away: "2C",

    date: "2026-06-30T15:00:00",

    stadium: "NRG Stadium",
    stadiumId: "nrg-stadium",

    city: "Houston",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 3,
  },

  {
    id: "r32-11",

    home: "1F",
    away: "2E",

    date: "2026-06-30T18:00:00",

    stadium: "Estadio Azteca",
    stadiumId: "estadio-azteca",

    city: "Mexico City",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 3,
  },

  {
    id: "r32-12",

    home: "1H",
    away: "2G",

    date: "2026-06-30T21:00:00",

    stadium: "Estadio BBVA",
    stadiumId: "estadio-bbva",

    city: "Monterrey",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 3,
  },

  {
    id: "r32-13",

    home: "1J",
    away: "2I",

    date: "2026-07-01T12:00:00",

    stadium: "Estadio Akron",
    stadiumId: "estadio-akron",

    city: "Guadalajara",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 4,
  },

  {
    id: "r32-14",

    home: "1L",
    away: "2K",

    date: "2026-07-01T15:00:00",

    stadium: "Arrowhead Stadium",
    stadiumId: "arrowhead-stadium",

    city: "Kansas City",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 4,
  },

  {
    id: "r32-15",

    home: "1N",
    away: "2M",

    date: "2026-07-01T18:00:00",

    stadium: "BMO Field",
    stadiumId: "bmo-field",

    city: "Toronto",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 4,
  },

  {
    id: "r32-16",

    home: "1P",
    away: "2O",

    date: "2026-07-01T21:00:00",

    stadium: "Levi's Stadium",
    stadiumId: "levis-stadium",

    city: "San Francisco",

    status: "upcoming",

    stage: "Round of 32",

    matchday: 4,
  },
];

/* ======================================================
   ROUND OF 16
   ====================================================== */

const roundOf16: SoccerMatch[] = [
  {
    id: "r16-1",

    home: "Winner R32-1",
    away: "Winner R32-2",

    date: "2026-07-04T12:00:00",

    stadium: "MetLife Stadium",
    stadiumId: "metlife-stadium",

    city: "New York",

    status: "upcoming",

    stage: "Round of 16",

    matchday: 5,
  },

  {
    id: "r16-2",

    home: "Winner R32-3",
    away: "Winner R32-4",

    date: "2026-07-04T15:00:00",

    stadium: "AT&T Stadium",
    stadiumId: "att-stadium",

    city: "Dallas",

    status: "upcoming",

    stage: "Round of 16",

    matchday: 5,
  },

  {
    id: "r16-3",

    home: "Winner R32-5",
    away: "Winner R32-6",

    date: "2026-07-04T18:00:00",

    stadium: "Hard Rock Stadium",
    stadiumId: "hard-rock-stadium",

    city: "Miami",

    status: "upcoming",

    stage: "Round of 16",

    matchday: 5,
  },

  {
    id: "r16-4",

    home: "Winner R32-7",
    away: "Winner R32-8",

    date: "2026-07-04T21:00:00",

    stadium: "SoFi Stadium",
    stadiumId: "sofi-stadium",

    city: "Los Angeles",

    status: "upcoming",

    stage: "Round of 16",

    matchday: 5,
  },

  {
    id: "r16-5",

    home: "Winner R32-9",
    away: "Winner R32-10",

    date: "2026-07-05T12:00:00",

    stadium: "Lumen Field",
    stadiumId: "lumen-field",

    city: "Seattle",

    status: "upcoming",

    stage: "Round of 16",

    matchday: 6,
  },

  {
    id: "r16-6",

    home: "Winner R32-11",
    away: "Winner R32-12",

    date: "2026-07-05T15:00:00",

    stadium: "BC Place",
    stadiumId: "bc-place",

    city: "Vancouver",

    status: "upcoming",

    stage: "Round of 16",

    matchday: 6,
  },

  {
    id: "r16-7",

    home: "Winner R32-13",
    away: "Winner R32-14",

    date: "2026-07-05T18:00:00",

    stadium: "Lincoln Financial Field",
    stadiumId: "lincoln-financial-field",

    city: "Philadelphia",

    status: "upcoming",

    stage: "Round of 16",

    matchday: 6,
  },

  {
    id: "r16-8",

    home: "Winner R32-15",
    away: "Winner R32-16",

    date: "2026-07-05T21:00:00",

    stadium: "Mercedes-Benz Stadium",
    stadiumId: "mercedes-benz-stadium",

    city: "Atlanta",

    status: "upcoming",

    stage: "Round of 16",

    matchday: 6,
  },
];

/* ======================================================
   QUARTERFINALS
   ====================================================== */

const quarterFinals: SoccerMatch[] = [
  {
    id: "qf-1",

    home: "Winner R16-1",
    away: "Winner R16-2",

    date: "2026-07-09T18:00:00",

    stadium: "Gillette Stadium",
    stadiumId: "gillette-stadium",

    city: "Boston",

    status: "upcoming",

    stage: "Quarterfinal",

    matchday: 7,
  },

  {
    id: "qf-2",

    home: "Winner R16-3",
    away: "Winner R16-4",

    date: "2026-07-09T21:00:00",

    stadium: "Arrowhead Stadium",
    stadiumId: "arrowhead-stadium",

    city: "Kansas City",

    status: "upcoming",

    stage: "Quarterfinal",

    matchday: 7,
  },

  {
    id: "qf-3",

    home: "Winner R16-5",
    away: "Winner R16-6",

    date: "2026-07-10T18:00:00",

    stadium: "SoFi Stadium",
    stadiumId: "sofi-stadium",

    city: "Los Angeles",

    status: "upcoming",

    stage: "Quarterfinal",

    matchday: 7,
  },

  {
    id: "qf-4",

    home: "Winner R16-7",
    away: "Winner R16-8",

    date: "2026-07-10T21:00:00",

    stadium: "Hard Rock Stadium",
    stadiumId: "hard-rock-stadium",

    city: "Miami",

    status: "upcoming",

    stage: "Quarterfinal",

    matchday: 7,
  },
];

/* ======================================================
   SEMIFINALS
   ====================================================== */

const semiFinals: SoccerMatch[] = [
  {
    id: "sf-1",

    home: "Winner QF-1",
    away: "Winner QF-2",

    date: "2026-07-14T20:00:00",

    stadium: "AT&T Stadium",
    stadiumId: "att-stadium",

    city: "Dallas",

    status: "upcoming",

    stage: "Semifinal",

    matchday: 8,
  },

  {
    id: "sf-2",

    home: "Winner QF-3",
    away: "Winner QF-4",

    date: "2026-07-15T20:00:00",

    stadium: "Mercedes-Benz Stadium",
    stadiumId: "mercedes-benz-stadium",

    city: "Atlanta",

    status: "upcoming",

    stage: "Semifinal",

    matchday: 8,
  },
];

/* ======================================================
   FINAL
   ====================================================== */

const final: SoccerMatch[] = [
  {
    id: "final-1",

    home: "Winner SF-1",
    away: "Winner SF-2",

    date: "2026-07-19T20:00:00",

    stadium: "MetLife Stadium",
    stadiumId: "metlife-stadium",

    city: "New York",

    status: "upcoming",

    stage: "Final",

    matchday: 9,
  },
];

/* ======================================================
   EXPORTS
   ====================================================== */

export const knockoutRounds: KnockoutRound[] = [
  {
    id: "round-of-32",

    title: "Round of 32",

    order: 1,

    matches: roundOf32,
  },

  {
    id: "round-of-16",

    title: "Round of 16",

    order: 2,

    matches: roundOf16,
  },

  {
    id: "quarterfinals",

    title: "Quarterfinals",

    order: 3,

    matches: quarterFinals,
  },

  {
    id: "semifinals",

    title: "Semifinals",

    order: 4,

    matches: semiFinals,
  },

  {
    id: "final",

    title: "Final",

    order: 5,

    matches: final,
  },
];