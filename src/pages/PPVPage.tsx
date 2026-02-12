import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PPVPage.module.css";

import { recordLoyaltyAction } from "../utils/loyaltyHooks";
import heroImage from "../assets/images/raz/fanzone-ppv.png";

export default function PPVPage() {
  const navigate = useNavigate();

  /* ================= LOYALTY: PAGE VIEW ================= */
  useEffect(() => {
    recordLoyaltyAction("ppv_view");
  }, []);

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Pay-Per-View</h1>
          <p>
            One-off access to selected matches through connection
            <br />
            to premium broadcast coverage.
          </p>
        </div>
      </section>

      {/* ================= BACK ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/fanzone")}
        >
          ← Back to Fanzone
        </button>
      </div>

      {/* ================= OVERVIEW ================= */}
      <section className={styles.section}>
        <p className={styles.bodyText}>
          Pay-Per-View provides direct access to selected matches and special
          broadcasts that sit outside standard subscription coverage. Events are
          offered individually, without requiring an ongoing commitment.
        </p>
      </section>

      {/* ================= WHEN PPV APPLIES ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>When PPV Is Used</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Exclusive Fixtures</h3>
            <p>
              Certain high-value matches or one-off events may be made available
              via PPV due to broadcast rights or production scope.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Enhanced Coverage</h3>
            <p>
              PPV events may include higher production quality, extended camera
              angles, or additional broadcast layers not available elsewhere.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Regional Availability</h3>
            <p>
              PPV is used where standard broadcast access differs by territory,
              allowing supporters to access events otherwise unavailable locally.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ACCESS MODEL ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Access Model</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Single-Event Purchase</h3>
            <p>
              Each PPV event is purchased individually. There are no bundles,
              subscriptions, or recurring charges tied to PPV access.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Defined Access Window</h3>
            <p>
              Access duration is specified per event and may include live
              viewing, limited replay windows, or both.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Transparent Pricing</h3>
            <p>
              Pricing and access terms are shown clearly before purchase, with
              no hidden fees or automatic renewals.
            </p>
          </div>
        </div>
      </section>

      {/* ================= OFFICIAL ACCESS ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Official PPV Access</h2>

        <p className={styles.bodyText}>
          PPV access is provided through authorised broadcast partners. Rugby
          Anthem Zone does not host streams, payments, or DRM-controlled
          content.
        </p>

        <button
          className={styles.outbound}
          onClick={() => recordLoyaltyAction("ppv_purchase")}
        >
          Proceed to Official PPV Provider
        </button>
      </section>

      {/* ================= NOTICE ================= */}
      <section className={styles.section}>
        <p className={styles.notice}>
          Availability, pricing, and replay options vary by event and region.
          Full details are presented before purchase, in line with local
          broadcast agreements.
        </p>
      </section>

      {/* ================= FORWARD VIEW ================= */}
      <section className={styles.section}>
        <p className={styles.bodyText}>
          PPV is designed as an access mechanism, not a content feed. Events are
          offered selectively to preserve clarity, value, and respect for the
          match itself.
        </p>
      </section>
    </main>
  );
}
