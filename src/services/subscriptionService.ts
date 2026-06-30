// ==========================================================
// Soccer Fan Zone
// Subscription Service
// Provider Independent
// ==========================================================

export type SubscriptionStatus =
  | "UNKNOWN"
  | "PENDING"
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED";

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  email: string | null;
  userId: string | null;
  activatedAt?: string;
  expiresAt?: string;
  nextRenewal?: string;
}

// ==========================================================
// LOCAL STORAGE KEYS
// ==========================================================

const STATUS_KEY = "sfz_subscription_status";
const EMAIL_KEY = "sfz_user_email";
const USER_KEY = "sfz_user_id";

// ==========================================================
// GET CURRENT SUBSCRIPTION
// ==========================================================

export function getSubscription(): SubscriptionInfo {
  return {
    status:
      (localStorage.getItem(
        STATUS_KEY
      ) as SubscriptionStatus) ||
      "PENDING",

    email:
      localStorage.getItem(
        EMAIL_KEY
      ),

    userId:
      localStorage.getItem(
        USER_KEY
      ),

    activatedAt:
      localStorage.getItem(
        "sfz_subscription_activated"
      ) || undefined,

    expiresAt:
      localStorage.getItem(
        "sfz_subscription_expires"
      ) || undefined,

    nextRenewal:
      localStorage.getItem(
        "sfz_subscription_renewal"
      ) || undefined,
  };
}

// ==========================================================
// SET STATUS
// ==========================================================

export function setSubscriptionStatus(
  status: SubscriptionStatus
) {
  localStorage.setItem(
    STATUS_KEY,
    status
  );
}

// ==========================================================
// ACTIVATE MEMBERSHIP
// ==========================================================

export function activateSubscription(
  renewalDate?: string
) {
  localStorage.setItem(
    STATUS_KEY,
    "ACTIVE"
  );

  localStorage.setItem(
    "sfz_subscription_activated",
    new Date().toISOString()
  );

  if (renewalDate) {
    localStorage.setItem(
      "sfz_subscription_renewal",
      renewalDate
    );
  }
}

// ==========================================================
// EXPIRE MEMBERSHIP
// ==========================================================

export function expireSubscription() {
  localStorage.setItem(
    STATUS_KEY,
    "EXPIRED"
  );
}

// ==========================================================
// CANCEL AUTO RENEWAL
// ==========================================================

export function cancelSubscription() {
  localStorage.setItem(
    STATUS_KEY,
    "CANCELLED"
  );
}

// ==========================================================
// RESET MEMBERSHIP
// ==========================================================

export function resetSubscription() {
  localStorage.removeItem(
    STATUS_KEY
  );

  localStorage.removeItem(
    "sfz_subscription_activated"
  );

  localStorage.removeItem(
    "sfz_subscription_expires"
  );

  localStorage.removeItem(
    "sfz_subscription_renewal"
  );
}

// ==========================================================
// HELPERS
// ==========================================================

export function isSubscriptionActive() {
  return (
    getSubscription().status ===
    "ACTIVE"
  );
}

export function requiresCheckout() {
  const status =
    getSubscription().status;

  return (
    status === "PENDING" ||
    status === "EXPIRED"
  );
}