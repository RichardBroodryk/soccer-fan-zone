import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TermsPage.module.css";
import { getToken } from "../services/auth";

/**
 * TERMS PAGE — CHECKOUT CONNECTED (HARDENED)
 * Freemium: immediate access
 * Premium/Super: create checkout if logged in
 */

type Pricing = {
  label: string;
  amount: string;
  currencyNote?: string;
};

type TermsState = {
  tier?: "freemium" | "premium" | "super";
  country?: string;
  pricing?: Pricing;
};

export default function TermsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as TermsState | null;

  const tier = state?.tier;
  const country = state?.country;
  const pricing = state?.pricing;

  const [loading, setLoading] = useState(false);

  // ✅ Safe API base (prevents undefined forever)
  const API_BASE =
    process.env.REACT_APP_API_URL || "http://localhost:4000";

  // Safety guard
  useEffect(() => {
    if (!tier || !country) {
      navigate("/welcome", { replace: true });
    }
  }, [tier, country, navigate]);

  const acceptTerms = async () => {
    const acceptedAt = new Date().toISOString();

    // ✅ FREEMIUM — immediate access
    if (tier === "freemium") {
      navigate("/home-free", {
        replace: true,
        state: { acceptedAt },
      });
      return;
    }

    // 🔐 Check auth
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    // 💳 Create Paddle checkout
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/payments/create-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tier }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        console.error("Checkout creation failed:", data);
        alert("Unable to start payment. Please try again.");
        setLoading(false);
        return;
      }

      // 🚀 Redirect to Paddle
      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Payment service unavailable. Please try again.");
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
        {(isPremium || isSuper) && pricing && (
          <div className={styles.summaryBox}>
            <h2>Subscription Summary</h2>
            <p className={styles.price}>{pricing.label}</p>
            {pricing.currencyNote && (
              <p className={styles.note}>{pricing.currencyNote}</p>
            )}
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
                  Cancellation is effective only after a full billing month has
                  elapsed.
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
          By continuing, you confirm that you understand and accept the terms
          above.
        </p>
      </footer>
    </section>
  );
}