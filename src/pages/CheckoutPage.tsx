import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {
  const [status, setStatus] = useState("Loading secure checkout...");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("⚽ CheckoutPage loaded - Initializing Paddle");

    // Get user info
    const email = localStorage.getItem("sfz_user_email") || "";
    const userId = localStorage.getItem("sfz_user_id") || "";
    const token = localStorage.getItem("sfz_token");

    if (!token) {
      setStatus("Authentication error. Redirecting...");
      setTimeout(() => navigate("/account-setup"), 2000);
      return;
    }

    // Create checkout session on backend first
    const createCheckoutSession = async () => {
      try {
        const response = await fetch(
          "https://soccer-fan-zone-backend.fly.dev/api/payments/create-checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.checkoutUrl) {
          throw new Error(data.error || "Failed to create checkout");
        }

        console.log("✅ Checkout session created:", data.checkoutUrl);

        // Now load Paddle.js
        const script = document.createElement("script");
        script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (!window.Paddle) {
            console.error("❌ Paddle failed to load");
            setStatus("Failed to initialize checkout. Please refresh.");
            return;
          }

          console.log("✅ Paddle script loaded");

          // Initialize Paddle with your vendor ID (replace with YOUR vendor token)
          window.Paddle.Initialize({
            token: "live_631169e22b4d7e6c0baa85a1772", // Get this from Paddle dashboard
            eventCallback: (event: any) => {
              console.log("📦 Paddle event:", event.name);

              if (event.name === "checkout.completed") {
                console.log("🎉 Purchase completed!");

                // Check if tier updated
                const checkTier = async () => {
                  for (let i = 0; i < 6; i++) {
                    try {
                      const res = await fetch(
                        "https://soccer-fan-zone-backend.fly.dev/api/subscription",
                        {
                          headers: token
                            ? { Authorization: `Bearer ${token}` }
                            : {},
                        }
                      );

                      if (res.ok) {
                        const data = await res.json();
                        console.log(`Tier check attempt ${i}:`, data.tier);

                        if (data.tier === "premium" || data.tier === "freemium") {
                          window.location.href = "/purchase-success";
                          return;
                        }
                      }
                    } catch (err) {
                      console.error("Retry error:", err);
                    }
                    await new Promise((res) => setTimeout(res, 1000));
                  }
                  window.location.href = "/purchase-success";
                };

                checkTier();
              }
            },
          });

          // Open the checkout with the URL from backend
          window.Paddle.Checkout.open({
            transactionId: data.transactionId,
          });

          setStatus("Opening secure checkout...");
        };

        script.onerror = () => {
          console.error("❌ Failed to load Paddle script");
          setStatus("Network error loading checkout. Please refresh.");
        };
      } catch (err: any) {
        console.error("Checkout error:", err);
        setStatus(err.message || "Failed to initialize checkout");
        setTimeout(() => navigate("/account-setup"), 3000);
      }
    };

    createCheckoutSession();

    return () => {
      // Cleanup script if component unmounts
      const scripts = document.querySelectorAll('script[src*="paddle"]');
      scripts.forEach((script) => script.remove());
    };
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "white",
      }}
    >
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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

      {/* Footer with Legal Links */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid #222",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/terms"
            style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4CAF50")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            Terms of Service
          </a>
          <a
            href="/privacy-policy"
            style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4CAF50")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            Privacy Policy
          </a>
          <a
            href="/refund-policy"
            style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4CAF50")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            Refund Policy
          </a>
        </div>
        <p style={{ color: "#666", fontSize: "0.75rem", margin: 0 }}>
          International Soccer Fans Zone - Independent Football Platform
        </p>
      </footer>
    </div>
  );
};

export default CheckoutPage;