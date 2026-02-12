import { Navigate, useLocation } from "react-router-dom";

type Tier = "freemium" | "premium" | "super";

type RequireTierProps = {
  min: Tier;
  children: React.ReactNode;
};

/**
 * REQUIRE TIER GUARD
 * Enforces minimum access level at the route level.
 * Calm redirects only. No errors. No crashes.
 */

const TIER_ORDER: Record<Tier, number> = {
  freemium: 0,
  premium: 1,
  super: 2,
};

function getCurrentTier(): Tier {
  const stored = localStorage.getItem("raz_tier");
  if (stored === "premium" || stored === "super") return stored;
  return "freemium";
}

export default function RequireTier({ min, children }: RequireTierProps) {
  const location = useLocation();
  const currentTier = getCurrentTier();

  if (TIER_ORDER[currentTier] < TIER_ORDER[min]) {
    // Redirect calmly to clarity, not signup
    return (
      <Navigate
        to={`/what-you-get/${min}`}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
}
