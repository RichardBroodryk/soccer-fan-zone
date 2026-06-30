import { useNavigate } from "react-router-dom";
import styles from "./MembershipPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

import {
  getSubscription,
} from "../services/subscriptionService";

export default function MembershipPage() {
  const navigate = useNavigate();

  const subscription =
    getSubscription();

  const goToSupport = () => {
    navigate("/support");
  };

  const goToPrivacy = () => {
    navigate("/privacy-policy");
  };

  const goToTerms = () => {
    navigate("/terms");
  };

  const goToDeleteAccount = () => {
    navigate("/delete-account");
  };

  const goToRestore = () => {
    navigate("/restore-purchase");
  };

  const goHome = () => {
    navigate("/soccer");
  };

  return (
    <section className={styles.page}>

      {/* ============================================
          HERO
      ============================================ */}

      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className={styles.overlay} />

        <div className={styles.heroContent}>

          <div className={styles.badge}>
            MEMBERSHIP CENTRE
          </div>

          <h1>
            Your Soccer Fan Zone
            Membership
          </h1>

          <p>
            Manage your membership,
            subscription status,
            billing information,
            account security and
            supporter services from
            one central location.
          </p>

        </div>
      </section>

      {/* ============================================
          CONTENT
      ============================================ */}

      <main className={styles.content}>

        {/* ============================================
            MEMBERSHIP SUMMARY
        ============================================ */}

        <section className={styles.card}>

          <h2>
            Membership Summary
          </h2>

          <div className={styles.summaryGrid}>

            <div className={styles.summaryItem}>

              <span className={styles.label}>
                Email Address
              </span>

              <div className={styles.value}>
                {subscription.email ||
                  "Not Available"}
              </div>

            </div>

            <div className={styles.summaryItem}>

              <span className={styles.label}>
                Membership Status
              </span>

              <div className={styles.status}>
                {subscription.status}
              </div>

            </div>

            <div className={styles.summaryItem}>

              <span className={styles.label}>
                Activated
              </span>

              <div className={styles.value}>
                {subscription.activatedAt
                  ? new Date(
                      subscription.activatedAt
                    ).toLocaleDateString()
                  : "Pending"}
              </div>

            </div>

            <div className={styles.summaryItem}>

              <span className={styles.label}>
                Next Renewal
              </span>

              <div className={styles.value}>
                {subscription.nextRenewal ||
                  "Not Available"}
              </div>

            </div>

          </div>

        </section>

        {/* ============================================
            MEMBERSHIP MANAGEMENT
        ============================================ */}

        <section className={styles.card}>

          <h2>
            Membership Management
          </h2>

          <p className={styles.subtitle}>
            These tools will become available
            once secure membership services
            are connected.
          </p>

          <div className={styles.managementGrid}>

            <div className={styles.managementCard}>

              <h3>
                Manage Membership
              </h3>

              <p>
                View your subscription,
                renewal information and
                billing preferences.
              </p>

              <button
                disabled
                className={styles.disabledButton}
              >
                Coming Soon
              </button>

            </div>

            <div className={styles.managementCard}>

              <h3>
                Payment Method
              </h3>

              <p>
                Update your payment method
                securely through our payment
                provider portal.
              </p>

              <button
                disabled
                className={styles.disabledButton}
              >
                Coming Soon
              </button>

            </div>

            <div className={styles.managementCard}>

              <h3>
                Billing History
              </h3>

              <p>
                View invoices,
                payment history and
                renewal records.
              </p>

              <button
                disabled
                className={styles.disabledButton}
              >
                Coming Soon
              </button>

            </div>

          </div>

        </section>
               {/* ============================================
            SECURITY
        ============================================ */}

        <section className={styles.card}>

          <h2>
            Account Security
          </h2>

          <p className={styles.subtitle}>
            Your Soccer Fan Zone account is protected
            using secure authentication and encrypted
            platform services.
          </p>

          <div className={styles.securityGrid}>

            <div className={styles.securityCard}>

              <div className={styles.securityIcon}>
                🔒
              </div>

              <h3>
                Secure Login
              </h3>

              <p>
                Your account is protected through
                secure authentication and encrypted
                login services.
              </p>

            </div>

            <div className={styles.securityCard}>

              <div className={styles.securityIcon}>
                🛡
              </div>

              <h3>
                Membership Protection
              </h3>

              <p>
                Membership activation and renewal
                are verified securely before access
                is granted to Soccer Fan Zone.
              </p>

            </div>

            <div className={styles.securityCard}>

              <div className={styles.securityIcon}>
                ⚙
              </div>

              <h3>
                Platform Updates
              </h3>

              <p>
                New membership features will
                automatically appear here as the
                platform evolves.
              </p>

            </div>

          </div>

        </section>

        {/* ============================================
            SUPPORT
        ============================================ */}

        <section className={styles.card}>

          <h2>
            Support & Resources
          </h2>

          <p className={styles.subtitle}>
            Need assistance with your account,
            membership or platform access?
          </p>

          <div className={styles.supportGrid}>

            <div className={styles.supportCard}>

              <h3>
                Restore Membership
              </h3>

              <p>
                Recover your membership using the
                email address associated with your
                Soccer Fan Zone account.
              </p>

              <button
                className={styles.primaryButton}
                onClick={goToRestore}
              >
                Restore Membership
              </button>

            </div>

            <div className={styles.supportCard}>

              <h3>
                Contact Support
              </h3>

              <p>
                Our support team can assist with
                account, membership, billing and
                technical platform questions.
              </p>

              <button
                className={styles.primaryButton}
                onClick={goToSupport}
              >
                Contact Support
              </button>

            </div>

          </div>

        </section>

        {/* ============================================
            QUICK LINKS
        ============================================ */}

        <section className={styles.card}>

          <h2>
            Legal & Information
          </h2>

          <div className={styles.linksGrid}>

            <button
              className={styles.secondaryButton}
              onClick={goToPrivacy}
            >
              Privacy Policy
            </button>

            <button
              className={styles.secondaryButton}
              onClick={goToTerms}
            >
              Terms of Service
            </button>

            <button
              className={styles.secondaryButton}
              onClick={goHome}
            >
              Return To Soccer Home
            </button>

          </div>

        </section>

        {/* ============================================
            DANGER ZONE
        ============================================ */}

        <section className={styles.dangerCard}>

          <h2>
            Danger Zone
          </h2>

          <p>
            Deleting your account permanently removes
            your Soccer Fan Zone account and may affect
            future membership recovery.
          </p>

          <button
            className={styles.dangerButton}
            onClick={goToDeleteAccount}
          >
            Delete Account
          </button>

        </section>
                 {/* ============================================
            MEMBERSHIP ROADMAP
        ============================================ */}

        <section className={styles.card}>

          <h2>
            Coming Soon
          </h2>

          <p className={styles.subtitle}>
            Soccer Fan Zone continues to evolve.
            These membership enhancements are
            planned for future platform updates.
          </p>

          <div className={styles.roadmapGrid}>

            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                💳
              </div>

              <h3>
                Membership Portal
              </h3>

              <p>
                Manage your subscription,
                payment method and renewal
                directly from this page.
              </p>
            </div>

            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                📄
              </div>

              <h3>
                Billing History
              </h3>

              <p>
                View invoices,
                payment confirmations
                and previous renewals.
              </p>
            </div>

            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                🔔
              </div>

              <h3>
                Renewal Reminders
              </h3>

              <p>
                Receive advance reminders
                before your membership
                renews.
              </p>
            </div>

            <div className={styles.roadmapItem}>
              <div className={styles.roadmapIcon}>
                🌍
              </div>

              <h3>
                World Cup Rewards
              </h3>

              <p>
                Exclusive membership
                benefits and supporter
                experiences during
                FIFA World Cup 2026.
              </p>
            </div>

          </div>

        </section>

        {/* ============================================
            RETURN HOME
        ============================================ */}

        <section className={styles.ctaSection}>

          <button
            className={styles.homeButton}
            onClick={goHome}
          >
            Return To Soccer Home
          </button>

        </section>

        {/* ============================================
            FOOTER
        ============================================ */}

        <footer className={styles.footer}>

          <p>
            Soccer Fan Zone Membership
          </p>

          <p>
            Manage your account,
            membership and supporter
            services from one secure
            location.
          </p>

          <p>
            International Soccer Fans Zone
            is an independent football
            platform and is not affiliated
            with FIFA, UEFA, CAF,
            CONMEBOL, CONCACAF,
            AFC, OFC or tournament
            organisers.
          </p>

        </footer>

      </main>

    </section>

  );

}