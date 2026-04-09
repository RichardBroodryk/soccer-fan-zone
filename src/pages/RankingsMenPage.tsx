import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Flag from "../components/images/Flag";

import { buildRankings, mensCoachMap } from "../data/rankingsEngine";
import { mensRankingsData } from "../data/rankingsData";

import styles from "./RankingsPage.module.css";

export default function RankingsMenPage() {
  const navigate = useNavigate();

  const rankings = useMemo(() => {
    return buildRankings(mensRankingsData, mensCoachMap);
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>World Rankings — Men</h1>
        <p>Latest international standings based on performance</p>
      </header>

      <div className={styles.backWrap}>
        <button onClick={() => navigate("/tournaments/men")}>
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