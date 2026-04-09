import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import Flag from "../components/images/Flag";
import MatchRow from "../components/match/MatchRow";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import { matches2026 } from "../data/matches";

import type { MatchData } from "../data/matches/matches2026Men";

import styles from "./TournamentPage.module.css";

/* ==================================================
   STATE (FALLBACK ONLY — ADAPTER FIRST)
   ================================================== */

function resolveState(match: MatchData): "final" | "upcoming" {
  if ((match as any).state) return (match as any).state;

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

  const heroImage =
    tournament.gender === "women"
      ? visual.heroImageWomen
      : visual.heroImageMen;

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
      <header
        className={`${styles.hero} ${
          visual.heroLayout === "contained"
            ? styles.heroContained
            : ""
        }`}
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className={styles.heroContent}>
          <h1>
            {tournament.name} {tournament.year}
          </h1>

          {tournament.heroSubtitle && (
            <p>{tournament.heroSubtitle}</p>
          )}

          <div className={styles.statusBadge}>
            {tournament.status?.toUpperCase()}
          </div>
        </div>
      </header>

      <div className={styles.backNav}>
        <button onClick={() => navigate("/tournaments")}>
          ← Back to Tournaments
        </button>
      </div>

      {/* ================= RANKINGS STRIP ================= */}
      <div
        className={styles.rankingsStrip}
        onClick={() =>
          navigate(
            tournament.gender === "women"
              ? "/rankings/women"
              : "/rankings/men"
          )
        }
      >
        <div className={styles.rankingsText}>
          <span className={styles.rankingsTitle}>
            International Standings
          </span>
          <span className={styles.rankingsMain}>
            {tournament.gender === "women"
              ? "World Rankings — Women"
              : "World Rankings — Men"}
          </span>
        </div>
        <span className={styles.rankingsArrow}>→</span>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Anthems</h2>
          <p>Flags link to national anthems</p>
        </div>

        <div className={styles.anthemsRow}>
          <div className={styles.flagsGrid}>
            {teams.map((team) => (
              <div
                key={team.name}
                onClick={() => {
                  if (team.country !== "unknown") {
                    navigate(`/anthems/${team.country}`);
                  }
                }}
                style={{
                  cursor:
                    team.country !== "unknown"
                      ? "pointer"
                      : "default",
                }}
              >
                <Flag
                  country={team.country}
                  size="medium"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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
    </main>
  );
}