import { useEffect, useState } from "react";
import { fetchRugbyFixtures } from "../services/apiSportsRugby";
import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

export default function StatsApiDebugPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [converted, setConverted] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const apiEvents = await fetchRugbyFixtures();

        console.log("RAW API EVENTS:", apiEvents);

        const convertedEvents = convertApiSportsFixtures(apiEvents);

        console.log("CONVERTED EVENTS:", convertedEvents);

        setEvents(apiEvents);
        setConverted(convertedEvents);
      } catch (err) {
        console.error("API-Sports Rugby error:", err);
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading Rugby API...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>API-Sports Rugby Debug</h1>

      <h2>Converted Matches (RAZ Format)</h2>

      <pre style={{ maxHeight: 400, overflow: "auto" }}>
        {JSON.stringify(converted, null, 2)}
      </pre>

      <h2>Raw API Data</h2>

      <pre style={{ maxHeight: 400, overflow: "auto" }}>
        {JSON.stringify(events, null, 2)}
      </pre>
    </div>
  );
}