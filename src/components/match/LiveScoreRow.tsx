import styles from "./LiveScoreRow.module.css";
import Flag from "../images/Flag";

type Team = {
  name: string;
  country: string;
};

type CardEvent = "yellow" | "red";

type TryEvent = {
  scorer: string;
  minute: string;
};

type LiveScoreRowProps = {
  home: Team;
  away: Team;
  score?: { home: number; away: number };
  phase: "1st Half" | "2nd Half" | "HT" | "ET" | "Final" | "Upcoming";
  tournament: string;
  venue?: string;

  homeCard?: CardEvent;
  awayCard?: CardEvent;

  lastTry?: TryEvent;

  anthemStatus?: "played" | "pending";
};

export default function LiveScoreRow({
  home,
  away,
  score,
  phase,
  tournament,
  venue,
  homeCard,
  awayCard,
  lastTry,
  anthemStatus,
}: LiveScoreRowProps) {
  const homeLeading = score && score.home > score.away;
  const awayLeading = score && score.away > score.home;

  return (
    <div className={styles.row}>
      {/* TEAMS + SCORE */}
      <div className={styles.teamsGrid}>
        {/* HOME */}
        <div className={styles.teamLeft}>
          <Flag country={home.country} size="small" />
          <span className={styles.teamName}>{home.name}</span>
          {homeCard && (
            <span
              className={`${styles.card} ${
                homeCard === "red" ? styles.red : styles.yellow
              }`}
            />
          )}
        </div>

        {/* CENTER */}
        <div className={styles.center}>
          {score ? (
            <div className={styles.scoreBlock}>
              <span
                className={`${styles.score} ${
                  homeLeading ? styles.leading : ""
                }`}
              >
                {score.home}
              </span>
              <span className={styles.vs}>–</span>
              <span
                className={`${styles.score} ${
                  awayLeading ? styles.leading : ""
                }`}
              >
                {score.away}
              </span>
            </div>
          ) : (
            <span className={styles.vsStatic}>VS</span>
          )}
          <span className={styles.phase}>{phase}</span>
        </div>

        {/* AWAY */}
        <div className={styles.teamRight}>
          {awayCard && (
            <span
              className={`${styles.card} ${
                awayCard === "red" ? styles.red : styles.yellow
              }`}
            />
          )}
          <span className={styles.teamName}>{away.name}</span>
          <Flag country={away.country} size="small" />
        </div>
      </div>

      {/* META */}
      <div className={styles.meta}>
        <span>
          {tournament}
          {venue ? ` · ${venue}` : ""}
        </span>

        {anthemStatus && (
          <span className={styles.anthem}>
            Anthem {anthemStatus}
          </span>
        )}
      </div>

      {/* LAST TRY */}
      {lastTry && (
        <div className={styles.tryEvent}>
          TRY — {lastTry.scorer} {lastTry.minute}
        </div>
      )}
    </div>
  );
}
