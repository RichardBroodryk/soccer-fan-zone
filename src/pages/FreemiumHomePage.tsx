import { useNavigate } from "react-router-dom";
import styles from "./FreemiumHomePage.module.css";

import HubCard from "../components/homepage/HubCard";

import AwardIcon from "../components/icons/AwardIcon";
import GridIcon from "../components/icons/GridIcon";
import MusicIcon from "../components/icons/MusicIcon";
import CalendarIcon from "../components/icons/CalendarIcon";

import tournamentsImage from "../assets/images/raz/tournament-hub-page.png";
import anthemsImage from "../assets/images/raz/anthems-page.png";
import calendarImage from "../assets/images/raz/calendar-hero.jpg";

export default function FreemiumHomePage() {
  const navigate = useNavigate();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <span className={styles.kicker}>FREEMIUM ACCESS</span>
        <h1 className={styles.title}>Rugby Anthem Zone</h1>
        <p className={styles.subtitle}>
          Step into the culture, competitions, and ceremony of world rugby.
        </p>
      </header>

      <section className={styles.primaryRow}>
        <HubCard
          title="Anthems"
          image={anthemsImage}
          to="/free/anthems"
          features={[{ label: "National Anthems", icon: <MusicIcon /> }]}
        />

        <HubCard
          title="Tournaments"
          image={tournamentsImage}
          to="/what-you-get/premium"
          features={[
            { label: "Men’s Tournaments", icon: <AwardIcon /> },
            { label: "Women’s Tournaments", icon: <GridIcon /> },
          ]}
        />
      </section>

      <section className={styles.secondaryRow}>
        <HubCard
          title="Calendar"
          image={calendarImage}
          to="/what-you-get/premium"
          features={[
            { label: "Global Match Calendar", icon: <CalendarIcon /> },
          ]}
        />
      </section>

      <section className={styles.teaser}>
        <h2>Beyond Freemium</h2>
        <p>
          Premium access opens matchday systems, deeper tournament coverage,
          and exclusive rugby media — built for supporters who want more
          than the basics.
        </p>

        <button
          className={styles.upgradeBtn}
          onClick={() => navigate("/what-you-get/premium")}
        >
          See What Premium Unlocks
        </button>
      </section>
    </section>
  );
}
