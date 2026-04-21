import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TournamentPage.module.css";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";
import { buildStandings, type TeamStanding } from "../utils/standings/standingsEngine";
import { flagMap } from "../data/flagMap";
import type { MatchData } from "../data/matches/types";

import MatchRow from "../components/match/MatchRow";
import { getStadiumByName } from "../utils/stadiumResolver";

import { fetchSixNationsWomenMatches } from "../services/sixNationsWomenService";
import { matches2026 } from "../data/matches";

/* 🔥 ADD FLAG COMPONENT */
import Flag from "../components/images/Flag";

export default function TournamentPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);

  const tournament = tournaments2026.find((t) =>
    t.route?.includes(slug || "") || t.conceptId === slug || t.route === slug
  );

  const visual = tournament ? getTournamentVisual(tournament.conceptId) : null;
  const heroImage = tournament?.gender === "women"
    ? visual?.heroImageWomen
    : visual?.heroImageMen || visual?.logo;

  const hasStandings = !["svns"].includes(tournament?.conceptId || "");

  useEffect(() => {
    async function load() {
      if (!tournament) return;
      setLoading(true);

      try {
        if (tournament.conceptId === "six-nations-women") {
          const data = await fetchSixNationsWomenMatches();
          setMatches(data);
        } else {
          const local = matches2026
            .filter((m) => m.competitionId === tournament.conceptId)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          setMatches(local);
        }
      } catch (e) {
        console.error(e);
        setMatches([]);
      }
      setLoading(false);
    }
    load();
  }, [tournament]);

  if (!tournament) return <div className={styles.page}>Tournament not found</div>;

  const standings: TeamStanding[] = hasStandings ? buildStandings(matches) : [];

  const grouped = matches.reduce<Record<string, MatchData[]>>((acc, match) => {
    const key = match.round || match.stage || "All Matches";
    if (!acc[key]) acc[key] = [];
    acc[key].push(match);
    return acc;
  }, {});

  const rounds = Object.keys(grouped).sort();

  /* ==================================================
     🔥 ANTHEM TEAMS (SAFE — NO PLACEHOLDERS)
     ================================================== */

  const anthemTeams = Array.from(
    new Map(
      matches.flatMap((m) => [
        [m.home.country, m.home],
        [m.away.country, m.away],
      ])
    ).values()
  ).filter(
    (team) =>
      team.country &&
      team.country !== "unknown" &&
      flagMap[team.country] // only show nations we actually support
  );

  return (
    <main className={styles.page}>
      <header className={styles.hero} style={{ backgroundImage: `url(${heroImage})` }}>
        <div className={styles.heroContent}>
          <h1>{tournament.name} {tournament.year}</h1>
          <p>{tournament.heroSubtitle}</p>
        </div>
      </header>

      <div className={styles.backNav}>
        <button className={styles.backButton} onClick={() => navigate("/tournaments")}>
          ← Back to Tournaments
        </button>
      </div>

      {/* ==================================================
          🔥 ANTHEMS SECTION (INSERTED — SAFE)
         ================================================== */}

      {anthemTeams.length > 0 && (
        <section className={styles.section}>
          <h2>Anthems</h2>
          <p>Click a flag to view the national anthem</p>

          <div className={styles.flagsGrid}>
            {anthemTeams.map((team) => (
              <div
                key={team.country}
                onClick={() => navigate(`/anthems/${team.country}`)}
                style={{ cursor: "pointer" }}
              >
                <Flag country={team.country} size="medium" />
              </div>
            ))}
          </div>
        </section>
      )}

      {hasStandings && (
        <section className={styles.section}>
          <h2>Standings</h2>
          <table className={styles.standingsTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>PD</th>
                <th>Pts</th>
                <th>Form</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((t, i) => {
                const countryKey = t.country || t.team.toLowerCase().replace(/ w$/, "");
                const flag = flagMap[countryKey];

                return (
                  <tr key={t.team}>
                    <td>{i + 1}</td>
                    <td className={styles.teamCell}>
                      {flag && <img src={flag} alt="" className={styles.flag} />}
                      <span>{t.team}</span>
                    </td>
                    <td>{t.played}</td>
                    <td>{t.won}</td>
                    <td>{t.drawn}</td>
                    <td>{t.lost}</td>
                    <td>{t.pointsDiff}</td>
                    <td className={styles.points}>{t.points}</td>
                    <td className={styles.form}>
                      {t.form.map((f, idx) => (
                        <span
                          key={idx}
                          className={f === "W" ? styles.win : f === "L" ? styles.loss : styles.draw}
                        >
                          {f}
                        </span>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      {loading && <div className={styles.section}>Loading matches...</div>}

      {!loading && rounds.map((round) => (
        <section key={round} className={styles.section}>
          <h2>{round}</h2>
          <div className={styles.matches}>
            {grouped[round].map((match) => {
              const stadium = getStadiumByName(match.venue);
              return (
                <MatchRow
                  key={match.id}
                  home={match.home}
                  away={match.away}
                  state={match.state || "upcoming"}
                  score={match.score}
                  metaLeft={new Date(match.date).toLocaleDateString("en-GB")}
                  metaRight={stadium?.slug}
                  onClick={() => navigate(`/match/${match.id}`, { state: { ...match, tournamentSlug: slug } })}
                />
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}