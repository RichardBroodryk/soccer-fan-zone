import styles from "./MatchRow.module.css";
import Flag from "../images/Flag";

type MatchRowProps = {
  home: { name: string; country: string };
  away: { name: string; country: string };
  metaLeft: string;
  metaRight: string;
  state: "live" | "upcoming" | "final" | "stats";
  score?: { home: number; away: number };
  onClick?: () => void;
};

export default function MatchRow({
  home,
  away,
  metaLeft,
  metaRight,
  state,
  score,
  onClick,
}: MatchRowProps) {
  return (
    <div
      className={`${styles.row} ${styles[state]}`}
      onClick={onClick}
    >
      <div className={styles.teamsGrid}>
        <div className={styles.teamLeft}>
          <Flag country={home.country} size="small" />
          <span className={styles.teamName}>{home.name}</span>
        </div>

        <div className={styles.center}>
          {state === "live" ? (
            <div className={styles.livePulse}>
              <span className={styles.pulseDot} />
              <span className={styles.liveText}>LIVE</span>
            </div>
          ) : state === "final" && score ? (
            <span className={styles.score}>
              {score.home} – {score.away}
            </span>
          ) : state === "final" ? (
            <span className={styles.score}>—</span>
          ) : (
            <span className={styles.vs}>vs</span>
          )}
        </div>

        <div className={styles.teamRight}>
          <span className={styles.teamName}>{away.name}</span>
          <Flag country={away.country} size="small" />
        </div>
      </div>

      <div className={styles.meta}>
        <span>{metaLeft}</span>
        <span className={styles.tag}>{metaRight}</span>
      </div>
    </div>
  );
}
