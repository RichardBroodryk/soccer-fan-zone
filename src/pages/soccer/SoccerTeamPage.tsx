// src/pages/soccer/SoccerTeamPage.tsx

import { useMemo } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import styles from "./SoccerTeamPage.module.css";

import { teams } from "../../data/soccer/teams";
import { groups } from "../../data/soccer/groups";
import { matches } from "../../data/soccer/matches";
import { stadiums } from "../../data/soccer/stadiums";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import AutoContentRail from "../../components/ui/AutoContentRail";
import HubCard from "../../components/homepage/HubCard";
import SoccerMatchRow from "../../components/soccer/SoccerMatchRow";

import {
  getTeamGalleryImages,
  getConfederationTheme,
} from "../../utils/soccer/getTeamImages";

import algeriaFlag from "../../assets/soccer/flags/algeria.jpg";
import argentinaFlag from "../../assets/soccer/flags/argentina.jpg";
import australiaFlag from "../../assets/soccer/flags/australia.jpg";
import austriaFlag from "../../assets/soccer/flags/austria.jpg";
import belgiumFlag from "../../assets/soccer/flags/belgium.jpg";
import bosniaFlag from "../../assets/soccer/flags/bosnia-herzegovina.jpg";
import brazilFlag from "../../assets/soccer/flags/brazil.jpg";
import cameroonFlag from "../../assets/soccer/flags/cameroon.jpg";
import canadaFlag from "../../assets/soccer/flags/canada.jpg";
import capeVerdeFlag from "../../assets/soccer/flags/cape-verde.jpg";
import colombiaFlag from "../../assets/soccer/flags/colombia.jpg";
import congoFlag from "../../assets/soccer/flags/congodr.jpg";
import coteFlag from "../../assets/soccer/flags/cote-divoire.jpg";
import croatiaFlag from "../../assets/soccer/flags/croatia.jpg";
import curacaoFlag from "../../assets/soccer/flags/curacao.jpg";
import czechFlag from "../../assets/soccer/flags/czech.jpg";
import ecuadorFlag from "../../assets/soccer/flags/ecuador.jpg";
import egyptFlag from "../../assets/soccer/flags/egypt.jpg";
import englandFlag from "../../assets/soccer/flags/england.png";
import franceFlag from "../../assets/soccer/flags/france.jpg";
import germanyFlag from "../../assets/soccer/flags/germany.jpg";
import ghanaFlag from "../../assets/soccer/flags/ghana.jpg";
import haitiFlag from "../../assets/soccer/flags/haiti.jpg";
import iranFlag from "../../assets/soccer/flags/iran.jpg";
import iraqFlag from "../../assets/soccer/flags/iraq.jpg";
import japanFlag from "../../assets/soccer/flags/japan.jpg";
import jordanFlag from "../../assets/soccer/flags/jordan.jpg";
import mexicoFlag from "../../assets/soccer/flags/mexico.jpg";
import moroccoFlag from "../../assets/soccer/flags/morocco.jpg";
import netherlandsFlag from "../../assets/soccer/flags/netherland.jpg";
import newZealandFlag from "../../assets/soccer/flags/new-zealand.jpg";
import norwayFlag from "../../assets/soccer/flags/norway.jpg";
import panamaFlag from "../../assets/soccer/flags/panama.jpg";
import paraguayFlag from "../../assets/soccer/flags/paraguay.jpg";
import portugalFlag from "../../assets/soccer/flags/portugal.jpg";
import qatarFlag from "../../assets/soccer/flags/qatar.jpg";
import saudiFlag from "../../assets/soccer/flags/saudi-arabia.jpg";
import scotlandFlag from "../../assets/soccer/flags/scotland.jpg";
import senegalFlag from "../../assets/soccer/flags/senegal.jpg";
import southAfricaFlag from "../../assets/soccer/flags/south-africa.jpg";
import southKoreaFlag from "../../assets/soccer/flags/south-korea.jpg";
import spainFlag from "../../assets/soccer/flags/spain.jpg";
import swedenFlag from "../../assets/soccer/flags/sweden.jpg";
import switzerlandFlag from "../../assets/soccer/flags/switzerland.jpg";
import tunisiaFlag from "../../assets/soccer/flags/tunisia.jpg";
import turkeyFlag from "../../assets/soccer/flags/turkey.jpg";
import uruguayFlag from "../../assets/soccer/flags/uruguay.jpg";
import usaFlag from "../../assets/soccer/flags/usa.jpg";
import uzbekistanFlag from "../../assets/soccer/flags/uzbekistan.jpg";

import {
  getTeamTheme,
} from "../../utils/soccer/getTeamTheme";

import {
  getPlayersByTeam,
} from "../../data/soccer/playerHelpers";

import {
  getAverageAge,
  getMostExperiencedPlayer,
  getOldestPlayer,
  getPositionBreakdown,
  getTeamTopScorer,
  getTotalCaps,
  getTotalGoals,
  getYoungestPlayer,
} from "../../utils/soccer/teamAnalytics";

import type {
  SoccerPlayer,
} from "../../data/soccer/players";

import {
  getStadiumHeroImage,
} from "../../utils/soccer/getStadiumImages";

/* ICONS */

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";
import UsersIcon from "../../components/icons/UsersIcon";

export default function SoccerTeamPage() {
  const { teamId } = useParams();

  const navigate = useNavigate();

  /* ======================================================
     TEAM
     ====================================================== */

  const team = useMemo(() => {
    return teams.find(
      (t) => t.id === teamId
    );
  }, [teamId]);

  /* ======================================================
     GROUP
     ====================================================== */

  const group = useMemo(() => {
    if (!team) {
      return null;
    }

    return groups.find((g) =>
      g.teams.includes(team.name)
    );
  }, [team]);

  /* ======================================================
     MATCHES
     ====================================================== */

  const teamMatches = useMemo(() => {
    if (!team) {
      return [];
    }

    return matches.filter(
      (m: SoccerMatch) =>
        m.home === team.name ||
        m.away === team.name
    );
  }, [team]);

  /* ======================================================
     STADIUMS
     ====================================================== */

  const relatedStadiums =
    useMemo(() => {
      const stadiumIds =
        new Set(
          teamMatches
            .map(
              (m) =>
                m.stadiumId
            )
            .filter(Boolean)
        );

      return stadiums.filter(
        (s) =>
          stadiumIds.has(s.id)
      );
    }, [teamMatches]);

  /* ======================================================
     FILTERS
     ====================================================== */

  const upcomingMatches =
    useMemo(() => {
      return teamMatches.filter(
        (m) =>
          m.status ===
          "upcoming"
      );
    }, [teamMatches]);

  const liveMatches =
    useMemo(() => {
      return teamMatches.filter(
        (m) =>
          m.status === "live"
      );
    }, [teamMatches]);

  const completedMatches =
    useMemo(() => {
      return teamMatches.filter(
        (m) =>
          m.status === "final"
      );
    }, [teamMatches]);

    /* ======================================================
   PLAYERS
   ====================================================== */

const squad = useMemo(() => {
  if (!team) {
    return [];
  }

  return getPlayersByTeam(
    team.id
  );
}, [team]);

/* ======================================================
   IMMERSION
   ====================================================== */

const flagMap: Record<
  string,
  string
> = {
  algeria: algeriaFlag,

  argentina: argentinaFlag,

  australia: australiaFlag,

  austria: austriaFlag,

  belgium: belgiumFlag,

  "bosnia-herzegovina":
    bosniaFlag,

  brazil: brazilFlag,

  cameroon: cameroonFlag,

  canada: canadaFlag,

  "cape-verde":
    capeVerdeFlag,

  colombia: colombiaFlag,

  congodr: congoFlag,

  "cote-divoire":
    coteFlag,

  croatia: croatiaFlag,

  curacao: curacaoFlag,

  czech: czechFlag,

  ecuador: ecuadorFlag,

  egypt: egyptFlag,

  england: englandFlag,

  france: franceFlag,

  germany: germanyFlag,

  ghana: ghanaFlag,

  haiti: haitiFlag,

  iran: iranFlag,

  iraq: iraqFlag,

  japan: japanFlag,

  jordan: jordanFlag,

  mexico: mexicoFlag,

  morocco: moroccoFlag,

  netherlands:
    netherlandsFlag,

  "new-zealand":
    newZealandFlag,

  norway: norwayFlag,

  panama: panamaFlag,

  paraguay: paraguayFlag,

  portugal: portugalFlag,

  qatar: qatarFlag,

  "saudi-arabia":
    saudiFlag,

  scotland:
    scotlandFlag,

  senegal: senegalFlag,

  "south-africa":
    southAfricaFlag,

  "south-korea":
    southKoreaFlag,

  spain: spainFlag,

  sweden: swedenFlag,

  switzerland:
    switzerlandFlag,

  tunisia: tunisiaFlag,

  turkey: turkeyFlag,

  uruguay: uruguayFlag,

  usa: usaFlag,

  uzbekistan:
    uzbekistanFlag,
};

const heroImage =
  flagMap[
    team?.id || ""
  ] || "";

const galleryImages =
  getTeamGalleryImages(
    team?.id || ""
  );

const federationTheme =
  getConfederationTheme(
    team?.region || "UEFA"
  );

const teamTheme =
  getTeamTheme({
    teamId:
      team?.id || "",

    region:
      team?.region ||
      "UEFA",
  });

/* ======================================================
   NOT FOUND
   ====================================================== */

if (!team) {
  return (
    <main className={styles.page}>
      <div className={styles.empty}>
        Team not found.
      </div>
    </main>
  );
}

const safeTeam = team;

/* ======================================================
   TACTICAL IDENTITY
   ====================================================== */

const tacticalIdentity = {
  formation:
    safeTeam.region === "UEFA"
      ? "4-3-3"
      : safeTeam.region ===
        "CONMEBOL"
      ? "4-2-3-1"
      : safeTeam.region ===
        "CAF"
      ? "4-4-2"
      : "4-3-3",

  playStyle:
    safeTeam.region === "UEFA"
      ? "High-possession attacking football"
      : safeTeam.region ===
        "CONMEBOL"
      ? "Creative transition play"
      : safeTeam.region ===
        "CAF"
      ? "Explosive athletic counter attacks"
      : "Dynamic tactical structure",

  expectation:
    liveMatches.length > 0
      ? "In contention"
      : "Tournament challenger",

  strength:
    safeTeam.region === "UEFA"
      ? "Structured build-up"
      : safeTeam.region ===
        "CONMEBOL"
      ? "Technical attacking quality"
      : safeTeam.region ===
        "CAF"
      ? "Physical intensity"
      : "Collective organization",
};

/* ======================================================
   PLAYERS
   ====================================================== */

const teamPlayers =
  getPlayersByTeam(
    safeTeam.id
  );

const keyPlayers =
  [...teamPlayers]
    .sort((a, b) => {
      const goalDiff =
        (b.goals ?? 0) -
        (a.goals ?? 0);

      if (goalDiff !== 0) {
        return goalDiff;
      }

      return (
        (b.assists ?? 0) -
        (a.assists ?? 0)
      );
    })
    .slice(0, 4);

const captain =
  teamPlayers.find(
    (p) =>
      p.number === 10
  ) || teamPlayers[0];

  /* ======================================================
   ANALYTICS
   ====================================================== */

const squadBreakdown =
  getPositionBreakdown(
    safeTeam.id
  );

const averageAge =
  getAverageAge(
    safeTeam.id
  );

const totalCaps =
  getTotalCaps(
    safeTeam.id
  );

const totalGoals =
  getTotalGoals(
    safeTeam.id
  );

const topScorer =
  getTeamTopScorer(
    safeTeam.id
  );

const experiencedPlayer =
  getMostExperiencedPlayer(
    safeTeam.id
  );

const youngestPlayer =
  getYoungestPlayer(
    safeTeam.id
  );

const oldestPlayer =
  getOldestPlayer(
    safeTeam.id
  );

  return (
  <PageWrapper imageUrl={backgroundLight}>
    <main className={styles.page}>
      {/* ======================================================
          HERO
          ====================================================== */}

      <header
  className={styles.heroCard}
        style={{
          backgroundImage: `
            ${teamTheme.overlay},
            ${federationTheme.gradient},
            url(${heroImage})
          `,

          backgroundSize:
            "cover",

          backgroundPosition:
            "center",

          position: "relative",

          overflow: "hidden",

          minHeight:
          "540px",
        }}
      >
        {/* ATMOSPHERE */}

        <div
          style={{
            position:
              "absolute",

            inset: 0,

            background:
              teamTheme.atmosphere,

            pointerEvents:
              "none",

            zIndex: 1,
          }}
        />

        {/* OVERLAY */}

        <div
          className={
            styles.heroOverlay
          }
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.42))",
          }}
        />

        {/* HERO CONTENT */}

        <div
  style={{
    position: "relative",
    zIndex: 3,

    width: "100%",

    display: "flex",
    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    textAlign: "center",

    paddingTop: "30px",

    paddingBottom: "60px",
  }}
>
          {/* TOP PILL */}

          <div
            style={{
              display:
                "inline-flex",

              alignItems:
                "center",

              gap: "10px",

              padding:
                "10px 18px",

              borderRadius:
                "999px",

              background:
                `${teamTheme.accent}22`,

              backdropFilter:
                "blur(10px)",

              marginBottom:
                "18px",

              fontWeight: 800,

              fontSize:
                "0.9rem",

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",

              border: `
                1px solid ${teamTheme.accent}55
              `,

              boxShadow:
                teamTheme.glow,
            }}
          >
            GLOBAL WORLD CUP 2026
          </div>

          {/* TITLE */}

          <h1
            style={{
              fontSize:
                "clamp(3rem, 8vw, 6rem)",

              lineHeight: 1,

              marginBottom:
                "16px",

              fontWeight: 900,

              textShadow:
                "0 10px 30px rgba(0,0,0,0.45)",
            }}
          >
            {team.name}
          </h1>

          {/* DESCRIPTION */}

          <p
            style={{
             maxWidth:
             "720px",

             margin:
             "0 auto",

              lineHeight: 1.8,

              fontSize:
                "1.08rem",

              color:
                "rgba(255,255,255,0.92)",

              textShadow:
                "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            {team.region} Confederation
            <br />
            Head Coach:{" "}
            {team.coach}
          </p>

          {/* ACTIONS */}

          <div
            style={{
              display: "flex",

              gap: "14px",

              flexWrap:
                "wrap",

              marginTop:
             "26px",

              marginBottom:
             "30px",
            }}
          >
            <button
              onClick={() =>
                navigate(
                  `/anthems/${team.id}`
                )
              }
              style={{
                border:
                  "none",

                cursor:
                  "pointer",

                padding:
                  "14px 24px",

                borderRadius:
                  "999px",

                fontWeight: 800,

                fontSize:
                  "1rem",

                background:
                  "#ffffff",

                color:
                  "#111827",

                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.25)",
              }}
            >
              ▶ National Anthem
            </button>

            <button
              onClick={() =>
                navigate(
                  "/soccer/matches"
                )
              }
              style={{
                border:
                  "1px solid rgba(255,255,255,0.25)",

                cursor:
                  "pointer",

                padding:
                  "14px 24px",

                borderRadius:
                  "999px",

                fontWeight: 800,

                fontSize:
                  "1rem",

                background:
                  "rgba(255,255,255,0.12)",

                color:
                  "#ffffff",

                backdropFilter:
                  "blur(10px)",
              }}
            >
              View Fixtures
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================
          BACK
          ====================================================== */}

      <div className={styles.backWrap}>
        <button
  className={styles.backButton}
          onClick={() =>
            navigate(
              "/soccer/teams"
            )
          }
        >
          ← Back to Teams
        </button>
      </div>

      {/* ======================================================
          TEAM OVERVIEW
          ====================================================== */}

      <section
      >
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",

            gap: "18px",
          }}
        >
          {[
            {
              label:
                "Confederation",

              value:
                team.region,
            },

            {
              label:
                "World Cup Group",

              value:
                group?.name ||
                "TBD",
            },

            {
              label:
                "Scheduled Matches",

              value:
                teamMatches.length,
            },

            {
              label:
                "Live Matches",

              value:
                liveMatches.length,
            },
          ].map(
            (item, index) => (
              <div
                key={index}
                style={{
                  background:
                    "#ffffff",

                  borderRadius:
                    "26px",

                  padding:
                    "30px",

                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.08)",

                  border:
                    "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    color:
                      "#6b7280",

                    marginBottom:
                      "12px",

                    fontSize:
                      "0.92rem",

                    textTransform:
                      "uppercase",

                    letterSpacing:
                      "0.05em",
                  }}
                >
                  {item.label}
                </div>

                <div
                  style={{
                    fontSize:
                      "2rem",

                    fontWeight: 900,

                    color:
                      "#111827",
                  }}
                >
                  {item.value}
                </div>
              </div>
            )
          )}
        </div>
      </section>

{/* ======================================================
    LEADERSHIP CORE
====================================================== */}

<section
>
  <div
    style={{
      position:
        "relative",

      overflow:
        "hidden",

      borderRadius:
        "34px",

      background:
        "linear-gradient(135deg, #0f172a, #1e293b)",

      color:
        "#ffffff",

      padding: "40px",

      boxShadow:
        teamTheme.glow,
    }}
  >
    {/* ATMOSPHERE */}

    <div
      style={{
        position:
          "absolute",

        inset: 0,

        background:
          teamTheme.atmosphere,

        pointerEvents:
          "none",
      }}
    />

    {/* LIGHT */}

    <div
      style={{
        position:
          "absolute",

        inset: 0,

        background:
          "radial-gradient(circle at top right, rgba(255,255,255,0.10), transparent 40%)",
      }}
    />

    {/* CONTENT */}

    <div
      style={{
        position:
          "relative",

        zIndex: 3,
      }}
    >
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: "28px",
        }}
      >
        {/* CAPTAIN */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.08)",

            border:
              "1px solid rgba(255,255,255,0.10)",

            borderRadius:
              "28px",

            padding:
              "28px",

            backdropFilter:
              "blur(12px)",
          }}
        >
          <div
            style={{
              opacity: 0.7,

              marginBottom:
                "12px",

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",

              fontSize:
                "0.78rem",

              fontWeight: 700,
            }}
          >
            Team Captain
          </div>

          <div
            style={{
              fontSize:
                "2rem",

              fontWeight: 900,

              marginBottom:
                "10px",
            }}
          >
            {captain?.name ||
              "TBD"}
          </div>

          <div
            style={{
              opacity: 0.82,

              marginBottom:
                "18px",
            }}
          >
            {captain?.club}
          </div>

          <div
            style={{
              display:
                "inline-flex",

              alignItems:
                "center",

              gap: "8px",

              padding:
                "10px 16px",

              borderRadius:
                "999px",

              background:
                `${teamTheme.accent}22`,

              border: `1px solid ${teamTheme.accent}55`,

              fontWeight: 800,
            }}
          >
            #{captain?.number}
          </div>
        </div>

        {/* STAR PLAYER */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.08)",

            border:
              "1px solid rgba(255,255,255,0.10)",

            borderRadius:
              "28px",

            padding:
              "28px",

            backdropFilter:
              "blur(12px)",
          }}
        >
          <div
            style={{
              opacity: 0.7,

              marginBottom:
                "12px",

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",

              fontSize:
                "0.78rem",

              fontWeight: 700,
            }}
          >
            Tournament Star
          </div>

          <div
            style={{
              fontSize:
                "2rem",

              fontWeight: 900,

              marginBottom:
                "10px",
            }}
          >
            {keyPlayers[0]
              ?.name || "TBD"}
          </div>

          <div
            style={{
              opacity: 0.82,

              marginBottom:
                "18px",
            }}
          >
            {keyPlayers[0]
              ?.club}
          </div>

          <div
            style={{
              display:
                "flex",

              gap: "10px",

              flexWrap:
                "wrap",
            }}
          >
            <div
              style={{
                padding:
                  "10px 14px",

                borderRadius:
                  "999px",

                background:
                  "rgba(255,255,255,0.10)",

                fontWeight: 800,
              }}
            >
              Goals:{" "}
              {keyPlayers[0]
                ?.goals ?? 0}
            </div>

            <div
              style={{
                padding:
                  "10px 14px",

                borderRadius:
                  "999px",

                background:
                  "rgba(255,255,255,0.10)",

                fontWeight: 800,
              }}
            >
              Assists:{" "}
              {keyPlayers[0]
                ?.assists ?? 0}
            </div>
          </div>
        </div>

        {/* TACTICAL */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.08)",

            border:
              "1px solid rgba(255,255,255,0.10)",

            borderRadius:
              "28px",

            padding:
              "28px",

            backdropFilter:
              "blur(12px)",
          }}
        >
          <div
  style={{
    opacity: 0.7,

    marginBottom:
      "12px",

    letterSpacing:
      "0.08em",

    textTransform:
      "uppercase",

    fontSize:
      "0.78rem",

    fontWeight: 700,
  }}
>
  Tournament Identity
</div>
          <div
            style={{
              fontSize:
                "2rem",

              fontWeight: 900,

              marginBottom:
                "14px",
            }}
          >
            {
              tacticalIdentity.formation
            }
          </div>

          <div
            style={{
              lineHeight: 1.8,

              opacity: 0.86,
            }}
          >
            {
              tacticalIdentity.playStyle
            }
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ======================================================
          TEAM GALLERY
          ====================================================== */}

      {galleryImages.length >
        0 && (
        <section
  className={
    styles.sectionBlock
  }
>
          <div
            style={{
              marginBottom:
                "22px",
            }}
          >
            <h2
              className={
                styles.sectionTitle
              }
              style={{
                marginBottom:
                  "6px",
              }}
            >
              Team Gallery
            </h2>

            <p
  className={styles.sectionSubtext}
  style={{
    margin: 0,
  }}
>
              Visual atmosphere and
              supporter identity for{" "}
              {team.name}.
            </p>
          </div>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",

              gap: "20px",
            }}
          >
            {galleryImages.map(
              (
                image,
                index
              ) => (
                <div
                  key={index}
                  style={{
                    position:
                      "relative",

                    overflow:
                      "hidden",

                    borderRadius:
                      "28px",

                    minHeight:
                      "320px",

                    backgroundImage: `
                      linear-gradient(
                        to bottom,
                        rgba(0,0,0,0.08),
                        rgba(0,0,0,0.45)
                      ),
                      url(${image})
                    `,

                    backgroundSize:
                      "cover",

                    backgroundPosition:
                      "center",

                    boxShadow:
                      teamTheme.glow,
                  }}
                >
                  <div
                    style={{
                      position:
                        "absolute",

                      inset: 0,

                      background:
                        teamTheme.atmosphere,
                    }}
                  />
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* ======================================================
          ANTHEM EXPERIENCE
          ====================================================== */}

      <section
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #0f172a, #1e293b)",

            borderRadius:
              "32px",

            padding: "40px",

            color: "#ffffff",

            position:
              "relative",

            overflow:
              "hidden",

            boxShadow:
              "0 15px 40px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              position:
                "absolute",

              inset: 0,

              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 40%)",
            }}
          />

          <div
            style={{
              position:
                "relative",

              zIndex: 2,
            }}
          >
            <div
              style={{
                marginBottom:
                  "24px",
              }}
            >
              <h2
                style={{
                  margin: 0,

                  fontSize:
                    "2.2rem",

                  fontWeight: 900,
                }}
              >
                National Anthem
                Experience
              </h2>

              <p
                style={{
                  marginTop:
                    "14px",

                  opacity: 0.82,

                  lineHeight: 1.8,

                  maxWidth:
                    "760px",
                }}
              >
                Experience the
                emotion, identity,
                and atmosphere of{" "}
                {team.name}
                during FIFA World
                Cup 2026 anthem
                ceremonies.
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/anthems/${team.id}`
                )
              }
              style={{
                border:
                  "none",

                cursor:
                  "pointer",

                padding:
                  "15px 26px",

                borderRadius:
                  "999px",

                fontWeight: 800,

                fontSize:
                  "1rem",

                background:
                  "#ffffff",

                color:
                  "#111827",
              }}
            >
              ▶ Launch Anthem
              Experience
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================
    TACTICAL IDENTITY
====================================================== */}

<section
>
  <div
    style={{
      position:
        "relative",

      overflow:
        "hidden",

      borderRadius:
        "34px",

      padding: "40px",

      background:
        "linear-gradient(135deg, #0f172a, #1e293b)",

      color:
        "#ffffff",

      boxShadow:
        teamTheme.glow,
    }}
  >
    {/* ATMOSPHERE */}

    <div
      style={{
        position:
          "absolute",

        inset: 0,

        background:
          teamTheme.atmosphere,

        pointerEvents:
          "none",
      }}
    />

    {/* LIGHT */}

    <div
      style={{
        position:
          "absolute",

        inset: 0,

        background:
          "radial-gradient(circle at top right, rgba(255,255,255,0.10), transparent 42%)",
      }}
    />

    {/* CONTENT */}

    <div
      style={{
        position:
          "relative",

        zIndex: 3,
      }}
    >
      <div
        style={{
          marginBottom:
            "28px",
        }}
      >
        <h2
          style={{
            margin: 0,

            fontSize:
              "2.3rem",

            fontWeight: 900,

            marginBottom:
              "12px",
          }}
        >
          Tactical Identity
        </h2>

        <p
          style={{
            margin: 0,

            maxWidth:
              "760px",

            lineHeight: 1.8,

            color:
              "rgba(255,255,255,0.82)",
          }}
        >
          Tactical structure,
          playing philosophy,
          and tournament identity
          for {team.name}.
        </p>
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: "20px",
        }}
      >
        {[
          {
            label:
              "Formation",

            value:
              tacticalIdentity.formation,
          },

          {
            label:
              "Play Style",

            value:
              tacticalIdentity.playStyle,
          },

          {
            label:
              "Key Strength",

            value:
              tacticalIdentity.strength,
          },

          {
            label:
              "Tournament Outlook",

            value:
              tacticalIdentity.expectation,
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background:
                "rgba(255,255,255,0.08)",

              border:
                "1px solid rgba(255,255,255,0.10)",

              borderRadius:
                "24px",

              padding:
                "24px",

              backdropFilter:
                "blur(10px)",
            }}
          >
            <div
              style={{
                opacity: 0.7,

                marginBottom:
                  "10px",

                fontSize:
                  "0.82rem",

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",

                fontWeight: 700,
              }}
            >
              {item.label}
            </div>

            <div
              style={{
                fontSize:
                  "1.2rem",

                lineHeight: 1.5,

                fontWeight: 800,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* ======================================================
    SQUAD
====================================================== */}

{squad.length > 0 && (
  <section
  className={
    styles.sectionBlock
  }
>
    <div
      style={{
        display: "flex",

        justifyContent:
          "space-between",

        alignItems:
          "center",

        flexWrap:
          "wrap",

        gap: "12px",

        marginBottom:
          "24px",
      }}
    >
      <div>
        <h2
          className={
            styles.sectionTitle
          }
          style={{
            marginBottom:
              "6px",
          }}
        >
          Tournament Squad
        </h2>

       <p
  className={styles.sectionSubtext}
  style={{
    margin: 0,
  }}
>
          Confirmed players and
          key stars representing{" "}
          {team.name}.
        </p>
      </div>

      <div
        style={{
          padding:
            "10px 16px",

          borderRadius:
            "999px",

          background:
            `${teamTheme.accent}22`,

          border: `1px solid ${teamTheme.accent}55`,

          fontWeight: 800,

          fontSize:
            "0.9rem",
        }}
      >
        Squad: {squad.length}
      </div>
    </div>

    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "20px",
      }}
    >
      {squad.map(
        (
          player: SoccerPlayer
        ) => (
          <div
            key={player.id}
            onClick={() =>
              navigate(
                `/soccer/players/${player.id}`
              )
            }
            style={{
              position:
                "relative",

              overflow:
                "hidden",

              borderRadius:
                "28px",

              padding:
                "28px",

              cursor:
                "pointer",

              background:
                "linear-gradient(135deg, #111827, #1f2937)",

              color:
                "#ffffff",

              border: `1px solid ${teamTheme.accent}33`,

              boxShadow:
                teamTheme.glow,

              transition:
                "transform 0.25s ease",
            }}
          >
            <div
              style={{
                position:
                  "absolute",

                inset: 0,

                background:
                  teamTheme.atmosphere,

                pointerEvents:
                  "none",
              }}
            />

            <div
              style={{
                position:
                  "relative",

                zIndex: 2,
              }}
            >
              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "18px",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "1.3rem",

                    fontWeight: 900,
                  }}
                >
                  {player.name}
                </div>

                <div
                  style={{
                    width: "52px",

                    height: "52px",

                    borderRadius:
                      "999px",

                    background:
                      `${teamTheme.accent}`,

                    color:
                      "#ffffff",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    fontWeight: 900,

                    fontSize:
                      "1.2rem",
                  }}
                >
                  #
                  {player.number}
                </div>
              </div>

              <div
                style={{
                  display:
                    "flex",

                  gap: "10px",

                  flexWrap:
                    "wrap",

                  marginBottom:
                    "18px",
                }}
              >
               <div
  style={{
    padding:
      "8px 12px",

    borderRadius:
      "999px",

    background:
      player.position ===
      "Goalkeeper"
        ? "rgba(255,215,0,0.18)"
        : player.position ===
          "Defender"
        ? "rgba(59,130,246,0.18)"
        : player.position ===
          "Midfielder"
        ? "rgba(168,85,247,0.18)"
        : "rgba(239,68,68,0.18)",

    border:
      player.position ===
      "Goalkeeper"
        ? "1px solid rgba(255,215,0,0.35)"
        : player.position ===
          "Defender"
        ? "1px solid rgba(59,130,246,0.35)"
        : player.position ===
          "Midfielder"
        ? "1px solid rgba(168,85,247,0.35)"
        : "1px solid rgba(239,68,68,0.35)",

    fontSize:
      "0.82rem",

    fontWeight: 700,
  }}
>
  {player.position}
</div>

                <div
                  style={{
                    padding:
                      "8px 12px",

                    borderRadius:
                      "999px",

                    background:
                      "rgba(255,255,255,0.10)",

                    fontSize:
                      "0.82rem",

                    fontWeight: 700,
                  }}
                >
                  {player.club}
                </div>
              </div>

              <div
                style={{
                  display: "grid",

                  gridTemplateColumns:
                    "repeat(3, 1fr)",

                  gap: "14px",
                }}
              >
                <div>
                  <div
                    style={{
                      opacity: 0.7,

                      fontSize:
                        "0.78rem",

                      marginBottom:
                        "6px",
                    }}
                  >
                    GOALS
                  </div>

                  <div
                    style={{
                      fontSize:
                        "1.4rem",

                      fontWeight: 900,
                    }}
                  >
                    {player.goals ?? 0}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      opacity: 0.7,

                      fontSize:
                        "0.78rem",

                      marginBottom:
                        "6px",
                    }}
                  >
                    ASSISTS
                  </div>

                  <div
                    style={{
                      fontSize:
                        "1.4rem",

                      fontWeight: 900,
                    }}
                  >
                    {player.assists ?? 0}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      opacity: 0.7,

                      fontSize:
                        "0.78rem",

                      marginBottom:
                        "6px",
                    }}
                  >
                    CAPS
                  </div>

                  <div
                    style={{
                      fontSize:
                        "1.4rem",

                      fontWeight: 900,
                    }}
                  >
                    {player.caps ?? 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  </section>
)}

{/* ======================================================
    KEY PLAYERS
====================================================== */}

{keyPlayers.length > 0 && (
  <section
  className={
    styles.sectionBlock
  }
>
    <div
      style={{
        display: "flex",

        justifyContent:
          "space-between",

        alignItems:
          "center",

        flexWrap:
          "wrap",

        gap: "12px",

        marginBottom:
          "22px",
      }}
    >
      <div>
        <h2
          className={
            styles.sectionTitle
          }
          style={{
            marginBottom:
              "6px",
          }}
        >
          Key Players
        </h2>

        <p
  className={styles.sectionSubtext}
  style={{
    margin: 0,
  }}
>
          Star players expected
          to shape the tournament
          for {safeTeam.name}.
        </p>
      </div>

      <div
        style={{
          padding:
            "10px 16px",

          borderRadius:
            "999px",

          background:
            `${teamTheme.accent}22`,

          color:
            teamTheme.accent,

          fontWeight: 800,

          fontSize:
            "0.9rem",

          border: `1px solid ${teamTheme.accent}44`,
        }}
      >
        Squad Focus
      </div>
    </div>

    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "20px",
      }}
    >
      {keyPlayers.map(
        (player) => (
          <div
            key={player.id}
            onClick={() =>
              navigate(
                `/soccer/players/${player.id}`
              )
            }
            style={{
              position:
                "relative",

              overflow:
                "hidden",

              borderRadius:
                "30px",

              padding:
                "28px",

              cursor:
                "pointer",

              background:
                "linear-gradient(135deg, #0f172a, #1e293b)",

              color:
                "#ffffff",

              boxShadow:
                teamTheme.glow,

              border: `1px solid ${teamTheme.accent}33`,
            }}
          >
            <div
              style={{
                position:
                  "absolute",

                inset: 0,

                background:
                  teamTheme.atmosphere,

                pointerEvents:
                  "none",
              }}
            />

            <div
              style={{
                position:
                  "relative",

                zIndex: 2,
              }}
            >
              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "18px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize:
                        "1.4rem",

                      fontWeight: 900,

                      marginBottom:
                        "6px",
                    }}
                  >
                    {player.name}
                  </div>

                  <div
                    style={{
                      opacity: 0.7,
                    }}
                  >
                    {player.club}
                  </div>
                </div>

                <div
                  style={{
                    width: "58px",

                    height: "58px",

                    borderRadius:
                      "999px",

                    background:
                      `${teamTheme.accent}22`,

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    fontWeight: 900,

                    fontSize:
                      "1.2rem",

                    border: `1px solid ${teamTheme.accent}55`,
                  }}
                >
                  #{player.number}
                </div>
              </div>

              <div
                style={{
                  display: "grid",

                  gridTemplateColumns:
                    "repeat(2, 1fr)",

                  gap: "14px",
                }}
              >
                <div>
                  <div
                    style={{
                      opacity: 0.7,

                      marginBottom:
                        "6px",
                    }}
                  >
                    Position
                  </div>

                  <div
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {player.position}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      opacity: 0.7,

                      marginBottom:
                        "6px",
                    }}
                  >
                    Caps
                  </div>

                  <div
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {player.caps ?? 0}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      opacity: 0.7,

                      marginBottom:
                        "6px",
                    }}
                  >
                    Goals
                  </div>

                  <div
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {player.goals ?? 0}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      opacity: 0.7,

                      marginBottom:
                        "6px",
                    }}
                  >
                    Assists
                  </div>

                  <div
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {player.assists ?? 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  </section>
)}

{/* ======================================================
    SQUAD ANALYTICS
====================================================== */}

<section
  className={
    styles.sectionBlock
  }
>
  <div
    style={{
      marginBottom:
        "24px",
    }}
  >
    <h2
      className={
        styles.sectionTitle
      }
      style={{
        marginBottom:
          "6px",
      }}
    >
      Squad Analytics
    </h2>

    <p
  className={styles.sectionSubtext}
  style={{
    margin: 0,
  }}
>
      Tournament intelligence
      and squad structure
      for {team.name}.
    </p>
  </div>

  <div
    style={{
      display: "grid",

      gridTemplateColumns:
        "repeat(auto-fit, minmax(240px, 1fr))",

      gap: "20px",
    }}
  >
    {[
      {
        label:
          "Average Age",

        value:
          averageAge,
      },

      {
        label:
          "Total Caps",

        value:
          totalCaps,
      },

      {
        label:
          "Total Goals",

        value:
          totalGoals,
      },

      {
        label:
          "Top Scorer",

        value:
          topScorer?.name ||
          "TBD",
      },

      {
        label:
          "Most Experienced",

        value:
          experiencedPlayer?.name ||
          "TBD",
      },

      {
        label:
          "Youngest Player",

        value:
          youngestPlayer?.name ||
          "TBD",
      },

      {
        label:
          "Oldest Player",

        value:
          oldestPlayer?.name ||
          "TBD",
      },

      {
        label:
          "Goalkeepers",

        value:
          squadBreakdown.goalkeepers,
      },

      {
        label:
          "Defenders",

        value:
          squadBreakdown.defenders,
      },

      {
        label:
          "Midfielders",

        value:
          squadBreakdown.midfielders,
      },

      {
        label:
          "Forwards",

        value:
          squadBreakdown.forwards,
      },
    ].map((item) => (
      <div
        key={item.label}
        style={{
          position:
            "relative",

          overflow:
            "hidden",

          borderRadius:
            "28px",

          padding:
            "28px",

          background:
            "linear-gradient(135deg, #111827, #1f2937)",

          color:
            "#ffffff",

          border: `1px solid ${teamTheme.accent}22`,

          boxShadow:
            teamTheme.glow,
        }}
      >
        <div
          style={{
            position:
              "absolute",

            inset: 0,

            background:
              teamTheme.atmosphere,

            opacity: 0.4,
          }}
        />

        <div
          style={{
            position:
              "relative",

            zIndex: 2,
          }}
        >
          <div
            style={{
              opacity: 0.72,

              marginBottom:
                "12px",

              textTransform:
                "uppercase",

              letterSpacing:
                "0.08em",

              fontSize:
                "0.78rem",

              fontWeight: 700,
            }}
          >
            {item.label}
          </div>

          <div
            style={{
              fontSize:
                "1.6rem",

              fontWeight: 900,

              lineHeight: 1.3,
            }}
          >
            {item.value}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* ======================================================
    UPCOMING FIXTURES
====================================================== */}

<section
  className={
    styles.sectionBlock
  }
>
  <div
    style={{
      display: "flex",

      justifyContent:
        "space-between",

      alignItems:
        "center",

      flexWrap:
        "wrap",

      gap: "12px",

      marginBottom:
        "22px",
    }}
  >
    <div>
      <h2
        className={
          styles.sectionTitle
        }
        style={{
          marginBottom:
            "6px",
        }}
      >
        Upcoming Fixtures
      </h2>

      <p
  className={styles.sectionSubtext}
  style={{
    margin: 0,
  }}
>
        Upcoming FIFA World
        Cup fixtures
        involving{" "}
        {team.name}.
      </p>
    </div>

    <div
      style={{
        padding:
          "10px 16px",

        borderRadius:
          "999px",

        background:
        "#111827",

        color:
        "#ffffff",

border:
  "1px solid rgba(255,255,255,0.08)",

        fontWeight: 700,

        fontSize:
          "0.9rem",
      }}
    >
      Upcoming:{" "}
      {
        upcomingMatches.length
      }
    </div>
  </div>

  {upcomingMatches.length ===
  0 ? (
    <div className={styles.empty}>
      No upcoming
      fixtures.
    </div>
  ) : (
    <div
      style={{
        display: "flex",

        flexDirection:
          "column",

        gap: "18px",
      }}
    >
      {upcomingMatches.map(
        (
          match: SoccerMatch
        ) => (
          <SoccerMatchRow
            key={match.id}
            match={match}
            onClick={() =>
              navigate(
                `/soccer/matches/${match.id}`
              )
            }
          />
        )
      )}
    </div>
  )}
</section>

{/* ======================================================
    ALL MATCHES
====================================================== */}

<section
  className={
    styles.sectionBlock
  }
>
  <div
    style={{
      display: "flex",

      justifyContent:
        "space-between",

      alignItems:
        "center",

      flexWrap:
        "wrap",

      gap: "12px",

      marginBottom:
        "22px",
    }}
  >
    <div>
      <h2
        className={
          styles.sectionTitle
        }
        style={{
          marginBottom:
            "6px",
        }}
      >
        Tournament Matches
      </h2>

      <p
  className={styles.sectionSubtext}
  style={{
    margin: 0,
  }}
>
        Complete FIFA World
        Cup journey for{" "}
        {team.name}.
      </p>
    </div>

    <div
      style={{
        display: "flex",

        gap: "10px",

        flexWrap:
          "wrap",
      }}
    >
      <div
        style={{
          padding:
            "10px 16px",

          borderRadius:
            "999px",

          background:
          "#dc2626",

          color:
          "#ffffff",

          fontWeight: 700,

          fontSize:
            "0.9rem",
        }}
      >
        Live:{" "}
        {liveMatches.length}
      </div>

      <div
        style={{
          padding:
            "10px 16px",

          borderRadius:
            "999px",

         background:
         "#059669",

         color:
         "#ffffff",

          fontWeight: 700,

          fontSize:
            "0.9rem",
        }}
      >
        Completed:{" "}
        {
          completedMatches.length
        }
      </div>
    </div>
  </div>

  {teamMatches.length ===
  0 ? (
    <div className={styles.empty}>
      No matches
      available.
    </div>
  ) : (
    <div
      style={{
        display: "flex",

        flexDirection:
          "column",

        gap: "18px",
      }}
    >
      {teamMatches.map(
        (
          match: SoccerMatch
        ) => (
          <SoccerMatchRow
            key={match.id}
            match={match}
            onClick={() =>
              navigate(
                `/soccer/matches/${match.id}`
              )
            }
          />
        )
      )}
    </div>
  )}
</section>

{/* ======================================================
    HOST VENUES
====================================================== */}

{relatedStadiums.length >
  0 && (
 <section
  className={
    styles.sectionBlock
  }
>
    <div
      style={{
        marginBottom:
          "22px",
      }}
    >
      <h2
        className={
          styles.sectionTitle
        }
        style={{
          marginBottom:
            "6px",
        }}
      >
        Host Venues
      </h2>

      <p
  className={styles.sectionSubtext}
  style={{
    margin: 0,
  }}
>
        Stadiums hosting{" "}
        {team.name}
        matches during
        FIFA World Cup
        2026.
      </p>
    </div>

    <AutoContentRail>
      {relatedStadiums.map(
        (stadium) => (
          <HubCard
            key={
              stadium.id
            }
            title={
              stadium.name
            }
            image={
              getStadiumHeroImage(
                stadium.id
              ) || ""
            }
            to={`/soccer/stadiums/${stadium.id}`}
            features={[
              {
                label:
                  stadium.city,

                icon:
                  <UsersIcon />,
              },

              {
                label:
                  stadium.country,

                icon:
                  <StarIcon />,
              },

              {
                label: `${stadium.capacity.toLocaleString()} seats`,

                icon:
                  <CalendarIcon />,
              },
            ]}
          />
        )
      )}
    </AutoContentRail>
  </section>
)}

    </main>
    </PageWrapper>
  );
}