import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { svnsMatches2026 } from "../data/matches/matches2026Svns";
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSMatchesPage.module.css";
import { svnsFlags } from "../data/flags/svnsFlags";

/* ================= COUNTRY MAP ================= */

const countryToDisplayName: Record<string, string> = {
  "argentina": "Argentina",
  "australia": "Australia",
  "brazil": "Brazil",
  "canada": "Canada",
  "fiji": "Fiji",
  "france": "France",
  "germany": "Germany",
  "great-britain": "Great Britain",
  "japan": "Japan",
  "kenya": "Kenya",
  "new-zealand": "New Zealand",
  "south-africa": "South Africa",
  "spain": "Spain",
  "uruguay": "Uruguay",
  "united-states-of-america": "USA",
};

function getFlag(country: string) {
  const name = countryToDisplayName[country];
  return name ? svnsFlags[name] || "" : "";
}

function sortMatches(matches: MatchData[]) {
  return [...matches].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

function getLabel(round?: string) {
  switch (round) {
    case "final":
      return "🏆 FINAL";
    case "third-place":
      return "🥉 3rd Place";
    case "fifth-place":
      return "5th Place";
    case "seventh-place":
      return "7th Place";
    case "ninth-place":
      return "9th Place";
    case "eleventh-place":
      return "11th Place";
    case "semi-final":
      return "Semi Final";
    default:
      return "";
  }
}

/* ================= PAGE ================= */

export default function SVNSMatchesPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find((t) => t.conceptId === "svns");
  const visual = getTournamentVisual("svns");

  const matches = useMemo<MatchData[]>(() => svnsMatches2026, []);

  const finals = matches.filter(
    (m) => new Date(m.date).getDate() === 18
  );

  const womens = sortMatches(finals.filter((m) => m.gender === "women"));
  const mens = sortMatches(finals.filter((m) => m.gender === "men"));

  if (!tournament) return <div>SVNS not found</div>;

  return (
    <main>
      {/* HERO */}
      <header
        className={`${styles.hero} ${styles.heroSVNSLayout}`}
        style={{
          backgroundImage: `url(${visual.heroImageMen || visual.heroImageWomen})`,
        }}
      >
        <div className={styles.heroContent}>
          <div>
            <h1>{tournament.name} — Finals Day</h1>
            <p>Hong Kong • Full placement + finals results</p>
          </div>
        </div>
      </header>

      {/* BACK NAV */}
      <div className={styles.backNav}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/svns")}
        >
          ← Back to SVNS
        </button>
      </div>

      {/* SUBTITLE */}
      <div className={styles.subHeader}>
        Individual matches will render in the next part of this Amazing Tournament!
      </div>

      {/* WOMEN */}
      <section className={styles.section}>
        <h2>Women</h2>

        {womens.map((match) => (
          <div
            key={match.id}
            className={styles.matchRow}
            onClick={() => navigate(`/match/${match.id}`)}
          >
            <div className={styles.team}>
              {getFlag(match.home.country) ? (
                <img
                  src={getFlag(match.home.country)}
                  alt={match.home.name}
                  className={styles.flag}
                />
              ) : (
                <div className={styles.flagPlaceholder} />
              )}
              <span>{match.home.name}</span>
            </div>

            <div className={styles.center}>
              <div className={styles.label}>{getLabel(match.round)}</div>

              <div className={styles.score}>
                {match.score
                  ? `${match.score.home} - ${match.score.away}`
                  : "—"}
              </div>
            </div>

            <div className={styles.team}>
              <span>{match.away.name}</span>
              {getFlag(match.away.country) ? (
                <img
                  src={getFlag(match.away.country)}
                  alt={match.away.name}
                  className={styles.flag}
                />
              ) : (
                <div className={styles.flagPlaceholder} />
              )}
            </div>
          </div>
        ))}
      </section>

      {/* MEN */}
      <section className={styles.section}>
        <h2>Men</h2>

        {mens.map((match) => (
          <div
            key={match.id}
            className={styles.matchRow}
            onClick={() => navigate(`/match/${match.id}`)}
          >
            <div className={styles.team}>
              {getFlag(match.home.country) ? (
                <img
                  src={getFlag(match.home.country)}
                  alt={match.home.name}
                  className={styles.flag}
                />
              ) : (
                <div className={styles.flagPlaceholder} />
              )}
              <span>{match.home.name}</span>
            </div>

            <div className={styles.center}>
              <div className={styles.label}>{getLabel(match.round)}</div>

              <div className={styles.score}>
                {match.score
                  ? `${match.score.home} - ${match.score.away}`
                  : "—"}
              </div>
            </div>

            <div className={styles.team}>
              <span>{match.away.name}</span>
              {getFlag(match.away.country) ? (
                <img
                  src={getFlag(match.away.country)}
                  alt={match.away.name}
                  className={styles.flag}
                />
              ) : (
                <div className={styles.flagPlaceholder} />
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}