// src/pages/soccer/SoccerGroupsOverviewPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import HubCard from "../../components/homepage/HubCard";

import { groups } from "../../data/soccer/groups";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

import groupsHero from "../../assets/soccer/news/worldcup-news.jpg";

import placeholder from "../../assets/soccer/fanzone/soccer-myteams.jpg";

/* ICONS */

import UsersIcon from "../../components/icons/UsersIcon";
import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";

export default function SoccerGroupsOverviewPage() {
  const navigate =
    useNavigate();

  const [
    allMatches,
    setAllMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* ======================================================
     LOAD MATCHES
     ====================================================== */

  useEffect(() => {
    async function loadMatches() {
      try {
        const data =
          await getAllWorldCupMatches();

        console.log(
          "GROUPS:",
          data
        );

        setAllMatches(
          data
        );
      } catch (err) {
        console.error(
          err
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    loadMatches();
  }, []);

  /* ======================================================
     GROUP STATS
     ====================================================== */

  const groupStats =
    useMemo(() => {
      return groups.map(
        (group) => {
          const groupMatches =
            allMatches.filter(
              (match) =>
                match.group ===
                group.name
            );

          const liveMatches =
            groupMatches.filter(
              (match) =>
                match.status ===
                "live"
            );

          const completedMatches =
            groupMatches.filter(
              (match) =>
                match.status ===
                "final"
            );

          return {
            ...group,

            totalMatches:
              groupMatches.length,

            liveMatches:
              liveMatches.length,

            completedMatches:
              completedMatches.length,
          };
        }
      );
    }, [allMatches]);

  return (
    <PageWrapper
      imageUrl={
        groupsHero
      }
    >
      <main
        className={
          styles.page
        }
      >
        {loading && (
          <div
            style={{
              padding:
                "40px",

              color:
                "#ffffff",

              fontWeight: 800,
            }}
          >
            Loading
            World Cup
            groups...
          </div>
        )}

        {/* HERO */}

        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(31,41,55,0.92))",

            borderRadius:
              "34px",

            padding:
              "48px",

            color:
              "#ffffff",

            boxShadow:
              "0 14px 40px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              display:
                "inline-flex",

              padding:
                "10px 18px",

              borderRadius:
                "999px",

              background:
                "rgba(255,255,255,0.08)",

              marginBottom:
                "22px",

              fontWeight: 800,

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",

              fontSize:
                "0.82rem",
            }}
          >
            GROUP STAGE
          </div>

          <h1
            style={{
              fontSize:
                "4rem",

              marginBottom:
                "20px",
            }}
          >
            World Cup
            Groups
          </h1>

          <p
            style={{
              maxWidth:
                "860px",

              lineHeight:
                1.8,

              opacity: 0.82,
            }}
          >
            Explore all
            Global World
            Cup 2026
            groups,
            qualification
            battles,
            standings,
            fixtures and
            emerging
            tournament
            stories.
          </p>
        </section>

        {/* GROUPS */}

        <section
          className={
            styles.railSection
          }
        >
          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",

              gap: "22px",
            }}
          >
            {groupStats.map(
              (group) => (
                <HubCard
                  key={
                    group.id
                  }
                  title={
                    group.name
                  }
                  image={
                    placeholder
                  }
                  to={`/soccer/groups/${group.id}`}
                  features={[
                    {
                      label: `${group.teams.length} Nations`,
                      icon:
                        <UsersIcon />,
                    },

                    {
                      label: `${group.completedMatches} Results`,
                      icon:
                        <StarIcon />,
                    },

                    {
                      label: `${group.totalMatches} Fixtures`,
                      icon:
                        <CalendarIcon />,
                    },

                    {
                      label: `${group.liveMatches} Live`,
                      icon:
                        <UsersIcon />,
                    },
                  ]}
                />
              )
            )}
          </div>
        </section>

        {/* CTA */}

        <section
          style={{
            background:
              "linear-gradient(135deg, #111827, #1f2937)",

            borderRadius:
              "32px",

            padding:
              "42px",

            color:
              "#ffffff",

            textAlign:
              "center",
          }}
        >
          <h2
            style={{
              marginTop: 0,

              fontSize:
                "2.2rem",

              marginBottom:
                "20px",
            }}
          >
            Knockout
            Stage Awaits
          </h2>

          <p
            style={{
              maxWidth:
                "760px",

              margin:
                "0 auto 28px auto",

              lineHeight:
                1.8,

              opacity: 0.82,
            }}
          >
            Follow the
            qualification
            pathways into
            the knockout
            rounds and
            explore
            projected
            World Cup
            bracket
            scenarios.
          </p>

          <button
            onClick={() =>
              navigate(
                "/soccer/knockout"
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
                "16px 28px",

              borderRadius:
                "18px",

              fontWeight: 800,

              cursor:
                "pointer",

              fontSize:
                "1rem",
            }}
          >
            Explore
            Knockout
            Stage
          </button>
        </section>
      </main>
    </PageWrapper>
  );
}