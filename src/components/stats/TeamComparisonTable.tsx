import styles from "./TeamComparisonTable.module.css";
import Flag from "../images/Flag";

type Team = {
  name: string;
  country: string;
};

type ComparisonStat = {
  label: string;
  home: number | string;
  away: number | string;
};

type TeamComparisonTableProps = {
  home: Team;
  away: Team;
  stats: ComparisonStat[];
};

export default function TeamComparisonTable({
  home,
  away,
  stats,
}: TeamComparisonTableProps) {
  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <span className={styles.team}>
          <Flag country={home.country} size="small" />
          {home.name}
        </span>

        <span className={styles.vs}>VS</span>

        <span className={`${styles.team} ${styles.right}`}>
          {away.name}
          <Flag country={away.country} size="small" />
        </span>
      </div>

      {/* STATS */}
      <div className={styles.table}>
        {stats.map((s) => (
          <div key={s.label} className={styles.row}>
            <span
              className={`${styles.value} ${
                s.home > s.away ? styles.leading : ""
              }`}
            >
              {s.home}
            </span>

            <span className={styles.label}>{s.label}</span>

            <span
              className={`${styles.value} ${
                s.away > s.home ? styles.leading : ""
              }`}
            >
              {s.away}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
