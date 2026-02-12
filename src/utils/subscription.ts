export type SubscriptionTier =
  | "freemium"
  | "premium"
  | "super-premium"
  | null;

export function getSubscriptionTier(): SubscriptionTier {
  const tier = localStorage.getItem("subscriptionTier");
  if (
    tier === "freemium" ||
    tier === "premium" ||
    tier === "super-premium"
  ) {
    return tier;
  }
  return null;
}

export function hasCompletedSignup(): boolean {
  return getSubscriptionTier() !== null;
}

export function isSuperPremium(): boolean {
  return getSubscriptionTier() === "super-premium";
}
