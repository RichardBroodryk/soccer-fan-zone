import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/new-zealand.jpg";
import merchImage from "../../assets/images/merch/nz-allblacks-home.png";
import heroBg from "../../assets/images/logos/feathered/new-zealand.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function NewZealandMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "new-zealand",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#111827",
        ["--accent-bg" as any]: "#f3f4f6",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official All Blacks Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="New Zealand flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Authentic New Zealand rugby merchandise from official All Blacks
            sources.
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
            <strong>All Blacks Shop</strong>
            <p>Eden Park, Auckland, New Zealand</p>
            <a
              href="https://www.allblackshop.com"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "new-zealand",
                  partner: "all-blacks",
                })
              }
            >
              https://www.allblackshop.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
