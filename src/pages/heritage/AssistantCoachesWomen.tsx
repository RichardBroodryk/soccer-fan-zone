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
import wales from "../../assets/images/flags/wales.jpg";
import fiji from "../../assets/images/flags/fiji.jpg";

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
    nation: "New Zealand",
    flag: newZealand,
    coaches: [
      {
        name: "Simon Kneebone",
        role: "Forwards Coach",
        bio: "Leads set-piece execution and forward systems within the Black Ferns’ high-performance structure.",
      },
      {
        name: "Tony Christie",
        role: "Attack Coach",
        bio: "Shapes attacking identity and continuity across the backline.",
      },
      {
        name: "Riki Flutey",
        role: "Defence Coach",
        bio: "Drives defensive organisation, alignment, and phase discipline.",
      },
    ],
  },

  {
    nation: "England",
    flag: england,
    coaches: [
      {
        name: "Louis Deacon",
        role: "Forwards Coach",
        bio: "Oversees forward platform and set-piece execution within England’s dominant system.",
      },
      {
        name: "Emily Scarratt",
        role: "Attack Coach",
        bio: "Leads attacking development and backline cohesion following an elite playing career.",
      },
      {
        name: "Sarah Hunter",
        role: "Defence Coach",
        bio: "Former captain providing leadership and defensive clarity.",
      },
    ],
  },

  {
    nation: "Ireland",
    flag: ireland,
    coaches: [
      {
        name: "Alex Codling",
        role: "Forwards Coach",
        bio: "Supports forward development and contact-area efficiency.",
      },
      {
        name: "Denis Fogarty",
        role: "Scrum Coach",
        bio: "Specialist in scrum stability and lineout throwing systems.",
      },
      {
        name: "James Scaysbrook",
        role: "Defence Coach",
        bio: "Leads defensive systems and breakdown organisation.",
      },
      {
        name: "Gareth Steenson",
        role: "Kicking Coach",
        bio: "Supports tactical kicking strategy and game management.",
      },
    ],
  },

  {
    nation: "France",
    flag: france,
    coaches: [
      {
        name: "Gérald Bastide",
        role: "Defence & Skills",
        bio: "Supports defensive structure and individual skill development.",
      },
      {
        name: "Florent Wieczorek",
        role: "Forwards / Attack Support",
        bio: "Contributes to forward systems and attacking integration.",
      },
    ],
  },

  {
    nation: "South Africa",
    flag: southAfrica,
    coaches: [
      {
        name: "Laurian Johannes-Haupt",
        role: "Assistant Coach",
        bio: "Supports tactical preparation and team structure.",
      },
      {
        name: "Franzel September",
        role: "Assistant Coach",
        bio: "Contributes to player development and system alignment.",
      },
      {
        name: "Bafana Nhleko",
        role: "Skills Coach",
        bio: "Enhances individual skill execution and cohesion.",
      },
    ],
  },

  {
    nation: "Scotland",
    flag: scotland,
    coaches: [
      {
        name: "Performance Unit",
        role: "Assistant Structure",
        bio: "Developing high-performance coaching framework supporting international competitiveness.",
      },
    ],
  },

  {
    nation: "Australia",
    flag: australia,
    coaches: [
      {
        name: "Wallaroos Coaching Unit",
        role: "Assistant Structure",
        bio: "Evolving support structure aligned with increasing professionalism.",
      },
    ],
  },

  {
    nation: "Wales",
    flag: wales,
    coaches: [
      {
        name: "WRU Performance Group",
        role: "Assistant Structure",
        bio: "Integrated pathway and national coaching system supporting performance growth.",
      },
    ],
  },

  {
    nation: "Italy",
    flag: italy,
    coaches: [
      {
        name: "FIR Coaching Group",
        role: "Assistant Structure",
        bio: "Supports tactical development and cohesion within Italy’s programme.",
      },
    ],
  },

  {
    nation: "Fiji",
    flag: fiji,
    coaches: [
      {
        name: "Fijiana Development Unit",
        role: "Assistant Structure",
        bio: "Focused on player development and pathway integration.",
      },
    ],
  },

  {
    nation: "Japan",
    flag: japan,
    coaches: [
      {
        name: "JRFU Development Staff",
        role: "Assistant Structure",
        bio: "Supports structured growth, discipline, and tactical clarity.",
      },
    ],
  },

  {
    nation: "Argentina",
    flag: argentina,
    coaches: [
      {
        name: "Emerging Programme Staff",
        role: "Assistant Structure",
        bio: "Supports Argentina’s developing programme through pathway integration.",
      },
    ],
  },
];

export default function AssistantCoachesWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Assistant Coaches — Women’s Game</h1>
        <p className={styles.heroSub}>
          Specialist coaches supporting the rapid evolution and competitiveness
          of the women’s international game.
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

      {/* INTRO */}
      <section className={styles.intro}>
        <h2>High-Performance Support Structures</h2>
        <p>
          Assistant coaches operate within rapidly advancing high-performance
          environments, shaping tactical clarity, player development, and
          international competitiveness.
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