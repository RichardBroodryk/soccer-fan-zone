// src/pages/SuperPremiumSignupPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FreemiumSignupPage.module.css";
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

export default function SuperPremiumSignupPage() {
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async () => {
    if (!country) {
      setError("Please select your country to continue.");
      return;
    }

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ✅ Register + login
      await registerUser(email, password);
      await loginUser(email, password);

      // ✅ Navigate to Terms with SUPER pricing
      navigate("/terms", {
        state: {
          tier: "super",
          country,
          pricing: {
            label: "$3.49 / month",
            amount: "3.49",
          },
          email,
        },
      });

    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Signup failed";

      if (message.toLowerCase().includes("exists")) {
        setError("Email already registered.");
      } else {
        setError("Signup failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Super Premium Access</h1>
        <p className={styles.subtitle}>
          The ultimate Rugby Anthem Zone experience with full feature access.
        </p>
      </header>

      <section className={styles.content}>
        {/* FEATURES */}
        <div className={styles.block}>
          <h2>What’s Included</h2>
          <ul>
            <li>Everything in Premium</li>
            <li>Full access to all advanced features</li>
            <li>Early access to new releases</li>
            <li>Priority support</li>
          </ul>
        </div>

        {/* INFO */}
        <div className={styles.block}>
          <h2>Billing</h2>
          <p>
            Super Premium is billed monthly and can be cancelled anytime.
          </p>
        </div>

        {/* EMAIL + PASSWORD */}
        <div className={styles.block}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.select}
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder="you@example.com"
          />

          <label className={styles.label}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.select}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ paddingRight: "50px" }}
            />

            {/* 👁 TEMP BUTTON */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#222",
                color: "#fff",
                border: "none",
                padding: "4px 8px",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
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

        {/* PRICING */}
        <div className={styles.pricingBox}>
          <p className={styles.price}>$3.49 / month</p>
          <p className={styles.psychology}>
            Cancel anytime. Full access to all features.
          </p>
        </div>
      </section>

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