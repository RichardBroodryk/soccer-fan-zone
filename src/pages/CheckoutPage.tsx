import { useEffect } from "react";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {

  useEffect(() => {

    // =====================================================
    // 🔴 VERIFY PAYMENT ON RETURN (_ptxn)
    // =====================================================

    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("_ptxn");

    if (transactionId) {
      (async () => {
        try {
          console.log("🔍 Verifying txn:", transactionId);

          const token = localStorage.getItem("raz_token");

          if (!token) {
            console.error("❌ No auth token found");
            return;
          }

          const res = await fetch(
            "https://rugby-anthem-backend.fly.dev/api/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
              },
              body: JSON.stringify({ txn: transactionId }),
            }
          );

          const data = await res.json();

          console.log("✅ Verify result:", data);

          if (data.success) {
            console.log("🚀 Redirecting user based on tier:", data.tier);

            if (data.tier === "super") {
              window.location.href = "/home-super";
            } else if (data.tier === "premium") {
              window.location.href = "/home";
            } else {
              window.location.href = "/home-free";
            }
          } else {
            console.error("❌ Verification failed:", data);
          }

        } catch (err) {
          console.error("❌ Verify error:", err);
        }
      })();
    }

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
      <h2>Preparing secure checkout...</h2>
      <p>Loading Rugby Anthem Zone subscription.</p>
    </div>
  );
};

export default CheckoutPage;