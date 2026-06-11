const API_BASE =
  import.meta.env
    .VITE_API_BASE_URL ||
  "http://localhost:4000";

/* ======================================================
   GENERIC FETCH
====================================================== */

async function backendFetch(
  endpoint: string
) {
  console.log(
    "FETCHING:",
    `${API_BASE}${endpoint}`
  );

  const response =
    await fetch(
      `${API_BASE}${endpoint}`
    );

  console.log(
    "STATUS:",
    response.status
  );

  if (!response.ok) {
    throw new Error(
      `Backend Error: ${response.status}`
    );
  }

  return response.json();
}

/* ======================================================
   LIVE FIXTURES
====================================================== */

export async function fetchLiveFixtures() {
  return backendFetch(
    "/api/football/live"
  );
}

/* ======================================================
   WORLD CUP FIXTURES
====================================================== */

export async function fetchWorldCupFixtures() {
  return backendFetch(
    "/api/football/world-cup"
  );
}