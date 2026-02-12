import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/wales.jpg";
import merchImage from "../../assets/images/merch/wal-reddragons-home.png";
import heroBg from "../../assets/images/logos/feathered/wales.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function WalesMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "wales",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#9f1239",
        ["--accent-bg" as any]: "#fff1f2",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Wales Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="Wales flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Licensed Welsh Rugby Union merchandise from official WRU retail
            sources.
          </p>
        </div>

        <img
          src={merchImage}
          alt="Wales home jersey"
          className={styles.merchImage}
        />
      </section>

      <section className={styles.section}>
        <h3>Official Merchandise Sources</h3>

        <div className={styles.addressList}>
          <div className={styles.addressCard}>
            <span className={styles.addressType}>Union-run Online Store</span>
            <strong>WRU Store</strong>
            <p>Principality Stadium, Cardiff, Wales</p>
            <a
              href="https://store.wru.co.uk"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "wales",
                  partner: "wru",
                })
              }
            >
              https://store.wru.co.uk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
