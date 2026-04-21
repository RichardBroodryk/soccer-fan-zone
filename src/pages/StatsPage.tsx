import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StatsPage.module.css";

import TeamComparisonTable from "../components/stats/TeamComparisonTable";
import Flag from "../components/images/Flag";

import heroBg from "../assets/images/raz/Stats3.png";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/types";

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

/* ================= HELPERS ================= */

function buildStats(matches: MatchData[]): TeamStats[] {
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

  return Array.from(map.values()).sort(
    (a, b) => b.difference - a.difference
  );
}

/* ================= PAGE ================= */

export default function StatsPage() {
  const navigate = useNavigate();

  const [mensStats, setMensStats] = useState<TeamStats[]>([]);
  const [womensStats, setWomensStats] = useState<TeamStats[]>([]);
  const [comparisonMatch, setComparisonMatch] =
    useState<MatchData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const matches: MatchData[] = await getMatches();

        /* ================= SPLIT ================= */

        const mensMatches = matches.filter(
          (m) =>
            m.competitionId === "six-nations" &&
            m.score
        );

        const womensMatches = matches.filter(
          (m) =>
            m.competitionId === "six-nations-women" &&
            m.score
        );

        /* ================= BUILD ================= */

        setMensStats(buildStats(mensMatches));
        setWomensStats(buildStats(womensMatches));

        /* ================= MATCH COMPARISON ================= */

        const lastMatch = matches
          .filter((m) => m.score)
          .sort(
            (a, b) =>
              new Date(b.date).getTime() -
              new Date(a.date).getTime()
          )[0];

        setComparisonMatch(lastMatch || null);
      } catch (err) {
        setError("Failed to load stats");
      }

      setLoading(false);
    }

    loadStats();
  }, []);

  const renderTable = (data: TeamStats[]) => (
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
          {data.map((t) => (
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
  );

  return (
    <main className={styles.page}>
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Stats</h1>
          <p>
            Tournament standings, match insights,
            <br />
            and performance comparisons.
          </p>
        </div>
      </header>

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* ================= MEN ================= */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Six Nations (Men)
        </h2>

        {loading ? (
          <div className={styles.empty}>Loading...</div>
        ) : error ? (
          <div className={styles.empty}>{error}</div>
        ) : (
          renderTable(mensStats)
        )}
      </section>

      {/* ================= WOMEN ================= */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Six Nations (Women)
        </h2>

        {loading ? (
          <div className={styles.empty}>Loading...</div>
        ) : error ? (
          <div className={styles.empty}>{error}</div>
        ) : (
          renderTable(womensStats)
        )}
      </section>

      {/* ================= MATCH COMPARISON ================= */}

      {comparisonMatch && comparisonMatch.score && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Latest Match Comparison
          </h2>

          <TeamComparisonTable
            home={comparisonMatch.home}
            away={comparisonMatch.away}
            stats={[
              {
                label: "Points",
                home: comparisonMatch.score.home,
                away: comparisonMatch.score.away,
              },
            ]}
          />
        </section>
      )}
    </main>
  );
}