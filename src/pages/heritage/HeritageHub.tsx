import { useNavigate } from "react-router-dom";
import styles from "./HeritageHub.module.css";

import heroBg from "../../assets/images/raz/heritage-hub.png";

export default function HeritageHub() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Rugby Heritage</h1>
          <p>
            Legends, champions, squads, and the people who shaped the game
            across generations.
          </p>
        </div>
      </header>

      {/* GRID */}
      <section className={styles.grid}>
        <div
          className={`${styles.card} ${styles.legends}`}
          onClick={() => navigate("/heritage/legends")}
          role="button"
          tabIndex={0}
        >
          <h2>Legends</h2>
          <p>The players who defined rugby history — men and women across eras.</p>
        </div>

        <div
          className={`${styles.card} ${styles.squads}`}
          onClick={() => navigate("/heritage/squads")}
          role="button"
          tabIndex={0}
        >
          <h2>Squads</h2>
          <p>Official international squads by nation, tournament, and year.</p>
        </div>

        <div
          className={`${styles.card} ${styles.champions}`}
          onClick={() => navigate("/heritage/champions")}
          role="button"
          tabIndex={0}
        >
          <h2>Champions</h2>
          <p>Teams that lifted trophies and defined championship eras.</p>
        </div>

        <div
          className={`${styles.card} ${styles.coaches}`}
          onClick={() => navigate("/heritage/coaches")}
          role="button"
          tabIndex={0}
        >
          <h2>Coaches & Support Staff</h2>
          <p>The leadership, strategy, and expertise behind rugby’s success.</p>
        </div>

        <div
          className={`${styles.card} ${styles.officials}`}
          onClick={() => navigate("/heritage/officials")}
          role="button"
          tabIndex={0}
        >
          <h2>Officials & Match Governance</h2>
          <p>
            Referees, assistant referees, and TMOs who upheld the laws and shaped
            the game.
          </p>
        </div>
      </section>
    </main>
  );
}
