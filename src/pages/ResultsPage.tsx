import { useNavigate } from "react-router-dom";
import styles from "./ResultsPage.module.css";

import { matches2026 } from "../data/matches2026";
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

function groupByTournament() {
  const map = new Map<string, typeof matches2026>();

  matches2026
    .filter((m) => m.score) // 🔒 RESULTS ONLY
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
  const grouped = groupByTournament();

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

      {/* ================= BACK (CANONICAL) ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* ================= RESULTS ================= */}
      {grouped.map(([tournament, matches]) => (
        <section key={tournament} className={styles.section}>
          <h2 className={styles.sectionTitle}>{tournament}</h2>

          {matches.map((match) => (
            <MatchRow
              key={match.id}
              home={match.home}
              away={match.away}
              metaLeft={match.venue}
              metaRight={formatDate(match.date)} // 🔒 ABSOLUTE ONLY
              state="final"
              score={match.score}
            />
          ))}
        </section>
      ))}
    </main>
  );
}
