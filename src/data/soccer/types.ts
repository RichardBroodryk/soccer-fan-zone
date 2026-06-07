/* =========================================================
   MATCH STATUS
   ========================================================= */

export type MatchStatus =
  | "upcoming"
  | "live"
  | "final";

/* =========================================================
   CONFEDERATIONS
   ========================================================= */

export type Confederation =
  | "AFC"
  | "CAF"
  | "CONCACAF"
  | "CONMEBOL"
  | "OFC"
  | "UEFA";

/* =========================================================
   TEAM
   ========================================================= */

export interface SoccerTeam {
  id: string;

  name: string;

  shortName?: string;

  fifaCode?: string;

  region: Confederation;

  coach: string;

  aliases?: string[];

  flag?: string;

  primaryColor?: string;

  secondaryColor?: string;
}

/* =========================================================
   MATCH
   ========================================================= */

export interface SoccerMatch {
  id: string;

  tournamentId?: string;

  home: string;

  away: string;

  homeScore?: number;

  awayScore?: number;

  date: string;

  stadium?: string;

  stadiumId?: string;

  city: string;

  country?: string;

  status: MatchStatus;

  stage: string;

  group?: string;

  roundOrder?: number;

  round?: string;

  venue?: string;

  matchKey?: string;

  matchday?: number;

  minute?: number;

  attendance?: number;

  referee?: string;

  featured?: boolean;

  neutralVenue?: boolean;

  importance?: number;

  broadcast?: string[];

  homeScorers?: string[];

  awayScorers?: string[];

  penalties?: {
    home: number;

    away: number;
  };
}

/* =========================================================
   STADIUM
   ========================================================= */

export interface Stadium {
  id: string;

  name: string;

  city: string;

  country: string;

  capacity: number;

  images?: string[];
}

/* =========================================================
   GROUP STANDING
   ========================================================= */

export interface GroupStanding {
  teamId: string;

  played: number;

  won: number;

  drawn: number;

  lost: number;

  goalsFor: number;

  goalsAgainst: number;

  goalDifference: number;

  points: number;
}