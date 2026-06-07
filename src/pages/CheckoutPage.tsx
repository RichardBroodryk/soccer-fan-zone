// src/pages/CheckoutPage.tsx

import { useNavigate } from "react-router-dom";

import styles from "./CheckoutPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function CheckoutPage() {
  const navigate = useNavigate();

  /* ================= DATA ================= */

  const email =
    localStorage.getItem(
      "sfz_user_email"
    ) || "supporter@example.com";

  /* ================= ROUTING ================= */

 const handlePurchase = async () => {
  /*
    CURRENT STATUS

    Temporary development flow.

    Planned Web Billing:
    Paddle Checkout

    Planned Mobile Billing:
    Google Play Billing
    Apple In-App Purchase

    Real billing integration
    will replace this route.
  */

  localStorage.setItem(
    "sfz_purchase_status",
    "active"
  );

  navigate("/purchase-success");
};

  const goBack = () => {
    navigate("/account-setup");
  };

  const goToRestorePurchase = () => {
    navigate("/restore-purchase");
  };

  const goToTerms = () => {
    navigate("/terms");
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
            SECURE CHECKOUT
          </div>

          <h1>
            Unlock The Complete
            Global Football Experience
          </h1>

          <p>
            Secure your lifetime access
            to immersive international football
            experiences, match intelligence,
            stadiums, rankings, media,
            podcasts and supporter culture.
          </p>
        </div>
      </section>

      {/* ================= CHECKOUT ================= */}

      <main className={styles.content}>
        {/* PURCHASE CARD */}

        <section className={styles.checkoutCard}>
          <div className={styles.pricingLabel}>
            GLOBAL ACCESS
          </div>

          <h2>$1.99 USD</h2>

          <div className={styles.purchaseType}>
            One-Time Purchase
          </div>

          <p className={styles.description}>
            Your purchase unlocks full access
            to the International Soccer Fans Zone platform.
          </p>

          {/* ACCOUNT */}

          <div className={styles.accountBox}>
            <div className={styles.accountLabel}>
              ACCOUNT
            </div>

            <div className={styles.accountEmail}>
              {email}
            </div>
          </div>

          {/* FEATURES */}

          <div className={styles.features}>
            <div className={styles.feature}>
              ✓ Full Match Center Access
            </div>

            <div className={styles.feature}>
              ✓ Global Stadium Explorer
            </div>

            <div className={styles.feature}>
              ✓ Football Media & Podcasts
            </div>

            <div className={styles.feature}>
              ✓ AI Tournament Intelligence
            </div>

            <div className={styles.feature}>
              ✓ Nations & Player Experiences
            </div>

            <div className={styles.feature}>
              ✓ Future Platform Updates
            </div>
          </div>

          {/* SECURITY */}

          <div className={styles.securityBox}>
            Secure payments and purchase
            validation are handled through
            supported official billing systems.
          </div>

          {/* CTA */}

          <div className={styles.buttonGroup}>
            <button
              className={styles.primaryButton}
              onClick={handlePurchase}
            >
              Complete Purchase
            </button>

            <button
              className={styles.secondaryButton}
              onClick={goBack}
            >
              ← Back To Account Setup
            </button>
          </div>
        </section>

        {/* SUPPORT OPTIONS */}

        <section className={styles.supportGrid}>
          {/* RESTORE */}

          <div className={styles.supportCard}>
            <h3>
              Restore Existing Purchase
            </h3>

            <p>
              Recover previously purchased
              access through supported
              billing providers.
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

          {/* TERMS */}

          <div className={styles.supportCard}>
            <h3>
              Terms & Privacy
            </h3>

            <p>
              Review platform terms,
              privacy policies and
              account usage information.
            </p>

            <div className={styles.linkButtons}>
              <button
                className={styles.linkButton}
                onClick={goToTerms}
              >
                Terms
              </button>

              <button
                className={styles.linkButton}
                onClick={goToPrivacy}
              >
                Privacy
              </button>
            </div>
          </div>
        </section>

        {/* LEGAL */}

        <footer className={styles.footer}>
          International Soccer Fans Zone
          is an independent football platform
          and is not affiliated with or endorsed by
          FIFA, UEFA, CAF, AFC, CONMEBOL,
          CONCACAF, OFC or tournament organizers.
        </footer>
      </main>
    </section>
  );
}