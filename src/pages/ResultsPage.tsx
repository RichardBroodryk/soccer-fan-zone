import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import styles from "./ResultsPage.module.css";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/matches2026Men";

import MatchRow from "../components/match/MatchRow";

import heroBg from "../assets/images/raz/Results.png";

/* ================= UTIL ================= */

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function groupByTournament(matches: MatchData[]) {
  const map = new Map<string, MatchData[]>();

  matches
    .filter((m) => m.score)
    .forEach((match) => {
      if (!map.has(match.tournament)) {
        map.set(match.tournament, []);
      }

      map.get(match.tournament)!.push(match);
    });

  return Array.from(map.entries());
}

/* ================= PAGE ================= */

export default function ResultsPage() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH MATCHES ================= */

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const data = await getMatches();

        if (mounted) setMatches(data);
      } catch {
        if (mounted) setError("Failed to load results");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  /* ================= GROUP RESULTS ================= */

  const grouped = useMemo(() => {
    return groupByTournament(matches);
  }, [matches]);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>Loading results...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>{error}</div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}

      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Results</h1>

          <p>
            Completed international fixtures
            <br />
            confirmed by tournament and match date.
          </p>
        </div>
      </header>

      {/* ================= BACK ================= */}

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* ================= RESULTS ================= */}

      {grouped.length === 0 ? (
        <div className={styles.empty}>No results available.</div>
      ) : (
        grouped.map(([tournament, matches]) => (
          <section key={tournament} className={styles.section}>
            <h2 className={styles.sectionTitle}>{tournament}</h2>

            {matches.map((match) => (
              <MatchRow
                key={match.id}
                home={match.home}
                away={match.away}
                metaLeft={match.venue}
                metaRight={formatDate(match.date)}
                state="final"
                score={match.score}
              />
            ))}
          </section>
        ))
      )}
    </main>
  );
}