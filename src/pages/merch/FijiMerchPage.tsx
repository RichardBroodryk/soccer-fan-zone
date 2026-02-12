import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/fiji.jpg";
import merchImage from "../../assets/images/merch/fij-flyingfijians.png";
import heroBg from "../../assets/images/logos/feathered/fiji.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function FijiMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "fiji",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#0f766e",
        ["--accent-bg" as any]: "#ecfeff",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Fiji Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="Fiji flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Licensed Flying Fijians merchandise from official Fiji Rugby Union
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
            <span className={styles.addressType}>Official Retail Partner</span>
            <strong>Fiji Rugby Union</strong>
            <p>Suva, Fiji</p>
            <a
              href="https://www.fijirugby.com"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "fiji",
                  partner: "fiji-rugby-union",
                })
              }
            >
              https://www.fijirugby.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
