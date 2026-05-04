import styles from "./AccountSettingsPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AccountSettingsPage() {
  const navigate = useNavigate();

  /* ================= USER ================= */

  const email =
    localStorage.getItem("raz_user_email") || "No email";

  const tier =
    sessionStorage.getItem("raz_active_tier") || "freemium";

  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  /* ================= AVATAR ================= */

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

  function removeAvatar() {
    localStorage.removeItem("raz_avatar");
    setAvatar(null);
  }

  /* ================= CANCEL SUBSCRIPTION ================= */

  const handleCancelSubscription = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel your subscription?\n\nYou will keep access until the end of your billing period."
    );

    if (!confirmCancel) return;

    try {
      setIsCancelling(true);

      const token = localStorage.getItem("raz_token");

      if (!token) {
        alert("You must be logged in.");
        return;
      }

      const res = await fetch(
        "https://rugby-anthem-backend.fly.dev/api/cancel-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Cancellation failed");
      }

      setCancelled(true);

    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setIsCancelling(false);
    }
  };

  /* ================= HELPERS ================= */

  const planName =
    tier === "super"
      ? "Super Premium"
      : tier === "premium"
      ? "Premium"
      : "Freemium";

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Account Settings</h1>
        <p>Manage your profile and subscription</p>
      </header>

      {/* ACCOUNT OVERVIEW */}
      <section className={styles.section}>
        <h2>Account Overview</h2>

        <div className={styles.card}>
          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Membership:</strong> {planName}
          </p>
        </div>
      </section>

      {/* SUBSCRIPTION */}
      {tier !== "freemium" && (
        <section className={styles.section}>
          <h2>Subscription</h2>

          <div className={styles.card}>
            <p>
              You are currently on the <strong>{planName}</strong> plan.
            </p>

            {!cancelled ? (
              <>
                <p>
                  Your subscription renews automatically. You can cancel at any time.
                  Access will remain active until the end of your billing period.
                </p>

                <button
                  className={styles.dangerButton}
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                >
                  {isCancelling
                    ? "Cancelling..."
                    : "Cancel Subscription"}
                </button>
              </>
            ) : (
              <div className={styles.successBox}>
                <p>
                  ✅ Your subscription has been cancelled.
                </p>
                <p>
                  You will retain access until the end of your billing period.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* PROFILE IMAGE */}
      <section className={styles.section}>
        <h2>Profile Image</h2>

        <div className={styles.card}>
          <div className={styles.avatarWrap}>
            {avatar ? (
              <img
                src={avatar}
                alt="Profile avatar"
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>👤</div>
            )}
          </div>

          <div className={styles.avatarActions}>
            <label className={styles.button}>
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                hidden
              />
            </label>

            {avatar && (
              <button
                className={styles.secondaryButton}
                onClick={removeAvatar}
              >
                Remove Photo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className={styles.section}>
        <h2>Security</h2>

        <div className={styles.card}>
          <p>Password management will be available soon.</p>

          <button className={styles.disabledButton} disabled>
            Coming Soon
          </button>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className={styles.section}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/profile")}
        >
          ← Back to Profile
        </button>
      </section>
    </main>
  );
}