import styles from "./FixtureRow.module.css";
import { FLAG_MAP } from "../../utils/flagMap";

type Team = {
  name: string;
  country: string;
};

type FixtureRowProps = {
  date: string;
  home: Team;
  away: Team;
  tournament: string;
  venue: string;
  tournamentRoute?: string;
};

export default function FixtureRow({
  date,
  home,
  away,
  tournament,
  venue,
  tournamentRoute,
}: FixtureRowProps) {
  const homeFlag = FLAG_MAP[home.country];
  const awayFlag = FLAG_MAP[away.country];

  return (
    <div className={styles.row}>
      {/* DATE */}
      <div className={styles.date}>{date}</div>

      {/* TEAMS */}
      <div className={styles.teams}>
        <span className={styles.team}>
          {homeFlag && (
            <img
              src={homeFlag}
              alt={home.name}
              className={styles.flag}
            />
          )}
          {home.name}
        </span>

        <span className={styles.vs}>VS</span>

        <span className={styles.team}>
          {away.name}
          {awayFlag && (
            <img
              src={awayFlag}
              alt={away.name}
              className={styles.flag}
            />
          )}
        </span>
      </div>

      {/* META */}
      <div className={styles.meta}>
        <span>{venue}</span>

        {tournamentRoute && (
          <a
            href={tournamentRoute}
            className={styles.tournamentLink}
          >
            {tournament}
          </a>
        )}
      </div>
    </div>
  );
}
