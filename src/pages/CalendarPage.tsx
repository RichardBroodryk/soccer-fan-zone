import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CalendarPage.module.css";

import calendarBg from "../assets/images/raz/calendar-hero.jpg";

import { resolveCalendarMatches } from "../utils/calendar/resolveCalendarMatches";
import { groupMatchesByMonth } from "../utils/calendar/groupMatchesByMonth";
import { groupMatchesBySeason } from "../utils/calendar/groupMatchesBySeason";

import CalendarMonth from "../components/calendar/CalendarMonth";

type GenderFilter = "all" | "men" | "women";

export default function CalendarPage() {
  const navigate = useNavigate();

  const [gender, setGender] = useState<GenderFilter>("all");
  const [tournamentId, setTournamentId] = useState<string>("all");

  /** ================= RESOLVE ================= */
  const calendarMatches = useMemo(() => {
    return resolveCalendarMatches();
  }, []);

  /** ================= TOURNAMENT FILTER OPTIONS ================= */
  const tournamentOptions = useMemo(() => {
    const map = new Map<string, string>();

    calendarMatches.forEach((m) => {
      map.set(m.tournamentId, m.tournamentName);
    });

    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [calendarMatches]);

  /** ================= FILTER ================= */
  const filteredMatches = useMemo(() => {
    return calendarMatches.filter((m) => {
      if (gender !== "all" && m.gender !== gender) return false;
      if (tournamentId !== "all" && m.tournamentId !== tournamentId)
        return false;
      return true;
    });
  }, [calendarMatches, gender, tournamentId]);

  /** ================= GROUP ================= */
  const monthGroups = groupMatchesByMonth(filteredMatches);
  const seasonGroups = groupMatchesBySeason(monthGroups);

  const goMatchFromCalendar = (id: number) => {
    navigate(`/match/${id}`, { state: { from: "calendar" } });
  };

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${calendarBg})` }}
      >
        <div className={styles.heroContent}>
          <h1>Global Rugby Calendar</h1>
          <p>
            An authoritative view of confirmed international fixtures,
            <br />
            major tournaments, and key rugby dates.
          </p>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <section className={styles.section}>
        <h2>Confirmed Fixtures</h2>

        <p className={styles.subtext}>
          Officially released match dates appear here as they are confirmed.
          Fixtures not yet announced are clearly marked as{" "}
          <strong>Coming soon</strong>.
        </p>

        {/* ================= FILTERS ================= */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <button
              className={gender === "all" ? styles.active : ""}
              onClick={() => setGender("all")}
            >
              All
            </button>
            <button
              className={gender === "men" ? styles.active : ""}
              onClick={() => setGender("men")}
            >
              Men
            </button>
            <button
              className={gender === "women" ? styles.active : ""}
              onClick={() => setGender("women")}
            >
              Women
            </button>
          </div>

          <select
            className={styles.select}
            value={tournamentId}
            onChange={(e) => setTournamentId(e.target.value)}
          >
            <option value="all">All tournaments</option>
            {tournamentOptions.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* ================= SEASONS ================= */}
        {seasonGroups.length === 0 ? (
          <p>No fixtures match the selected filters.</p>
        ) : (
          seasonGroups.map((season) => (
            <section key={season.id}>
              <h2>{season.label}</h2>

              {season.months.map((group) => (
                <CalendarMonth
                  key={`${group.year}-${group.month}`}
                  group={group}
                  onMatchSelect={goMatchFromCalendar}
                />
              ))}
            </section>
          ))
        )}
      </section>
    </main>
  );
}
