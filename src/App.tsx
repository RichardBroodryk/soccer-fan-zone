import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { ReactNode, useEffect } from "react";

import { getToken } from "./services/auth";

/* ================= SPLASH / ONBOARDING ================= */
import SplashPage from "./pages/SplashPage";
import SecondarySplashPage from "./pages/SecondarySplashPage";
import WelcomePage from "./pages/WelcomePage";
import WhatYouGetPage from "./pages/WhatYouGetPage";
import TermsPage from "./pages/TermsPage";
import AccessPendingPage from "./pages/AccessPendingPage";
import LoginPage from "./pages/LoginPage";

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

/* ================= LAYOUTS ================= */
import FreemiumLayout from "./layouts/FreemiumLayout";
import AppLayout from "./layouts/AppLayout";
import SuperLayout from "./layouts/SuperLayout";

/* ================= AUTH GUARD ================= */
function RequireAuth({ children }: { children: ReactNode }) {
  const token = getToken();
  const isDev = process.env.NODE_ENV === "development";

  if (!token && !isDev) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

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
  const isDev = process.env.NODE_ENV === "development";

  /* ✅ PADDLE AUTO-OPEN (RAZ) */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const txn = params.get("_ptxn");

    if (txn && (window as any).Paddle) {
      (window as any).Paddle.Checkout.open({
        transactionId: txn,
      });
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* DEV ROUTE */}
        {isDev && <Route path="/dev/home" element={<DevHomeEntry />} />}

        {/* ================= FREEMIUM / ENTRY ================= */}
        <Route element={<FreemiumLayout />}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/splash-intro" element={<SecondarySplashPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/what-you-get/:tier" element={<WhatYouGetPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/access-pending" element={<AccessPendingPage />} />

          <Route path="/signup/free" element={<FreemiumSignupPage />} />
          <Route path="/signup/premium" element={<PremiumSignupPage />} />
          <Route path="/signup/super" element={<SuperPremiumSignupPage />} />

          <Route path="/home-free" element={<FreemiumHomePage />} />

          <Route path="/free/anthems" element={<NationalAnthemsDirectory />} />
          <Route
            path="/free/anthems/:nationId"
            element={<NationalAnthemPage />}
          />
        </Route>

        {/* ================= PREMIUM ================= */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/home" element={<HomePage />} />
          {/* (rest of your routes unchanged) */}
        </Route>

        {/* ================= SUPER ================= */}
        <Route
          element={
            <RequireAuth>
              <SuperLayout />
            </RequireAuth>
          }
        >
          <Route path="/home-super" element={<SuperHomePage />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}