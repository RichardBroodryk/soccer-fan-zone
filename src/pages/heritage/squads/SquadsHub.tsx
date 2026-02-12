import { useNavigate } from "react-router-dom";
import styles from "./SquadsHub.module.css";

import heroImage from "../../../assets/images/raz/squads-hub.png";

export default function SquadsHub() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>International Squads</h1>
          <p>
            Officially named international squads — documenting players,
            coaches, and selections across the men’s and women’s game.
          </p>
        </div>
      </header>

      {/* BACK TO HERITAGE */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage")}
        >
          ← Back to Rugby Heritage
        </button>
      </div>

      {/* SECTION INTRO */}
      <section className={styles.sectionIntro}>
        <h2>Selected to Represent</h2>
        <p>
          The moment every player waits for — when squads are named, jerseys are
          earned, and nations take shape.
        </p>
      </section>

      {/* HUB GRID */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <button
            className={`${styles.card} ${styles.men}`}
            onClick={() => navigate("/heritage/squads/men")}
          >
            <h2>Men’s Squads</h2>
            <p>
              International men’s squads selected for major tournaments and
              international windows.
            </p>
          </button>

          <button
            className={`${styles.card} ${styles.women}`}
            onClick={() => navigate("/heritage/squads/women")}
          >
            <h2>Women’s Squads</h2>
            <p>
              Official women’s international squads reflecting the global growth
              of the game.
            </p>
          </button>
        </div>
      </section>
    </main>
  );
}
