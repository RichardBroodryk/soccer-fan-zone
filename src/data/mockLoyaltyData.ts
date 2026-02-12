export const mockLoyaltyData = {
  tier: "silver" as "bronze" | "silver" | "gold" | "platinum",
  points: 1340,

  engagement: {
    matchesFollowedSeason: 6,
    tournaments: ["Six Nations", "Rugby Championship"],
    featuresUsed: ["Live Match Audio", "PPV Access"],
    merchPurchases: 1,
  },

  history: {
    seasonsActive: 2,
    lastActive: "15 January 2026",
  },
};
