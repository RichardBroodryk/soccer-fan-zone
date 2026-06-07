// src/pages/PrivacyPolicyPage.tsx

import { useNavigate } from "react-router-dom";

import styles from "./PrivacyPolicyPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  /* ================= ROUTING ================= */

  const goBack = () => {
    navigate("/terms");
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
            PRIVACY POLICY
          </div>

          <h1>
            Privacy, Data &
            Platform Transparency
          </h1>

          <p>
            Learn how International Soccer Fans Zone
            handles account information,
            authentication, analytics and
            football platform experiences.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className={styles.content}>
        {/* INTRO */}

        <section className={styles.card}>
          <h2>
            Independent Global Football Platform
          </h2>

          <p>
            International Soccer Fans Zone
            is an independent football
            companion platform built for
            supporters around the world.
          </p>

          <p>
            This Privacy Policy explains
            how information may be collected,
            stored and used when accessing
            the platform and related football experiences.
          </p>
        </section>

        {/* ACCOUNT DATA */}

        <section className={styles.card}>
          <h2>
            Account Information
          </h2>

          <ul>
            <li>
              Email addresses may be used
              for account authentication,
              platform access and account recovery.
            </li>

            <li>
              Passwords and authentication
              systems are protected through
              secure access mechanisms.
            </li>

            <li>
              Basic profile preferences may
              be stored locally to improve
              the football platform experience.
            </li>
          </ul>
        </section>

        {/* ANALYTICS */}

        <section className={styles.card}>
          <h2>
            Analytics & Performance
          </h2>

          <ul>
            <li>
              Anonymous analytics may be used
              to improve football platform performance,
              responsiveness and user experience.
            </li>

            <li>
              Usage patterns may help improve
              football content, match systems,
              stadium experiences and media delivery.
            </li>

            <li>
              Platform diagnostics may be used
              to improve stability and performance.
            </li>
          </ul>
        </section>

        {/* PURCHASES */}

        <section className={styles.card}>
          <h2>
            Purchases & Billing
          </h2>

          <ul>
            <li>
              Purchases are processed through
              supported billing platforms
              and payment providers.
            </li>

            <li>
              International Soccer Fans Zone
              does not store full payment card information.
            </li>

            <li>
              Purchase validation and
              entitlement restoration may
              be handled through supported
              platform billing systems.
            </li>
          </ul>
        </section>

        {/* THIRD PARTY */}

        <section className={styles.card}>
          <h2>
            Third-Party Content
          </h2>

          <ul>
            <li>
              Some football experiences may
              reference third-party podcasts,
              broadcasters, streaming services
              or creator content.
            </li>

            <li>
              External platforms maintain
              their own independent privacy
              and content policies.
            </li>

            <li>
              Users remain responsible for
              access to external services
              and regional availability.
            </li>
          </ul>
        </section>

        {/* DATA RIGHTS */}

        <section className={styles.card}>
          <h2>
            User Rights & Account Deletion
          </h2>

          <ul>
            <li>
              Users may request account
              deletion and data removal
              through support channels.
            </li>

            <li>
              Users may request account recovery
              assistance where supported.
            </li>

            <li>
              Platform privacy systems may evolve
              as authentication and football services expand.
            </li>
          </ul>
        </section>

        {/* SECURITY */}

        <section className={styles.card}>
          <h2>
            Security & Platform Protection
          </h2>

          <ul>
            <li>
              International Soccer Fans Zone
              uses reasonable security measures
              to protect platform systems and accounts.
            </li>

            <li>
              Unauthorized platform abuse,
              scraping or malicious activity
              may result in account restrictions.
            </li>

            <li>
              Users remain responsible for
              protecting account credentials.
            </li>
          </ul>
        </section>

        {/* CTA */}

        <section className={styles.ctaSection}>
          <button
            className={styles.primaryButton}
            onClick={goBack}
          >
            ← Return To Terms
          </button>

          <button
            className={styles.secondaryButton}
            onClick={goToSupport}
          >
            Contact Support
          </button>
        </section>

        {/* FOOTER */}

        <footer className={styles.footer}>
          International Soccer Fans Zone
          is an independent global football
          platform and is not affiliated
          with FIFA, UEFA, CAF, AFC,
          CONMEBOL, CONCACAF or
          tournament organizers.
        </footer>
      </main>
    </section>
  );
}