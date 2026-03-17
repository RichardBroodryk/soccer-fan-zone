import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PrimaryNav from "../components/nav/PrimaryNav";
import SponsorBar from "../components/sponsors/SponsorBar";
import {
  primarySponsors,
  secondarySponsors,
  utilitySponsors,
} from "../data/sponsors";
import styles from "./AppLayout.module.css";

type TierVariant = "freemium" | "premium" | "super";

const DEV_TIER_KEY = "raz_dev_tier";
const ACTIVE_TIER_KEY = "raz_active_tier";

export default function AppLayout() {
  const location = useLocation();
  const [devTier, setDevTier] = useState<TierVariant | null>(null);

  /* ================= DEV TIER PERSISTENCE ================= */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tierParam = params.get("devTier") as TierVariant | null;

    if (
      tierParam === "freemium" ||
      tierParam === "premium" ||
      tierParam === "super"
    ) {
      sessionStorage.setItem(DEV_TIER_KEY, tierParam);
      setDevTier(tierParam);
      return;
    }

    const storedTier = sessionStorage.getItem(
      DEV_TIER_KEY
    ) as TierVariant | null;

    if (storedTier) {
      setDevTier(storedTier);
    } else {
      setDevTier(null);
    }
  }, [location.search]);

  /* ================= ACTIVE TIER TRACKING ================= */
  useEffect(() => {
  if (location.pathname.startsWith("/home-super")) {
    sessionStorage.setItem(ACTIVE_TIER_KEY, "super");
  } else if (location.pathname === "/home") {
    sessionStorage.setItem(ACTIVE_TIER_KEY, "premium");
  }
}, [location.pathname]);

  const storedTier =
    (sessionStorage.getItem(ACTIVE_TIER_KEY) as TierVariant | null) ?? null;

  /* ================= TIER RESOLUTION ================= */
  const resolvedTier: TierVariant = devTier ?? storedTier ?? "premium";

  /* ================= NAV RULE ================= */
  const shouldShowPrimaryNav = resolvedTier !== "freemium";

  /* ================= UTILITY PAGE DETECTION ================= */
  const utilityRoutes = [
    "/tickets",
    "/flights",
    "/hotels",
    "/transport",
    "/merch",
    "/matchday-planner",
    "/matchday-journeys",
  ];

  const isUtilityPage = utilityRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className={styles.app}>
      {/* PRIMARY NAV */}
      {shouldShowPrimaryNav && <PrimaryNav variant={resolvedTier} />}

      {/* TOP SPONSOR BAR (PREMIUM ONLY) */}
      {resolvedTier === "premium" && (
        <div className={styles.adTop}>
          <SponsorBar sponsors={primarySponsors} />
        </div>
      )}

      {/* PAGE CONTENT */}
      <main className={styles.content}>
        <Outlet />
      </main>

      {/* BOTTOM SPONSOR BAR (PREMIUM ONLY) */}
      {resolvedTier === "premium" && (
        <div className={styles.adBottom}>
          {isUtilityPage ? (
            <SponsorBar sponsors={utilitySponsors} />
          ) : (
            <SponsorBar sponsors={secondarySponsors} />
          )}
        </div>
      )}
    </div>
  );
}