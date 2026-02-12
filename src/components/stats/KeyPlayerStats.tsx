import styles from "./KeyPlayerStats.module.css";

type PlayerStat = {
  name: string;
  team: string;
  value: string | number;
};

type Category = {
  title: string;
  items: PlayerStat[];
};

type KeyPlayerStatsProps = {
  categories: Category[];
};

export default function KeyPlayerStats({
  categories,
}: KeyPlayerStatsProps) {
  return (
    <div className={styles.wrapper}>
      {categories.map((cat) => (
        <div key={cat.title} className={styles.category}>
          <h3>{cat.title}</h3>

          <ul>
            {cat.items.map((p, i) => (
              <li key={i}>
                <span className={styles.name}>
                  {p.name} ({p.team})
                </span>
                <span className={styles.value}>{p.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
