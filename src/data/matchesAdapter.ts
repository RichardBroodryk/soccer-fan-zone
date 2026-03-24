// --------------------------------------------------
// RAZ SYSTEM — MATCHES ADAPTER (ROLLS ROYCE)
// --------------------------------------------------

import { MatchData, matches2026 } from "./matches2026";

import { COMPETITIONS } from "../contracts/competitionRegistry";
import { calculateImportance } from "../contracts/importanceEngine";
import { LEAGUE_COMPETITION_MAP } from "../contracts/leagueCompetitionMap";
import { LEAGUE_API_MAP } from "../contracts/leagueApiMap";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ==================================================
   VALIDATION
   ================================================== */

function isValidStructure(match: MatchData): boolean {
  return (
    !!match.id &&
    !!match.date &&
    !!match.home?.name &&
    !!match.away?.name &&
    !!match.competitionId
  );
}

function isValidCompetition(match: MatchData): boolean {
  return (
    match.competitionId !== "unknown" &&
    COMPETITIONS.some(
      (c) => c.conceptId === match.competitionId
    )
  );
}

function isInternational(match: MatchData): boolean {
  return COMPETITIONS.some(
    (comp) =>
      comp.conceptId === match.competitionId &&
      comp.category === "international"
  );
}

function isDomestic(match: MatchData): boolean {
  return COMPETITIONS.some(
    (comp) =>
      comp.conceptId === match.competitionId &&
      comp.category === "domestic"
  );
}

/* ==================================================
   LEAGUE FILTER
   ================================================== */

function matchesLeague(
  match: MatchData,
  leagueId: string,
  gender: "men" | "women"
): boolean {
  const mapping = LEAGUE_COMPETITION_MAP[leagueId];
  if (!mapping) return false;

  return match.competitionId === mapping[gender];
}

/* ==================================================
   BACKEND FETCH
   ================================================== */

async function fetchFromBackend(
  leagueId?: string,
  gender?: "men" | "women"
): Promise<MatchData[] | null> {
  try {
    const key =
      leagueId && gender
        ? `${leagueId}-${gender}`
        : "six-nations-men";

    const entry = LEAGUE_API_MAP[key];

    if (!entry) {
      console.warn("RAZ BACKEND → NO MAPPING → FALLBACK");
      return null;
    }

    const BASE = process.env.REACT_APP_API_BASE;

    const res = await fetch(
      `${BASE}/fixtures?league=${entry.id}&season=2026`
    );

    if (!res.ok) throw new Error("Backend failed");

    const apiData = await res.json();

    return convertApiSportsFixtures(apiData);
  } catch (err) {
    console.warn("RAZ BACKEND FAIL → FALLBACK ACTIVATED");
    return null;
  }
}

/* ==================================================
   MAIN
   ================================================== */

export async function getMatches(options?: {
  type?: "international" | "domestic";
  gender?: "men" | "women";
  leagueId?: string;
}): Promise<MatchData[]> {
  let data: MatchData[] = [];

  const backendData = await fetchFromBackend(
    options?.leagueId,
    options?.gender
  );

  if (backendData && backendData.length > 0) {
    console.log("RAZ: USING BACKEND DATA");
    data = backendData;
  } else {
    console.log("RAZ: USING FALLBACK DATA");
    data = matches2026;
  }

  let filtered = data
    .filter(isValidStructure)
    .filter(isValidCompetition);

  if (!options?.type || options.type === "international") {
    filtered = filtered.filter(isInternational);
  }

  if (options?.type === "domestic") {
    filtered = filtered.filter(isDomestic);
  }

  if (options?.leagueId && options?.gender) {
    filtered = filtered.filter((m) =>
      matchesLeague(m, options.leagueId!, options.gender!)
    );
  }

  filtered.sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  return filtered.map((match) => ({
    ...match,
    importance: calculateImportance(match),
  }));
}