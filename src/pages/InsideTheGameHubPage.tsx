import { useNavigate } from "react-router-dom";
import styles from "./InsideTheGameHubPage.module.css";

import heroImage from "../assets/images/raz/inside-the-game.png";
import fantasyImage from "../assets/images/raz/fantasy-hero.png";
import refereesImage from "../assets/images/raz/referees.png";
import playingCharterImage from "../assets/images/referee/playing-charter-hero.jpg";

export default function InsideTheGameHubPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Inside the Game</h1>
          <p className={styles.heroSub}>
            The laws, decisions, and strategic thinking
            <br />
            that shape every rugby match.
          </p>
        </div>
      </header>

      {/* ================= INTRO ================= */}
      <section className={styles.section}>
        <p className={styles.bodyTextStrong}>
          Inside the Game is where understanding deepens — from how referees
          interpret the laws in real time to the principles and structures that
          define rugby itself.
        </p>
      </section>

      {/* ================= FEATURE CARDS ================= */}
      <section className={styles.section}>
        <div className={styles.cards}>
          {/* REFEREES */}
          <div
            className={styles.featureCard}
            style={{ backgroundImage: `url(${refereesImage})` }}
            onClick={() => navigate("/inside-the-game/referees")}
          >
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <h2>Referees</h2>
              <span>Rules, interpretation &amp; on-field decisions</span>
            </div>
          </div>

          {/* FANTASY */}
          <div
            className={styles.featureCard}
            style={{ backgroundImage: `url(${fantasyImage})` }}
            onClick={() => navigate("/inside-the-game/fantasy")}
          >
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <h2>Fantasy Rugby</h2>
              <span>Strategy, foresight &amp; competitive insight</span>
            </div>
          </div>

          {/* PLAYING CHARTER */}
          <div
            className={styles.featureCard}
            style={{ backgroundImage: `url(${playingCharterImage})` }}
            onClick={() => navigate("/inside-the-game/playing-charter")}
          >
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <h2>Playing Charter</h2>
              <span>The principles, values &amp; spirit of the game</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
