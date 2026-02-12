import styles from "./Squads2026Tournament.module.css";

type Nation = {
  name: string;
  region: string;
};

const nations: Nation[] = [
  { name: "New Zealand", region: "Southern Hemisphere" },
  { name: "South Africa", region: "Southern Hemisphere" },
  { name: "England", region: "Europe" },
  { name: "Ireland", region: "Europe" },
  { name: "France", region: "Europe" },
  { name: "Australia", region: "Southern Hemisphere" },
];

export default function Squads2026Tournament() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>International Squads · Tournament</h1>
        <p>
          Select a nation to view its officially named squad for this
          international tournament.
        </p>
      </section>

      {/* TOURNAMENT INFO */}
      <section className={styles.section}>
        <div className={styles.tournamentMeta}>
          <span className={styles.tag}>Men’s Competition</span>
          <span className={styles.separator}>•</span>
          <span className={styles.tag}>2026 Season</span>
        </div>
      </section>

      {/* NATIONS */}
      <section className={styles.section}>
        <h2>Participating Nations</h2>

        <div className={styles.grid}>
          {nations.map((nation) => (
            <article
              key={nation.name}
              className={styles.card}
            >
              <h3>{nation.name}</h3>
              <span className={styles.region}>{nation.region}</span>

              <button className={styles.action}>
                View Squad
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* CONTEXT */}
      <section className={styles.sectionAlt}>
        <h2>About Tournament Squads</h2>
        <p>
          National squads listed here reflect official tournament announcements
          and represent the full playing group selected for the competition.
        </p>
      </section>

      {/* INFO */}
      <section className={styles.section}>
        <h2>Coverage Notes</h2>
        <div className={styles.info}>
          <p>
            Squads are presented at national level and may differ from matchday
            selections.
          </p>
          <p>
            Coaching staff and squad details are maintained separately for
            accuracy and clarity.
          </p>
        </div>
      </section>
    </div>
  );
}
