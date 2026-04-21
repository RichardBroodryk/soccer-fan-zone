export type CommentAuthor = {
  displayName: string;
  role?: "fan" | "verified";
};

export type MatchPhase = "pre" | "live" | "post";

export type TournamentComment = {
  id: string;
  tournamentId: string;
  text: string;
  createdAt: string;
  author: CommentAuthor;
  matchLabel?: string;
  matchPhase?: MatchPhase;
};

export type TournamentCommentThread = {
  tournamentId: string;
  comments: TournamentComment[];
  lastActivityAt: string;
};

export const tournamentCommentThreads: TournamentCommentThread[] = [
  {
    tournamentId: "six-nations",
    comments: [
      {
        id: "sn-001",
        tournamentId: "six-nations",
        text: "That defensive set after 65 minutes was championship-level rugby.",
        createdAt: "2026-02-14T18:42:00Z",
        author: { displayName: "RugbyFan92" },
        matchLabel: "England vs Ireland",
        matchPhase: "post",
      },
    ],
    lastActivityAt: "2026-02-14T19:01:00Z",
  },
  {
    tournamentId: "six-nations-women",
    comments: [
      {
        id: "snw-001",
        tournamentId: "six-nations-women",
        text: "France looked unstoppable in Round 1. That forward pack is scary.",
        createdAt: "2026-04-12T10:15:00Z",
        author: { displayName: "LesBleuesFan" },
        matchLabel: "France W vs Italy W",
        matchPhase: "post",
      },
    ],
    lastActivityAt: "2026-04-12T10:15:00Z",
  },
];