import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./TransportPage.module.css";
import heroImage from "../assets/images/raz/transport-page.png";

import { stadiums } from "../data/stadiums";
import { transportProvidersByNation } from "../data/transportProvidersByNation";
import Flag from "../components/images/Flag";

/* ================= HELPERS ================= */

function flagCountryName(nation: string) {
  return nation.toLowerCase().replace(/\s+/g, "-");
}

/* ================= PAGE ================= */

export default function TransportPage() {
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
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroContent}>
          <h1>Transport</h1>
          <p>
            Trusted local transport guidance to help you
            <br />
            arrive smoothly and leave safely on match day.
          </p>
        </div>
      </section>

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
              Viewing transport guidance for{" "}
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

      {/* ================= TIPS ================= */}
      <section className={styles.section}>
        <div className={styles.tips}>
          <h2>Match Day Transport Tips</h2>
          <ul>
            <li>Arrive 2–3 hours before kickoff</li>
            <li>Expect congestion and pricing surges</li>
            <li>Use official pickup and drop-off zones</li>
            <li>Public transport is often the fastest exit</li>
            <li>Walking the final stretch is common</li>
          </ul>
        </div>
      </section>

      {/* ================= TRANSPORT OPTIONS ================= */}
      <section className={styles.section}>
        <h2>Transport Options by Nation</h2>
        <p className={styles.sub}>
          Curated transport providers commonly used by supporters.
          Availability varies by city and event.
        </p>

        <div className={styles.grid}>
          {transportProvidersByNation.map((nation) => (
            <div key={nation.nation} className={styles.card}>
              <div className={styles.cardHeader}>
                <Flag country={flagCountryName(nation.nation)} />
                <strong>{nation.nation}</strong>
              </div>

              <ul>
                {nation.providers.map((provider) => (
                  <li key={provider.name}>
                    <a
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.serviceLink}
                    >
                      {provider.name}
                    </a>
                    <span className={styles.note}>{provider.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
