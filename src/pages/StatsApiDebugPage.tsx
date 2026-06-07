import {
  useEffect,
  useState,
} from "react";

import {
  fetchLiveFixtures,
} from "../services/apiFootball";

import {
  convertApiSportsFixtures,
} from "../utils/apiSportsConverter";

import type {
  SoccerMatch,
} from "../data/soccer/types";

export default function StatsApiDebugPage() {
  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    matches,
    setMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  useEffect(() => {
    async function loadFixtures() {
      try {
        setLoading(true);

        const response =
          await fetchLiveFixtures(
          );

        console.log(
          "RAW API:",
          response
        );

        const converted =
          convertApiSportsFixtures(
            response
          );

        console.log(
          "CONVERTED:",
          converted
        );

        setMatches(
          converted
        );
      } catch (err: any) {
        console.error(err);

        setError(
          err.message ||
            "API Failure"
        );
      } finally {
        setLoading(false);
      }
    }

    loadFixtures();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "#020617",

        color: "#ffffff",

        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",

          marginBottom: "30px",

          fontWeight: 900,
        }}
      >
        FIFA WORLD CUP API
      </h1>

      {loading && (
        <div>
          Loading fixtures...
        </div>
      )}

      {error && (
        <div
          style={{
            color: "#ef4444",

            marginBottom:
              "20px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",

          gap: "20px",
        }}
      >
        {matches.map(
          (match) => (
            <div
              key={match.id}
              style={{
                border:
                  "1px solid rgba(255,255,255,0.1)",

                borderRadius:
                  "24px",

                padding: "24px",

                background:
                  "rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  fontSize:
                    "1.4rem",

                  fontWeight: 800,

                  marginBottom:
                    "10px",
                }}
              >
                {match.home}
                {" vs "}
                {match.away}
              </div>

              <div
                style={{
                  color:
                    "rgba(255,255,255,0.7)",

                  marginBottom:
                    "10px",
                }}
              >
                {match.stage}
              </div>

              <div
                style={{
                  fontSize:
                    "1.2rem",

                  fontWeight: 700,

                  marginBottom:
                    "10px",
                }}
              >
                {match.homeScore ??
                  "-"}
                {" : "}
                {match.awayScore ??
                  "-"}
              </div>

              <div
                style={{
                  color:
                    "#38bdf8",
                }}
              >
                {match.status}
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}