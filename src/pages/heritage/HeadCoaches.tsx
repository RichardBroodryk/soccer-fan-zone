import { useNavigate } from "react-router-dom";
import styles from "./HeadCoaches.module.css";

/* FLAGS */
import england from "../../assets/images/flags/england.png";
import newZealand from "../../assets/images/flags/new-zealand.jpg";
import australia from "../../assets/images/flags/australia.jpg";
import southAfrica from "../../assets/images/flags/south-africa.jpg";
import france from "../../assets/images/flags/france.jpg";
import ireland from "../../assets/images/flags/ireland.jpg";
import wales from "../../assets/images/flags/wales.jpg";
import scotland from "../../assets/images/flags/scotland.jpg";
import argentina from "../../assets/images/flags/argentina.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import japan from "../../assets/images/flags/japan.jpg";

/* IMAGES */
import farrell from "../../assets/images/coaches/men/modern/andy-farrell.jpg";
import borthwick from "../../assets/images/coaches/men/modern/steve-borthwick.jpg";
import rennie from "../../assets/images/coaches/men/modern/dave-rennie.jpg";
import erasmus from "../../assets/images/coaches/men/modern/rassie-erasmus.jpg";
import galthie from "../../assets/images/coaches/men/modern/fabien-galthié.jpg";
import townsend from "../../assets/images/coaches/men/modern/gregor-townsend.jpg";
import gatland from "../../assets/images/coaches/men/modern/warren-gatland.jpg";
import foster from "../../assets/images/coaches/men/modern/ian-foster.jpg";
import cheika from "../../assets/images/coaches/men/modern/michael-cheika.jpg";
import contepomi from "../../assets/images/coaches/men/modern/felipe-contepomi.jpg";
import quesada from "../../assets/images/coaches/men/modern/gonzalo-quesada.jpg";
import crowley from "../../assets/images/coaches/men/modern/kieran-crowley.jpg";
import joseph from "../../assets/images/coaches/men/modern/jamie-joseph.jpg";
import schmidt from "../../assets/images/coaches/men/modern/joe-schmidt.jpg";
import tandy from "../../assets/images/coaches/men/modern/steve-tandy.jpg";

export default function HeadCoaches() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Head Coaches</h1>
        <p className={styles.heroSub}>
          The principal architects of international teams — responsible for
          vision, leadership, and long-term competitive direction.
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
          Head coaches operating within high-performance environments shaped by
          analytics, depth management, and global competition cycles.
        </p>
      </section>

      <section className={styles.grid}>
        {[
          [farrell, ireland, "Andy Farrell", "Ireland", "2019–Present",
            "Defence-driven strategist transforming Ireland into one of the most consistent teams in world rugby."],

          [borthwick, england, "Steve Borthwick", "England", "2022–Present",
            "Structure-focused coach emphasising discipline, set-piece, and tournament control."],

          [rennie, newZealand, "Dave Rennie", "New Zealand", "2026–Present",
            "Experienced international coach leading the All Blacks into a new World Cup cycle with structured attacking systems."],

          [erasmus, southAfrica, "Rassie Erasmus", "South Africa", "2018–Present",
            "Architect of South Africa’s modern dominance, blending culture, strategy, and depth."],

          [galthie, france, "Fabien Galthié", "France", "2020–Present",
            "Driving France’s structured resurgence through identity and long-term system continuity."],

          [townsend, scotland, "Gregor Townsend", "Scotland", "2017–Present",
            "Attack-oriented coach bringing creativity and adaptability to Scotland’s game."],

          [gatland, wales, "Warren Gatland", "Wales", "2023–Present",
            "Proven international leader guiding Wales through transition cycles."],

          [foster, newZealand, "Ian Foster", "New Zealand", "2019–2023",
            "Led the All Blacks through a demanding cycle culminating in a World Cup final."],

          [cheika, australia, "Michael Cheika", "Australia / Argentina", "2014–2023",
            "High-intensity leader guiding teams through World Cup campaigns."],

          [schmidt, australia, "Joe Schmidt", "Australia", "2024–2026",
            "Stabilising Australia through a transitional phase before handing over to Les Kiss."],

          [contepomi, argentina, "Felipe Contepomi", "Argentina", "2023–Present",
            "Shaping Argentina’s tactical evolution with structure and discipline."],

          [quesada, italy, "Gonzalo Quesada", "Italy", "2024–Present",
            "Building Italy’s competitiveness through structured systems."],

          [crowley, italy, "Kieran Crowley", "Italy", "2021–2023",
            "Oversaw Italy’s most competitive modern period."],

          [joseph, japan, "Jamie Joseph", "Japan", "2016–2023",
            "Led Japan’s rise through discipline and tactical clarity."],

          [tandy, wales, "Steve Tandy", "Wales", "2025–Present",
            "Defensive systems coach leading Wales into a new cycle."]
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

      {/* FOUNDATIONS ERA (RESTORED) */}
      <section className={styles.sectionMuted}>
        <h2>Professional Foundations (1991 → 2018)</h2>
        <p>
          Coaches who guided national teams through rugby’s transition into the
          professional era, defining structures that endure today.
        </p>
      </section>

      <section className={styles.textGrid}>
        {[
          ["Clive Woodward", "England", "1997–2004",
            "Architect of England’s 2003 Rugby World Cup triumph."],
          ["Graham Henry", "New Zealand", "2004–2011",
            "Led the All Blacks to World Cup success in 2011."],
          ["Jake White", "South Africa", "2004–2007",
            "Guided South Africa to Rugby World Cup victory."],
          ["Eddie Jones", "Australia / England", "2001–2017",
            "One of the most influential coaches across multiple nations."],
          ["Bernard Laporte", "France", "1999–2007",
            "A defining French coach of the professional era."],
          ["Declan Kidney", "Ireland", "2008–2013",
            "Led Ireland to historic Six Nations success."]
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