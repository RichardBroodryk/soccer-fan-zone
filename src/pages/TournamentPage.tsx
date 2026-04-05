import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import Flag from "../components/images/Flag";
import MatchRow from "../components/match/MatchRow";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

/* ✅ DATA SOURCE */
import { matches2026 } from "../data/matches";

/* ✅ TYPE */
import type { MatchData } from "../data/matches/matches2026Men";

import styles from "./TournamentPage.module.css";

/* ==================================================
   STATE RESOLVER (GLOBAL RULE — NO FAKE LIVE)
   ================================================== */

function resolveState(match: MatchData): "final" | "upcoming" {
  if (match.score) return "final";

  return new Date(match.date) > new Date()
    ? "upcoming"
    : "final";
}

export default function TournamentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.route === location.pathname
  );

  /* ==================================================
     🔥 LOCKED MATCH RESOLUTION (INSTANCE ONLY)
     ================================================== */

  const matches = useMemo((): MatchData[] => {
    if (!tournament) return [];

    return matches2026
      .filter(
        (m: MatchData) =>
          (m as { tournamentInstanceId?: string })
            .tournamentInstanceId === tournament.instanceId
      )
      .sort(
        (a: MatchData, b: MatchData) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );
  }, [tournament]);

  if (!tournament) {
    return <div className={styles.error}>Tournament not found</div>;
  }

  const visual = getTournamentVisual(tournament.conceptId);

  /* ================= TEAMS ================= */

  const teams = Array.from(
    new Map(
      matches.flatMap((m: MatchData) => [
        [m.home.name, m.home],
        [m.away.name, m.away],
      ])
    ).values()
  );

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={`${styles.hero} ${
          visual.heroLayout === "contained"
            ? styles.heroContained
            : ""
        }`}
        style={{
          backgroundImage: `url(${
            tournament.gender === "women"
              ? visual.heroImageWomen
              : visual.heroImageMen
          })`,
        }}
      >
        <div className={styles.heroContent}>
          <h1>
            {tournament.name} {tournament.year}
          </h1>
          <p>{tournament.heroSubtitle}</p>

          <div className={styles.statusBadge}>
            {tournament.status?.toUpperCase()}
          </div>
        </div>
      </header>

      {/* ================= BACK NAV ================= */}
      <div className={styles.backNav}>
        <button onClick={() => navigate("/tournaments")}>
          ← Back to Tournaments
        </button>
      </div>

      {/* ================= ANTHEMS ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Anthems</h2>
          <p>Flags link to national anthems</p>
        </div>

        <div className={styles.anthemsRow}>
          <div className={styles.flagsGrid}>
            {teams.map((team) => (
              <Flag
                key={team.name}
                country={team.country}
                size="medium"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MATCHES ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Matches</h2>
          <p>All fixtures and results</p>
        </div>

        {matches.length === 0 ? (
          <div className={styles.emptyState}>
            No matches available
          </div>
        ) : (
          matches.map((match: MatchData) => (
            <MatchRow
              key={match.id}
              home={match.home}
              away={match.away}
              state={resolveState(match)}
              score={match.score}
              metaLeft={match.date}
              metaRight={match.venue}
              onClick={() =>
                navigate(`/match/${match.id}`)
              }
            />
          ))
        )}
      </section>

      {/* ================= BOTTOM ADS ================= */}
      {/* KEEP YOUR ADS COMPONENT HERE */}
    </main>
  );
}