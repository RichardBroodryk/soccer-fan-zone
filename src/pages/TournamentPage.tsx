import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MatchRow from "../components/match/MatchRow";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";
import { matches2026 } from "../data/matches";

import { fetchSixNationsWomenMatches } from "../services/sixNationsWomenService";
import { fetchSvnsMatches } from "../services/svnsService";

import type { MatchData } from "../data/matches/types";

import styles from "./TournamentPage.module.css";

/* ================= HELPERS ================= */

function normalize(str: string) {
  return str.toLowerCase().replace(/\s+/g, "");
}

export default function TournamentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);

  const tournament = tournaments2026.find(
    (t) => t.route === location.pathname
  );

  /* ================= LOAD MATCHES ================= */

  useEffect(() => {
    if (!tournament) return;

    // 🔥 LIVE: Women's Six Nations
    if (tournament.conceptId === "six-nations-women") {
      fetchSixNationsWomenMatches().then((data) => {
        console.log("SNW DATA:", data);

        if (data.length) {
          setMatches(data);
          console.log("TOURNAMENT MATCHES:", data);
        } else {
          console.warn("SNW empty → no fallback");
          setMatches([]);
        }
      });
      return;
    }

    // 🔥 LIVE: SVNS
    if (tournament.conceptId === "svns") {
      fetchSvnsMatches().then((data) => {
        console.log("SVNS DATA:", data);

        if (data.length) {
          setMatches(data);
          console.log("TOURNAMENT MATCHES:", data);
        } else {
          console.warn("SVNS empty → no fallback");
          setMatches([]);
        }
      });
      return;
    }

    // 🔥 STATIC FALLBACK
    const filtered = matches2026
      .filter((m: MatchData) => {
        const instanceId =
          (m as { tournamentInstanceId?: string }).tournamentInstanceId;

        if (instanceId) {
          return instanceId === tournament.instanceId;
        }

        if (!m.tournament) return false;

        const matchKey = normalize(m.tournament);
        const tournamentKey = normalize(
          tournament.matchKey ||
            `${tournament.name} ${tournament.year}`
        );

        return matchKey === tournamentKey;
      })
      .sort(
        (a: MatchData, b: MatchData) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );

    setMatches(filtered);
  }, [tournament]);

  if (!tournament) {
    return <div className={styles.error}>Tournament not found</div>;
  }

  if (!matches.length) {
    return (
      <main className={styles.page}>
        <header className={styles.hero}>
          <h1>{tournament.name}</h1>
          <p>Live data is currently unavailable.</p>
        </header>

        <div className={styles.error}>
          No matches available for this tournament yet.
        </div>
      </main>
    );
  }

  const visual = getTournamentVisual(tournament.conceptId);

  /* ================= TEAMS ================= */

  const teams = Array.from(
    new Map(
      matches.flatMap((m: MatchData) => [
        [m.home.name, m.home],
        [m.away.name, m.away],
      ])
    ).values()
  );

  /* ================= ROUND GROUPING ================= */

  const roundMap: Record<string, string> = {
    "2026-04-11": "Round 1",
    "2026-04-18": "Round 2",
    "2026-04-25": "Round 3",
    "2026-05-09": "Round 4",
    "2026-05-17": "Round 5",
  };

  const groupedMatches: Record<string, MatchData[]> = {};

  matches.forEach((match: MatchData) => {
    const round =
      match.round ||
      roundMap[match.date] ||
      "Other";

    if (!groupedMatches[round]) groupedMatches[round] = [];
    groupedMatches[round].push(match);
  });

  /* ================= STANDINGS ================= */

  type TableRow = {
    team: string;
    country: string;
    played: number;
    won: number;
    draw: number;
    lost: number;
    pf: number;
    pa: number;
    pd: number;
    points: number;
  };

  const standings: Record<string, TableRow> = {};

  teams.forEach((team) => {
    standings[team.name] = {
      team: team.name,
      country: team.country,
      played: 0,
      won: 0,
      draw: 0,
      lost: 0,
      pf: 0,
      pa: 0,
      pd: 0,
      points: 0,
    };
  });

  matches.forEach((match: MatchData) => {
    if (!match.score) return;

    const home = standings[match.home.name];
    const away = standings[match.away.name];

    const homeScore = match.score.home;
    const awayScore = match.score.away;

    home.played++;
    away.played++;

    home.pf += homeScore;
    home.pa += awayScore;

    away.pf += awayScore;
    away.pa += homeScore;

    if (homeScore > awayScore) {
      home.won++;
      away.lost++;
      home.points += 4;
    } else if (awayScore > homeScore) {
      away.won++;
      home.lost++;
      away.points += 4;
    } else {
      home.draw++;
      away.draw++;
      home.points += 2;
      away.points += 2;
    }
  });

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{
          backgroundImage: `url(${
            tournament.gender === "women"
              ? visual.heroImageWomen
              : visual.heroImageMen
          })`,
        }}
      >
        <div className={styles.heroContent}>
          <h1>{tournament.name} {tournament.year}</h1>
          <p>{tournament.heroSubtitle}</p>
        </div>
      </header>

      {/* BACK */}
      <div className={styles.backNav}>
        <button onClick={() => navigate("/tournaments")}>
          ← Back to Tournaments
        </button>
      </div>

      {/* MATCHES */}
      <section className={styles.section}>
        <h2>Matches</h2>

        {Object.entries(groupedMatches).map(([round, games]) => (
          <div key={round}>
            <h3>{round}</h3>

            {games.map((match: MatchData) => (
              <MatchRow
                key={match.id}
                home={match.home}
                away={match.away}
                state={match.score ? "final" : "upcoming"}
                score={match.score}
                metaLeft={match.date}
                metaRight={match.venue}
                onClick={() =>
                  navigate(`/match/${match.id}`)
                }
              />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}