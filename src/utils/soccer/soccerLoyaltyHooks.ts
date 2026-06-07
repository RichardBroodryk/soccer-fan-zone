type LoyaltyAction =
  | "match_view"
  | "video_watch"
  | "stadium_view"
  | "audio_view"
  | "audio_listen";

export function recordSoccerLoyaltyAction(
  action: LoyaltyAction
) {
  try {
    switch (action) {
      case "match_view": {
        increment(
          "soccer_matches_followed"
        );
        break;
      }

      case "video_watch": {
        increment(
          "soccer_videos_watched"
        );
        break;
      }

      case "stadium_view": {
        increment(
          "soccer_stadiums_viewed"
        );
        break;
      }

      case "audio_view": {
        increment(
          "soccer_audio_views"
        );
        break;
      }

      case "audio_listen": {
        increment(
          "soccer_audio_listens"
        );
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.warn(
      "Loyalty tracking failed",
      error
    );
  }
}

function increment(key: string) {
  const current =
    Number(
      localStorage.getItem(key)
    ) || 0;

  localStorage.setItem(
    key,

    String(current + 1)
  );
}