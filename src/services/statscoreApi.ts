// --------------------------------------------------
// Statscore API Service
// --------------------------------------------------

const BASE_URL = "https://api.statscore.com/v2";

const USERNAME = "the-rugby-anthem-zone";
const SECRET_KEY = "7WVjRGn3PMsDHtUQa7ySnqmv3vOWS3b6vrY";

/**
 * Base64 encode credentials for Basic Auth
 */
function getAuthHeader() {
  const credentials = btoa(`${USERNAME}:${SECRET_KEY}`);
  return `Basic ${credentials}`;
}

/**
 * Generic fetch wrapper
 */
async function statscoreFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Statscore API error: ${response.status}`);
  }

  const data = await response.json();

  return data.data ?? [];
}

/**
 * Fetch competitions
 */
export async function fetchCompetitions() {
  return statscoreFetch("competitions");
}

/**
 * Fetch events (matches)
 */
export async function fetchEvents() {
  return statscoreFetch("events");
}