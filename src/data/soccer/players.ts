export interface SoccerPlayer {
  id: string;

  name: string;

  nation: string;

  teamId: string;

  club: string;

  position:
    | "Goalkeeper"
    | "Defender"
    | "Midfielder"
    | "Forward";

  squadStatus?:
    | "confirmed"
    | "provisional"
    | "standby";

  age: number;

  number: number;

  caps?: number;

  goals?: number;

  assists?: number;

  captain?: boolean;

  viceCaptain?: boolean;

  injured?: boolean;

  suspended?: boolean;

  image?: string;
}

export { players } from "./players/index";