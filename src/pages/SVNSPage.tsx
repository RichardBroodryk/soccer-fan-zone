import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Flag from "../components/images/Flag";

import { matches2026 } from "../data/matches";
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSPage.module.css";

/* ================= HELPERS ================= */

function formatMatchDate(date: string) {
  const d = new Date(date);

  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/* ================= POOL ENGINE ================= */

type PoolRow = {
  team: string;
  country: string;
  played: number;
  pf: number;
  pa: number;
  pd: number;
  points: number;
};

function buildPoolTable(matches: MatchData[]) {
  const table: Record<string, PoolRow> = {};

  matches.forEach((match) => {
    if (!match.pool) return;

    [match.home, match.away].forEach((team) => {
      if (!table[team.name]) {
        table[team.name] = {
          team: team.name,
          country: team.country,
          played: 0,
          pf: 0,
          pa: 0,
          pd: 0,
          points: 0,
        };
      }
    });

    if (!match.score) return;

    const home = table[match.home.name];
    const away = table[match.away.name];

    home.played++;
    away.played++;

    home.pf += match.score.home;
    home.pa += match.score.away;

    away.pf += match.score.away;
    away.pa += match.score.home;

    if (match.score.home > match.score.away) {
      home.points += 3;
    } else if (match.score.away > match.score.home) {
      away.points += 3;
    }
  });

  return Object.values(table)
    .map((t) => ({ ...t, pd: t.pf - t.pa }))
    .sort((a, b) => b.points - a.points || b.pd - a.pd);
}

function getPools(matches: MatchData[], gender: "men" | "women") {
  const pools: Record<string, MatchData[]> = {};

  matches
    .filter((m) => m.gender === gender && m.round === "pool")
    .forEach((m) => {
      if (!m.pool) return;
      if (!pools[m.pool]) pools[m.pool] = [];
      pools[m.pool].push(m);
    });

  return pools;
}

/* ================= BRACKET ================= */

function buildQuarterFinals(pools: Record<string, MatchData[]>) {
  const tables = Object.values(pools).map((matches) =>
    buildPoolTable(matches)
  );

  const first = tables.map((t) => t[0]).filter(Boolean);
  const second = tables.map((t) => t[1]).filter(Boolean);
  const third = tables.map((t) => t[2]).filter(Boolean);

  const bestThird = third
    .sort((a, b) => b.points - a.points || b.pd - a.pd)
    .slice(0, 2);

  return [
    { home: first[0], away: bestThird[0] },
    { home: first[1], away: second[2] },
    { home: first[2], away: second[1] },
    { home: bestThird[1], away: second[0] },
  ];
}

/* ================= PAGE ================= */

export default function SVNSPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.conceptId === "svns-series"
  );

  const visual = getTournamentVisual("svns-series");

  const svnsMatches = useMemo(() => {
    return matches2026.filter(
      (m) => m.competitionId === "svns"
    );
  }, []);

  /* 🔥 STEP 9 — REAL QF MATCHS */
  const qfMatches = useMemo(() => {
    return svnsMatches.filter(
      (m) => m.round === "quarter-final"
    );
  }, [svnsMatches]);

  const womensQFMatches = qfMatches.filter(
    (m) => m.gender === "women"
  );

  const mensQFMatches = qfMatches.filter(
    (m) => m.gender === "men"
  );

  const matchesByDay = useMemo(() => {
    const grouped: Record<string, MatchData[]> = {};

    svnsMatches.forEach((match) => {
      const day = formatMatchDate(match.date);
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(match);
    });

    return grouped;
  }, [svnsMatches]);

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={`${styles.hero} ${styles.heroContained}`}
        style={{
          backgroundImage: `url(${
            visual.heroImageMen || visual.heroImageWomen
          })`,
        }}
      />

      {/* TITLE */}
      <div className={styles.titleBlock}>
        <h1>
          {tournament?.name} {tournament?.year}
        </h1>
        <p>{tournament?.heroSubtitle}</p>
      </div>

      {/* BACK */}
      <div className={styles.backNav}>
        <button onClick={() => navigate("/tournaments")}>
          ← Back to Tournaments
        </button>
      </div>

      {/* CONTENT */}
      {Object.entries(matchesByDay).map(([day, matches]) => {
        const womenPools = getPools(matches, "women");
        const menPools = getPools(matches, "men");

        const womenQF = buildQuarterFinals(womenPools).map(
          (m, i) => ({
            ...m,
            match: womensQFMatches[i],
          })
        );

        const menQF = buildQuarterFinals(menPools).map(
          (m, i) => ({
            ...m,
            match: mensQFMatches[i],
          })
        );

        return (
          <section key={day} className={styles.section}>
            <h2>{day}</h2>

            {/* WOMEN */}
            <div className={styles.block}>
              <h3>Women</h3>

              {Object.entries(womenPools).map(
                ([pool, poolMatches]) => {
                  const table = buildPoolTable(poolMatches);

                  return (
                    <div key={pool} className={styles.poolCard}>
                      <h4>Pool {pool}</h4>

                      <table className={styles.poolTable}>
                        <tbody>
                          {table.map((row, i) => (
                            <tr key={row.team}>
                              <td>{i + 1}</td>

                              <td className={styles.teamCell}>
                                <Flag country={row.country} size="small" />
                                <span>{row.team}</span>
                              </td>

                              <td>{row.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              )}

              {/* WOMEN QF */}
              <div className={styles.bracketTree}>
                <h4>Quarter-finals</h4>

                {womenQF.map((m, i) => (
                  <div
                    key={i}
                    className={styles.matchBox}
                    onClick={() =>
                      m.match &&
                      navigate(`/match/${m.match.id}`)
                    }
                  >
                    <div className={styles.teamLine}>
                      <Flag country={m.home?.country || "unknown"} size="small" />
                      <span>{m.home?.team || "TBD"}</span>
                    </div>

                    <div className={styles.vs}>vs</div>

                    <div className={styles.teamLine}>
                      <Flag country={m.away?.country || "unknown"} size="small" />
                      <span>{m.away?.team || "TBD"}</span>
                    </div>

                    <div className={styles.time}>
                      {m.match
                        ? new Date(m.match.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MEN */}
            <div className={styles.block}>
              <h3>Men</h3>

              {Object.entries(menPools).map(
                ([pool, poolMatches]) => {
                  const table = buildPoolTable(poolMatches);

                  return (
                    <div key={pool} className={styles.poolCard}>
                      <h4>Pool {pool}</h4>

                      <table className={styles.poolTable}>
                        <tbody>
                          {table.map((row, i) => (
                            <tr key={row.team}>
                              <td>{i + 1}</td>

                              <td className={styles.teamCell}>
                                <Flag country={row.country} size="small" />
                                <span>{row.team}</span>
                              </td>

                              <td>{row.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              )}

              {/* MEN QF */}
              <div className={styles.bracketTree}>
                <h4>Quarter-finals</h4>

                {menQF.map((m, i) => (
                  <div
                    key={i}
                    className={styles.matchBox}
                    onClick={() =>
                      m.match &&
                      navigate(`/match/${m.match.id}`)
                    }
                  >
                    <div className={styles.teamLine}>
                      <Flag country={m.home?.country || "unknown"} size="small" />
                      <span>{m.home?.team || "TBD"}</span>
                    </div>

                    <div className={styles.vs}>vs</div>

                    <div className={styles.teamLine}>
                      <Flag country={m.away?.country || "unknown"} size="small" />
                      <span>{m.away?.team || "TBD"}</span>
                    </div>

                    <div className={styles.time}>
                      {m.match
                        ? new Date(m.match.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}