import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./WhatYouGetPage.module.css";

/**
 * WHAT YOU GET — FINAL (PHASE 3)
 * Clarity only. No pricing. No selling.
 */

type Tier = "freemium" | "premium" | "super";

type FlowState = {
  country?: string;
};

export default function WhatYouGetPage() {
  const { tier } = useParams<{ tier: Tier }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as FlowState | null;

  const country = state?.country;

  const isValidTier =
    tier === "freemium" || tier === "premium" || tier === "super";

  // Guard safety — never render a blank screen
  if (!isValidTier) {
    navigate("/welcome", { replace: true });
    return null;
  }

  const continuePath =
    tier === "freemium"
      ? "/signup/free"
      : tier === "premium"
      ? "/signup/premium"
      : "/signup/super";

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>What You Get</h1>
        <p className={styles.subtitle}>
          A clear overview of what is included with your selected access level.
        </p>
      </header>

      <div className={styles.tierLabel}>
        Viewing: <strong>{formatTier(tier)}</strong>
      </div>

      <section className={styles.content}>
        {tier === "freemium" && <FreemiumContent />}
        {tier === "premium" && <PremiumContent />}
        {tier === "super" && <SuperContent />}
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={() =>
            navigate(continuePath, {
              state: {
                tier,
                country,
              },
            })
          }
        >
          Continue
        </button>

        <button
          className={styles.backLink}
          onClick={() => navigate("/welcome")}
        >
          Back to Welcome
        </button>
      </footer>
    </section>
  );
}

/* ================= FREEMIUM ================= */

function FreemiumContent() {
  return (
    <>
      <Section title="Included Access">
        <Item
          title="Anthems"
          description="Cultural entry into the game through national anthems and ceremony."
        />
        <Item
          title="Tournaments"
          description="Visibility into men’s and women’s international tournaments."
        />
        <Item
          title="Calendar"
          description="Basic access to the global rugby calendar."
        />
      </Section>

      <Note>
        Additional sections and deeper access are available on paid tiers.
      </Note>
    </>
  );
}

/* ================= PREMIUM ================= */

function PremiumContent() {
  return (
    <>
      <Section title="Included Access">
        <Item title="Anthems" description="Full sing-along anthem experience designed for stadium and matchday atmosphere." />
        <Item title="Tournaments" description="Men’s and women’s competitions with access to all games and stadiums." />
        <Item title="Notifications" description="Opt-in alerts for matches, tournaments, and key rugby moments." />
        <Item title="Match Centre" description="Live scores, fixtures, results, and statistical coverage." />
        <Item title="Matchday Journeys" description="Match planning tools including tickets, flights, hotels, and local transport." />
        <Item title="The Rugby Studio" description="Classic tests, match highlights, podcasts, greatest hits, and fan commentary." />
        <Item title="Fanzone" description="Loyalty card program, live match audio, pay-per-view access, and personal team tracking." />
        <Item title="News" description="Breaking stories, transfers, injuries, interviews, press, and rumours." />
        <Item title="Inside the Game" description="Referees, laws, and fantasy league participation." />
        <Item title="Global Calendar" description="Worldwide fixtures, tournaments, and key rugby dates." />
        <Item title="Stadiums" description="Stadium access linked to matches and tournaments." />
        <Item title="Merchandise" description="Official team and rugby merchandise." />
      </Section>

      <Section title="Boundaries">
        <Boundary label="Heritage" value="Not included" />
        <Boundary label="Defining Moments" value="Not included" />
        <Boundary label="Advertising" value="Yes (reduced and contextual)" />
      </Section>
    </>
  );
}

/* ================= SUPER ================= */

function SuperContent() {
  return (
    <>
      <Section title="Included Access">
        <Item title="All Premium Sections" description="Complete access to all matchday, media, planning, and supporter systems." />
        <Item title="Heritage" description="Legends, squads, champions, coaches and support staff, officials, and match governance." />
        <Item title="Defining Moments" description="World Cup turning points, tactical shifts, law changes, calls and decisions, era-defining rivalries, and cultural moments." />
        <Item title="Advertising" description="No advertising across the platform." />
      </Section>
    </>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.list}>{children}</div>
    </section>
  );
}

function Item({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.item}>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

function Boundary({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.boundary}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className={styles.note}>{children}</p>;
}

function formatTier(tier: Tier) {
  if (tier === "freemium") return "Freemium";
  if (tier === "premium") return "Premium";
  return "Super Premium";
}
