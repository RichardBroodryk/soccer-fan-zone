import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/japan.jpg";
import merchImage from "../../assets/images/merch/jpn-braveblossoms.png";
import heroBg from "../../assets/images/logos/feathered/japan.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function JapanMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "japan",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#991b1b",
        ["--accent-bg" as any]: "#fef2f2",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Japan Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="Japan flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Authentic Brave Blossoms merchandise from official Japan Rugby
            Football Union sources.
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
            <strong>Japan Rugby Official Store</strong>
            <p>Tokyo, Japan</p>
            <a
              href="https://www.rugby-japan.jp"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "japan",
                  partner: "jrfu",
                })
              }
            >
              https://www.rugby-japan.jp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
