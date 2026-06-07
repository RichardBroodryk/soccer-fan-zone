// src/components/soccer/SoccerMatchCard.tsx

import styles from "./SoccerMatchCard.module.css";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

type Props = {
  match: SoccerMatch;

  onClick?: () => void;
};

export default function SoccerMatchCard({
  match,
  onClick,
}: Props) {
  return (
    <div
      className={styles.card}
      onClick={onClick}
    >
      <div className={styles.top}>
        <div>
          {match.home}
        </div>

        <div className={styles.vs}>
          vs
        </div>

        <div>
          {match.away}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>{match.date}</span>

        <span>
          {match.stadium}
        </span>
      </div>
    </div>
  );
}