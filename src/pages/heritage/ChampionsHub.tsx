import { useNavigate } from "react-router-dom";
import styles from "./ChampionsHub.module.css";

import heroBg from "../../assets/images/raz/champions.png";

export default function ChampionsHub() {
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
          <h1>Champions</h1>
          <p>
            The official record of international rugby champions across men’s
            and women’s competitions.
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
        <h2>Championship Legacy</h2>
        <p>
          Where excellence was proven, eras were defined, and the game’s
          greatest prizes were claimed.
        </p>
      </section>

      {/* HUB GRID */}
      <section className={styles.grid}>
        <div
          className={`${styles.card} ${styles.men}`}
          onClick={() => navigate("/heritage/champions/men")}
          role="button"
          tabIndex={0}
        >
          <h2>Men’s Champions</h2>
          <p>
            Winners of major international men’s tournaments, including World
            Cups and continental championships.
          </p>
        </div>

        <div
          className={`${styles.card} ${styles.women}`}
          onClick={() => navigate("/heritage/champions/women")}
          role="button"
          tabIndex={0}
        >
          <h2>Women’s Champions</h2>
          <p>
            Champions of the women’s international game, reflecting the growth
            and evolution of global competition.
          </p>
        </div>
      </section>
    </main>
  );
}
