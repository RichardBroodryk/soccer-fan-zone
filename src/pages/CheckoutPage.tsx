import { useEffect, useState } from "react";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {
  const [status, setStatus] = useState("Loading secure checkout...");

  useEffect(() => {
    console.log("🔥 CheckoutPage loaded - Initializing Paddle");

    // Load Paddle script
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (window.Paddle) {
        console.log("✅ Paddle script loaded successfully");

        window.Paddle.Initialize({
          token: "live_1315bcf84802de1b59fc1bd1da5", // Your live client token
          eventCallback: (event: any) => {
            console.log("📦 Paddle event:", event.name);

            if (event.name === "checkout.completed") {
              console.log("🎉 Checkout completed successfully");

              setStatus("Payment successful! Redirecting to your homepage...");

              // Small delay to let Paddle finish processing
              setTimeout(async () => {
                try {
                  // Try to get the real tier from the server
                  const token = localStorage.getItem("raz_token");
                  const res = await fetch(
                    "https://rugby-anthem-backend.fly.dev/api/subscription",
                    {
                      headers: token ? { Authorization: `Bearer ${token}` } : {},
                    }
                  );

                  if (res.ok) {
                    const data = await res.json();
                    const tier = data.tier;

                    console.log("✅ Real tier from server:", tier);

                    if (tier === "super") {
                      window.location.href = "/home-super";
                    } else if (tier === "premium") {
                      window.location.href = "/home";
                    } else {
                      window.location.href = "/home-free";
                    }
                  } else {
                    // Fallback
                    window.location.href = "/home";
                  }
                } catch (err) {
                  console.error("Redirect failed, using fallback");
                  window.location.href = "/home";
                }
              }, 2000);
            }
          },
        });

        setStatus("Opening secure checkout...");
      } else {
        console.error("❌ Paddle failed to load");
        setStatus("Failed to load checkout. Please refresh the page.");
      }
    };

    script.onerror = () => {
      console.error("❌ Failed to load Paddle script");
      setStatus("Network error loading checkout. Please refresh.");
    };

  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0a0a0a",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2>{status}</h2>
      <p>Please wait while we open the secure payment page...</p>
      <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "20px" }}>
        You will be redirected automatically after payment.
      </p>
    </div>
  );
};

export default CheckoutPage;