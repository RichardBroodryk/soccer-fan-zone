import { useEffect } from "react";
import styles from "./SouthAfricaMerchPage.module.css";

import flag from "../../assets/images/flags/scotland.jpg";
import merchImage from "../../assets/images/merch/sco-thistle-home.png";
import heroBg from "../../assets/images/logos/feathered/scotland.png";

/* ===== LOCAL LOYALTY HOOK (PHASE 1 MOCK) ===== */
function recordLoyaltyAction(
  action: string,
  meta?: Record<string, string>
) {
  console.log("[LOYALTY]", action, meta);
}
/* ============================================ */

export default function ScotlandMerchPage() {
  useEffect(() => {
    recordLoyaltyAction("merch_nation_view", {
      nation: "scotland",
    });
  }, []);

  return (
    <div
      className={styles.page}
      style={{
        ["--accent" as any]: "#312e81",
        ["--accent-bg" as any]: "#eef2ff",
      }}
    >
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Official Scotland Rugby Merchandise</h1>
        </div>
      </header>

      <section className={styles.header}>
        <img
          src={flag}
          alt="Scotland flag"
          className={styles.flag}
        />

        <div className={styles.headerText}>
          <p>
            Licensed Scotland rugby merchandise from official Scottish Rugby
            Union sources.
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
            <strong>Scottish Rugby Store</strong>
            <p>Murrayfield Stadium, Edinburgh, Scotland</p>
            <a
              href="https://shop.scottishrugby.org"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                recordLoyaltyAction("merch_outbound_click", {
                  nation: "scotland",
                  partner: "sru",
                })
              }
            >
              https://shop.scottishrugby.org
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
