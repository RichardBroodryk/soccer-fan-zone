import { useNavigate } from "react-router-dom";
import styles from "./TMOReviewsPage.module.css";

import tmoHero from "../../../assets/images/referee/tmo-hero.jpg";

export default function TMOReviewsPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${tmoHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>TMO &amp; Reviews</h1>
          <p>Technology, thresholds, and the limits of certainty.</p>
        </div>
      </header>

      <div className={styles.backWrap}>
        <button onClick={() => navigate("/inside-the-game/referees")}>
          ← Back to Referee Hub
        </button>
      </div>

      <section className={styles.section}>
        <h2>What the TMO Is — and Isn’t</h2>
        <p>
          The Television Match Official supports referees, but does not replace
          them. Decisions still rest with the on-field referee.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Review Triggers</h2>
        <p>
          TMOs intervene for clear errors relating to tries, foul play, and
          critical infringements — not every marginal call.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Why Reviews Take Time</h2>
        <p>
          Officials must balance accuracy with flow, reviewing multiple angles
          while applying legal thresholds, not fan opinion.
        </p>
      </section>
    </main>
  );
}
