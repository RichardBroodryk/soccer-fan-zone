// --------------------------------------------------
// API-Sports Rugby Service
// --------------------------------------------------

const BASE_URL = "https://v1.rugby.api-sports.io";

/* PUT YOUR REAL API KEY HERE */
const API_KEY = "98844306cf41e6b4f567f722527415a2";

/**
 * Generic API-Sports request
 */
async function apiSportsFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "x-apisports-key": API_KEY,
    },
  });

  const data = await response.json();

  console.log("API SPORTS RESPONSE:", data);

  return data.response ?? [];
}

/**
 * Fetch Six Nations fixtures
 */
export async function fetchRugbyFixtures() {
  return apiSportsFetch("fixtures?league=1116&season=2026");
}