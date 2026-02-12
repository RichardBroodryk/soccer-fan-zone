import { useNavigate } from "react-router-dom";
import styles from "./SquadsMen.module.css";

type Tournament = {
  name: string;
  region: string;
  nations: number;
  description: string;
};

const tournaments: Tournament[] = [
  {
    name: "Six Nations Championship",
    region: "Europe",
    nations: 6,
    description:
      "Europe’s premier annual international championship featuring the Home Nations and Italy.",
  },
  {
    name: "Rugby Championship",
    region: "Southern Hemisphere",
    nations: 4,
    description:
      "Elite southern hemisphere competition contested by the world’s leading rugby nations.",
  },
  {
    name: "Pacific Nations Cup",
    region: "Pacific",
    nations: 6,
    description:
      "An international tournament showcasing Pacific and emerging rugby nations.",
  },
  {
    name: "Autumn Internationals",
    region: "Global",
    nations: 10,
    description:
      "End-of-year international fixtures bringing together northern and southern hemisphere teams.",
  },
];

export default function SquadsMen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO — TITLE LIVES HERE */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Men’s Squads</h1>
          <p>
            Official international men’s squads across major tournaments and
            international windows.
          </p>
        </div>
      </header>

      {/* BACK TO SQUADS HUB */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/squads")}
        >
          ← Back to Squads
        </button>
      </div>

      {/* EDITORIAL FRAMING — THIS WAS THE MISSING PIECE */}
      <section className={styles.pageIntro}>
        <h2>Where Selection Becomes Identity</h2>
        <p>
          When squads are named, seasons take shape and national intent becomes
          clear.
        </p>
      </section>

      {/* TOURNAMENTS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>International Tournaments</h2>

        <div className={styles.grid}>
          {tournaments.map((tournament) => (
            <article key={tournament.name} className={styles.card}>
              <h3>{tournament.name}</h3>

              <p className={styles.description}>
                {tournament.description}
              </p>

              <div className={styles.meta}>
                <span>{tournament.region}</span>
                <span>{tournament.nations} Nations</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTEXT */}
      <section className={styles.sectionMuted}>
        <h2>How Squads Are Selected</h2>
        <p>
          Men’s international squads are selected by national coaching teams and
          announced ahead of major competitions in accordance with tournament
          regulations.
        </p>
      </section>

      {/* INFO */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Coverage Notes</h2>
        <div className={styles.info}>
          <p>
            This section reflects officially confirmed squads only. Matchday
            selections and injury updates are covered elsewhere.
          </p>
          <p>
            Tournament listings may expand as additional competitions are
            scheduled.
          </p>
        </div>
      </section>
    </main>
  );
}
