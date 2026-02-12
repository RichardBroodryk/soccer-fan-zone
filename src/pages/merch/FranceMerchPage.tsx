import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/france.jpg";
import merchImage from "../../assets/images/merch/fra-lecoq-home.png";
import heroBg from "../../assets/images/logos/feathered/france.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function FranceMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "france",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#1d4ed8",
        ["--accent-bg" as any]: "#eff6ff",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official France Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="France flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Authentic French rugby merchandise from official Fédération Française
            de Rugby sources.
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
            <strong>FFR Boutique</strong>
            <p>Stade de France, Saint-Denis, Paris, France</p>
            <a
              href="https://boutique.ffr.fr"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "france",
                  partner: "ffr",
                })
              }
            >
              https://boutique.ffr.fr
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
