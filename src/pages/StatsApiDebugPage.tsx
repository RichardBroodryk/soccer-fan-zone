// --------------------------------------------------
// RAZ DEBUG PAGE — API SPORTS (LEAGUES DISCOVERY)
// Phase 4.1 — Step 0 (FINAL FIXED)
// --------------------------------------------------

import { useEffect, useState } from "react";
import { fetchRugbyLeagues } from "../services/apiSportsRugby";

/**
 * PURPOSE:
 * - Fetch ALL rugby leagues from API-Sports
 * - Display raw output safely
 * - Handle multiple API response shapes
 *
 * 🔒 RULE:
 * This page is TEMPORARY and used ONLY for data discovery.
 */

export default function StatsApiDebugPage() {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeagues() {
      try {
        const data = await fetchRugbyLeagues();

        console.log("🏉 ALL RUGBY LEAGUES:", data);

        setLeagues(data);
      } catch (error) {
        console.error("❌ Failed to fetch leagues:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLeagues();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        RAZ — API Debug (Leagues)
      </h1>

      {loading && <p>Loading leagues...</p>}

      {!loading && leagues.length === 0 && (
        <p>No leagues returned</p>
      )}

      {!loading && leagues.length > 0 && (
        <div>
          <h2 style={{ marginBottom: "16px" }}>
            Total Leagues: {leagues.length}
          </h2>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {leagues.map((item, index) => {
              /**
               * 🔥 CRITICAL FIX:
               * Handle BOTH API shapes:
               *
               * Shape A:
               * { league: {...}, country: {...} }
               *
               * Shape B:
               * { id, name, type }
               */
              const league = item.league ?? item;
              const country = item.country ?? {};

              return (
                <li
                  key={index}
                  style={{
                    marginBottom: "12px",
                    padding: "12px",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    background: "#1e293b",
                  }}
                >
                  <strong style={{ fontSize: "16px" }}>
                    {league?.name ?? "Unknown League"}
                  </strong>

                  <div>ID: {league?.id ?? "N/A"}</div>
                  <div>Type: {league?.type ?? "N/A"}</div>
                  <div>Country: {country?.name ?? "N/A"}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}