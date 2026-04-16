import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, getToken, getUserTier } from "../services/auth"; // ✅ FIXED IMPORT
import { apiRequest } from "../services/api";
import styles from "./FreemiumSignupPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectState = location.state as
    | {
        redirectAfterLogin?: string;
        tier?: "premium" | "super";
      }
    | null;

  const checkoutIntent =
    redirectState?.redirectAfterLogin === "checkout";

  const checkoutTier = redirectState?.tier;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /\S+@\S+\.\S+/.test(email);

  // ✅ CLEAN LOGIN HANDLER (FINAL FIXED)
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setInfo("");

    try {
      await loginUser(email, password);
      const token = getToken();

      // 🔥 FORCE FRESH TIER (CRITICAL FIX)
      const freshTier = await getUserTier();

   // 🚨 HARD GUARD: ONLY ALLOW CHECKOUT AFTER CONFIRMED LOGIN + FREEMIUM
if (checkoutIntent && checkoutTier) {
  if (freshTier !== "freemium") {
    console.log("🚫 BLOCKED CHECKOUT — user already paid:", freshTier);
  } else if (token) {
    const data = await apiRequest(
      "/api/payments",
      "POST",
      { tier: checkoutTier },
      token
    );

    if (!data.checkoutUrl) {
      setError("Unable to start payment.");
      return;
    }

    window.location.href = data.checkoutUrl;
    return;
  }
}

if (window.history.state && window.history.state.usr) {
  window.history.replaceState({}, document.title);
}

// ===============================
// 🧭 NORMAL LOGIN ROUTING
// ===============================
if (freshTier === "super") {
  navigate("/home-super");
} else if (freshTier === "premium") {
  navigate("/home");
} else {
  navigate("/home-free");
}

    } catch (err) {
      const message =
        err instanceof Error ? err.message : "";

      if (message.toLowerCase().includes("password")) {
        setError("Incorrect password");
      } else if (message.toLowerCase().includes("user")) {
        setError("Email not found");
      } else {
        setError("Login failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  // 🔁 FORGOT PASSWORD (PLACEHOLDER)
  const handleForgotPassword = () => {
    if (!email) {
      setError("Enter your email first.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email.");
      return;
    }

    setError("");
    setInfo("Password reset link will be available soon.");
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
          {/* EMAIL */}
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.select}
            value={email}
            onChange={(e) =>
              setEmail(e.target.value.toLowerCase())
            }
            placeholder="you@example.com"
          />

          {/* PASSWORD */}
          <label className={styles.label}>Password</label>
          <div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    className={styles.select}
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
      setError(""); // ✅ CLEAR ERROR ON TYPE
    }}
    placeholder="Enter password"
    style={{ paddingRight: "40px" }}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "14px",
      opacity: 0.7,
      userSelect: "none",
    }}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>

          {/* FORGOT PASSWORD */}
          <p
            onClick={handleForgotPassword}
            style={{
              marginTop: "8px",
              fontSize: "12px",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Forgot password?
          </p>

          {/* ERROR */}
          {error && (
            <p className={styles.error}>{error}</p>
          )}

          {/* INFO */}
          {info && (
            <p style={{ color: "#4caf50", fontSize: "12px" }}>
              {info}
            </p>
          )}
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