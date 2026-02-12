import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PrimaryNav from "../components/nav/PrimaryNav";
import AdBanner from "../components/homepage/AdBanner";
import styles from "./AppLayout.module.css";

type TierVariant = "freemium" | "premium" | "super";

const DEV_TIER_KEY = "raz_dev_tier";

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
      console.info(`[DEV MODE] Tier override set: ${tierParam}`);
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

  /* ================= TIER RESOLUTION ================= */
  const resolvedTier: TierVariant =
    devTier ??
    (location.pathname.startsWith("/home-super") ||
    location.pathname.startsWith("/heritage")
      ? "super"
      : "premium");

  /* ================= NAV RULE =================
     Freemium NEVER sees PrimaryNav
  ============================================== */
  const shouldShowPrimaryNav = resolvedTier !== "freemium";

  return (
    <div className={styles.app}>
      {/* PRIMARY NAV */}
      {shouldShowPrimaryNav && <PrimaryNav variant={resolvedTier} />}

      {/* TOP AD */}
      <div className={styles.adTop}>
        <AdBanner text="🔥 Official Rugby Partners – Tickets, Travel & Merch" />
      </div>

      {/* PAGE CONTENT */}
      <main className={styles.content}>
        <Outlet />
      </main>

      {/* BOTTOM AD */}
      <div className={styles.adBottom}>
        <AdBanner text="🏉 Matchday Deals – Limited Offers This Week" />
      </div>
    </div>
  );
}
