import { useNavigate } from "react-router-dom";
import styles from "./BreakdownRucksPage.module.css";

import rulesHero from "../../../assets/images/referee/rules-hero.jpg";

export default function BreakdownRucksPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${rulesHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Breakdown &amp; Rucks</h1>
          <p>Where most refereeing decisions — and controversies — are made.</p>
        </div>
      </header>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button onClick={() => navigate("/inside-the-game/referees")}>
          ← Back to Referee Hub
        </button>
      </div>

      {/* CONTENT */}
      <section className={styles.section}>
        <h2>Why the Breakdown Matters</h2>
        <p>
          The breakdown is rugby’s most complex contest. It is where possession,
          momentum, and discipline intersect — often within fractions of a
          second.
        </p>
        <p>
          Referees must judge player intent, body position, entry angles, and
          timing in real time, all while managing player safety and game flow.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Key Areas Referees Monitor</h2>
        <ul>
          <li>Legal entry through the gate</li>
          <li>Supporting body weight</li>
          <li>Clear release by the tackler</li>
          <li>Hands on the ball before a ruck forms</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Why Fans Disagree</h2>
        <p>
          Camera angles, slow-motion replays, and crowd emotion often clash with
          what referees see live. Understanding the laws — and their intent —
          bridges that gap.
        </p>
      </section>
    </main>
  );
}
