import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./FlightsPage.module.css";
import heroImage from "../assets/images/raz/flights-page.png";

import { stadiums } from "../data/stadiums";
import {
  flightPartnersByNation,
  NationFlights,
  FlightPartner,
} from "../data/flightPartnersByNation";

import Flag from "../components/images/Flag";

/* ================= HELPERS ================= */

function toFlagKey(nation: string) {
  return nation.toLowerCase().replace(/\s+/g, "-");
}

/* ================= PAGE ================= */

export default function FlightsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const stadiumSlug = searchParams.get("stadium");
  const stadium = stadiumSlug
    ? stadiums.find((s) => s.slug === stadiumSlug)
    : null;

  const backToPlanner = () =>
    stadiumSlug
      ? navigate(`/matchday-planner?stadium=${stadiumSlug}`)
      : navigate("/matchday-planner");

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Flights</h1>
          <p>
            Identify credible air routes and carriers
            <br />
            when planning international match travel.
          </p>
        </div>
      </header>

      {/* ================= BACK (MATCHDAY PLANNER) ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={backToPlanner}
        >
          ← Back to Matchday Planner
        </button>
      </div>

      {/* ================= CONTEXT ================= */}
      {stadium && (
        <section className={styles.section}>
          <div className={styles.contextBanner}>
            <p>
              Planning travel for matches at{" "}
              <strong>{stadium.name}</strong>
              {stadium.city && `, ${stadium.city}`}.
            </p>
            <button
              className={styles.contextLink}
              onClick={backToPlanner}
            >
              Back to matchday planning →
            </button>
          </div>
        </section>
      )}

      {/* ================= GUIDANCE ================= */}
      <section className={styles.section}>
        <div className={styles.guidance}>
          <h2>Travel guidance</h2>
          <p>
            Supporters may book directly with airlines or use
            trusted global booking platforms. Routes, availability,
            and pricing vary by origin, destination, and match timing.
          </p>
        </div>
      </section>

      {/* ================= PARTNERS ================= */}
      <section className={styles.section}>
        <h2>Airlines & booking platforms by nation</h2>
        <p className={styles.sub}>
          Listed partners are commonly used by rugby supporters.
          All bookings are completed on external platforms.
        </p>

        <div className={styles.grid}>
          {flightPartnersByNation.map((nation: NationFlights) => (
            <div key={nation.nation} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.nation}>
                  <Flag country={toFlagKey(nation.nation)} />
                  <h3>{nation.nation}</h3>
                </div>
                <span className={styles.count}>
                  {nation.partners.length > 0
                    ? `${nation.partners.length} option${
                        nation.partners.length > 1 ? "s" : ""
                      }`
                    : "Pending"}
                </span>
              </div>

              {nation.notes && (
                <p className={styles.notes}>{nation.notes}</p>
              )}

              <ul className={styles.partners}>
                {nation.partners.length > 0 ? (
                  nation.partners.map((partner: FlightPartner) => (
                    <li key={partner.name}>
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {partner.name}
                      </a>
                      <span className={styles.partnerType}>
                        {partner.type === "national-carrier"
                          ? "National carrier"
                          : partner.type === "regional-carrier"
                          ? "Regional carrier"
                          : partner.type === "global-carrier"
                          ? "Global carrier"
                          : "Booking platform"}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className={styles.pending}>
                    Official partners to be confirmed
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
