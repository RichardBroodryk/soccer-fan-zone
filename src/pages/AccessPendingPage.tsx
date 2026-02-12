import { useLocation, useNavigate } from "react-router-dom";

type PendingState = {
  tier?: "premium" | "super";
  country?: string;
  pricing?: {
    label: string;
    amount: string;
    currencyNote?: string;
  };
  acceptedAt?: string;
};

export default function AccessPendingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PendingState | null;

  const tier = state?.tier;
  const pricing = state?.pricing;

  return (
    <section style={{ padding: "3rem", maxWidth: "720px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>
          {tier === "super" ? "Super Premium" : "Premium"} Access Pending
        </h1>
        <p>
          Your access level has been selected and confirmed.
        </p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <p>
          Payment and subscription activation are currently being finalised.
          Once live, your access will unlock immediately.
        </p>

        {pricing && (
          <div style={{ marginTop: "1rem" }}>
            <p><strong>Selected plan:</strong> {pricing.label}</p>
            {pricing.currencyNote && (
              <p>{pricing.currencyNote}</p>
            )}
          </div>
        )}

        <p style={{ marginTop: "1.5rem" }}>
          No action is required from you right now.
        </p>
      </section>

      <footer>
        <button onClick={() => navigate("/welcome")}>
          Return to Welcome
        </button>
      </footer>
    </section>
  );
}
