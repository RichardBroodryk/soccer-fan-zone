import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, getUserTier } from "../services/auth";
import styles from "./FreemiumSignupPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectState = location.state as
    | {
        redirectAfterLogin?: string;
        tier?: "premium" | "super";
        country?: string;
        pricing?: any;
      }
    | null;

  const checkoutIntent =
    redirectState?.redirectAfterLogin === "checkout";

  const checkoutTier = redirectState?.tier;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 🔐 LOGIN FIRST
      await loginUser(email, password);

      const token = localStorage.getItem("token");

      // =====================================================
      // 💳 CHECKOUT INTENT PATH (CRITICAL FIX)
      // =====================================================
      if (checkoutIntent && checkoutTier && token) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payments/create-checkout`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ tier: checkoutTier }),
            }
          );

          const data = await res.json();

          if (!res.ok || !data.checkoutUrl) {
            console.error("Checkout creation failed:", data);
            setError("Unable to start payment. Please try again.");
            setLoading(false);
            return;
          }

          // 🚀 SEND USER TO PADDLE
          window.location.href = data.checkoutUrl;
          return;
        } catch (err) {
          console.error("Checkout error:", err);
          setError("Payment service unavailable.");
          setLoading(false);
          return;
        }
      }

      // =====================================================
      // 🧭 NORMAL LOGIN ROUTING (UNCHANGED)
      // =====================================================
      const tier = await getUserTier();

      if (tier === "super") {
        navigate("/home-super");
      } else if (tier === "premium") {
        navigate("/home");
      } else {
        navigate("/home-free");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Login</h1>
        <p className={styles.subtitle}>
          Sign in to access your Rugby Anthem Zone account.
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.block}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.select}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.select}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          {error && <p className={styles.error}>{error}</p>}
        </div>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </footer>
    </section>
  );
}