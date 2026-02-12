import { useNavigate } from "react-router-dom";
import styles from "./FantasyLeagueHubPage.module.css";

import fantasyHero from "../assets/images/raz/fantasy-hero.png";

/* HERO CARD IMAGES */
import fantasyMen from "../assets/images/fantasy/fantasy-men-hero.jpg";
import fantasyWomen from "../assets/images/fantasy/fantasy-women-hero.jpg";
import superbruHero from "../assets/images/fantasy/superbru-hero.jpg";
import wrfMen from "../assets/images/fantasy/wrf-hero.jpg";
import wrfWomen from "../assets/images/fantasy/women-wrf-hero.jpg";
import predictorsHero from "../assets/images/fantasy/predictors-hero.jpg";

export default function FantasyLeagueHubPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${fantasyHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Fantasy Rugby</h1>
          <p className={styles.heroSub}>
            The game within the game — where detail, discipline, and decision-making
            change how you watch rugby.
          </p>
        </div>
      </header>

      {/* ================= CONTEXT NAV ================= */}
      <div className={styles.contextNav}>
        <span>←</span>
        <button onClick={() => navigate("/inside-the-game")}>
          Inside the Game
        </button>
      </div>

      {/* ================= EDITORIAL ================= */}
      <section className={styles.section}>
        <h2>How Fantasy Changes How You Watch Rugby</h2>
        <p className={styles.bodyText}>
          Fantasy rugby shifts attention away from highlights and towards work rate,
          discipline, and tactical roles. You start reading the game — not just
          reacting to it.
        </p>
        <p className={styles.bodyText}>
          Rugby Anthem Zone doesn’t host fantasy games directly. Instead, it sharpens
          understanding and directs fans to trusted platforms where competition
          unfolds.
        </p>
      </section>

      {/* ================= HERO CARDS (HALF WIDTH) ================= */}
      <section className={styles.section}>
        <div className={styles.heroCardGrid}>
          {/* MEN */}
          <div className={styles.heroCard}>
            <div className={styles.heroCardText}>
              <span className={styles.tag}>MEN’S FANTASY</span>
              <h3>Major Men’s Fantasy Rugby</h3>
              <p>Elite international and club competitions.</p>
            </div>
            <img src={fantasyMen} alt="Men’s Fantasy Rugby" />
          </div>

          {/* WOMEN */}
          <div className={styles.heroCard}>
            <div className={styles.heroCardText}>
              <span className={styles.tag}>WOMEN’S FANTASY</span>
              <h3>Women’s Fantasy Rugby</h3>
              <p>Dedicated competitions for the women’s game.</p>
            </div>
            <img src={fantasyWomen} alt="Women’s Fantasy Rugby" />
          </div>
        </div>
      </section>

      {/* ================= PLATFORMS ================= */}
      <section className={styles.section}>
        <h2>Fantasy Platforms</h2>

        <div className={styles.linkGrid}>
          <a href="https://www.superbru.com/" target="_blank" rel="noopener noreferrer">
            <div>
              <h4>SuperBru</h4>
              <p>Global fantasy and predictors.</p>
            </div>
            <img src={superbruHero} alt="SuperBru" />
          </a>

          <a href="https://play.world.rugby/" target="_blank" rel="noopener noreferrer">
            <div>
              <h4>World Rugby Fantasy</h4>
              <p>Official men’s fantasy tournaments.</p>
            </div>
            <img src={wrfMen} alt="World Rugby Fantasy" />
          </a>

          <a href="https://play.world.rugby/" target="_blank" rel="noopener noreferrer">
            <div>
              <h4>World Rugby — Women’s Fantasy</h4>
              <p>Official women’s fantasy competitions.</p>
            </div>
            <img src={wrfWomen} alt="World Rugby Women" />
          </a>
        </div>
      </section>

      {/* ================= PREDICTORS ================= */}
      <section className={styles.section}>
        <div className={styles.heroCardGrid}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardText}>
              <span className={styles.tag}>PREDICTORS</span>
              <h3>Prediction Games</h3>
              <p>Fast, competitive, and low commitment.</p>
            </div>
            <img src={predictorsHero} alt="Predictor Games" />
          </div>
        </div>

        <div className={styles.linkGrid}>
          <a href="https://www.superbru.com/" target="_blank" rel="noopener noreferrer">
            <div>
              <h4>SuperBru Predictors</h4>
              <p>Weekly match and margin predictions.</p>
            </div>
            <img src={superbruHero} alt="SuperBru Predictors" />
          </a>

          <a href="https://play.world.rugby/" target="_blank" rel="noopener noreferrer">
            <div>
              <h4>World Rugby Predictors</h4>
              <p>Official tournament-based predictors.</p>
            </div>
            <img src={predictorsHero} alt="World Rugby Predictors" />
          </a>
        </div>
      </section>
    </main>
  );
}
