import { useParams, useNavigate } from "react-router-dom";
import styles from "./StadiumPage.module.css";

import { matches2026 } from "../data/matches2026";
import { stadiums } from "../data/stadiums";

import MatchRow from "../components/match/MatchRow";

/* ================= STADIUM IMAGE REGISTRY ================= */

import twickenham from "../assets/images/stadiums/twickenham.jpg";
import murrayfield from "../assets/images/stadiums/murrayfield.jpg";
import aviva from "../assets/images/stadiums/aviva.jpg";
import principality from "../assets/images/stadiums/principality-stadium.jpg";
import stadeDeFrance from "../assets/images/stadiums/paris-stade-de-france.jpg";
import olimpico from "../assets/images/stadiums/stadio-olimpico.jpg";
import edenPark from "../assets/images/stadiums/eden-park.jpg";
import ellisPark from "../assets/images/stadiums/ellis-park.jpg";
import fnbStadium from "../assets/images/stadiums/fnb-stadium.jpg";

/* 🔒 Keys must match stadium.slug exactly */
const stadiumImages: Record<string, string> = {
  "twickenham": twickenham,
  "murrayfield": murrayfield,
  "aviva-stadium": aviva,
  "principality-stadium": principality,
  "stade-de-france": stadeDeFrance,
  "stadio-olimpico": olimpico,
  "eden-park": edenPark,
  "ellis-park": ellisPark,
  "fnb-stadium": fnbStadium,
};

/* ================= PAGE ================= */

export default function StadiumPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return <div className={styles.error}>Invalid stadium reference</div>;
  }

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

  const heroImage = stadiumImages[stadium.slug];

  const now = new Date();
  const upcomingMatches = matches2026
    .filter(
      (m) =>
        m.venue === stadium.name &&
        new Date(m.date) >= now
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{
          backgroundImage: heroImage
            ? `url(${heroImage})`
            : undefined,
        }}
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

      {/* ================= UPCOMING MATCHES ================= */}
      <section className={styles.section}>
        <h2>Upcoming matches at this stadium</h2>

        {upcomingMatches.length > 0 ? (
          <div className={styles.matches}>
            {upcomingMatches.map((m) => (
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
          <p className={styles.placeholder}>
            No upcoming fixtures are currently scheduled at this venue.
          </p>
        )}
      </section>

      {/* ================= FORWARD ACTION ================= */}
      <section className={styles.actions}>
        <button
          className={styles.primary}
          onClick={() =>
            navigate(`/stadium/${stadium.slug}/matchday`)
          }
        >
          Plan your matchday
        </button>
      </section>
    </main>
  );
}
