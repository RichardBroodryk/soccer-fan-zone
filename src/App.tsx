import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import type { ReactNode } from "react";

import ScrollToTop from "./utils/ScrollToTop";

/* ================= ONBOARDING ================= */

import SplashPage from "./pages/SplashPage";
import SecondarySplashPage from "./pages/SecondarySplashPage";
import WelcomePage from "./pages/WelcomePage";
import TermsPage from "./pages/TermsPage";
import AccountSetupPage from "./pages/AccountSetupPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RestorePurchasePage from "./pages/RestorePurchasePage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import SupportPage from "./pages/SupportPage";

/* ================= SUPPORT / LEGAL ================= */

import ContactPage from "./pages/contact/ContactPage";

/* ================= OPTIONAL LEGACY CONTENT ================= */

import NationalAnthemsDirectory from "./pages/NationalAnthemsDirectory";
import NationalAnthemPage from "./pages/NationalAnthemPage";

/* ================= SOCCER CORE ================= */

import SoccerHomePage from "./pages/soccer/SoccerHomePage";

import SoccerTeamsPage from "./pages/soccer/SoccerTeamsPage";
import SoccerTeamPage from "./pages/soccer/SoccerTeamPage";

import SoccerMatchesPage from "./pages/soccer/SoccerMatchesPage";
import SoccerMatchPage from "./pages/soccer/SoccerMatchPage";

import SoccerMatchCenterPage from "./pages/soccer/SoccerMatchCenterPage";

import SoccerFixturesPage from "./pages/soccer/SoccerFixturesPage";
import SoccerLivePage from "./pages/soccer/SoccerLivePage";
import SoccerResultsPage from "./pages/soccer/SoccerResultsPage";
import SoccerStatsPage from "./pages/soccer/SoccerStatsPage";

import SoccerGroupsPage from "./pages/soccer/SoccerGroupsPage";
import SoccerGroupPage from "./pages/soccer/SoccerGroupPage";
import SoccerGroupsOverviewPage from "./pages/soccer/SoccerGroupsOverviewPage";

import SoccerBracketPage from "./pages/soccer/SoccerBracketPage";
import SoccerKnockoutHubPage from "./pages/soccer/SoccerKnockoutHubPage";
import SoccerKnockoutProjectionPage from "./pages/soccer/SoccerKnockoutProjectionPage";

import SoccerTournamentCenterPage from "./pages/soccer/SoccerTournamentCenterPage";

import SoccerWorldCupHubPage from "./pages/soccer/SoccerWorldCupHubPage";

import SoccerStadiumHubPage from "./pages/soccer/SoccerStadiumHubPage";
import SoccerStadiumPage from "./pages/soccer/SoccerStadiumPage";

import SoccerSearchPage from "./pages/soccer/SoccerSearchPage";

import SoccerNationPage from "./pages/soccer/SoccerNationPage";
import SoccerPlayerPage from "./pages/soccer/SoccerPlayerPage";

/* ================= MEDIA ================= */

import SoccerMediaHubPage from "./pages/soccer/SoccerMediaHubPage";
import SoccerVideosPage from "./pages/soccer/SoccerVideosPage";
import SoccerNewsHubPage from "./pages/soccer/SoccerNewsHubPage";
import SoccerPodcastsPage from "./pages/soccer/SoccerPodcastsPage";

/* ================= FANZONE ================= */

import SoccerFanzonePage from "./pages/soccer/SoccerFanzonePage";

import SoccerMyFeedPage from "./pages/soccer/SoccerMyFeedPage";
import SoccerLoyaltyPage from "./pages/soccer/SoccerLoyaltyPage";
import SoccerLiveAudioPage from "./pages/soccer/SoccerLiveAudioPage";
import SoccerNotificationsPage from "./pages/soccer/SoccerNotificationsPage";

import SoccerCalendarPage from "./pages/soccer/calendar/SoccerCalendarPage";

import SoccerPremiumViewingPage from "./pages/soccer/fanzone/SoccerPremiumViewingPage";

import SoccerMyTeamsPage from "./pages/soccer/SoccerMyTeamsPage";
import SoccerMyTeamsManagePage from "./pages/soccer/SoccerMyTeamsManagePage";

import SoccerProfilePage from "./pages/soccer/SoccerProfilePage";

import TacticalRoomPage from "./pages/soccer/TacticalRoomPage";

/* ================= LAYOUT ================= */

import AppLayout from "./layouts/AppLayout";

/* ================= DEBUG ================= */

import StatsApiDebugPage from "./pages/StatsApiDebugPage";

/* ================= AUTH GUARD ================= */

function RequireAuth({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
export default function App() {
  /* ================= DOMAIN REDIRECT ================= */

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* ================= ONBOARDING FLOW ================= */}

        <Route
          path="/"
          element={<SplashPage />}
        />

        <Route
          path="/splash-intro"
          element={<SecondarySplashPage />}
        />

        <Route
          path="/soccer/welcome"
          element={<WelcomePage />}
        />

        <Route
          path="/terms"
          element={<TermsPage />}
        />

        <Route
          path="/account-setup"
          element={<AccountSetupPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

               <Route
  path="/purchase-success"
  element={<PurchaseSuccessPage />}
/>

        <Route
  path="/privacy-policy"
  element={<PrivacyPolicyPage />}
/>

<Route
  path="/restore-purchase"
  element={<RestorePurchasePage />}
/>

<Route
  path="/delete-account"
  element={<DeleteAccountPage />}
/>

<Route
  path="/support"
  element={<SupportPage />}
/>

        {/* ================= ACCOUNT ================= */}

        <Route
          path="/account/settings"
          element={<AccountSettingsPage />}
        />

        {/* ================= MAIN APP ================= */}

        <Route
          path="/soccer"
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route
            index
            element={<SoccerHomePage />}
          />

          {/* MATCH CENTER */}

          <Route
            path="match-center"
            element={<SoccerMatchCenterPage />}
          />

          <Route
            path="live"
            element={<SoccerLivePage />}
          />

          <Route
            path="fixtures"
            element={<SoccerFixturesPage />}
          />

          <Route
            path="results"
            element={<SoccerResultsPage />}
          />

          <Route
            path="stats"
            element={<SoccerStatsPage />}
          />

          {/* MATCHES */}

          <Route
            path="matches"
            element={<SoccerMatchesPage />}
          />

          <Route
            path="matches/:matchId"
            element={<SoccerMatchPage />}
          />

          {/* TEAMS */}

          <Route
            path="teams"
            element={<SoccerTeamsPage />}
          />

          <Route
            path="teams/:teamId"
            element={<SoccerTeamPage />}
          />

          {/* GROUPS */}

          <Route
            path="groups"
            element={<SoccerGroupsOverviewPage />}
          />

          <Route
            path="groups/all"
            element={<SoccerGroupsPage />}
          />

          <Route
            path="groups/:groupId"
            element={<SoccerGroupPage />}
          />

          {/* WORLD CUP */}

          <Route
            path="world-cup"
            element={<SoccerWorldCupHubPage />}
          />

          <Route
  path="tournament-center"
  element={<SoccerTournamentCenterPage />}
/>

          {/* KNOCKOUT */}

          <Route
            path="knockout"
            element={<SoccerKnockoutHubPage />}
          />

          <Route
            path="bracket"
            element={<SoccerBracketPage />}
          />

          <Route
  path="knockout-projections"
  element={
    <SoccerKnockoutProjectionPage />
  }
/>

          {/* STADIUMS */}

          <Route
            path="stadiums"
            element={<SoccerStadiumHubPage />}
          />

          <Route
            path="stadiums/:stadiumId"
            element={<SoccerStadiumPage />}
          />

          {/* SEARCH */}

          <Route
            path="search"
            element={<SoccerSearchPage />}
          />

          {/* PLAYERS / NATIONS */}

          <Route
            path="players/:id"
            element={<SoccerPlayerPage />}
          />

          <Route
            path="nations/:nation"
            element={<SoccerNationPage />}
          />

          {/* MEDIA */}

          <Route
            path="media"
            element={<SoccerMediaHubPage />}
          />

          <Route
            path="videos"
            element={<SoccerVideosPage />}
          />

          <Route
            path="news"
            element={<SoccerNewsHubPage />}
          />

          <Route
            path="podcasts"
            element={<SoccerPodcastsPage />}
          />

          {/* FANZONE */}

          <Route
            path="fanzone"
            element={<SoccerFanzonePage />}
          />

          <Route
            path="fanzone/loyalty"
            element={<SoccerLoyaltyPage />}
          />

          <Route
            path="fanzone/audio"
            element={<SoccerLiveAudioPage />}
          />

          <Route
            path="fanzone/ppv"
            element={<SoccerPremiumViewingPage />}
          />

         <Route
  path="tactical-room"
  element={<TacticalRoomPage />}
/>

          {/* USER */}

          <Route
            path="my-feed"
            element={<SoccerMyFeedPage />}
          />

          <Route
            path="notifications"
            element={<SoccerNotificationsPage />}
          />

          <Route
            path="calendar"
            element={<SoccerCalendarPage />}
          />

          <Route
            path="my-teams"
            element={<SoccerMyTeamsPage />}
          />

          <Route
            path="my-teams/manage"
            element={<SoccerMyTeamsManagePage />}
          />

          <Route
            path="profile"
            element={<SoccerProfilePage />}
          />
        </Route>

        <Route
          path="/free/anthems"
          element={<NationalAnthemsDirectory />}
        />

        <Route
          path="/free/anthems/:nationId"
          element={<NationalAnthemPage />}
        />

        <Route
          path="/anthems"
          element={<NationalAnthemsDirectory />}
        />

        <Route
          path="/anthems/:nationId"
          element={<NationalAnthemPage />}
        />

        {/* ================= SUPPORT ================= */}

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        {/* ================= DEBUG ================= */}

        <Route
          path="/debug/api"
          element={<StatsApiDebugPage />}
        />

        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}