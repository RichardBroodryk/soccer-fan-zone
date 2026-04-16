import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import Flag from "../components/images/Flag";
import MatchRow from "../components/match/MatchRow";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";
import { matches2026 } from "../data/matches";

import type { MatchData } from "../data/matches/types";

import styles from "./TournamentPage.module.css";

/* ================= HELPERS ================= */

function normalize(str: string) {
  return str.toLowerCase().replace(/\s+/g, "");
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
      .filter((m: MatchData) => {
        const instanceId =
          (m as { tournamentInstanceId?: string }).tournamentInstanceId;

        if (instanceId) {
          return instanceId === tournament.instanceId;
        }

        if (!m.tournament) return false;

        const matchKey = normalize(m.tournament);
        const tournamentKey = normalize(
          tournament.matchKey ||
            `${tournament.name} ${tournament.year}`
        );

        return matchKey === tournamentKey;
      })
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

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* HERO */}
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

      {/* BACK */}
      <div className={styles.backNav}>
        <button onClick={() => navigate("/tournaments")}>
          ← Back to Tournaments
        </button>
      </div>

      {/* ANTHEMS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Anthems</h2>
          <p>Flags link to national anthems</p>
        </div>

        <div className={styles.flagsGrid}>
          {teams.map((team) => (
            <div
              key={team.name}
              onClick={() =>
                navigate(`/anthems/${team.country}`)
              }
              style={{ cursor: "pointer" }}
            >
              <Flag country={team.country} size="medium" />
            </div>
          ))}
        </div>
      </section>

      {/* MATCHES */}
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
              state={
                tournament.status === "completed"
                  ? "final"
                  : match.state ||
                    (match.score ? "final" : "upcoming")
              }
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