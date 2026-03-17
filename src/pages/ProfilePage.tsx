import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import myRugbyHero from "../assets/images/raz/my-rugby-hero.png";
import loyaltyHero from "../assets/images/raz/fanzone-loyalty.png";

export default function ProfilePage() {
  const navigate = useNavigate();

  const tier =
    sessionStorage.getItem("raz_active_tier") || "premium";

  const [avatar, setAvatar] = useState<string | null>(
    localStorage.getItem("raz_avatar")
  );

  function handleAvatarUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;

      setAvatar(result);
      localStorage.setItem("raz_avatar", result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <main className={styles.page}>
      {/* PROFILE HEADER */}
      <section className={styles.header}>
        <div className={styles.avatarSection}>
          {avatar ? (
            <img
              src={avatar}
              alt="Profile avatar"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>👤</div>
          )}

          <label className={styles.uploadButton}>
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              hidden
            />
          </label>
        </div>

        <div className={styles.userInfo}>
          <h1 className={styles.name}>Profile</h1>

          <p className={styles.email}>user@email.com</p>

          {/* MEMBER BADGE */}
          <span
            className={`${styles.memberBadge} ${
              tier === "super"
                ? styles.superBadge
                : styles.premiumBadge
            }`}
          >
            {tier === "super"
              ? "SUPER MEMBER"
              : "PREMIUM MEMBER"}
          </span>
        </div>

        <div className={styles.headerActions}>
          <button
            onClick={() => navigate("/my-teams/manage")}
          >
            Manage Teams
          </button>

          <button
            onClick={() => navigate("/notifications")}
          >
            Notifications
          </button>
        </div>
      </section>

      {/* MY RUGBY */}
      <section className={styles.section}>
        <h2>My Rugby</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <img
              src={myRugbyHero}
              alt="My Rugby"
              className={styles.cardHero}
            />

            <h3>Favourite Teams</h3>

            <p>
              View and manage the teams you follow.
            </p>

            <button
              onClick={() => navigate("/my-teams")}
            >
              View My Teams
            </button>
          </div>
        </div>
      </section>

      {/* FAN STATS */}
      <section className={styles.section}>
        <h2>Fan Stats</h2>

        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              42
            </span>
            <span className={styles.statLabel}>
              Matches Followed
            </span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statValue}>
              18
            </span>
            <span className={styles.statLabel}>
              Anthems Played
            </span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statValue}>
              5
            </span>
            <span className={styles.statLabel}>
              Tournaments Followed
            </span>
          </div>
        </div>
      </section>

      {/* LOYALTY */}
      <section className={styles.section}>
        <h2>Loyalty</h2>

        <div className={styles.card}>
          <img
            src={loyaltyHero}
            alt="Loyalty"
            className={styles.cardHero}
          />

          <p>Your fan loyalty progress.</p>

          <button
            onClick={() =>
              navigate("/fanzone/loyalty")
            }
          >
            View Loyalty
          </button>
        </div>
      </section>

      {/* ACCOUNT SETTINGS */}
      <section className={styles.section}>
        <h2>Account Settings</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Membership</h3>

            <p>
              View and manage your subscription.
            </p>

            <button
              onClick={() => navigate("/checkout")}
            >
              Manage Subscription
            </button>
          </div>

          <div className={styles.card}>
            <h3>Account</h3>

            <p>
              Update your account information.
            </p>

            <button>Account Settings</button>
          </div>
        </div>
      </section>
    </main>
  );
}