import { useNavigate } from "react-router-dom";
import styles from "./SuperMatchCenterPage.module.css";

import MatchCenterNav from "../components/match/MatchCenterNav";

/* ✅ FIXED IMPORT */
import { matches2026 } from "../data/matches";

/* ✅ TYPE */
import type { MatchData } from "../data/matches/matches2026Men";

import Flag from "../components/images/Flag";

export default function SuperMatchCenterPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* MATCH CENTER NAV */}
      <MatchCenterNav />

      {/* HEADER */}
      <header className={styles.header}>
        <h1>Match Center</h1>
        <p className={styles.subtitle}>
          Live matches, fixtures, results and statistics from across world rugby.
        </p>
      </header>

      {/* OVERVIEW */}
      <section className={styles.overview}>
        <div className={styles.overviewCard}>
          <span className={styles.overviewNumber}>{matches2026.length}</span>
          <span className={styles.overviewLabel}>Matches</span>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewNumber}>—</span>
          <span className={styles.overviewLabel}>Live</span>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewNumber}>—</span>
          <span className={styles.overviewLabel}>Today</span>
        </div>
      </section>

      {/* LIVE MATCHES */}
      <section className={styles.liveSection}>
        <h2 className={styles.sectionTitle}>Live Matches</h2>

        {matches2026.length === 0 ? (
          <div className={styles.emptyState}>
            No matches available.
          </div>
        ) : (
          <div className={styles.liveGrid}>
            {matches2026.map((match: MatchData) => (
              <div
                key={match.id}
                className={styles.matchCard}
                onClick={() => navigate(`/match/${match.id}`)}
              >
                <div className={styles.teams}>
                  <div className={styles.team}>
                    <Flag country={match.home.country} size="small" />
                    <span>{match.home.name}</span>
                  </div>

                  <span className={styles.vs}>vs</span>

                  <div className={styles.team}>
                    <span>{match.away.name}</span>
                    <Flag country={match.away.country} size="small" />
                  </div>
                </div>

                <div className={styles.meta}>
                  <span>{match.tournament}</span>
                  <span>{match.venue}</span>
                </div>

                <div className={styles.liveBadge}>LIVE</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}