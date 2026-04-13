import { useEffect } from "react";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {

  useEffect(() => {

    // =====================================================
    // 🔥 AFTER RETURN → CHECK SUBSCRIPTION (WEBHOOK-BASED FLOW)
    // =====================================================

    (async () => {
      try {
        console.log("🔍 Checking subscription after checkout");

        const token = localStorage.getItem("raz_token");

        if (!token) {
          console.error("❌ No auth token found");
          return;
        }

        const res = await fetch(
          "https://rugby-anthem-backend.fly.dev/api/subscription",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await res.json();

        console.log("✅ Subscription status:", data);

        if (data.tier === "super") {
          window.location.href = "/home-super";
        } else if (data.tier === "premium") {
          window.location.href = "/home";
        } else {
          window.location.href = "/home-free";
        }

      } catch (err) {
        console.error("❌ Subscription check failed:", err);
      }
    })();

    // =====================================================
    // 🟡 LOAD PADDLE (SAFE — NO REOPEN)
    // =====================================================

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (window.Paddle) {
        window.Paddle.Initialize({
          token: "live_1315bcf84802de1b59fc1bd1da5",
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };

  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Finalizing your subscription...</h2>
      <p>Please wait while we confirm your access.</p>
    </div>
  );
};

export default CheckoutPage;