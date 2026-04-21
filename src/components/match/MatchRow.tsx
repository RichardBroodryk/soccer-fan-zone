import styles from "./MatchRow.module.css";
import { flagMap } from "../../data/flagMap";

type TeamRef = {
  name: string;
  country: string;
};

type MatchState = "live" | "starting" | "today" | "upcoming" | "final";

type Props = {
  home: TeamRef;
  away: TeamRef;
  state: MatchState;
  score?: { home: number; away: number };
  metaLeft?: string;
  metaRight?: string;   // this is now the stadium slug
  onClick?: () => void;
};

export default function MatchRow({
  home,
  away,
  state,
  score,
  metaLeft,
  metaRight,
  onClick,
}: Props) {
  const homeFlag = flagMap[home.country];
  const awayFlag = flagMap[away.country];

  // Show score whenever it exists (more reliable than state alone)
  const showScore = score && (score.home !== undefined && score.away !== undefined);

  return (
    <div
      className={`${styles.row} ${onClick ? styles.clickable : ""}`}
      onClick={onClick}
    >
      <div className={styles.teamsGrid}>
        <div className={styles.teamLeft}>
          {homeFlag && <img src={homeFlag} alt="" className={styles.flag} />}
          <span className={styles.teamName}>{home.name}</span>
        </div>

        <div className={styles.center}>
          {showScore ? (
            <div className={styles.score}>
              {score!.home} - {score!.away}
            </div>
          ) : (
            <span className={styles.vs}>vs</span>
          )}
        </div>

        <div className={styles.teamRight}>
          <span className={styles.teamName}>{away.name}</span>
          {awayFlag && <img src={awayFlag} alt="" className={styles.flag} />}
        </div>
      </div>

      {(metaLeft || metaRight) && (
        <div className={styles.meta}>
          <span>{metaLeft}</span>
          {metaRight && (
            <a href={`/stadium/${metaRight}`} className={styles.tag}>
              🏟 Stadium
            </a>
          )}
        </div>
      )}
    </div>
  );
}