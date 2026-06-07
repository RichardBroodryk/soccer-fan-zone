export type SoccerCalendarStatus =
  | "live"
  | "starting"
  | "today"
  | "upcoming"
  | "final";

export type SoccerCalendarTeam = {
  name: string;

  country: string;
};

export type SoccerCalendarMatch = {
  id: string;

  date: Date;

  isoDate: string;

  tournamentId: string;

  tournamentName: string;

  stage: string;

  group?: string;

  home: SoccerCalendarTeam;

  away: SoccerCalendarTeam;

  stadiumName: string;

  stadiumSlug: string;

  city?: string;

  status: SoccerCalendarStatus;

  homeScore?: number;

  awayScore?: number;

  minute?: number;

  featured?: boolean;
};