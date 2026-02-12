import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyTeamsManagePage.module.css";

import { teamsMeta, TeamMeta } from "../data/teamsMeta";
import {
  loadMyTeams,
  saveMyTeams,
  StoredTeams,
} from "../utils/myTeamsStorage";

const MAX_PER_GENDER = 2;

export default function MyTeamsManagePage() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState<StoredTeams>({
    men: [],
    women: [],
  });

  useEffect(() => {
    setTeams(loadMyTeams());
  }, []);

  const menTeams = teamsMeta.filter((t) => t.gender === "men");
  const womenTeams = teamsMeta.filter((t) => t.gender === "women");

  const toggleTeam = (team: TeamMeta) => {
    setTeams((prev) => {
      const group = team.gender;
      const selected = prev[group];
      const isSelected = selected.includes(team.id);

      // always allow deselect
      if (isSelected) {
        return {
          ...prev,
          [group]: selected.filter((id) => id !== team.id),
        };
      }

      // block if limit reached
      if (selected.length >= MAX_PER_GENDER) {
        return prev;
      }

      // add if under limit
      return {
        ...prev,
        [group]: [...selected, team.id],
      };
    });
  };

  const handleSave = () => {
    saveMyTeams(teams);
    navigate("/my-teams");
  };

  const renderCard = (team: TeamMeta) => {
    const isSelected = teams[team.gender].includes(team.id);

    return (
      <button
        key={team.id}
        type="button"
        className={`${styles.teamCard} ${
          isSelected ? styles.selected : ""
        }`}
        onClick={() => toggleTeam(team)}
      >
        <img src={team.feather} alt="" className={styles.feather} />
        <div className={styles.teamContent}>
          <img src={team.flag} alt="" className={styles.flag} />
          <h3>{team.name}</h3>
          <p>
            {team.gender === "men"
              ? "Men’s International"
              : "Women’s International"}
          </p>
        </div>
      </button>
    );
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Manage My Teams</h1>
        <p>
          Choose up to two men’s and two women’s national teams.
        </p>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backRow}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/my-teams")}
        >
          ← Back to My Teams
        </button>
      </div>

      {/* MEN */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Men</h2>
        <div className={styles.grid}>
          {menTeams.map(renderCard)}
        </div>
      </section>

      {/* WOMEN */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Women</h2>
        <div className={styles.grid}>
          {womenTeams.map(renderCard)}
        </div>
      </section>

      <div className={styles.actions}>
        <button
          className={styles.secondary}
          onClick={() => navigate("/my-teams")}
        >
          Cancel
        </button>
        <button
          className={styles.primary}
          onClick={handleSave}
        >
          Save Teams
        </button>
      </div>
    </main>
  );
}
