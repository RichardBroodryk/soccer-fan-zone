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
    nation: "South Africa",
    flag: southAfrica,
    coaches: [
      { name: "Tony Brown", role: "Attack Coach", bio: "Drives attacking evolution while complementing South Africa’s physical identity." },
      { name: "Mzwandile Stick", role: "Backline & Skills Coach", bio: "Core figure in continuity, skills, and player development." },
      { name: "Deon Davids", role: "Forwards Coach", bio: "Leads forward cohesion, breakdown systems, and pack dominance." },
      { name: "Daan Human", role: "Scrum Coach", bio: "World-leading scrum specialist underpinning set-piece superiority." },
      { name: "Jerry Flannery", role: "Defence Coach", bio: "Adds defensive structure and European tactical perspective." },
      { name: "Felix Jones", role: "Tactical & Defence", bio: "Strategic planner integrating analysis, defence, and overall systems." },
    ],
  },

  {
    nation: "New Zealand",
    flag: newZealand,
    coaches: [
      { name: "Neil Barnes", role: "Senior Assistant", bio: "Provides leadership, lineout expertise, and strategic continuity." },
      { name: "Jason Ryan", role: "Forwards Coach", bio: "Maintains physical edge and pack cohesion." },
      { name: "Tana Umaga", role: "Defence Coach", bio: "Brings defensive insight and cultural leadership." },
      { name: "Mike Blair", role: "Attack Coach", bio: "Leads creative attacking systems and backline execution." },
    ],
  },

  {
    nation: "Ireland",
    flag: ireland,
    coaches: [
      { name: "Simon Easterby", role: "Defence Coach", bio: "Architect of aggressive defensive systems." },
      { name: "Andrew Goodman", role: "Attack Coach", bio: "Leads attacking framework and backline structure." },
      { name: "Paul O'Connell", role: "Forwards Coach", bio: "Shapes forward identity and leadership culture." },
      { name: "John Fogarty", role: "Scrum Coach", bio: "Ensures technical excellence in set-piece." },
    ],
  },

  {
    nation: "France",
    flag: france,
    coaches: [
      { name: "Shaun Edwards", role: "Defence Coach", bio: "Globally respected defensive strategist." },
      { name: "William Servat", role: "Forwards Coach", bio: "Leads forward power and set-piece systems." },
      { name: "Laurent Sempéré", role: "Set-Piece Coach", bio: "Supports scrum and lineout execution." },
    ],
  },

  {
    nation: "England",
    flag: england,
    coaches: [
      { name: "Richard Wigglesworth", role: "Attack / Defence", bio: "Versatile coach shaping tactical structure." },
      { name: "Joe El-Abd", role: "Defence Coach", bio: "Drives defensive organisation and discipline." },
      { name: "Andrew Strawbridge", role: "Forwards Coach", bio: "Leads set-piece and forward systems." },
    ],
  },

  {
    nation: "Scotland",
    flag: scotland,
    coaches: [
      { name: "Lee Radford", role: "Defence Coach", bio: "Leads defensive organisation and resilience." },
    ],
  },

  {
    nation: "Australia",
    flag: australia,
    coaches: [
      { name: "Laurie Fisher", role: "Forwards Coach", bio: "Experienced forward strategist." },
      { name: "Mike Cron", role: "Scrum Coach", bio: "Renowned global scrum expert." },
    ],
  },

  {
    nation: "Argentina",
    flag: argentina,
    coaches: [
      { name: "Andrés Bordoy", role: "Scrum Coach", bio: "Leads scrum systems and forward identity." },
    ],
  },

  {
    nation: "Italy",
    flag: italy,
    coaches: [
      { name: "Germán Fernández", role: "Assistant Coach", bio: "Supports tactical structure and development." },
    ],
  },

  {
    nation: "Wales",
    flag: wales,
    coaches: [
      { name: "Danny Wilson", role: "Forwards Coach", bio: "Leads pack and set-piece systems." },
      { name: "Matt Sherratt", role: "Attack Coach", bio: "Drives attacking organisation." },
    ],
  },

  {
    nation: "Fiji",
    flag: fiji,
    coaches: [
      { name: "Ifereimi Rawaqa", role: "Forwards Coach", bio: "Focuses on physicality and contact dominance." },
    ],
  },

  {
    nation: "Japan",
    flag: japan,
    coaches: [
      { name: "Neal Hatley", role: "Forwards Coach", bio: "Leads scrum and forward systems." },
      { name: "Gary Gold", role: "Defence Coach", bio: "Brings international defensive expertise." },
      { name: "Victor Matfield", role: "Lineout Consultant", bio: "Provides elite lineout and forward insight." },
    ],
  },
];

export default function AssistantCoaches() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>Assistant Coaches — Men’s Game</h1>
        <p className={styles.heroSub}>
          Specialist coaches responsible for defence, attack, set-piece, and tactical execution.
        </p>
      </section>

      <div className={styles.backWrap}>
        <button className={styles.back} onClick={() => navigate("/heritage/coaches")}>
          ← Back to Coaches & Support
        </button>
      </div>

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