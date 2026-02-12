import { useNavigate } from "react-router-dom";
import styles from "./LawUpdatesPage.module.css";

import bookHero from "../../../assets/images/referee/book-hero.jpg";

export default function LawUpdatesPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${bookHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Law Updates</h1>
          <p>Why laws evolve — and how they shape the modern game.</p>
        </div>
      </header>

      <div className={styles.backWrap}>
        <button onClick={() => navigate("/inside-the-game/referees")}>
          ← Back to Referee Hub
        </button>
      </div>

      <section className={styles.section}>
        <h2>Why Laws Change</h2>
        <p>
          Law changes aim to improve player safety, game speed, and fairness —
          responding to how the game evolves at elite and grassroots levels.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Trial Periods &amp; Adaptation</h2>
        <p>
          Many laws are trialled before adoption, allowing referees, players,
          and coaches to adjust.
        </p>
      </section>
    </main>
  );
}
