import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/ireland.jpg";
import merchImage from "../../assets/images/merch/ire-shamrock-home.png";
import heroBg from "../../assets/images/logos/feathered/ireland.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function IrelandMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "ireland",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#166534",
        ["--accent-bg" as any]: "#ecfdf5",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Ireland Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="Ireland flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Authentic Ireland rugby merchandise from official IRFU retail
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
            <strong>IRFU Shop</strong>
            <p>Aviva Stadium, Dublin, Ireland</p>
            <a
              href="https://shop.irfu.ie"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "ireland",
                  partner: "irfu",
                })
              }
            >
              https://shop.irfu.ie
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
