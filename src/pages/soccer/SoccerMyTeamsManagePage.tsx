import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import PageWrapper from "../../components/layout/PageWrapper";

import styles from "./SoccerMyTeamsManagePage.module.css";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import heroImage from "../../assets/soccer/fanzone/teams.jpg";

import {
  teams,
} from "../../data/soccer/teams";

import {
  soccerFlags,
} from "../../data/soccer/soccerFlags";

import {
  loadMySoccerTeams,
  saveMySoccerTeams,
} from "../../utils/soccer/soccerMyTeamsStorage";

const MAX_TEAMS = 6;

export default function SoccerMyTeamsManagePage() {
  const navigate =
    useNavigate();

  const [
    selected,
    setSelected,
  ] = useState<string[]>(
    []
  );

  const [
    region,
    setRegion,
  ] = useState("all");

  useEffect(() => {
    const stored =
      loadMySoccerTeams();

    setSelected(
      stored.teams
    );
  }, []);

  const regions =
    useMemo(() => {
      return [
        "all",
        "UEFA",
        "CONMEBOL",
        "CAF",
        "AFC",
        "CONCACAF",
        "OFC",
      ];
    }, []);

  const filteredTeams =
    useMemo(() => {
      if (
        region === "all"
      ) {
        return teams;
      }

      return teams.filter(
        (team) =>
          team.region ===
          region
      );
    }, [region]);

  function toggleTeam(
    id: string
  ) {
    if (
      selected.includes(id)
    ) {
      setSelected(
        (prev) =>
          prev.filter(
            (teamId) =>
              teamId !== id
          )
      );

      return;
    }

    if (
      selected.length >=
      MAX_TEAMS
    ) {
      return;
    }

    setSelected((prev) => [
      ...prev,
      id,
    ]);
  }

  function handleSave() {
    saveMySoccerTeams(
      selected
    );

    navigate(
      "/soccer/my-teams"
    );
  }

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main
        className={
          styles.page
        }
      >
        {/* HERO */}

<section
  style={{
    position: "relative",

    borderRadius: "34px",

    overflow: "hidden",

    minHeight: "430px",

    background:
      "linear-gradient(135deg, #0f172a, #111827)",

    padding: "52px",

    color: "#ffffff",

    display: "flex",

    flexDirection: "column",

    justifyContent: "space-between",

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.24)",
  }}
>
  {/* CENTER IMAGE */}

<div
  style={{
    width: "100%",

    display: "flex",

    justifyContent: "center",

    marginBottom: "-30px",

    position: "relative",

    zIndex: 1,
  }}
>
  <div
    style={{
      width: "320px",

      maxWidth: "100%",

      height: "180px",

      borderRadius: "24px",

      backgroundImage:
        `url(${heroImage})`,

      backgroundSize:
        "cover",

      backgroundPosition:
        "center",

      boxShadow:
        "0 18px 34px rgba(0,0,0,0.32)",

      border:
        "1px solid rgba(255,255,255,0.08)",
    }}
  />
</div>

  {/* CONTENT */}

  <div
    style={{
      position: "relative",

      zIndex: 3,

      maxWidth: "760px",
    }}
  >
    <div
      style={{
        marginBottom: "12px",

        opacity: 0.8,

        fontWeight: 700,

        letterSpacing: "0.08em",

        textTransform:
          "uppercase",
      }}
    >
      PERSONALIZATION
    </div>

    <h1
      style={{
        fontSize: "4rem",

        lineHeight: 1,

        marginBottom: "18px",

        fontWeight: 900,
      }}
    >
      Manage My Teams
    </h1>

    <p
      style={{
        fontSize: "1.1rem",

        opacity: 0.92,

        maxWidth: "640px",

        lineHeight: 1.6,
      }}
    >
      Choose up to six national teams
      to shape your personalized
      football ecosystem throughout
      World Cup 2026.
    </p>
  </div>
</section>
        {/* BACK */}

        <div
          style={{
            display:
              "flex",

            justifyContent:
              "center",

            marginTop:
              "42px",

            marginBottom:
              "46px",
          }}
        >
          <button
            onClick={() =>
              navigate(
                "/soccer/my-teams"
              )
            }
            style={{
              border:
                "none",

              background:
                "#2563eb",

              color:
                "#ffffff",

              padding:
                "14px 26px",

              borderRadius:
                "999px",

              cursor:
                "pointer",

              fontWeight:
                800,

              fontSize:
                "0.95rem",

              boxShadow:
                "0 12px 30px rgba(37,99,235,0.28)",

              transition:
                "all 0.2s ease",
            }}
          >
            ← Back To My
            Teams
          </button>
        </div>

        {/* HEADER */}

        <section
          className={
            styles.header
          }
          style={{
            marginBottom:
              "36px",
          }}
        >
          <div>
            <div
              className={
                styles.eyebrow
              }
            >
              TEAM
              SELECTION
            </div>

            <h2
              style={{
                marginBottom:
                  "10px",

                color:
                  "#111827",
              }}
            >
              Your Nations
            </h2>

           <p
  style={{
    color:
      "#4b5563",

    lineHeight:
      1.8,

    maxWidth:
      "760px",
  }}
>
  Tap the national
  teams you support
  to build your
  personalized World
  Cup experience.
  Selected teams will
  power your match
  feeds, alerts,
  highlights, and
  supporter identity.
  When finished,
  press Save Teams
  at the bottom of
  the page.
</p>
          </div>

          <div
            className={
              styles.counter
            }
          >
            {
              selected.length
            }{" "}
            / 6
          </div>
        </section>

        {/* FILTERS */}

        <section
          className={
            styles.filters
          }
          style={{
            marginBottom:
              "42px",
          }}
        >
          {regions.map((r) => (
            <button
              key={r}
              className={
                region === r
                  ? styles.active
                  : styles.filterButton
              }
              onClick={() =>
                setRegion(r)
              }
            >
              {r}
            </button>
          ))}
        </section>

        {/* GRID */}

        <section
          className={
            styles.grid
          }
        >
          {filteredTeams.map(
            (team) => {
              const isSelected =
                selected.includes(
                  team.id
                );

              return (
                <button
                  key={
                    team.id
                  }
                  className={`${styles.teamCard} ${
                    isSelected
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() =>
                    toggleTeam(
                      team.id
                    )
                  }
                >
                  <img
                    src={
                      soccerFlags[
                        team.id
                      ]
                    }
                    alt={
                      team.name
                    }
                    className={
                      styles.flag
                    }
                  />

                  <div
                    className={
                      styles.region
                    }
                  >
                    {
                      team.region
                    }
                  </div>

                  <h3>
                    {
                      team.name
                    }
                  </h3>

                  <p>
                    {
                      team.fifaCode
                    }
                  </p>

                  <span>
                    {
                      team.coach
                    }
                  </span>
                </button>
              );
            }
          )}
        </section>

        {/* ACTIONS */}

        <section
          className={
            styles.actions
          }
          style={{
            marginTop:
              "60px",

            marginBottom:
              "80px",
          }}
        >
          <button
            className={
              styles.secondary
            }
            onClick={() =>
              navigate(
                "/soccer/my-teams"
              )
            }
          >
            Cancel
          </button>

          <button
            className={
              styles.primary
            }
            onClick={
              handleSave
            }
          >
            Save Teams
          </button>
        </section>
      </main>
    </PageWrapper>
  );
}