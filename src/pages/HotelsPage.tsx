import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./HotelsPage.module.css";
import heroImage from "../assets/images/raz/hotels-page.png";

import { stadiums } from "../data/stadiums";
import {
  hotelsByStadium,
  StadiumHotels,
  Hotel,
} from "../data/hotelsByStadium";

import Flag from "../components/images/Flag";

/* ================= HELPERS ================= */

function toFlagKey(country: string) {
  return country.toLowerCase().replace(/\s+/g, "-");
}

/* ================= PAGE ================= */

export default function HotelsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const stadiumSlug = searchParams.get("stadium");
  const stadium = stadiumSlug
    ? stadiums.find((s) => s.slug === stadiumSlug)
    : null;

  const visibleStadiums = stadium
    ? hotelsByStadium.filter((s) => s.stadiumSlug === stadium.slug)
    : hotelsByStadium;

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
          <h1>Hotels & Accommodation</h1>
          <p>
            Stadium-centric accommodation commonly used
            <br />
            by rugby supporters worldwide.
          </p>
        </div>
      </header>

      {/* ================= BACK (MATCHDAY PLANNER) ================= */}
      <div className={styles.backWrap}>
        <button className={styles.back} onClick={backToPlanner}>
          ← Back to Matchday Planner
        </button>
      </div>

      {/* ================= CONTEXT ================= */}
      {stadium && (
        <section className={styles.section}>
          <div className={styles.contextBanner}>
            <p>
              Viewing accommodation near{" "}
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
          <h2>Where supporters stay</h2>
          <p>
            This guide highlights accommodation near Tier-1 rugby
            stadiums — prioritising walkability, transport access,
            and matchday atmosphere.
          </p>
        </div>
      </section>

      {/* ================= STADIUM GRID ================= */}
      <section className={styles.section}>
        <h2>Accommodation by stadium</h2>
        <p className={styles.sub}>
          Listings are stadium-specific and intended for matchday
          planning. All bookings are completed on external platforms.
        </p>

        <div className={styles.grid}>
          {visibleStadiums.map((stadiumGroup: StadiumHotels) => (
            <div
              key={stadiumGroup.stadiumSlug}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <div className={styles.stadium}>
                  <Flag
                    country={toFlagKey(stadiumGroup.country)}
                  />
                  <div>
                    <h3>{stadiumGroup.stadiumName}</h3>
                    <span>
                      {stadiumGroup.city},{" "}
                      {stadiumGroup.country}
                    </span>
                  </div>
                </div>
                <span className={styles.count}>
                  {stadiumGroup.hotels.length > 0
                    ? `${stadiumGroup.hotels.length} option${
                        stadiumGroup.hotels.length > 1
                          ? "s"
                          : ""
                      }`
                    : "Pending"}
                </span>
              </div>

              {stadiumGroup.notes && (
                <p className={styles.notes}>
                  {stadiumGroup.notes}
                </p>
              )}

              <ul className={styles.hotels}>
                {stadiumGroup.hotels.length > 0 ? (
                  stadiumGroup.hotels.map((hotel: Hotel) => (
                    <li key={hotel.name}>
                      <strong>{hotel.name}</strong>
                      <span className={styles.meta}>
                        {hotel.distanceNote}
                      </span>
                      {hotel.fanNote && (
                        <span className={styles.fanNote}>
                          {hotel.fanNote}
                        </span>
                      )}
                      <button
                        className={styles.action}
                        onClick={() => {
                          const url = hotel.affiliate
                            ? `${hotel.bookingUrl}?aid=rugbyanthem`
                            : hotel.bookingUrl;
                          window.open(
                            url,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                      >
                        View availability →
                      </button>
                    </li>
                  ))
                ) : (
                  <li className={styles.pending}>
                    Accommodation listings to be confirmed
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
