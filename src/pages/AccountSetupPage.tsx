// src/pages/AccountSetupPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountSetupPage.module.css";
import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";
import { registerUser } from "../services/auth";
import { saveUser } from "../services/userService";
import {
  setSubscriptionStatus,
} from "../services/subscriptionService";

export default function AccountSetupPage() {
  const navigate = useNavigate();

  /* ================= FORM STATE ================= */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [country, setCountry] =
    useState("");

  const [accepted, setAccepted] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* ================= HELPERS ================= */

  const isValidEmail = (
    value: string
  ) =>
    /\S+@\S+\.\S+/.test(value);

  /* ================= ROUTING ================= */

  const goToCheckout = async () => {
    setError("");
    setLoading(true);

    /* EMAIL */
    if (!email.trim()) {
      setLoading(false);
      setError("Please enter your email.");
      return;
    }

    if (!isValidEmail(email)) {
      setLoading(false);
      setError("Please enter a valid email address.");
      return;
    }

    /* PASSWORD */
    if (!password.trim()) {
      setLoading(false);
      setError("Please create a password.");
      return;
    }

    if (password.length < 6) {
      setLoading(false);
      setError("Password must be at least 6 characters.");
      return;
    }

    /* CONFIRM */
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    /* COUNTRY */
    if (!country) {
      setLoading(false);
      setError("Please select your country.");
      return;
    }

    /* TERMS */
    if (!accepted) {
      setLoading(false);
      setError("You must accept the terms to continue.");
      return;
    }

    try {
      const result = await registerUser(email, password);
      
      saveUser(
        String(result.userId),
        String(result.email),
        String(result.token)
      );

      /*
        Every newly created account
        starts here until payment
        is completed.
      */
      setSubscriptionStatus(
        "PENDING"
      );
      
      setLoading(false);
      navigate("/checkout");
      
    } catch (err: any) {
      setLoading(false);
      console.error("REGISTER ERROR:", err);
      setError(err?.message || "Account creation failed.");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRestorePurchase = () => {
    navigate("/restore-purchase");
  };

  const goBack = () => {
    navigate("/terms");
  };

  return (
    <section className={styles.page}>
      {/* ================= HERO ================= */}

      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <div className={styles.badge}>
            ACCOUNT SETUP
          </div>

          <h1>
            Create Your Global
            Football Account
          </h1>

          <p>
            Set up your secure account
            to continue into platform
            checkout and unlock the
            complete international football experience.
          </p>
        </div>
      </section>

      {/* ================= FORM ================= */}

      <main className={styles.content}>
        <section className={styles.card}>
          <h2>
            Account Information
          </h2>

          <p className={styles.subtitle}>
            Your account allows access
            across supported devices,
            purchase recovery and future
            football platform features.
          </p>

          {/* EMAIL */}

          <div className={styles.field}>
            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value.toLowerCase()
                )
              }
              className={styles.input}
            />
          </div>

          {/* PASSWORD */}

          <div className={styles.field}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className={styles.input}
            />
          </div>

          {/* CONFIRM PASSWORD */}

          <div className={styles.field}>
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className={styles.input}
            />
          </div>

          {/* COUNTRY */}

          <div className={styles.field}>
            <label>Country</label>

            <select
              value={country}
              onChange={(e) =>
                setCountry(
                  e.target.value
                )
              }
              className={styles.select}
            >
              <option value="">
                Select Country
              </option>

              <option value="South Africa">
                South Africa
              </option>

              <option value="United States">
                United States
              </option>

              <option value="United Kingdom">
                United Kingdom
              </option>

              <option value="Canada">
                Canada
              </option>

              <option value="Australia">
                Australia
              </option>

              <option value="Germany">
                Germany
              </option>

              <option value="France">
                France
              </option>

              <option value="Brazil">
                Brazil
              </option>

              <option value="Argentina">
                Argentina
              </option>

              <option value="Japan">
                Japan
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* CONSENT */}

          <div className={styles.checkboxWrap}>
            <input
              type="checkbox"
              checked={accepted}
              onChange={() =>
                setAccepted(!accepted)
              }
            />

            <span>
              I agree to the Terms,
              Privacy Policy and
              secure platform access conditions.
            </span>
          </div>

          {/* ERROR */}

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {/* CTA */}

          <div className={styles.buttonGroup}>
            <button
              className={styles.primaryButton}
              onClick={goToCheckout}
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Continue To Secure Checkout"}
            </button>

            <button
              className={styles.secondaryButton}
              onClick={goBack}
            >
              ← Back To Terms
            </button>
          </div>
        </section>

        {/* ================= ACCOUNT OPTIONS ================= */}

        <section className={styles.optionsSection}>
          <div className={styles.optionCard}>
            <h3>
              Already Have An Account?
            </h3>

            <p>
              Existing members can sign in
              directly and continue to the
              football platform.
            </p>

            <button
              className={styles.optionButton}
              onClick={goToLogin}
            >
              Login
            </button>
          </div>

          <div className={styles.optionCard}>
            <h3>
              Restore Existing Purchase
            </h3>

            <p>
              Recover previously purchased
              access through supported
              billing systems.
            </p>

            <button
              className={styles.optionButton}
              onClick={
                goToRestorePurchase
              }
            >
              Restore Purchase
            </button>
          </div>
        </section>

        {/* ================= LEGAL ================= */}

        <footer className={styles.footer}>
          Secure account setup and billing
          are protected through supported
          authentication and payment systems.
        </footer>
      </main>
    </section>
  );
}