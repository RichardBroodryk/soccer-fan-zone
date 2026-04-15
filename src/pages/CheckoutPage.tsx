import { useEffect, useState } from "react";
import { getUserTier } from "../services/auth";   // We'll use the one from auth.ts

const CheckoutPage = () => {
  const [status, setStatus] = useState("Processing your payment...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const txn = params.get("_ptxn");

    console.log("🔍 CheckoutPage loaded with txn:", txn);

    // Give Paddle webhook time + retry a few times
    const checkAndRedirect = async (attempt = 0) => {
      try {
        const tier = await getUserTier();   // This calls the real backend

        console.log("✅ Fetched real tier from server:", tier);

        if (tier === "super") {
          window.location.href = "/home-super";
        } else if (tier === "premium") {
          window.location.href = "/home";
        } else {
          window.location.href = "/home-free";
        }
      } catch (err) {
        console.error("Tier check failed on attempt", attempt, err);
        if (attempt < 5) {
          setStatus(`Verifying payment... (${attempt + 1}/5)`);
          setTimeout(() => checkAndRedirect(attempt + 1), 1500);
        } else {
          setStatus("Payment completed. Please refresh the page.");
          window.location.href = "/home-free";   // fallback
        }
      }
    };

    // Start checking after a short delay
    setTimeout(() => checkAndRedirect(), 2500);

  }, []);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#0a0a0a",
      color: "white"
    }}>
      <h2>{status}</h2>
      <p>Please wait while we verify your subscription...</p>
    </div>
  );
};

export default CheckoutPage;