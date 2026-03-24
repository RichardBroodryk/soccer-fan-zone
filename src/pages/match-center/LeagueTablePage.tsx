import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./LeagueTablePage.module.css";

import { domesticLeagues } from "../../data/domesticLeagues";
import { tables2026 } from "../../data/tables2026";

import { LEAGUE_API_MAP } from "../../contracts/leagueApiMap";

/* ==================================================
   TYPES
   ================================================== */

type TableRow = {
  position: number;
  team: string;
  coach: string;
  pointsFor: number;
  pointsAgainst: number;
  leaguePoints: number;
};

export default function LeagueTablePage() {
  const { leagueId } = useParams<{ leagueId: string }>();

  const [id, gender] = (leagueId || "").split("-");

  const league = domesticLeagues.find((l) => l.id === id);

  const [table, setTable] = useState<TableRow[]>([]);
  const [loadingTable, setLoadingTable] = useState(true);

  /* ==================================================
     HYBRID TABLE LOADER
     ================================================== */

  useEffect(() => {
    async function loadTable() {
      const key = `${id}-${gender}`;
      const fallback = tables2026[key] || [];

      try {
        const entry = LEAGUE_API_MAP[key];

        // ❌ No API mapping → use fallback fully
        if (!entry) {
          setTable(fallback);
          setLoadingTable(false);
          return;
        }

        const BASE = process.env.REACT_APP_API_BASE;

        const res = await fetch(
          `${BASE}/standings?league=${entry.id}&season=2026`
        );

        if (!res.ok) throw new Error();

        const data = await res.json();

        const standings =
          data?.[0]?.league?.standings?.[0] || [];

        // 🔥 HYBRID MERGE
        const merged: TableRow[] = standings.map(
          (row: any, index: number) => {
            const teamName = row.team.name;

            // 🔥 FIND COACH FROM YOUR DATA
            const fallbackTeam = fallback.find(
              (t) => t.team.toLowerCase() === teamName.toLowerCase()
            );

            return {
              position: row.rank,
              team: teamName,
              coach: fallbackTeam?.coach || "—",
              pointsFor: row.points?.for || 0,
              pointsAgainst: row.points?.against || 0,
              leaguePoints: row.points || 0,
            };
          }
        );

        setTable(merged);
      } catch {
        // 🔒 fallback if anything fails
        setTable(fallback);
      }

      setLoadingTable(false);
    }

    loadTable();
  }, [leagueId, id, gender]);

  if (!league) return <div>League not found</div>;

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>
          {league.name} ({gender})
        </h1>

        <p className={styles.season}>
          Season: {league.season} • Hybrid Data
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Current Standings
        </h2>

        {loadingTable ? (
          <div>Loading...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>Coach</th>
                <th>PF</th>
                <th>PA</th>
                <th>Pts</th>
              </tr>
            </thead>

            <tbody>
              {table.map((row) => (
                <tr key={row.position}>
                  <td>{row.position}</td>
                  <td>{row.team}</td>
                  <td>{row.coach}</td>
                  <td>{row.pointsFor}</td>
                  <td>{row.pointsAgainst}</td>
                  <td>{row.leaguePoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}