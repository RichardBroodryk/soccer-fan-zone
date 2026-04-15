import { useEffect, useState } from "react";
import { getUserTier } from "../services/auth";

const CheckoutPage = () => {
  const [status, setStatus] = useState("Processing your payment...");

  useEffect(() => {
    console.log("🔥 CheckoutPage loaded");

    // Clear any old cached tier data
    localStorage.removeItem("subscriptionTier");
    localStorage.removeItem("raz_tier");

    const checkAndRedirect = async (attempt = 0) => {
      try {
        const tier = await getUserTier();

        console.log("✅ Real tier from server:", tier);

        setStatus(`Subscription upgraded to ${tier || "freemium"}...`);

        // Exact redirect rules you specified
        if (tier === "super") {
          window.location.href = "/home-super";        // Super Premium homepage
        } else if (tier === "premium") {
          window.location.href = "/home";              // Main Premium homepage
        } else {
          window.location.href = "/home-free";         // Freemium homepage
        }

      } catch (err) {
        console.error("Tier check failed on attempt", attempt, err);

        if (attempt < 6) {
          setStatus(`Verifying payment... (${attempt + 1}/6)`);
          setTimeout(() => checkAndRedirect(attempt + 1), 1800);
        } else {
          setStatus("Payment completed. Please refresh the page or log in again.");
          window.location.href = "/home-free";
        }
      }
    };

    // Start checking after short delay to allow webhook to process
    setTimeout(() => checkAndRedirect(), 3000);

  }, []);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#0a0a0a",
      color: "white",
      textAlign: "center",
      padding: "20px"
    }}>
      <h2>{status}</h2>
      <p>Please wait while we verify your subscription and redirect you...</p>
    </div>
  );
};

export default CheckoutPage;