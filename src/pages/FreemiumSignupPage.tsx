import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FreemiumSignupPage.module.css";

/**
 * FREEMIUM COMMITMENT PAGE
 * Permanent free access — advertising supported
 * No access granted here
 */

const COUNTRIES = [
  "South Africa",
  "Argentina",
  "Australia",
  "New Zealand",
  "United Kingdom",
  "Ireland",
  "France",
  "Japan",
  "United States",
  "Other",
];

export default function FreemiumSignupPage() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const proceedToTerms = () => {
    if (!country) {
      setError("Please select your country to continue.");
      return;
    }

    navigate("/terms", {
      state: {
        tier: "freemium",
        country,
      },
    });
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Freemium Access</h1>
        <p className={styles.subtitle}>
          Permanent free access to the essential Rugby Anthem Zone experience,
          supported by advertising.
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.block}>
          <h2>What’s Included</h2>
          <ul>
            <li>Live scores and match status</li>
            <li>Fixtures, results, and schedules</li>
            <li>Access to core match coverage</li>
            <li>Advertising-supported experience</li>
          </ul>
        </div>

        <div className={styles.block}>
          <h2>Important to Know</h2>
          <p>
            Freemium is not a trial. It is a permanently free tier designed
            for casual and regular followers who want reliable access to
            match information without a subscription.
          </p>
        </div>

        <div className={styles.block}>
          <label htmlFor="country" className={styles.label}>
            Select your country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setError("");
            }}
            className={styles.select}
          >
            <option value="">— Select country —</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c === "Other" ? "Other (Global)" : c}
              </option>
            ))}
          </select>

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.pricingBox}>
          <p className={styles.price}>Free</p>
          <p className={styles.psychology}>
            No payment required. Supported by advertising.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={proceedToTerms}
        >
          Continue to Terms
        </button>
      </footer>
    </section>
  );
}
