export interface SquadMeta {
  teamId: string;

  teamName: string;

  coach: string;

  squadStatus:
    | "final"
    | "provisional"
    | "pending";

  announcedDate?: string;

  squadSize?: number;

  captain?: string;

  formation?: string;
}

export const squads: SquadMeta[] = [
  {
    teamId: "bosnia",

    teamName:
      "Bosnia and Herzegovina",

    coach: "Sergej Barbarez",

    squadStatus: "final",

    announcedDate: "2026-05-11",

    squadSize: 26,

    captain: "Edin Džeko",

    formation: "4-2-3-1",
  },

  {
    teamId: "brazil",

    teamName: "Brazil",

    coach: "Carlo Ancelotti",

    squadStatus: "final",

    announcedDate: "2026-05-18",

    squadSize: 26,

    captain: "Marquinhos",

    formation: "4-3-3",
  },

  {
    teamId: "france",

    teamName: "France",

    coach: "Didier Deschamps",

    squadStatus: "final",

    announcedDate: "2026-05-13",

    squadSize: 26,

    captain: "Kylian Mbappé",

    formation: "4-3-3",
  },

  {
    teamId: "germany",

    teamName: "Germany",

    coach: "Julian Nagelsmann",

    squadStatus: "final",

    announcedDate: "2026-05-21",

    squadSize: 26,

    captain: "Joshua Kimmich",

    formation: "4-2-3-1",
  },

  {
    teamId: "japan",

    teamName: "Japan",

    coach: "Hajime Moriyasu",

    squadStatus: "final",

    announcedDate: "2026-05-15",

    squadSize: 26,

    captain: "Wataru Endō",

    formation: "4-3-3",
  },

  {
    teamId: "south-korea",

    teamName: "South Korea",

    coach: "Hong Myung-bo",

    squadStatus: "final",

    announcedDate: "2026-05-16",

    squadSize: 26,

    captain: "Son Heung-min",

    formation: "4-2-3-1",
  },

  {
    teamId: "new-zealand",

    teamName: "New Zealand",

    coach: "Darren Bazeley",

    squadStatus: "final",

    announcedDate: "2026-05-14",

    squadSize: 26,

    captain: "Chris Wood",

    formation: "5-3-2",
  },

  {
    teamId: "scotland",

    teamName: "Scotland",

    coach: "Steve Clarke",

    squadStatus: "final",

    announcedDate: "2026-05-20",

    squadSize: 26,

    captain: "Andy Robertson",

    formation: "3-4-2-1",
  },

  {
    teamId: "sweden",

    teamName: "Sweden",

    coach: "Jon Dahl Tomasson",

    squadStatus: "final",

    announcedDate: "2026-05-12",

    squadSize: 26,

    captain: "Victor Lindelöf",

    formation: "4-4-2",
  },

  {
    teamId: "tunisia",

    teamName: "Tunisia",

    coach: "Sami Trabelsi",

    squadStatus: "final",

    announcedDate: "2026-05-15",

    squadSize: 26,

    captain: "Ellyes Skhiri",

    formation: "4-3-3",
  },

  {
    teamId: "argentina",

    teamName: "Argentina",

    coach: "Lionel Scaloni",

    squadStatus: "provisional",

    squadSize: 35,

    captain: "Lionel Messi",

    formation: "4-3-3",
  },

  {
    teamId: "mexico",

    teamName: "Mexico",

    coach: "Javier Aguirre",

    squadStatus: "provisional",

    squadSize: 35,

    captain: "Guillermo Ochoa",

    formation: "4-3-3",
  },

  {
    teamId: "qatar",

    teamName: "Qatar",

    coach: "Luis García",

    squadStatus: "provisional",

    squadSize: 35,

    captain: "Akram Afif",

    formation: "5-3-2",
  },
];