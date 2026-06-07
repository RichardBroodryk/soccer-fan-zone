// src/pages/TermsPage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./TermsPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function TermsPage() {
  const navigate = useNavigate();

  const [accepted, setAccepted] =
    useState(false);

  /* ================= ROUTING ================= */

  const goToAccountSetup = () => {
    if (!accepted) return;

    navigate("/account-setup");
  };

  const goBack = () => {
    navigate("/soccer/welcome");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToPrivacy = () => {
    navigate("/privacy-policy");
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
            GLOBAL FOOTBALL PLATFORM
          </div>

          <h1>
            Terms, Privacy &
            Platform Access
          </h1>

          <p>
            Please review the platform
            terms, purchase conditions,
            privacy usage and account
            policies before continuing
            into account setup and secure checkout.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className={styles.content}>
        {/* INTRO */}

        <section className={styles.card}>
          <h2>
            International Soccer Fans Zone
          </h2>

          <p>
            International Soccer Fans Zone
            is an independent football
            companion platform designed
            for global supporters,
            featuring immersive football
            experiences, tournament tracking,
            stadium systems, football media,
            podcasts, rankings, player analysis,
            AI projections and supporter culture.
          </p>
        </section>

        {/* PURCHASE */}

        <section className={styles.card}>
          <h2>
            Purchase & Platform Access
          </h2>

          <ul>
            <li>
              Platform access is available
              through a one-time purchase
              of $1.99 USD.
            </li>

            <li>
              Regional pricing and currency
              conversion are handled securely
              through official billing platforms.
            </li>

            <li>
              No recurring subscriptions
              are required for access.
            </li>

            <li>
              Platform features and experiences
              may evolve over time as the
              global football ecosystem expands.
            </li>

            <li>
              Purchase restoration is available
              through supported billing systems.
            </li>
          </ul>
        </section>

        {/* INDEPENDENT PLATFORM */}

        <section className={styles.card}>
          <h2>
            Independent Platform Notice
          </h2>

          <p>
            International Soccer Fans Zone
            is an independently developed
            football fan platform and is
            not affiliated with or endorsed by
            FIFA, UEFA, CAF, AFC, CONMEBOL,
            CONCACAF, OFC, football federations,
            clubs, broadcasters or tournament organizers.
          </p>
        </section>

        {/* MEDIA */}

        <section className={styles.card}>
          <h2>
            Media & External Content
          </h2>

          <ul>
            <li>
              Some platform experiences
              may reference third-party media,
              podcasts, creators,
              broadcasters and streaming services.
            </li>

            <li>
              Users remain responsible
              for access to external
              third-party content and
              regional streaming availability.
            </li>

            <li>
              External content ownership
              remains with its respective
              creators and publishers.
            </li>
          </ul>
        </section>

        {/* PRIVACY */}

        <section className={styles.card}>
          <h2>
            Privacy & User Data
          </h2>

          <ul>
            <li>
              Basic account information
              may be used for authentication,
              account recovery and
              platform personalization.
            </li>

            <li>
              Anonymous analytics may
              be used to improve
              platform performance and
              user experience.
            </li>

            <li>
              Personal information is
              never sold to advertisers
              or external marketing networks.
            </li>

            <li>
              Users may request account
              or data deletion through
              platform support channels.
            </li>
          </ul>
        </section>

        {/* USER CONDUCT */}

        <section className={styles.card}>
          <h2>
            User Conduct
          </h2>

          <ul>
            <li>
              Users may not redistribute,
              exploit, scrape, reverse-engineer
              or abuse platform systems.
            </li>

            <li>
              Automated extraction,
              unauthorized replication
              and malicious platform activity
              are prohibited.
            </li>

            <li>
              Platform access may be suspended
              for fraud, abuse or harmful activity.
            </li>
          </ul>
        </section>

        {/* CONSENT */}

        <section className={styles.consentSection}>
          <label className={styles.checkboxWrap}>
            <input
              type="checkbox"
              checked={accepted}
              onChange={() =>
                setAccepted(!accepted)
              }
            />

            <span>
              I agree to the Terms of Service,
              Privacy Policy and platform access conditions.
            </span>
          </label>
        </section>

        {/* CTA */}

        <section className={styles.ctaSection}>
          <button
            className={styles.primaryButton}
            onClick={goToAccountSetup}
            disabled={!accepted}
          >
            Accept & Continue
          </button>

          <button
            className={styles.secondaryButton}
            onClick={goBack}
          >
            ← Return To Welcome
          </button>
        </section>

        {/* SUPPORT LINKS */}

        <section className={styles.linksSection}>
          <button
            className={styles.linkButton}
            onClick={goToPrivacy}
          >
            Privacy Policy
          </button>

          <button
            className={styles.linkButton}
            onClick={goToLogin}
          >
            Existing Account Login
          </button>
        </section>

        {/* LEGAL FOOTER */}

        <footer className={styles.footer}>
          Secure billing, purchase validation
          and entitlement restoration are handled
          through official supported payment platforms.
        </footer>
      </main>
    </section>
  );
}