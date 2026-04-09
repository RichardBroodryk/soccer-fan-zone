import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Flag from "../components/images/Flag";

import { buildRankings, womensCoachMap } from "../data/rankingsEngine";
import { womensRankingsData } from "../data/rankingsData";

import styles from "./RankingsPage.module.css";

export default function RankingsWomenPage() {
  const navigate = useNavigate();

  const rankings = useMemo(() => {
    return buildRankings(womensRankingsData, womensCoachMap);
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>World Rankings — Women</h1>
        <p>Latest international standings based on performance</p>
      </header>

      <div className={styles.backWrap}>
        <button onClick={() => navigate("/tournaments/women")}>
          ← Back to Tournaments
        </button>
      </div>

      <section className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nation</th>
              <th>Points</th>
              <th>Coach</th>
            </tr>
          </thead>

          <tbody>
            {rankings.map((team) => (
              <tr key={team.country}>
                <td>{team.rank}</td>

                <td className={styles.nation}>
                  <Flag country={team.country} size="small" />
                  <span>{team.team}</span>
                </td>

                <td>{team.points.toFixed(2)}</td>

                <td>{team.coach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}