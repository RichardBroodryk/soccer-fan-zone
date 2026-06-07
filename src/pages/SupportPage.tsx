// src/pages/SupportPage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./SupportPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function SupportPage() {
  const navigate = useNavigate();

  /* ================= FORM ================= */

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* ================= HELPERS ================= */

  const isValidEmail = (
    value: string
  ) =>
    /\S+@\S+\.\S+/.test(value);

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
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

    if (!message.trim()) {
      setError(
        "Please enter a support message."
      );
      return;
    }

    try {
      setLoading(true);

      /*
        FUTURE:
        backend ticketing
        support email system
        CRM integration
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1400)
      );

      setSuccess(
        "Your support request was submitted successfully."
      );

      setMessage("");

    } catch (err) {
      setError(
        "Unable to submit support request."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= ROUTING ================= */

  const goBack = () => {
    navigate("/account/settings");
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
            SUPPORT CENTER
          </div>

          <h1>
            Football Platform
            Support & Assistance
          </h1>

          <p>
            Contact International Soccer Fans Zone
            support for account access,
            billing assistance, purchase recovery
            and football platform help.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className={styles.content}>
        {/* SUPPORT TYPES */}

        <section className={styles.supportGrid}>
          <div className={styles.supportCard}>
            <h3>
              Account Assistance
            </h3>

            <p>
              Login issues, password recovery,
              account access and profile support.
            </p>
          </div>

          <div className={styles.supportCard}>
            <h3>
              Purchase Support
            </h3>

            <p>
              Billing questions, restore purchase,
              payment verification and access recovery.
            </p>
          </div>

          <div className={styles.supportCard}>
            <h3>
              Technical Support
            </h3>

            <p>
              Platform performance,
              football media playback,
              feature assistance and stability support.
            </p>
          </div>
        </section>

        {/* CONTACT FORM */}

        <section className={styles.formCard}>
          <h2>
            Contact Support
          </h2>

          <p className={styles.subtitle}>
            Submit your football platform
            support request below.
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

          {/* MESSAGE */}

          <div className={styles.field}>
            <label>Support Message</label>

            <textarea
              value={message}
              placeholder="Describe your issue..."
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              className={styles.textarea}
              rows={6}
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
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Support Request"}
            </button>

            <button
              className={styles.secondaryButton}
              onClick={goBack}
            >
              ← Back To Settings
            </button>
          </div>
        </section>

        {/* FOOTER */}

        <footer className={styles.footer}>
          International Soccer Fans Zone
          is an independent football platform
          built for supporters worldwide.
        </footer>
      </main>
    </section>
  );
}