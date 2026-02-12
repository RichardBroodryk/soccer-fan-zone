import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/australia.jpg";
import merchImage from "../../assets/images/merch/aus-wallabies-home.png";
import heroBg from "../../assets/images/logos/feathered/australia.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function AustraliaMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "australia",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#92400e",
        ["--accent-bg" as any]: "#fffbeb",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Wallabies Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="Australia flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Licensed Wallabies merchandise from official Rugby Australia retail
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
            <strong>Rugby Australia Shop</strong>
            <p>Sydney, Australia</p>
            <a
              href="https://shop.rugby.com.au"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "australia",
                  partner: "rugby-australia",
                })
              }
            >
              https://shop.rugby.com.au
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
