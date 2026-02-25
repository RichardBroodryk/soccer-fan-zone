import { API_BASE_URL } from "../config/api";

export async function fetchTournamentComments(tournamentId: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/comments?tournament_id=${tournamentId}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tournament comments");
    }

    return await res.json();
  } catch (err) {
    console.error("fetchTournamentComments error:", err);
    throw err;
  }
}