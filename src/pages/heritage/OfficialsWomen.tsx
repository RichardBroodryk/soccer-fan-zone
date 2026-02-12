import { useNavigate } from "react-router-dom";
import styles from "./OfficialsWomen.module.css";

/* FLAGS */
import southAfrica from "../../assets/images/flags/south-africa.jpg";
import england from "../../assets/images/flags/england.png";
import newZealand from "../../assets/images/flags/new-zealand.jpg";
import scotland from "../../assets/images/flags/scotland.jpg";
import australia from "../../assets/images/flags/australia.jpg";
import france from "../../assets/images/flags/france.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import unitedStates from "../../assets/images/flags/united-states-of-america.jpg";

/* IMAGES */
import barrettTheron from "../../assets/images/officials/women/aimee-barrett-theron.jpg";
import cox from "../../assets/images/officials/women/sara-cox.jpg";
import coggerOrr from "../../assets/images/officials/women/maggie-cogger-orr.jpg";
import davidson from "../../assets/images/officials/women/hollie-davidson.jpg";
import goldsmith from "../../assets/images/officials/women/ella-goldsmith.jpg";
import groizeleau from "../../assets/images/officials/women/aurelie-groizeleau.jpg";
import jenner from "../../assets/images/officials/women/lauren-jenner.jpg";
import munarini from "../../assets/images/officials/women/clara-munarini.jpg";
import roche from "../../assets/images/officials/women/kat-roche.jpg";
import ganley from "../../assets/images/officials/women/nartarsha-ganley.jpg";

export default function OfficialsWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Match Officials — Women</h1>
        <p className={styles.heroSub}>
          International referees who have shaped the growth, credibility, and
          professional standards of women’s rugby on the global stage.
        </p>
      </section>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/officials")}
        >
          ← Back to Officials
        </button>
      </div>

      {/* INFORMATIVE CONTEXT — SAME STRUCTURE AS MEN */}
      <section className={styles.sectionMuted}>
        <h2>Establishing Authority in a Growing Game</h2>
        <p>
          As women’s rugby expanded rapidly at international level, officials
          carried responsibility not only for match control, but for building
          trust, consistency, and professional credibility across competitions
          and generations.
        </p>
      </section>

      {/* OFFICIALS GRID */}
      <section className={styles.grid}>
        {[
          [
            barrettTheron,
            southAfrica,
            "Aimee Barrett-Theron",
            "2016–Present",
            "Women’s Rugby World Cup Final",
            "A leading figure in modern women’s officiating, Barrett-Theron has overseen the sport’s most significant international fixtures and set benchmarks for consistency and authority.",
          ],
          [
            cox,
            england,
            "Sara Cox",
            "2015–Present",
            "Women’s Six Nations",
            "Cox has played a central role in the professionalisation of women’s officiating, becoming a consistent presence in European international competitions.",
          ],
          [
            coggerOrr,
            newZealand,
            "Maggie Cogger-Orr",
            "2002–2018",
            "Multiple World Cup Finals",
            "One of the most influential officials in women’s rugby history, shaping standards during the game’s formative international years.",
          ],
          [
            davidson,
            scotland,
            "Hollie Davidson",
            "2017–Present",
            "International Test Appointments",
            "Represents a new generation of officials trusted with international appointments as the women’s game continues to expand.",
          ],
          [
            goldsmith,
            australia,
            "Ella Goldsmith",
            "2018–Present",
            "International Test Matches",
            "A trusted official contributing across multiple global women’s competitions.",
          ],
          [
            groizeleau,
            france,
            "Aurélie Groizeleau",
            "2017–Present",
            "Women’s Six Nations",
            "A consistent presence in European women’s rugby officiating.",
          ],
          [
            jenner,
            italy,
            "Lauren Jenner",
            "2016–Present",
            "International Appointments",
            "An important figure in Italy’s growing international officiating presence.",
          ],
          [
            munarini,
            italy,
            "Clara Munarini",
            "2015–Present",
            "International Test Matches",
            "Contributed steadily to the development of international women’s officiating.",
          ],
          [
            roche,
            unitedStates,
            "Kat Roche",
            "2016–Present",
            "International Test Matches",
            "Represents the United States on the global officiating stage.",
          ],
          [
            ganley,
            newZealand,
            "Natarsha Ganley",
            "2017–Present",
            "International Test Matches",
            "Part of the expanding pool of international women’s officials.",
          ],
        ].map(([img, flag, name, years, era, bio]) => (
          <article key={name as string} className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={img as string} alt={name as string} className={styles.portrait} />
              <div>
                <h3>{name}</h3>
                <img src={flag as string} alt="" className={styles.flag} />
                <span className={styles.meta}>{years}</span>
                <span className={styles.era}>{era}</span>
                <p className={styles.bio}>{bio}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
