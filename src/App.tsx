import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";

/* ================= SPLASH / ONBOARDING ================= */
import SplashPage from "./pages/SplashPage";
import SecondarySplashPage from "./pages/SecondarySplashPage";
import WelcomePage from "./pages/WelcomePage";
import WhatYouGetPage from "./pages/WhatYouGetPage";
import TermsPage from "./pages/TermsPage";
import AccessPendingPage from "./pages/AccessPendingPage";

/* ================= SIGNUP ================= */
import FreemiumSignupPage from "./pages/FreemiumSignupPage";
import PremiumSignupPage from "./pages/PremiumSignupPage";
import SuperPremiumSignupPage from "./pages/SuperPremiumSignupPage";

/* ================= HOMES ================= */
import FreemiumHomePage from "./pages/FreemiumHomePage";
import HomePage from "./pages/HomePage";
import SuperHomePage from "./pages/SuperHomePage";

/* ================= ANTHEMS ================= */
import NationalAnthemsDirectory from "./pages/NationalAnthemsDirectory";
import NationalAnthemPage from "./pages/NationalAnthemPage";

/* ================= TOURNAMENTS ================= */
import TournamentsHubPage from "./pages/TournamentsHubPage";
import MensTournamentsPage from "./pages/MensTournamentsPage";
import WomensTournamentsPage from "./pages/WomensTournamentsPage";
import TournamentPage from "./pages/TournamentPage";

/* ================= MATCH CENTER ================= */
import MatchCenterPage from "./pages/MatchCenterPage";
import LiveScoresPage from "./pages/LiveScoresPage";
import FixturesPage from "./pages/FixturesPage";
import ResultsPage from "./pages/ResultsPage";
import StatsPage from "./pages/StatsPage";
import MatchPage from "./pages/MatchPage";

/* ================= STADIUMS ================= */
import StadiumHubPage from "./pages/StadiumHubPage";
import StadiumPage from "./pages/StadiumPage";
import StadiumMatchdayPage from "./pages/StadiumMatchdayPage";

/* ================= MEDIA ================= */
import MediaHubPage from "./pages/MediaHubPage";
import MatchVideosPage from "./pages/MatchVideosPage";
import PodcastsPage from "./pages/PodcastsPage";
import GreatestHits from "./pages/GreatestHits";
import FanComments from "./pages/FanComments";

/* ================= DEFINING MOMENTS ================= */
import DefiningMomentsPage from "./pages/DefiningMomentsPage";
import WorldCupTurningPoints from "./pages/moments/WorldCupTurningPoints";
import TacticalShifts from "./pages/moments/TacticalShifts";
import LawChanges from "./pages/moments/LawChanges";
import CallsAndDecisions from "./pages/moments/CallsAndDecisions";
import EraDefiningRivalries from "./pages/moments/EraDefiningRivalries";
import CulturalMoments from "./pages/moments/CulturalMoments";

/* ================= INSIDE THE GAME ================= */
import InsideTheGameHubPage from "./pages/InsideTheGameHubPage";
import RefereeHub from "./pages/RefereeHub";
import FantasyLeagueHubPage from "./pages/FantasyLeagueHubPage";
import BreakdownRucksPage from "./pages/inside-the-game/referees/BreakdownRucksPage";
import TMOReviewsPage from "./pages/inside-the-game/referees/TMOReviewsPage";
import LawUpdatesPage from "./pages/inside-the-game/referees/LawUpdatesPage";
import PlayingCharterPage from "./pages/PlayingCharterPage";

/* ================= FANZONE ================= */
import FanzoneHubPage from "./pages/FanzoneHubPage";
import LoyaltyPage from "./pages/LoyaltyPage";
import LiveMatchAudioPage from "./pages/LiveMatchAudioPage";
import PPVPage from "./pages/PPVPage";

/* ================= NEWS ================= */
import NewsHubPage from "./pages/NewsHubPage";
import MyFeedPage from "./pages/MyFeedPage";

/* ================= MATCHDAY JOURNEYS ================= */
import MatchdayJourneysPage from "./pages/MatchdayJourneysPage";
import MatchdayPlannerPage from "./pages/MatchdayPlannerPage";

/* ================= TRAVEL ================= */
import TicketsPage from "./pages/TicketsPage";
import FlightsPage from "./pages/FlightsPage";
import HotelsPage from "./pages/HotelsPage";
import TransportPage from "./pages/TransportPage";

/* ================= CALENDAR & MERCH ================= */
import CalendarPage from "./pages/CalendarPage";
import MerchPage from "./pages/MerchPage";

/* ================= ENGAGEMENT ================= */
import MyTeamsPage from "./pages/MyTeamsPage";
import MyTeamsManagePage from "./pages/MyTeamsManagePage";
import NotificationsPage from "./pages/NotificationsPage";

/* ================= HERITAGE ================= */
import HeritageHub from "./pages/heritage/HeritageHub";
import LegendsHub from "./pages/heritage/LegendsHub";
import LegendsMen from "./pages/heritage/LegendsMen";
import LegendsWomen from "./pages/heritage/LegendsWomen";
import SquadsHub from "./pages/heritage/squads/SquadsHub";
import SquadsMen from "./pages/heritage/squads/SquadsMen";
import SquadsWomen from "./pages/heritage/squads/SquadsWomen";
import ChampionsHub from "./pages/heritage/ChampionsHub";
import ChampionsMen from "./pages/heritage/ChampionsMen";
import ChampionsWomen from "./pages/heritage/ChampionsWomen";
import CoachesSupportHub from "./pages/heritage/CoachesSupportHub";
import HeadCoaches from "./pages/heritage/HeadCoaches";
import AssistantCoaches from "./pages/heritage/AssistantCoaches";
import SupportStaff from "./pages/heritage/SupportStaff";
import OfficialsHub from "./pages/heritage/OfficialsHub";
import OfficialsMen from "./pages/heritage/OfficialsMen";
import OfficialsMenEras from "./pages/heritage/OfficialsMenEras";
import OfficialsWomen from "./pages/heritage/OfficialsWomen";
import OfficialsWomenEras from "./pages/heritage/OfficialsWomenEras";

/* ================= LAYOUTS ================= */
import FreemiumLayout from "./layouts/FreemiumLayout";
import AppLayout from "./layouts/AppLayout";
import SuperLayout from "./layouts/SuperLayout";

/* ================= DEV ENTRY ================= */
function DevHomeEntry() {
  const [params] = useSearchParams();
  const devTier = params.get("devTier");

  if (devTier === "freemium") return <Navigate to="/home-free" replace />;
  if (devTier === "premium") return <Navigate to="/home" replace />;
  if (devTier === "super") return <Navigate to="/home-super" replace />;

  return <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ================= DEV ================= */}
        <Route path="/dev/home" element={<DevHomeEntry />} />

        {/* ================= FREEMIUM / ONBOARDING ================= */}
        <Route element={<FreemiumLayout />}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/splash-intro" element={<SecondarySplashPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/what-you-get/:tier" element={<WhatYouGetPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/access-pending" element={<AccessPendingPage />} />

          <Route path="/signup/free" element={<FreemiumSignupPage />} />
          <Route path="/signup/premium" element={<PremiumSignupPage />} />
          <Route path="/signup/super" element={<SuperPremiumSignupPage />} />

          <Route path="/home-free" element={<FreemiumHomePage />} />

          {/* 🔒 FREEMIUM-SCOPED ANTHEMS */}
          <Route path="/free/anthems" element={<NationalAnthemsDirectory />} />
          <Route
            path="/free/anthems/:nationId"
            element={<NationalAnthemPage />}
          />
        </Route>

        {/* ================= APP (PREMIUM) ================= */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />

          {/* 🔒 CANONICAL ANTHEMS */}
          <Route path="/anthems" element={<NationalAnthemsDirectory />} />
          <Route path="/anthems/:nationId" element={<NationalAnthemPage />} />

          <Route path="/tournaments" element={<TournamentsHubPage />} />
          <Route path="/tournaments/men" element={<MensTournamentsPage />} />
          <Route path="/tournaments/women" element={<WomensTournamentsPage />} />
          <Route path="/tournaments/*" element={<TournamentPage />} />

          <Route path="/match-center" element={<MatchCenterPage />} />
          <Route path="/live-scores" element={<LiveScoresPage />} />
          <Route path="/fixtures" element={<FixturesPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/match/:id" element={<MatchPage />} />

          <Route path="/stadiums" element={<StadiumHubPage />} />
          <Route path="/stadium/:slug" element={<StadiumPage />} />
          <Route
            path="/stadium/:slug/matchday"
            element={<StadiumMatchdayPage />}
          />

          <Route path="/media" element={<MediaHubPage />} />
          <Route path="/videos" element={<MatchVideosPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/greatest-hits" element={<GreatestHits />} />
          <Route path="/comments" element={<FanComments />} />

          <Route path="/defining-moments" element={<DefiningMomentsPage />} />
          <Route
            path="/moments/world-cup-turning-points"
            element={<WorldCupTurningPoints />}
          />
          <Route
            path="/moments/tactical-shifts"
            element={<TacticalShifts />}
          />
          <Route path="/moments/law-changes" element={<LawChanges />} />
          <Route
            path="/moments/calls-decisions"
            element={<CallsAndDecisions />}
          />
          <Route
            path="/moments/era-defining-rivalries"
            element={<EraDefiningRivalries />}
          />
          <Route
            path="/moments/cultural-moments"
            element={<CulturalMoments />}
          />

          <Route path="/inside-the-game" element={<InsideTheGameHubPage />} />
          <Route path="/inside-the-game/referees" element={<RefereeHub />} />
          <Route
            path="/inside-the-game/referees/breakdown"
            element={<BreakdownRucksPage />}
          />
          <Route
            path="/inside-the-game/referees/tmo"
            element={<TMOReviewsPage />}
          />
          <Route
            path="/inside-the-game/referees/law-updates"
            element={<LawUpdatesPage />}
          />
          <Route
            path="/inside-the-game/fantasy"
            element={<FantasyLeagueHubPage />}
          />
          <Route
            path="/inside-the-game/playing-charter"
            element={<PlayingCharterPage />}
          />

          <Route path="/fanzone" element={<FanzoneHubPage />} />
          <Route path="/fanzone/loyalty" element={<LoyaltyPage />} />
          <Route path="/fanzone/audio" element={<LiveMatchAudioPage />} />
          <Route path="/fanzone/ppv" element={<PPVPage />} />

          <Route path="/news" element={<NewsHubPage />} />
          <Route path="/news/feed" element={<MyFeedPage />} />

          <Route path="/matchday-journeys" element={<MatchdayJourneysPage />} />
          <Route
            path="/matchday-planner"
            element={<MatchdayPlannerPage />}
          />

          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/transport" element={<TransportPage />} />

          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/merch" element={<MerchPage />} />

          <Route path="/my-teams" element={<MyTeamsPage />} />
          <Route
            path="/my-teams/manage"
            element={<MyTeamsManagePage />}
          />
          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="/heritage" element={<HeritageHub />} />
          <Route path="/heritage/legends" element={<LegendsHub />} />
          <Route path="/heritage/legends/men" element={<LegendsMen />} />
          <Route path="/heritage/legends/women" element={<LegendsWomen />} />
          <Route path="/heritage/squads" element={<SquadsHub />} />
          <Route path="/heritage/squads/men" element={<SquadsMen />} />
          <Route path="/heritage/squads/women" element={<SquadsWomen />} />
          <Route path="/heritage/champions" element={<ChampionsHub />} />
          <Route
            path="/heritage/champions/men"
            element={<ChampionsMen />}
          />
          <Route
            path="/heritage/champions/women"
            element={<ChampionsWomen />}
          />
          <Route
            path="/heritage/coaches"
            element={<CoachesSupportHub />}
          />
          <Route
            path="/heritage/coaches/head-coaches"
            element={<HeadCoaches />}
          />
          <Route
            path="/heritage/coaches/assistant-coaches"
            element={<AssistantCoaches />}
          />
          <Route
            path="/heritage/coaches/support-staff"
            element={<SupportStaff />}
          />
          <Route
            path="/heritage/officials"
            element={<OfficialsHub />}
          />
          <Route
            path="/heritage/officials/men"
            element={<OfficialsMen />}
          />
          <Route
            path="/heritage/officials/men/eras"
            element={<OfficialsMenEras />}
          />
          <Route
            path="/heritage/officials/women"
            element={<OfficialsWomen />}
          />
          <Route
            path="/heritage/officials/women/eras"
            element={<OfficialsWomenEras />}
          />
        </Route>

        {/* ================= SUPER ================= */}
        <Route element={<SuperLayout />}>
          <Route path="/home-super" element={<SuperHomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
