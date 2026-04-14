import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TermsPage.module.css";
import { getToken } from "../services/auth";

type TermsState = {
  tier?: "freemium" | "premium" | "super";
  country?: string;
};

export default function TermsPage() {
  console.log("🔥 TERMS PAGE CLEAN");

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as TermsState | null;

  const tier = state?.tier;
  const country = state?.country;

  const [loading, setLoading] = useState(false);

  // ================= SAFETY GUARD =================
  useEffect(() => {
    if (!tier) {
      navigate("/welcome", { replace: true });
    }
  }, [tier, navigate]);

  // ================= ACCEPT TERMS =================
  const acceptTerms = async () => {
    console.log("🔥 ACCEPT TERMS CLICKED");

    // ✅ Freemium flow
    if (tier === "freemium") {
      console.log("➡️ FREEMIUM FLOW");
      navigate("/home-free", { replace: true });
      return;
    }

    const token = getToken();

    console.log("🔐 TOKEN:", token);

    if (!token) {
      console.log("❌ NO TOKEN");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      console.log("🚀 CALLING /api/payments");

      const response = await fetch(
        "https://rugby-anthem-backend.fly.dev/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tier }),
        }
      );

      console.log("📡 RAW RESPONSE:", response);

      const data = await response.json();

      console.log("📦 RESPONSE DATA:", data);

      if (!response.ok) {
        console.error("❌ RESPONSE NOT OK", data);
        throw new Error("Request failed");
      }

      if (!data.checkoutUrl) {
        console.error("❌ NO checkoutUrl IN RESPONSE", data);
        throw new Error("Missing checkout URL");
      }

      console.log("✅ REDIRECTING TO:", data.checkoutUrl);

      // ✅ THIS MUST HAPPEN
      window.location.href = data.checkoutUrl;

    } catch (err) {
      console.error("💥 CHECKOUT FAILED:", err);
      alert("Checkout failed — check console");
      setLoading(false);
    }
  };

  const isFreemium = tier === "freemium";
  const isPremium = tier === "premium";
  const isSuper = tier === "super";

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Terms & Conditions</h1>

        <p className={styles.context}>
          You are about to access Rugby Anthem Zone as a{" "}
          <strong>
            {isFreemium
              ? "Freemium"
              : isPremium
              ? "Premium"
              : "Super Premium"}
          </strong>

          {country && (
            <>
              {" "}
              from <strong>{country}</strong>
            </>
          )}
          .
        </p>
      </header>

      <section className={styles.content}>
        {(isPremium || isSuper) && (
          <div className={styles.summaryBox}>
            <h2>Subscription Summary</h2>

            <p className={styles.price}>
              {isPremium ? "$2.49 / month" : "$3.49 / month"}
            </p>

            <p className={styles.note}>Billed monthly</p>
          </div>
        )}

        <div className={styles.block}>
          <h2>Access & Billing</h2>

          <ul>
            {isFreemium && (
              <>
                <li>Freemium access is free and permanently limited.</li>
                <li>The experience is ad-supported.</li>
                <li>This is not a trial.</li>
              </>
            )}

            {(isPremium || isSuper) && (
              <>
                <li>Subscription is billed monthly.</li>
                <li>No free trial is offered.</li>
                <li>
                  Cancellation is effective only after a full billing month
                  has elapsed.
                </li>
              </>
            )}
          </ul>
        </div>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={acceptTerms}
          disabled={loading}
        >
          {loading
            ? "Starting secure checkout…"
            : "Accept Terms & Continue"}
        </button>

        <p className={styles.notice}>
          By continuing, you confirm that you understand and accept the
          terms above.
        </p>
      </footer>
    </section>
  );
}