import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [status, setStatus] = useState("Preparing secure checkout...");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("⚽ CheckoutPage loaded - Initializing checkout");

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

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Unable to create checkout."
          );
        }

        if (!data.checkoutUrl) {
          throw new Error(
            "Checkout URL missing."
          );
        }

        setStatus(
          "Redirecting to secure checkout..."
        );

        window.location.href =
          data.checkoutUrl;

      } catch (err: any) {
        console.error("Checkout error:", err);
        setStatus(err.message || "Failed to initialize checkout");
        setTimeout(() => navigate("/account-setup"), 3000);
      }
    };

    createCheckoutSession();
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
        <p>Please wait while we connect you to our secure payment provider.</p>
        <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "20px" }}>
          You will be redirected automatically to complete your secure membership activation.
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