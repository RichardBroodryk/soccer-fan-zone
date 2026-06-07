// src/components/bracket/BracketMatchCard.tsx

import { useNavigate } from "react-router-dom";

import styles from "./BracketMatchCard.module.css";

import type { SoccerMatch } from "../../data/soccer/types";

interface Props {
  match: SoccerMatch;
}

export default function BracketMatchCard({
  match,
}: Props) {
  const navigate = useNavigate();

  const homeWon =
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.homeScore > match.awayScore;

  const awayWon =
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.awayScore > match.homeScore;

  return (
    <article
      className={styles.card}
      onClick={() =>
        navigate(
          `/soccer/matches/${match.id}`
        )
      }
    >
      {/* HEADER */}

      <div className={styles.top}>
        <div className={styles.stageWrap}>
          <span className={styles.stage}>
            {match.stage}
          </span>

          {match.matchday && (
            <span
              className={
                styles.matchday
              }
            >
              Matchday{" "}
              {match.matchday}
            </span>
          )}
        </div>

        <div className={styles.statusWrap}>
          {match.status ===
          "live" ? (
            <span
              className={
                styles.liveBadge
              }
            >
              ● LIVE{" "}
              {match.minute ?? 0}'
            </span>
          ) : match.status ===
            "final" ? (
            <span
              className={
                styles.finalBadge
              }
            >
              FINAL
            </span>
          ) : (
            <span
              className={
                styles.upcomingBadge
              }
            >
              UPCOMING
            </span>
          )}
        </div>
      </div>

      {/* DATE */}

      <div className={styles.date}>
        📅 {match.date}
      </div>

      {/* TEAMS */}

      <div className={styles.teams}>
        {/* HOME */}

        <div
          className={`${styles.teamRow} ${
            homeWon
              ? styles.winner
              : ""
          }`}
        >
          <div
            className={
              styles.teamLeft
            }
          >
            <span
              className={
                styles.team
              }
            >
              {match.home}
            </span>

            {homeWon && (
              <span
                className={
                  styles.qualifier
                }
              >
                ADVANCES
              </span>
            )}
          </div>

          <span
            className={
              styles.score
            }
          >
            {match.homeScore ??
              "-"}
          </span>
        </div>

        {/* AWAY */}

        <div
          className={`${styles.teamRow} ${
            awayWon
              ? styles.winner
              : ""
          }`}
        >
          <div
            className={
              styles.teamLeft
            }
          >
            <span
              className={
                styles.team
              }
            >
              {match.away}
            </span>

            {awayWon && (
              <span
                className={
                  styles.qualifier
                }
              >
                ADVANCES
              </span>
            )}
          </div>

          <span
            className={
              styles.score
            }
          >
            {match.awayScore ??
              "-"}
          </span>
        </div>
      </div>

      {/* FOOTER */}

      <div className={styles.footer}>
        <div
          className={
            styles.footerItem
          }
        >
          🏟 {match.stadium}
        </div>

        <div
          className={
            styles.footerItem
          }
        >
          📍 {match.city}
        </div>
      </div>
    </article>
  );
}