// src/pages/RestorePurchasePage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./RestorePurchasePage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function RestorePurchasePage() {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  /* ================= HELPERS ================= */

  const isValidEmail = (
    value: string
  ) =>
    /\S+@\S+\.\S+/.test(value);

  /* ================= RESTORE ================= */

  const handleRestore = async () => {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (!isValidEmail(email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setLoading(true);

      /*
        FUTURE BILLING SYSTEMS:

        Google Play Billing
        Apple IAP
        Receipt validation
        Purchase recovery APIs
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1400)
      );

      setSuccess(
        "Purchase restoration request submitted successfully."
      );

    } catch (err) {
      setError(
        "Unable to restore purchase. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= ROUTING ================= */

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSupport = () => {
    navigate("/support");
  };

  const goBack = () => {
    navigate("/account-setup");
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
            PURCHASE RECOVERY
          </div>

          <h1>
            Restore Your
            Football Platform Access
          </h1>

          <p>
            Recover previously purchased
            access across supported devices
            and official billing platforms.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className={styles.content}>
        {/* RESTORE CARD */}

        <section className={styles.card}>
          <h2>
            Restore Existing Purchase
          </h2>

          <p className={styles.subtitle}>
            Enter the email associated with
            your football platform account
            to recover eligible purchases.
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

          {/* SUCCESS */}

          {success && (
            <div className={styles.success}>
              {success}
            </div>
          )}

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
              onClick={handleRestore}
              disabled={loading}
            >
              {loading
                ? "Restoring..."
                : "Restore Purchase"}
            </button>

            <button
              className={styles.secondaryButton}
              onClick={goBack}
            >
              ← Back
            </button>
          </div>
        </section>

        {/* SUPPORT */}

        <section className={styles.supportGrid}>
          {/* LOGIN */}

          <div className={styles.supportCard}>
            <h3>
              Already Have Access?
            </h3>

            <p>
              Existing football platform
              members can sign in directly.
            </p>

            <button
              className={styles.supportButton}
              onClick={goToLogin}
            >
              Login
            </button>
          </div>

          {/* SUPPORT */}

          <div className={styles.supportCard}>
            <h3>
              Need Assistance?
            </h3>

            <p>
              Contact support for account,
              billing or platform recovery assistance.
            </p>

            <button
              className={styles.supportButton}
              onClick={goToSupport}
            >
              Contact Support
            </button>
          </div>
        </section>

        {/* LEGAL */}

        <footer className={styles.footer}>
          Purchase recovery availability
          may depend on supported billing
          providers, platform systems
          and account verification.
        </footer>
      </main>
    </section>
  );
}