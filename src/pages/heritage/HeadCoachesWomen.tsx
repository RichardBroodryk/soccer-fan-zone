import { useNavigate } from "react-router-dom";
import styles from "./HeadCoaches.module.css";

/* FLAGS */
import england from "../../assets/images/flags/england.png";
import newZealand from "../../assets/images/flags/new-zealand.jpg";
import australia from "../../assets/images/flags/australia.jpg";
import southAfrica from "../../assets/images/flags/south-africa.jpg";
import france from "../../assets/images/flags/france.jpg";
import ireland from "../../assets/images/flags/ireland.jpg";
import japan from "../../assets/images/flags/japan.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import wales from "../../assets/images/flags/wales.jpg";

/* IMAGES — WOMEN */
import bunting from "../../assets/images/coaches/women/allan-bunting.jpg";
import roselli from "../../assets/images/coaches/women/fabio-roselli.jpg";
import ratier from "../../assets/images/coaches/women/francois-ratier.jpg";
import yapp from "../../assets/images/coaches/women/jo-yapp.jpg";
import mitchell from "../../assets/images/coaches/women/john-mitchell.jpg";
import bemand from "../../assets/images/coaches/women/scott-bemand.jpg";
import lynn from "../../assets/images/coaches/women/sean-lynn.jpg";
import fukofuka from "../../assets/images/coaches/women/sione-fukofuka.jpg";
import debruin from "../../assets/images/coaches/women/swys-debruin.jpg";

export default function HeadCoachesWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Head Coaches — Women’s Game</h1>
        <p className={styles.heroSub}>
          The leaders driving the rapid growth, professionalism, and global
          competitiveness of the women’s international game.
        </p>
      </section>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/coaches")}
        >
          ← Back to Coaches & Support
        </button>
      </div>

      {/* MODERN ERA */}
      <section className={styles.sectionMuted}>
        <h2>Modern Era (2018 → Present)</h2>
        <p>
          Head coaches operating within a rapidly evolving professional landscape,
          shaping identity, performance, and global competitiveness in the women’s game.
        </p>
      </section>

      <section className={styles.grid}>
        {[
          [bunting, newZealand, "Allan Bunting", "New Zealand", "2022–Present",
            "Leading the Black Ferns through a post-World Cup cycle, maintaining high-performance standards while evolving attacking identity and squad depth."],

          [mitchell, england, "John Mitchell", "England", "2023–Present",
            "Experienced international coach leading England’s dominant Red Roses, refining structure and performance consistency ahead of the next World Cup cycle."],

          [yapp, australia, "Jo Yapp", "Australia", "2024–Present",
            "Driving Australia’s rebuild through structured systems and improved international competitiveness."],

          [debruin, southAfrica, "Swys de Bruin", "South Africa", "2023–Present",
            "Driving South Africa’s rise through structured systems and alignment with national high-performance pathways."],

          [ratier, france, "François Ratier", "France", "2025–Present",
            "Leading France’s programme through structured systems and sustained international competitiveness."],

          [bemand, ireland, "Scott Bemand", "Ireland", "2023–Present",
            "Leading Ireland’s rebuild through structured systems, player pathways, and renewed international competitiveness."],

          [roselli, italy, "Fabio Roselli", "Italy", "2021–Present",
            "Overseeing Italy’s steady progression through tactical clarity and system development."],

          [lynn, wales, "Sean Lynn", "Wales", "2024–Present",
            "Leading Wales into a new performance cycle focused on structure and consistency."],

          [fukofuka, japan, "Sione Fukofuka", "Japan", "2022–Present",
            "Developing Japan’s tactical identity through structured systems and disciplined execution."]
        ].map(([img, flag, name, nation, era, bio]) => (
          <article key={name as string} className={styles.card}>
            <img src={img as string} alt={name as string} className={styles.portrait} />
            <h3>{name}</h3>
            <img src={flag as string} alt="" className={styles.flag} />
            <span className={styles.meta}>{nation} · {era}</span>
            <p className={styles.bio}>{bio}</p>
          </article>
        ))}
      </section>

      {/* FOUNDATIONS ERA */}
      <section className={styles.sectionMuted}>
        <h2>Foundational Era (Pre-2018)</h2>
        <p>
          Coaches who laid the groundwork for the modern women’s international game,
          establishing pathways, standards, and early global competitiveness.
        </p>
      </section>

      <section className={styles.textGrid}>
        {[
          ["Wayne Smith", "New Zealand", "2021–2022",
            "Returned to lead the Black Ferns to Rugby World Cup success, redefining performance standards."],

          ["Simon Middleton", "England", "2015–2023",
            "Oversaw one of the most dominant periods in women’s rugby history, establishing sustained excellence."],

          ["Gary Street", "England", "2007–2015",
            "Led England to World Cup success while shaping early professional standards."],

          ["Brian Evans", "New Zealand", "1994–2002",
            "Instrumental in establishing the Black Ferns’ early dominance and long-term identity."]
        ].map(([name, nation, era, bio]) => (
          <article key={name} className={styles.textCard}>
            <h3>{name}</h3>
            <span className={styles.meta}>{nation} · {era}</span>
            <p className={styles.bio}>{bio}</p>
          </article>
        ))}
      </section>
    </main>
  );
}