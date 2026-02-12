export type CalendarStatus = "upcoming" | "live" | "final";

export type TeamRef = {
  name: string;
  country: string;
};

export type CalendarMatch = {
  id: number;

  date: Date;
  isoDate: string;

  tournamentId: string;
  tournamentName: string;
  gender: "men" | "women";

  home: TeamRef;
  away: TeamRef;

  stadiumSlug: string;
  stadiumName: string;
  city?: string;
  country?: string;

  status: CalendarStatus;

  score?: {
    home: number;
    away: number;
  };
};
