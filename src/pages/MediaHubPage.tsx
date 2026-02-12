import { Link } from "react-router-dom";
import styles from "./MediaHubPage.module.css";

import mediaHero from "../assets/images/raz/Mediahub.jpg";

/* STUDIO CARD IMAGES */
import matchHighlightsImg from "../assets/images/raz/Matchhighlightsmainpage.png";
import podcastsImg from "../assets/images/raz/Podcastsmainpage.png";
import greatestHitsImg from "../assets/images/raz/Hitsmainpage.png";
import commentsImg from "../assets/images/raz/Commentsmainpage.png";

export default function MediaHubPage() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img
          src={mediaHero}
          alt=""
          className={styles.heroImage}
        />

        <div className={styles.heroText}>
          <h1>The Rugby Studio</h1>
          <p>Where rugby is watched, heard, and remembered.</p>
        </div>
      </header>

      {/* ================= FEATURED EDITORIAL ================= */}
      <section className={styles.featured}>
        <div className={styles.featuredContent}>
          <span className={styles.featuredLabel}>Featured</span>
          <h2>Classic Test Matches Revisited</h2>
          <p>
            Full-match replays and defining moments from rugby’s
            most iconic international clashes.
          </p>

          <Link to="/videos" className={styles.featuredLink}>
            Watch now →
          </Link>
        </div>
      </section>

      {/* ================= STUDIO EXPERIENCES ================= */}
      <section className={styles.studioGrid}>
        <Link
          to="/videos"
          className={styles.studioCard}
          style={{
            backgroundImage: `url(${matchHighlightsImg})`,
          }}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3>Match Highlights</h3>
            <p>
              Highlights, key moments, and full-match action from
              across the rugby world.
            </p>
          </div>
        </Link>

        <Link
          to="/podcasts"
          className={styles.studioCard}
          style={{
            backgroundImage: `url(${podcastsImg})`,
          }}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3>Podcasts</h3>
            <p>
              Analysis, interviews, and long-form rugby
              conversations.
            </p>
          </div>
        </Link>

        <Link
          to="/greatest-hits"
          className={styles.studioCard}
          style={{
            backgroundImage: `url(${greatestHitsImg})`,
          }}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3>Greatest Hits</h3>
            <p>
              Iconic tries, legendary matches, and unforgettable
              moments.
            </p>
          </div>
        </Link>

        <Link
          to="/comments"
          className={styles.studioCard}
          style={{
            backgroundImage: `url(${commentsImg})`,
          }}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3>Fan Comments</h3>
            <p>
              The global rugby conversation — reactions, debate,
              and opinion.
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
