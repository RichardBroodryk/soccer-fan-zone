import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/england.png";
import merchImage from "../../assets/images/merch/eng-redroses-home.png";
import heroBg from "../../assets/images/logos/feathered/england.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function EnglandMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "england",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#7f1d1d",
        ["--accent-bg" as any]: "#fef2f2",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official England Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="England flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Licensed England Rugby merchandise from official RFU sources.
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
            <strong>England Rugby Store</strong>
            <p>Twickenham Stadium, London, England</p>
            <a
              href="https://shop.englandrugby.com"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "england",
                  partner: "rfu",
                })
              }
            >
              https://shop.englandrugby.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
