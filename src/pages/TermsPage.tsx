import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TermsPage.module.css";

/**
 * TERMS PAGE v3
 * Contract acknowledgment.
 * Tier-aware routing.
 * Demo-safe.
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

/**
 * DEMO MODE
 * Set to false when payments & backend are live.
 */
const DEMO_MODE = true;

export default function TermsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as TermsState | null;

  const tier = state?.tier;
  const country = state?.country;
  const pricing = state?.pricing;

  // SAFETY: must arrive with context
  useEffect(() => {
    if (!tier || !country) {
      navigate("/welcome", { replace: true });
    }
  }, [tier, country, navigate]);

  const acceptTerms = () => {
    const acceptedAt = new Date().toISOString();

    // FREEMIUM: immediate access, no backend, no payment
    if (tier === "freemium") {
      navigate("/home-free", {
        replace: true,
        state: { acceptedAt },
      });
      return;
    }

    // PAID TIERS: demo-safe handling
    if (tier === "premium") {
      navigate(
        DEMO_MODE ? "/access-pending" : "/home",
        {
          replace: true,
          state: { tier, country, pricing, acceptedAt },
        }
      );
      return;
    }

    if (tier === "super") {
      navigate(
        DEMO_MODE ? "/access-pending" : "/home-super",
        {
          replace: true,
          state: { tier, country, pricing, acceptedAt },
        }
      );
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
              : "Super Premium"}{" "}
            member
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

        <div className={styles.block}>
          <h2>Content & Availability</h2>
          <ul>
            <li>Content availability may vary by region and rights.</li>
            <li>
              Advertising, where applicable, is served based on your selected
              country.
            </li>
            <li>
              Pricing and advertising for “Other (Global)” users are served on a
              global basis.
            </li>
          </ul>
        </div>

        <div className={styles.block}>
          <h2>General</h2>
          <ul>
            <li>
              Access is personal and non-transferable except where explicitly
              stated.
            </li>
            <li>
              Abuse, redistribution, or circumvention of access controls may
              result in termination.
            </li>
            <li>
              These terms form a binding agreement between you and Rugby Anthem
              Zone.
            </li>
          </ul>
        </div>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={acceptTerms}
        >
          Accept Terms & Continue
        </button>

        <p className={styles.notice}>
          By continuing, you confirm that you understand and accept the terms
          above.
        </p>
      </footer>
    </section>
  );
}
