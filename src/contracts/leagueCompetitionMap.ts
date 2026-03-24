// --------------------------------------------------
// RAZ SYSTEM — LEAGUE ↔ COMPETITION MAP
// --------------------------------------------------

/**
 * Maps UI league IDs → competitionId (men/women)
 */

export const LEAGUE_COMPETITION_MAP: Record<
  string,
  { men: string; women: string }
> = {
  urc: {
    men: "urc",
    women: "urc",
  },

  premiership: {
    men: "premiership",
    women: "premier-15s",
  },

  super: {
    men: "super-rugby",
    women: "super-rugby-women",
  },

  top14: {
    men: "top-14",
    women: "elite-1-women",
  },

  japan: {
    men: "japan-league-one",
    women: "japan-league-one", // placeholder until full women comp
  },

  investec: {
    men: "champions-cup",
    women: "champions-cup", // placeholder
  },

  epcr: {
    men: "challenge-cup",
    women: "challenge-cup", // placeholder
  },
};