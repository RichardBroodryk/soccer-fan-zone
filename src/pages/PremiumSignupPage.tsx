import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PremiumSignupPage.module.css";

/**
 * PREMIUM COMMITMENT PAGE
 * Paid subscription — nation-aware pricing
 * No access granted here
 */

type Pricing = {
  label: string;
  amount: string;
  currencyNote?: string;
};

function resolvePremiumPrice(country: string): Pricing {
  switch (country) {
    case "South Africa":
      return { label: "R 19.99 / month", amount: "19.99" };
    case "Argentina":
      return { label: "ARS 499 / month", amount: "499" };
    case "New Zealand":
      return { label: "NZ$ 2.99 / month", amount: "2.99" };
    case "Australia":
      return { label: "A$ 2.99 / month", amount: "2.99" };
    case "United Kingdom":
      return { label: "£1.49 / month", amount: "1.49" };
    case "Ireland":
    case "France":
      return { label: "€1.79 / month", amount: "1.79" };
    case "Japan":
      return { label: "¥199 / month", amount: "199" };
    case "United States":
      return { label: "$1.99 / month", amount: "1.99" };
    case "Fiji":
    case "Samoa":
    case "Georgia":
      return { label: "$0.99 / month", amount: "0.99" };
    default:
      return {
        label: "$1.99 / month",
        amount: "1.99",
        currencyNote: "Global pricing (USD)",
      };
  }
}

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
  "Fiji",
  "Samoa",
  "Georgia",
  "Other",
];

export default function PremiumSignupPage() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const pricing = country ? resolvePremiumPrice(country) : null;

  const proceedToTerms = () => {
    if (!country) {
      setError("Please select your country to continue.");
      return;
    }

    navigate("/terms", {
      state: {
        tier: "premium",
        country,
        pricing,
      },
    });
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Premium Access</h1>
        <p className={styles.subtitle}>
          Designed for regular rugby followers who want a cleaner,
          more complete way to follow the game.
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.block}>
          <h2>What’s Included</h2>
          <ul>
            <li>Full access to live scores, fixtures, and results</li>
            <li>Complete match centre and core statistics</li>
            <li>Match highlights (available after delay)</li>
            <li>Reduced and contextual advertising</li>
            <li>Cleaner, calmer browsing experience</li>
            <li>Single-device access</li>
          </ul>
        </div>

        <div className={styles.block}>
          <h2>Subscription Terms</h2>
          <ul>
            <li>Billed monthly</li>
            <li>No free trial</li>
            <li>Cancel anytime before renewal</li>
          </ul>
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

        {pricing && (
          <div className={styles.pricingBox}>
            <p className={styles.price}>{pricing.label}</p>
            {pricing.currencyNote && (
              <p className={styles.note}>{pricing.currencyNote}</p>
            )}
            <p className={styles.psychology}>
              Low monthly cost. Built for everyday rugby fans.
            </p>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={proceedToTerms}
        >
          Proceed to Subscription Terms
        </button>

        <p className={styles.superHint}>
          Looking for an ad-free experience and access to Heritage and
          Defining Moments? Super Premium is available for dedicated supporters.
        </p>
      </footer>
    </section>
  );
}
