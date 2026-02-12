import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";

/**
 * WELCOME PAGE v2 — LOCKED
 * Orientation & intent only.
 * No selling. No pricing. No contracts.
 */

export default function WelcomePage() {
  const navigate = useNavigate();

  // 🔒 Correct routing: Welcome → What You Get
  const goFreemium = () => navigate("/what-you-get/freemium");
  const goPremium = () => navigate("/what-you-get/premium");
  const goSuper = () => navigate("/what-you-get/super");

  return (
    <section className={styles.page}>
      {/* HERO */}
      <header className={styles.header}>
        <h1>Welcome to Rugby Anthem Zone</h1>
        <p className={styles.subtitle}>
          A global home for international rugby — built for fans who want more
          than scores, and less noise than modern sports apps.
        </p>
      </header>

      {/* CHOICE */}
      <section className={styles.choices}>
        <h2 className={styles.sectionTitle}>
          Choose how deeply you want to experience the game
        </h2>

        <div className={styles.cards}>
          {/* FREEMIUM */}
          <div className={styles.card}>
            <h3>Freemium</h3>
            <p className={styles.tagline}>
              Explore Rugby Anthem Zone.
            </p>
            <p className={styles.description}>
              A permanent free way to engage with the platform and follow the
              game at a casual level.
            </p>
            <button
              className={styles.secondaryButton}
              onClick={goFreemium}
            >
              Explore Free
            </button>
          </div>

          {/* PREMIUM */}
          <div className={styles.card}>
            <h3>Premium</h3>
            <p className={styles.tagline}>
              A better matchday experience.
            </p>
            <p className={styles.description}>
              Designed for regular rugby followers who want a cleaner,
              more focused way to experience matches and tournaments.
            </p>
            <button
              className={styles.primaryButton}
              onClick={goPremium}
            >
              View Premium Access
            </button>
          </div>

          {/* SUPER */}
          <div className={styles.card}>
            <h3>Super Premium</h3>
            <p className={styles.tagline}>
              Total focus, depth, and heritage.
            </p>
            <p className={styles.description}>
              For dedicated supporters who want the deepest, most
              distraction-free way to engage with rugby on the platform.
            </p>
            <button
              className={styles.secondaryButton}
              onClick={goSuper}
            >
              View Super Premium Access
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
