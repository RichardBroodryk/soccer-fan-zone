// --------------------------------------------------
// RAZ SYSTEM — TOURNAMENT META 2026 (FULLY NORMALIZED)
// --------------------------------------------------

export interface TournamentMeta {
  conceptId: string;
  instanceId: string;
  name: string;
  year: number;
  gender: "men" | "women";
  type: string;
  status: string;
  matchKey: string;
  heroBadge?: string;
  heroSubtitle?: string;
  route: string;
  window?: string;
}

/* ==================================================
   DATA
   ================================================== */

export const tournaments2026: TournamentMeta[] = [

  // ================= MEN =================

  {
    conceptId: "six-nations",
    instanceId: "six-nations-2026",
    name: "Six Nations",
    year: 2026,
    gender: "men",
    type: "tournament",
    status: "completed",
    matchKey: "Six Nations 2026",
    route: "/tournaments/men/six-nations-2026",
  },

  {
    conceptId: "nations-championship",
    instanceId: "nations-championship-2026",
    name: "Nations Championship",
    year: 2026,
    gender: "men",
    type: "global",
    status: "active",
    matchKey: "Nations Championship 2026",
    route: "/tournaments/men/nations-championship-2026",
  },

  {
    conceptId: "pacific-nations",
    instanceId: "pacific-nations-2026",
    name: "Pacific Nations Cup",
    year: 2026,
    gender: "men",
    type: "regional",
    status: "active",
    matchKey: "Pacific Nations Cup 2026",
    route: "/tournaments/men/pacific-nations-2026",
  },

  {
    conceptId: "international-tests",
    instanceId: "international-tests-2026",
    name: "International Tests",
    year: 2026,
    gender: "men",
    type: "test",
    status: "planned",
    matchKey: "Men's International Tests 2026",
    route: "/tournaments/men/international-tests-2026",
  },

  {
    conceptId: "bledisloe-cup",
    instanceId: "bledisloe-cup-2026",
    name: "Bledisloe Cup",
    year: 2026,
    gender: "men",
    type: "test-series",
    status: "active",
    matchKey: "Bledisloe Cup 2026",
    heroBadge: "ICONIC RIVALRY",
    heroSubtitle: "Australia · New Zealand",
    route: "/tournaments/men/bledisloe-cup-2026",
  },

  {
    conceptId: "sa-nz-rival-tour",
    instanceId: "sa-nz-rival-tour-2026",
    name: "The Rivalry Tour",
    year: 2026,
    gender: "men",
    type: "test-series",
    status: "planned",
    matchKey: "The Rivalry Tour 2026",
    heroBadge: "ICONIC RIVALRY",
    heroSubtitle: "South Africa · New Zealand",
    route: "/tournaments/men/rivalry-tour-2026",
  },

  // ================= WOMEN =================

  {
    conceptId: "six-nations-women",
    instanceId: "six-nations-women-2026",
    name: "Women's Six Nations",
    year: 2026,
    gender: "women",
    type: "tournament",
    status: "active",
    matchKey: "Women's Six Nations 2026",
    route: "/tournaments/women/six-nations-2026",
  },

  {
    conceptId: "pacific-four",
    instanceId: "pacific-four-2026",
    name: "Pacific Four Series",
    year: 2026,
    gender: "women",
    type: "regional",
    status: "active",
    matchKey: "Pacific Four Series 2026",
    route: "/tournaments/women/pacific-four-2026",
  },

  {
    conceptId: "wxv1",
    instanceId: "wxv1-2026",
    name: "WXV 1",
    year: 2026,
    gender: "women",
    type: "global",
    status: "active",
    matchKey: "WXV 1 2026",
    route: "/tournaments/women/wxv1-2026",
  },

  {
    conceptId: "womens-tests",
    instanceId: "womens-tests-2026",
    name: "Women's International Tests",
    year: 2026,
    gender: "women",
    type: "test",
    status: "planned",
    matchKey: "Women's International Tests 2026",
    route: "/tournaments/women/international-tests-2026",
  },
];