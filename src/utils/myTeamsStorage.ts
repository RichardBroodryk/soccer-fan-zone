const STORAGE_KEY = "raz_my_teams_v1";

export type StoredTeams = {
  men: string[];
  women: string[];
};

export function loadMyTeams(): StoredTeams {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { men: [], women: [] };
    }
    return JSON.parse(raw) as StoredTeams;
  } catch {
    return { men: [], women: [] };
  }
}

export function saveMyTeams(data: StoredTeams) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
