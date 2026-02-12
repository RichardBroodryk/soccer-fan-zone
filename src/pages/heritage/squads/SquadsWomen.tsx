import { useNavigate } from "react-router-dom";
import styles from "./SquadsWomen.module.css";

type Tournament = {
  name: string;
  region: string;
  nations: number;
  description: string;
};

const tournaments: Tournament[] = [
  {
    name: "Women’s Six Nations Championship",
    region: "Europe",
    nations: 6,
    description:
      "Europe’s premier annual women’s international championship featuring the Home Nations and Italy.",
  },
  {
    name: "WXV",
    region: "Global",
    nations: 18,
    description:
      "World Rugby’s global women’s competition structure, featuring three competitive tiers.",
  },
  {
    name: "Pacific Four Series",
    region: "Pacific",
    nations: 4,
    description:
      "Elite Pacific-region competition showcasing the world’s leading women’s rugby nations.",
  },
  {
    name: "Women’s Autumn Internationals",
    region: "Global",
    nations: 10,
    description:
      "End-of-year international fixtures bringing together northern and southern hemisphere teams.",
  },
];

export default function SquadsWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO — TITLE LIVES HERE */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Women’s Squads</h1>
          <p>
            Official international women’s squads across major tournaments and
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

      {/* EDITORIAL FRAMING */}
      <section className={styles.pageIntro}>
        <h2>Where Opportunity Meets Momentum</h2>
        <p>
          When squads are named, preparation turns into possibility and the
          international season takes form.
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
          Women’s international squads are selected by national coaching teams
          and announced ahead of major competitions in line with tournament
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
            Tournament listings may expand as the women’s international calendar
            continues to grow.
          </p>
        </div>
      </section>
    </main>
  );
}
