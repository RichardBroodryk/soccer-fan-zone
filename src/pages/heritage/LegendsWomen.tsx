import { useNavigate } from "react-router-dom";
import styles from "./LegendsWomen.module.css";

import woodmanImg from "../../assets/images/legends/women/portia-woodman.png";
import alphonsiImg from "../../assets/images/legends/women/maggie-alphonso.jpg";
import yaheImg from "../../assets/images/legends/women/marie-alice-yahe.jpg";
import coughlanImg from "../../assets/images/legends/women/fiona-coughlan.jpg";
import pyrsImg from "../../assets/images/legends/women/gwenllian-pyrs.jpg";
import soonImg from "../../assets/images/legends/women/cheryl-soon.jpg";

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
    name: "Portia Woodman",
    era: "2013–Present",
    position: "Wing",
    bio:
      "A transformative force in women’s rugby, whose power and speed redefined the modern winger and inspired a global generation.",
    image: woodmanImg,
  },
  {
    nation: "England",
    name: "Maggie Alphonsi",
    era: "2003–2012",
    position: "Flanker",
    bio:
      "A trailblazer whose leadership and dominance helped establish England as a powerhouse in the women’s international game.",
    image: alphonsiImg,
  },
  {
    nation: "France",
    name: "Marie-Alice Yahé",
    era: "2005–2018",
    position: "Scrum-half",
    bio:
      "An intelligent and influential scrum-half who guided France through a formative era of growth and competitiveness.",
    image: yaheImg,
  },
  {
    nation: "Ireland",
    name: "Fiona Coghlan",
    era: "2003–2018",
    position: "Centre",
    bio:
      "A central figure in Ireland’s rise, captaining historic victories and setting standards for professionalism and belief.",
    image: coughlanImg,
  },
  {
    nation: "Wales",
    name: "Gwenllian Pyrs",
    era: "2014–Present",
    position: "Prop",
    bio:
      "A cornerstone of the Welsh pack, respected for her physicality, consistency, and leadership in the front row.",
    image: pyrsImg,
  },
  {
    nation: "Australia",
    name: "Cheryl Soon",
    era: "1996–2007",
    position: "Back row",
    bio:
      "One of the pioneers of Australian women’s rugby, whose longevity and influence shaped the sport’s early international years.",
    image: soonImg,
  },
];

export default function LegendsWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Women’s Legends</h1>
        <p className={styles.heroSub}>
          Pioneers, champions, and icons whose careers defined the rise and
          global impact of women’s international rugby.
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
        <h2>Shaping the Modern Game</h2>
        <p>
          These players didn’t just win matches — they expanded visibility,
          professionalism, and opportunity across women’s rugby worldwide.
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
