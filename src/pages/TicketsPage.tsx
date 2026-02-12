import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./TicketsPage.module.css";
import heroImage from "../assets/images/raz/tickets-page.png";

import { stadiums } from "../data/stadiums";
import {
  ticketSellersByNation,
  NationTicketing,
  TicketSeller,
} from "../data/ticketSellersByNation";

import Flag from "../components/images/Flag";

/* ================= PAGE ================= */

export default function TicketsPage() {
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
          <h1>Tickets</h1>
          <p>
            Find official rugby ticket platforms worldwide.
            <br />
            Choose your country. Buy with confidence.
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

      {/* ================= STADIUM CONTEXT ================= */}
      {stadium && (
        <section className={styles.section}>
          <div className={styles.contextBanner}>
            <p>
              Planning attendance at{" "}
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

      {/* ================= HOW IT WORKS ================= */}
      <section className={styles.section}>
        <div className={styles.principle}>
          <h2>How ticketing works</h2>
          <p>
            Rugby Anthem Zone connects supporters to
            official rugby ticket platforms across the world.
            When you follow a verified link from this page,
            your journey is recognised — and may contribute
            to loyalty rewards in later phases.
          </p>
        </div>
      </section>

      {/* ================= NATIONS ================= */}
      <section className={styles.section}>
        <h2>Official Ticket Sellers by Nation</h2>
        <p className={styles.sub}>
          Supporters may purchase tickets from platforms
          in their home country or the host nation —
          regardless of tier.
        </p>

        <div className={styles.nations}>
          {ticketSellersByNation.map((nation: NationTicketing) => (
            <div key={nation.nation} className={styles.nationRow}>
              <div className={styles.nationInfo}>
                <div className={styles.nationHeader}>
                  <Flag country={nation.nation} />
                  <strong>{nation.nation}</strong>
                </div>

                {nation.notes && (
                  <span className={styles.meta}>
                    {nation.notes}
                  </span>
                )}
              </div>

              <ul className={styles.sellers}>
                {nation.sellers.length > 0 ? (
                  nation.sellers.map(
                    (seller: TicketSeller) => (
                      <li key={seller.name}>
                        <a
                          href={seller.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {seller.name}
                        </a>
                        <span className={styles.sellerType}>
                          {seller.type === "federation"
                            ? "Official union"
                            : seller.type === "primary"
                            ? "Primary ticket partner"
                            : "Authorised resale"}
                        </span>
                      </li>
                    )
                  )
                ) : (
                  <li className={styles.pending}>
                    Official ticket partners to be confirmed
                  </li>
                )}
              </ul>

              <span className={styles.externalNote}>
                Purchases complete on external platforms
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LOYALTY ================= */}
      <section className={styles.section}>
        <div className={styles.loyalty}>
          <h2>Plan here. Buy there. Earn here.</h2>
          <p>
            When you use official outbound links from
            Rugby Anthem Zone, your support is recognised.
            Loyalty rewards are designed to honour
            commitment — not to pressure purchases.
          </p>
        </div>
      </section>
    </main>
  );
}
