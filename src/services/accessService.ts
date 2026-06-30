// ==========================================================
// Soccer Fan Zone
// Access Service
// ==========================================================

import {
  getSubscription,
} from "./subscriptionService";

/* ==========================================================
   AUTHENTICATION
========================================================== */

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(
    "sfz_token"
  );
}

/* ==========================================================
   MEMBERSHIP
========================================================== */

export function hasActiveMembership(): boolean {
  return (
    getSubscription().status ===
    "ACTIVE"
  );
}

/* ==========================================================
   ACCESS
========================================================== */

export function canAccessPlatform(): boolean {
  return (
    isLoggedIn() &&
    hasActiveMembership()
  );
}

/* ==========================================================
   CHECKOUT REQUIRED
========================================================== */

export function requiresCheckout(): boolean {
  if (!isLoggedIn()) {
    return false;
  }

  const status =
    getSubscription().status;

  return (
    status === "PENDING" ||
    status === "EXPIRED"
  );
}

/* ==========================================================
   LOGIN REQUIRED
========================================================== */

export function requiresLogin(): boolean {
  return !isLoggedIn();
}

/* ==========================================================
   LOGOUT
========================================================== */

export function logoutUser() {
  localStorage.removeItem(
    "sfz_token"
  );

  localStorage.removeItem(
    "sfz_logged_in"
  );

  localStorage.removeItem(
    "sfz_user_email"
  );

  localStorage.removeItem(
    "sfz_user_id"
  );
}