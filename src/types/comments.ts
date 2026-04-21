// src/types/comments.ts
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
  flags?: {
    moderated?: boolean;
    pinned?: boolean;
  };
};

export type TournamentCommentThread = {
  tournamentId: string;
  comments: TournamentComment[];
  lastActivityAt: string;
};