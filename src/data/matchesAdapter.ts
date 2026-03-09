import { matches2026 } from "./matches2026";

const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://rugby-anthem-backend-production.up.railway.app";

export async function getMatches() {

  try {

    const res = await fetch(`${API_BASE}/api/stats/fixtures`);

    if (!res.ok) {
      throw new Error("API failed");
    }

    const apiMatches = await res.json();

    if (!Array.isArray(apiMatches) || apiMatches.length === 0) {
      return matches2026;
    }

    return apiMatches;

  } catch (err) {

    console.warn("Using fallback matches2026 dataset");

    return matches2026;

  }

}