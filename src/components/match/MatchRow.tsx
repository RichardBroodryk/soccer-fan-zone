import styles from "./MatchRow.module.css";
import { soccerFlags as flagMap } from "../../data/soccer/soccerFlags";

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
  metaRight?: string; // stadium name
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

  const showScore =
    score &&
    score.home !== undefined &&
    score.away !== undefined;

  return (
    <div
      className={`${styles.row} ${onClick ? styles.clickable : ""}`}
      onClick={onClick}
    >
      <div className={styles.teamsGrid}>
        <div className={styles.teamLeft}>
          {homeFlag && (
            <img
              src={homeFlag}
              alt=""
              className={styles.flag}
            />
          )}

          <span className={styles.teamName}>
            {home.name}
          </span>
        </div>

        <div className={styles.center}>
          {showScore ? (
            <div className={styles.score}>
              {score.home} - {score.away}
            </div>
          ) : (
            <span className={styles.vs}>vs</span>
          )}
        </div>

        <div className={styles.teamRight}>
          <span className={styles.teamName}>
            {away.name}
          </span>

          {awayFlag && (
            <img
              src={awayFlag}
              alt=""
              className={styles.flag}
            />
          )}
        </div>
      </div>

      {(metaLeft || metaRight) && (
        <div className={styles.meta}>
          {metaLeft && (
            <span className={styles.metaText}>
              {metaLeft}
            </span>
          )}

          {metaRight && (
            <div className={styles.stadium}>
              <span className={styles.stadiumIcon}>
                🏟
              </span>

              <span className={styles.stadiumName}>
                {metaRight}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}