import { useNavigate } from "react-router-dom";
import styles from "./PlayingCharterPage.module.css";

import charterHero from "../assets/images/referee/playing-charter-hero.jpg";

export default function PlayingCharterPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${charterHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Playing Charter</h1>
          <p>
            The principles, values, and spirit that define how rugby is played —
            and how it is respected.
          </p>
        </div>
      </header>

      {/* ================= BACK BUTTON ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/inside-the-game")}
        >
          ← Back to Inside the Game
        </button>
      </div>

      {/* ================= INTRODUCTION ================= */}
      <section className={styles.section}>
        <h2>What the Playing Charter Is</h2>
        <p className={styles.bodyText}>
          The Playing Charter sits alongside the Laws of the Game. It exists to
          protect rugby’s character — ensuring that competition, physicality,
          and ambition are balanced by discipline, respect, and responsibility.
        </p>
        <p className={styles.bodyText}>
          It provides a shared standard against which behaviour, decisions, and
          conduct can be understood, from grassroots rugby to the international
          stage.
        </p>
      </section>

      {/* ================= PRINCIPLES OF THE GAME ================= */}
      <section className={styles.section}>
        <h2>Principles of the Game</h2>
        <p className={styles.bodyText}>
          Rugby is a physical contest for possession, territory, and advantage.
          That contest is intentional — but it is never lawless. The Laws exist
          to ensure that physical pressure is applied fairly, safely, and within
          clear boundaries.
        </p>
        <p className={styles.bodyText}>
          The balance between contest and continuity defines rugby’s unique
          nature. Teams are rewarded for skill, courage, and collective effort,
          while opponents are always given a fair opportunity to compete.
        </p>
      </section>

      {/* ================= SPIRIT & CONDUCT ================= */}
      <section className={styles.section}>
        <h2>Spirit &amp; Conduct</h2>
        <p className={styles.bodyText}>
          Rugby is played according to both the letter and the spirit of the
          Laws. Discipline, self-control, and mutual respect are not optional —
          they are fundamental to the game’s identity.
        </p>
        <p className={styles.bodyText}>
          Players, coaches, captains, and referees all share responsibility for
          maintaining this spirit. Respect for opponents and officials ensures
          that intense competition never descends into unfairness or hostility.
        </p>
      </section>

      {/* ================= OBJECT OF THE GAME ================= */}
      <section className={styles.section}>
        <h2>The Objective</h2>
        <p className={styles.bodyText}>
          The objective of rugby is simple: to score more points than the
          opposition by carrying, passing, kicking, and grounding the ball in
          accordance with the Laws and the spirit of fair play.
        </p>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className={styles.section}>
        <h2>Core Values</h2>
        <p className={styles.bodyText}>
          The Playing Charter reinforces five core values that underpin rugby at
          every level:
        </p>

        <ul className={styles.valuesList}>
          <li>
            <strong>Integrity</strong> — Honesty, fairness, and consistency on
            and off the field.
          </li>
          <li>
            <strong>Passion</strong> — Commitment, pride, and emotional
            investment in the game.
          </li>
          <li>
            <strong>Solidarity</strong> — Teamwork, loyalty, and a shared sense
            of belonging.
          </li>
          <li>
            <strong>Discipline</strong> — Respect for the Laws, officials, and
            the structure of the game.
          </li>
          <li>
            <strong>Respect</strong> — For teammates, opponents, referees, and
            rugby itself.
          </li>
        </ul>
      </section>

      {/* ================= WHY IT MATTERS ================= */}
      <section className={styles.section}>
        <h2>Why It Matters</h2>
        <p className={styles.bodyText}>
          The Playing Charter ensures that rugby remains a game where fierce
          competition coexists with mutual respect. It protects players, guides
          referees, and gives supporters a clear understanding of what the game
          stands for.
        </p>
        <p className={styles.bodyText}>
          Understanding the Charter deepens appreciation of decisions, laws,
          and behaviour — strengthening trust in the game and those who uphold
          it.
        </p>
      </section>
    </main>
  );
}
