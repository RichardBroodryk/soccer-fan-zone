import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./TermsPage.module.css";
import { getToken } from "../services/auth";
import { API_BASE_URL } from "../config/api";

/*
TERMS PAGE — CHECKOUT BRIDGE

Handles two flows:

1️⃣ User reads terms and starts checkout
2️⃣ User is redirected back with ?_ptxn=transactionId
   and Paddle checkout launches automatically
*/

declare global {
  interface Window {
    Paddle: any;
  }
}

type TermsState = {
  tier?: "freemium" | "premium" | "super";
  country?: string;
};

export default function TermsPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const state = location.state as TermsState | null;

  const tier = state?.tier;
  const country = state?.country;
 

  const [loading, setLoading] = useState(false);

  // Paddle transaction id from redirect
  const transactionId = searchParams.get("_ptxn");



  // ---------------------------------------------------
  // LOAD PADDLE CHECKOUT IF TRANSACTION EXISTS
  // ---------------------------------------------------

  useEffect(() => {

    if (!transactionId) return;

    const loadPaddleCheckout = () => {

      const openCheckout = () => {

        window.Paddle.Initialize({
  environment: "production",
  token: process.env.REACT_APP_PADDLE_CLIENT_TOKEN,
  eventCallback: function(data:any){
    console.log("Paddle Event:", data);
  }
});

        window.Paddle.Checkout.open({
  transactionId: transactionId,
  settings: {
    displayMode: "overlay",
    theme: "light",
    locale: "en"
  }
});

      };

      if (!window.Paddle) {

        const script = document.createElement("script");
        script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
        script.onload = openCheckout;

        document.body.appendChild(script);

      } else {

        openCheckout();

      }

    };

    loadPaddleCheckout();

  }, [transactionId]);



  // ---------------------------------------------------
  // SAFETY GUARD
  // ---------------------------------------------------

  useEffect(() => {

    if (transactionId) return;

    if (!tier || !country) {
      navigate("/welcome", { replace: true });
    }

  }, [tier, country, navigate, transactionId]);



  // ---------------------------------------------------
  // ACCEPT TERMS
  // ---------------------------------------------------

  const acceptTerms = async () => {

    const acceptedAt = new Date().toISOString();

    if (tier === "freemium") {

      navigate("/home-free", {
        replace: true,
        state: { acceptedAt }
      });

      return;
    }

    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/api/payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            provider: "paddle",
            tier
          })
        }
      );

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {

        console.error("Checkout creation failed:", data);

        alert("Unable to start payment. Please try again.");

        setLoading(false);

        return;
      }

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

        {(isPremium || isSuper) && (
  <div className={styles.summaryBox}>
    <h2>Subscription Summary</h2>

    <p className={styles.price}>
      {isPremium ? "$2.49 / month" : "$3.49 / month"}
    </p>

    <p className={styles.note}>
      Billed monthly
    </p>
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