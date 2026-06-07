import HubCard from "../homepage/HubCard";

import AutoContentRail from "../ui/AutoContentRail";

import VideoIcon from "../icons/VideoIcon";
import StarIcon from "../icons/StarIcon";
import UsersIcon from "../icons/UsersIcon";
import CalendarIcon from "../icons/CalendarIcon";

/* ======================================================
   SOCCER EXPERIENCE IMAGES
   ====================================================== */

import footballMediaImage from "../../assets/soccer/media/soccer-media-hero.jpg";

import globalNewsImage from "../../assets/soccer/news/worldcup-news.jpg";

import fanzoneImage from "../../assets/soccer/fanzone/soccer-fanzone-hero.jpg";

import matchCenterImage from "../../assets/soccer/fanzone/tactical-room.jpg";

import stadiumsImage from "../../assets/soccer/stadiums/san-francisco2.jpg";

import worldCupHubImage from "../../assets/soccer/podcasts/worldcup-central.jpg";

export default function SoccerExperienceRail() {
  return (
    <section
      style={{
        margin: "24px 0",
      }}
    >
      <div
  style={{
    marginBottom: "28px",
  }}
>
  <h2
    style={{
      margin: 0,
      fontSize: "2rem",
      fontWeight: 900,
      color: "#111827",
      lineHeight: 1.1,
    }}
  >
    World Cup Experience
  </h2>

  <p
    style={{
      marginTop: "10px",
      marginBottom: 0,
      color: "#4b5563",
      lineHeight: 1.7,
      fontSize: "1rem",
      fontWeight: 500,
    }}
  >
    Explore immersive football experiences,
    fan culture, stadium atmospheres and
    tournament stories from around the world.
  </p>
</div>

      <AutoContentRail>
        <HubCard
          title="World Cup Hub"
          image={worldCupHubImage}
          to="/soccer/world-cup"
          features={[
            {
              label:
                "Groups & Knockouts",
              icon: <StarIcon />,
            },
          ]}
        />

        <HubCard
          title="Football Media"
          image={footballMediaImage}
          to="/soccer/media"
          features={[
            {
              label:
                "Highlights & Podcasts",
              icon: <VideoIcon />,
            },
          ]}
        />

        <HubCard
          title="Global News"
          image={globalNewsImage}
          to="/soccer/news"
          features={[
            {
              label:
                "Breaking Stories",
              icon: <StarIcon />,
            },
          ]}
        />

        <HubCard
          title="Fanzone"
          image={fanzoneImage}
          to="/soccer/fanzone"
          features={[
            {
              label:
                "Audio & Loyalty",
              icon: <UsersIcon />,
            },
          ]}
        />

        <HubCard
          title="Match Center"
          image={matchCenterImage}
          to="/soccer/match-center"
          features={[
            {
              label:
                "Fixtures • Live • Stats",
              icon: <CalendarIcon />,
            },
          ]}
        />

        <HubCard
          title="Stadiums"
          image={stadiumsImage}
          to="/soccer/stadiums"
          features={[
            {
              label:
                "2026 Host Venues",
              icon: <StarIcon />,
            },
          ]}
        />
      </AutoContentRail>
    </section>
  );
}