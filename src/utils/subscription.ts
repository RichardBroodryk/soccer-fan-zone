// src/utils/subscription.ts

import { API_BASE_URL } from "../config/api";

export type SubscriptionTier = "freemium" | "premium" | "super" | null;

export async function getSubscriptionTier(token?: string): Promise<SubscriptionTier> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/subscription`, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch tier");

    const data = await response.json();
    return data.tier || "freemium";
  } catch (err) {
    console.warn("Could not fetch subscription from server, falling back to localStorage");
    const localTier = localStorage.getItem("subscriptionTier");
    return (localTier as SubscriptionTier) || "freemium";
  }
}

export function saveTierToLocal(tier: SubscriptionTier) {
  if (tier) localStorage.setItem("subscriptionTier", tier);
  else localStorage.removeItem("subscriptionTier");
}

export function isSuperPremium(tier: SubscriptionTier): boolean {
  return tier === "super";
}