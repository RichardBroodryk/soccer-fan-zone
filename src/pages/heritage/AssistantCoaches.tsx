import { useNavigate } from "react-router-dom";
import styles from "./AssistantCoaches.module.css";

/* FLAGS */
import england from "../../assets/images/flags/england.png";
import newZealand from "../../assets/images/flags/new-zealand.jpg";
import australia from "../../assets/images/flags/australia.jpg";
import southAfrica from "../../assets/images/flags/south-africa.jpg";
import france from "../../assets/images/flags/france.jpg";
import ireland from "../../assets/images/flags/ireland.jpg";
import scotland from "../../assets/images/flags/scotland.jpg";
import argentina from "../../assets/images/flags/argentina.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import japan from "../../assets/images/flags/japan.jpg";

type AssistantCoach = {
  name: string;
  role: string;
  bio: string;
};

type NationGroup = {
  nation: string;
  flag: string;
  coaches: AssistantCoach[];
};

const groups: NationGroup[] = [
  {
    nation: "Ireland",
    flag: ireland,
    coaches: [
      {
        name: "Mike Catt",
        role: "Attack Coach",
        bio:
          "A key figure in Ireland’s attacking evolution, contributing structure and clarity across recent international campaigns.",
      },
    ],
  },
  {
    nation: "France",
    flag: france,
    coaches: [
      {
        name: "Shaun Edwards",
        role: "Defence Coach",
        bio:
          "Widely regarded as the leading defensive coach of the modern era, underpinning France’s resurgence through organisation and intensity.",
      },
      {
        name: "Laurent Labit",
        role: "Attack Coach",
        bio:
          "Part of France’s modern coaching core, responsible for attacking identity and backline development.",
      },
    ],
  },
  {
    nation: "England",
    flag: england,
    coaches: [
      {
        name: "Kevin Sinfield",
        role: "Defence Coach",
        bio:
          "A central figure in England’s defensive systems, valued for leadership, clarity, and competitive edge.",
      },
    ],
  },
  {
    nation: "Scotland",
    flag: scotland,
    coaches: [
      {
        name: "Steve Tandy",
        role: "Defence Coach",
        bio:
          "Oversaw Scotland’s defensive organisation through multiple international cycles and British & Irish Lions involvement.",
      },
    ],
  },
  {
    nation: "New Zealand",
    flag: newZealand,
    coaches: [
      {
        name: "John Plumtree",
        role: "Forwards Coach",
        bio:
          "Responsible for forward play and breakdown strategy within the All Blacks’ modern coaching structure.",
      },
    ],
  },
  {
    nation: "Australia",
    flag: australia,
    coaches: [
      {
        name: "Mike Cron",
        role: "Scrum Consultant",
        bio:
          "One of the most respected scrum specialists in international rugby, providing technical expertise at Test level.",
      },
    ],
  },
  {
    nation: "South Africa",
    flag: southAfrica,
    coaches: [
      {
        name: "Felix Jones",
        role: "Defence & Strategy",
        bio:
          "A trusted lieutenant in South Africa’s World Cup–winning setup, contributing analysis, defence, and tactical planning.",
      },
    ],
  },
  {
    nation: "Argentina",
    flag: argentina,
    coaches: [
      {
        name: "Andrés Bordoy",
        role: "Scrum Coach",
        bio:
          "A technical specialist responsible for Argentina’s scrum development at international level.",
      },
    ],
  },
  {
    nation: "Italy",
    flag: italy,
    coaches: [
      {
        name: "Alberto De Marchi",
        role: "Defence Coach",
        bio:
          "Part of Italy’s modern coaching group, focused on defensive structure and competitiveness.",
      },
    ],
  },
  {
    nation: "Japan",
    flag: japan,
    coaches: [
      {
        name: "Scott Wisemantel",
        role: "Attack Coach",
        bio:
          "A creative attacking mind whose influence has spanned hemispheres and international systems.",
      },
    ],
  },
];

export default function AssistantCoaches() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Assistant Coaches</h1>
        <p className={styles.heroSub}>
          Specialist coaches responsible for defence, attack, set-piece, and
          tactical execution at international level.
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

      {/* DESCRIPTIVE CONTEXT */}
      <section className={styles.intro}>
        <h2>The Engine Room of Modern Teams</h2>
        <p>
          Assistant coaches translate vision into performance. They design
          systems, prepare units, and shape match-day execution — often working
          beyond the spotlight, yet fundamental to sustained international
          success.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.nation} className={styles.nationSection}>
          <div className={styles.nationHeader}>
            <img src={group.flag} alt="" className={styles.flag} />
            <h2>{group.nation}</h2>
          </div>

          <div className={styles.grid}>
            {group.coaches.map((coach) => (
              <article key={coach.name} className={styles.card}>
                <h3>{coach.name}</h3>
                <span className={styles.role}>{coach.role}</span>
                <p className={styles.bio}>{coach.bio}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
