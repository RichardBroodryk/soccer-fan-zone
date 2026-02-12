import { useNavigate } from "react-router-dom";
import styles from "./SupportStaff.module.css";

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

type StaffMember = {
  name: string;
  role: string;
  era: string;
  bio: string;
};

type NationGroup = {
  nation: string;
  flag: string;
  staff: StaffMember[];
};

const groups: NationGroup[] = [
  {
    nation: "South Africa",
    flag: southAfrica,
    staff: [
      {
        name: "Aled Walters",
        role: "Head of Athletic Performance",
        era: "2018–2023",
        bio:
          "A central figure in South Africa’s World Cup–winning preparation, Walters helped establish conditioning standards that supported durability and late-game dominance.",
      },
      {
        name: "Dr Craig Roberts",
        role: "Team Doctor",
        era: "2016–2023",
        bio:
          "Oversaw medical operations across multiple international campaigns, ensuring player welfare during sustained high-intensity competition.",
      },
    ],
  },
  {
    nation: "New Zealand",
    flag: newZealand,
    staff: [
      {
        name: "Matt Cross",
        role: "Head of Athletic Performance",
        era: "2016–2023",
        bio:
          "Long-serving performance lead whose work helped maintain All Blacks conditioning standards across multiple World Cup cycles.",
      },
    ],
  },
  {
    nation: "Ireland",
    flag: ireland,
    staff: [
      {
        name: "John Pryor",
        role: "Head of Athletic Performance",
        era: "2016–2023",
        bio:
          "A key contributor to Ireland’s conditioning evolution, supporting consistency, resilience, and sustained competitiveness.",
      },
    ],
  },
  {
    nation: "England",
    flag: england,
    staff: [
      {
        name: "Andy Mitchell",
        role: "Performance Director",
        era: "2000–2003",
        bio:
          "Instrumental in integrating preparation, logistics, and performance planning during England’s build-up to Rugby World Cup success.",
      },
    ],
  },
  {
    nation: "France",
    flag: france,
    staff: [
      {
        name: "Vincent Ducasse",
        role: "Head Analyst",
        era: "2019–2023",
        bio:
          "Part of France’s modern high-performance structure, contributing analysis and strategic insight during a period of resurgence.",
      },
    ],
  },
  {
    nation: "Wales",
    flag: wales,
    staff: [
      {
        name: "Geraint John",
        role: "Head Analyst",
        era: "2011–2019",
        bio:
          "A long-serving analyst whose work supported Wales across multiple Six Nations and World Cup campaigns.",
      },
      {
        name: "Dr Craig Roberts",
        role: "Team Doctor",
        era: "2015–2019",
        bio:
          "Provided senior medical leadership during Wales’ sustained period of international competitiveness.",
      },
    ],
  },
  {
    nation: "Scotland",
    flag: scotland,
    staff: [
      {
        name: "Matt Taylor",
        role: "Defensive & Performance Strategy",
        era: "2018–2023",
        bio:
          "Contributed to Scotland’s tactical preparation and defensive organisation during recent international cycles.",
      },
    ],
  },
  {
    nation: "Australia",
    flag: australia,
    staff: [
      {
        name: "Simon Thomas",
        role: "Head of Performance",
        era: "2015–2019",
        bio:
          "Oversaw athletic preparation through demanding international campaigns and World Cup competition.",
      },
    ],
  },
  {
    nation: "Argentina",
    flag: argentina,
    staff: [
      {
        name: "Guillermo Marino",
        role: "Head Analyst",
        era: "2019–2023",
        bio:
          "Supported Argentina’s tactical planning and opposition analysis during their strongest modern-era performances.",
      },
    ],
  },
  {
    nation: "Italy",
    flag: italy,
    staff: [
      {
        name: "Gianni Vio",
        role: "Set-Piece & Performance Consultant",
        era: "2019–2023",
        bio:
          "An influential specialist contributing strategic insight to Italy and multiple international programmes.",
      },
    ],
  },
  {
    nation: "Japan",
    flag: japan,
    staff: [
      {
        name: "Keita Yamaguchi",
        role: "Head of Athletic Performance",
        era: "2019–2023",
        bio:
          "Part of Japan’s high-performance framework supporting conditioning and preparation at World Cup level.",
      },
    ],
  },
];

export default function SupportStaff() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Support Staff</h1>
        <p className={styles.heroSub}>
          Performance, medical, and analytical leaders whose expertise underpinned
          sustained international success.
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
        <h2>The Hidden Infrastructure of Elite Performance</h2>
        <p>
          Support staff create the conditions in which teams can perform at the
          highest level. Through medical oversight, performance science, analysis,
          and operational continuity, these specialists protect players, extend
          careers, and turn preparation into competitive advantage.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.nation} className={styles.nationSection}>
          <div className={styles.nationHeader}>
            <img src={group.flag} alt="" className={styles.flag} />
            <h2>{group.nation}</h2>
          </div>

          <div className={styles.grid}>
            {group.staff.map((member) => (
              <article key={member.name} className={styles.card}>
                <h3>{member.name}</h3>
                <span className={styles.role}>{member.role}</span>
                <span className={styles.meta}>{member.era}</span>
                <p className={styles.bio}>{member.bio}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
