// --------------------------------------------------
// RAZ SYSTEM — MATCHES ADAPTER (ROLLS ROYCE)
// UPDATED: Instance ID Preservation + Safe Fallback
// --------------------------------------------------

/* ✅ FIX: IMPORT TYPE */
import type { MatchData } from "./matches/matches2026Men";

/* ✅ DATA SOURCE */
import { matches2026 } from "./matches";

import { COMPETITIONS } from "../contracts/competitionRegistry";
import { calculateImportance } from "../contracts/importanceEngine";
import { LEAGUE_COMPETITION_MAP } from "../contracts/leagueCompetitionMap";
import { LEAGUE_API_MAP } from "../contracts/leagueApiMap";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* 🔥 TOURNAMENT META */
import { tournaments2026 } from "./tournamentMeta";

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
   🔥 TOURNAMENT RESOLVER (FALLBACK ONLY)
   ================================================== */

function resolveTournamentInstanceId(
  match: MatchData
): string | undefined {
  if (!match.tournament) return undefined;

  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "");

  const matchKey = normalize(match.tournament);

  const found = tournaments2026.find((t) => {
    if (!t.matchKey) return false;

    return normalize(t.matchKey) === matchKey;
  });

  return found?.instanceId;
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

    const BASE =
      process.env.REACT_APP_API_BASE ||
      process.env.REACT_APP_API_URL ||
      "https://rugby-anthem-backend.fly.dev/api/rugby";

    console.log("RAZ BASE URL:", BASE);

    const res = await fetch(
      `${BASE}/fixtures?league=${entry.id}&season=2026`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("RAZ BACKEND ERROR:", res.status, text);

      return null;
    }

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

  /* 🔒 RULE: FALLBACK IS CORE */
  if (!backendData || backendData.length === 0) {
    console.log("RAZ: FALLBACK ACTIVATED");
    data = matches2026;
  } else {
    console.log("RAZ: USING BACKEND DATA");
    data = backendData;
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

  /* ==================================================
     🔥 FINAL NORMALIZATION (FIXED)
     ================================================== */

  return filtered.map((match) => {
    /* ✅ CRITICAL FIX:
       - Preserve existing instanceId
       - Only fallback if missing
    */
    const tournamentInstanceId =
      match.tournamentInstanceId ||
      resolveTournamentInstanceId(match);

    return {
      ...match,
      tournamentInstanceId,
      importance: calculateImportance(match),
    };
  });
}