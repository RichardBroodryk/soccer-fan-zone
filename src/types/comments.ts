/* =========================================================
   RUGBY ANTHEM ZONE
   TOURNAMENT COMMENTS — CANONICAL TYPES (v1)
   Scope: Tournament-scoped fan comments
   ========================================================= */

export type CommentAuthor = {
  displayName: string;
  role?: "fan" | "verified";
};

export type MatchPhase = "pre" | "live" | "post";

export type TournamentComment = {
  id: string;
  tournamentId: string;
  text: string;
  createdAt: string; // ISO timestamp
  author: CommentAuthor;

  // Optional light context
  matchLabel?: string;
  matchPhase?: MatchPhase;

  // System flags (future-safe)
  flags?: {
    moderated?: boolean;
    pinned?: boolean;
  };
};

export type TournamentCommentThread = {
  tournamentId: string;
  comments: TournamentComment[];

  // Derived, not stored in backend later
  lastActivityAt: string;
};
