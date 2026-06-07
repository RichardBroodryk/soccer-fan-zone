import styles from "./SoccerProfilePage.module.css";

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import profileHero from "../../assets/soccer/fanzone/soccer-myteams.jpg";

import loyaltyHero from "../../assets/soccer/fanzone/soccer-loyalty.jpg";

export default function SoccerProfilePage() {
  const navigate = useNavigate();

  /* ================= USER ================= */

  const tier =
    sessionStorage.getItem(
      "raz_active_tier"
    ) || "premium";

  const userEmail =
    localStorage.getItem(
      "raz_user_email"
    ) || "No email";

  /* ================= STATS ================= */

  const [
    matchesFollowed,
    setMatchesFollowed,
  ] = useState(0);

  const [
    anthemsPlayed,
    setAnthemsPlayed,
  ] = useState(0);

  const [
    tournamentsFollowed,
    setTournamentsFollowed,
  ] = useState(0);

  useEffect(() => {
    setMatchesFollowed(
      Number(
        localStorage.getItem(
          "raz_matches_followed"
        )
      ) || 0
    );

    setAnthemsPlayed(
      Number(
        localStorage.getItem(
          "raz_anthems_played"
        )
      ) || 0
    );

    setTournamentsFollowed(
      Number(
        localStorage.getItem(
          "raz_tournaments_followed"
        )
      ) || 0
    );
  }, []);

  /* ================= AVATAR ================= */

  const [avatar, setAvatar] =
    useState<string | null>(
      localStorage.getItem(
        "raz_avatar"
      )
    );

  function handleAvatarUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {
      const result =
        reader.result as string;

      setAvatar(result);

      localStorage.setItem(
        "raz_avatar",
        result
      );
    };

    reader.readAsDataURL(file);
  }

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main className={styles.page}>
        {/* ================= HERO ================= */}

        <section
          className={styles.hero}
          style={{
            backgroundImage: `url(${profileHero})`,
          }}
        >
          <div
            className={
              styles.heroOverlay
            }
          />

          <div
            className={
              styles.heroContent
            }
          >
            <div
              className={
                styles.heroEyebrow
              }
            >
              Supporter Identity
            </div>

            <h1>
              Soccer Profile
            </h1>

            <p>
              Manage your
              supporter
              identity,
              favorite teams,
              loyalty progress,
              and football
              journey for
              World Cup 2026.
            </p>
          </div>
        </section>

        {/* ================= PROFILE HEADER ================= */}

        <section
          className={
            styles.header
          }
        >
          <div
            className={
              styles.avatarSection
            }
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Profile avatar"
                className={
                  styles.avatar
                }
              />
            ) : (
              <div
                className={
                  styles.avatarPlaceholder
                }
              >
                ⚽
              </div>
            )}

            <label
              className={
                styles.uploadButton
              }
            >
              Upload Photo

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleAvatarUpload
                }
                hidden
              />
            </label>
          </div>

          <div
            className={
              styles.userInfo
            }
          >
            <h2
              className={
                styles.name
              }
            >
              Your Profile
            </h2>

            <p
              className={
                styles.email
              }
            >
              {userEmail}
            </p>

            <span
              className={`${styles.memberBadge} ${
                tier === "super"
                  ? styles.superBadge
                  : tier ===
                    "premium"
                  ? styles.premiumBadge
                  : styles.freemiumBadge
              }`}
            >
              {tier === "super"
                ? "SUPER MEMBER"
                : tier ===
                  "premium"
                ? "PREMIUM MEMBER"
                : "FREEMIUM"}
            </span>
          </div>

          <div
            className={
              styles.headerActions
            }
          >
            <button
              onClick={() =>
                navigate(
                  "/soccer/my-teams/manage"
                )
              }
            >
              Manage Teams
            </button>

            <button
              onClick={() =>
                navigate(
                  "/soccer/notifications"
                )
              }
            >
              Soccer Notifications
            </button>
          </div>
        </section>

        {/* ================= MY TEAMS ================= */}

        <section
          className={
            styles.section
          }
        >
          <h2>
            My Teams
          </h2>

          <div
            className={
              styles.grid
            }
          >
            <div
              className={
                styles.card
              }
            >
              <img
                src={
                  profileHero
                }
                alt="My Teams"
                className={
                  styles.cardHero
                }
              />

              <h3>
                Favorite Teams
              </h3>

              <p>
                View and
                manage the
                football
                nations you
                follow.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/soccer/my-teams"
                  )
                }
              >
                View My Teams
              </button>
            </div>
          </div>
        </section>

        {/* ================= FAN STATS ================= */}

        <section
          className={
            styles.section
          }
        >
          <h2>
            Fan Stats
          </h2>

          <div
            className={
              styles.statsGrid
            }
          >
            <div
              className={
                styles.stat
              }
            >
              <span
                className={
                  styles.statValue
                }
              >
                {
                  matchesFollowed
                }
              </span>

              <span
                className={
                  styles.statLabel
                }
              >
                Matches
                Followed
              </span>
            </div>

            <div
              className={
                styles.stat
              }
            >
              <span
                className={
                  styles.statValue
                }
              >
                {
                  anthemsPlayed
                }
              </span>

              <span
                className={
                  styles.statLabel
                }
              >
                Anthems
                Played
              </span>
            </div>

            <div
              className={
                styles.stat
              }
            >
              <span
                className={
                  styles.statValue
                }
              >
                {
                  tournamentsFollowed
                }
              </span>

              <span
                className={
                  styles.statLabel
                }
              >
                Tournaments
                Followed
              </span>
            </div>
          </div>

          {matchesFollowed ===
            0 &&
            anthemsPlayed ===
              0 &&
            tournamentsFollowed ===
              0 && (
              <p
                className={
                  styles.emptyState
                }
              >
                Start
                exploring to
                build your
                football fan
                stats.
              </p>
            )}
        </section>

        {/* ================= LOYALTY ================= */}

        <section
          className={
            styles.section
          }
        >
          <h2>
            Loyalty
          </h2>

          <div
            className={
              styles.card
            }
          >
            <img
              src={
                loyaltyHero
              }
              alt="Loyalty"
              className={
                styles.cardHero
              }
            />

            <p>
              Track your fan
              journey and
              loyalty
              progress.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/soccer/fanzone/loyalty"
                )
              }
            >
              View Loyalty
            </button>
          </div>
        </section>

        {/* ================= ACCOUNT ================= */}

        <section
          className={
            styles.section
          }
        >
          <h2>
            Account
            Settings
          </h2>

          <div
            className={
              styles.grid
            }
          >
            <div
              className={
                styles.card
              }
            >
              <h3>
                Membership
              </h3>

              <p
                className={
                  styles.disabledText
                }
              >
                Subscription
                upgrades and
                changes will
                be available
                soon.
              </p>

              <button
                className={
                  styles.disabledButton
                }
                disabled
              >
                Coming Soon
              </button>
            </div>

            <div
              className={
                styles.card
              }
            >
              <h3>
                Account
              </h3>

              <p>
                Update your
                account
                information.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/account/settings"
                  )
                }
              >
                Account
                Settings
              </button>
            </div>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}