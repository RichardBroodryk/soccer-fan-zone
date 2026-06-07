import styles from "./SoccerMatchRow.module.css";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import SoccerFlag from "./SoccerFlag";

type Props = {
  match: SoccerMatch;

  onClick?: () => void;
};

export default function SoccerMatchRow({
  match,
  onClick,
}: Props) {
  const hasScore =
    match.homeScore !== undefined &&
    match.awayScore !== undefined;

  return (
    <button
      className={styles.row}
      onClick={onClick}
      style={{
        border: "none",
        width: "100%",
        cursor: "pointer",
      }}
    >
      {/* TEAMS */}

      <div className={styles.teams}>
        {/* HOME */}

        <div
          className={styles.team}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <SoccerFlag
            nation={match.home}
            size={42}
          />

          <span>
            {match.home}
          </span>
        </div>

        {/* SCORE */}

        <div className={styles.center}>
          {hasScore ? (
            <div
              className={
                styles.score
              }
            >
              {match.homeScore} -{" "}
              {match.awayScore}
            </div>
          ) : (
            <div className={styles.vs}>
              vs
            </div>
          )}
        </div>

        {/* AWAY */}

        <div
          className={styles.team}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "flex-end",
            gap: "12px",
          }}
        >
          <span>
            {match.away}
          </span>

          <SoccerFlag
            nation={match.away}
            size={42}
          />
        </div>
      </div>

      {/* META */}

      <div className={styles.meta}>
        <span>{match.date}</span>

        <span>
          {match.stadium}
        </span>

        <span>
          {match.city}
        </span>

        <span>
          {match.stage}
        </span>
      </div>
    </button>
  );
}