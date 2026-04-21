import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { matches2026 } from "../data/matches";
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSPoolsPage.module.css";
import { svnsFlags } from "../data/flags/svnsFlags";   // ← Added for flags

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

function getPools(
  matches: MatchData[],
  gender: "men" | "women"
): Record<string, MatchData[]> {
  const pools: Record<string, MatchData[]> = {};

  matches
    .filter((m) => m.gender === gender && m.round === "pool")
    .forEach((m) => {
      if (!m.pool) return;

      if (!pools[m.pool]) {
        pools[m.pool] = [];
      }

      pools[m.pool].push(m);
    });

  return pools;
}

/* ================= PAGE ================= */

export default function SVNSPoolsPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.conceptId === "svns"
  );

  const visual = getTournamentVisual("svns");

  const svnsMatches = useMemo(() => {
    return matches2026.filter((m) => m.competitionId === "svns");
  }, []);

  const poolMatches = svnsMatches.filter((m) => m.round === "pool");

  const womensPools = getPools(poolMatches, "women");
  const mensPools = getPools(poolMatches, "men");

  if (!tournament) {
    return <div>SVNS not found</div>;
  }

  return (
    <main>
      {/* HERO - UNCHANGED */}
      <header
        className={`${styles.hero} ${styles.heroSVNSLayout}`}
        style={{
          backgroundImage: `url(${
            visual.heroImageMen || visual.heroImageWomen
          })`,
        }}
      >
        <div className={styles.heroContent}>
          <div>
            <h1>{tournament.name} Pools</h1>
            <p>{tournament.heroSubtitle}</p>
          </div>
        </div>
      </header>

      {/* BACK - UNCHANGED */}
      <div className={styles.backNav}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/svns")}
        >
          ← Back to SVNS
        </button>
      </div>

      <div className={styles.poolsNotice}>
  Pools - Played / Won / Lost / Points For / Points Against / Points will render with the next Amazing leg
</div>

      {/* ================= WOMEN ================= */}
      <section className={styles.section}>
        <h2>Women</h2>

        <div className={styles.poolsGrid}>
          {["A", "B", "C"].map((poolKey) => {
            const matches = womensPools[poolKey];
            if (!matches) return null;

            const table = buildPoolTable(matches);

            return (
              <div key={poolKey} className={styles.poolCard}>
                <h3>Pool {poolKey}</h3>

                <div className={styles.tableHeader}>
                  <span>#</span>
                  <span>Team</span>
                  <span>P</span>
                  <span>PF</span>
                  <span>PA</span>
                  <span>PD</span>
                  <span>Pts</span>
                </div>

                {table.map((row, i) => {
                  const cleanName = row.team.replace(/ 7s/i, "");
                  return (
                    <div key={row.team} className={styles.tableRow}>
                      <span>{i + 1}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img 
                          src={svnsFlags[cleanName]} 
                          alt={cleanName} 
                          className={styles.flag} 
                        />
                        <span>{row.team}</span>
                      </div>
                      <span>{row.played}</span>
                      <span>{row.pf}</span>
                      <span>{row.pa}</span>
                      <span>{row.pd}</span>
                      <span>{row.points}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= MEN ================= */}
      <section className={styles.section}>
        <h2>Men</h2>

        <div className={styles.poolsGrid}>
          {["A", "B", "C"].map((poolKey) => {
            const matches = mensPools[poolKey];
            if (!matches) return null;

            const table = buildPoolTable(matches);

            return (
              <div key={poolKey} className={styles.poolCard}>
                <h3>Pool {poolKey}</h3>

                <div className={styles.tableHeader}>
                  <span>#</span>
                  <span>Team</span>
                  <span>P</span>
                  <span>PF</span>
                  <span>PA</span>
                  <span>PD</span>
                  <span>Pts</span>
                </div>

                {table.map((row, i) => {
                  const cleanName = row.team.replace(/ 7s/i, "");
                  return (
                    <div key={row.team} className={styles.tableRow}>
                      <span>{i + 1}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img 
                          src={svnsFlags[cleanName]} 
                          alt={cleanName} 
                          className={styles.flag} 
                        />
                        <span>{row.team}</span>
                      </div>
                      <span>{row.played}</span>
                      <span>{row.pf}</span>
                      <span>{row.pa}</span>
                      <span>{row.pd}</span>
                      <span>{row.points}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}