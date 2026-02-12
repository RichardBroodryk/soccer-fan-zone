import { useNavigate } from "react-router-dom";
import styles from "./StatsPage.module.css";

import { matches2026 } from "../data/matches2026";
import TeamComparisonTable from "../components/stats/TeamComparisonTable";
import KeyPlayerStats from "../components/stats/KeyPlayerStats";
import Flag from "../components/images/Flag";

import heroBg from "../assets/images/raz/Stats3.png";

/* ================= TYPES ================= */

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

/* ================= UTIL ================= */

function buildTeamStats(): TeamStats[] {
  const map = new Map<string, TeamStats>();

  matches2026.forEach((match) => {
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
    } else {
      awayTeam.won += 1;
      homeTeam.lost += 1;
    }
  });

  map.forEach((t) => {
    t.difference = t.pointsFor - t.pointsAgainst;
  });

  return Array.from(map.values()).sort(
    (a, b) => b.difference - a.difference
  );
}

/* ================= PAGE ================= */

export default function StatsPage() {
  const navigate = useNavigate();

  const teamStats = buildTeamStats();

  const match = matches2026.find((m) => m.score);
  if (!match || !match.score) {
    return <div className={styles.page}>No stats available.</div>;
  }

  const { home, away, score } = match;

  const teamComparisonStats = [
    { label: "Tries", home: 4, away: 2 },
    { label: "Conversions", home: 3, away: 2 },
    { label: "Penalties", home: 2, away: 1 },
    { label: "Meters Made", home: 542, away: 398 },
    { label: "Tackles Made", home: 112, away: 138 },
    { label: "Turnovers Won", home: 9, away: 6 },
    { label: "Yellow Cards", home: 1, away: 2 },
    { label: "Red Cards", home: 0, away: 1 },
  ];

  const keyPlayerCategories = [
    {
      title: "Top Tries",
      items: [
        { name: "Kolbe", team: home.name, value: 2 },
        { name: "Arendse", team: home.name, value: 1 },
      ],
    },
    {
      title: "Top Meters Made",
      items: [
        { name: "Kolbe", team: home.name, value: "128m" },
        { name: "Ringrose", team: away.name, value: "104m" },
      ],
    },
    {
      title: "Top Tackles",
      items: [
        { name: "Itoje", team: away.name, value: 18 },
        { name: "Curry", team: away.name, value: 16 },
      ],
    },
  ];

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

      {/* ================= BACK (CANONICAL) ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* INTERNATIONAL STANDINGS */}
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

      {/* MATCH SNAPSHOT */}
      <section className={styles.snapshot}>
        <div className={styles.teams}>
          <span className={styles.team}>
            <Flag country={home.country} size="small" />
            {home.name}
          </span>

          <span className={styles.score}>
            {score.home} – {score.away}
          </span>

          <span className={styles.team}>
            {away.name}
            <Flag country={away.country} size="small" />
          </span>
        </div>
        <div className={styles.meta}>
          {match.tournament} · {match.venue}
        </div>
      </section>

      {/* MATCH COMPARISON */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Match Comparison</h2>

        <TeamComparisonTable
          home={home}
          away={away}
          stats={teamComparisonStats}
        />
      </section>

      {/* KEY PLAYER STATS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Key Player Stats</h2>

        <KeyPlayerStats categories={keyPlayerCategories} />
      </section>
    </main>
  );
}
