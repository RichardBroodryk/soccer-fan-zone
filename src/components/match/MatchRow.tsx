import styles from "./MatchRow.module.css";
import { flagMap } from "../../data/flagMap";

type TeamRef = {
  name: string;
  country: string;
};

type MatchState =
  | "live"
  | "starting"
  | "today"
  | "upcoming"
  | "final";

type Props = {
  home: TeamRef;
  away: TeamRef;
  state: MatchState;
  score?: {
    home: number;
    away: number;
  };
  metaLeft?: string;
  metaRight?: string;
  onClick?: () => void;
};

function getRowClass(state: MatchState) {
  if (state === "live") return styles.live;
  if (state === "final") return styles.final;
  return styles.upcoming;
}

export default function MatchRow({
  home,
  away,
  state,
  score,
  metaLeft,
  metaRight,
  onClick,
}: Props) {
  const isLive = state === "live";
  const isFinal = state === "final";

  const homeFlag = flagMap[home.country];
  const awayFlag = flagMap[away.country];

  return (
    <div
      className={`${styles.row} ${getRowClass(state)} ${
        onClick ? styles.clickable : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.teamsGrid}>
        <div className={styles.teamLeft}>
          {homeFlag && (
            <img src={homeFlag} alt={home.name} className={styles.flag} />
          )}
          <span className={styles.teamName}>{home.name}</span>
        </div>

        <div className={styles.center}>
          {isLive ? (
            <div className={styles.livePulse}>LIVE</div>
          ) : isFinal && score ? (
            <div className={styles.score}>
              {score.home} - {score.away}
            </div>
          ) : (
            <span className={styles.vs}>vs</span>
          )}
        </div>

        <div className={styles.teamRight}>
          <span className={styles.teamName}>{away.name}</span>
          {awayFlag && (
            <img src={awayFlag} alt={away.name} className={styles.flag} />
          )}
        </div>
      </div>

      {(metaLeft || metaRight) && (
        <div className={styles.meta}>
          <span>{metaLeft}</span>
          <span className={styles.tag}>{metaRight}</span>
        </div>
      )}
    </div>
  );
}