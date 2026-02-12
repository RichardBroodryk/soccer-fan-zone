import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./MatchdayJourneysPage.module.css";

import heroImage from "../assets/images/raz/match-day-journey.png";

/* CARD IMAGES */
import plannerImg from "../assets/images/raz/match-day-planner.png";
import ticketsImg from "../assets/images/raz/tickets-page.png";
import flightsImg from "../assets/images/raz/flights-page.png";
import hotelsImg from "../assets/images/raz/hotels-page.png";
import transportImg from "../assets/images/raz/transport-page.png";

export default function MatchdayJourneysPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stadiumSlug = searchParams.get("stadium");

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
          <h1>Matchday Journeys</h1>
          <p>
            Plan the full rhythm of attending a live rugby match —
            <br />
            from preparation to arrival.
          </p>

          {stadiumSlug && (
            <p className={styles.contextNote}>
              Planning a matchday at this stadium
            </p>
          )}
        </div>
      </header>

      {/* ================= PRIMARY ================= */}
      <section className={styles.primary}>
        <div
          className={styles.primaryCard}
          style={{ backgroundImage: `url(${plannerImg})` }}
          onClick={() => go("/matchday-planner")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardGlass}>
            <h3>Matchday Planner</h3>
            <p>
              Coordinate timing, logistics, and key moments
              around your entire matchday.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECONDARY ================= */}
      <section className={styles.secondary}>
        <div
          className={styles.hubCard}
          style={{ backgroundImage: `url(${ticketsImg})` }}
          onClick={() => go("/tickets")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardGlass}>
            <h4>Tickets</h4>
            <p>Official match access and seating.</p>
          </div>
        </div>

        <div
          className={styles.hubCard}
          style={{ backgroundImage: `url(${flightsImg})` }}
          onClick={() => go("/flights")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardGlass}>
            <h4>Flights</h4>
            <p>International and domestic travel.</p>
          </div>
        </div>

        <div
          className={styles.hubCard}
          style={{ backgroundImage: `url(${hotelsImg})` }}
          onClick={() => go("/hotels")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardGlass}>
            <h4>Hotels</h4>
            <p>Accommodation near the stadium.</p>
          </div>
        </div>

        <div
          className={styles.hubCard}
          style={{ backgroundImage: `url(${transportImg})` }}
          onClick={() => go("/transport")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardGlass}>
            <h4>Local Transport</h4>
            <p>Getting to and from the venue.</p>
          </div>
        </div>
      </section>

      {/* ================= CONTEXT ================= */}
      <section className={styles.context}>
        <p>
          Matchday Journeys focuses on movement, timing, and
          presence — reducing noise and replacing it with
          clarity, so supporters arrive prepared and unhurried.
        </p>
      </section>
    </main>
  );
}
