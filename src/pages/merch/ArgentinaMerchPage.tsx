import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/argentina.jpg";
import merchImage from "../../assets/images/merch/los-pumas-home.png";
import heroBg from "../../assets/images/logos/feathered/argentina.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function ArgentinaMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "argentina",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#0369a1",
        ["--accent-bg" as any]: "#f0f9ff",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Argentina Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="Argentina flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Licensed Los Pumas merchandise from official Unión Argentina de Rugby
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
            <strong>UAR Official Store</strong>
            <p>Buenos Aires, Argentina</p>
            <a
              href="https://www.uar.com.ar"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "argentina",
                  partner: "uar",
                })
              }
            >
              https://www.uar.com.ar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
