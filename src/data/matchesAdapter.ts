// --------------------------------------------------
// RAZ SYSTEM — MATCHES ADAPTER (ROLLS ROYCE)
// FINAL — STATE + SAFETY + FALLBACK LOCKED (MERGE FIX)
// --------------------------------------------------

import type { MatchData } from "../data/matches/types";

import { matches2026 } from "./matches";

import { COMPETITIONS } from "../contracts/competitionRegistry";
import { calculateImportance } from "../contracts/importanceEngine";
import { LEAGUE_COMPETITION_MAP } from "../contracts/leagueCompetitionMap";
import { LEAGUE_API_MAP } from "../contracts/leagueApiMap";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

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
   STATE RESOLUTION (CENTRALIZED)
   ================================================== */

function getMatchState(match: MatchData) {
  if (match.score) return "final";
  return "upcoming";
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
   TOURNAMENT RESOLVER
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

    const res = await fetch(
      `${BASE}/fixtures?league=${entry.id}&season=2026`
    );

    if (!res.ok) {
      console.warn("RAZ BACKEND ERROR:", res.status);
      return null;
    }

    const apiData = await res.json();

    const converted = convertApiSportsFixtures(apiData);

    if (!Array.isArray(converted)) {
      console.warn("RAZ: INVALID API FORMAT");
      return null;
    }

    return converted;
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

  /* ✅ FIX: MERGE instead of replace */
  if (!backendData || backendData.length === 0) {
    data = matches2026;
  } else {
    const merged = [...matches2026];

    backendData.forEach((bm) => {
      const exists = merged.some((m) => m.id === bm.id);
      if (!exists) merged.push(bm);
    });

    data = merged;
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

  return filtered.map((match) => {
    const tournamentInstanceId =
      match.tournamentInstanceId ||
      resolveTournamentInstanceId(match);

    return {
      ...match,
      tournamentInstanceId,
      importance: calculateImportance(match),
      state: getMatchState(match),
    };
  });
}