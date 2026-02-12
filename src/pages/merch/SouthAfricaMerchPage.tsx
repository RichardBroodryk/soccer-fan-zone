import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/south-africa.jpg";
import merchImage from "../../assets/images/merch/sa-springboks-home.png";
import heroBg from "../../assets/images/logos/feathered/south-africa.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function SouthAfricaMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "south-africa",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#14532d",
        ["--accent-bg" as any]: "#ecfdf5",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Springboks Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="South Africa flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Authentic South African rugby merchandise from official Springbok
            retail sources.
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
            <span className={styles.addressType}>Physical Flagship</span>
            <strong>Springbok Retail</strong>
            <p>Cape Town Stadium, Green Point, Cape Town, South Africa</p>
            <a
              href="https://shop.sarugby.co.za"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "south-africa",
                  partner: "sarugby",
                })
              }
            >
              https://shop.sarugby.co.za
            </a>
          </div>

          <div className={styles.addressCard}>
            <span className={styles.addressType}>Union-run Online Store</span>
            <strong>SA Rugby Shop</strong>
            <p>Cape Town Stadium, Green Point, Cape Town, South Africa</p>
            <a
              href="https://shop.sarugby.co.za"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "south-africa",
                  partner: "sarugby",
                })
              }
            >
              https://shop.sarugby.co.za
            </a>
          </div>

          <div className={styles.addressCard}>
            <span className={styles.addressType}>Official Retail Partner</span>
            <strong>Springbok Experience</strong>
            <p>Cape Town Stadium, Green Point, Cape Town</p>
            <a
              href="https://www.springboks.rugby/shop"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "south-africa",
                  partner: "springboks",
                })
              }
            >
              https://www.springboks.rugby/shop
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
