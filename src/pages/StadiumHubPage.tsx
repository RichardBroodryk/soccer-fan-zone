import { useNavigate } from "react-router-dom";
import styles from "./StadiumHubPage.module.css";

import { stadiums } from "../data/stadiums";

/* ================= HERO IMAGE ================= */

import heroImage from "../assets/images/stadiums/capetown-stadium.jpg";

/* ================= STADIUM IMAGES ================= */

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

export default function StadiumHubPage() {
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
          <h1>Rugby Stadiums</h1>
          <p>
            Explore the great rugby venues of the world —
            <br />
            each with its own history, atmosphere, and matchday rhythm.
          </p>
        </div>
      </header>

      {/* ================= GRID ================= */}
      <section className={styles.grid}>
        {stadiums.map((stadium) => {
          const image = stadiumImages[stadium.slug];

          return (
            <div
              key={stadium.slug}
              className={styles.card}
              style={{
                backgroundImage: image ? `url(${image})` : undefined,
              }}
              onClick={() =>
                navigate(`/stadium/${stadium.slug}`)
              }
            >
              <div className={styles.overlay} />
              <div className={styles.cardContent}>
                <h3>{stadium.name}</h3>
                <p>
                  {stadium.city
                    ? `${stadium.city}, `
                    : ""}
                  {stadium.country}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
