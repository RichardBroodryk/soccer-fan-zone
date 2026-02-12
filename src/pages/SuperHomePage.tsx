import styles from "./SuperHomePage.module.css";

import HeroCard from "../components/homepage/HeroCard";
import HubCard from "../components/homepage/HubCard";

/* DATA */
import { tournaments2026 } from "../data/tournamentMeta";

/* ICONS */
import MusicIcon from "../components/icons/MusicIcon";
import AwardIcon from "../components/icons/AwardIcon";
import GridIcon from "../components/icons/GridIcon";
import LiveScoresIcon from "../components/icons/LiveScoresIcon";
import FixturesIcon from "../components/icons/FixturesIcon";
import ResultsIcon from "../components/icons/ResultsIcon";
import StatsIcon from "../components/icons/StatsIcon";
import VideoIcon from "../components/icons/VideoIcon";
import UsersIcon from "../components/icons/UsersIcon";
import AirplaneIcon from "../components/icons/AirplaneIcon";
import TicketIcon from "../components/icons/TicketIcon";
import TruckIcon from "../components/icons/TruckIcon";
import FileTextIcon from "../components/icons/FileTextIcon";
import BookOpenIcon from "../components/icons/BookOpenIcon";
import StarIcon from "../components/icons/StarIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import ShoppingBagIcon from "../components/icons/ShoppingBagIcon";
import ArchiveIcon from "../components/icons/ArchiveIcon";

/* IMAGES */
import featuredTournamentImage from "../assets/images/raz/six-nations-hero.png";
import anthemsImage from "../assets/images/raz/anthems-page.png";
import tournamentsImage from "../assets/images/raz/tournament-hub-page.png";
import matchCenterImage from "../assets/images/raz/Match-center.png";
import matchDayImage from "../assets/images/raz/match-day-journey.png";
import rugbyStudioImage from "../assets/images/raz/Mediahub.jpg";
import fanzoneImage from "../assets/images/raz/fanzone-hub.png";
import newsImage from "../assets/images/raz/news-hero.png";
import insideTheGameImage from "../assets/images/raz/inside-the-game.png";
import calendarImage from "../assets/images/raz/calendar-hero.jpg";
import merchImage from "../assets/images/raz/Merch.png";
import heritageImage from "../assets/images/raz/heritage-hub.png";
import definingMomentsImage from "../assets/images/raz/moments-hero.jpg";

export default function SuperHomePage() {
  const featuredTournament =
    tournaments2026.find((t) => t.status === "active") ??
    tournaments2026.find((t) => t.status === "upcoming") ??
    tournaments2026[0];

  return (
    <main className={styles.page}>
      <HeroCard variant="super" />

      {/* FEATURED ROW — TOURNAMENT + NOTIFICATIONS */}
      {featuredTournament && (
        <section className={styles.hubGrid}>
          <HubCard
            title={featuredTournament.name}
            image={featuredTournamentImage}
            to={featuredTournament.route}
            features={[
              {
                label:
                  featuredTournament.heroBadge || "FEATURED TOURNAMENT",
                icon: <AwardIcon />,
              },
              {
                label:
                  featuredTournament.heroSubtitle ||
                  "Current global focus",
                icon: <StarIcon />,
              },
            ]}
          />

          <HubCard
            title="Notifications"
            image={newsImage}
            to="/notifications"
            features={[
              {
                label: "Match alerts & key rugby moments",
                icon: <CalendarIcon />,
              },
              {
                label: "Tournament updates you opt into",
                icon: <StarIcon />,
              },
            ]}
          />
        </section>
      )}

      {/* CORE IDENTITY */}
      <section className={styles.hubGrid}>
        <HubCard
          title="Anthems"
          image={anthemsImage}
          to="/anthems"
          features={[
            { label: "National Anthems", icon: <MusicIcon /> },
          ]}
        />

        <HubCard
          title="Tournaments"
          image={tournamentsImage}
          to="/tournaments"
          features={[
            { label: "Men’s Tournaments", icon: <AwardIcon /> },
            { label: "Women’s Tournaments", icon: <GridIcon /> },
          ]}
        />
      </section>

      {/* MATCHDAY CORE */}
      <section className={styles.hubGrid}>
        <HubCard
          title="Match Center"
          image={matchCenterImage}
          to="/match-center"
          features={[
            { label: "Live Scores", icon: <LiveScoresIcon /> },
            { label: "Fixtures", icon: <FixturesIcon /> },
            { label: "Results", icon: <ResultsIcon /> },
            { label: "Stats", icon: <StatsIcon /> },
          ]}
        />

        <HubCard
          title="Matchday Journeys"
          image={matchDayImage}
          to="/matchday-journeys"
          features={[
            { label: "Flights", icon: <AirplaneIcon /> },
            { label: "Tickets", icon: <TicketIcon /> },
            { label: "Transport", icon: <TruckIcon /> },
          ]}
        />
      </section>

      {/* EXPERIENCE & COMMUNITY */}
      <section className={styles.hubGrid}>
        <HubCard
          title="The Rugby Studio"
          image={rugbyStudioImage}
          to="/media"
          features={[
            { label: "Match Videos", icon: <VideoIcon /> },
            { label: "Podcasts & Audio", icon: <VideoIcon /> },
          ]}
        />

        <HubCard
          title="Fanzone"
          image={fanzoneImage}
          to="/fanzone"
          features={[
            { label: "Community & Loyalty", icon: <UsersIcon /> },
          ]}
        />
      </section>

      {/* INSIGHT & INFORMATION */}
      <section className={styles.hubGrid}>
        <HubCard
          title="News"
          image={newsImage}
          to="/news"
          features={[
            { label: "Headlines & Analysis", icon: <FileTextIcon /> },
          ]}
        />

        <HubCard
          title="Inside the Game"
          image={insideTheGameImage}
          to="/inside-the-game"
          features={[
            { label: "Laws & Referees", icon: <BookOpenIcon /> },
            { label: "Fantasy & Analysis", icon: <StarIcon /> },
          ]}
        />
      </section>

      {/* PLANNING & COMMERCE */}
      <section className={styles.hubGrid}>
        <HubCard
          title="Calendar"
          image={calendarImage}
          to="/calendar"
          features={[
            {
              label:
                "Global fixtures, key dates & iconic stadiums",
              icon: <CalendarIcon />,
            },
          ]}
        />

        <HubCard
          title="Merch"
          image={merchImage}
          to="/merch"
          features={[
            { label: "Official Team Gear", icon: <ShoppingBagIcon /> },
          ]}
        />
      </section>

      {/* HERITAGE & LEGACY (SUPER ONLY) */}
      <section className={styles.hubGrid}>
        <HubCard
          title="Heritage"
          image={heritageImage}
          to="/heritage"
          features={[
            {
              label: "Legends, Squads & Champions",
              icon: <ArchiveIcon />,
            },
          ]}
        />

        <HubCard
          title="Defining Rugby Moments"
          image={definingMomentsImage}
          to="/defining-moments"
          features={[
            {
              label: "The moments that shaped the game",
              icon: <ArchiveIcon />,
            },
          ]}
        />
      </section>
    </main>
  );
}
