import { useNavigate } from "react-router-dom";
import styles from "./ChampionsMen.module.css";

/* HERO IMAGE */
import worldCupHero from "../../assets/images/raz/worldcup-hero.jpg";

/* MASCOT LOGOS (WORLD CUP ONLY) */
import southAfricaMascot from "../../assets/images/logos/solid/south-africa.png";
import newZealandMascot from "../../assets/images/logos/solid/new-zealand.png";
import englandMascot from "../../assets/images/logos/solid/england.jpg";
import australiaMascot from "../../assets/images/logos/solid/australia.jpg";

/* FLAGS (TALLIES) */
import englandFlag from "../../assets/images/flags/england.png";
import walesFlag from "../../assets/images/flags/wales.jpg";
import franceFlag from "../../assets/images/flags/france.jpg";
import irelandFlag from "../../assets/images/flags/ireland.jpg";
import scotlandFlag from "../../assets/images/flags/scotland.jpg";
import newZealandFlag from "../../assets/images/flags/new-zealand.jpg";
import southAfricaFlag from "../../assets/images/flags/south-africa.jpg";
import australiaFlag from "../../assets/images/flags/australia.jpg";
import fijiFlag from "../../assets/images/flags/fiji.jpg";

type WorldCupEntry = {
  year: number;
  nation: string;
  mascot: string;
  mascotLogo: string;
  venue: string;
  headCoach: string;
  assistantCoach?: string;
  note?: string;
};

type Tally = {
  nation: string;
  titles: number;
  flag: string;
};

/* ================= RUGBY WORLD CUP ================= */

const worldCups: WorldCupEntry[] = [
  {
    year: 1987,
    nation: "New Zealand",
    mascot: "All Blacks",
    mascotLogo: newZealandMascot,
    venue: "Eden Park, Auckland",
    headCoach: "Brian Lochore",
  },
  {
    year: 1991,
    nation: "Australia",
    mascot: "Wallabies",
    mascotLogo: australiaMascot,
    venue: "Twickenham, London",
    headCoach: "Bob Dwyer",
  },
  {
    year: 1995,
    nation: "South Africa",
    mascot: "Springboks",
    mascotLogo: southAfricaMascot,
    venue: "Ellis Park, Johannesburg",
    headCoach: "Kitch Christie",
    note: "A defining tournament in the modern history of the sport.",
  },
  {
    year: 1999,
    nation: "Australia",
    mascot: "Wallabies",
    mascotLogo: australiaMascot,
    venue: "Millennium Stadium, Cardiff",
    headCoach: "Rod Macqueen",
  },
  {
    year: 2003,
    nation: "England",
    mascot: "Red Roses",
    mascotLogo: englandMascot,
    venue: "Stadium Australia, Sydney",
    headCoach: "Clive Woodward",
    note: "The only men’s Rugby World Cup won by a Northern Hemisphere nation.",
  },
  {
    year: 2007,
    nation: "South Africa",
    mascot: "Springboks",
    mascotLogo: southAfricaMascot,
    venue: "Stade de France, Paris",
    headCoach: "Jake White",
  },
  {
    year: 2011,
    nation: "New Zealand",
    mascot: "All Blacks",
    mascotLogo: newZealandMascot,
    venue: "Eden Park, Auckland",
    headCoach: "Graham Henry",
    assistantCoach: "Steve Hansen",
  },
  {
    year: 2015,
    nation: "New Zealand",
    mascot: "All Blacks",
    mascotLogo: newZealandMascot,
    venue: "Twickenham, London",
    headCoach: "Steve Hansen",
    assistantCoach: "Ian Foster",
    note: "First nation to secure consecutive Rugby World Cup titles.",
  },
  {
    year: 2019,
    nation: "South Africa",
    mascot: "Springboks",
    mascotLogo: southAfricaMascot,
    venue: "International Stadium Yokohama",
    headCoach: "Rassie Erasmus",
    assistantCoach: "Jacques Nienaber",
  },
  {
    year: 2023,
    nation: "South Africa",
    mascot: "Springboks",
    mascotLogo: southAfricaMascot,
    venue: "Stade de France, Paris",
    headCoach: "Jacques Nienaber",
    assistantCoach: "Deon Davids",
    note: "Record fourth men’s Rugby World Cup title.",
  },
];

/* ================= SIX NATIONS ================= */

const sixNations: Tally[] = [
  { nation: "England", titles: 29, flag: englandFlag },
  { nation: "Wales", titles: 28, flag: walesFlag },
  { nation: "France", titles: 26, flag: franceFlag },
  { nation: "Ireland", titles: 15, flag: irelandFlag },
  { nation: "Scotland", titles: 15, flag: scotlandFlag },
];

/* ========== TRI NATIONS / RUGBY CHAMPIONSHIP ========= */

const rugbyChampionship: Tally[] = [
  { nation: "New Zealand", titles: 20, flag: newZealandFlag },
  { nation: "South Africa", titles: 6, flag: southAfricaFlag },
  { nation: "Australia", titles: 4, flag: australiaFlag },
];

/* ================= SEVENS WORLD CUP ================= */

const sevensWorldCup: Tally[] = [
  { nation: "New Zealand", titles: 4, flag: newZealandFlag },
  { nation: "Fiji", titles: 2, flag: fijiFlag },
  { nation: "England", titles: 1, flag: englandFlag },
  { nation: "Wales", titles: 1, flag: walesFlag },
];

export default function ChampionsMen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${worldCupHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Men’s Championships</h1>
          <p>
            A historical record of international rugby’s most significant
            championship achievements.
          </p>
        </div>
      </header>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← Back to Championships
        </button>
      </div>

      {/* WORLD CUP */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Rugby World Cup</h2>

        <div className={styles.worldCupList}>
          {worldCups.map((entry) => (
            <article key={entry.year} className={styles.worldCupRow}>
              <div className={styles.worldCupHeader}>
                <span className={styles.year}>{entry.year}</span>
                <div className={styles.mascotBlock}>
                  <img src={entry.mascotLogo} alt={entry.mascot} />
                  <strong>
                    {entry.nation} — {entry.mascot}
                  </strong>
                </div>
              </div>

              <div className={styles.worldCupMeta}>
                <span>Final: {entry.venue}</span>
                <span>Head Coach: {entry.headCoach}</span>
                {entry.assistantCoach && (
                  <span>Assistant Coach: {entry.assistantCoach}</span>
                )}
              </div>

              {entry.note && (
                <div className={styles.notice}>{entry.note}</div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* SIX NATIONS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Six Nations Championship</h2>
        <div className={styles.grid}>
          {sixNations.map((row) => (
            <div key={row.nation} className={styles.row}>
              <img src={row.flag} alt={row.nation} />
              <div>
                <strong>{row.nation}</strong>
                <span>{row.titles} titles</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RUGBY CHAMPIONSHIP */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Tri Nations / Rugby Championship
        </h2>
        <div className={styles.grid}>
          {rugbyChampionship.map((row) => (
            <div key={row.nation} className={styles.row}>
              <img src={row.flag} alt={row.nation} />
              <div>
                <strong>{row.nation}</strong>
                <span>{row.titles} titles</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEVENS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Rugby World Cup Sevens</h2>
        <div className={styles.grid}>
          {sevensWorldCup.map((row) => (
            <div key={row.nation} className={styles.row}>
              <img src={row.flag} alt={row.nation} />
              <div>
                <strong>{row.nation}</strong>
                <span>{row.titles} titles</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About These Records</h2>
        <p className={styles.bodyText}>
          Championship titles reflect sustained excellence over a tournament
          cycle — combining squad depth, leadership, and execution on rugby’s
          biggest stages.
        </p>
      </section>
    </main>
  );
}
