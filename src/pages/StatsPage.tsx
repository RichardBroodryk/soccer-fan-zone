import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StatsPage.module.css";

import TeamComparisonTable from "../components/stats/TeamComparisonTable";
import KeyPlayerStats from "../components/stats/KeyPlayerStats";
import Flag from "../components/images/Flag";

import heroBg from "../assets/images/raz/Stats3.png";

import { getMatches } from "../data/matchesAdapter";

/* ================= TYPES ================= */

type MatchData = {
  tournament: string;
  date: string;
  venue: string;
  home: { name: string; country: string };
  away: { name: string; country: string };
  score?: { home: number; away: number };
};

type TeamStats = {
  team: string;
  country: string;
  played: number;
  won: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  difference: number;
};

/* ================= PAGE ================= */

export default function StatsPage() {
  const navigate = useNavigate();

  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const matches: MatchData[] = await getMatches();

        const map = new Map<string, TeamStats>();

        matches.forEach((match) => {
          if (!match.score) return;

          const { home, away, score } = match;

          const ensure = (name: string, country: string) => {
            if (!map.has(name)) {
              map.set(name, {
                team: name,
                country,
                played: 0,
                won: 0,
                lost: 0,
                pointsFor: 0,
                pointsAgainst: 0,
                difference: 0,
              });
            }
            return map.get(name)!;
          };

          const homeTeam = ensure(home.name, home.country);
          const awayTeam = ensure(away.name, away.country);

          homeTeam.played += 1;
          awayTeam.played += 1;

          homeTeam.pointsFor += score.home;
          homeTeam.pointsAgainst += score.away;

          awayTeam.pointsFor += score.away;
          awayTeam.pointsAgainst += score.home;

          if (score.home > score.away) {
            homeTeam.won += 1;
            awayTeam.lost += 1;
          } else if (score.away > score.home) {
            awayTeam.won += 1;
            homeTeam.lost += 1;
          }
        });

        map.forEach((t) => {
          t.difference = t.pointsFor - t.pointsAgainst;
        });

        const sorted = Array.from(map.values()).sort(
          (a, b) => b.difference - a.difference
        );

        setTeamStats(sorted);
      } catch (err) {
        console.error("Stats loading failed:", err);
      }

      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return <div className={styles.page}>Loading stats...</div>;
  }

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Stats</h1>
          <p>
            International comparison, match dominance,
            <br />
            and key individual contributions.
          </p>
        </div>
      </header>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* STANDINGS */}
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
          International Standings
        </h2>

        <div className={styles.tableWrap}>
          <table className={styles.statsTable}>
            <thead>
              <tr>
                <th className={styles.left}>Team</th>
                <th>P</th>
                <th>W</th>
                <th>L</th>
                <th>PF</th>
                <th>PA</th>
                <th>+/-</th>
              </tr>
            </thead>

            <tbody>
              {teamStats.map((t) => (
                <tr key={t.team}>
                  <td className={`${styles.teamCell} ${styles.left}`}>
                    <Flag country={t.country} size="small" />
                    {t.team}
                  </td>
                  <td>{t.played}</td>
                  <td>{t.won}</td>
                  <td>{t.lost}</td>
                  <td>{t.pointsFor}</td>
                  <td>{t.pointsAgainst}</td>
                  <td>{t.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MATCH COMPARISON */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Match Comparison</h2>

        <TeamComparisonTable
          home={{ name: "France", country: "france" }}
          away={{ name: "Ireland", country: "ireland" }}
          stats={[
            { label: "Tries", home: 4, away: 2 },
            { label: "Conversions", home: 3, away: 2 },
            { label: "Penalties", home: 2, away: 1 },
          ]}
        />
      </section>

      {/* KEY PLAYER STATS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Key Player Stats</h2>

        <KeyPlayerStats
          categories={[
            {
              title: "Top Tries",
              items: [
                { name: "Player A", team: "France", value: 2 },
                { name: "Player B", team: "Ireland", value: 1 },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}