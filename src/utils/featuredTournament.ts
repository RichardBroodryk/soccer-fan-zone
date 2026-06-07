export interface FeaturedTournamentData {
  id: string;
  name: string;
}

const STORAGE_KEY = "sfz_featured_tournament";

export function saveFeaturedTournament(tournament: FeaturedTournamentData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tournament));
}

export function getFeaturedTournament(): FeaturedTournamentData | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as FeaturedTournamentData;
  } catch {
    return null;
  }
}

export function clearFeaturedTournament() {
  localStorage.removeItem(STORAGE_KEY);
}
