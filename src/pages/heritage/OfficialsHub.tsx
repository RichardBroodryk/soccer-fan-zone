import { useNavigate } from "react-router-dom";
import styles from "./OfficialsHub.module.css";

import heroBg from "../../assets/images/referee/officials-hub.png";

export default function OfficialsHub() {
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
          <h1>Officials & Match Governance</h1>
          <p>
            The referees, assistant referees, and TMOs who upheld the laws,
            guided interpretation, and shaped rugby’s competitive integrity
            across eras.
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
        <h2>Guardians of the Game</h2>
        <p>
          The officials whose authority, interpretation, and judgment preserved
          rugby’s integrity at the highest level.
        </p>
      </section>

      {/* HUB GRID */}
      <section className={styles.grid}>
        <div
          className={`${styles.card} ${styles.men}`}
          onClick={() => navigate("/heritage/officials/men")}
          role="button"
          tabIndex={0}
        >
          <h2>Men’s Officials</h2>
          <p>
            Referees and match officials whose authority, consistency, and
            judgment defined eras of the men’s game.
          </p>
        </div>

        <div
          className={`${styles.card} ${styles.women}`}
          onClick={() => navigate("/heritage/officials/women")}
          role="button"
          tabIndex={0}
        >
          <h2>Women’s Officials</h2>
          <p>
            Trailblazing referees and officials who advanced women’s rugby
            and set new standards of excellence on the global stage.
          </p>
        </div>
      </section>
    </main>
  );
}
