import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SuperPremiumSignupPage.module.css";

/**
 * SUPER PREMIUM COMMITMENT PAGE
 * Highest tier — ad-free, editorial-first access
 * No access granted here
 */

type Pricing = {
  label: string;
  amount: string;
  currencyNote?: string;
};

function resolveSuperPrice(country: string): Pricing {
  switch (country) {
    case "South Africa":
      return { label: "R 29.99 / month", amount: "29.99" };
    case "Argentina":
      return { label: "ARS 999 / month", amount: "999" };
    case "New Zealand":
      return { label: "NZ$ 5.99 / month", amount: "5.99" };
    case "Australia":
      return { label: "A$ 5.99 / month", amount: "5.99" };
    case "United Kingdom":
      return { label: "£2.99 / month", amount: "2.99" };
    case "Ireland":
    case "France":
      return { label: "€3.49 / month", amount: "3.49" };
    case "Japan":
      return { label: "¥399 / month", amount: "399" };
    case "United States":
      return { label: "$3.99 / month", amount: "3.99" };
    case "Fiji":
    case "Samoa":
    case "Georgia":
      return { label: "$1.99 / month", amount: "1.99" };
    default:
      return {
        label: "$3.99 / month",
        amount: "3.99",
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

export default function SuperPremiumSignupPage() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const pricing = country ? resolveSuperPrice(country) : null;

  const proceedToTerms = () => {
    if (!country) {
      setError("Please select your country to continue.");
      return;
    }

    navigate("/terms", {
      state: {
        tier: "super",
        country,
        pricing,
      },
    });
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Super Premium Access</h1>
        <p className={styles.subtitle}>
          For supporters who want the most complete, uninterrupted
          Rugby Anthem Zone experience — focused on heritage,
          history, and the deeper story of the game.
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.block}>
          <h2>What’s Included</h2>
          <ul>
            <li>Everything in Premium</li>
            <li>Completely ad-free experience</li>
            <li>Full access to Heritage content</li>
            <li>Full access to Defining Moments</li>
            <li>Deep editorial focus across the platform</li>
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
              A small monthly commitment for the most complete,
              distraction-free experience.
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

        <p className={styles.premiumHint}>
          Prefer a lighter experience with reduced advertising?
          Premium offers full match coverage at a lower monthly cost.
        </p>
      </footer>
    </section>
  );
}
