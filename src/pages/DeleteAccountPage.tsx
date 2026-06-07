// src/pages/DeleteAccountPage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./DeleteAccountPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function DeleteAccountPage() {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [confirmText, setConfirmText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  /* ================= DELETE ================= */

  const handleDelete = async () => {
    setError("");
    setSuccess("");

    if (
      confirmText !== "DELETE"
    ) {
      setError(
        'Please type "DELETE" to confirm.'
      );
      return;
    }

    try {
      setLoading(true);

      /*
        FUTURE:
        Backend account deletion
        GDPR deletion requests
        Billing unlink
        Auth cleanup
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1800)
      );

      localStorage.removeItem(
        "sfz_logged_in"
      );

      localStorage.removeItem(
        "sfz_user_email"
      );

      setSuccess(
        "Your account deletion request has been submitted successfully."
      );

    } catch (err) {
      setError(
        "Unable to process account deletion."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= ROUTING ================= */

  const goBack = () => {
    navigate("/account/settings");
  };

  const goToSupport = () => {
    navigate("/support");
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
            ACCOUNT REMOVAL
          </div>

          <h1>
            Delete Your
            Football Platform Account
          </h1>

          <p>
            Submit a request to permanently
            remove your International Soccer Fans Zone
            account and associated platform access.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className={styles.content}>
        {/* WARNING */}

        <section className={styles.warningCard}>
          <h2>
            Important Information
          </h2>

          <ul>
            <li>
              Account deletion may permanently
              remove access to football platform features.
            </li>

            <li>
              Certain account information may
              be retained temporarily where
              required for legal, billing or
              security purposes.
            </li>

            <li>
              Purchase recovery and access restoration
              may no longer be available after deletion.
            </li>

            <li>
              This action should only be completed
              if you fully understand the consequences
              of account removal.
            </li>
          </ul>
        </section>

        {/* DELETE FORM */}

        <section className={styles.card}>
          <h2>
            Confirm Account Deletion
          </h2>

          <p className={styles.subtitle}>
            To continue, type
            <strong> DELETE </strong>
            below.
          </p>

          {/* INPUT */}

          <div className={styles.field}>
            <label>
              Confirmation
            </label>

            <input
              type="text"
              value={confirmText}
              placeholder='Type "DELETE"'
              onChange={(e) =>
                setConfirmText(
                  e.target.value
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
              className={styles.dangerButton}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : "Delete Account"}
            </button>

            <button
              className={styles.secondaryButton}
              onClick={goBack}
            >
              ← Cancel
            </button>
          </div>
        </section>

        {/* SUPPORT */}

        <section className={styles.supportCard}>
          <h3>
            Need Help Instead?
          </h3>

          <p>
            Contact support if you are
            experiencing login, billing,
            account or football platform issues.
          </p>

          <button
            className={styles.supportButton}
            onClick={goToSupport}
          >
            Contact Support
          </button>
        </section>

        {/* FOOTER */}

        <footer className={styles.footer}>
          International Soccer Fans Zone
          respects user privacy and account
          management rights across supported platforms.
        </footer>
      </main>
    </section>
  );
}