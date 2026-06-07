// src/pages/LoginPage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function LoginPage() {
  const navigate = useNavigate();

  /* ================= FORM ================= */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ================= HELPERS ================= */

  const isValidEmail = (
    value: string
  ) =>
    /\S+@\S+\.\S+/.test(value);

  /* ================= LOGIN ================= */

  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError(
        "Please enter your email."
      );
      return;
    }

    if (!isValidEmail(email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!password.trim()) {
      setError(
        "Please enter your password."
      );
      return;
    }

    try {
      setLoading(true);

      /*
        TEMP AUTH FLOW

        Future:
        backend auth
        JWT
        Google auth
        Apple auth
      */

      localStorage.setItem(
        "sfz_logged_in",
        "true"
      );

      localStorage.setItem(
        "sfz_user_email",
        email
      );

      navigate("/soccer");

    } catch (err) {
      setError(
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= ROUTING ================= */

  const goToForgotPassword = () => {
  navigate("/support");
};

  const goToRestorePurchase = () => {
    navigate("/restore-purchase");
  };

  const goToWelcome = () => {
    navigate("/soccer/welcome");
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
            MEMBER LOGIN
          </div>

          <h1>
            Welcome Back
            Football Fan
          </h1>

          <p>
            Sign in to continue your
            international football experience
            across matches, stadiums,
            rankings, media and tournament intelligence.
          </p>
        </div>
      </section>

      {/* ================= LOGIN FORM ================= */}

      <main className={styles.content}>
        <section className={styles.card}>
          <h2>
            Account Login
          </h2>

          <p className={styles.subtitle}>
            Access your football platform account.
          </p>

          {/* EMAIL */}

          <div className={styles.field}>
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              placeholder="you@example.com"
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

            <div className={styles.passwordWrap}>
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                placeholder="Enter password"
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className={styles.input}
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </button>
            </div>
          </div>

          {/* FORGOT */}

          <button
            className={styles.linkButton}
            onClick={goToForgotPassword}
          >
            Account Recovery
          </button>

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
              onClick={handleLogin}
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

            <button
              className={styles.secondaryButton}
              onClick={goToWelcome}
            >
              ← Back To Welcome
            </button>
          </div>
        </section>

        {/* ================= SUPPORT ================= */}

        <section className={styles.supportGrid}>
          {/* RESTORE */}

          <div className={styles.supportCard}>
            <h3>
              Restore Existing Purchase
            </h3>

            <p>
              Recover previously purchased
              access across supported devices
              and billing systems.
            </p>

            <button
              className={styles.supportButton}
              onClick={
                goToRestorePurchase
              }
            >
              Restore Purchase
            </button>
          </div>

          {/* SECURITY */}

          <div className={styles.supportCard}>
            <h3>
              Secure Platform Access
            </h3>

            <p>
              Your account information and
              platform access are protected
              through secure authentication systems.
            </p>
          </div>
        </section>

        {/* FOOTER */}

        <footer className={styles.footer}>
          International Soccer Fans Zone
          is an independent football platform
          built for global supporters worldwide.
        </footer>
      </main>
    </section>
  );
}