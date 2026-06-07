export interface SoccerMyTeamsStorage {
  teams: string[];
}

const STORAGE_KEY =
  "soccer_my_teams";

export function loadMySoccerTeams(): SoccerMyTeamsStorage {
  try {
    const raw =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!raw) {
      return {
        teams: [],
      };
    }

    const parsed =
      JSON.parse(raw);

    return {
      teams:
        parsed.teams || [],
    };
  } catch (error) {
    console.warn(
      "Failed to load soccer teams",
      error
    );

    return {
      teams: [],
    };
  }
}

export function saveMySoccerTeams(
  teams: string[]
) {
  try {
    localStorage.setItem(
      STORAGE_KEY,

      JSON.stringify({
        teams,
      })
    );
  } catch (error) {
    console.warn(
      "Failed to save soccer teams",
      error
    );
  }
}