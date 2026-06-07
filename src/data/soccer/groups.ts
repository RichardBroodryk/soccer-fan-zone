export interface SoccerGroup {
  id: string;
  name: string;
  teams: string[];
  qualifiedCount?: number;
  stage?: string;
}

export const groups: SoccerGroup[] = [
  {
    id: "a",
    name: "Group A",
    teams: [
      "Mexico",
      "South Africa",
      "South Korea",
      "Czechia",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "b",
    name: "Group B",
    teams: [
      "Canada",
      "Bosnia and Herzegovina",
      "Qatar",
      "Switzerland",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "c",
    name: "Group C",
    teams: [
      "Brazil",
      "Morocco",
      "Haiti",
      "Scotland",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "d",
    name: "Group D",
    teams: [
      "United States",
      "Paraguay",
      "Australia",
      "Türkiye",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "e",
    name: "Group E",
    teams: [
      "Germany",
      "Curaçao",
      "Côte d'Ivoire",
      "Ecuador",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "f",
    name: "Group F",
    teams: [
      "Netherlands",
      "Japan",
      "Sweden",
      "Tunisia",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "g",
    name: "Group G",
    teams: [
      "Belgium",
      "Egypt",
      "Iran",
      "New Zealand",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "h",
    name: "Group H",
    teams: [
      "Spain",
      "Cape Verde",
      "Saudi Arabia",
      "Uruguay",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "i",
    name: "Group I",
    teams: [
      "France",
      "Senegal",
      "Iraq",
      "Norway",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "j",
    name: "Group J",
    teams: [
      "Argentina",
      "Algeria",
      "Austria",
      "Jordan",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "k",
    name: "Group K",
    teams: [
      "Portugal",
      "DR Congo",
      "Uzbekistan",
      "Colombia",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },

  {
    id: "l",
    name: "Group L",
    teams: [
      "England",
      "Croatia",
      "Ghana",
      "Panama",
    ],
    qualifiedCount: 2,
    stage: "Group Stage",
  },
];