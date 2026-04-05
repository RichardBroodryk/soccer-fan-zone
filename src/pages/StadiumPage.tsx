import { useParams, useNavigate } from "react-router-dom";
import styles from "./StadiumPage.module.css";

/* ✅ DATA */
import { matches2026 } from "../data/matches";
import type { MatchData } from "../data/matches/matches2026Men";

import { stadiums } from "../data/stadiums";

import MatchRow from "../components/match/MatchRow";

/* 🧠 ENGINE */
import {
  getStadiumHero,
  getStadiumGallery,
  getStadiumSeating,
  getStadiumMeta,
  getStadiumExperience,
} from "../engine/stadiumEngine";

/* fallback */
import fallbackHero from "../assets/images/stadiums/capetown-stadium.jpg";

export default function StadiumPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) return <div className={styles.error}>Invalid stadium reference</div>;

  const stadium = stadiums.find((s) => s.slug === slug);

  if (!stadium) {
    return (
      <div className={styles.error}>
        Stadium not found.
        <button onClick={() => navigate("/stadiums")}>
          View all stadiums
        </button>
      </div>
    );
  }

  /* DATA */
  const heroImage = getStadiumHero(slug, fallbackHero);
  const gallery = getStadiumGallery(slug);
  const seating = getStadiumSeating(slug) || [];
  const meta = getStadiumMeta(slug);
  const experience = getStadiumExperience(slug);

  /* ✅ SAFE GALLERY */
  const galleryImages = [
    gallery?.inside,
    gallery?.outside,
    gallery?.crowds,
    gallery?.aerial,
  ].filter((img): img is string => Boolean(img));

  const now = new Date();

  /* ✅ MATCH FILTER */
  const upcomingMatches = matches2026
    .filter(
      (m: MatchData) =>
        m.venue === stadium.name &&
        new Date(m.date) >= now
    )
    .sort(
      (a: MatchData, b: MatchData) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>{stadium.name}</h1>
          <p>
            {stadium.city ? `${stadium.city}, ` : ""}
            {stadium.country}
          </p>
        </div>
      </header>

      {/* MATCHES */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming matches</h2>

        {upcomingMatches.length > 0 ? (
          <div className={styles.matches}>
            {upcomingMatches.map((m: MatchData) => (
              <MatchRow
                key={m.id}
                home={m.home}
                away={m.away}
                state="upcoming"
                metaLeft={m.date}
                metaRight={m.tournament}
                onClick={() => navigate(`/match/${m.id}`)}
              />
            ))}
          </div>
        ) : (
          <p>No upcoming fixtures.</p>
        )}

        <div className={styles.ctaWrap}>
          <button
            className={styles.primary}
            onClick={() =>
              navigate(`/stadium/${stadium.slug}/matchday`)
            }
          >
            Plan your matchday
          </button>
        </div>
      </section>

      {/* INTELLIGENCE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Stadium intelligence</h2>

        <div className={styles.intelGrid}>
          {meta.capacity && (
            <div className={styles.intelCard}>
              Capacity: {meta.capacity}
            </div>
          )}
          {meta.altitude && (
            <div className={styles.intelCard}>
              Altitude: {meta.altitude}m
            </div>
          )}
          {meta.pitch && (
            <div className={styles.intelCard}>
              Pitch: {meta.pitch}
            </div>
          )}
          {meta.roof && (
            <div className={styles.intelCard}>
              Roof: {meta.roof}
            </div>
          )}
        </div>

        {experience.arrivalTip && (
          <div className={styles.tip}>
            <strong>Tip:</strong> {experience.arrivalTip}
          </div>
        )}
      </section>

      {/* GALLERY */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Inside the stadium</h2>

        <div className={styles.gallery}>
          {galleryImages.map((img, i) => (
            <div key={i} className={styles.galleryItem}>
              <img src={img} alt="stadium" />
            </div>
          ))}
        </div>
      </section>

      {/* SEATING */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Seating</h2>

        <div className={styles.seatingGrid}>
          {seating.map((zone, i) => (
            <div key={i} className={styles.seatCard}>
              <h3>{zone.name}</h3>
              <p>
                {zone.type} · {zone.view}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}