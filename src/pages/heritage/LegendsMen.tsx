import { useNavigate } from "react-router-dom";
import styles from "./LegendsMen.module.css";

import mccawImg from "../../assets/images/legends/men/richie-mccaw.jpg";
import joostImg from "../../assets/images/legends/men/joost-van-der-westhuizen.jpg";
import wilkinsonImg from "../../assets/images/legends/men/jonny-wilkinson.jpg";
import blancoImg from "../../assets/images/legends/men/serge-blanco.jpg";
import ealesImg from "../../assets/images/legends/men/john-eales.jpg";
import edwardsImg from "../../assets/images/legends/men/gareth-edwards.jpg";

type Legend = {
  nation: string;
  name: string;
  era: string;
  position: string;
  bio: string;
  image: string;
};

const legends: Legend[] = [
  {
    nation: "New Zealand",
    name: "Richie McCaw",
    era: "2001–2015",
    position: "Flanker",
    bio:
      "A relentless leader and two-time World Cup–winning captain, widely regarded as the most influential All Black of the professional era.",
    image: mccawImg,
  },
  {
    nation: "South Africa",
    name: "Joost van der Westhuizen",
    era: "1993–2003",
    position: "Scrum-half",
    bio:
      "A revolutionary scrum-half whose power, pace, and defensive ability redefined the position at international level.",
    image: joostImg,
  },
  {
    nation: "England",
    name: "Jonny Wilkinson",
    era: "1998–2011",
    position: "Fly-half",
    bio:
      "The embodiment of precision and discipline, remembered forever for the 2003 World Cup final and an unmatched competitive mentality.",
    image: wilkinsonImg,
  },
  {
    nation: "France",
    name: "Serge Blanco",
    era: "1980–1991",
    position: "Fullback",
    bio:
      "Elegance personified. A creative genius whose attacking flair symbolised French rugby for over a decade.",
    image: blancoImg,
  },
  {
    nation: "Australia",
    name: "John Eales",
    era: "1996–2001",
    position: "Lock",
    bio:
      "Known as “Nobody” for his universal respect, Eales led Australia to two World Cups and redefined leadership in the forward pack.",
    image: ealesImg,
  },
  {
    nation: "Wales",
    name: "Gareth Edwards",
    era: "1967–1978",
    position: "Scrum-half",
    bio:
      "An icon of the amateur era, whose athleticism and vision made him one of the most celebrated players in rugby history.",
    image: edwardsImg,
  },
];

export default function LegendsMen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Men’s Legends</h1>
        <p className={styles.heroSub}>
          Icons of the international game — players whose careers defined eras,
          inspired nations, and shaped rugby’s global identity.
        </p>
      </section>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/legends")}
        >
          ← Back to Legends
        </button>
      </div>

      {/* CONTEXT FIRST */}
      <section className={styles.sectionMuted}>
        <h2>Legacy Beyond Statistics</h2>
        <p>
          These players are recognised not only for titles and records, but for
          leadership, influence, and moments that elevated rugby on the world
          stage.
        </p>
      </section>

      {/* HALL OF FAME */}
      <section className={styles.section}>
        <h2>Hall of Fame</h2>

        <div className={styles.grid}>
          {legends.map((legend) => (
            <article key={legend.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <img
                  src={legend.image}
                  alt={legend.name}
                  className={styles.portrait}
                />

                <div>
                  <h3>{legend.name}</h3>
                  <span className={styles.meta}>
                    {legend.nation} · {legend.position}
                  </span>
                  <span className={styles.era}>{legend.era}</span>
                </div>
              </div>

              <p className={styles.bio}>{legend.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
