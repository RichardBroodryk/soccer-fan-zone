import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import Flag from "../components/images/Flag";
import MatchRow from "../components/match/MatchRow";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";
import { matches2026 } from "../data/matches";

import type { MatchData } from "../data/matches/types";

import StandingsTable from "../components/tournament/StandingsTable";
import { buildStandings } from "../utils/standings/standingsEngine";

import { getPoolQualifiers } from "../utils/svns/getPoolQualifiers";
import { buildQuarterFinals } from "../utils/svns/buildKnockout";
import { buildSemiFinals, buildFinal } from "../utils/svns/progression";

import styles from "./TournamentPage.module.css";
import svnsHero from "../assets/images/tournaments/svns-2026.jpg";

/* ================= STATE ================= */
function resolveState(match: MatchData): "final" | "upcoming" {
  if ((match as any).state) return (match as any).state;
  if (match.score) return "final";
  return new Date(match.date) > new Date() ? "upcoming" : "final";
}

export default function TournamentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.route === location.pathname
  );

  const matches = useMemo((): MatchData[] => {
    if (!tournament) return [];

    return matches2026
      .filter(
        (m) =>
          m.tournamentInstanceId &&
          m.tournamentInstanceId === tournament.instanceId
      )
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );
  }, [tournament]);

  if (!tournament) {
    return <div className={styles.error}>Tournament not found</div>;
  }

  const visual = getTournamentVisual(tournament.conceptId);
  const isSVNS = tournament.conceptId === "svns";

  const heroImage = isSVNS
    ? svnsHero
    : tournament.gender === "women"
    ? visual.heroImageWomen
    : visual.heroImageMen;

  /* ================= TEAMS ================= */
  const teams = Array.from(
    new Map(
      matches.flatMap((m) => [
        [m.home.country, m.home],
        [m.away.country, m.away],
      ])
    ).values()
  );

  /* ================= SVNS STRUCTURE ================= */
  const stages = ["hong-kong", "valladolid", "bordeaux"];
  const pools = ["A", "B", "C"];

  const menPools = matches.filter(
    (m) => m.gender === "men" && m.round === "pool"
  );

  const womenPools = matches.filter(
    (m) => m.gender === "women" && m.round === "pool"
  );

  /* ================= PROGRESSION ================= */
  const menQualifiers = getPoolQualifiers(menPools);
  const womenQualifiers = getPoolQualifiers(womenPools);

  const menQF = buildQuarterFinals(menQualifiers);
  const womenQF = buildQuarterFinals(womenQualifiers);

  const menSF = buildSemiFinals(menQF);
const womenSF = buildSemiFinals(womenQF);

const menFinal = buildFinal(menSF);
const womenFinal = buildFinal(womenSF);

  const groupByStage = (list: MatchData[], stage: string) =>
    list.filter((m) => m.stage === stage);

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={`${styles.hero} ${
          visual.heroLayout === "contained"
            ? styles.heroContained
            : ""
        }`}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {!isSVNS && (
          <div className={styles.heroContent}>
            <h1>
              {tournament.name} {tournament.year}
            </h1>
            {tournament.heroSubtitle && (
              <p>{tournament.heroSubtitle}</p>
            )}
            <div className={styles.statusBadge}>
              {tournament.status?.toUpperCase()}
            </div>
          </div>
        )}

        {isSVNS && (
          <div className={styles.heroBadgeBottom}>
            {tournament.status?.toUpperCase()}
          </div>
        )}
      </header>

      {/* TITLE */}
      {isSVNS && (
        <div className={styles.titleBlock}>
          <h1>
            {tournament.name} {tournament.year}
          </h1>
        </div>
      )}

      {/* BACK */}
      <div className={styles.backNav}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/tournaments")}
        >
          ← Back to Tournaments
        </button>
      </div>

      {/* ================= ANTHEMS ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Anthems</h2>
        </div>

        <div className={styles.flagsGrid}>
          {teams.map((team) => (
            <div
              key={team.country}
              onClick={() =>
                team.country !== "unknown" &&
                navigate(`/anthems/${team.country}`)
              }
            >
              <Flag country={team.country} size="medium" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= MATCH CENTRE ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Match Centre</h2>
        </div>

        {isSVNS && (
          <>
            {/* ================= MEN POOLS ================= */}
            <div className={styles.stageBlock}>
              <h3 className={styles.stageTitle}>Men</h3>

              {stages.map((stage) => {
                const stageMatches = groupByStage(
                  menPools,
                  stage
                );

                return (
                  <div key={stage}>
                    <h4 className={styles.stageSubtitle}>
                      {stage.replace("-", " ").toUpperCase()}
                    </h4>

                    {pools.map((pool) => {
                      const poolMatches = stageMatches.filter(
                        (m) => m.pool === pool
                      );

                      if (!poolMatches.length) return null;

                      return (
                        <div key={pool}>
                          <h5>Pool {pool}</h5>

                          <StandingsTable
                            data={buildStandings(poolMatches)}
                          />

                          {poolMatches.map((match) => (
                            <MatchRow
                              key={match.id}
                              home={match.home}
                              away={match.away}
                              state={resolveState(match)}
                              score={match.score}
                              metaLeft={match.date}
                              metaRight={match.venue}
                              onClick={() =>
                                navigate(`/match/${match.id}`)
                              }
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* ================= MEN KNOCKOUT ================= */}
            {menQF.length > 0 && (
              <div className={styles.stageBlock}>
                <h3 className={styles.stageTitle}>
                  Men — Knockout
                </h3>

                <h4 className={styles.stageSubtitle}>
                  QUARTER-FINAL
                </h4>
                {menQF.map((match) => (
                  <MatchRow
                    key={match.id}
                    home={match.home || { name: "TBD", country: "unknown" }}
                    away={match.away || { name: "TBD", country: "unknown" }}
                    state="upcoming"
                    metaLeft="TBD"
                    metaRight="Quarter Final"
                  />
                ))}

                <h4 className={styles.stageSubtitle}>SEMI-FINAL</h4>

{menSF.map((match) => (
  <MatchRow
    key={match.id}
    home={match.home}
    away={match.away}
    state="upcoming"
    metaLeft="TBD"
    metaRight="Semi Final"
  />
))}

<h4 className={styles.stageSubtitle}>FINAL</h4>

<MatchRow
  home={menFinal.home}
  away={menFinal.away}
  state="upcoming"
  metaLeft="TBD"
  metaRight="Final"
/>
              </div>
            )}

            {/* ================= WOMEN POOLS ================= */}
            <div className={styles.stageBlock}>
              <h3 className={styles.stageTitle}>Women</h3>

              {stages.map((stage) => {
                const stageMatches = groupByStage(
                  womenPools,
                  stage
                );

                return (
                  <div key={stage}>
                    <h4 className={styles.stageSubtitle}>
                      {stage.replace("-", " ").toUpperCase()}
                    </h4>

                    {pools.map((pool) => {
                      const poolMatches = stageMatches.filter(
                        (m) => m.pool === pool
                      );

                      if (!poolMatches.length) return null;

                      return (
                        <div key={pool}>
                          <h5>Pool {pool}</h5>

                          <StandingsTable
                            data={buildStandings(poolMatches)}
                          />

                          {poolMatches.map((match) => (
                            <MatchRow
                              key={match.id}
                              home={match.home}
                              away={match.away}
                              state={resolveState(match)}
                              score={match.score}
                              metaLeft={match.date}
                              metaRight={match.venue}
                              onClick={() =>
                                navigate(`/match/${match.id}`)
                              }
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* ================= WOMEN KNOCKOUT ================= */}
            {womenQF.length > 0 && (
              <div className={styles.stageBlock}>
                <h3 className={styles.stageTitle}>
                  Women — Knockout
                </h3>

                <h4 className={styles.stageSubtitle}>
                  QUARTER-FINAL
                </h4>
                {womenQF.map((match) => (
                  <MatchRow
                    key={match.id}
                    home={match.home || { name: "TBD", country: "unknown" }}
                    away={match.away || { name: "TBD", country: "unknown" }}
                    state="upcoming"
                    metaLeft="TBD"
                    metaRight="Quarter Final"
                  />
                ))}

                <h4 className={styles.stageSubtitle}>SEMI-FINAL</h4>

{womenSF.map((match) => (
  <MatchRow
    key={match.id}
    home={match.home}
    away={match.away}
    state="upcoming"
    metaLeft="TBD"
    metaRight="Semi Final"
  />
))}

<h4 className={styles.stageSubtitle}>FINAL</h4>

<MatchRow
  home={womenFinal.home}
  away={womenFinal.away}
  state="upcoming"
  metaLeft="TBD"
  metaRight="Final"
/>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}