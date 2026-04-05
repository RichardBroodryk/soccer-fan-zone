import { FC } from "react";
import styles from "./MatchCard.module.css";

/* ✅ IMPORT TYPE FROM ONE SOURCE */
import type { MatchData } from "../../data/matches/matches2026Men";

interface MatchCardProps {
  match: MatchData;
  onSelect?: (matchId: number) => void;
}

const MatchCard: FC<MatchCardProps> = ({ match, onSelect }) => {
  return (
    <div
      className={styles.card}
      role="button"
      onClick={() => onSelect?.(match.id)}
    >
      <div className={styles.teams}>
        <span className={styles.team}>{match.home.name}</span>
        <span className={styles.vs}>vs</span>
        <span className={styles.team}>{match.away.name}</span>
      </div>

      <div className={styles.meta}>
        <span className={styles.date}>{match.date}</span>
        {match.venue && (
          <span className={styles.venue}>{match.venue}</span>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
export {};