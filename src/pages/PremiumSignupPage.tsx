import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PremiumSignupPage.module.css";
import { registerUser, loginUser } from "../services/auth";

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
  "Scotland",
  "Wales",
  "Spain",
  "Portugal",
  "Namibia",
  "Zimbabwe",
  "Other",
];

export default function PremiumSignupPage() {
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!country) {
      setError("Please select your country to continue.");
      return;
    }

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser(email, password);
      await loginUser(email, password);

      navigate("/terms", {
        state: {
          tier: "premium",
          country,
          pricing: {
            label: "$2.49 / month",
            amount: "2.49",
          },
          email,
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Signup failed";
      setError(message);
    } finally {
      setLoading(false);
    }
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
        {/* WHAT’S INCLUDED */}
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

        {/* SUBSCRIPTION TERMS */}
        <div className={styles.block}>
          <h2>Subscription Terms</h2>
          <ul>
            <li>Billed monthly</li>
            <li>No free trial</li>
            <li>Cancel anytime before renewal</li>
          </ul>
        </div>

        {/* EMAIL + PASSWORD */}
        <div className={styles.block}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.select}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.select}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {/* COUNTRY */}
        <div className={styles.block}>
          <label className={styles.label}>Select your country</label>
          <select
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

        {/* 🔥 FIXED PRICING (BOTTOM — MATCHES SUPER) */}
        <div className={styles.pricingBox}>
          <p className={styles.price}>$2.49 / month</p>
          <p className={styles.billing}>Billed monthly</p>
          <p className={styles.psychology}>
            Low monthly cost. Built for everyday rugby fans.
          </p>
        </div>
      </section>

      {/* CTA */}
      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading
            ? "Creating account..."
            : "Proceed to Subscription Terms"}
        </button>
      </footer>
    </section>
  );
}