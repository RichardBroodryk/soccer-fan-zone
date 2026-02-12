import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveMatchAudioPage.module.css";

import { recordLoyaltyAction } from "../utils/loyaltyHooks";
import heroImage from "../assets/images/raz/fanzone-audio.png";

export default function LiveMatchAudioPage() {
  const navigate = useNavigate();

  /* ================= LOYALTY: PAGE VIEW ================= */
  useEffect(() => {
    recordLoyaltyAction("audio_view");
  }, []);

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Live Match Audio</h1>
          <p>
            Official radio commentary and immersive sound
            <br />
            through authorised broadcast partners.
          </p>
        </div>
      </section>

      {/* ================= BACK ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/fanzone")}
        >
          ← Back to Fanzone
        </button>
      </div>

      {/* ================= OVERVIEW ================= */}
      <section className={styles.section}>
        <p className={styles.bodyText}>
          Live Match Audio provides access to authorised radio commentary,
          alternative commentary feeds, and atmosphere-focused audio where
          broadcast rights allow. Rugby Anthem Zone does not host or transmit
          audio streams directly.
        </p>
      </section>

      {/* ================= ACCESS MODELS ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Access Models</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Free Radio Commentary</h3>
            <p>
              In some territories, official radio commentary is available at no
              cost. These streams may include advertising and are governed by
              local broadcast agreements.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Premium Audio Feeds</h3>
            <p>
              Certain matches offer premium audio options, including ad-reduced
              commentary, alternative voices, or enhanced sound environments.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Hybrid Availability</h3>
            <p>
              Some events provide both free and premium options, allowing
              supporters to choose their preferred listening experience.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TERRITORY & STADIUM ROUTING ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Audio Routing</h2>

        <p className={styles.bodyText}>
          Audio availability is determined by territory, competition, and venue.
          Where supported, Live Match Audio may route supporters to:
        </p>

        <ul className={styles.list}>
          <li>Official national radio broadcasters</li>
          <li>Competition-authorised audio platforms</li>
          <li>Stadium-linked commentary or ambience feeds</li>
        </ul>

        <button
          className={styles.outbound}
          onClick={() => recordLoyaltyAction("audio_listen")}
        >
          Proceed to Official Audio Provider
        </button>
      </section>

      {/* ================= NOTICE ================= */}
      <section className={styles.section}>
        <p className={styles.notice}>
          Audio availability, languages, and access conditions vary by match and
          region. Supported providers and access options are clearly indicated
          before playback.
        </p>
      </section>

      {/* ================= FORWARD VIEW ================= */}
      <section className={styles.section}>
        <p className={styles.bodyText}>
          Additional languages, alternative commentary teams, and venue-specific
          audio experiences may be introduced over time, without turning Live
          Match Audio into a feed or a distraction from the match itself.
        </p>
      </section>
    </main>
  );
}
