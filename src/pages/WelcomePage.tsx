// src/pages/WelcomePage.tsx

import { useNavigate } from "react-router-dom";

import styles from "./WelcomePage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function WelcomePage() {
  const navigate = useNavigate();

  /* ================= ROUTING ================= */

  const goToTerms = () => {
    navigate("/terms");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <section className={styles.page}>
      {/* ================= HERO ================= */}

      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.badge}>
            GLOBAL FOOTBALL EXPERIENCE
          </div>

          <h1>
            The Ultimate
            International Football
            Fan Platform
          </h1>

          <p>
            Experience live matches,
            tournament intelligence,
            stadiums, football media,
            podcasts, rankings, AI
            projections, supporter
            culture and immersive
            global football storytelling
            in one premium platform.
          </p>

          {/* ================= CTA BUTTONS ================= */}

          <div className={styles.heroButtons}>
            {/* PRIMARY */}

            <button
              className={styles.primaryButton}
              onClick={goToTerms}
            >
              Continue
            </button>

            {/* LOGIN */}

            <button
              className={styles.secondaryButton}
              onClick={goToLogin}
            >
              Existing Member Login
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>
            Everything Football
            In One Place
          </h2>

          <p>
            A premium global football
            companion experience built
            for supporters around the world.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {/* FEATURE 1 */}

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              ⚽
            </div>

            <h3>Live Match Center</h3>

            <p>
              Follow fixtures, live scores,
              knockout progression,
              standings and tournament
              momentum in real time.
            </p>
          </div>

          {/* FEATURE 2 */}

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              🧠
            </div>

            <h3>AI Tournament Intelligence</h3>

            <p>
              Explore power rankings,
              predictive pathways,
              upset alerts and football
              analytics across major tournaments.
            </p>
          </div>

          {/* FEATURE 3 */}

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              🏟
            </div>

            <h3>Global Stadium Explorer</h3>

            <p>
              Discover iconic football
              venues, tournament hosts,
              stadium histories and
              immersive match atmospheres.
            </p>
          </div>

          {/* FEATURE 4 */}

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              🌍
            </div>

            <h3>National Teams & Players</h3>

            <p>
              Dive into squads, player
              profiles, match histories,
              tactical systems and
              international football culture.
            </p>
          </div>

          {/* FEATURE 5 */}

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              🎥
            </div>

            <h3>Media & Podcasts</h3>

            <p>
              Watch football highlights,
              tactical analysis, documentaries,
              podcasts and global creator content.
            </p>
          </div>

          {/* FEATURE 6 */}

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              🔥
            </div>

            <h3>Immersive Fan Experience</h3>

            <p>
              Experience supporter culture,
              football atmosphere,
              tournament storytelling
              and global fan energy.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}

      <section className={styles.pricingSection}>
        <div className={styles.pricingCard}>
          <div className={styles.pricingLabel}>
            GLOBAL ACCESS
          </div>

          <h2>$1.99 USD</h2>

          <div className={styles.pricingSub}>
            One-Time Purchase
          </div>

          <p>
            Unlock the complete
            global football experience
            with lifetime platform access.
            No subscriptions.
            No recurring fees.
          </p>

          <ul className={styles.pricingList}>
            <li>
              ✓ Full Football Platform Access
            </li>

            <li>
              ✓ Match Center & Live Coverage
            </li>

            <li>
              ✓ Stadiums & Nation Experiences
            </li>

            <li>
              ✓ Media & Podcast Access
            </li>

            <li>
              ✓ AI Tournament Features
            </li>
          </ul>

          <button
            className={styles.purchaseButton}
            onClick={goToTerms}
          >
            Continue To Terms & Setup
          </button>

          {/* GOOGLE COMPLIANCE */}

          <div className={styles.secureNotice}>
            Secure checkout and purchase
            handling are processed through
            official platform billing systems.
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}

      <section className={styles.trustSection}>
        <div className={styles.trustCard}>
          <h3>
            Independent Global Football Platform
          </h3>

          <p>
            International Soccer Fans Zone
            is an independent football fan
            experience platform and is not
            affiliated with or endorsed by
            FIFA, UEFA, CAF, AFC, CONMEBOL,
            CONCACAF, OFC, football federations,
            tournament organizers or broadcasters.
          </p>
        </div>
      </section>

      {/* ================= LEGAL ================= */}

      <footer className={styles.footer}>
        <p>
          By continuing you agree to the
          Terms of Service and Privacy Policy.
        </p>

        <div className={styles.footerButtons}>
          <button
            className={styles.footerLink}
            onClick={goToTerms}
          >
            Terms & Privacy
          </button>

          <button
            className={styles.footerLink}
            onClick={goToLogin}
          >
            Existing Account Login
          </button>
        </div>
      </footer>
    </section>
  );
}