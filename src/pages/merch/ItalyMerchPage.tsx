import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/italy.jpg";
import merchImage from "../../assets/images/merch/ita-azzurri-home.png";
import heroBg from "../../assets/images/logos/feathered/italy.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function ItalyMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "italy",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#1e40af",
        ["--accent-bg" as any]: "#eff6ff",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Italy Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="Italy flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Authentic Italian rugby merchandise from official Federazione
            Italiana Rugby sources.
          </p>
        </div>

        <img
          src={merchImage}
          alt=""
          className={styles.merchImage}
        />
      </section>

      <section className={styles.section}>
        <h3>Official Merchandise Sources</h3>

        <div className={styles.addressList}>
          <div className={styles.addressCard}>
            <span className={styles.addressType}>Union-run Online Store</span>
            <strong>FIR Official Store</strong>
            <p>Stadio Olimpico, Rome, Italy</p>
            <a
              href="https://www.federugby.it"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "italy",
                  partner: "fir",
                })
              }
            >
              https://www.federugby.it
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
