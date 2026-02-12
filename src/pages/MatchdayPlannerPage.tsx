import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./MatchdayPlannerPage.module.css";
import heroImage from "../assets/images/raz/match-day-planner.png";

import ticketsImg from "../assets/images/raz/tickets-page.png";
import flightsImg from "../assets/images/raz/flights-page.png";
import hotelsImg from "../assets/images/raz/hotels-page.png";
import transportImg from "../assets/images/raz/transport-page.png";

import { stadiums } from "../data/stadiums";

export default function MatchdayPlannerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const stadiumSlug = searchParams.get("stadium");
  const stadium = stadiumSlug
    ? stadiums.find((s) => s.slug === stadiumSlug)
    : null;

  const go = (path: string) =>
    stadiumSlug
      ? navigate(`${path}?stadium=${stadiumSlug}`)
      : navigate(path);

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Matchday Planner</h1>
          <p>
            Organise tickets, travel, accommodation, and arrival
            <br />
            around your match — clearly and confidently.
          </p>
        </div>
      </header>

      {/* ================= CONTEXT ================= */}
      <section className={styles.context}>
        {stadium ? (
          <p>
            Planning a matchday at{" "}
            <strong>{stadium.name}</strong>
            {stadium.city && `, ${stadium.city}`}.
          </p>
        ) : (
          <p>
            Venue context will appear automatically when launched
            from a stadium or fixture.
          </p>
        )}
      </section>

      {/* ================= FEATURE GRID ================= */}
      <section className={styles.grid}>
        <div
          className={styles.featureCard}
          style={{ backgroundImage: `url(${ticketsImg})` }}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3>Secure Tickets</h3>
            <p>Confirm match access from official providers.</p>
            <button onClick={() => go("/tickets")}>
              Go to Tickets →
            </button>
          </div>
        </div>

        <div
          className={styles.featureCard}
          style={{ backgroundImage: `url(${flightsImg})` }}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3>Plan Travel</h3>
            <p>Choose flights or long-distance transport.</p>
            <button onClick={() => go("/flights")}>
              View Flights →
            </button>
          </div>
        </div>

        <div
          className={styles.featureCard}
          style={{ backgroundImage: `url(${hotelsImg})` }}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3>Book Accommodation</h3>
            <p>Stay close to the stadium or city access.</p>
            <button onClick={() => go("/hotels")}>
              Browse Hotels →
            </button>
          </div>
        </div>

        <div
          className={styles.featureCard}
          style={{ backgroundImage: `url(${transportImg})` }}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <h3>Matchday Transport</h3>
            <p>Understand local transport and arrival timing.</p>
            <button onClick={() => go("/transport")}>
              Local Transport →
            </button>
          </div>
        </div>
      </section>

      {/* ================= FUTURE ================= */}
      <section className={styles.future}>
        <h2>What Comes Next</h2>
        <p>
          Venue maps, walking routes, kick-off reminders,
          and matchday alerts will unlock here as the
          experience evolves.
        </p>
      </section>
    </main>
  );
}
