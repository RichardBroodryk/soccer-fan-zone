import { useEffect } from "react";
import styles from "./MerchPage.module.css";

/* LOYALTY — NON VISUAL */
import { recordLoyaltyAction } from "../utils/loyaltyHooks";

import merchHero from "../assets/images/raz/Merch.png";

/* SOLID LOGOS */
import southAfrica from "../assets/images/logos/solid/south-africa.png";
import newZealand from "../assets/images/logos/solid/new-zealand.png";
import england from "../assets/images/logos/solid/england.jpg";
import france from "../assets/images/logos/solid/france.png";
import wales from "../assets/images/logos/solid/wales.jpg";
import ireland from "../assets/images/logos/solid/ireland.jpg";
import scotland from "../assets/images/logos/solid/scotland.png";
import italy from "../assets/images/logos/solid/italy.png";
import australia from "../assets/images/logos/solid/australia.jpg";
import japan from "../assets/images/logos/solid/japan.png";
import fiji from "../assets/images/logos/solid/fiji.png";
import argentina from "../assets/images/logos/solid/argentina.png";

/* TILE */
import MerchStoreTile from "./merch/MerchStoreTile";

export default function MerchPage() {
  /* PAGE VIEW — SAFE */
  useEffect(() => {
    recordLoyaltyAction("merch_view");
  }, []);

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <img src={merchHero} alt="" className={styles.heroImage} />
        <h1>Merchandise</h1>
        <p>
          Official rugby merchandise from leading unions and teams worldwide.
          Licensed products, premium quality, and trusted sources.
        </p>
      </header>

      {/* HOW MERCH WORKS */}
      <section className={styles.section}>
        <h2>How Merchandising Works</h2>
        <div className={styles.info}>
          <p>
            Rugby Anthem Zone curates official team stores and licensed
            merchandise partners. Selecting a team redirects you to the
            official store to complete your purchase securely.
          </p>
          <p>
            Fulfilment and transactions are handled by authorised partners.
            Loyalty recognition may apply to verified partner activity.
          </p>
        </div>
      </section>

      {/* OFFICIAL STORES */}
      <section className={styles.section}>
        <h2>Official Team Stores</h2>

        <div className={styles.grid}>
          <MerchStoreTile name="South Africa" logo={southAfrica} to="/merch/south-africa" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="New Zealand" logo={newZealand} to="/merch/new-zealand" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="England" logo={england} to="/merch/england" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="France" logo={france} to="/merch/france" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="Wales" logo={wales} to="/merch/wales" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="Ireland" logo={ireland} to="/merch/ireland" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="Scotland" logo={scotland} to="/merch/scotland" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="Italy" logo={italy} to="/merch/italy" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="Australia" logo={australia} to="/merch/australia" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="Japan" logo={japan} to="/merch/japan" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="Fiji" logo={fiji} to="/merch/fiji" onVisit={() => recordLoyaltyAction("merch_purchase")} />
          <MerchStoreTile name="Argentina" logo={argentina} to="/merch/argentina" onVisit={() => recordLoyaltyAction("merch_purchase")} />
        </div>
      </section>
    </main>
  );
}
