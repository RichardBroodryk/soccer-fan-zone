import { useNavigate } from "react-router-dom";
import Flag from "../components/images/Flag";

/* ✅ FIXED IMPORT */
import { matches2026 } from "../data/matches";

/* ✅ TYPE IMPORT (SAFE) */
import type { MatchData } from "../data/matches/matches2026Men";

import styles from "./GamesOverview.module.css";

export default function GamesOverview() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* PAGE TITLE — CONTENT, NOT NAV */}
      <section className={styles.context}>
        <h1 className={styles.title}>Games Overview</h1>
        <p className={styles.subtitle}>
          All confirmed international fixtures for the 2026 season
        </p>
      </section>

      <main className={styles.list}>
        {matches2026.map((match: MatchData) => (
          <article
            key={match.id}
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/match/${match.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/match/${match.id}`);
              }
            }}
          >
            <div className={styles.tournament}>
              {match.tournament}
            </div>

            <div className={styles.teams}>
              <div className={styles.team}>
                <Flag country={match.home.country} size="small" />
                <span>{match.home.name}</span>
              </div>

              <span className={styles.vs}>vs</span>

              <div className={styles.team}>
                <Flag country={match.away.country} size="small" />
                <span>{match.away.name}</span>
              </div>
            </div>

            <div className={styles.meta}>
              <span>📅 {match.date}</span>
              <span>🏟️ {match.venue}</span>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}