import { TournamentCommentThread } from "../types/comments";

/* ==================================================
   TOURNAMENT COMMENT THREADS — CANONICAL
   Scope: Competition-level discussion (timeless)
   Identity: conceptId
   ================================================== */

export const tournamentCommentThreads: TournamentCommentThread[] = [
  {
    tournamentId: "six-nations", // conceptId
    comments: [
      {
        id: "sn-001",
        tournamentId: "six-nations",
        text:
          "That defensive set after 65 minutes was championship-level rugby.",
        createdAt: "2026-02-14T18:42:00Z",
        author: { displayName: "RugbyFan92" },
        matchLabel: "England vs Ireland",
        matchPhase: "post",
      },
      {
        id: "sn-002",
        tournamentId: "six-nations",
        text:
          "Referee consistency is improving, but breakdown calls are still messy.",
        createdAt: "2026-02-14T19:01:00Z",
        author: { displayName: "NeutralObserver" },
        matchLabel: "England vs Ireland",
        matchPhase: "post",
      },
    ],
    lastActivityAt: "2026-02-14T19:01:00Z",
  },

  {
    tournamentId: "sa-nz-rival-tour",
    comments: [
      {
        id: "rival-001",
        tournamentId: "sa-nz-rival-tour",
        text:
          "No rivalry in world rugby carries the same historical weight.",
        createdAt: "2026-09-12T20:10:00Z",
        author: { displayName: "BokSupporter" },
        matchLabel: "South Africa vs New Zealand",
        matchPhase: "pre",
      },
    ],
    lastActivityAt: "2026-09-12T20:10:00Z",
  },
];
