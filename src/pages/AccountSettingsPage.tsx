// src/pages/AccountSettingsPage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./AccountSettingsPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function AccountSettingsPage() {
  const navigate = useNavigate();

  /* ================= USER ================= */

  const email =
    localStorage.getItem(
      "sfz_user_email"
    ) || "supporter@example.com";

  /* ================= AVATAR ================= */

  const [avatar, setAvatar] =
    useState<string | null>(
      localStorage.getItem(
        "sfz_avatar"
      )
    );

  /* ================= HELPERS ================= */

  const handleAvatarUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        "sfz_avatar",
        result
      );
    };

    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    localStorage.removeItem(
      "sfz_avatar"
    );

    setAvatar(null);
  };

  /* ================= ROUTING ================= */

  const goToRestorePurchase = () => {
    navigate("/restore-purchase");
  };

  const goToPrivacy = () => {
    navigate("/privacy-policy");
  };

  const goToSupport = () => {
    navigate("/support");
  };

  const goToDeleteAccount = () => {
    navigate("/delete-account");
  };

  const logout = () => {
    localStorage.removeItem(
      "sfz_logged_in"
    );

    navigate("/login");
  };

  return (
    <section className={styles.page}>
      {/* ================= HERO ================= */}

      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <div className={styles.badge}>
            ACCOUNT SETTINGS
          </div>

          <h1>
            Your Football
            Platform Account
          </h1>

          <p>
            Manage your profile,
            account preferences,
            security access and
            football platform settings.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className={styles.content}>
        {/* PROFILE */}

        <section className={styles.card}>
          <h2>
            Account Overview
          </h2>

          <div className={styles.infoBox}>
            <div>
              <span className={styles.label}>
                Email
              </span>

              <div className={styles.value}>
                {email}
              </div>
            </div>

            <div>
              <span className={styles.label}>
                Access
              </span>

              <div className={styles.value}>
                Full Global Football Access
              </div>
            </div>
          </div>
        </section>

        {/* AVATAR */}

        <section className={styles.card}>
          <h2>
            Profile Image
          </h2>

          <div className={styles.avatarSection}>
            <div className={styles.avatarWrap}>
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile avatar"
                  className={styles.avatar}
                />
              ) : (
                <div
                  className={
                    styles.avatarPlaceholder
                  }
                >
                  👤
                </div>
              )}
            </div>

            <div className={styles.avatarActions}>
              <label
                className={styles.primaryButton}
              >
                Upload Photo

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={
                    handleAvatarUpload
                  }
                />
              </label>

              {avatar && (
                <button
                  className={
                    styles.secondaryButton
                  }
                  onClick={removeAvatar}
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </section>

        {/* SECURITY */}

        <section className={styles.card}>
          <h2>
            Security
          </h2>

          <div className={styles.securityGrid}>
            <div className={styles.securityItem}>
  <h3>Password Recovery</h3>

  <p>
    Need help accessing your account?
    Visit the Support Center for login,
    account recovery and access assistance.
    Additional recovery options may be
    introduced as platform authentication
    systems evolve.
  </p>
</div>

            <div className={styles.securityItem}>
              <h3>Protected Access</h3>

              <p>
                Platform authentication
                and football account access
                are protected through secure
                login systems.
              </p>
            </div>
          </div>
        </section>

        {/* SUPPORT */}

        <section className={styles.card}>
          <h2>
            Platform Support
          </h2>

          <div className={styles.supportGrid}>
            <button
              className={styles.supportButton}
              onClick={
                goToRestorePurchase
              }
            >
              Restore Purchase
            </button>

            <button
              className={styles.supportButton}
              onClick={goToPrivacy}
            >
              Privacy Policy
            </button>

            <button
              className={styles.supportButton}
              onClick={goToSupport}
            >
              Support Center
            </button>

            <button
              className={
                styles.dangerButton
              }
              onClick={
                goToDeleteAccount
              }
            >
              Delete Account
            </button>
          </div>
        </section>

        {/* LOGOUT */}

        <section className={styles.logoutSection}>
          <button
            className={styles.logoutButton}
            onClick={logout}
          >
            Logout
          </button>
        </section>

        {/* FOOTER */}

        <footer className={styles.footer}>
          International Soccer Fans Zone
          is an independent global football
          platform built for supporters worldwide.
        </footer>
      </main>
    </section>
  );
}