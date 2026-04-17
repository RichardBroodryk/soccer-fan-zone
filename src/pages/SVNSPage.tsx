import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSPage.module.css";
import { svnsFlags } from "../data/flags/svnsFlags";

import { fetchSvnsMatches } from "../services/svnsService";

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

function buildPoolTable(matches: MatchData[]): PoolRow[] {
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

    if (!home || !away) return;

    home.played++;
    away.played++;

    home.pf += match.score.home;
    home.pa += match.score.away;

    away.pf += match.score.away;
    away.pa += match.score.home;

    if (match.score.home > match.score.away) home.points += 3;
    else if (match.score.away > match.score.home) away.points += 3;
  });

  return Object.values(table)
    .map((t) => ({ ...t, pd: t.pf - t.pa }))
    .sort((a, b) => b.points - a.points || b.pd - a.pd);
}

function getPools(
  matches: MatchData[],
  gender: "men" | "women"
): Record<string, MatchData[]> {
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

/* ================= PAGE ================= */

export default function SVNSPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.conceptId === "svns"
  );

  const visual = getTournamentVisual("svns");

  const [svnsMatches, setSvnsMatches] = useState<MatchData[]>([]);

  useEffect(() => {
    fetchSvnsMatches().then((data) => {
      console.log("SVNS PAGE DATA:", data);
      setSvnsMatches(data);
    });
  }, []);

  /* ================= GUARDS ================= */

  if (!tournament) {
    return <div>SVNS tournament not found</div>;
  }

  if (!svnsMatches.length) {
    return (
      <main className={styles.page}>
        <header
          className={`${styles.hero} ${styles.heroSVNSLayout}`}
          style={{
            backgroundImage: `url(${
              visual.heroImageMen || visual.heroImageWomen
            })`,
          }}
        >
          <div className={styles.heroContent}>
            <h1>{tournament.name} {tournament.year}</h1>
            <p>Live data is currently unavailable.</p>
          </div>
        </header>

        <div className={styles.error}>
          No SVNS championship matches available yet.
        </div>
      </main>
    );
  }

  const poolMatches = svnsMatches.filter((m) => m.round === "pool");

  const womensPools = getPools(poolMatches, "women");
  const mensPools = getPools(poolMatches, "men");

  const hasPools =
    Object.keys(womensPools).length > 0 ||
    Object.keys(mensPools).length > 0;

  if (!hasPools) {
    return (
      <main className={styles.page}>
        <header className={styles.hero}>
          <h1>SVNS World Championship</h1>
          <p>Data is loading or incomplete.</p>
        </header>

        <div className={styles.error}>
          Pool data not ready yet.
        </div>
      </main>
    );
  }

  /* ================= RENDER ================= */

  return (
    <main>
      {/* HERO */}
      <header
        className={`${styles.hero} ${styles.heroSVNSLayout}`}
        style={{
          backgroundImage: `url(${
            visual.heroImageMen || visual.heroImageWomen
          })`,
        }}
      >
        <div className={styles.heroContent}>
          <h1>{tournament.name} {tournament.year}</h1>
          <p>{tournament.heroSubtitle}</p>
        </div>
      </header>

      {/* NAV */}
      <div className={styles.navButtons}>
        <button
          className={styles.primaryButton}
          onClick={() => navigate("/svns/matches")}
        >
          Matches
        </button>

        <button
          className={styles.secondaryButton}
          onClick={() => navigate("/svns/pools")}
        >
          Pools
        </button>
      </div>

      {/* BACK */}
      <div className={styles.backNav}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/tournaments")}
        >
          ← All Tournaments
        </button>
      </div>

      {/* POOLS */}
      <section className={styles.section}>
        <h2>Pools</h2>

        {["women", "men"].map((gender) => {
          const pools = gender === "women" ? womensPools : mensPools;

          return (
            <div key={gender}>
              <h3>{gender.toUpperCase()}</h3>

              <div className={styles.poolsGrid}>
                {["A", "B", "C"].map((poolKey) => {
                  const matches = pools[poolKey];
                  if (!matches) return null;

                  const table = buildPoolTable(matches);

                  return (
                    <div key={poolKey} className={styles.poolCard}>
                      <h4>Pool {poolKey}</h4>

                      {table.map((row, i) => (
                        <div key={row.team} className={styles.poolRow}>
                          <span>{i + 1}</span>

                          <div className={styles.team}>
                            <img
                              src={svnsFlags[row.team]}
                              alt={row.team}
                              className={styles.flag}
                            />
                            <span>{row.team}</span>
                          </div>

                          <span>{row.points}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}