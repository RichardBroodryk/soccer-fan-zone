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
import fiji from "../../assets/images/flags/fiji.jpg";

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
        name: "Andy Edwards",
        role: "Head of Athletic Performance",
        era: "2020–Present",
        bio:
          "Leads South Africa’s high-performance systems, underpinning physical dominance and durability.",
      },
      {
        name: "Duane Vermeulen",
        role: "Breakdown / Mobi-Unit Coach",
        era: "2024–Present",
        bio:
          "Hybrid player-coach role focusing on breakdown excellence, leadership, and on-field tactical reinforcement.",
      },
      {
        name: "Medical Team",
        role: "Performance & Medical Unit",
        era: "2018–Present",
        bio:
          "Integrated medical and conditioning team ensuring player welfare and recovery.",
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
        era: "2016–Present",
        bio:
          "Central to maintaining the All Blacks’ elite conditioning standards across cycles.",
      },
    ],
  },

  {
    nation: "Ireland",
    flag: ireland,
    staff: [
      {
        name: "Performance Unit",
        role: "S&C & Analytics",
        era: "2018–Present",
        bio:
          "Integrated system supporting Ireland through conditioning, analytics, and preparation.",
      },
    ],
  },

  {
    nation: "England",
    flag: england,
    staff: [
      {
        name: "RFU Performance Group",
        role: "High Performance Unit",
        era: "2018–Present",
        bio:
          "Supports England through structured performance systems including S&C and analytics.",
      },
    ],
  },

  {
    nation: "France",
    flag: france,
    staff: [
      {
        name: "FFR Analytics Team",
        role: "Performance Analysis",
        era: "2019–Present",
        bio:
          "Provides tactical analysis and opposition insight within France’s system.",
      },
    ],
  },

  {
    nation: "Wales",
    flag: wales,
    staff: [
      {
        name: "WRU Performance Unit",
        role: "Performance & Medical",
        era: "2018–Present",
        bio:
          "Supports Wales through conditioning, analytics, and player welfare systems.",
      },
    ],
  },

  {
    nation: "Scotland",
    flag: scotland,
    staff: [
      {
        name: "SRU Performance Team",
        role: "S&C & Analysis",
        era: "2018–Present",
        bio:
          "Drives Scotland’s preparation and conditioning.",
      },
    ],
  },

  {
    nation: "Australia",
    flag: australia,
    staff: [
      {
        name: "Rugby Australia Performance Group",
        role: "High Performance",
        era: "2018–Present",
        bio:
          "Supports national teams through conditioning and analytics systems.",
      },
    ],
  },

  {
    nation: "Argentina",
    flag: argentina,
    staff: [
      {
        name: "UAR Performance Unit",
        role: "Performance & Medical",
        era: "2019–Present",
        bio:
          "Provides structural support across analysis and conditioning.",
      },
    ],
  },

  {
    nation: "Italy",
    flag: italy,
    staff: [
      {
        name: "FIR Performance Group",
        role: "High Performance",
        era: "2018–Present",
        bio:
          "Supports Italy through structured performance systems.",
      },
    ],
  },

  {
    nation: "Japan",
    flag: japan,
    staff: [
      {
        name: "Shoji Ito",
        role: "Performance Staff",
        era: "2019–Present",
        bio:
          "Supports structured development and tactical preparation.",
      },
      {
        name: "Ippei Asada",
        role: "Performance Staff",
        era: "2019–Present",
        bio:
          "Contributes to conditioning and programme development.",
      },
      {
        name: "JRFU High Performance Team",
        role: "Performance & Conditioning",
        era: "2019–Present",
        bio:
          "Supports Japan’s disciplined and structured system.",
      },
    ],
  },

  {
    nation: "Fiji",
    flag: fiji,
    staff: [
      {
        name: "Fiji Rugby Performance Unit",
        role: "Development & Conditioning",
        era: "2018–Present",
        bio:
          "Supports Fiji’s programme with growing investment in performance systems.",
      },
    ],
  },
];

export default function SupportStaff() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>Support Staff — Men’s Game</h1>
        <p className={styles.heroSub}>
          Performance, medical, and analytical leaders underpinning elite rugby.
        </p>
      </section>

      <div className={styles.backWrap}>
        <button className={styles.back} onClick={() => navigate("/heritage/coaches")}>
          ← Back to Coaches & Support
        </button>
      </div>

      <section className={styles.intro}>
        <h2>The Infrastructure of Elite Performance</h2>
        <p>
          Conditioning, analytics, and medical systems create the foundation for sustained success.
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