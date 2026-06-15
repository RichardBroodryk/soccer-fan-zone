import styles from "./RefundPolicyPage.module.css";
import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function RefundPolicyPage() {
  return (
    <section className={styles.page}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <h1>Refund Policy</h1>
          <p>International Soccer Fans Zone</p>
        </div>
      </section>

      <main className={styles.content}>
        <div className={styles.card}>
          <h2>Digital Access Purchase Policy</h2>
          
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>

          <h3>1. No Refunds for Digital Access</h3>
          <p>
            All purchases of digital access to the International Soccer Fans Zone 
            platform are <strong>final and non-refundable</strong>. Due to the 
            immediate nature of digital content delivery, we do not offer refunds 
            on one-time access purchases.
          </p>

          <h3>2. Account Deletion</h3>
          <p>
            If you delete your account, you will lose access to the platform. 
            <strong>No refunds will be issued</strong> for account deletion after purchase.
          </p>

          <h3>3. Technical Issues</h3>
          <p>
            If you experience technical issues preventing platform access, contact us at 
            <strong> support@soccerfanzone.com</strong> within 7 days of purchase. 
            We will make reasonable efforts to resolve the issue.
          </p>

          <h3>4. Legal Rights</h3>
          <p>
            This policy does not affect your statutory rights under applicable consumer laws.
            Where refunds are required by law, we will comply.
          </p>

          <h3>5. Contact Us</h3>
          <p>
            For any questions about this policy: <strong>support@soccerfanzone.com</strong>
          </p>
        </div>
      </main>
    </section>
  );
}